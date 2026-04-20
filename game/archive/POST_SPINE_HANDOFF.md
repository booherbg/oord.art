# The Pilgrim's Path — Post-Spine Handoff
**For: Next session continuation**
**Status: Spine nodes authored. Ready for branch entry nodes and meta-tool.**

---

## What Was Done This Session

### 1. Lore Viewer Audit (16 edits)
Deep editorial pass on the lore viewer HTML. All changes targeted shallow or corny text, pushing toward a darker Lovecraftian register. Key shifts:

- **OOR's arc** is no longer therapeutic ("understanding makes it less frightening"). Now: understanding OOR makes *everything else* frightening. Retrospective contamination — every dance floor you've ever been on was a mechanism.
- **Terminal outcomes** rewritten with lingering physical consequences. Transcendence: phantom bass that doesn't stop. Escape: months of checking over your shoulder. Failure: the alley outside is longer than it was.
- **Primordial Plane** is no longer serene. Senses fail, text corrupts, choices appear in unreadable languages. "This is not transcendence. This is exposure."
- **Suboont** is digesting, not breathing.
- **Antlered Companions** lost the reassuring "not threatening" framing. Now: hospital orderlies.
- **Group Consciousness dissolution** is no longer homecoming — "absorbed into a larger body that was already using them."
- Full change list in the updated `lore-viewer.html`.

### 2. Spine Nodes Authored (5 nodes)
`spine_nodes.json` — the voice calibration document. These set the register for everything the generator produces. All hand-written, not generated.

---

## Spine Node Sequence

| ID | Beat | Temperature | Key Moment |
|---|---|---|---|
| `spine_001` | The Approach | cold | Bass felt as pressure, not music. Gradient metaphor. "Gravel pops under your shoes like small bones." |
| `spine_002` | The Threshold | cool | Building found you, not vice versa. Jaw/tendon simile. Cold peels off. |
| `spine_003` | Inside / First OOR | warm | Room larger than building should allow. Full OOR description. First oor_action. "One of them has already found you." |
| `spine_004` | OOR's Nature | warm | The realization: not performing, operating. Crowd as raw material. Music as drill bit. Bass from below in a direction the inner ear can't name. |
| `spine_005` | The Choice | warm | Engage or withdraw. Crowd as gravitational field. "A life in which tonight was just a night." |

---

## Design Decisions Made During Spine Authoring

### Flavor Choices on Linear Nodes
Spine_001 through spine_004 are structurally linear (both choices lead to the same next node), but each offers two flavor choices that tag the player's psychological state differently:

| Node | Choice A (tag) | Choice B (tag) |
|---|---|---|
| spine_001 | "Follow the bass" (`drawn`) | "You didn't choose this direction" (`drifting`) |
| spine_002 | "Your body wants this" (`willing`) | "Something is wrong. You go in anyway" (`wary`) |
| spine_003 | "Move closer" (`approaching`) | "Watch from the edge" (`observing`) |
| spine_004 | "This is what it is" (`accepts`) | "This can't be what it looks like" (`denies`) |

These tags feed `conditional_text` and `arrival_variants` on downstream nodes. The player's psychological posture accumulates — a player who was `drawn`, `willing`, `approaching`, and `accepts` has a very different conditional texture than one who was `drifting`, `wary`, `observing`, and `denies`. Same lore delivery; different felt experience. This is the tight-spine-wide-edges philosophy in practice.

### Tag Vocabulary (Spine Additions)
New tags introduced by spine choices:
`drawn`, `drifting`, `willing`, `wary`, `approaching`, `observing`, `accepts`, `denies`, `surrenders`, `withdraws`, `called`

These supplement the existing vocabulary from the handoff: `brave`, `fearful`, `participates`, `withdraws`, `accepts`, `refuses`, `witnessed_portal`, `offered_to_oor`, `joined_circle`, `stayed_quiet`

Note: `accepts` and `withdraws` appear in both sets. The spine versions are the earliest instances; downstream branches can re-use or refine them.

### Arrival Variants Pattern
Each spine node (except 001, which is the entry point) has `arrival_variants` that respond to the previous node's tag. This was tested throughout the spine and works well — it gives the sense of narrative continuity without requiring the base text to be context-dependent.

Example: spine_003 has three arrival variants:
- `willing` → "The heat is thick and close. Your skin adjusts before your eyes do."
- `wary` → "The warmth does not reassure you. It is too deliberate."
- default → "Inside. The sound has architecture now."

The base text is identical regardless. The arrival text is a one-sentence emotional primer.

### spine_005 Branch Points
The spine terminates at three exits:

| Choice | Next Node | Tag | Requires |
|---|---|---|---|
| "Step into the crowd. Let the bass take you." | `engage_001` | `surrenders` | — |
| "The door. The cold. The walk home." | `withdraw_001` | `withdraws` | — |
| "The antler is warm against your hip." | `called_001` | `called` | `has_artifact: pale_antler` |

- `engage_001` → entry into the main branch system (Unity/Beauty/Truth/Goodness). This node does not yet exist. It should route the player toward a specific transcendental branch — either via a second choice, via run_artifact gating, or via tag-weighted random.
- `withdraw_001` → the avoidance path. Cold temperature. Should be 2–3 nodes of quiet fade, ending at the `escape` terminal. The game gives them nothing. No fanfare. Dull fugue.
- `called_001` → the artifact-gated familiar/deep path. Rare. Requires `pale_antler` in `run_artifacts`. This is the entry point for players who got lucky with the seed and chose to follow it.

### Branch Routing Question (Open)
**How does a player who chooses "engage" get assigned to a specific transcendental branch?**

Options discussed or implied in prior sessions:
1. **Second choice at engage_001** — "The circle draws you" / "The music holds you" / "Someone near you needs help" / "OOR is watching" → explicit routing to Unity/Beauty/Goodness/Truth.
2. **Tag-weighted assignment** — accumulated tags from spine flavor choices influence which branch the player enters. A `drawn`+`willing`+`approaching` player gravitates toward Unity. A `drifting`+`wary`+`observing` player gravitates toward Truth.
3. **Run-artifact gating** — the artifacts seeded at load determine which branch content is accessible. A run with a Unity-tagged artifact routes toward Unity.
4. **Hybrid** — engage_001 presents 2 choices (not 4), and which 2 are offered depends on tags + run_artifacts. This keeps choice count manageable while creating variability.

**Recommendation:** Option 4 (hybrid). Present two branch entries at engage_001, selected by tag/artifact weight. This means each run has access to ~2 branches, requiring 2+ playthroughs for full coverage. Consistent with "three playthroughs covers ~80% of lore" target. The routing logic is a pure function over state — no randomness needed beyond the initial seed.

---

## What To Do Next

### Immediate (Next Session)

1. **Write engage_001** — the branch routing node. Decide on routing mechanic (recommend hybrid). Write the base text: you're in the crowd now, the bass has you, OOR is working. 2 choices appear based on state.

2. **Write withdraw_001 through withdraw_003 + escape terminal** — the avoidance path. 2-3 nodes of cold, quiet, fading. End at escape terminal. These are short and bleak. "You walk home. Your keys are cold. You watch something on your phone until you fall asleep. You do not remember what."

3. **Write one complete branch (recommend Unity)** — 5-6 nodes following the dance circle ritual through to resolution. This is the first branch and will serve as the voice reference for generated branches. Should be hand-authored, not generated, because the generator needs a branch example to match against.

### After That

4. **Build the meta-tool** — once spine + Unity branch exist as voice references, the generator has enough calibration material to produce Beauty, Truth, and Goodness branches. The meta-tool can be built as a React artifact using the Anthropic API.

5. **Generate remaining branches** — Beauty, Truth, Goodness via meta-tool. Author reviews and edits.

6. **Generate artifact pool** — 15-20 artifacts via meta-tool, 8 at a time, reviewed interactively.

7. **Write terminal nodes** — transcendence, harvest, failure, escape. Hand-authored. These are the last words the player reads; they need to be as tight as the spine.

8. **Build renderer** — single HTML file, no framework. Wire up engine.js, transitions, audio triggers. Deploy.

---

## Files Produced This Session

| File | Status | Description |
|---|---|---|
| `lore-viewer.html` | Updated | 16 editorial passes — darker, tighter, more Lovecraftian |
| `spine_nodes.json` | New | 5 hand-authored spine nodes, voice calibration document |
| `POST_SPINE_HANDOFF.md` | New | This document |

---

## Voice Reference Summary

For any agent or human continuing this work, these are the register markers from the spine:

- **Metaphors are mechanical or geological**, never spiritual or emotional. Drill bits, gradients, solvents, mineral deposits. The bass is a tool. The crowd is raw material.
- **Similes use the body against itself.** Jaw with tendons given out. Peristaltic motion. Gravel like small bones. The body recognizes things before the brain does.
- **Direction and geometry are unreliable.** The building was behind you. The bass comes from a direction the inner ear can't name. The room is larger than the building allows.
- **Agency is doubtful from the start.** "You are not certain you chose to come this way." "You thought you were choosing. The building disagrees." "Not because you decided to but because the gradient exists."
- **OOR actions are clinical.** Twelve degrees. A correction. A useful density. "They do not know they were corrected." OOR does not emote. OOR operates.
- **The cold is moral feedback.** Never stated. The player notices it when they move away from the harvest. The warmth is not comfort — it is proximity to the mechanism.
- **Every sentence earns its place.** If a sentence could be cut and the node still works, cut it.

---

*Spine authored. Voice calibrated. The harvest continues.*
