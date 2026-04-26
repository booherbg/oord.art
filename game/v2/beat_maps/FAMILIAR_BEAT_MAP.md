# The Familiar — Beat Extraction & Node Map (v2)
**Intermediary document. Feeds node generation.**
**Built from: FAMILIAR_PROSE.md, EVENING_TIMELINE.md, lore-viewer.html**
**No legacy spine. All nodes authored fresh from prose.**

---

## Naming & Lore Conventions (Verify Before Generating)

- **Sooboont** (not Suboont, not Subbont)
- **DJ OOR** when at decks, in the warehouse, operating. **Oor** when discussed as entity in cosmology.
- Oor is a **construct**, not a deity. Conceived in the manner of the Dunwich Horror.
- The portal is a **healing connection** — clearing a clogged drain. Failure = portal yawns, spreads, consumes.
- The divining rod of Sooboont (not theremin, not wearable)
- Participants are the **conduit**. The crowd is the **circuit**.
- Humans are **deposits**, **sources**, **concentrations** — the Familiar's vocabulary. Not dehumanizing. Clinical the way a doctor is clinical.
- The four transcendentals: **Unity, Beauty, Truth, Goodness** — harvestable minerals in the Familiar's ontology.
- The Familiar and its partner are **antlered companions**. They serve the harvest. They are not human. They are wearing humans.

---

## Character Unlock & Context

The Familiar is the **default second playthrough** — available after the Wanderer. The player has experienced the evening from the dance floor. Now they experience it from behind the apparatus — the ancient being who built the room, who read the crowd, who paired the deposits, who dissolved when the function completed.

**The reward of this playthrough is depth.** The Familiar delivers more lore per node than either other character. The player who chose the Familiar after the Wanderer is here to learn what was actually happening. Every moment they lived through blind is now explained — not didactically, but through the Familiar's alien clinical attention. The sneaker-star woman was a Truth deposit. The bartender was faking it. The bass was Sooboont exhaling. The warmth was the mechanism.

This is the longest playthrough by design. The other two are 8-9 minute experiences. The Familiar is a 12-14 minute deep dive. The player chose this. Give them everything.

---

## Tree Overview

```
BEFORE
f_001 (The Body) --> f_002 (The Room) --> f_003 (The Aperture)
  cool                cool                  cool
                                              |
                                       [reads_crowd / monitors_aperture]
                                              |                          CHOICE 1
THE OPENING                                   v
f_004 (The First Note)
  warm
    |
    +--ROUTED BY CHOICE 1--+
    |                      |
f_005a (The Deposits)   f_005b (The Field)
  warm                    warm
    |                      |
    +----------+-----------+
               v
f_006 (Dancing and Yielding)  <-- convergence
  warm
    | (auto)
    v
THE SLIDE
f_007 (The Protocol)
  hot
    | (auto)
    v
f_008 (The Participation)
  hot
    |
    [stays_embedded / pulls_back]                                        CHOICE 2
    |
    v
THE MATING RITUAL
f_009 (The Activation)  <-- convergence
  hot
    |
    +--ROUTED BY CHOICE 2--+
    |                      |
f_010a (The Pairing)    f_010b (The Survey)
  hot                     hot
    |                      |
    +----------+-----------+
               v
f_011 (The Wanderer)  <-- convergence
  hot
    |
    [notes_and_moves / lingers_on_watcher]                               CHOICE 3
    |
    v
f_012 (Completion)
  hot
    | (auto)
    v
THE DANCE CIRCLE
f_013 (The Mechanism)
  hot
    | (auto)
    v
f_014 (The Yields)
  hot
    |
    [watches_yield / watches_person]                                     CHOICE 4
    |
    v
f_015 (The Beekeeper)  <-- convergence
  hot
    | (auto)
    v
THE CLOSING
f_016 (The Descent)
  hot
    | (auto)
    v
f_017 (The Silence)
  hot -> stillness
    | (auto)
    v
AFTER
f_018 (The Reckoning)
  cool
    | (auto)
    v
f_019 (The Partner)
  cool
    | (auto)
    v
DISSOLUTION
f_020 (The Dissolution)
  cold / TERMINAL
  outcome: dissolution
```

---

## Path Lengths

| Path | Route | Nodes | Est. Time |
|---|---|---|---|
| All paths | 001→002→003→004→005(a or b)→006→007→008→009→010(a or b)→011→012→013→014→015→016→017→018→019→020 | 18 | ~12 min |

18 nodes per path. 20 total nodes (2 parallel pairs). 4 choice points.

---

## Structural Design: Parallel Lore Branches

The Familiar's tree is linear — every player visits the same sequence of events. But at two points, the player's prior attentional choice determines **which lore thread is delivered at depth**:

**Branch 1 (f_005a / f_005b):** Driven by Choice 1 (reads_crowd / monitors_aperture).
- **f_005a — The Deposits:** The paint-knuckle man and sneaker-star woman as individual concentrations. Close reading of two specific humans. How the Familiar sees texture as mineral density. The cross-character payoff lives here — the same strangers the Wanderer noticed for their surfaces are revealed as deposits with measurable yield.
- **f_005b — The Field:** The aggregate resonance field. Each body as a frequency added to the harmonic. The mycologist metaphor at full extension. How the room changes composition as it fills. Lore about the relationship between individual deposits and the collective field.

**Branch 2 (f_010a / f_010b):** Driven by Choice 2 (stays_embedded / pulls_back).
- **f_010a — The Pairing:** The sneaker-star woman's hand, the half-closed-eyes man, the six-inches-closer adjustment, the rod going quiet. The intimate act of placing two humans in resonance. "Something crosses between them that you recognize but cannot name because it is a human thing and you are not, tonight, a human." The emotional center of the Familiar's function.
- **f_010b — The Survey:** The crowd sweep. Rod sings and quiets, sings and quiets. Deep deposits buried under calcification. Shallow deposits glowing, leaking. The pairing strategy: shallow as solvents, deep as volume. The systematic view of the ritual as field operation.

Both parallel nodes at each branch point cover the same timeline moment. The difference is aperture — intimate focus vs. wide lens. A player who does two Familiar runs sees both, and the Mating Ritual in particular transforms from a specific human moment to a systematic field operation (or vice versa). That's genuine replay value.

### Schema Addition: Conditional Routing

Auto-advance nodes with parallel targets require a conditional `next` field:

```json
{
  "id": "f_004",
  "choices": [],
  "next": [
    { "requires": { "has_tag": "reads_crowd" }, "target": "f_005a" },
    { "default": true, "target": "f_005b" }
  ]
}
```

When `next` is an array, the engine evaluates conditions in order (first match wins, default last). When `next` is a string, it routes directly. This is the only schema extension required for v2.

---

## Tag Accumulation

Four choices, all dispositional. No action tags — the Familiar's actions are fixed.

| Tag | Type | Source | Pole |
|---|---|---|---|
| `reads_crowd` | Disposition | f_003 | vs `monitors_aperture` |
| `monitors_aperture` | Disposition | f_003 | vs `reads_crowd` |
| `stays_embedded` | Action | f_008 | vs `pulls_back` |
| `pulls_back` | Action | f_008 | vs `stays_embedded` |
| `notes_and_moves` | Disposition | f_011 | vs `lingers_on_watcher` |
| `lingers_on_watcher` | Disposition | f_011 | vs `notes_and_moves` |
| `watches_yield` | Disposition | f_014 | vs `watches_person` |
| `watches_person` | Disposition | f_014 | vs `watches_yield` |

16 possible fingerprints (2⁴). The fingerprints that matter most for the dissolution ending cluster around two axes:

**The Function axis:** reads_crowd + pulls_back + notes_and_moves + watches_yield = pure technician. Clean dissolution. The body is a tool. Put it away.

**The Feeling axis:** monitors_aperture + stays_embedded + lingers_on_watcher + watches_person = something leaking through the clinical precision. Messy dissolution. A residue. Something that was almost a feeling.

Most players will land somewhere between these extremes. The conditional text responds to individual tags, not to the full fingerprint, so partial mixes produce partial cracks in the clinical surface.

---

## Beat Extraction by Section

---

### BEFORE
Prose source: "Before" (~500 words, 7 paragraphs)

This section carries the **cargo cult revelation** and the **body-as-tool introduction**. It's the Familiar's identity document. Three nodes — each has a distinct function.

#### f_001 — The Body

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 1 | You have been here before. Not here. This moment before a harvest. Forests older than language. Root systems. Tide pools at edges of continents that no longer exist. Water changing temperature in exactly this way. | Interior | ESSENTIAL | Base text, opening |
| 2 | Wearing a body. Good body. Functional, upright, appropriately jointed. Chosen by fit, by purpose. Hands. Ears. A face other bodies won't flinch from. The work requires proximity. | Interior | ESSENTIAL | Base text |
| 3 | Roll your shoulders. Body responds well. Check hands — they work. Antlers folded down under hood. Rod in coat, flat against ribs, inert. Will wake when portal opens. Always does. | Sensory | ESSENTIAL | Base text |

Node shape:
- Arrival variants: none (first node)
- Base text (~150 words): beats 1, 2, 3. Pure character introduction. Three paragraphs, three statements of identity: I am ancient, I am wearing this, this body is ready. Beat 1 establishes geological time. Beat 2 establishes the tool-body. Beat 3 establishes the rod. No lore yet — no aperture, no OOR, no humans. Just the Familiar, alone in the room it built, checking the instrument it's wearing.
- Conditional: none (first node)
- OOR action: none
- Temperature: cool
- No choice. Auto-advance to f_002.

---

#### f_002 — The Room

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 4 | The others are here. Distributed in positions from a geometry humans can't perceive. | Interior | ESSENTIAL | Base text |
| 5 | Bartender: pouring liquids with careful focus of ritual learned from observation. Glasses mostly correct. Proportions close enough. | Texture | ESSENTIAL | Base text (cargo cult beat 1) |
| 6 | Bouncer: near door, very still, SECURITY jacket. Chose it because it was near the door. Does not know what security means in this context. Large person near entrance. Seems to satisfy them. | Texture | ESSENTIAL | Base text (cargo cult beat 2) |
| 7 | Not sure humans notice the seams. Room assembled from references — composite of a thousand nights in a thousand cities. Bar in right place. Lights doing right thing. Fog was your idea. Obscures where architecture becomes unreliable. | Interior/Lore | ESSENTIAL | Base text (cargo cult beat 3) |

Node shape:
- Base text (~160 words): beats 4, 5, 6, 7. The cargo cult node. The player who accepted drinks from the bartender and walked past the bouncer on the Wanderer run now learns: the bartender learned pouring from observation, the bouncer doesn't understand his own job, the fog was designed to hide architectural failure. This is the Pratchett-DNA node — every sentence is comedy that is also horror. Give each familiar (bartender, bouncer) their own paragraph. Let the comedy breathe.
- Conditional: none
- OOR action: none
- Temperature: cool
- No choice. Auto-advance to f_003.

---

#### f_003 — The Aperture

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 8 | DJ OOR at center. Technician looks at reactor. Respect, familiarity, understanding that what it contains is not meant for the vessel. Orange and yellow casing — concessions to materiality. Thing inside not orange. Not a thing. | Sensory/Lore | ESSENTIAL | Base text |
| 9 | Portal ready. Aperture is the floor — always has been. Thinnest place between planes. Membrane worn almost through. | Lore | ESSENTIAL | Base text |
| 10 | Feel Sooboont on the other side. Not presence — pressure. Weight of ocean against dam. | Lore | ESSENTIAL | Base text |
| 11 | Transcendental flow blocked. How long? Time not your strongest suit. Long enough humans mistake numbness for contentment. Drain must be cleared or system fails. | Lore | ESSENTIAL | Base text |
| 12 | First humans arrive. Through door past security pretender. Accept drinks from bartender pretender. Find room convincing. | Action | ESSENTIAL | Base text |
| 13 | Not pride — no architecture for pride. Mechanical satisfaction. Trap is set. No — not trap. Clinic. They are sick and do not know it. You are the treatment they did not seek. Service. The work. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 8, 9, 10, 11, 12, 13. The lore-delivery node. DJ OOR as reactor, the floor as aperture, Sooboont as ocean against a dam, the transcendental blockage, and the Familiar's self-correction from "trap" to "clinic." Six beats but each is one sentence or two. The rhythm is accumulating understanding — the player who played the Wanderer learns what the floor was, what the bass was for, why the warmth had a source. Beat 13 is the emotional core: the self-correction defines the Familiar's relationship to its own function.
- Conditional: none
- OOR action: none. The Familiar narrates OOR directly — no clinical distance needed.
- Temperature: cool
- Choices:
  - "Move through the early crowd. Read what they're carrying." → f_004 [reads_crowd]
  - "Stay near the aperture. Feel the pressure building on the other side." → f_004 [monitors_aperture]

---

### THE OPENING
Prose source: "The Opening" (~350 words)

#### f_004 — The First Note

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 14 | First note is not a note. Sooboont exhaling through the aperture. | Lore | ESSENTIAL | Base text, opening |
| 15 | Feel it in the rod before you hear it. Rod goes inert to alive in single pulse — vibration from ribs to fingertips. Portal open. Connection live. | Sensory | ESSENTIAL | Base text |
| 16 | Floor no longer concrete. Floor is membrane, vibrating at frequency humans interpret as bass and you interpret as breath. | Lore | ESSENTIAL | Base text |
| 17 | Humans feel it. Watch them feel it. Some stop moving. Some start. | Sensory | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - reads_crowd: "You moved through them before the first note. You know what they're carrying. The rod is about to confirm it."
  - monitors_aperture: "You felt Sooboont's pressure build behind the membrane until the construct released it. The note was an exhale — not yours."
  - default: "The portal opens. The work begins."
- Base text (~130 words): beats 14, 15, 16, 17. The portal opening from the operator's side. Four beats but the node is SHORT — each beat is one sentence. The brevity is the power. "The first note is not a note." Full stop. "Sooboont exhaling through the aperture." Full stop. The player who heard bass now learns it was breath. This revelation deserves a clean, uncluttered node.
- Conditional: none. Let the lore land clean.
- OOR action: none. OOR hasn't started operating yet — the first note is Sooboont's, not OOR's.
- Temperature: warm (portal open, harvest beginning)
- No choice. Auto-advance to f_005a or f_005b (conditional routing based on Choice 1 tag).

---

#### f_005a — The Deposits (reads_crowd path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 18 | Paint-knuckle man near bar. Tall, body holds tension in shoulders the way timber holds grain. Puts down drink, turns toward floor. Doesn't know why. You do. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 19 | His Unity concentration is dense, packed tight under layers of routine and obligation. Good deposit. Will yield well. | Lore | ESSENTIAL | Base text |
| 20 | Sneaker-star woman at edge of floor. Already moving. Small white sneakers, star drawn in pen — human sigil she probably doesn't know she made. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 21 | Truth concentration close to surface, barely contained. Eyes closing without deciding to. Been in rooms where veil thinned. Body learned to stop resisting. Will not need much work tonight. Almost ready. | Lore | ESSENTIAL | Base text |
| 22 | Rod responding to both before you've moved. Registering density. | Sensory | TEXTURE | Base text (closing line) |

Node shape:
- Base text (~160 words): beats 18, 19, 20, 21, 22. The individual deposit reading. Two humans, fully rendered — the paint-knuckle man as Unity concentration packed like grain in timber, the sneaker-star woman as Truth barely contained. These are the cross-character payoffs the player is here for: the Wanderer saw paint on knuckles and a star on a sneaker. The Familiar sees mineral deposits with measurable yield. Same people. Different literacy. Give each person their own paragraph.
- Conditional: none. The deposits are the content.
- OOR action: none.
- Temperature: warm
- No choice. Auto-advance to f_006.

---

#### f_005b — The Field (monitors_aperture path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 23 | Humans arriving faster. Call working. Cold falls off at door. They see a party. You see a resonance field populating. | Interior | ESSENTIAL | Base text |
| 24 | Each new body changes the field's properties — adds a frequency, shifts a harmonic, alters aggregate density. | Lore | ESSENTIAL | Base text |
| 25 | Reading the room the way a mycologist reads soil: by what's growing, what's missing, by relationships between organisms the organisms cannot perceive. | Interior | ESSENTIAL | Base text (character-defining metaphor) |
| 26 | Paint-knuckle man near bar — dense concentration, good deposit. Sneaker-star woman at floor edge — Truth close to surface. | Cross-thread | ESSENTIAL | Base text (compressed, field-level) |

Node shape:
- Base text (~150 words): beats 23, 24, 25, 26. The aggregate field reading. Where f_005a gives two humans in close-up, f_005b gives the whole room as a shifting composition. Beat 25 is the mycologist metaphor at full extension — this is the Familiar's defining image and it needs room. Beat 26 compresses the two specific humans to field-level observations (the deposits are noted but not lingered on — a player who wants the close-up should have chosen reads_crowd).
- Conditional: none.
- OOR action: none.
- Temperature: warm
- No choice. Auto-advance to f_006.

---

#### f_006 — Dancing and Yielding (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 27 | OOR begins to operate. You do not think of it as music. You think of it as agitation — the mechanical process by which deposits are loosened. | Interior/Lore | ESSENTIAL | Base text |
| 28 | The humans respond. They call it dancing. You call it yielding. Both words describe the same motion. Their word is more generous. Yours is more accurate. | Interior | ESSENTIAL | Base text |
| 29 | OOR extends agitation deeper. Working material harder. Humans interpret as music getting better. Not wrong. Effectiveness and quality are the same thing in this context. | Interior/Lore | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - reads_crowd: "You know who they are now. The rod confirmed the concentrations. The agitation begins."
  - monitors_aperture: "The field is populating. The aggregate density is approaching the threshold the construct needs. The agitation begins."
  - default: "The music — the agitation — fills the room."
- Base text (~130 words): beats 27, 28, 29. Short, sharp. Three beats, each a reframe. Music is agitation. Dancing is yielding. Getting better is getting more effective. This node's job is to rewrite the player's vocabulary. Beat 28 — "their word is more generous, yours is more accurate" — should be the last line of the node. Let it sit there alone. No choice button beneath it. Auto-advance. The silence after "more accurate" is the node's purpose.
- Conditional: none.
- OOR action: none. Beat 29 IS the OOR observation — the Familiar narrates it as interior because the Familiar understands OOR's function. Separating it into an OOR block would create false distance.
- Temperature: warm
- No choice. Auto-advance to f_007.

---

### THE SLIDE
Prose source: "The DJ OOR Slide" (~350 words)

#### f_007 — The Protocol

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 30 | OOR initiates synchronization protocol. You have seen this before. Not this form — the slide, the call-and-response — but the principle. | Interior | ESSENTIAL | Base text |
| 31 | Get them moving together. Dissolve boundaries between individual bodies. Create unified field. | Lore | ESSENTIAL | Base text |
| 32 | Transcendentals exist in the spaces between people, not inside them. Unity is not something a single person possesses. It occurs in the gap when two or more bodies synchronize. Your job is to close the gaps. | Lore | ESSENTIAL | Base text (KEY LORE DELIVERY) |

Node shape:
- Base text (~140 words): beats 30, 31, 32. The lore node. Beat 32 is the single most important lore delivery in the Familiar's playthrough: transcendentals exist BETWEEN people, not inside them. This reframes everything the Wanderer experienced. The synchronization wasn't about individual surrender — it was about creating gaps between bodies where the transcendentals could manifest. This is the reward for playing the Familiar. Give beat 32 its own paragraph. Let the player sit with it.
- Conditional: none. This lore is for every player.
- OOR action: none.
- Temperature: hot (synchronization achieved)
- No choice. Auto-advance to f_008.

---

#### f_008 — The Participation

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 33 | Vocoded voice calls moves. Humans follow. You follow too — body is human tonight, responds to patterns like iron filings to magnet. Not immune to the field you're cultivating. This is useful. You are a node in the network. | Interior | ESSENTIAL | Base text |
| 34 | Paint-knuckle man in field of vision. Unselfconsciousness bordering on therapeutic. Shoulders released tension. Unity broadcasting, not stored. Laughing. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 35 | A person near him — arrived late, watching more than participating, notices things — makes eye contact. Connection arcs between them like static discharge. Two strangers unified briefly, returning to orbits but changed. Frequency harvestable. Small yield. Real. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 36 | Floor brightens. Aperture responding to density. Sooboont pulling — steady draw, root system drawing water. Flow beginning. Drain starting to clear. | Sensory/Lore | ESSENTIAL | Base text |

Node shape:
- Base text (~160 words): beats 33, 34, 35, 36. The Familiar inside the Slide. Beat 33 is the key admission — "not immune to the field you are cultivating." The Familiar is a participant despite being the operator. Beat 35 is the cross-character anchor: the paint-knuckle man and the Wanderer making eye contact. The Familiar WITNESSES the moment the Wanderer experienced as "recognition without language." From the Familiar's side it's a static discharge — a harvestable micro-yield. Same moment, three completely different documents. Beat 36 shifts to the aperture — Sooboont pulling, root system drawing water.
- Conditional: "The connection between the watcher and the tall man — you note it twice. You do not usually note things twice." (if reads_crowd — the Familiar who read individual deposits pays closer attention)
- OOR action: "DJ OOR extends agitation into a sub-frequency range the construct should not have access to. The engineer behind the amp rack will have questions." (References the Builder — a cross-character thread for the player who'll unlock that perspective next.)
- Temperature: hot
- Choices:
  - "Stay inside the field. Your presence is a node. The density needs you." → f_009 [stays_embedded]
  - "Pull back. Map the resonance before the Mating Ritual. Precision requires distance." → f_009 [pulls_back]

---

### THE MATING RITUAL
Prose source: "The Mating Ritual" (~500 words)

This is the Familiar's primary function. Four nodes. The prose gives it ~500 words; the beat map gives it ~600. Justified — this is what the Familiar EXISTS for.

#### f_009 — The Activation

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 37 | This is your work. This is what you are for. | Interior | ESSENTIAL | Base text, opening |
| 38 | Music shifts. You shift with it. Hood comes down. Antlers extend — not mechanically. The way a fern unfurls. Slowly. Inevitably. | Sensory | ESSENTIAL | Base text |
| 39 | Rod comes out of coat into hand. Already singing — low continuous tone between the notes, audible to you, felt but not heard by humans. | Sensory | ESSENTIAL | Base text |
| 40 | Partner beside you. Was pouring drinks with approximate accuracy a moment ago. Now antlered, present, precise. She is direction. You are measurement. Single instrument calibrated over intervals meaningless in human units. | Sensory/Interior | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - stays_embedded: "The field is inside you. The density you amplified is still resonating in the body. The antlers extend from inside the resonance."
  - pulls_back: "You have the map. Every concentration, every deficit, every harmonic relationship — indexed. The antlers extend from inside the data."
  - default: "The music shifts. You shift with it."
- Base text (~140 words): beats 37, 38, 39, 40. The activation. "This is your work. This is what you are for." — opening line, standalone paragraph. Then the fern-unfurling antlers, the rod's awakening, the partner revealed. Beat 40 is the bartender payoff: the woman who poured approximate drinks is now revealed as the other half of a precision instrument calibrated across geological time. Give that reveal its own paragraph.
- Conditional: "The transition is not dramatic. You were dancing. Now you are doing something else. The humans near you do not notice the change." (if stays_embedded — the shift from participant to operator was seamless)
- OOR action: none. The Familiar IS the action now.
- Temperature: hot
- No choice. Auto-advance to f_010a or f_010b (conditional routing based on Choice 2 tag).

---

#### f_010a — The Pairing (stays_embedded path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 41 | Approach the first — not target, not source, not deposit. Language insufficient in every direction. Approach the woman with the star on her sneaker. | Interior/Action | ESSENTIAL | Base text |
| 42 | Rod resonates. Sound specific to her — harmonic signature unique as fingerprint, readable as text. Truth concentration extraordinary. Right there, under thinnest shell of social self-awareness. Ready all night. Maybe years. | Sensory/Lore | ESSENTIAL | Base text |
| 43 | Take her hand. Yours warm. Hers warmer. Guide toward the man — half-closed eyes, already surrendered to the frequency. Unity complements Truth the way root system complements mycelium: different organisms, shared network, mutual benefit. | Action/Lore | ESSENTIAL | Base text |
| 44 | Place together. Adjust distance — six inches closer, two left — until rod quiet. Self-sustaining resonance. Don't need you anymore. | Action | ESSENTIAL | Base text |
| 45 | They look at each other and something crosses between them that you recognize but cannot name because it is a human thing and you are not, tonight, a human. You are wearing one. There is a difference. | Interior | ESSENTIAL | Base text (final lines, standalone) |

Node shape:
- Base text (~170 words): beats 41, 42, 43, 44, 45. The intimate pairing. This is the emotional heart of the Familiar's function — the moment where clinical precision meets something it can't classify. The rhythm is procedural (approach, read, take hand, guide, place, adjust) until it isn't (beat 45). Five beats but the final two sentences — "something crosses between them you recognize but cannot name" and "you are wearing one, there is a difference" — should be their own paragraph. That's where the prose breaks from function into feeling. The node earns its length.
- Conditional: none. The pairing is the content. Don't dilute it.
- OOR action: none.
- Temperature: hot
- No choice. Auto-advance to f_011.

---

#### f_010b — The Survey (pulls_back path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 46 | Move through the crowd. Each approach the same, each different. Rod sings and quiets, sings and quiets. | Action | ESSENTIAL | Base text |
| 47 | Some deposits deep — buried under years of calcification, unreachable tonight, maybe next time, maybe never. Some shallow — glowing, practically leaking transcendental energy into the ambient field. | Lore | ESSENTIAL | Base text |
| 48 | Pair shallow with deep. Shallow as solvents. Deep provide volume. | Lore | ESSENTIAL | Base text |
| 49 | The sneaker-star woman — rod sang loudest for her. Paired with the half-closed-eyes man. Resonance self-sustaining in seconds. | Action/Cross-thread | ESSENTIAL | Base text (compressed, systematic) |
| 50 | Twelve pairings. The rod sings and quiets. The field changes composition with each one. The room is becoming a solution. | Action/Lore | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 46, 47, 48, 49, 50. The systematic sweep. Where f_010a lingers on one pairing, f_010b shows the pattern across many. "Rod sings and quiets, sings and quiets" — the liturgical repetition. Deep and shallow deposits as a pairing strategy. The sneaker-star woman compressed to a data point rather than a human moment. Beat 50 introduces the chemistry metaphor — the room as a solution — which pays off at f_012.
- Conditional: "Some people are passed over. The rod does not respond. They don't notice being passed over. This is a kindness, or an irrelevance. You are not sure which." (if reads_crowd — the Familiar who read individual deposits notices who was NOT selected)
- OOR action: none.
- Temperature: hot
- No choice. Auto-advance to f_011.

---

#### f_011 — The Wanderer (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 51 | A person near the edge of the floor. Arrived late. Watches. Collects details the way you collect frequencies. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 52 | Rod responds. Not loudly — not the way it responded to the sneaker-star woman. But specifically. Something unusual. Capacity for attention so focused it functions almost like a transcendental in itself. | Sensory/Lore | ESSENTIAL | Base text |
| 53 | They notice you. Feel their gaze on your antlers. Not fear, not amusement. Recognition — not of what you are, but of the fact that you are something. | Interior/Cross-thread | ESSENTIAL | Base text |
| 54 | Not yet. Not ready. Close. A note — not mental, in the body, in the rod, in the resonance map. This person will matter. Not tonight, maybe. But soon. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~140 words): beats 51, 52, 53, 54. The Wanderer encounter from the other side. This is the node the player has been waiting for since they felt the rod hum in the Wanderer playthrough. Now they learn: the hum was genuine measurement. The Familiar saw them. The Familiar noted them. "This person will matter." Beat 53 is the mirror — the Wanderer felt recognition; the Familiar felt the Wanderer's recognition. Two nodes in two different documents, same three seconds.
- Conditional: "Their attention has a weight you do not usually assign to human perception. It is not transcendental. It is adjacent. You have not encountered this before." (if reads_crowd — the Familiar who read individuals is more specific about why the Wanderer is unusual)
- OOR action: none.
- Temperature: hot
- Choices:
  - "Note it. They will matter. Move on. The ritual is not finished." → f_012 [notes_and_moves]
  - "Linger. The rod is still responding. There is something here you have not catalogued." → f_012 [lingers_on_watcher]

---

#### f_012 — Completion

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 55 | Ritual completes the way a chemical reaction completes — not with a signal but with an equilibrium. | Interior | ESSENTIAL | Base text, opening |
| 56 | Pairs merged into clusters. Clusters into field. Room no longer collection of individuals. A solution — homogeneous mixture in which transcendentals are suspended and accessible. | Lore | ESSENTIAL | Base text |
| 57 | Fold antlers down. Rod back in coat. Still vibrating faintly. Will not fully stop until portal closes. | Action | ESSENTIAL | Base text |
| 58 | Step back. Partner returns to bar. Begins pouring drinks again. Humans accept them. The seam holds. | Action/Texture | ESSENTIAL | Base text (final line) |

Node shape:
- Arrival variants:
  - notes_and_moves: "The watcher is noted. Filed. The ritual continued."
  - lingers_on_watcher: "You lingered longer than function required. The rod quieted before you moved on. That pause is in the data now."
  - default: "The ritual is completing."
- Base text (~130 words): beats 55, 56, 57, 58. The wind-down. The chemistry metaphor from f_010b pays off here: "a solution — a homogeneous mixture." The room's transformation is complete. The antlers fold. The rod goes quiet. And the partner — the other half of the precision instrument — goes back to pouring approximate drinks. Beat 58 is the cargo cult callback: "the seam holds." The comedy returns. The ancient being resumes the imitation. Short node. Let the equilibrium breathe.
- Conditional: "Something from the embedding remains in the body. A residue you did not have before the field. The body carried the density and some of the density stayed." (if stays_embedded — the Familiar who participated is contaminated)
- OOR action: "DJ OOR's ear sweeps the room once. Density sufficient. The construct makes no adjustment. The room is doing the work on its own."
- Temperature: hot
- No choice. Auto-advance to f_013.

---

### THE DANCE CIRCLE
Prose source: "The Dance Circle" (~350 words)

Three nodes. The mechanism, the yields, the beekeeper. Each is a different species of observation.

#### f_013 — The Mechanism

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 59 | OOR changes projection. Rings contract to single circle. Arrow spins. | Action | ESSENTIAL | Base text |
| 60 | You understand this mechanism better than most rituals because it is the most direct. Circle is an extraction point — focused aperture within larger aperture. Membrane so thin a single person becomes briefly a pure conduit. | Lore | ESSENTIAL | Base text |
| 61 | Arrow is OOR's selection tool. Identifies deposits closest to full yield. Isolates them. | Lore | ESSENTIAL | Base text |

Node shape:
- Base text (~130 words): beats 59, 60, 61. Pure lore node. What the circle IS — not what it looks like (the Wanderer covered that), but what it DOES. Focused aperture within the larger aperture. The membrane thinned to transparency. The arrow as selection tool. Short, clinical, precise. The Familiar understands this mechanism and explains it without wonder. The absence of wonder IS the explanation.
- Conditional: none.
- OOR action: "The arrow is not random. You have always known this."
- Temperature: hot
- No choice. Auto-advance to f_014.

---

#### f_014 — The Yields

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 62 | Jacket woman — never took it off, dancing at slight remove all night. Close enough to feel the field, not close enough to dissolve. Arrow finds her first. Jacket is armor. Maintaining boundary. Circle asks her to drop it. Not the jacket. The boundary. | Cross-thread/Lore | ESSENTIAL | Base text |
| 63 | She enters. She dances. You see what humans cannot: transcendental flow through her body — luminescence, heat signature, density shift. Yielding Truth. Unselfconscious presence extracted in real time, flowing through aperture to Sooboont. Pull increases. Drain clearing. | Sensory/Lore | ESSENTIAL | Base text |
| 64 | Paint-knuckle man enters. Unity radiating in sheets. Dances the way a tree moves in wind — from roots, through trunk, unshakeable confidence of something that has never questioned its right to occupy space. Yield enormous. Feel it in the floor. In the rod against your ribs. | Sensory/Cross-thread | ESSENTIAL | Base text |
| 65 | Arrow spins again. Finds the watcher. The one who notices things. The one the rod responded to. | Action/Cross-thread | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 62, 63, 64, 65. The yields made visible. Where the Wanderer saw a woman enter the circle and dance honestly, the Familiar sees luminescence — the actual transcendental flowing through a human body in real time. Beat 62 is the jacket-woman cross-thread: the Wanderer saw armor. The Familiar sees a boundary the circle is asking to dissolve. Beat 64 gives the paint-knuckle man his full transcendental portrait: Unity like a tree in wind. Beat 65 is the crossover — the arrow finding the Wanderer. The player knows what happened next. They lived it. Now they're watching from outside.
- Conditional: "The watcher enters the circle. You see the flow — not Truth exactly, not Unity exactly. Attention itself, transmuted into something the aperture accepts. You have not seen this before." / "The watcher stays in the ring. The rod notes a deposit that chose to remain unmined. You are not sure why noting this feels different from noting the others." (if lingers_on_watcher — the Familiar who paused at the Wanderer reads their Dance Circle choice with more specificity)
- OOR action: none. Let the yields carry the node.
- Temperature: hot
- Choices:
  - "Measure the flow. The yield data matters more than any single person." → f_015 [watches_yield]
  - "Watch the person. Not the data. The person." → f_015 [watches_person]

---

#### f_015 — The Beekeeper (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 66 | You watch. Whether they enter or not, you watch. You are always watching. | Interior | ESSENTIAL | Base text, opening |
| 67 | This is not surveillance. This is care. | Interior | ESSENTIAL | Base text |
| 68 | You are a technician and a healer and a geologist and a beekeeper. The bees do not know you are there. The honey is not for them. You are keeping them alive because alive bees make honey and that is the arrangement and it is old and it is neither fair nor unfair. It is the work. | Interior | ESSENTIAL | Base text (THE passage) |

Node shape:
- Arrival variants:
  - watches_yield: "The yield data confirmed what the rod measured. The watcher's contribution — whatever it was — is now part of the aggregate. A number in the total."
  - watches_person: "You watched them. Not the flow through them. Not the yield. Them."
  - default: "You are watching."
- Base text (~120 words): beats 66, 67, 68. THE NODE. This is why the Familiar exists as a character. Three beats. The first two are short — one sentence each. The third is the beekeeper passage, which gets its own paragraph and is the longest single sentence in the Familiar's prose. It should land like a bell. No conditional text. No OOR action. No choice. Just the passage, alone on the screen, with nothing after it but auto-advance. The silence around it is the architecture. "It is the work." — and then the node ends. The player sits with it.
- Conditional: none. Every player gets this. The beekeeper passage is the Familiar's identity.
- OOR action: none. The absence is the point. This node is entirely interior.
- Temperature: hot
- No choice. Auto-advance to f_016.

---

### THE CLOSING
Prose source: "The Closing" (~350 words)

Two nodes. The descent and the silence. Separated because they are different beat types — the descent is action/lore, the silence is sensory/spiritual.

#### f_016 — The Descent

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 69 | The construct knows. You know because it knows, or it knows because you know — causality runs through the rod, the aperture, Sooboont. Not linear. | Lore | ESSENTIAL | Base text |
| 70 | Harvest sufficient. Flow restored. Drain clear. Transcendentals moving — Unity, Beauty, Truth, Goodness — cycling from material plane through conduit of two hundred bodies through aperture into Primordial Plane. Sooboont receives them the way soil receives water. | Lore | ESSENTIAL | Base text |
| 71 | OOR initiates closing. Music changes — call and response, crowd descending, bodies lowering. You descend with them. Your body does what their bodies do because your body is one of theirs tonight. | Action | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 69, 70, 71. The harvest report. Beat 69 is the non-linear causality — "you know because the construct knows, or the construct knows because you know." The Familiar doesn't experience causality linearly and the prose mirrors this. Beat 70 names all four transcendentals in sequence — the only place in the game where all four are named together in the Familiar's voice. This is the structural explanation the player has been earning: Unity, Beauty, Truth, Goodness — cycling through the conduit into Sooboont. Beat 71 brings the Familiar back to the body: descending with the crowd because the body is one of theirs.
- Conditional: "Your body descends and for a moment you cannot distinguish which sensations belong to the body and which to the function. Something in the embedding left a residue." (if stays_embedded — the contamination from the field)
- OOR action: none. The earned silence is approaching.
- Temperature: hot
- No choice. Auto-advance to f_017.

---

#### f_017 — The Silence

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 72 | At the floor. Membrane directly. Thin. Warm. Vibrating with passage of transcendentals — flow so dense you almost see it, taste it. River running through room's foundation into a place without coordinates. | Sensory | ESSENTIAL | Base text |
| 73 | Sooboont pulls. One final draw. Crowd gasps in ripples — grass bending in wind, starting from one edge, rolling through. Something passes out of them. Something restored. Balance shifts. System clears. | Sensory/Lore | ESSENTIAL | Base text |
| 74 | Silence. | Sensory | ESSENTIAL | Base text (standalone paragraph) |
| 75 | Portal closes. Feel it seal — not shut. Seal. The way a wound seals. Fracture knits. Aperture dormant. Floor is concrete. Projection fades. Lights up. | Sensory | ESSENTIAL | Base text |

Node shape:
- Base text (~140 words): beats 72, 73, 74, 75. The silence. Beat 72 is the membrane contact — the Familiar feeling the transcendental flow directly, the river running through the foundation. Beat 73 is the final pull — the crowd gasping in ripples like grass in wind. Beat 74 is one word: "Silence." Standalone paragraph. Let the CSS render it with space. Beat 75 is the sealing — wound metaphor, fracture knitting. The closing from the operator's side is not the Wanderer's earned stillness — it's the completion of a mechanical process described in organic language. Wounds seal. Fractures knit. The drain clears.
- Conditional: none. Every player experiences the silence.
- OOR action: none. The earned silence.
- Temperature: hot → stillness
- No choice. Auto-advance to f_018.

---

### AFTER
Prose source: "The Closing" final paragraphs (~250 words)

Two nodes. The reckoning (inventory of what was harvested, what was planted) and the partner (the only relationship the Familiar has).

#### f_018 — The Reckoning

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 76 | Stand. Look at hands. Still your hands. For now. Body functional, upright, appropriately jointed. Don't know how much longer. Purpose complete. Arrangement between existence and this form — unclear. Always been unclear. | Interior | ESSENTIAL | Base text |
| 77 | Humans leaving. Collecting coats, phones, keys. Hugging strangers — pressing bodies together one more time before the container breaks. | Sensory | ESSENTIAL | Base text |
| 78 | Sneaker-star woman near door. Shell thinner now. Easier to reach next time. | Cross-thread | ESSENTIAL | Base text |
| 79 | Tall man putting on jacket. Unity frequency still broadcasting faintly. Will carry it for days. Make rooms better without knowing why. | Cross-thread | ESSENTIAL | Base text |
| 80 | The watcher is gone. Slipped out. Carrying something in coat pocket — rod placed it, or aperture, or Sooboont, or it placed itself. Objects less committed to causality than people suppose. A seed. They will come back. | Cross-thread/Lore | ESSENTIAL | Base text |

Node shape:
- Base text (~160 words): beats 76, 77, 78, 79, 80. The inventory. Beat 76 opens with the body-check — "still your hands, for now" — the first crack in the body's reliability. Then the human inventory: the sneaker-star woman (thinner shell, confirming the harvest worked), the paint-knuckle man (still broadcasting — the transcendental lingers in the body), the Wanderer (gone, carrying a seed they don't know about). Beat 80 is the artifact confirmation — the player who received something in their coat pocket on the Wanderer playthrough now learns it was deliberately placed. "Objects less committed to causality than people suppose." Give that line its own space.
- Conditional: "The watcher left something in you. Not a frequency. Not a concentration. The rod responds to its absence the way it responds to presence — specifically, measurably. You do not have a category for this." (if lingers_on_watcher — the Familiar who paused on the Wanderer is now feeling the Wanderer's absence)
- OOR action: none. DJ OOR is inert.
- Temperature: cool (mechanism cooling)
- No choice. Auto-advance to f_019.

---

#### f_019 — The Partner

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 81 | Partner wiping down bar. Still wearing antlers. Forgotten to fold them, or decided not to, or the mechanism that allows folding no longer responding. | Sensory | ESSENTIAL | Base text |
| 82 | She looks at you across the empty room. Expression — you don't have a word for it. Familiar. Ancient. Tired in a way that has nothing to do with the body. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~100 words): beats 81, 82. Short node. Two beats. The partner — the only relationship the Familiar has that is not functional. Beat 81 is the first sign the body-mechanism is becoming unreliable: the antlers won't fold. Three possible explanations offered (forgot, decided, mechanism failing) — the Familiar doesn't know which, and the uncertainty IS the beat. Beat 82 is the look. "Familiar. Ancient. Tired." Three words that carry the entire relationship between two ancient beings who just ran a nightclub as a harvesting apparatus.

  This is a quiet node. The shortest in the game. Let the shortness be the style. Two paragraphs. Nothing else. The empty room around the two of them IS the content.
- Conditional: "You want to say something to her. The body has a word for this impulse. The body calls it reaching. You do not reach. You are not sure the body is wrong." (if watches_person OR lingers_on_watcher — the Familiar who noticed humans is now noticing its partner)
- OOR action: none.
- Temperature: cool
- No choice. Auto-advance to f_020.

---

### DISSOLUTION
Prose source: "The Closing" coda (~200 words)

One node. The longest conditional-text-variant section in the game. The base text is universal but the dissolution fragments differently based on the full fingerprint.

#### f_020 — The Dissolution (TERMINAL)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 83 | Walk toward door. Don't feel cold. Don't feel warm. Feel absence of aperture. Phantom limb. Frequency removed. | Interior | ESSENTIAL | Base text |
| 84 | Alley dark. Sodium lights off, or never on, or on but eyes — what are your eyes doing? Hands — where are your hands? | Interior | ESSENTIAL | Base text (degradation begins) |
| 85 | Body is optional. Always was. Wore it like a coat. Evening over. Folding it up. Putting it away. | Interior | ESSENTIAL | Base text |
| 86 | Becoming what you were before the portal opened — which is a question. Before is for things that experience time in one direction. You do not. You never have. Not a thing with a before. A thing with a function. Function complete. | Interior | ESSENTIAL | Base text (degradation deepens) |
| 87 | You are — | Interior | ESSENTIAL | Base text |
| 88 | You are — | Interior | ESSENTIAL | Base text (repetition as dissolution) |
| 89 | Alley empty. Warehouse dark. SECURITY jacket folded neatly on chair near door. No one inside it. No evidence there ever was. | Sensory | ESSENTIAL | Base text (final lines) |

Node shape:
- Base text (~160 words): beats 83, 84, 85, 86, 87, 88, 89. The dissolution. Seven beats but the prose degrades across them — sentences shorten, clauses collapse, self-reference fails. The progression:
  - Beat 83: Full sentences. Clinical observation of absence. Still coherent.
  - Beat 84: Sentences fragment. Questions appear — "what are your eyes doing?" — the body is becoming unreliable.
  - Beat 85: Short declarative fragments. "Wore it like a coat." — the body reduced to metaphor.
  - Beat 86: The longest sentence, but it's a sentence that eats itself — "before is for things that experience time in one direction and you do not." The language tries to explain and fails.
  - Beat 87-88: "You are —" twice. The sentence never completes. The Familiar cannot finish its own self-description. The dash is the dissolution.
  - Beat 89: Camera pulls back. No subject. "Alley empty." Not "the alley is empty" — the article is gone, the verb is gone, the Familiar is gone. The SECURITY jacket is the last image because it's the most legible proof: a costume on a chair, nobody inside, no evidence.

**DISSOLUTION GENERATION DIRECTIVE:** This node breaks the voice contract. Sentences shorten across beats 83-88. By beat 86, clauses collapse. By beat 87, the sentence cannot complete. By beat 89, the Familiar is absent from its own narration — no "you," no subject, just objects in an empty space. The final beat has no period after "there ever was" — the absence of punctuation IS the dissolution.

- Conditional text — emotional framing (first match, **maximum 1** — the dissolution should not be padded):
  - watches_person + lingers_on_watcher: "Something in the — is it the rod? Is the rod still — something responds. Not a deposit. A residue. The watcher. The person. The hand that held another hand. You noted them. The note persists. The note will not — the body is folding and the note is still —"
  - watches_person + stays_embedded: "Something from the field is still in the body. Not a frequency. Not density. Something the body learned on the floor that the function did not teach it. You are folding the body and the body does not want —"
  - watches_person: "The word the body used was reaching. You do not reach. The body folds with the word still in it."
  - lingers_on_watcher: "The note in the rod. The watcher. They will matter. The note persists past the body. You do not know what carries the note when the body is —"
  - watches_yield + pulls_back: "Function complete. Data clean. The body is a tool. You are putting it away."
  - default: "The body is folding. You are letting it."

- OOR action: none.
- Temperature: cold
- Terminal: true
- Outcome: dissolution

---

## Artifact Logic Summary

| Artifact | Transcendental | Attaches When | Key Tags |
|---|---|---|---|
| None | N/A | N/A | N/A |

The Familiar **does not receive an artifact.** The Familiar IS the apparatus. Artifacts are for the material that passed through the mechanism. The Familiar does not leave. The Familiar dissolves.

The absence of an artifact is the Familiar's unique ending. If the player notices the empty pocket — if they expect something after getting one on the Wanderer run — that recognition is the reward. The game does not comment on it.

---

## Cross-Character Thread Placement

| Thread | Familiar Node | How Familiar Sees | Wanderer Sees | Builder Sees |
|---|---|---|---|---|
| Sneaker-star woman | f_005a, f_010a, f_018 | Truth deposit barely contained, "human sigil she doesn't know she made" | Scuffed sneakers, tiny star, eyes closed | Does not notice |
| Paint-knuckle man | f_005a, f_008, f_014 | Unity packed like grain in timber, then broadcasting in sheets | Paint on knuckles, laughter, eye contact | Does not notice |
| Jacket woman | f_014 | Armor. Maintained boundary. Circle asks her to drop the boundary, not the jacket. | Jacket never removed, enters circle | Does not notice |
| The Wanderer | f_011, f_014, f_018 | Unusual deposit. Attention that functions like a transcendental. "Will matter." | IS this character | Does not notice |
| Hand-holder | f_018 (implied in "seed") | Part of the crowd. One of them. | Held their hand during closing | Does not notice |
| Bartender familiar | f_002, f_009, f_012 | Partner. Pouring approximate drinks. Then antlered, precise. Then back to pouring. | Accepted drinks without question | Does not notice |
| Bouncer familiar | f_002, f_020 | Does not know what security means. SECURITY jacket on empty chair. | Walked past without question | Does not notice |
| DJ OOR | f_003, f_006, f_008, f_013 | Construct. Reactor. Mechanism. The thing inside the casing is not a thing. | Terrifying shape, green tentacles | Operator who knows transfer function |
| The bass / Homewreckers | f_004 | Sooboont exhaling. Humans interpret as bass. | Bass in sternum | Built them |
| The fog | f_002 | "A nice touch. Your idea. Obscures where architecture becomes unreliable." | Walked through, smelled glycerin | Petrichor anomaly |
| The rod's hum | f_011 | The rod responding to the Wanderer — genuine measurement, confirmed deliberate. | Felt it respond when antlered woman passed | Not perceived |
| Artifact placement | f_018 | "The rod placed it — or the aperture, or Sooboont, or it placed itself." | Finds object in coat pocket | Not perceived |

---

## Nodes Summary

| ID | Section | Temp | Choice? | Parallel? | Words Est. |
|---|---|---|---|---|---|
| f_001 | The Body | cool | No | — | 150 |
| f_002 | The Room | cool | No | — | 160 |
| f_003 | The Aperture | cool | Yes (2) | — | 170 |
| f_004 | The First Note | warm | No | — | 130 |
| f_005a | The Deposits | warm | No | reads_crowd | 160 |
| f_005b | The Field | warm | No | monitors_aperture | 150 |
| f_006 | Dancing / Yielding | warm | No | — | 130 |
| f_007 | The Protocol | hot | No | — | 140 |
| f_008 | The Participation | hot | Yes (2) | — | 160 |
| f_009 | The Activation | hot | No | — | 140 |
| f_010a | The Pairing | hot | No | stays_embedded | 170 |
| f_010b | The Survey | hot | No | pulls_back | 150 |
| f_011 | The Wanderer | hot | Yes (2) | — | 140 |
| f_012 | Completion | hot | No | — | 130 |
| f_013 | The Mechanism | hot | No | — | 130 |
| f_014 | The Yields | hot | Yes (2) | — | 170 |
| f_015 | The Beekeeper | hot | No | — | 120 |
| f_016 | The Descent | hot | No | — | 150 |
| f_017 | The Silence | hot→still | No | — | 140 |
| f_018 | The Reckoning | cool | No | — | 160 |
| f_019 | The Partner | cool | No | — | 100 |
| f_020 | The Dissolution | cold | No | — | 160 |

Total nodes: 22 (20 unique per path, 2 parallel alternates)
Total unique beats distributed: 89
Estimated words on any path: ~2,630
Estimated time: ~13 minutes
Choice nodes: 4 (f_003, f_008, f_011, f_014)

---

## Temperature Map

```
cool → cool → cool → warm → warm → warm → hot → hot → hot → hot → hot → hot → hot → hot → hot → hot → hot→still → cool → cool → cold
 001    002    003    004   005a/b   006    007   008    009  010a/b  011    012    013    014    015    016    017        018    019    020
```

The Familiar runs the warmest of all three characters. Cool bookends (before purpose, after purpose). The long hot middle is the harvest — the Familiar is always near the mechanism. The cold at the end is not punishment. It is the absence of purpose. The body has no reason to be warm.

---

## Replay Assessment

**Run 1:** The revelation run. Everything the Wanderer experienced blind is now explained. The cargo cult, the deposits, the lore about transcendentals existing between people, the beekeeper passage, the dissolution. This run is strong regardless of choices.

**Run 2:** Structural variation. The player takes the other path at f_005 and f_010, seeing the parallel lore branches they missed. A reads_crowd player who saw individual deposits now sees the aggregate field. A stays_embedded player who experienced the intimate pairing now sees the systematic survey. Genuinely different scenes totaling ~300 words of new content plus different conditional text throughout.

**Run 3:** Fingerprint variation. Different tag combinations produce different conditional text, different arrival variants, and — crucially — different dissolution endings. The watches_person + lingers_on_watcher dissolution is a completely different emotional experience from the watches_yield + pulls_back version. The third run is for the player who wants to see the Familiar break differently.

**Run 4:** Diminishing returns. The conditional text variation across the remaining fingerprints is real but thin. This is the completionist run. Appropriate for a 13-minute game but not essential.

**Honest assessment:** This version supports 2 genuinely distinct runs and a meaningful 3rd. That's a significant improvement over the v1 map's 1.5 runs. The parallel lore branches at f_005 and f_010 are the key addition — they turn attentional choices into structural variation without betraying the Familiar's linear identity.

---

## Voice Contract for Node Generation

```
ROLE: You are generating Familiar nodes from a beat map and prose reference.

VOICE CONTRACT:
- Second person. Present tense. Clinical precision with organic metaphor.
- Humans are deposits, sources, concentrations.
  Not contempt. Taxonomy. The care is in the precision.
- Sensory metaphors: mycelium, root systems, soil, tide pools,
  grain in timber, fern unfurling, wind through grass.
  NEVER mechanical. Ancient and living.
- Pratchett DNA: dry, observational. Ancient beings approximating
  human infrastructure. "Glasses mostly correct." "Does not know
  what security means." Competent beings performing incomplete imitations.
- Unreliable self-knowledge. Self-corrections. Language found insufficient.
  "Not a trap. A clinic." "Not target — source — deposit.
  The language is insufficient in every direction."
- Body as tool: "appropriately jointed," "it has hands."
  This register erodes at f_018 and collapses at f_020.
- Time is geological: "continents that no longer exist,"
  "intervals meaningless in human units."
- Agency is clear but impersonal. The Familiar knows what it's doing.
  Uncertainty is about the self, not the work.

NODE CONSTRAINTS:
- Base text: 100-170 words. Most nodes 130-150.
- OOR action blocks are RARE. The Familiar understands OOR and narrates
  its function as interior. Use OOR blocks only when OOR acts unexpectedly.
- The Dissolution (f_020) breaks all voice constraints.
  Prose degrades. Sentences fragment. Self-reference fails.

PARALLEL BRANCH RULES:
- f_005a and f_005b cover the same timeline moment (the Opening)
  through different apertures (individual deposits vs. aggregate field).
- f_010a and f_010b cover the same timeline moment (the Mating Ritual)
  through different apertures (intimate pairing vs. systematic survey).
- Both parallel nodes must reference the same cross-character threads
  (sneaker-star woman, paint-knuckle man) but at different depths.
  The intimate node lingers. The systematic node compresses.

DISSOLUTION RULES:
- f_018: Prose loosens. "For now" appears. First unreliable body reference.
- f_019: Short. Quiet. The partner look carries the weight.
- f_020: Prose breaks. Sentences shorten. Clauses collapse.
  "You are —" repeated. Final beat has no subject.
  The degradation must feel inevitable, not damaged.

OUTPUT FORMAT:
Return valid JSON matching the node schema. No preamble.
```

---

## Schema Additions Required

### Conditional Routing (auto-advance with branching)

The `next` field can now be a string (simple) or an array (conditional):

```json
// Simple auto-advance
"next": "f_006"

// Conditional routing
"next": [
  { "requires": { "has_tag": "reads_crowd" }, "target": "f_005a" },
  { "default": true, "target": "f_005b" }
]
```

Engine logic:
```javascript
function getNextNode(node, run) {
  if (!node.next) return null;
  if (typeof node.next === 'string') return node.next;
  if (Array.isArray(node.next)) {
    for (const route of node.next) {
      if (route.default) continue;
      if (evaluate(route.requires, run, persistent)) return route.target;
    }
    const def = node.next.find(r => r.default);
    return def ? def.target : null;
  }
  return null;
}
```

This is the ONLY schema extension for v2. All other node fields remain unchanged from GAME_SPEC.md.

---

## Checklist: Before Generating Nodes

- [x] Prose reference document complete and reviewed
- [x] Beat extraction complete (89 beats, this document)
- [x] Each beat classified: Priority / Type / Placement
- [x] ESSENTIAL beats mapped to main path (all paths see all essential beats)
- [x] Parallel branches defined (f_005a/b, f_010a/b)
- [x] Convergence points identified (f_006, f_011)
- [x] Tag vocabulary defined (4 choice pairs, disposition only)
- [x] Artifact attachment: none (by design)
- [x] Temperature progression mapped
- [x] Cross-character threads flagged (12 threads)
- [x] Dissolution mechanic documented with generation directive
- [x] Schema extension documented (conditional routing)
- [ ] Node generation not yet started

---

## Design Notes: Three Characters, Three Architectures

| Character | Nodes (per path) | Choices | Parallel Branches | Structure | Identity |
|---|---|---|---|---|---|
| Wanderer | 7–12 | 7 (+2 on edge) | Floor / Edge | Branching tree | Freedom |
| Builder | 11 | 3 | Floor / Rack | Single fork | Obligation |
| Familiar | 18 | 4 | Deposits / Field; Pairing / Survey | Linear with lore branches | Function |

The Wanderer branches because they are free. They wander.
The Builder forks once because they are working. Professional obligation constrains.
The Familiar walks a straight line because they are the function — but the line passes through different rooms depending on where they point their attention. The lore branches are not choices about what to DO. They are choices about what to SEE. The Familiar does the same thing regardless. What changes is the depth at which the player witnesses it.

Three characters. Three structures. Same room. Same night. Completely different architectures. Completely different amounts of time. The Wanderer is the 8-minute hook. The Builder is the 8-minute reward. The Familiar is the 13-minute deep dive.

---

## Ready for Generation

This document contains everything needed to generate all 22 Familiar nodes as valid JSON. Use the prose document as voice reference. Use this document as the blueprint.
