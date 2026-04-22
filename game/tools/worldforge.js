const $ = (id) => document.getElementById(id);
const app = {
  acceptedIdeas: [],
  ideasPool: [],
  storyline: { rounds: [], current: 0, selected: -1 },
  compiled: { file: "", nodes: [], selected: -1 },
  contexts: { storyDesign: "", loreViewer: "", loadedAt: "", mode: "summary" },
  promptInspectorVisible: false,
  lastPrompt: { system: "", user: "" },
};
async function api(path, method = "GET", body) {
  const res = await fetch(path, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json(); if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`); return data;
}
function status(id, msg, kind = "") { const el = $(id); el.textContent = msg; el.className = `status ${kind}`.trim(); }
function modelConfig() { return { baseUrl: $("baseUrl").value.trim(), model: $("model").value.trim(), endpointStyle: $("endpointStyle").value, temperature: Number($("temperature").value), maxTokens: Number($("maxTokens").value) }; }
function setLastPrompt(systemPrompt, userPrompt) {
  app.lastPrompt.system = systemPrompt || "";
  app.lastPrompt.user = userPrompt || "";
  $("lastSystemPrompt").value = app.lastPrompt.system;
  $("lastUserPrompt").value = app.lastPrompt.user;
}
function setContextFreshness() {
  if (!app.contexts.loadedAt) { $("contextFreshness").textContent = "Context not loaded"; return; }
  const loreLabel = app.contexts.mode === "full" ? "full HTML" : "summary";
  $("contextFreshness").textContent = `Context loaded (${loreLabel}): ${app.contexts.loadedAt}`;
}
function togglePromptInspector() {
  app.promptInspectorVisible = !app.promptInspectorVisible;
  $("promptPanel").style.display = app.promptInspectorVisible ? "block" : "none";
  $("togglePromptView").textContent = app.promptInspectorVisible ? "Hide Prompt Inspector" : "Show Prompt Inspector";
}
async function generateWithInspector(systemPrompt, userPrompt) {
  setLastPrompt(systemPrompt, userPrompt);
  return api("/api/generate", "POST", { ...modelConfig(), messages: generationMessages(systemPrompt, userPrompt) });
}
function renderPills() { $("acceptedPills").innerHTML = app.acceptedIdeas.length ? app.acceptedIdeas.map((x) => `<span class="pill">${x.kind}: ${x.text.slice(0, 54)}</span>`).join("") : '<span class="status">No accepted ideas yet.</span>'; }
function switchTab(tabId) {
  for (const btn of document.querySelectorAll(".tab")) btn.classList.toggle("active", btn.dataset.tab === tabId);
  for (const id of ["ideasTool", "sandboxTool", "compiledTool", "ideasPanel", "sandboxPanel", "compiledPanel"]) {
    const ok = (tabId === "ideasTool" && (id === "ideasTool" || id === "ideasPanel")) || (tabId === "sandboxTool" && (id === "sandboxTool" || id === "sandboxPanel")) || (tabId === "compiledTool" && (id === "compiledTool" || id === "compiledPanel"));
    $(id).classList.toggle("active", ok);
  }
}
function generationMessages(system, user) { return [{ role: "system", content: system }, { role: "user", content: user }]; }
function parseListIdeas(output, kind) {
  return output.split("\n").map((s) => s.trim()).filter(Boolean).map((line) => line.replace(/^[-*\d.)\s]+/, "").trim()).filter((s) => s.length > 10).slice(0, 20).map((text) => ({ kind, text }));
}
function renderIdeas() {
  const root = $("ideasList"); root.innerHTML = "";
  app.ideasPool.forEach((idea, idx) => {
    const div = document.createElement("div"); div.className = "idea";
    div.innerHTML = `<div>${idea.text}</div><div class="row"><button data-idx="${idx}" data-action="accept">Accept</button><button data-idx="${idx}" data-action="reject">Reject</button></div>`;
    root.appendChild(div);
  });
}
async function onGenerateIdeas() {
  status("ideasStatus", "Generating ideas...");
  const kind = $("ideaKind").value, count = Number($("ideaCount").value || 10), goal = $("ideaGoal").value.trim();
  const user = [
    `Generate ${count} ideas for: ${kind}.`,
    "Return one idea per line, no numbering, no markdown.",
    `Focus: ${goal}`,
    `Existing accepted ideas: ${app.acceptedIdeas.map((x) => x.text).join(" | ") || "(none)"}`,
    "",
    "Canonical context (FULL story_design.md):",
    app.contexts.storyDesign || "(missing)",
    "",
    "Lore viewer context (FULL lore-viewer.html):",
    app.contexts.loreViewer || "(missing)",
  ].join("\n");
  const systemPrompt = "You are an imaginative narrative worldbuilding assistant.";
  try { const data = await generateWithInspector(systemPrompt, user); app.ideasPool = parseListIdeas(data.output || "", kind); renderIdeas(); status("ideasStatus", `Generated ${app.ideasPool.length} ideas`, "ok"); } catch (err) { status("ideasStatus", err.message, "warn"); }
}
function ideaAction(e) {
  const btn = e.target.closest("button[data-idx]"); if (!btn) return;
  const idx = Number(btn.dataset.idx), action = btn.dataset.action, item = app.ideasPool[idx]; if (!item) return;
  if (action === "accept") app.acceptedIdeas.push(item);
  app.ideasPool.splice(idx, 1); renderIdeas(); renderPills();
}
async function onSaveAcceptedIdeas() {
  try { const data = await api("/api/ideas/save", "POST", { type: "accepted_ideas", savedAt: new Date().toISOString(), ideas: app.acceptedIdeas }); status("ideasStatus", `Saved ${data.path}`, "ok"); } catch (err) { status("ideasStatus", err.message, "warn"); }
}
function renderRounds() {
  const root = $("roundsList"); root.innerHTML = "";
  app.storyline.rounds.forEach((r, i) => {
    const div = document.createElement("div"); div.className = "round";
    div.innerHTML = `<strong>Round ${i + 1}</strong> ${app.storyline.selected === i ? " (selected)" : ""}<div style="margin-top:6px;white-space:pre-wrap;">${r.prose || ""}</div><div style="margin-top:6px;"><em>Choices:</em> ${(r.choices || []).join(" | ")}</div><button data-round="${i}" style="margin-top:6px;">Select round</button>`;
    root.appendChild(div);
  });
}
function parseSceneOutput(text) {
  const lines = text.split("\n");
  const choices = lines.filter((l) => /^\s*([1-4][\).]|[-*])\s+/.test(l)).map((l) => l.replace(/^\s*([1-4][\).]|[-*])\s+/, "").trim());
  const prose = lines.filter((l) => !/^\s*([1-4][\).]|[-*])\s+/.test(l)).join("\n").trim();
  return { prose: prose || text, choices: choices.slice(0, 4) };
}
async function onStartRun() { app.storyline = { rounds: [], current: 0, selected: -1 }; $("playerChoice").value = $("runSeed").value.trim(); await onNextRound(); }
async function onNextRound() {
  if (app.storyline.current >= 10) return status("sandboxStatus", "Run already reached 10 rounds", "warn");
  status("sandboxStatus", "Generating next round...");
  const move = $("playerChoice").value.trim() || "Continue deeper into the night.";
  const history = app.storyline.rounds.map((r, i) => `Round ${i + 1} prose:\n${r.prose}\nChoices: ${(r.choices || []).join(" | ")}\nChosen: ${r.choiceTaken || ""}`).join("\n\n");
  const user = [`Generate round ${app.storyline.current + 1} of 10.`, "First: scene prose (120-220 words).", "Then: exactly 3 choice options prefixed 1), 2), 3).", `Inspiration ideas: ${app.acceptedIdeas.map((x) => x.text).join(" | ") || "(none)"}`, `Prior rounds:\n${history || "(none)"}`, `Player decision entering this round: ${move}`].join("\n");
  const systemPrompt = "You run an open-ended, eerie CYOA scene generator.";
  try { const data = await generateWithInspector(systemPrompt, user); const parsed = parseSceneOutput(data.output || ""); app.storyline.rounds.push({ ...parsed, choiceTaken: move, raw: data.output || "" }); app.storyline.current += 1; app.storyline.selected = app.storyline.rounds.length - 1; renderRounds(); status("sandboxStatus", `Round ${app.storyline.current}/10 complete`, "ok"); } catch (err) { status("sandboxStatus", err.message, "warn"); }
}
async function regenRoundPart(kind) {
  const i = app.storyline.selected; if (i < 0 || !app.storyline.rounds[i]) return status("sandboxStatus", "Select a round first", "warn");
  const round = app.storyline.rounds[i]; status("sandboxStatus", `Regenerating ${kind}...`);
  const user = kind === "prose" ? `Rewrite this prose for stronger voice and rhythm.\n\n${round.prose}` : `Rewrite these choices, keep exactly 3 lines prefixed 1),2),3).\n\n${(round.choices || []).join("\n")}`;
  const systemPrompt = "You are an editing assistant.";
  try { const data = await generateWithInspector(systemPrompt, user); if (kind === "prose") round.prose = (data.output || "").trim(); else round.choices = parseSceneOutput(data.output || "").choices; renderRounds(); status("sandboxStatus", `Round ${i + 1} ${kind} regenerated`, "ok"); } catch (err) { status("sandboxStatus", err.message, "warn"); }
}
async function onSaveRun() {
  try { const data = await api("/api/session/save", "POST", { mode: "storyline-run", savedAt: new Date().toISOString(), rounds: app.storyline.rounds, acceptedIdeas: app.acceptedIdeas, config: modelConfig() }); status("sandboxStatus", `Saved ${data.path}`, "ok"); } catch (err) { status("sandboxStatus", err.message, "warn"); }
}
function buildGraph(nodes) { const ids = nodes.map((n) => n.id), idx = new Map(ids.map((id, i) => [id, i])), edges = []; nodes.forEach((n) => (n.choices || []).forEach((c) => c.next && idx.has(c.next) && edges.push([n.id, c.next]))); return { edges }; }
function drawFlow() {
  const svg = $("flowSvg"); svg.innerHTML = ""; const nodes = app.compiled.nodes; if (!nodes.length) return;
  const w = svg.clientWidth || 800, h = svg.clientHeight || 340, cols = Math.max(3, Math.ceil(Math.sqrt(nodes.length))), gapX = w / (cols + 1), rows = Math.ceil(nodes.length / cols), gapY = h / (rows + 1), pos = {};
  nodes.forEach((n, i) => { const col = i % cols, row = Math.floor(i / cols); pos[n.id] = { x: (col + 1) * gapX, y: (row + 1) * gapY }; });
  for (const [from, to] of buildGraph(nodes).edges) { const a = pos[from], b = pos[to]; const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", a.x); line.setAttribute("y1", a.y); line.setAttribute("x2", b.x); line.setAttribute("y2", b.y); line.setAttribute("stroke", "#2f435e"); line.setAttribute("stroke-width", "1.2"); svg.appendChild(line); }
  nodes.forEach((n, i) => { const p = pos[n.id]; const c = document.createElementNS("http://www.w3.org/2000/svg", "circle"); c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", "9"); c.setAttribute("fill", app.compiled.selected === i ? "#70b2ff" : "#1b2a3f"); c.setAttribute("stroke", "#4d709a"); c.style.cursor = "pointer"; c.addEventListener("click", () => selectNode(i)); svg.appendChild(c); });
}
function renderNodeList() { const root = $("nodesList"); root.innerHTML = ""; app.compiled.nodes.forEach((n, i) => { const btn = document.createElement("button"); btn.className = `nodebtn ${app.compiled.selected === i ? "active" : ""}`; btn.textContent = `${n.id} (${(n.choices || []).length} choices)`; btn.addEventListener("click", () => selectNode(i)); root.appendChild(btn); }); }
function renderNodeView() { const n = app.compiled.nodes[app.compiled.selected]; if (!n) return ($("nodeView").textContent = "No node selected."); $("nodeView").textContent = [`id: ${n.id}`, `temperature: ${n.temperature}`, "", n.text || "", "", "choices:", ...(n.choices || []).map((c) => `- ${c.text} -> ${c.next || "null"} | tag=${c.tag || "null"}`)].join("\n"); }
function selectNode(i) { app.compiled.selected = i; renderNodeList(); renderNodeView(); drawFlow(); }
async function loadCompiledFile(path) {
  status("compiledStatus", "Loading file...");
  try { const data = await api("/api/story/load", "POST", { path }); app.compiled.file = path; app.compiled.nodes = Array.isArray(data.data) ? data.data : []; app.compiled.selected = app.compiled.nodes.length ? 0 : -1; renderNodeList(); renderNodeView(); drawFlow(); status("compiledStatus", `Loaded ${path}`, "ok"); } catch (err) { status("compiledStatus", err.message, "warn"); }
}
async function regenNode(kind) {
  const n = app.compiled.nodes[app.compiled.selected]; if (!n) return status("compiledStatus", "Select a node first", "warn");
  status("compiledStatus", `Regenerating node ${kind}...`);
  const user = kind === "prose" ? ["Rewrite node text for stronger language only. Keep intent and canon.", `Node id: ${n.id}`, `Current text:\n${n.text}`, `Inspiration ideas: ${app.acceptedIdeas.map((x) => x.text).join(" | ") || "(none)"}`].join("\n\n") : ["Rewrite only the choice text strings for engagement.", "Keep next/tag/requires unchanged and same number of choices.", `Choices JSON:\n${JSON.stringify(n.choices || [], null, 2)}`].join("\n\n");
  try {
    const systemPrompt = "You edit game-node language while preserving structure and canon.";
    const data = await generateWithInspector(systemPrompt, user);
    if (kind === "prose") n.text = (data.output || "").trim();
    else {
      const raw = (data.output || "").trim(), start = raw.indexOf("["), end = raw.lastIndexOf("]");
      if (start >= 0 && end > start) { const parsed = JSON.parse(raw.slice(start, end + 1)); if (Array.isArray(parsed) && parsed.length === (n.choices || []).length) n.choices = parsed; }
    }
    renderNodeView(); status("compiledStatus", `Node ${n.id} ${kind} regenerated`, "ok");
  } catch (err) { status("compiledStatus", err.message, "warn"); }
}
async function onWriteCompiled() {
  if (!app.compiled.file) return status("compiledStatus", "No file loaded", "warn");
  try { await api("/api/draft/write", "POST", { path: app.compiled.file, content: `${JSON.stringify(app.compiled.nodes, null, 2)}\n` }); status("compiledStatus", `Wrote ${app.compiled.file}`, "ok"); } catch (err) { status("compiledStatus", err.message, "warn"); }
}
async function loadFileOptions() {
  const data = await api("/api/story/files"), sel = $("compiledFile"); sel.innerHTML = "";
  data.files.filter((f) => f.type === "json" && !f.path.includes("/tools/") && !f.path.includes("/lore/")).forEach((f) => { const opt = document.createElement("option"); opt.value = f.path; opt.textContent = f.path; sel.appendChild(opt); });
}
async function loadIdeaContexts() {
  status("sharedStatus", "Loading idea-generator context...");
  try {
    const mode = $("ideaContextMode")?.value || "summary";
    const lorePath = mode === "full" ? "game/lore/lore-viewer.html" : "game/tools/lore_viewer_context.md";
    const [storyDesign, loreViewer] = await Promise.all([
      api("/api/context/story-design"),
      api("/api/story/load", "POST", { path: lorePath }),
    ]);
    app.contexts.storyDesign = storyDesign.content || "";
    app.contexts.loreViewer = loreViewer.content || "";
    app.contexts.mode = mode;
    app.contexts.loadedAt = new Date().toLocaleString();
    setContextFreshness();
    status(
      "sharedStatus",
      `Context loaded: story_design(${app.contexts.storyDesign.length} chars), lore(${app.contexts.loreViewer.length} chars, ${mode})`,
      "ok"
    );
  } catch (err) {
    status("sharedStatus", `Context load failed: ${err.message}`, "warn");
  }
}
async function saveSharedSnapshot() {
  try { const data = await api("/api/session/save", "POST", { mode: "worldforge-shared-context", savedAt: new Date().toISOString(), acceptedIdeas: app.acceptedIdeas, storylineRounds: app.storyline.rounds, modelConfig: modelConfig() }); status("sharedStatus", `Saved ${data.path}`, "ok"); } catch (err) { status("sharedStatus", err.message, "warn"); }
}
function wire() {
  document.querySelectorAll(".tab").forEach((btn) => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
  $("generateIdeas").addEventListener("click", onGenerateIdeas); $("saveAcceptedIdeas").addEventListener("click", onSaveAcceptedIdeas); $("ideasList").addEventListener("click", ideaAction);
  $("startRun").addEventListener("click", onStartRun); $("nextRound").addEventListener("click", onNextRound); $("regenRoundProse").addEventListener("click", () => regenRoundPart("prose")); $("regenRoundChoices").addEventListener("click", () => regenRoundPart("choices")); $("saveRun").addEventListener("click", onSaveRun);
  $("roundsList").addEventListener("click", (e) => { const btn = e.target.closest("button[data-round]"); if (!btn) return; app.storyline.selected = Number(btn.dataset.round); renderRounds(); });
  $("loadCompiled").addEventListener("click", () => loadCompiledFile($("compiledFile").value)); $("regenNodeProse").addEventListener("click", () => regenNode("prose")); $("regenNodeChoices").addEventListener("click", () => regenNode("choices")); $("writeCompiled").addEventListener("click", onWriteCompiled);
  $("saveAllContext").addEventListener("click", saveSharedSnapshot);
  $("reloadContexts").addEventListener("click", loadIdeaContexts);
  $("togglePromptView").addEventListener("click", togglePromptInspector);
  $("ideaContextMode").addEventListener("change", loadIdeaContexts);
}
async function init() {
  wire();
  renderPills();
  setContextFreshness();
  setLastPrompt("", "");
  await loadIdeaContexts();
  await loadFileOptions();
  await loadCompiledFile($("compiledFile").value || "game/spine_nodes.json");
}
init();
