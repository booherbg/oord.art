# Next Steps

## To run the demo

`demo_draft.html` loads all nodes via `fetch()` and requires a local server:

```
cd game
python3 -m http.server 8000
# open http://localhost:8000/demo_draft.html
```

---

## Stub branches (unwritten nodes)

These are referenced in choices but not yet built. The demo renders a stub card when reached.

| Node ID | Entry point | Description |
|---|---|---|
| `withdraw_001` | spine_005 "The door. The cold. The walk home." | Full withdrawal/escape path |
| `called_001` | spine_005 "The antler is warm against your hip." | Requires `pale_antler` artifact — not yet defined |
| `oor_approach_001` | post_unity_001 "You want to see DJ OOR from closer" | Moving toward the decks |
| `mating_ritual_001` | post_beauty_001 "Follow her" | Deeper familiar encounter, more ritual lore |

---

## Known issues / editorial review needed

### Naming convention (DJ OOR vs Oor)
The rule: **DJ OOR** at the decks / in the warehouse / during performance. **Oor** in cosmology/lore exposition outside the performance.

- `closing_002` main text uses "DJ OOR" for the departure moment — this is correct per the rule (still in the warehouse) but the transition point from "DJ OOR" → "Oor" in the closing sequence deserves an editorial pass. Once the job is done and OOR is following the yield through the portal, does the entity revert to "Oor"?
- OOR action blocks consistently use "OOR" without the DJ prefix — this is intentional (they're clinical meta-narration) but should be confirmed as a convention.

### Transcendental routing
Currently the full arc goes: engage_001 → Unity → Beauty → (familiar encounter) → Truth → Goodness → closing. This is one linear path through all four transcendentals. In a real playthrough, players would likely hit them in different orders or miss some. The conditional logic supports this (nodes check `has_transcendental`) but the routing hasn't been designed for non-linear traversal yet.

### `pale_antler` artifact
Referenced in spine_005 as a choice requirement (`has_artifact: "pale_antler"`) but the artifact is never awarded anywhere in the current node set. Need to decide: where is it found, and does it exist in this run or only from a previous run?

### post_unity_001 branch to Beauty
`post_unity_001` routes directly to `beauty_001`. But `beauty_001` is also reachable in other ways in principle. The arrival variant for `beauty_001` only checks for the `open` tag — which is set by the specific choice in `post_unity_001`. Other entry paths would fall to the default arrival. Acceptable for now, worth reviewing when more paths are built.

### Goodness conditional `awards_unity` → fixed
Was using `has_tag: "awards_unity"` — now correctly uses `has_transcendental: "unity"`. The engine evaluates `has_transcendental` against `state.transcendentals`, which is populated by `applyAwards()` on node render.

---

## Engine todos (demo_draft.html)

- [ ] `outcome_transcendence` terminal display currently shows a generic summary card — should render the full node text when reached as a proper terminal node (the outcome text itself is the payoff)
- [ ] `awards_artifact` processing is in the engine but no artifacts are awarded in current nodes — wire up when artifact nodes are written
- [ ] `run_artifacts` (cross-run state) not persisted between sessions — will need localStorage or similar when second-run unlocks are implemented
- [ ] The `converging` path (skipping Goodness, going directly to closing from post_truth) is valid but skips the `all_four` award — closing nodes should handle players arriving with 3 transcendentals gracefully

---

## Content to write next (suggested order)

1. **`outcome_transcendence` as full rendered node** — the terminal text is written but the demo currently shows a summary card instead of the node content. The engine needs a small update to render terminal nodes fully before showing the restart option.
2. **`withdraw_001`** — the escape/withdrawal path. Short (2-3 nodes), leads to the `escape` outcome. Counterweight to the transcendence arc.
3. **`oor_approach_001`** — moving toward the decks. Rare path. Could lead to a perspective shift or an artifact.
4. **`mating_ritual_001`** — deeper familiar encounter. Good vehicle for additional lore about the Antlered Companions.
5. **Second run / Familiar perspective** — unlocked after one run, different starting node.

---

## Files

| File | Contents |
|---|---|
| `game/spine_nodes.json` | Main spine: spine_001–005 |
| `game/branch_unity.json` | engage_001, unity_001–003 |
| `game/post_unity.json` | post_unity_001 |
| `game/branch_beauty.json` | beauty_001–002 |
| `game/post_beauty.json` | post_beauty_001 |
| `game/branch_truth.json` | truth_001–002 |
| `game/post_truth.json` | post_truth_001 |
| `game/branch_goodness.json` | goodness_001–002 |
| `game/closing.json` | closing_001–002 |
| `game/outcome_transcendence.json` | outcome_transcendence (terminal) |
| `game/lore/oor_actions.json` | OOR action library batch 1 (001–015) |
| `game/lore/oor_actions_2.json` | OOR action library batch 2 (016–030) |
| `game/lore/lore-viewer.html` | Full lore document / world bible |
| `game/demo_draft.html` | This demo — loads all JSON via fetch |
| `game/spine-demo.html` | Original spine-only demo (hardcoded nodes) |
