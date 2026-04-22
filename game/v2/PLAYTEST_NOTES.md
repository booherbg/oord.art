# Playtest Notes & Implementation Report
*Generated during first-pass build of index.html*

---

## Summary

The game is playable and all three character paths trace cleanly. No dead ends detected. All paths reach their terminal nodes. Full engine implementation covers all mechanics from GAME_SPEC.md. Notes below document anomalies, deviations from spec, content observations, and decisions made during implementation.

---

## Schema / Engine Anomalies

### 1. Familiar unlock_requires typo
**File:** `story_nodes/familiar_nodes.json` — top-level metadata  
**Issue:** Uses `"completed_character": "wanderer"` (singular string) rather than the spec-canonical `"completed_characters": ["wanderer"]` (plural array).  
**Resolution:** Engine handles both forms. No change to JSON needed, but should be standardized.

### 2. Node count discrepancy — spec vs. actual JSON
**Spec says:** Familiar = 11 nodes, Builder = 12 nodes  
**Actual JSON:**
- Wanderer: 16 nodes (matches spec) ✓
- Familiar: 22 nodes (f_001 through f_020, with f_005a/b, f_010a/b)
- Builder: 21 nodes (b_001 through b_019, with b_009a/b, b_014a/b)

**Assessment:** Not a bug — the nodes are fully implemented and all paths resolve correctly. The beat maps and spec were written before the full node expansion. The JSON is the canonical source.

### 3. `awards_artifact` embedded in `conditional_text` entries
**File:** `story_nodes/wanderer_nodes.json` — node `w_012`  
**Issue:** Individual `conditional_text` entries carry their own `awards_artifact` field, which is not in the formal schema. Example:
```json
{
  "condition": { "has_tag": "entered_circle" },
  "append": "A strip of fabric...",
  "awards_artifact": "fabric_strip"
}
```
**Resolution:** Engine detects and processes these correctly during conditional evaluation. Works as intended — the first matching conditional awards its artifact.

### 4. Missing node `w_called_001`
**File:** `story_nodes/wanderer_nodes.json` — node `w_005` choice 3  
**Issue:** The third choice on `w_005` (requires `pale_antler` artifact, tags `called`) routes to `w_called_001`, which does not exist in the JSON.  
**Resolution:** Engine renders a stub card when a referenced node is absent. The choice is hidden from players who don't have `pale_antler`, so most players will never encounter this. `pale_antler` is also not yet earnable (no character awards it).

### 5. `pale_antler` artifact is unimplemented
**Per GAME_SPEC:** `pale_antler` is listed as "TBD / not yet designed" in the artifact table. No existing character path awards it, and its gated path (`w_called_001`) doesn't exist.  
**Assessment:** Correct — this is a future content hook, not a bug. Current implementation handles gracefully.

### 6. Wanderer transcendentals — incomplete awards
**Issue:** The Wanderer can theoretically earn Unity, Beauty, Truth, and Goodness, but only `truth` is explicitly awarded by a node (`w_010a`). Unity, Beauty, and Goodness lack corresponding `awards_transcendental` entries on any node.  
**Assessment:** Either an authoring oversight or an intentional choice where transcendentals other than Truth are tracked implicitly via artifacts rather than the pip system. The `outcome: "harvest"` → `"transcendence"` upgrade (triggered when all 4 transcendentals are earned) would currently only trigger if the player somehow earned all 4, which isn't possible without Unity/Beauty/Goodness node awards.  
**Recommendation:** Decide whether to add `awards_transcendental` entries at appropriate Wanderer nodes (e.g., `w_008f` could award Unity, `w_007e`/`felt_rod` could award Beauty, `w_011` could award Goodness for the `willing` path). Currently the transcendence outcome is unreachable for Wanderer.

### 7. Builder tag table doesn't match node IDs in GAME_SPEC
**GAME_SPEC says:** `investigates` comes from `b_002`, `investigates_module` from `b_004`, `stays_floor`/`returns_rack` from `b_007`  
**Actual JSON:** `investigates`/`accepts_gig` from `b_003`, `investigates_module`/`trusts_data` from `b_007`, `stays_floor`/`returns_rack` from `b_013`  
**Assessment:** Documentation drift — the spec was written at a different node numbering stage. Not a runtime issue. JSON is correct.

### 8. `w_012` conditional_mode and empty-pocket fallback
**Issue:** `w_012` has `"conditional_mode": "first_match"`. The final conditional entry has `"condition": null`, meaning it fires when nothing else matches. This correctly implements the "your pockets are empty" fallback for paths where no artifact is earned. Works correctly.

### 9. Builder `b_008` — `next` is array, node has choices: []
**Structure:** `b_008` has empty `choices` array (auto-advance) and `next` as an array of conditional targets:
```json
"next": [
  { "requires": { "has_tag": "investigates_module" }, "target": "b_009a" },
  { "default": true, "target": "b_009b" }
]
```
**Resolution:** Engine's `resolveNext()` handles both string and array forms. Routes correctly based on accumulated tags.

---

## Path Tracing — All Paths Verified

### Wanderer paths (5 main paths + called stub)
1. **Surrender → Floor → Ritual → Circle Enter → w_012** — HARVEST or TRANSCENDENCE  ✓
2. **Surrender → Floor → Edge → Return → Circle Enter → w_012** — HARVEST or TRANSCENDENCE ✓
3. **Surrender → Floor → Edge → Linger → Observe → Circle Enter → w_012** — HARVEST ✓
4. **Surrender → Floor → Edge → Linger → Observe → Exit → w_exit_002** — ESCAPE ✓
5. **Withdraw at w_005 → w_exit_001 → w_exit_002** — ESCAPE ✓
6. **Called path (pale_antler) → w_called_001** — STUB (intended) ⚠

All terminal nodes reached: `w_012` (HARVEST/TRANSCENDENCE), `w_exit_002` (ESCAPE). ✓

### Familiar paths (2 branch points, all converge)
1. **reads_crowd → f_005a → f_006 → ... → stays_embedded → f_010a → ... → f_020** — DISSOLUTION ✓
2. **reads_crowd → f_005a → f_006 → ... → pulls_back → f_010b → ... → f_020** — DISSOLUTION ✓
3. **monitors_aperture → f_005b → f_006 → ... → stays_embedded → f_010a → ... → f_020** — DISSOLUTION ✓
4. **monitors_aperture → f_005b → f_006 → ... → pulls_back → f_010b → ... → f_020** — DISSOLUTION ✓

All paths reach `f_020` (DISSOLUTION). ✓

### Builder paths (2 branch points, all converge)
1. **investigates → investigates_module → b_009a → ... → stays_floor → b_014a → ... → b_019** — RECOGNITION ✓
2. **investigates → investigates_module → b_009a → ... → returns_rack → b_014b → ... → b_019** — RECOGNITION ✓
3. **investigates → trusts_data → b_009b → ... → stays_floor → b_014a → ... → b_019** — RECOGNITION ✓
4. **investigates → trusts_data → b_009b → ... → returns_rack → b_014b → ... → b_019** — RECOGNITION ✓
5. **accepts_gig → [same branches as above]** — RECOGNITION ✓

All paths reach `b_019` (RECOGNITION). ✓

---

## Content Observations

### Phrasing — No Changes Recommended
- `b_009a` "the inside of a throat" is visceral, intentional, excellent.
- `f_020` fragmenting prose is well-executed — "You are —" / "You are —" sells the dissolution without explanation.
- `w_010b` is appropriately cold for the refusal: "the current moves past a stone that chose to stay on the bank." Strong.
- `b_015` the recognition moment holds — "the most significant professional recognition you have ever received" lands precisely because of all the technical specificity before it.

### Minor Phrasing Flags
1. **w_008f conditional (has_tag: willing):** "It looks like the moment two hours into a wedding..." — the wedding simile is slightly more explicit/accessible than the rest of the prose register. Not wrong, just notable.
2. **f_002:** "The glasses are mostly correct. The proportions are close enough." — this is perfect Pratchett-adjacent and should stay exactly as is.
3. **b_013 conditional (investigates):** "You were always building toward this." — slightly on the nose compared to the technical opacity elsewhere in the Builder's path. Consider keeping, but it's the closest to stating the subtext directly.

### Cross-Character Thread Completeness
All major threads verified present:
- Sneaker-star woman: Wanderer (w_003), Familiar (f_005a/f_010b) ✓
- Paint-knuckle man: Wanderer (w_006, w_009), Familiar (f_005a, f_008) ✓
- DJ OOR recognition of Builder: Builder (b_015) ✓
- Jacket woman (Dance Circle): Wanderer (w_009), Familiar (f_014) ✓
- Bartender Familiar: Familiar (f_002, f_019) ✓
- Watcher/Wanderer recognized by Familiar: Familiar (f_011, f_014, f_018) ✓

---

## Implementation Decisions

### Temperature display
Per spec recommendation: "consider hiding it in production builds." Implemented as a small ambient dot in the state bar (7px circle, color-coded by temperature) with no text label. Border color shift carries the primary signal.

### Auto-advance interaction
Used spec's "option 1" — click-to-advance with explicit "continue →" button. This preserves player reading pace and avoids accidental advances. The button appears with a delay after the node text has fully faded in.

### Dynamic outcome (Wanderer)
`outcome: "harvest"` upgrades to `"transcendence"` if `run.transcendentals.length === 4` when the terminal node is reached. Currently unreachable (see anomaly #6 above), but the logic is in place.

### Dissolution visual
`f_020` receives `.dissolving-card` CSS class. The text paragraphs gradually blur and fade via CSS animation after ~1.5s, mirroring the narrative dissolution without obscuring readability. The fragmenting prose does the heavy lifting; the CSS is subtle reinforcement.

### Arrival variant evaluation
Spec says "first match wins." Implemented as: evaluate non-default variants in order, first match wins; if no match, use default. This is correct — having defaults interleaved would break the intent.

### Character unlock persistence
On terminal node render: character is added to `persistent.completed_characters` if not already present, `persistent.runs` incremented, saved to localStorage. Character select screen reflects this on return.

### Artifact priority (w_012 first_match)
The conditional_text on `w_012` uses `conditional_mode: "first_match"` with a priority order:
1. `entered_circle` → `fabric_strip` (Truth)
2. `felt_rod` → `humming_shard` (Beauty)
3. `participated_ritual` → `warm_stone` (Unity)
4. `willing` → `yarn_knot` (Goodness)
5. null (default) → empty pockets

This matches the GAME_SPEC priority: Truth > Beauty > Unity > Goodness. ✓

---

---

## Transcendentals & Artifacts — Full Path Map

### How each artifact is earned (Wanderer)

Artifacts are awarded at `w_012` via `conditional_mode: "first_match"`. Priority: Truth → Beauty → Unity → Goodness → empty.

| Artifact | Transcendental | Condition tag | How player earns the tag | Reachable? |
|---|---|---|---|---|
| `fabric_strip` | Truth | `entered_circle` | Choose "Enter the circle" at w_009 → w_010a | ✓ |
| `humming_shard` | Beauty | `felt_rod` | Go to edge at w_006 → auto-awarded at w_007e | ✓ |
| `warm_stone` | Unity | `participated_ritual` | Stay on floor or return to floor → auto-awarded at w_008f | ✓ (but see below) |
| `yarn_knot` | Goodness | `willing` | Choose "The warmth is immediate" at w_002 | ✗ — unreachable |

**Notes on reachability:**
- `fabric_strip` wins whenever `entered_circle` is present, regardless of other tags. A `willing` player who enters the circle gets Truth, not Goodness, even if they're maximally open.
- `warm_stone` is reachable only when `participated_ritual` is present AND `entered_circle`/`felt_rod` are absent: floor path → watch circle.
- `yarn_knot` is **unreachable**. The `willing` condition (position 4) is always shadowed by `felt_rod` (position 2) or `participated_ritual` (position 3). Every path to `w_012` passes through `w_007e` (auto-awards `felt_rod`) or `w_008f` (auto-awards `participated_ritual`). There is no route to `w_012` where `willing` is the only relevant tag.

### What a player can currently collect across multiple runs

| Run | Path choices | Artifact earned |
|---|---|---|
| Run 1 | Floor → enter circle | `fabric_strip` (Truth) |
| Run 2 | Floor → watch circle | `warm_stone` (Unity) |
| Run 3 | Edge → watch circle | `humming_shard` (Beauty) |
| Run 4 | ??? | `yarn_knot` (Goodness) — no valid path |

**Maximum collectible: 3 of 4.** Transcendence (requiring all four) is currently unreachable.

---

## `yarn_knot` Fix — APPLIED

**Was:** unreachable (willing at position 4, always shadowed by felt_rod/participated_ritual).

**Fix:** Added `{ "condition": { "has_tag": "willing" }, "append": null, "awards_artifact": "yarn_knot" }` to `w_011`'s `conditional_text`. The closing is the right moment — "The person next to you grabs your hand. You let them." is "care without audience." Award fires silently; discovery prose at `w_012` (position 4, `willing` condition) still describes finding it.

**Side effect noted:** `willing` players who also pass through the floor ritual or edge will collect two artifacts in one run (yarn_knot at w_011 + whichever first-match wins at w_012). Acceptable — maximally open players earn more per run.

**Four-run path to transcendence (now achievable):**

| Run | Path | Artifact |
|---|---|---|
| 1 | Any path → enter circle | `fabric_strip` (Truth) |
| 2 | Floor → watch circle | `warm_stone` (Unity) |
| 3 | Edge → watch circle | `humming_shard` (Beauty) |
| 4 | Any path with `willing` chosen at w_002 | `yarn_knot` (Goodness) — awarded at w_011 |

---

## "The plant always wins" — RESOLVED

Was: `GAME_SPEC.md` line 273, outcomes table — `"The plant always wins. You would come again."` Broken/informal reference with no connection to any other document, lore, or mechanic.

Fixed in `GAME_SPEC.md`: updated to *"The mechanism gets what it came for. So do you. You would come again."* — preserves the dual-win meaning (harvest complete + player willing to return) without the unexplained reference.

---

## Transcendental Pip Awards — Nodes Needing Review

Only ONE `awards_transcendental` exists in the Wanderer nodes (`w_010a` = Truth). The pips for Unity/Beauty/Goodness never light up during a Wanderer run. These are the candidate nodes (secondary to the artifact fix above — pip awards are cosmetic, artifact awards unlock transcendence):

| Transcendental | Candidate Node | Why | Condition |
|---|---|---|---|
| **Unity** | `w_008f` | Crowd fully synchronizes; `participated_ritual` auto-awarded here | Unconditional |
| **Beauty** | `w_007e` | Rod hums; `felt_rod` auto-awarded here | Unconditional |
| **Goodness** | `w_011` | Hand-hold in the closing — if `yarn_knot` award is moved here, add `awards_transcendental: "goodness"` alongside it | Conditional on `willing` |

---

## Full Language Audit — Nodes for Review

These are flagged for collaborative editing, not automatic change. Copy-pasted exactly from the JSON for precision.

### Wanderer

**w_005** — `"a current that wants a stone to carry"` — inverted phrasing. Does the current want to carry the stone, or want a stone to carry along? Probably should be "a current that wants a stone to carry along" or "wants to carry."

**w_008f** — `"Whimsical in the way that fairy tales are whimsical, which is to say it is beautiful and it is not safe."` — the "which is to say" construction explains the metaphor after it lands. Writing rules flag this. The explanation adds content (beautiful AND not safe is different from just whimsical) so it may be intentional. Review.

**w_011** — `"reluctant to break the container"` — "container" is therapy-vocabulary, slightly off-register for this voice. "Frame," "spell," "membrane," or nothing might be stronger.

**w_012 (refrain)** — `"Your body remembers the bass — a phantom vibration in your sternum that will take days to fully fade."` appears word-for-word as a refrain in three separate conditional branches (fabric_strip, humming_shard, warm_stone). First-match mode means any one player sees it once, so it's invisible in play. But the identical phrasing across emotionally distinct endings feels mechanical. Consider three variations.

### Builder

**b_013 conditional (investigates)** — `"Every heat sink you machined. Every horn you printed. Every late night with the modeling software, arguing with the physics."` — three-item parallel list, flagged in writing rules as a tic. Also "arguing with the physics" is slightly AI.

**b_016** — `"A Russian nesting doll of low-end extending through the floor."` — "Russian nesting doll" is not from the Builder's vocabulary (technical/absurdist) and the metaphor feels grafted on from general AI idiom. A Builder would say something about harmonics nesting or resonant modes.

**b_018** — `"They look ancient. They look earned."` — objects don't "look earned." Earned is a state, not an appearance. This phrasing is characteristic of AI-generated text that reaches for profundity. "They look like they've been somewhere" or just "They look ancient. They look right" might work.

**b_019 conditional (accepts_meaning)** — `"The heat sink is a receipt for services rendered to something that cannot write receipts."` — bureaucratic-cute at the emotional climax. Undercuts the sincere register of "you will know that you were heard." Cut or rework.

### Familiar

**f_005a** — `"His Unity concentration is dense, packed tight under layers of routine and obligation."` — "dense" and "packed tight" are the same descriptor. One goes.

**f_008** — `"returning to their own orbits"` — orbital metaphor is a consistent AI-tell and doesn't fit the Familiar's vocabulary (organic, geological, mycelium-based). "returning to their own circuits" or "back to their own shorelines" would stay in register.

**f_009** — `"calibrated over intervals of time that would be meaningless to express in human units"` — wordy and slightly clinical-AI. "calibrated over time no human unit could hold" or "across intervals your calendars couldn't name" would be tighter.

**f_010b** — `"a homogeneous mixture in which the transcendentals are suspended and accessible"` — chemistry-class vocabulary. The Familiar uses organic/geological metaphors everywhere else. "a solution" by itself is fine, but "homogeneous mixture" is out of register. Try: "a medium in which the transcendentals are loosened and available."

**f_014** — `"visible to you as a luminescence, a shift in the density of the air around her"` — "luminescence" is slightly purple and "shift in the density of the air" is science-textbook. An ancient harvester would see this differently. Maybe: "visible to you as a heat, a loosening in the air around her."

**f_017** — `"The system clears."` — three words, would be fine anywhere except here. "System" is Builder vocabulary. The Familiar's domain is drain/flow/root/tide. Try: "The drain clears." or "The flow restores." or just cut it — the preceding sentences ("Something is restored. The balance shifts.") are doing that work already.

---

## Items for Future Development

1. **Add transcendental award nodes to Wanderer:** See table above. Discuss before editing — adding these enables pip display during runs but does NOT change the transcendence outcome (which is now artifact-based).
2. **Design pale_antler earning path:** Required before `w_called_001` can be written.
3. **Write w_called_001:** The antler-gated path for repeat Wanderer players.
4. **Familiar JSON unlock fix:** Change `completed_character` to `completed_characters: ["wanderer"]` for spec consistency.
5. **Future characters:** Bartender, Jacket Woman, Passed-Over, DJ OOR — architecture supports them (add JSON + char card entry).
6. **Mobile testing:** State bar wrapping behavior on narrow viewports (< 380px) may need adjustment if many tags accumulate.
7. **Wanderer refrain variation:** Three variants for the "phantom vibration in your sternum" closing line across the artifact conditionals.

---

## Engine Changes Log (post-initial-build)

**v1.1:**
- Auto-advance button now appears after 3.5s delay (setTimeout) rather than immediately via CSS animation. Prevents rushed play. Button animates in when it appears.
- Transcendence outcome check changed from `run.transcendentals.length === 4` to `persistent.artifacts` check for all four Wanderer artifacts. Transcendence is now a cross-run achievement.
- Outcome card shows earned artifact (name + transcendental color) and wanderer path progress ("X of 4 carried — Y paths remain").
- Keyboard navigation: `Enter`/`Space`/`→` for advance or first choice, `1`/`2`/`3` for choices by number, `Esc` to return to character select.

---

*End of report.*
