# The Call of Sooboont — Character Prose Generation Guide
**For: Human author and LLM co-author in new sessions**
**Purpose: Replicate the collaborative process for generating character perspective documents**
**Drop this document, the existing character prose docs, and the lore viewer into a new chat to begin.**

---

## What This Process Produces

A **character prose document**: 3,000-5,000 words of continuous second-person present-tense prose covering one character's full evening at the warehouse. This is not a game node tree. It is a voice reference — the quarry from which game nodes are later extracted.

Each character prose document includes:
- The character's complete evening, chronologically aligned to the EVENING_TIMELINE.md
- Branch points marked in [brackets]
- Artifact attachment moments marked in [brackets]
- Cross-character thread markers (details that appear in other perspectives)
- A Notes section cataloging voice markers, threads, branch points, and artifacts

---

## The Process (How We Did It)

The process is collaborative and conversational. It has five phases. Do not skip phases or compress them — the character emerges from the conversation, not from a prompt.

### Phase 1: Character Discovery (Conversation)

The LLM asks questions. The human answers. The goal is to find the character — not their backstory, but their *vibe*. How they move through a room. What they notice. What they're afraid of. What makes them laugh.

**Questions the LLM should ask (adapt to context):**

First question — broad, anchoring:
- "Tell me about this person. Not their backstory — their vibe."
- "Who are they when they walk into a room?"
- "What brought them here tonight?"

Second question — specificity:
- "Are they alone or with someone?"
- "Are they the kind of person who walks onto the dance floor first, or watches from the wall?"
- "What do they do for a living, and how does that change how they see?"

Third question — the game context:
- "What role does this character serve in the player experience?"
- "Is this a first-playthrough character or an unlockable?"
- "What should the player feel after playing this perspective?"

**Rules for Phase 1:**
- Let the human talk. They will volunteer details that are more interesting than anything you'd prompt for.
- Do not suggest character traits. Extract them.
- When the human gives you a rich answer, play it back compressed and ask them to confirm. "So this person is X — does that sound right?" This locks decisions and prevents drift.
- Listen for tonal references (authors, films, vibes). These calibrate the prose voice.
- Listen for meta-details about real people or real objects. These are Easter eggs and tributes. Handle them with respect — "not too self-indulgent, respectful, beautiful."

### Phase 2: Character Compression (LLM Summarizes)

After Phase 1, the LLM compresses everything heard into a tight character brief — 1-2 paragraphs. This is played back to the human for confirmation before any prose is written.

**The compression should include:**
- Who they are (disposition, not biography)
- How they perceive (what sense-mode dominates — textures? frequencies? systems?)
- Their relationship to the evening's events (participant? operator? witness? builder?)
- Their emotional arc (what changes in them between arrival and departure?)
- Tonal references (which authors/films calibrate the voice?)
- Game role (default playthrough? unlockable? Easter egg?)
- Any constraints ("not pretentious," "approachable," "keep it weird")

**Get explicit confirmation before proceeding.** The human should say "yes, that's right" or correct the summary. This is the contract.

### Phase 3: One Clarifying Question (LLM)

Before writing, the LLM asks exactly ONE more question — the question that, if answered wrong, would derail the entire prose. This is not a checkbox question. It is the load-bearing question.

Examples from our process:
- For the Wanderer: "The artifact — do they physically pick something up, or does it appear retroactively?"
- For the Familiar: "Does the Familiar have a body in the way we'd understand it?"
- For the Builder: "Does this character have a name?"

**Rules:**
- Only one question. If you have three questions, pick the one with the highest consequence.
- The question should surface an assumption that, if wrong, would require a full rewrite.
- After the answer, go. Do not ask more questions. Write.

### Phase 4: The Draft (LLM Writes)

Write the full prose document in one pass. Do not outline first. Do not ask for permission to start. The conversation has been the outline. Write.

**Structural template:**

Every character prose document follows the EVENING_TIMELINE.md chronologically, but filtered through the character's perception. The sections map to the timeline:

1. **Before / The Approach** — how this character arrives (or was already there)
2. **Inside / The Room** — first impressions, filtered through character's sense-mode
3. **The DJ OOR Slide** — the synchronization event
4. **The Space Between** (optional) — a pause, an observation, a drink at the bar
5. **The Mating Ritual** — the familiar activation, the pairing
6. **The Dance Circle** — the arrow, the exposure
7. **The Closing** — the harvest completes, the portal closes
8. **The Departure** — the walk home, the artifact discovery, the aftermath

Not every character uses every section. The Builder has "The Contract" and "Load-In" before anyone else arrives. The Familiar has "Before" instead of "The Approach." Adapt the template to the character.

**Voice calibration:**

The prose voice is always second person, present tense. But each character has a distinct register:

| Character | Perceives via | Metaphor family | Tone |
|---|---|---|---|
| Wanderer | Texture, detail | Concrete, sodium, fabric, skin | Curious, reflective, grounded |
| Familiar | Frequency, density | Mycelium, root systems, soil, tide | Ancient, clinical, intermittently comic |
| Builder | Systems, specs | Transfer functions, phase alignment, thermal | Pragmatic, obsessive, emotionally ambushed |

The register for a new character must be defined before writing begins. Ask: **what does this person notice first when they walk into a room?** The answer determines the metaphor family.

**Cross-character threading:**

Every character prose document must include 3-5 specific people or details that appear in at least one other character's document. The same person is described differently through each character's sense-mode:

- Wanderer sees: "scuffed white sneakers with a pen mark on the left toe — a tiny star"
- Familiar sees: "Truth concentration close to the surface, a human sigil she probably doesn't know she made"
- Builder sees: (doesn't notice her — he's looking at the amp rack)

These threads are the connective tissue between playthroughs. A player who does two runs will recognize the sneaker-star woman from both sides. This is the reward for replaying.

**When threading, follow these rules:**
- The physical detail must be specific enough to recognize across perspectives (not "a woman" — "a woman with a star drawn on her sneaker")
- Each character's description of the same person must be genuinely different — not just rephrased, but perceived through a different cognitive framework
- Not every character notices every thread. Absence is also information.

**Marking conventions during drafting:**

Use these bracketed markers throughout the prose:
- `**[BRANCH POINT: description]**` — moments where the game would offer a choice
- `**[ARTIFACT MOMENT: description]**` — moments where an artifact could attach to the player
- `**[CROSS-THREAD: character/detail]**` — details that connect to another character's perspective

### Phase 5: Review and Revision (Conversation)

After the draft, the human reads it and gives feedback. This phase is iterative. Expect 1-3 rounds of revision.

**Common revision patterns from our process:**

- **Technical corrections:** "It's ten circuits, not two." "You dance ON the speakers, not inside them." These are factual fixes — make them precisely and check for consistency across the whole document.
- **Tone calibration:** "That's a little aggressive for this character." "Too pretentious." These require rethinking the line, not just softening it. Find a new angle that delivers the same information in the character's actual voice.
- **Deepening a thread:** "Let's make the chamfer mean something acoustically." These are the best revisions — the human sees a detail and wants it to carry more weight. Follow the thread through the entire document and let it compound.
- **Meta-constraints:** "This character is a tribute to a real person — keep it respectful." These are emotional constraints that override craft considerations. Honor them absolutely.

**Consistency pass:**

After revisions, do a full consistency pass:
- Are all numbers consistent throughout? (circuits, drivers, enclosures)
- Are naming conventions correct? (DJ OOR vs. Oor, Sooboont spelling)
- Do cross-character threads use the same physical details?
- Does the temperature progression make sense?
- Are all branch points and artifact moments marked?
- Does the Notes section at the end accurately reflect the final draft?

---

## The Notes Section

Every character prose document ends with a Notes section. This section is a reference for node extraction and generation. It is not prose — it is structured metadata.

**Required subsections:**

### Voice Markers
The 5-7 defining characteristics of this character's prose voice. Written as rules, not descriptions. Example: "Musical knowledge shows up as body memory, not reference." These are used as generation constraints when creating nodes.

### Cross-Character Threads
A list of every person, object, or detail that appears in another character's document. Include: what the detail is, which other character(s) share it, and how each character perceives it differently.

### Branch Points
Numbered list of every moment where the game would offer a choice. Include: what the choice is between, what tags each option would award, and what the downstream consequence is.

### Artifact Attachment Points
List of moments where an artifact could attach to the player. Include: which transcendental the artifact aligns with, what the artifact is, and the narrative context of the attachment.

### Temperature Map
The temperature progression through the character's evening, section by section.

### Unique Mechanics (if any)
Anything specific to this character that doesn't apply to others. The Builder's unnamed monitoring module. The Familiar's dissolution ending. The Wanderer's texture-collecting.

---

## Character Ideas Not Yet Written

These emerged during our sessions and are candidates for future prose documents:

| Character | Concept | Unlock | Notes |
|---|---|---|---|
| **The Bartender** | One of the familiars, working the bar. Approximate knowledge of human drink rituals. Sees the crowd as a resonance field from behind the bar. | After Familiar playthrough | Comedy potential — pouring drinks with observational accuracy. Could be the "lightest" perspective. |
| **The Bouncer** | Another familiar. Chose a SECURITY jacket because it was near the door. Doesn't understand what security means. Watches everyone arrive. | After Familiar playthrough | Limited vantage — sees only the approach and the door. Deep focus on the cold/warm threshold transition. |
| **DJ OOR** | The construct itself. Humans as mineral deposits. Music as a drill. The crowd as material to be processed. | After all other playthroughs + holy artifact | The most disorienting perspective. Requires the most creative prose. Save for last. |
| **The Jacket Woman** | The woman who never took off her jacket. Mentioned in Wanderer, selected in Dance Circle. What is she holding in? Why the armor? | After Wanderer playthrough | A character defined by resistance. Her evening is about what she refuses to yield, and what it costs her. |
| **The Hand-Holder** | The unnamed person who held the Wanderer's hand during the closing. Who are they? What was their evening? | After Wanderer + Goodness artifact | A character defined by a single moment of connection with the Wanderer. Short perspective — maybe only the closing, from their side. |

---

## What to Drop Into a New Chat

To generate a new character prose document in a fresh session, provide:

1. **This document** (CHARACTER_PROSE_GUIDE.md)
2. **The Evening Timeline** (EVENING_TIMELINE.md)
3. **The Lore Viewer HTML** (lore-viewer.html) — for canonical lore reference
4. **All existing character prose documents** — for cross-character threading and voice differentiation
5. **The Node Authoring Guide** (NODE_AUTHORING_GUIDE.md) — so the LLM understands the downstream use

Then say: "I want to build a new character. Here's who they are..." and let Phase 1 begin.

---

## Tone Reminders

These emerged organically during our sessions and define the project's creative identity:

- **Keep it weird.** The psychedelic, the uncanny, the liminal. This project lives at the intersection of cosmic horror and dance floor euphoria. Lean into the dissonance.
- **The horror is ambient, never performed.** No jump scares. No gore. The horror is in the recognition — that the bass was always a mechanism, that the party was always a lure, that you were always a mineral deposit.
- **Technical specificity is emotional.** The Builder cries at good sound. The Familiar reads resonance fields the way a mycologist reads soil. Precision is how these characters express love for their work and their world.
- **Comedy doesn't undercut horror. It makes it worse.** The bouncer who doesn't know what security means. The bartender pouring drinks with approximate accuracy. Ancient beings running a nightclub. The comedy IS the horror, viewed from a different angle.
- **Every character is a different species of attention.** Same room, same night, completely different document. The Wanderer collects textures. The Familiar reads frequencies. The Builder diagnoses systems. A new character needs a new species of attention, or they're redundant.
- **Respect the tributes.** Some characters are portraits of real people. The details — the Homewreckers, the chamfer, the prairie — are personal. Handle them with craft and care. "Not too self-indulgent. Respectful. Beautiful."
- **The details are the thing.** The star on the sneaker. The paint on the knuckles. The petrichor fog. The game's replay value lives in these specifics. Never cut them — distribute them.

---

*This guide is the process. The process is the guide. Start talking about a person. The prose will follow.*
