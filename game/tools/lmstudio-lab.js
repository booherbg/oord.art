const $ = (id) => document.getElementById(id);
const state = { history: [], storyContext: "" };
function setStatus(el, msg, kind = "") { el.textContent = msg; el.className = `status ${kind}`.trim(); }
function addHistory(entry) {
  state.history.unshift(entry); state.history = state.history.slice(0, 40);
  const root = $("history"); root.innerHTML = "";
  for (const item of state.history) {
    const div = document.createElement("div"); div.className = "history-item";
    div.textContent = `[${item.ts}] ${item.mode}\nGoal: ${item.goal}\n\n${item.output}`; root.appendChild(div);
  }
}
function modeInstruction(mode) {
  const map = {
    opener: "Generate multiple opener options with varied tonal intensity while preserving canon.",
    prose: "Revise supplied prose for clarity, tone, and rhythm while preserving meaning and canon.",
    choices: "Propose paired choices with strong contrast (active vs reflective), tags, and gate notes.",
    tags: "Audit and propose tag/gate updates using the canonical tag system and deprecations.",
    feedback: "Give concise editorial feedback with strengths, risks, and practical next edits.",
    custom: "Follow the user request exactly while preserving canon and schema constraints.",
  };
  return map[mode] || map.custom;
}
function buildPrompt() {
  const mode = $("mode").value, goal = $("goal").value.trim(), draftText = $("draftText").value;
  const includeContext = $("includeContext").checked, instruction = modeInstruction(mode);
  return {
    mode, goal, draftText, includeContext,
    messages: [
      { role: "system", content: "You are an assistant for OOR narrative drafting. Stay concise, preserve voice rules, and avoid introducing non-canon claims. When proposing choices include explicit `text`, `next`, `tag`, and `requires` suggestions where useful." },
      { role: "user", content: [`Mode: ${mode}`, `Instruction: ${instruction}`, `Goal: ${goal || "(no goal provided)"}`, "", "Current Draft:", draftText || "(empty)", includeContext ? `\nCanonical Context (story_design.md):\n${state.storyContext || "(not loaded)"}` : "", "", "Output format:", "1) Quick assessment", "2) Proposed text/ideas", "3) Optional implementation notes", "4) One tiny 'next experiment' suggestion"].join("\n") },
    ],
  };
}
async function api(path, method = "GET", body) {
  const res = await fetch(path, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error((await res.text()) || `Request failed: ${res.status}`);
  return res.json();
}
async function loadStoryContext() { try { const data = await api("/api/context/story-design"); state.storyContext = data.content || ""; } catch (err) { state.storyContext = ""; setStatus($("leftStatus"), `Context load failed: ${err.message}`, "warn"); } }
async function refreshSessions() {
  try {
    const data = await api("/api/session/list"), select = $("sessionSelect"); select.innerHTML = "";
    for (const item of data.sessions || []) { const opt = document.createElement("option"); opt.value = item.path; opt.textContent = item.name; select.appendChild(opt); }
    setStatus($("leftStatus"), `Found ${(data.sessions || []).length} saved runs`, "ok");
  } catch (err) { setStatus($("leftStatus"), `List failed: ${err.message}`, "warn"); }
}
async function onGenerate() {
  setStatus($("mainStatus"), "Generating...");
  try {
    const payload = buildPrompt();
    const data = await api("/api/generate", "POST", { baseUrl: $("baseUrl").value.trim(), model: $("model").value.trim(), endpointStyle: $("endpointStyle").value, temperature: Number($("temperature").value), maxTokens: Number($("maxTokens").value), ...payload });
    const output = data.output || ""; $("outputText").value = output;
    addHistory({ ts: new Date().toISOString(), mode: payload.mode, goal: payload.goal, output });
    const fmt = data.provider_format ? ` (${data.provider_format})` : ""; setStatus($("mainStatus"), `Generation complete${fmt}`, "ok");
  } catch (err) { setStatus($("mainStatus"), `Generate failed: ${err.message}`, "warn"); }
}
function applyPreset(kind) {
  if (kind === "openers") { $("mode").value = "opener"; $("goal").value = "Generate 5 opener variants for the Wanderer entrance. Keep each option under 90 words. Vary intensity from subtle pull to immediate dread. End each with one concrete sensory beat."; }
  else if (kind === "choices") { $("mode").value = "choices"; $("goal").value = "For this draft section, propose 3 choice pairs. Each pair must contrast active/external vs internal/reflective and include suggested `tag`, `requires`, and `arrival`."; }
  else if (kind === "feedback") { $("mode").value = "feedback"; $("goal").value = "Give fast editorial feedback focused on engagement and fun. Return: keep, cut, remix sections and one tiny next iteration step."; }
  setStatus($("mainStatus"), "Preset loaded", "ok");
}
function onAppendOutput() {
  const output = $("outputText").value.trim(); if (!output) return setStatus($("mainStatus"), "No output to append", "warn");
  const draft = $("draftText").value; $("draftText").value = `${draft}\n\n---\n\n${output}`.trim(); setStatus($("mainStatus"), "Appended output to draft buffer", "ok");
}
async function onWriteDraft() {
  const path = $("draftPath").value.trim(), text = $("draftText").value;
  if (!path) return setStatus($("mainStatus"), "Target file path is required", "warn");
  setStatus($("mainStatus"), `Writing ${path} ...`);
  try { await api("/api/draft/write", "POST", { path, content: text }); setStatus($("mainStatus"), `Wrote ${path}`, "ok"); } catch (err) { setStatus($("mainStatus"), `Write failed: ${err.message}`, "warn"); }
}
async function onSaveSession() {
  try {
    const payload = { baseUrl: $("baseUrl").value.trim(), model: $("model").value.trim(), endpointStyle: $("endpointStyle").value, temperature: Number($("temperature").value), maxTokens: Number($("maxTokens").value), includeContext: $("includeContext").checked, mode: $("mode").value, goal: $("goal").value, draftPath: $("draftPath").value, draftText: $("draftText").value, outputText: $("outputText").value, history: state.history, storyContextHash: state.storyContext.length, savedAt: new Date().toISOString() };
    const data = await api("/api/session/save", "POST", payload); setStatus($("leftStatus"), `Saved ${data.path}`, "ok"); await refreshSessions();
  } catch (err) { setStatus($("leftStatus"), `Save failed: ${err.message}`, "warn"); }
}
async function onLoadSession() {
  const path = $("sessionSelect").value; if (!path) return setStatus($("leftStatus"), "Pick a saved run first", "warn");
  try {
    const s = (await api("/api/session/load", "POST", { path })).session || {};
    $("baseUrl").value = s.baseUrl || $("baseUrl").value; $("model").value = s.model || $("model").value; $("endpointStyle").value = s.endpointStyle || "auto";
    $("temperature").value = s.temperature ?? $("temperature").value; $("maxTokens").value = s.maxTokens ?? $("maxTokens").value; $("includeContext").checked = !!s.includeContext;
    $("mode").value = s.mode || "custom"; $("goal").value = s.goal || ""; $("draftPath").value = s.draftPath || "game/story_design.md"; $("draftText").value = s.draftText || ""; $("outputText").value = s.outputText || "";
    state.history = Array.isArray(s.history) ? s.history : []; addHistory({ ts: new Date().toISOString(), mode: "session", goal: "Loaded session", output: path }); setStatus($("leftStatus"), `Loaded ${path}`, "ok");
  } catch (err) { setStatus($("leftStatus"), `Load failed: ${err.message}`, "warn"); }
}
async function onSaveAndGenerate() { await onSaveSession(); await onGenerate(); }
async function onSuggestImprovements() {
  try {
    const data = await api("/api/suggest-improvements", "POST", { mode: $("mode").value, includeContext: $("includeContext").checked, history: state.history });
    $("outputText").value = ["Tool Upgrade Suggestions", "", ...(data.suggestions || []).map((s, i) => `${i + 1}. ${s}`)].join("\n");
    setStatus($("mainStatus"), "Added tool upgrade suggestions", "ok");
  } catch (err) { setStatus($("mainStatus"), `Suggest failed: ${err.message}`, "warn"); }
}
async function init() {
  $("generate").addEventListener("click", onGenerate); $("appendOutput").addEventListener("click", onAppendOutput); $("writeDraft").addEventListener("click", onWriteDraft);
  $("saveSession").addEventListener("click", onSaveSession); $("saveAndGenerate").addEventListener("click", onSaveAndGenerate); $("suggestImprovements").addEventListener("click", onSuggestImprovements);
  $("loadSession").addEventListener("click", onLoadSession); $("refreshSessions").addEventListener("click", refreshSessions);
  $("presetOpeners").addEventListener("click", () => applyPreset("openers")); $("presetChoices").addEventListener("click", () => applyPreset("choices")); $("presetFeedback").addEventListener("click", () => applyPreset("feedback"));
  await loadStoryContext(); await refreshSessions(); setStatus($("mainStatus"), "Ready");
}
init();
