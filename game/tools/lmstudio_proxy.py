#!/usr/bin/env python3
import argparse
import json
import pathlib
import urllib.error
import urllib.request
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer


ROOT = pathlib.Path(__file__).resolve().parents[2]
STATIC_DIR = ROOT / "game" / "tools"
SESSIONS_DIR = ROOT / "game" / "tools" / "sessions"
STORY_DESIGN_PATH = ROOT / "game" / "story_design.md"
GAME_DIR = ROOT / "game"


def _json_response(handler, payload, status=200):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def _safe_workspace_path(rel_path):
    abs_path = (ROOT / rel_path).resolve()
    if not str(abs_path).startswith(str(ROOT)):
        raise ValueError("Path must stay inside workspace")
    return abs_path


def _proxy_generate(payload):
    base_url = payload.get("baseUrl", "http://127.0.0.1:1234").rstrip("/")
    endpoint_style = payload.get("endpointStyle", "auto")

    openai_body = {
        "model": payload.get("model", "mistral"),
        "temperature": payload.get("temperature", 0.8),
        "max_tokens": payload.get("maxTokens", 900),
        "messages": payload.get("messages", []),
    }

    system_prompt = ""
    user_chunks = []
    for msg in payload.get("messages", []):
        role = msg.get("role")
        content = msg.get("content", "")
        if role == "system":
            system_prompt = f"{system_prompt}\n{content}".strip() if system_prompt else content
        else:
            user_chunks.append(f"[{role}] {content}")
    legacy_body = {
        "model": payload.get("model", "mistral"),
        "system_prompt": system_prompt,
        "input": "\n\n".join(user_chunks).strip(),
    }

    attempts = []
    if endpoint_style in ("auto", "openai"):
        attempts.append(("/v1/chat/completions", openai_body, "openai"))
    if endpoint_style in ("auto", "legacy"):
        attempts.append(("/api/v1/chat", legacy_body, "legacy"))

    last_error = None
    for route, body, style in attempts:
        data = json.dumps(body).encode("utf-8")
        req = urllib.request.Request(
            f"{base_url}{route}",
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                parsed = json.loads(resp.read().decode("utf-8"))
                if style == "openai":
                    choice = parsed.get("choices", [{}])[0]
                    message = choice.get("message", {})
                    return {
                        "output": message.get("content", ""),
                        "provider_format": "openai",
                        "raw": parsed,
                    }
                output_list = parsed.get("output", [])
                if output_list and isinstance(output_list, list):
                    content = output_list[0].get("content", "")
                else:
                    content = parsed.get("content", "")
                return {
                    "output": content,
                    "provider_format": "legacy",
                    "raw": parsed,
                }
        except urllib.error.HTTPError as err:
            detail = err.read().decode("utf-8", errors="ignore")
            last_error = f"LM Studio HTTP error {err.code} on {route}: {detail}"
        except urllib.error.URLError as err:
            last_error = f"LM Studio connection error on {route}: {err}"

    raise RuntimeError(last_error or "LM Studio request failed")


def _tool_suggestions(session_payload):
    history = session_payload.get("history", []) or []
    mode = session_payload.get("mode", "")
    has_context = bool(session_payload.get("includeContext"))
    suggestions = []
    if len(history) < 3:
        suggestions.append("Run a 10-minute opener sprint: generate 5 variants, keep best 1, discard the rest.")
    if mode in ("choices", "tags"):
        suggestions.append("Add a one-click paired choice template for active vs reflective choices.")
    if has_context:
        suggestions.append("Add context trims by section to reduce token load for local 3b/8b models.")
    suggestions.append("Track a simple fun score (1-5) and bias prompts toward higher-scoring tones.")
    suggestions.append("Auto-save every generation so fatigue never costs progress.")
    return suggestions[:5]


def _list_story_files():
    json_paths = sorted(GAME_DIR.glob("*.json"))
    files = [{"path": str(p.relative_to(ROOT)), "name": p.name, "type": "json"} for p in json_paths]
    files.append({"path": "game/demo_draft.html", "name": "demo_draft.html", "type": "html"})
    files.append({"path": "game/story_design.md", "name": "story_design.md", "type": "markdown"})
    return files


def _extract_demo_prompt_blocks(html_text):
    out = []
    marker = '"text": "'
    idx = 0
    while True:
        idx = html_text.find(marker, idx)
        if idx < 0:
            break
        start = idx + len(marker)
        end = html_text.find('",', start)
        if end < 0:
            break
        raw = html_text[start:end].replace("\\n\\n", "\n\n").strip()
        if len(raw) > 40:
            out.append(raw)
        idx = end + 2
        if len(out) >= 12:
            break
    return out


class ToolsHandler(BaseHTTPRequestHandler):
    def _parse_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        data = self.rfile.read(length) if length > 0 else b"{}"
        return json.loads(data.decode("utf-8"))

    def do_GET(self):
        if self.path == "/" or self.path == "/worldforge.html":
            return self._serve_file("worldforge.html", "text/html; charset=utf-8")
        if self.path == "/worldforge.js":
            return self._serve_file("worldforge.js", "text/javascript; charset=utf-8")
        if self.path == "/lmstudio-lab.html":
            return self._serve_file("lmstudio-lab.html", "text/html; charset=utf-8")
        if self.path == "/lmstudio-lab.js":
            return self._serve_file("lmstudio-lab.js", "text/javascript; charset=utf-8")
        if self.path == "/api/context/story-design":
            return _json_response(self, {"content": STORY_DESIGN_PATH.read_text(encoding="utf-8")})
        if self.path == "/api/story/files":
            return _json_response(self, {"files": _list_story_files()})
        if self.path == "/api/session/list":
            SESSIONS_DIR.mkdir(parents=True, exist_ok=True)
            items = [{"name": p.name, "path": str(p.relative_to(ROOT))} for p in sorted(SESSIONS_DIR.glob("*.json"), reverse=True)]
            return _json_response(self, {"sessions": items})
        if self.path == "/api/health":
            return _json_response(self, {"ok": True, "service": "tools-proxy"})
        return _json_response(self, {"error": "Not found"}, status=404)

    def do_POST(self):
        try:
            if self.path == "/api/generate":
                return _json_response(self, _proxy_generate(self._parse_json()))
            if self.path == "/api/suggest-improvements":
                return _json_response(self, {"suggestions": _tool_suggestions(self._parse_json())})
            if self.path == "/api/story/load":
                payload = self._parse_json()
                path = _safe_workspace_path(payload.get("path", ""))
                if not path.exists():
                    return _json_response(self, {"error": "Story file not found"}, status=404)
                if path.suffix.lower() == ".json":
                    data = json.loads(path.read_text(encoding="utf-8"))
                    return _json_response(self, {"type": "json", "path": str(path.relative_to(ROOT)), "data": data})
                text = path.read_text(encoding="utf-8")
                demo_blocks = _extract_demo_prompt_blocks(text) if path.name == "demo_draft.html" else []
                return _json_response(self, {"type": "text", "path": str(path.relative_to(ROOT)), "content": text, "demo_blocks": demo_blocks})
            if self.path == "/api/ideas/save":
                payload = self._parse_json()
                SESSIONS_DIR.mkdir(parents=True, exist_ok=True)
                name = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-ideas.json"
                path = SESSIONS_DIR / name
                path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
                return _json_response(self, {"path": str(path.relative_to(ROOT))})
            if self.path == "/api/session/save":
                payload = self._parse_json()
                SESSIONS_DIR.mkdir(parents=True, exist_ok=True)
                mode = (payload.get("mode") or "run").replace("/", "-")
                name = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-{mode}.json"
                path = SESSIONS_DIR / name
                path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
                return _json_response(self, {"path": str(path.relative_to(ROOT))})
            if self.path == "/api/session/load":
                path = _safe_workspace_path(self._parse_json().get("path", ""))
                if not path.exists():
                    return _json_response(self, {"error": "Session not found"}, status=404)
                return _json_response(self, {"session": json.loads(path.read_text(encoding="utf-8"))})
            if self.path == "/api/draft/write":
                payload = self._parse_json()
                path = _safe_workspace_path(payload.get("path", ""))
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(payload.get("content", ""), encoding="utf-8")
                return _json_response(self, {"ok": True, "path": str(path.relative_to(ROOT))})
            return _json_response(self, {"error": "Not found"}, status=404)
        except Exception as err:
            return _json_response(self, {"error": str(err)}, status=400)

    def _serve_file(self, filename, content_type):
        path = STATIC_DIR / filename
        if not path.exists():
            return _json_response(self, {"error": "Missing static file"}, status=404)
        body = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, _format, *_args):
        return


def main():
    parser = argparse.ArgumentParser(description="Local game-tools proxy for LM Studio")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    server = HTTPServer((args.host, args.port), ToolsHandler)
    print(f"Serving tools at http://{args.host}:{args.port}/worldforge.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
