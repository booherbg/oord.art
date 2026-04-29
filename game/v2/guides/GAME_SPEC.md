# The Call of Sooboont — Game Design Spec (v2)
**Canonical technical reference. Supersedes story_design.md for all mechanical questions.**
**Narrative content lives in the prose and beat map documents. This document defines the machine that runs them.**

---

## Document Map

This spec is one document in a system. Here's what each document does:

| Document | Purpose | Authority |
|---|---|---|
| **This spec (GAME_SPEC.md)** | Engine mechanics, node schema, state model, UI, file structure, generation rules | Canonical for all technical/mechanical questions |
| **EVENING_TIMELINE.md** | What happens in the room. Perspective-agnostic. | Canonical for event sequence |
| **CHARACTER_PROSE_GUIDE.md** | How to write character prose documents | Canonical for authoring process |
| **[CHARACTER]_PROSE.md** | Full evening from one character's perspective. Voice reference. | Canonical for character voice |
| **[CHARACTER]_BEAT_MAP.md** | Beat extraction, tree structure, node shapes. Feeds generation. | Canonical for node structure |
| **NODE_AUTHORING_GUIDE.md** | How beats become nodes. Distribution, pacing, constraints. | Canonical for generation rules |

**Rule: When documents disagree, the beat map wins for structure, the prose wins for voice, and this spec wins for mechanics.**

---

## Architecture Overview

The Call of Sooboont is a single-page browser application. One HTML file, one engine, multiple JSON node files loaded per character. No build step. No framework. No server required beyond static file serving.

```
index.html                  ← shell, engine, styles, character select
/nodes/
  wanderer.json             ← all Wanderer nodes (16 nodes)
  builder.json              ← all Builder nodes (12 nodes)
  familiar.json             ← all Familiar nodes (11 nodes)
```

The engine loads one character's JSON at a time. The node map is cleared and repopulated on character selection. Cross-run state (completed characters, artifacts) persists. Within-run state (tags, transcendentals) resets.

---

## State Model

### Persistent State (survives across runs)

```javascript
persistent = {
  completed_characters: [],   // ["wanderer", "familiar"]
  artifacts: [],              // ["pale_antler", "warm_stone"]
  runs: 0                     // total completed playthroughs
}
```

Stored in `localStorage` under key `pilgrims_path_state`. Reset via settings or dev tools.

### Run State (reset each playthrough)

```javascript
run = {
  character:        "wanderer",
  node:             "w_001",
  tags:             [],         // accumulated choice tags
  transcendentals:  [],         // ["unity", "beauty", "truth", "goodness"]
  pending_arrival:  null        // transient arrival override from choice
}
```

### State Access in Conditions

The condition evaluator checks both persistent and run state:

```javascript
function evaluate(condition, run, persistent) {
  if (!condition) return true;
  if (condition.has_tag)                  return run.tags.includes(condition.has_tag);
  if (condition.has_transcendental)       return run.transcendentals.includes(condition.has_transcendental);
  if (condition.has_artifact)             return persistent.artifacts.includes(condition.has_artifact);
  if (condition.completed_character)      return persistent.completed_characters.includes(condition.completed_character);
  if (condition.transcendentals_complete) return run.transcendentals.length === 4;
  if (condition.not) {
    return !evaluate(condition.not, run, persistent);
  }
  return true;
}
```

---

## Characters

### Selection Screen

Before gameplay, the player sees a character selection screen. Three slots, left to right. Each shows the character name, a one-line tagline, and availability.

| Character | Tagline | Unlock Condition | Start Node |
|---|---|---|---|
| **The Wanderer** | *"You weren't going here."* | Always available | `w_001` |
| **The Familiar** | *"You have been here before."* | Completed Wanderer | `f_001` |
| **The Builder** | *"The email arrived six weeks ago."* | Completed Wanderer + Familiar | `b_001` |

**Locked characters** display grayed out with the tagline replaced by a short mysterious line:

- Familiar (locked): *"This perspective has not opened yet."*
- Builder (locked): *"This perspective requires deeper knowledge."*

No explicit unlock instructions. The player discovers availability by playing.

**Styling:** Character select uses the same dark background, DM Mono, Bebas Neue. Character names in Bebas Neue at heading scale. Taglines in DM Mono italic. Available characters have warm-border cards. Locked characters have dashed-border cards at reduced opacity. Hover on available cards shifts border to `--orange`.

### Character Metadata (per JSON file)

Each character's JSON file begins with a metadata header:

```json
{
  "character": "wanderer",
  "display_name": "The Wanderer",
  "tagline": "You weren't going here.",
  "start_node": "w_001",
  "unlock_requires": null,
  "nodes": [ ... ]
}
```

Builder example:
```json
{
  "character": "builder",
  "display_name": "The Builder",
  "tagline": "The email arrived six weeks ago.",
  "start_node": "b_001",
  "unlock_requires": {
    "completed_characters": ["wanderer", "familiar"]
  },
  "nodes": [ ... ]
}
```

---

## Node Schema

Every node in the game conforms to this schema. Fields marked **required** must always be present (use `null` for unused fields).

```json
{
  "id":                   "w_001",
  "text":                 "You weren't going here.\n\nYou were going — somewhere...",
  "arrival_variants":     [ ... ],
  "conditional_text":     [ ... ],
  "oor_action":           "OOR adjusts the low-pass filter...",
  "temperature":          "cold",
  "awards_transcendental": null,
  "awards_artifact":       null,
  "awards_tags":           [],
  "choices":              [ ... ],
  "terminal":             false,
  "outcome":              null
}
```

### Field Reference

#### `id` — string, required
Node identifier. Prefixed by character: `w_` (Wanderer), `b_` (Builder), `f_` (Familiar). Plus section hint: `w_001`, `w_exit_001`, `b_008a`, `f_011`.

#### `text` — string, required
Base prose text. Second person, present tense. Paragraphs separated by `\n\n`. This is what every player sees regardless of tags. 100–180 words.

#### `arrival_variants` — array or null
Contextual one-line primers. First match wins. Always include a default.

```json
"arrival_variants": [
  { "requires": { "has_tag": "willing" }, "text": "The heat welcomes you." },
  { "requires": { "has_tag": "wary" },    "text": "The warmth is wrong." },
  { "default": true,                      "text": "Inside. The sound has shape." }
]
```

**Override:** If a choice carries an `arrival` string, it replaces the arrival_variants evaluation for that transition. The override is transient — consumed on render, not stored in state.

#### `conditional_text` — array or null
Tag-dependent sentences appended after base text. Maximum 2 per node.

```json
"conditional_text": [
  { "condition": { "has_tag": "wary" },          "append": "Your instinct was right." },
  { "condition": { "has_artifact": "pale_antler" }, "append": "Something in your pocket hums." }
]
```

Multiple conditions can fire on the same node (additive). Conditional text never contradicts base text.

#### `oor_action` — string or null
Clinical OOR observation block. Italic, orange-bordered. Present tense. 1–2 sentences. Not every node needs one. Most effective when sparse.

#### `temperature` — string, required
One of: `"cold"`, `"cool"`, `"warm"`, `"hot"`. Drives CSS class on body element. Never stated to the player in prose. Temperature is felt, not named.

Special value `"stillness"` may be used for the closing node — renders as hot transitioning to neutral. Implementation: use `"hot"` with a CSS modifier class for the closing sequence.

#### `awards_transcendental` — string or null
One of: `"unity"`, `"beauty"`, `"truth"`, `"goodness"`. Awarded on node entry. Triggers the award flash UI element.

#### `awards_artifact` — string or null
Artifact ID string. Awarded on node entry. Added to persistent state.

#### `awards_tags` — array
Tags awarded automatically on node entry, independent of choice. Used for tags that are consequences of arrival rather than decision. Example: entering `w_007e` (the edge) awards `"felt_rod"` because the rod responds to the player regardless of what they choose next.

```json
"awards_tags": ["felt_rod"]
```

Empty array `[]` when no auto-awards.

#### `choices` — array, required
Player choices. 2 per node default. 3 maximum (one artifact-gated). Empty array `[]` for auto-advance nodes.

```json
"choices": [
  {
    "text":     "Follow the bass.",
    "next":     "w_002",
    "tag":      "drawn",
    "arrival":  null,
    "requires": null
  },
  {
    "text":     "You didn't choose this direction.",
    "next":     "w_002",
    "tag":      "drifting",
    "arrival":  null,
    "requires": null
  }
]
```

- `text` — one sentence. The choice is a gesture.
- `next` — target node ID. `null` for terminal replay prompts.
- `tag` — tag string to add to `run.tags` on selection. `null` for tagless choices.
- `arrival` — optional transient string overriding next node's arrival_variants. `null` when not used.
- `requires` — condition object for gating. `null` when ungated. Gated choices not meeting condition are hidden (not shown as locked).

#### Auto-advance nodes
Nodes with `"choices": []` auto-advance. The engine detects this and renders the node without choice buttons. After a brief pause (configurable, ~2 seconds or on-click), the engine advances to the next node.

Auto-advance requires a `next` field at the node level:

```json
{
  "id": "w_008f",
  "text": "...",
  "choices": [],
  "next": "w_009",
  ...
}
```

#### `terminal` — boolean, required
`true` for end-of-path nodes. Renders outcome card styling. Shows "Begin again" button.

#### `outcome` — string or null
Terminal outcome identifier. One of: `"transcendence"`, `"harvest"`, `"escape"`, `"dissolution"`, `"recognition"`. `null` for non-terminal nodes.

On terminal render, the outcome is recorded and the character is added to `persistent.completed_characters` if not already present.

---

## Terminal Outcomes

| Outcome | Characters | Meaning |
|---|---|---|
| `transcendence` | Wanderer | Full participation. All four transcendentals yielded. See design note below. |
| `harvest` | Wanderer | Partial participation. Something taken you didn't offer. Lighter. Not sure this is good. |
| `escape` | Wanderer | Withdrew. Intact. Safe — and this is the exact problem. The dark longing. Incompletion. |
| `recognition` | Builder | You were heard. The heat sink sings your frequency. The mechanism acknowledged who built its throat. |
| `dissolution` | Familiar | The body is optional. The function is complete. You are — |

### Transcendence — Design Note

The following is the design spirit of the transcendence ending. It should inform the terminal node prose when the Wanderer's full-participation path is written, and the `w_called_001` node once the called path is built.

---

All four transcendentals yielded. The Kabbalists said the world is made of light that shattered into matter — holy sparks in everything, waiting to be returned. After your experience tonight, you understand what they meant. The same process ran through the first fire circles, through every gathering where humans moved together and felt the boundary between them become optional. Tonight was one of those gatherings. What moved through you wasn't created here. It was always present — in a certain quality of winter light, kind gesture between strangers, in the moment two dancers moved to the same flow and felt it without looking. Tonight you were open and it all moved through you. What you felt was alignment: the specific resonance of focusing your presence on what is real. Goodness. Truth. Beauty. Unity. These don't require a cosmic warehouse dance party. What the experience gave you was permission — a signal loud enough to get past the reasons you keep yourself at a distance. You know the frequency now. You can find it anywhere you're willing to look for it.

---

**Outcome rendering:** Terminal nodes use the outcome card styling (yellow border, Bebas Neue outcome label). The outcome label is displayed but the meaning is NOT explained to the player — the prose delivers the meaning. The label is a single word, not a description.

**Completion tracking:** When a terminal node renders, the engine adds the current character to `persistent.completed_characters` and increments `persistent.runs`. This unlocks subsequent characters on the selection screen.

---

## Temperature System

Temperature is a CSS-driven ambient signal. It affects border color and state bar display. The player is never told what temperature means. It is moral feedback encoded as aesthetics.

### CSS Implementation

```css
/* Border temperature */
.temp-cold .node-card { border-color: #1a2030; }
.temp-cool .node-card { border-color: #1e1e28; }
.temp-warm .node-card { border-color: var(--border-warm); }
.temp-hot  .node-card { border-color: #4a2010; }
```

### Temperature Map Summary (from beat maps)

**Wanderer:** cold → cool → warm → warm → warm → hot (floor) or cold (edge) → hot → hot→still → cold
**Builder:** cold → warm → warm → warm → hot → warm → hot → hot/warm → hot → hot→still → cold
**Familiar:** cool → cool → warm → warm → hot → hot → hot → hot → hot→still → cool → cold

The Familiar runs warmest (always near the harvest). The Wanderer has the widest range (cold edge path to hot circle). The Builder sits in the middle (always warm because they built the instrument).

---

## Tag System

### Design Rules (from NODE_AUTHORING_GUIDE)
- One tag per choice. No exceptions.
- Tags describe what the player chose, not what happened to them.
- Tag pairs should feel like real psychological poles: `willing`/`wary`, not `option_a`/`option_b`.
- Only create tags that will be checked by downstream conditional text or gating.
- `awards_tags` are for consequences of arrival, not choice.

### Tag Vocabularies by Character

**Wanderer** (7 choice tags + 2 auto-awards):

| Tag | Type | Source | Pole |
|---|---|---|---|
| `drawn` | Disposition | w_001 choice | vs `drifting` |
| `drifting` | Disposition | w_001 choice | vs `drawn` |
| `willing` | Disposition | w_002 choice | vs `wary` |
| `wary` | Disposition | w_002 choice | vs `willing` |
| `approaching` | Disposition | w_003 choice | vs `observing` |
| `observing` | Disposition | w_003 choice | vs `approaching` |
| `accepts` | Disposition | w_004 choice | vs `denies` |
| `denies` | Disposition | w_004 choice | vs `accepts` |
| `surrenders` | Action | w_005 choice | vs `withdraws` |
| `withdraws` | Action | w_005 choice | (exit path) |
| `stays` | Action | w_006 choice | vs `retreats` |
| `retreats` | Action | w_006 choice | vs `stays` |
| `returns` | Action | w_007e choice | vs `lingers` |
| `lingers` | Action | w_007e choice | vs `returns` |
| `drawn_back` | Action | w_008e choice | vs `retreating` |
| `retreating` | Action | w_008e choice | (exit path) |
| `entered_circle` | Action | w_009 choice | vs `watched_circle` |
| `watched_circle` | Action | w_009 choice | vs `entered_circle` |
| `felt_rod` | Awareness | w_007e auto | — |
| `participated_ritual` | Engagement | w_008f auto | — |

**Builder** (3 choice tags + 2 auto-awards):

| Tag | Type | Source | Pole |
|---|---|---|---|
| `investigates` | Disposition | b_002 choice | vs `accepts_gig` |
| `accepts_gig` | Disposition | b_002 choice | vs `investigates` |
| `investigates_module` | Disposition | b_004 choice | vs `trusts_data` |
| `trusts_data` | Disposition | b_004 choice | vs `investigates_module` |
| `stays_floor` | Action | b_007 choice | vs `returns_rack` |
| `returns_rack` | Action | b_007 choice | vs `stays_floor` |
| `on_floor` | Engagement | b_008a auto | — |
| `at_rack` | Engagement | b_008b auto | — |

**Familiar** (3 choice tags, no auto-awards):

| Tag | Type | Source | Pole |
|---|---|---|---|
| `reads_crowd` | Disposition | f_002 choice | vs `monitors_aperture` |
| `monitors_aperture` | Disposition | f_002 choice | vs `reads_crowd` |
| `stays_embedded` | Action | f_005 choice | vs `pulls_back` |
| `pulls_back` | Action | f_005 choice | vs `stays_embedded` |
| `watches_yield` | Disposition | f_008 choice | vs `watches_person` |
| `watches_person` | Disposition | f_008 choice | vs `watches_yield` |

---

## Transcendental System

Four transcendentals. Within-run state. Reset on new playthrough.

| Transcendental | Color | UI Label |
|---|---|---|
| Unity | `#4080D0` | `Unity yielded — many bodies, one motion` |
| Beauty | `#D04870` | `Beauty yielded — form exceeding function` |
| Truth | `#D4A820` | `Truth yielded — presence without performance` |
| Goodness | `#40A060` | `Goodness yielded — care without audience` |

**Wanderer:** Can earn 0–4 transcendentals depending on path. Determines artifact and outcome.
**Builder:** Earns Beauty (universal — the system doing something impossible and beautiful).
**Familiar:** Earns none. The Familiar is the mechanism, not the material.

Transcendental pips display in the state bar. Unearned pips are dim (opacity 0.2). Earned pips light up with background tint and full opacity. The award flash renders inline in the node card when a transcendental is earned.

---

## Artifact System

Artifacts are persistent cross-run state. They survive between playthroughs and can gate choices or conditional text in future runs.

| Artifact | Character | Condition | Transcendental |
|---|---|---|---|
| `warm_stone` | Wanderer | `stays` + `participated_ritual` | Unity |
| `fabric_strip` | Wanderer | `entered_circle` | Truth |
| `humming_shard` | Wanderer | `felt_rod` | Beauty |
| `yarn_knot` | Wanderer | `willing` + closing reached | Goodness |
| `heat_sink` | Builder | All paths (universal) | Beauty |
| `pale_antler` | TBD | Cross-run, not yet designed | Gates `called` path |
| *(none)* | Familiar | N/A | N/A |

**Artifact delivery** is handled as conditional text on the terminal node, not as a separate mechanic. The prose describes finding the artifact. The `awards_artifact` field records it to persistent state.

**Artifact priority (Wanderer):** When multiple conditions are met, first match wins. Priority order: Truth > Beauty > Unity > Goodness.

---

## UI Specification

### Design Language
- **Background:** `#07050a` with fractal noise overlay at 2.5% opacity
- **Fonts:** Bebas Neue (headings, titles, outcome labels), DM Mono (everything else)
- **Palette:** See CSS variables section below
- **Cards:** 1px solid border, 2px radius, `rgba(14, 11, 18, 0.8)` background
- **Animation:** Fade-up on node entry (0.6s ease). Staggered paragraph animation. Choice buttons fade in last (~1s delay).

### CSS Variables

```css
:root {
  --bg:          #07050a;
  --orange:      #E86010;
  --yellow:      #D4A820;
  --violet:      #6020C0;
  --pink:        #D04870;
  --text:        #C8BCA8;
  --text-dim:    #6A6058;
  --text-bright: #E8DCC8;
  --border:      #201818;
  --border-warm: #3A2818;
  --unity:       #4080D0;
  --beauty:      #D04870;
  --truth:       #D4A820;
  --goodness:    #40A060;
}
```

### Node Card Anatomy

```
┌─────────────────────────────────────┐
│ w_001                    (node ID, dim, 9px)
│                                     │
│ The heat welcomes you.   (arrival, italic, yellow, 12px)
│ ─────────────────────               │
│                                     │
│ Base text paragraph 1.   (body, 14px, --text)
│                                     │
│ Base text paragraph 2.              │
│                                     │
│ ┃ Conditional sentence.  (violet left-border, --text-bright, 12px)
│                                     │
│ ┃ OOR adjusts the low   (orange left-border, italic, 12px)
│ ┃ end by 3 dB.                      │
│                                     │
│ ◆ Unity yielded          (award flash, colored bg, 11px)
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Follow the bass.        (choice)│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ You didn't choose this. (choice)│ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### State Bar (fixed bottom)

```
┌───────────────────────────────────────────────────────┐
│ WARM  │ Unity │ Beauty │ Truth │ Goodness │  drawn willing  │ Restart │
└───────────────────────────────────────────────────────┘
```

Temperature label (left), transcendental pips (center-left), accumulated tags (right), restart button (far right).

**Design note:** The temperature display is a debug/development aid. Consider hiding it in production builds, or rendering it as an ambient indicator rather than a labeled value. The beat maps specify that temperature is "never stated" — the CSS border color shift carries the signal.

### Character Select Screen

Replaces the current direct-to-gameplay flow. Three cards arranged vertically (mobile-first) or horizontally (wider viewports).

```
┌──────────────────────────────────────┐
│         THE PILGRIM'S PATH           │  (Bebas Neue, orange)
│              ——————                  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  THE WANDERER                  │  │  (available: warm border)
│  │  "You weren't going here."    │  │  (italic, yellow, 12px)
│  └────────────────────────────────┘  │
│                                      │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  ╎  ???                           ╎  │  (locked: dashed, dim)
│  ╎  "This perspective has not     ╎  │
│  ╎   opened yet."                 ╎  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                      │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  ╎  ???                           ╎  │  (locked: dashed, dim)
│  ╎  "This perspective requires    ╎  │
│  ╎   deeper knowledge."           ╎  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                      │
└──────────────────────────────────────┘
```

After first Wanderer completion, the Familiar card unlocks (name and tagline revealed, border solidifies). The Builder remains locked until both are complete.

### Dissolution Rendering (Familiar only)

Node `f_011` requires special rendering. The standard node card renders normally, but the prose content itself degrades — this is an authoring concern, not an engine concern. The engine renders whatever text is in the node.

**Optional enhancement:** A CSS class `.dissolving` on the node card could introduce subtle visual degradation — slight opacity flicker, text-shadow blur, border-color fade-to-transparent. This is additive, not required for v1.

### Auto-advance Rendering

Nodes with empty `choices` array and a `next` field auto-advance. Two implementation options:

1. **Click-to-advance:** Render node without choice buttons. Show a subtle "continue" prompt (dim, bottom of card). Player clicks anywhere on the card or the prompt to advance.
2. **Timed advance:** Render node, wait 2–3 seconds, auto-advance with fade transition.

Recommend option 1 for v1 — it preserves player control and reading pace.

---

## Engine Pipeline

### Initialization
1. Check `localStorage` for persistent state. Create default if absent.
2. Render character select screen.
3. On character selection: load that character's JSON, populate `nodeMap`, initialize run state, render start node.

### Render Cycle
1. Look up `run.node` in `nodeMap`. If missing → stub card.
2. Process `awards_tags`: push each to `run.tags` if not already present.
3. Process `awards_transcendental`: push to `run.transcendentals` if not already present. Record for award flash.
4. Process `awards_artifact`: push to `persistent.artifacts` if not already present.
5. Determine arrival text: if `run.pending_arrival` exists, use it and clear it. Otherwise evaluate `arrival_variants` against run + persistent state.
6. Render base text (paragraphs split on `\n\n`, staggered animation).
7. Evaluate `conditional_text` conditions. Render matching appends.
8. Render `oor_action` if present.
9. Render transcendental award flash if applicable.
10. Evaluate `choices` — filter by `requires` conditions. Render visible choices. If empty array + `next` exists → auto-advance mode.
11. If `terminal === true` → record completion, render outcome card, show "Begin again" and "Choose another perspective" buttons.

### Choice Handling
1. Record `choice.tag` to `run.tags` (if not null).
2. Record `choice.arrival` to `run.pending_arrival` (if not null).
3. Set `run.node` to `choice.next`.
4. Re-enter render cycle.

### Run Completion
1. On terminal node render: add `run.character` to `persistent.completed_characters` if absent.
2. Increment `persistent.runs`.
3. Save persistent state to localStorage.
4. Render outcome card with outcome label.
5. Show two buttons: "Begin again" (restart same character) and "Choose another perspective" (return to character select).

---

## Node Generation from Beat Maps

The beat maps are the blueprints. Node generation converts beat map entries into valid JSON nodes. This section defines the generation contract.

### Input
- The beat map entry for the node (beats, node shape, temperature, choices)
- The prose document for voice reference
- The voice contract from the beat map's generation notes

### Output
- A JSON object conforming to the node schema above
- Base text of 100–180 words
- All fields present, `null` where unused

### Generation Rules
1. **One beat type per node base text.** Sensory OR interior OR lore OR action. Conditional text can layer a second type.
2. **Trust the prose voice.** The beat map says what goes in the node. The prose document says how it sounds.
3. **Arrival variants: first match wins.** Check conditions in order. Default is last. 1 sentence each.
4. **Choice text: 1 sentence.** The choice is a gesture, not a paragraph.
5. **OOR action blocks are clinical.** Present tense. Observational. Never emotional. The player is not the subject. 1–2 sentences.
6. **Conditional text is earned.** It should feel like the game noticed the player's earlier choice. 1–2 sentences per block. Maximum 2 blocks per node.
7. **Temperature is assigned, never mentioned.** The prose never says "warm" or "cold" in reference to the game's temperature system.

### Validation Checklist (per node)
- [ ] Word count of displayed text (arrival + base + max conditionals + OOR) ≤ 200
- [ ] Base text ≤ 180 words
- [ ] Arrival variants include a default
- [ ] Each choice has exactly one tag (or null for tagless transitions)
- [ ] Temperature is one of: cold, cool, warm, hot
- [ ] All referenced next-node IDs exist in the character's node set
- [ ] Conditional text conditions reference tags that are actually awardable upstream

### Validation Checklist (per character, full set)
- [ ] Start node matches character metadata
- [ ] Every path from start to terminal is 8–12 nodes
- [ ] Total words on longest path: 1,000–2,000
- [ ] Every ESSENTIAL beat from the beat map appears on every possible path
- [ ] Temperature progression is monotonically sensible on every path
- [ ] No orphan nodes (unreachable from start)
- [ ] No dead ends (non-terminal nodes with no outgoing edges)
- [ ] Terminal nodes have `terminal: true` and a valid `outcome`

---

## Writing Rules (Generation Canon)

### Voice
- Second person. Present tense. Sparse. Every sentence earns its place.
- Character-specific voice is defined in each beat map's voice contract section.
- OOR action blocks: clinical, present tense, observational, never emotional.

### What to avoid
- OOR speaking to or addressing the player
- Explaining the metaphor after it lands
- The "not X — more like Y" construction more than once per screen
- Hedging: "something like", "a kind of", "in some way"
- Parallel lists of three (overused tic)
- Describing transcendentals as emotions — they are minerals
- Referencing OOR's anatomy as costume elements
- Naming specific real-world songs
- Resolving the portal's origin or Sooboont's nature
- "Safe" as an endpoint for the Escape outcome
- Mentioning temperature by name in prose

### Naming Convention
- **DJ OOR**: at the decks, in the warehouse, during performance
- **Oor**: cosmology, lore exposition, outside the performance context
- **OOR**: in OOR action blocks (clinical meta-narration register)
- **Sooboont**: always Sooboont (not Suboont, not Subbont)

---

## Extensibility

### Adding a new character
1. Write the character prose document (see CHARACTER_PROSE_GUIDE.md)
2. Build the beat map (follow existing beat map format)
3. Generate nodes as JSON conforming to the schema above
4. Add character metadata with `unlock_requires`
5. Add the character card to the selection screen
6. No engine changes required — the engine is character-agnostic

### Adding a new artifact
1. Define the artifact ID, earning condition, and character
2. Add `awards_artifact` to the relevant terminal or branch node
3. Add condition checks (`has_artifact`) to any nodes that gate on it
4. Add the artifact to the artifact table in this spec

### Adding a new outcome
1. Add the outcome string to the terminal outcomes table
2. Add outcome-specific card styling if needed (color, border)
3. No engine changes — the engine renders whatever outcome string is present

### Adding cross-character state
The `persistent.artifacts` array and `persistent.completed_characters` array are the cross-run bridges. To add a mechanic where Character A's choices affect Character B's experience:
1. Award an artifact on Character A's path
2. Gate conditional text or choices on Character B's path with `has_artifact`
3. Example: `pale_antler` (found on Familiar path) gates the `called` choice on the Wanderer's `w_005`

---

## File Inventory (v2)

### Spec & Process Documents
- `GAME_SPEC.md` — this document
- `EVENING_TIMELINE.md` — event sequence
- `CHARACTER_PROSE_GUIDE.md` — authoring process
- `NODE_AUTHORING_GUIDE.md` — beat-to-node conversion rules

### Character Documents (per character)
- `WANDERER_PROSE.md` — voice reference
- `WANDERER_BEAT_MAP.md` — node blueprint (16 nodes)
- `BUILDER_PROSE.md` — voice reference
- `BUILDER_BEAT_MAP.md` — node blueprint (12 nodes)
- `FAMILIAR_PROSE.md` — voice reference
- `FAMILIAR_BEAT_MAP.md` — node blueprint (11 nodes)

### Game Files
- `index.html` — shell, engine, styles, character select
- `nodes/wanderer.json` — all Wanderer nodes
- `nodes/builder.json` — all Builder nodes
- `nodes/familiar.json` — all Familiar nodes

---

*This spec defines the machine. The beat maps define the structure. The prose defines the voice. Generate accordingly.*
