# The Wanderer — Beat Extraction & Node Map (v2)
**Intermediary document. Feeds node generation.**
**Built from: WANDERER_PROSE.md, EVENING_TIMELINE.md, lore-viewer.html**
**No legacy spine. All nodes authored fresh from prose.**

---

## Naming & Lore Conventions (Verify Before Generating)

- **Sooboont** (not Suboont, not Subbont)
- **DJ OOR** when at decks, in the warehouse, operating. **Oor** when discussed as entity in cosmology.
- Oor is a **construct**, not a deity. Conceived in the manner of the Dunwich Horror.
- The portal is a **healing connection** — clearing a clogged drain. Failure = portal yawns, spreads, consumes.
- The divining rod of Sooboont (not theremin, not wearable)
- Participants are the **conduit**. The crowd is the **circuit**.

---

## Character Unlock & Context

The Wanderer is **always available**. This is the first playthrough. The player has no context — they don't know what the harvest is, what the aperture does, what the familiars are, or what DJ OOR is. They are walking into a party that is not a party. They are the ore.

**The Wanderer is the hook.** 8 minutes. Tight, propulsive, replayable. The most structurally branched tree of the three characters — 16 nodes, 5 distinct paths, 7+ choices, full floor/edge parallel structure. The Wanderer's freedom IS their structure. They wander. The tree branches because they can.

**The Wanderer teaches the player the game.** Temperature as silent signal. Choices as gestures. Conditional text as reward. The first four nodes are the spine — dispositional choices that feel like personality but are actually calibrating the engine. The structural fork at w_005 is where the game opens up. By the Dance Circle, the player understands the grammar. They're ready for the Familiar.

---

## Tree Overview

```
THE APPROACH
w_001 (The Pull) --> w_002 (The Threshold)
  cold                  cool

INSIDE
w_002 --> w_003 (The Room) --> w_004 (The Shape Behind the Decks) --> w_005 (The Question)
              warm                    warm                                warm
                                                                           |
                    +------------------------------------------------------+
                    |                  |                                    |
              [surrenders]        [withdraws]                         [called]
                    |                  |                            (pale_antler)
                    v                  v                                    v
THE SLIDE                        WITHDRAWAL                          CALLED PATH
w_006 (The Slide)            w_exit_001 (Leaving)                    w_called_001
     hot                          cold                                 [STUB]
       |                             |
  +----+----+                  w_exit_002 (Home)
  |         |                    cold / TERMINAL
[stays]  [retreats]              outcome: escape
  |         |
  |    THE EDGE
  |    w_007e (The Space Between)
  |         cold
  |         |
  |    +----+----+
  | [returns]  [lingers]
  |    |         |
  |    |    w_008e (Mating Ritual: observer)
  |    |         cool
  |    |         |
  |    |    +----+----+
  |    | [drawn_back] [retreating]
  |    |    |              |
  v    v    v              v
MATING RITUAL          w_exit_001 (convergence
w_008f (participant)    with early withdrawal)
     hot
     | (no choice - auto-advance)
     v
DANCE CIRCLE
w_009 (The Circle) <-- convergence from w_008f and w_008e
     hot
       |
  +----+----+
[entered   [watched
 _circle]   _circle]
  |              |
w_010a         w_010b
(Inside)       (Outside)
  hot            cool
  |              |
  +------+-------+
         v
THE CLOSING
w_011 (convergence)
  hot -> stillness
         | (auto-advance)
         v
DEPARTURE
w_012 (artifact + terminal)
  cold / TERMINAL
  outcome: transcendence or harvest
```

---

## Path Lengths

| Path | Route | Nodes | Est. Time |
|---|---|---|---|
| Deep engagement | 001→002→003→004→005→006→008f→009→010a→011→012 | 11 | ~8 min |
| Floor-edge-return | 001→002→003→004→005→006→007e→008f→009→010a→011→012 | 12 | ~9 min |
| Edge observer | 001→002→003→004→005→006→007e→008e→009→010b→011→012 | 12 | ~9 min |
| Late withdrawal | 001→002→003→004→005→006→007e→008e→exit_001→exit_002 | 10 | ~7 min |
| Early withdrawal | 001→002→003→004→005→exit_001→exit_002 | 7 | ~5 min |

All paths: 7–12 nodes. Within budget.

---

## Tag Accumulation

Every node with a choice awards exactly one tag. Tags from the approach/inside section (first 4 choices) are **DISPOSITION** tags — they create the psychological fingerprint. Tags after the fork (surrenders, stays, retreats, etc.) are **ACTION** tags — they describe what the player did. Conditional text can respond to either type.

By the Dance Circle (w_009), player fingerprints look like:

| Path | Tags | Count |
|---|---|---|
| Deep engagement | drawn/drifting + willing/wary + approaching/observing + accepts/denies + surrenders + stays | 6 |
| Floor-edge-return | above + retreats + returns + felt_rod (auto) | 8 |
| Edge observer | above minus stays, plus retreats + lingers + felt_rod (auto) + drawn_back | 8 |

### Full Tag Vocabulary

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
| `called` | Action | w_005 choice | (pale_antler gated) |
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

---

## Beat Extraction by Section

---

### THE APPROACH
Prose source: "The Approach" (~400 words)

#### w_001 — The Pull

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 1 | You weren't going here. Destination dissolved — soft in mind, the way a word dissolves. | Interior | ESSENTIAL | Base text, opening |
| 2 | Cold is specific. Concrete, shoes, breath visible. Sodium lights, old pennies. | Sensory | ESSENTIAL | Base text |
| 3 | Pressure before music. Jaw, sternum. Direction not melody. Following without deciding. Water downhill. | Sensory/Interior | ESSENTIAL | Base text |
| 4 | Other people walking parallel, not together. Green coat woman. Guy tracking the pressure. Everyone arriving. No one planned this. | Texture | REWARDING | Conditional |

Node shape:
- Arrival variants: none (first node)
- Base text (~140 words): beats 1, 2, 3
- Conditional: beat 4 — "Other people are walking the same direction. Not together — parallel. A woman in a green coat. A guy with his head tilted, tracking the same pressure. Everyone arriving. No one planned this."
- OOR action: none
- Temperature: cold
- Choices:
  - "Follow the bass." → w_002 [drawn]
  - "You didn't choose this direction. You're just walking." → w_002 [drifting]

---

#### w_002 — The Threshold

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 5 | Gravel lot. Orange light bleeding from building seams. Warehouse — bones of industrial purpose. | Sensory | ESSENTIAL | Base text |
| 6 | Bass not louder, closer. Distinction matters. | Sensory | ESSENTIAL | Base text |
| 7 | Door open. Warm air: sweat, glycerin, mineral/thunderstorm underneath. | Sensory | ESSENTIAL | Base text |
| 8 | Body decides before mind. Cross threshold. Cold peels off. | Interior/Action | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - drawn: "You followed the sound here. You thought you were choosing."
  - drifting: "You arrived. You are not confident of the route you took."
  - default: "The alley opens onto a gravel lot."
- Base text (~120 words): beats 5, 6, 7, 8
- Conditional: none
- OOR action: none
- Temperature: cool
- Choices:
  - "The warmth is immediate. Your body wants this." → w_003 [willing]
  - "Something is wrong with this building. You go in anyway." → w_003 [wary]

---

### INSIDE
Prose source: "Inside" (~500 words)

#### w_003 — The Room

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 9 | Room is wrong. Ceiling too high — higher than outside. Disappears into dark. | Sensory | ESSENTIAL | Base text |
| 10 | Projection covers floor: concentric rings, pulsing. You step around them. Everyone does. They belong to something. | Sensory | ESSENTIAL | Base text |
| 11 | Crowd: hundred people, dancing and clusters. Normal. A party. You've been to parties. | Sensory | ESSENTIAL | Base text |
| 12 | Movement on floor slightly wrong. Four people, same shoulder roll, don't know each other. | Sensory | ESSENTIAL | Base text |
| 13 | Air warm and thick. Tastes like ozone. | Sensory | TEXTURE | Base text (one sentence, closing) |
| 14 | Sneaker-star woman nearby, swaying, eyes closed. Star drawn in pen on left toe. Forgot anyone could see her. | Texture/Cross-thread | REWARDING | Conditional: any (plants cross-character thread for all paths) |

Node shape:
- Arrival variants:
  - willing: "The heat is thick and close. Your skin adjusts before your eyes do."
  - wary: "The warmth doesn't reassure you. It's too deliberate. It has a source."
  - default: "Inside. The sound has architecture now."
- Base text (~150 words): beats 9, 10, 11, 12, 13. The ozone beat (13) is one sentence closing the base text — sensory punctuation. The room is wrong, the projection is claimed, the crowd is normal, the movement is off, and the air tastes like metal. Five observations building to unease.
- Conditional: beat 14 — "A woman near you is swaying with her eyes closed. Scuffed white sneakers, a pen mark on the left toe — a tiny star. She looks like she forgot anyone could see her." (No tag requirement — fires for all players. Plants the sneaker-star thread universally. The DETAILED texture-collecting self-reflection stays on the edge path at w_007e where it has room to breathe.)
- OOR action: none (DJ OOR not yet revealed)
- Temperature: warm
- Choices:
  - "Move closer to the decks." → w_004 [approaching]
  - "Find a spot along the wall where you can watch." → w_004 [observing]

---

#### w_004 — The Shape Behind the Decks

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 15 | Decks at far wall, fog thickest. Shapes: orange, yellow, bright in murk. | Sensory | ESSENTIAL | Base text |
| 16 | Pink gloves on mixer. Precise, mechanical. Threading a machine, not performing. | Sensory | ESSENTIAL | Base text |
| 17 | Something large tilts. An ear. Satellite dish. Oriented like radar. | Sensory | ESSENTIAL | Base text |
| 18 | Eyes — green, clustered, not all pointing same direction. One already pointed at you. | Sensory | ESSENTIAL | Base text |
| 19 | Not playing music. Operating equipment. Crowd is raw material. Music is a tool — drill bit, solvent. | Lore | ESSENTIAL | Base text |
| 20 | Floor vibrates from underneath. Not subwoofers. Bass from a direction your inner ear can't name. | Sensory | ESSENTIAL | Base text |
| 21 | Approaching: close enough to see gloves flex. Motion is peristaltic. | Sensory | REWARDING | Arrival variant |
| 22 | Observing: patterns in the crowd too regular. Synchronization not voluntary. | Sensory | REWARDING | Arrival variant |
| 23 | Bass shift, three people stop mid-sentence. Begin to move. | Action | REWARDING | OOR action |

Node shape:
- Arrival variants:
  - approaching: beat 21 — "You are close enough to see the gloves flex at the knuckle joints. The motion is peristaltic."
  - observing: beat 22 — "From the edge you can see more than you want to. The patterns in the crowd are too regular."
  - default: "You are watching something you were not meant to see the mechanics of."
- Base text (~160 words): beats 15, 16, 17, 18, 19, 20. Big reveal node. Accumulating wrongness — fog, gloves, ear, eyes, the floor vibrating from underneath. Each beat is one sentence. The rhythm is noticing, noticing, noticing, then the lore beat (19) reframes everything: not music, equipment. Not performing, operating.
- Conditional: "Your instinct was right. The wrongness was not the building. It was the purpose the building is being put to." (if wary)
- OOR action: beat 23 — "DJ OOR adjusts the low end. Three people near the front stop talking mid-sentence and begin to move. They do not know they were corrected."
- Temperature: warm
- Choices:
  - "This is what it is." → w_005 [accepts]
  - "This can't be what it looks like." → w_005 [denies]

---

#### w_005 — The Question

**GENERATION NOTE:** This node is the most interpolated in the beat map — the prose does not have a discrete "question" moment. It's synthesized from the atmosphere between the Inside section and the Slide. The generation MUST stay in the Wanderer's grounded, sensory register. Do not drift into omniscient narration or lore exposition. The Wanderer does not know they are being asked a question. Their body knows. The language should be physical — temperature, pressure, bass frequency — not conceptual.

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 24 | Room asking a question. Not language. Temperature, pressure, bass through feet and skull. | Interior | ESSENTIAL | Base text |
| 25 | Crowd behind you as a field. Warmth with weight and direction. Current wanting a river stone. | Sensory | ESSENTIAL | Base text |
| 26 | Door still behind you. Cold at back of neck. The alley, the walk home. A life where tonight was just a night. | Sensory/Interior | ESSENTIAL | Base text |
| 27 | The thing that pulled you here is still pulling. It will not stop. | Interior | REWARDING | Conditional: drawn |
| 28 | You have been drifting since the alley. Harder to pretend you're not in the current. | Interior | REWARDING | Conditional: drifting |

Node shape:
- Arrival variants:
  - accepts: "You accepted what you saw. Acceptance does not make it easier. It makes it real."
  - denies: "You told yourself it couldn't be what it looked like. Your body disagrees. Your body has been listening since the alley."
  - default: "Something is about to happen. You feel it the way you feel weather changing."
- Base text (~130 words): beats 24, 25, 26. The fork node. Three beats: the question (felt as physics, not language), the pull (crowd as current), the alternative (door, cold, the life where this didn't happen). The base text presents both directions without favoring either. The player decides.
- Conditional: beat 27 (if drawn) / beat 28 (if drifting) — first match wins
- OOR action: "DJ OOR does not look at you. The eye that tracked you was not looking — it was measuring."
- Temperature: warm
- Choices:
  - "Step into the crowd. Let the bass take you." → w_006 [surrenders]
  - "The door. The cold. The walk home." → w_exit_001 [withdraws]
  - "Something in your pocket hums. It pulls toward the decks." → w_called_001 [called] (requires: pale_antler — gated, rare, see CALLED PATH STATUS below)

---

### THE SLIDE
Prose source: "The DJ OOR Slide" (~400 words)

#### w_006 — The Slide

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 29 | Call-and-response. You know the shape. Church basements, block parties, I-45 with windows down. Structure ancient. Vocals wrong. | Sensory/Interior | ESSENTIAL | Base text |
| 30 | Vocoded voice, not human, from wrong direction — underneath or behind or inside. Body doesn't care about the difference. Body hears the call. | Sensory | ESSENTIAL | Base text |
| 31 | Moving. Didn't decide to. This specific surrender — beat good enough, self-consciousness muscled out by something older and less interested in your opinion. | Interior | ESSENTIAL | Base text |
| 32 | Crowd synchronized. Felt, not seen. Two hundred bodies same time. Floor vibrates harder. Temperature up. | Sensory | ESSENTIAL | Base text |
| 33 | Paint-knuckle man. Tall, beard, house paint from trim work. Laughing. Eye contact. Recognition without language — both inside the same thing and both know it. | Texture/Cross-thread | ESSENTIAL | Base text |
| 34 | Song ends. Synchronization loosens but doesn't fully release. Strangers standing closer without negotiating. Something changed. | Interior | ESSENTIAL | Base text |
| 35 | Laughing. Having fun. This is also real. | Interior | TEXTURE | Conditional: willing or accepts |

Node shape:
- Arrival variant:
  - surrenders: "You chose the crowd. The crowd was already choosing you."
  - default: "The music changes."
- Base text (~170 words): beats 29, 30, 31, 32, 33, 34. Six beats, each one or two sentences. The rhythm builds: structure (call-and-response), voice (vocoded, wrong direction), surrender (body overriding mind), synchronization (felt not seen), recognition (paint-knuckle man), and aftermath (loosening but changed). Beat 33 is the cross-character anchor — the paint-knuckle man will appear in the Familiar's and the Dance Circle's threads.
- Conditional: beat 35 (if willing or accepts — "You are laughing. This surprises you. Nothing about this should be funny and all of it is.")
- OOR action: "DJ OOR makes an adjustment below 40Hz. The projection rings accelerate. The room contracts and no one notices."
- Temperature: hot
- Choices:
  - "Stay on the floor." → w_008f [stays]
  - "Step back to the edge." → w_007e [retreats]

---

### THE SPACE BETWEEN (Edge Path Only)
Prose source: "The Space Between" (~350 words)

#### w_007e — The Space Between

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 36 | Get a drink. Excuse to stand still and watch. | Action | ESSENTIAL | Base text |
| 37 | Temperature drops at the edge. Not gradually — a border. Warm floor, cold wall. Cup in both hands. | Sensory | ESSENTIAL | Base text |
| 38 | Whole room visible from here. Dance floor as single organism, breathing and contracting. | Sensory | ESSENTIAL | Base text |
| 39 | DJ OOR more visible: fibrous texture, fur or crochet or something without a textile name. Mouth at center. Ear rotating, scanning. | Sensory | REWARDING | Conditional: observing |
| 40 | Sneaker-star woman: the full texture-collecting passage. Scuffed sneakers, star on left toe. You always notice this — details that don't matter, the ones that stick. Compulsion. Collect textures like stamps — not to display, just to have. Just to know they exist. | Interior/Cross-thread | ESSENTIAL | Base text (Wanderer self-definition) |
| 41 | Antlered woman walks past toward floor. Rod in hand. It hums. Responding to something inside you. | Action | ESSENTIAL | Base text |
| 42 | She doesn't look at you. Looks at the rod. Adjusts trajectory. You have been measured. | Action/Interior | ESSENTIAL | Base text |
| 43 | Cold bothering you existentially. Dance floor pulling patiently. Door farther than before. | Interior | ESSENTIAL | Base text |

Node shape:
- Arrival variant:
  - retreats: "The cold finds you the moment you step off the floor. Not gradually — a border."
  - default: "The bar is along the wall. The cold side."
- Base text (~170 words): beats 36, 37, 38, 40, 41, 42, 43. The edge-path reward node. Beat 40 is the Wanderer's self-definition — the texture-collecting passage. On the floor path (w_003 conditional), the player got a glimpse of the sneaker-star woman. Here, on the edge, they get the full passage: "you always notice this... not a skill, a compulsion... just to know they exist." This is who the Wanderer IS. It only fully manifests when they step back to watch. The stillness of the edge is the condition for self-knowledge.
- Conditional: beat 39 (if observing — "From here DJ OOR is more visible. The texture is fibrous — fur or crochet or something without a textile name. The ear rotates slowly, scanning.")
- OOR action: none (player is away from the mechanism)
- Temperature: cold
- Awards: `felt_rod` tag automatically
- Choices:
  - "Return to the floor." → w_008f [returns]
  - "Stay at the edge." → w_008e [lingers]

---

### THE MATING RITUAL
Prose source: "The Mating Ritual" (~500 words)

#### w_008f — Mating Ritual: Participant

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 44 | Music changes. Texture different — melodic lines that curl and retreat. Whimsical in the way fairy tales are whimsical: beautiful and not safe. | Sensory | ESSENTIAL | Base text |
| 45 | On the floor now. Don't remember walking back (if returning). Warmth has you. | Interior | ESSENTIAL | Arrival variant: returns |
| 46 | Someone near you — closer than a stranger should be. You don't mind. Bass inside skeleton. Boundary between body and room is negotiable. | Sensory | ESSENTIAL | Base text |
| 47 | Pairs forming. Clusters merging into crowd. Not choreographed — unified. The difference matters. Choreography imposed from outside. This came from inside and worked its way out. | Lore | ESSENTIAL | Base text |
| 48 | Room breaking apart and reforming. Looks like the party getting looser. Looks like the moment at a wedding when everyone stops being polite and starts being present. | Sensory | REWARDING | Conditional: willing or accepts |
| 49 | Grinning. Can't help it. Paint-knuckle man near you again — grabs your shoulder, yells something you can't hear. Doesn't matter what. The gesture was the content. | Texture/Cross-thread | REWARDING | Conditional: stays |

Node shape:
- Arrival variants:
  - returns: "You don't remember walking back out. The warmth has you."
  - stays: "You never left the floor. Why would you."
  - default: "The music changed and so did the room."
- Base text (~160 words): beats 44, 46, 47. Expanded from v1 (was 130). Beat 44 preserves the full "beautiful and not safe" formulation — "whimsical in the way fairy tales are whimsical, which is to say it is beautiful and it is not safe." Do not compress this to "whimsical and unsafe." The fairy-tale framing is the Wanderer's register — body memory, not terminology. Beat 47 is the essential lore delivery: "not choreographed — unified. The difference matters." This distinction is the Wanderer's version of what the Familiar understands as transcendentals existing between people. Same observation, different literacy.
- Conditional: beat 48 (if willing or accepts — "It looks like the moment two hours into a wedding when everyone stops being polite and starts being present.") / beat 49 (if stays — "The paint-knuckle man is near you again. He grabs your shoulder and yells something you can't hear. It doesn't matter what he said. The gesture was the content.")
- OOR action: "DJ OOR's ear sweeps the room. Density sufficient. For the first time tonight, it makes no adjustment. The room is doing the work on its own."
- Temperature: hot
- Awards: `participated_ritual` tag automatically
- NO CHOICE. Auto-advance → w_009. The ritual dissolves your agency. The RETURN of choice at the Dance Circle is the point.

---

#### w_008e — Mating Ritual: Observer

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 50 | Antlered figures on floor. Second one appears — moving differently, structured, choreographic. They are a unit. | Action | ESSENTIAL | Base text |
| 51 | Rod resonating — not humming. Sound between the notes. Fills spaces melody leaves empty. | Sensory | ESSENTIAL | Base text |
| 52 | Sneaker-star woman approached. Rod sings. Hand taken. Paired with half-closed-eyes man. Positioned geometrically — distance adjusted until rod quiet. Resonance. Move together without discussion. | Action/Cross-thread | ESSENTIAL | Base text |
| 53 | This happening everywhere. Pairs forming. Specific and deliberate. Some passed over — rod doesn't respond. They don't notice. | Lore | ESSENTIAL | Base text |
| 54 | Room breaking apart and reforming. Looks like the party getting looser. | Sensory | ESSENTIAL | Base text |
| 55 | Some people passed over without noticing. What it means to not be noticed by the rod. What it means that it noticed you. | Interior | REWARDING | Conditional: observing |

Node shape:
- Arrival variant:
  - lingers: "You stayed at the edge. The ritual came to you anyway — or you're watching it happen to everyone else."
  - default: "The music shifts. Something darker, more textured."
- Base text (~150 words): beats 50, 51, 52, 53, 54. The edge-path parallel to w_008f. Where the floor participant FEELS the ritual (boundary dissolving, bass in skeleton), the edge observer SEES it (geometric positioning, rod singing and quieting, the sneaker-star woman being paired). Same timeline. Different species of attention. Beat 52 is the cross-character payoff: the sneaker-star woman the Wanderer noticed on w_003 (or detailed on w_007e) is now being paired by the antlered figures. The player watches the mechanism they felt the rod measure them for on the edge path.
- Conditional: beat 55 (if observing — "Some people are passed over. The rod doesn't respond. They don't notice. You wonder what it means to not be noticed by the rod. You wonder what it means that it noticed you.")
- OOR action: "DJ OOR does not watch the familiars work. DJ OOR watches what the familiars produce."
- Temperature: cool
- Choices:
  - "The warmth pulls you back to the floor." → w_009 [drawn_back]
  - "You've seen enough." → w_exit_001 [retreating]

---

### THE DANCE CIRCLE
Prose source: "The Dance Circle" (~400 words)

#### w_009 — The Circle (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 56 | Projection changes. Rings contract to single circle, eight feet across. Arrow inside. Spins. | Action | ESSENTIAL | Base text |
| 57 | Crowd pulls back. Ring of bodies around ring of light. Room holds its breath. | Action | ESSENTIAL | Base text |
| 58 | Jacket woman enters first — hasn't taken it off all night despite the heat. Dances honestly. Thirty seconds of being completely visible and not caring. Crowd erupts. | Action/Cross-thread | ESSENTIAL | Base text |
| 59 | Paint-knuckle man enters. Dances like someone's dad at a barbecue — enormous, unselfconscious. Crowd loves it. | Action/Cross-thread | REWARDING | Conditional: stays or willing |
| 60 | Arrow slows. Points at you. | Action | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - participated_ritual: "You are still warm from the dissolution. The circle finds you in the warmth."
  - drawn_back: "You came back to the floor. The circle was waiting."
  - default: "The projection changes."
- Base text (~140 words): beats 56, 57, 58, 60. The circle opens, the jacket woman enters (the Familiar will see her armor; the Wanderer just sees honest dancing), and the arrow finds you. Beat 60 is four words: "It points at you." Standalone paragraph.
- Conditional: beat 59 (if stays or willing — "The paint-knuckle man enters next. He dances the way he probably works — enormous, committed, unselfconscious. You remember his face from the Slide.")
- OOR action: "The arrow is not random."
- Temperature: hot
- Choices:
  - "Enter the circle." → w_010a [entered_circle]
  - "Stay in the ring." → w_010b [watched_circle]

---

#### w_010a — Inside the Circle

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 61 | Circle is bright. Rest of room dark. | Sensory | ESSENTIAL | Base text |
| 62 | Aperture beneath your feet. Vibrating at your heartbeat — or yours matched it. Can't tell which came first. | Sensory | ESSENTIAL | Base text |
| 63 | You dance. You are seen. | Action | ESSENTIAL | Base text |
| 64 | Something taken you didn't know you were carrying. | Interior | ESSENTIAL | Base text |
| 65 | Lighter. Specifically lighter — the way you feel after crying, confessing, saying the thing you held. | Interior | ESSENTIAL | Base text |
| 66 | Crowd absorbs you back. You are part of something. | Action | ESSENTIAL | Base text |

Node shape:
- Base text (~130 words): beats 61–66. Each is one sentence. Brevity IS the style. This is the climax. No arrival variant — the act of entering is the arrival. No lead-in. Just: the circle is bright, the aperture vibrates, you dance, something is taken, you are lighter, you belong. Six sentences. The shortest sentences in the Wanderer's prose. The self-consciousness that characterizes the Wanderer's voice — the noticing, the texture-collecting, the uncertain agency — is gone. There is nothing to notice. There is only the dancing.
- Conditional: "The paint-knuckle man cheers from the ring. You can't hear what he says. The gesture is the content." (if stays)
- OOR action: none. You are the focus. The ABSENCE of the OOR block IS the point.
- Temperature: hot (hottest node)
- Awards: `truth` transcendental, `entered_circle` tag
- Auto-advance → w_011

---

#### w_010b — Outside the Circle

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 67 | Arrow moves on. Circle continues without you. | Action | ESSENTIAL | Base text |
| 68 | Cold begins at back of neck. | Sensory | ESSENTIAL | Base text |

Node shape:
- Base text (~80 words): beats 67, 68. Short. The brevity IS the consequence. Two beats. The arrow moves on. The cold arrives. The game says nothing about this being wrong. The cold says it.
- Conditional: "You've been cold before tonight. At the edge, at the bar, in the alley. It keeps finding you." (if retreats or lingers)
- OOR action: "DJ OOR does not note your refusal. DJ OOR does not note anything about you individually."
- Temperature: cool
- Auto-advance → w_011

---

### THE CLOSING
Prose source: "The Closing" (~350 words)

#### w_011 — The Closing (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 69 | DJ OOR knows. Music completing, not winding down. Last sentence of a book. | Interior | ESSENTIAL | Base text |
| 70 | Call and response. Crowd descends. Bodies bending, knees folding, sinking toward floor. | Action | ESSENTIAL | Base text |
| 71 | Person next to you grabs your hand. You let them. | Action/Cross-thread | ESSENTIAL | Base text |
| 72 | At the floor. Bass drone. Vibration from underneath, from above. Between them. | Sensory | ESSENTIAL | Base text |
| 73 | You are the membrane. The conduit. Something passing through — not pain, not pleasure. Flow. Restoration. | Lore | ESSENTIAL | Base text |
| 74 | Stillness. Bass drops. Silence — not absence, presence of quiet. A silence earned. | Sensory | ESSENTIAL | Base text |
| 75 | Portal closes. Air pressure change. Projection fades. Room is warehouse. | Action | ESSENTIAL | Base text |
| 76 | DJ OOR behind decks. Shape still. Gloves resting. Eyes dark. | Sensory | REWARDING | Conditional: approaching or entered_circle |
| 77 | Standing up. Knees ache. Shirt damp. Smiling. Crowd dispersing like leaving a funeral or good movie — reluctant to break the container. | Sensory | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - entered_circle: "You are still light from the circle. The closing finds you open."
  - watched_circle: "You watched from the ring. The closing does not care."
  - participated_ritual (without circle): "You were in it. The closing takes you the rest of the way down."
  - default: "Something in the music is finishing."
- Base text (~170 words): beats 69–75, 77. Longest node. Justified — this is the payoff. Each beat is a sentence. The rhythm is a descent: OOR knows, the crowd lowers, the hand, the floor, the membrane, the stillness, the portal seals, stand up. Beat 73 is the lore climax: "you are the membrane." The Wanderer doesn't understand this. Their body does.
- Conditional: beat 76 (if approaching or entered_circle — "DJ OOR is behind the decks. The shape is still. The green tentacles are resting on the mixer. The eyes are dark.")
- OOR action: none. The earned silence. An OOR block here would break it.
- Temperature: hot → stillness
- Auto-advance → w_012

---

### DEPARTURE
Prose source: "The Walk Home" (~300 words)

#### w_012 — Departure (TERMINAL)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 78 | Cold outside is a relief. Gravel lot emptying. Sodium lights still orange. Alley the same length. | Sensory | ESSENTIAL | Base text |
| 79 | Car. Keys cold. Sit in driver's seat a long time. Silence different — just silence. | Interior | ESSENTIAL | Base text |
| 80 | Hand in pocket. Something that wasn't there before. | Action | ESSENTIAL | Base text |
| 81 | Artifact (path-dependent — see below) | Lore | ESSENTIAL | Conditional |
| 82 | Phantom vibration in sternum. Days to fade. | Sensory | ESSENTIAL | Base text |
| 83 | You will come back. | Interior | ESSENTIAL | Base text (final line) |

Node shape:
- Base text (~110 words): beats 78, 79, 80, 82, 83. The walk home. Cold as relief (not punishment — the night is over, the cold is just cold). Keys, car, silence. Hand in pocket — something there. Then the phantom vibration: days to fade. And the final line, standalone: "You will come back."
- Conditional text — ARTIFACT DELIVERY (first match wins):
  - Truth (if entered_circle): "A strip of fabric, thin, almost translucent. Warm. You hold it to the sodium light. There is writing on it that shifts when you try to read it. It smells like the fog from inside." → awards_artifact: `fabric_strip`
  - Beauty (if felt_rod): "A shard of something — glass, or crystal, or resin. It hums faintly. The sodium light refracts through it and for a moment the gravel lot looks like somewhere older. You put it back quickly." → awards_artifact: `humming_shard`
  - Unity (if participated_ritual + stays): "A small, smooth stone. Warm despite the cold. You close your hand around it and for a moment you can feel the crowd — not remember them, feel them, as if the boundary never fully reformed." → awards_artifact: `warm_stone`
  - Goodness (if willing + closing reached): "A small knot of yarn, orange and yellow. Warm. It wasn't cut — it was pulled from something. You think of the hand that held yours. You don't know their name. You know exactly how their palm felt." → awards_artifact: `yarn_knot`
  - None (fallback): "Your pockets are empty. There is nothing except the cold and the walk and the phantom vibration and the knowledge that something happened and you weren't quite in it."
- OOR action: none
- Temperature: cold (neutral)
- Terminal: true
- Outcome: transcendence (if entered_circle + participated_ritual), harvest (if partial engagement + artifact), escape (if minimal engagement — unlikely on this path but possible)

---

### WITHDRAWAL PATH

#### w_exit_001 — Leaving

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 84 | Cold immediate. Sharp cold of something warm taken away. Gravel lot half-empty. Sodium lights same orange. Bass audible through walls, muffled. Exact moment it stops reaching your body. A border. Cross it. | Sensory | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - From w_005 (withdraws): "You choose the door. You never went in far enough to know what you're leaving."
  - From w_008e (retreating): "You saw enough from the edge. The antlers and the rod and the pairing — none of it made sense. You're choosing the version of tonight where it doesn't have to."
  - default: "You are leaving."
- Base text (~90 words): beat 84. The cold is immediate — "not the gradual cold of the approach, the sharp cold of something warm being taken away." The bass is still audible through the walls, muffled, and the player feels the exact moment it stops reaching their body. A border. They cross it. Short, sharp, clinical. The warmth is behind them and they chose this.
- Conditional: "The cold doesn't surprise you. You've been cold all night — at the edge, at the bar. It was looking for you." (if retreats + lingers)
- Temperature: cold
- Auto-advance → w_exit_002

---

#### w_exit_002 — Home (TERMINAL: escape)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 85 | Drive home. Streets empty. Keys cold. Couch. Show, podcast, noise. Fall asleep without deciding to. Morning: remember going somewhere, not where. Won't remember bass or warmth or shape. Feel slightly wrong for days. Won't look for the reason. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~80 words): beat 85. The escape terminal. The Wanderer goes home, puts on noise, falls asleep. They will not remember the bass or the warmth or the shape behind the decks. They will feel slightly wrong for a few days and they will not look for the reason. The incompletion is the ending. "Safe" is technically true and entirely insufficient. Do not frame this as victory or relief. Frame it as the shape of a refusal that will live in the body.
- Temperature: cold
- Terminal: true
- Outcome: escape

---

## Called Path Status

**w_called_001 is a STUB.** The `called` choice at w_005 requires the `pale_antler` artifact, which is not yet awarded anywhere in the game. This path represents the Wanderer being pulled toward OOR rather than into the crowd or out the door — a third option for players who carry a cross-run artifact from the Familiar's playthrough.

Design intent: the pale_antler is found during a Familiar run (specifics TBD). A Wanderer re-run with the pale_antler in persistent state reveals the third choice at w_005. The called path leads toward OOR — a different relationship with the construct than the floor or the edge. This is the cross-character bridge mechanic described in GAME_SPEC.md.

**For v2 JSON generation: omit w_called_001.** The gated choice at w_005 should be present in the JSON (with its `requires` condition), but the target node does not yet exist. The engine will hide the choice for players without the artifact. When the pale_antler artifact and the called path are designed, they can be added as a separate JSON file or appended to the Wanderer's node set.

---

## Artifact Logic Summary

| Artifact | Transcendental | Attaches When | Key Tags | Awards |
|---|---|---|---|---|
| Fabric Strip | Truth | Entered the dance circle | `entered_circle` | `fabric_strip` |
| Humming Shard | Beauty | Felt the divining rod respond | `felt_rod` | `humming_shard` |
| Warm Stone | Unity | Stayed on floor through ritual | `stays` + `participated_ritual` | `warm_stone` |
| Yarn Knot | Goodness | Completed closing with open disposition | `willing` + closing reached | `yarn_knot` |

Priority (if multiple conditions met): Truth > Beauty > Unity > Goodness.

A completionist needs a minimum of **2 runs** to see both floor and edge vantage points, and **3 runs** to collect all four artifacts (Truth requires entering the circle, Beauty requires the edge path for felt_rod, Unity requires staying on the floor, Goodness requires willing disposition).

---

## Cross-Character Thread Placement

| Thread | Wanderer Node(s) | Familiar Sees | Builder Sees |
|---|---|---|---|
| Sneaker-star woman | w_003 (conditional, all paths) + w_007e (detailed, edge) + w_008e | Truth deposit, "human sigil she doesn't know she made" | Does not notice |
| Paint-knuckle man | w_006 + w_009 (conditional) + w_010a (conditional) | Unity packed like grain in timber | Does not notice |
| Jacket woman | w_009 | Armor. Maintained boundary. Circle asks to drop it. | Does not notice |
| Hand-holder | w_011 | One of the crowd | Does not notice |
| Antlered woman / rod | w_007e | IS this character (the Familiar) | Does not notice directly |
| Bartender | (implicit — accepted drink) | Pouring with approximate accuracy | Does not notice |
| Bouncer | (implicit — walked past) | Does not know what security means | Does not notice |

**Note on the sneaker-star thread:** In v2, the sneaker-star woman appears on ALL paths via the w_003 conditional (brief sighting). The detailed texture-collecting self-reflection passage ("you always notice this... a compulsion... just to know they exist") remains on the edge path (w_007e) where it has room. This ensures the cross-character thread is planted for every player, while the deeper Wanderer self-definition rewards the edge path specifically.

---

## Nodes Summary

| ID | Section | Path | Temp | Choice? | Words Est. |
|---|---|---|---|---|---|
| w_001 | The Pull | All | cold | Yes (2) | 140 |
| w_002 | The Threshold | All | cool | Yes (2) | 120 |
| w_003 | The Room | All | warm | Yes (2) | 150 |
| w_004 | The Shape | All | warm | Yes (2) | 160 |
| w_005 | The Question | All | warm | Yes (2–3) | 130 |
| w_006 | The Slide | Engaged | hot | Yes (2) | 170 |
| w_007e | Space Between | Edge | cold | Yes (2) | 170 |
| w_008f | Mating: Participant | Floor | hot | No | 160 |
| w_008e | Mating: Observer | Edge | cool | Yes (2) | 150 |
| w_009 | Dance Circle | Convergence | hot | Yes (2) | 140 |
| w_010a | Inside Circle | Entered | hot | No | 130 |
| w_010b | Outside Circle | Refused | cool | No | 80 |
| w_011 | The Closing | Convergence | hot→still | No | 170 |
| w_012 | Departure | Terminal | cold | No | 170 |
| w_exit_001 | Leaving | Withdrawal | cold | No | 90 |
| w_exit_002 | Home | Terminal | cold | No | 80 |

Total nodes: 16
Total unique beats distributed: 85
Estimated words on longest path: ~1,760
Estimated words on shortest path: ~830

---

## Temperature Map by Path

### Deep Engagement
```
cold → cool → warm → warm → warm → hot → hot → hot → hot → hot→still → cold
 001    002    003    004    005    006   008f   009   010a    011       012
```

### Edge Observer
```
cold → cool → warm → warm → warm → hot → cold → cool → hot → cool → hot→still → cold
 001    002    003    004    005    006   007e   008e   009   010b    011       012
```

### Early Withdrawal
```
cold → cool → warm → warm → warm → cold → cold
 001    002    003    004    005   exit1  exit2
```

The deep engagement path warms steadily and stays hot. The edge path oscillates — hot on the floor, cold at the edge, cool observing, hot at the circle convergence. The withdrawal path goes warm → cold in one step. Temperature tells the story without words.

---

## Voice Contract for Node Generation

```
ROLE: You are generating Wanderer nodes from a beat map and prose reference.

VOICE CONTRACT:
- Second person. Present tense. Terse.
- Every sentence earns its place. If it can be cut and the node works, cut it.
- Metaphors are concrete and sensory, never spiritual.
  Sodium lights, old pennies, the hinge of your jaw, water downhill.
- The body recognizes things before the brain does.
  "Your body makes a decision before your mind catches up."
  "You didn't decide to move."
- Agency is permanently uncertain. The Wanderer is a willing participant
  who isn't sure when the willing part started.
- Musical knowledge shows as body memory, not reference.
  "A structure you've felt a thousand times" — not "call-and-response format."
- The Wanderer notices specific textural details about strangers.
  Paint on knuckles (house paint, trim work, didn't care to tape).
  Pen mark on a sneaker (a tiny star, maybe her, maybe a kid).
  These are not decorative. They are the character's mode of processing.
- Self-awareness is reflective, never performative.
  "You always notice this" — not "as a perceptive person, I observe."
- The artifact appears retroactively. The Wanderer did not pick it up.
  It is in their pocket. The moment of acquisition is invisible.
- DJ OOR action blocks are clinical, observational, never emotional.
  The player is not the subject. Maximum 2 sentences. Sparse — 1 in 3-4 nodes.

NODE CONSTRAINTS:
- Base text: 80-170 words (wide range — w_010b is 80, w_011 is 170).
- Arrival variant: 1 sentence max 2. First match wins. Always include default.
- Conditional: 0-2 blocks per node. 1-2 sentences each. Additive, not exclusive.
- Choices: 2 default. 3 maximum if one is artifact-gated.
- Choice text: 1 sentence. The choice is a gesture, not a paragraph.

CROSS-CHARACTER THREADING:
- Sneaker-star woman appears on w_003 (brief, all paths) and w_007e (detailed, edge)
  and w_008e (being paired, edge). Same person, three distances.
- Paint-knuckle man appears on w_006 (the Slide, essential) and w_009/w_010a
  (conditional). Same person, accumulating familiarity.
- Jacket woman appears on w_009 only. One sighting. Enough.
- Hand-holder appears on w_011 only. Unnamed. Unknown. Sufficient.

OUTPUT FORMAT:
Return valid JSON matching the node schema. No preamble. No explanation.
```

---

## Checklist: Before Generating Nodes

- [x] Prose reference document complete and reviewed
- [x] Beat extraction complete (85 beats, this document)
- [x] Each beat classified: Priority / Type / Placement
- [x] ESSENTIAL beats mapped to all paths (verified)
- [x] Parallel path structure defined (floor vs. edge)
- [x] Convergence points identified (w_009, w_011)
- [x] Tag vocabulary defined (7 choice pairs + 2 auto-awards)
- [x] Artifact attachment points identified (4 artifacts, priority ordered)
- [x] Temperature progression mapped for all 5 paths
- [x] Cross-character threads flagged (sneaker-star universal via w_003 conditional)
- [x] Called path stub documented and deferred
- [x] Ozone beat added to w_003
- [x] w_008f expanded to ~160 words with full dissolution/unified beat
- [x] w_005 flagged with generation note re: interpolated node
- [x] Voice contract written
- [ ] Node generation not yet started

---

## Ready for Generation

This document contains everything needed to generate all 16 Wanderer nodes as valid JSON. Use the prose document as voice reference. Use this document as the blueprint.
