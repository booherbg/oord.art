# The Pilgrim's Path — Node Authoring Guide
**For: Human author and LLM co-author**
**Purpose: Translate prose reference documents into playable game nodes**
**This is a decision-making framework, not a technical spec.**

---

## What This Document Is

The prose reference documents (Wanderer, Familiar, Builder) are quarries. They contain the full texture of each character's evening — every sensory detail, every interior observation, every lore beat. The game is not the quarry. The game is the gems extracted from it, set in a structure that a player moves through in 5-10 minutes.

This guide defines how to extract, where to place, and what to prioritize when converting prose into nodes.

---

## Core Constraints

### Time Budget
- **Target playthrough: 5-10 minutes**
- Average reading speed: ~200 words per minute for engaged fiction
- Total word budget per playthrough: 1,000–2,000 words
- Node count per playthrough path: 8–12 nodes
- **Word budget per node: 100–180 words of displayed text**
- This includes: arrival variant (1 sentence) + base text (2-3 short paragraphs) + conditional text (0-2 sentences) + OOR action block (1-2 sentences)
- This excludes: choice text, which is additional

### Choice Budget
- **2 choices per node is the default.** This is a binary — a decision, not a menu.
- **3 choices maximum**, and only when one is artifact-gated (so most players still see 2).
- Never 4+. If a node has 4 possible directions, split it into two sequential nodes.
- Choice text should be short — one sentence, rarely two. The choice is a gesture, not a paragraph.

### Pacing
- **One beat per node.** A node is ONE of these:
  - A sensory moment (what you feel, see, hear)
  - An interior beat (what you think, realize, decide)
  - A lore delivery (what you learn about the world)
  - An action (what happens around you or to you)
- Never stack multiple beat types in a single node's base text. If a moment in the prose contains a sensory detail AND a realization AND an OOR action, those are 2-3 nodes, not one.
- **Exception:** Conditional text can layer a second beat type on top of the base. A sensory node with conditional interior text is fine — the base delivers the sense, the conditional delivers the thought if the player's tags warrant it.

### What the Player Sees on Screen
A well-built node renders as roughly one screenful:
```
[arrival variant — 1 italic line, contextual]

[base text — 2-3 short paragraphs, the core beat]

[conditional text — 0-2 sentences, tag-dependent]

[OOR action block — 1-2 sentences, italic, offset, if present]

[Choice A]
[Choice B]
```
The player scrolls once at most, then chooses. That's the rhythm.

---

## The Distribution Principle

### No content is cut. Content is distributed.

The prose documents contain ~4,000 words of rich detail per character. A single playthrough uses ~1,500 of those words. The remaining 2,500 words are distributed across:

1. **Parallel paths** — nodes that cover the same timeline moment from different vantage points (floor vs. edge, approaching vs. observing)
2. **Conditional text** — detail that only appears if the player's tag accumulation matches
3. **Other perspectives** — detail that belongs to a different character's playthrough entirely
4. **Later branches** — detail that appears deeper in the game, on transcendental-specific branches

### Distribution priority (where does a detail go?)

When you encounter a strong detail in the prose, ask in this order:

1. **Is it essential to the core experience?** (Every player must encounter this for the story to work.)
   → Base text on the spine or main path. Non-negotiable.

2. **Is it a texture that rewards a specific player disposition?**
   → Conditional text, gated by tags from prior choices.

3. **Is it a texture that rewards a specific vantage point?**
   → Base text on a parallel path (floor path vs. edge path, approaching vs. observing).

4. **Does it belong to a different character's way of seeing?**
   → Move it to that character's node set entirely. The Familiar sees frequencies. The Builder sees systems. The Wanderer sees textures. If a detail is more legible through another character's eyes, it belongs to their playthrough.

5. **Is it a deeper lore beat that rewards replay?**
   → Place it on a branch that requires prior artifact or tag accumulation to reach.

### What IS cut

- **Interior monologue that restates what the prose already showed.** If the sensory detail is strong enough, the thought about the sensory detail is redundant. "The bass enters your body through your feet" does not need "you realize the bass is entering your body through your feet."
- **Transitional prose.** "You walk across the room" is navigation, not content. In the game, the player clicks a choice and arrives at the next node. The transition is implicit.
- **Redundant sensory layering.** The prose might describe the cold three ways in one paragraph. The node picks the best one.
- **Explanatory framing.** "This is not a metaphor" works in prose. In a game node, it reads as the author hedging. Let the metaphor land or don't use it.

---

## Tag Strategy

### Tags are the memory system.

Each choice the player makes adds a tag. Tags accumulate and never expire. By mid-game, a player has 5-8 tags that form a psychological fingerprint. This fingerprint drives conditional text and choice gating.

### Tag types

| Type | Purpose | Examples |
|---|---|---|
| **Disposition** | How the player approaches the experience | `drawn`, `drifting`, `willing`, `wary`, `curious`, `guarded` |
| **Action** | What the player did | `approaching`, `observing`, `surrenders`, `withdraws`, `entered_circle` |
| **Awareness** | What the player has noticed or understood | `saw_oor`, `felt_rod`, `noticed_sync`, `understood_harvest` |
| **Engagement** | How deeply the player participated | `on_floor`, `at_edge`, `danced`, `held_back` |

### Tag design rules

- **One tag per choice.** A choice awards exactly one tag. Not two, not zero.
- **Tags describe what the player chose, not what happened to them.** The tag is `approaching`, not `got_closer`. The player owns the verb.
- **Tag pairs should feel like real psychological poles.** `willing`/`wary` is a real axis. `option_a`/`option_b` is not.
- **Don't over-tag.** If a tag won't be checked by any downstream node's conditional text or choice gating, it doesn't need to exist.

---

## Arrival Variants

### Purpose
Arrival variants are the DAG solution. Multiple paths can converge on the same node. The arrival variant is a 1-sentence contextual primer that acknowledges how the player got here without requiring the base text to be path-dependent.

### Rules
- **One sentence.** Maximum two. This is a whisper, not a paragraph.
- **First match wins.** The engine checks arrival variants in order and uses the first one whose condition matches. Always include a default.
- **The arrival variant sets emotional tone, not plot.** It says "you're nervous" or "you're ready," not "previously you chose to enter the building." The player knows what they chose. The variant reflects how it feels to have arrived here via that choice.

### Pattern
```json
"arrival_variants": [
  { "requires": { "has_tag": "willing" }, "text": "The heat welcomes you. Your body knew before you did." },
  { "requires": { "has_tag": "wary" }, "text": "The warmth is wrong. Too deliberate. Too directed." },
  { "default": true, "text": "Inside. The sound has shape now." }
]
```

---

## Conditional Text

### Purpose
Conditional text is the detail distribution mechanism. It appends 1-2 sentences to a node's base text when the player's state matches a condition. This is how the game delivers texture without making every node dense.

### Rules
- **Additive, not exclusive.** Multiple conditional blocks can fire on the same node. A player with both `wary` and `drawn` gets both appended sentences.
- **Never contradict the base text.** Conditional text adds nuance. It never reverses the base text's meaning or tone.
- **Conditional text should feel earned.** The player made a choice 3 nodes ago. Now they get a sentence that responds to that choice. This is the reward loop. It should feel like the game noticed them.
- **Maximum 2 conditional blocks per node.** More than 2 makes the node unpredictably long and breaks the one-screenful rhythm.

### Pattern
```json
"conditional_text": [
  { "condition": { "has_tag": "wary" }, "append": "Your instinct was right. The wrongness was not the building." },
  { "condition": { "has_artifact": "pale_antler" }, "append": "Something in your pocket hums. You didn't put it there." }
]
```

---

## OOR Action Blocks

### Purpose
OOR action blocks are the game's only third-person voice. They describe what DJ OOR is doing in clinical, observational prose. They are never from the player's perspective. They are an intrusion — a window into the mechanism.

### Rules
- **Clinical. Present tense. Observational. Never emotional.**
- **DJ OOR does not address the player.** The player is not the subject. The crowd, the room, the equipment — these are the subjects. The player is nearby.
- **Specific and technical.** "OOR adjusts a low-pass filter" not "OOR does something to the music." Degrees of rotation. Frequency ranges. The precision is the register.
- **Maximum 2 sentences.** These are glimpses, not scenes.
- **Not every node needs one.** OOR blocks are most effective when sparse — maybe 1 in every 3-4 nodes.

---

## Temperature

### The rule
Temperature is moral feedback, never stated. Choices that move the player toward engagement and the harvest feel warm. Choices that move the player away feel cold. The player is never told this. They may notice it on replay.

### Implementation
- Every node has a `temperature` field: `cold`, `cool`, `warm`, `hot`
- Temperature drives subtle CSS (background tint, text color temperature) and can trigger conditional atmospheric text
- The spine goes: cold → cool → warm → warm → warm
- The withdrawal path goes: warm → cool → cold → cold (escape terminal)
- The deep engagement path goes: warm → hot → hot → stillness

### Authoring rule
When assigning temperature to a node, ask: **is the player closer to or farther from the harvest at this moment?** Closer = warmer. Farther = colder. If the player is exactly at a threshold between engagement and withdrawal, use `cool` — the ambiguity IS the temperature.

---

## Parallel Path Structure

### The model
After the spine (which is linear), the game branches into parallel paths that cover the SAME timeline events from different vantage points. This is not branching plot — it's branching perspective within a shared plot.

```
SPINE (5 nodes, linear, everyone sees these)
  │
  ├── FLOOR PATH (engaged, on the dance floor)
  │     Experiences: the Slide from inside, the Mating Ritual as participant,
  │     the Circle as potential entrant
  │     Details: synchronization felt in the body, boundary dissolution,
  │     the moment self-consciousness drops
  │     Temperature: warm → hot
  │
  └── EDGE PATH (observant, along the wall)
        Experiences: the Slide from outside, the Mating Ritual as witness,
        the Circle as spectator
        Details: the sneaker-star woman, the antlered figures noticed,
        the divining rod hum, the cold at the margins
        Temperature: cool → cold (unless they re-engage)
```

Both paths converge at key moments — the Dance Circle, the Closing — via shared nodes with arrival variants. The convergence nodes are canonical (same base text, same lore delivery). The arrival variants carry the emotional residue of the path.

### Why this works
- Each path is 8-12 nodes (within time budget)
- Each path contains different details from the prose (no content lost, just distributed)
- Replay value: second playthrough takes the other path, gets new textures
- Convergence at key moments means every player witnesses the essential lore regardless of path

---

## Node Extraction Process

### Step 1: Identify beats
Read through the prose document and mark every distinct beat. A beat is a single moment — a sense, a thought, an action, a revelation. The Wanderer prose contains roughly 25-30 beats.

### Step 2: Classify each beat
For each beat, assign:
- **Priority:** ESSENTIAL (every player sees this) / REWARDING (enriches the experience) / TEXTURE (beautiful but optional)
- **Beat type:** Sensory / Interior / Lore / Action
- **Vantage:** Floor / Edge / Both / Character-specific
- **Temperature:** Cold / Cool / Warm / Hot

### Step 3: Assign to node positions
Map ESSENTIAL beats to the spine and main path. Map REWARDING beats to parallel paths and conditional text. Map TEXTURE beats to conditional text and deeper branches.

### Step 4: Draft nodes
Using the beat assignments, draft nodes at 100-180 words each. Each node gets one beat as its base text. Supporting beats from the same timeline moment go into conditional text or arrival variants.

### Step 5: Wire choices
Connect nodes with choices. Each choice:
- Awards one tag
- Points to the next node
- Has optional `requires` condition for gating
- Is one sentence, rarely two

### Step 6: Validate
- Count total words on the longest path through the tree. Should be 1,000-2,000.
- Count nodes on the longest path. Should be 8-12.
- Verify every ESSENTIAL beat appears on every possible path.
- Verify no node exceeds ~180 words of displayed text.
- Verify temperature progression makes sense on every path.

---

## Prompt Directives for LLM Node Generation

When using an LLM to generate nodes from the intermediary document, include these directives in the system prompt:

```
ROLE: You are generating game nodes from a beat map and prose reference.

VOICE CONTRACT:
- Second person. Present tense. Terse.
- Every sentence earns its place. If a sentence can be cut and the node still works, cut it.
- Metaphors are mechanical or geological, never spiritual.
- The body recognizes things before the brain does.
- Agency is always uncertain.
- DJ OOR action blocks are clinical and specific.

NODE CONSTRAINTS:
- Base text: 100-180 words maximum. 2-3 short paragraphs.
- Arrival variant: 1 sentence. Maximum 2. First match wins. Always include default.
- Conditional text: 0-2 blocks. Each block is 1-2 sentences.
- OOR action: 0-1 per node. 1-2 sentences. Clinical. Specific.
- Choices: 2 per node. 3 maximum if one is artifact-gated.
- Choice text: 1 sentence. The choice is a gesture.

DISTRIBUTION RULES:
- One beat per node base text. Do not stack beat types.
- Details that reward specific player dispositions go in conditional text.
- Details that reward specific vantage points go on parallel path nodes.
- Do not restate what sensory detail already shows.
- Do not include transitional prose. Transitions are implicit in the choice system.

TEMPERATURE:
- Assign temperature to every node.
- Warmer = closer to harvest/engagement. Colder = farther.
- Never mention temperature explicitly. It is felt, not stated.

TAG RULES:
- One tag per choice. The tag describes what the player chose.
- Tags should feel like real psychological poles, not game labels.
- Only create tags that will be checked by downstream nodes.

OUTPUT FORMAT:
Return valid JSON matching the node schema exactly. No preamble. No explanation.
Include arrival_variants, conditional_text, oor_action, temperature, choices.
All fields present even if null.
```

---

## Checklist: Before Generating Nodes

Before starting node generation for any character, verify:

- [ ] Prose reference document is complete and reviewed
- [ ] Beat extraction is complete (intermediary document exists)
- [ ] Each beat is classified: Priority / Type / Vantage / Temperature
- [ ] ESSENTIAL beats are mapped to the main path
- [ ] Parallel path structure is defined (what does each path see?)
- [ ] Convergence points are identified (where do paths merge?)
- [ ] Tag vocabulary is defined for this character's choice set
- [ ] Artifact attachment points are identified
- [ ] Temperature progression is mapped for each path
- [ ] Cross-character threads are flagged (which details appear in other perspectives?)

---

*This guide is a living document. Update it as patterns emerge during authoring. The game will teach you what it needs.*
