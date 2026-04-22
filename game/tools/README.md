# Game Tools

Local writing and worldbuilding tools for DJ OOR, backed by your local LM Studio model.

## What is here

- `worldforge.html` + `worldforge.js`  
  3-tool suite:
  - idea generator
  - 10-round open-ended storyline sandbox
  - compiled game explorer with flow diagram

- `lmstudio-lab.html` + `lmstudio-lab.js`  
  focused drafting/regeneration workspace

- `lmstudio_proxy.py`  
  local proxy + static server for both UIs

- `sessions/`  
  saved run/session JSON output

## Quick start

From repo root:

```bash
bash game/tools/start-tools.sh
```

Then open:

- `http://127.0.0.1:8765/worldforge.html`
- `http://127.0.0.1:8765/lmstudio-lab.html`

## LM Studio

Keep LM Studio running locally (typically on `http://127.0.0.1:1234`).
This proxy supports:

- `POST /api/v1/chat`
- `POST /v1/chat/completions`

Use endpoint style `auto` unless you specifically want to pin one.
