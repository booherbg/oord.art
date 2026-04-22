# The Builder — Beat Extraction & Node Map (v2)
**Intermediary document. Feeds node generation.**
**Built from: BUILDER_PROSE.md, EVENING_TIMELINE.md, lore-viewer.html**
**No legacy spine. All nodes authored fresh from prose.**

---

## Naming & Lore Conventions (Verify Before Generating)

- **Sooboont** (not Suboont, not Subbont)
- **DJ OOR** when at decks, in the warehouse, operating. **Oor** when discussed as entity in cosmology.
- Oor is a **construct**, not a deity. Conceived in the manner of the Dunwich Horror.
- The portal is a **healing connection** — clearing a clogged drain. Failure = portal yawns, spreads, consumes.
- The divining rod of Sooboont (not theremin, not wearable)
- Participants are the **conduit**. The crowd is the **circuit**.
- **Homewreckers** — the Builder's subwoofer system. Snail-shell coil configuration. Twenty twelve-inch drivers, five enclosures, four per enclosure.
- **The chamfer** — 45-degree hand-filed chamfer on the heat sink mounting flange. Micro-resonance in the noise floor. Builder's signature frequency. "A luthier voices an instrument. You chamfer a flange."
- **The unnamed module** — monitoring interface that appears uninvited on the Builder's iPad. Not installed, not in applications list, reporting valid data. Non-linguistic interface with the harvest mechanism.

---

## Character Unlock & Context

The Builder is **unlockable after completing both Wanderer and Familiar playthroughs**. The player has experienced the evening from inside the crowd and from inside the operation. Now they experience it from behind the equipment — the person who built the instrument that made both prior experiences possible.

**This is the reward playthrough.** The player who unlocked the Builder has done two full runs. They understand the harvest, the aperture, the transcendentals, the familiars' cargo cult. What they don't know is: someone BUILT the mechanism's voice. Someone machined heat sinks and printed horns and wired every connection. Someone got a forty-seven page PDF from a burner email address and built the thing that Sooboont needed. The Builder's story answers the question the other two playthroughs raise: where did the system come from?

This is also the funniest playthrough. The Douglas Adams DNA lives here — bureaucratic responses to cosmic horror, professional documentation that omits references to throats, firmware glitches reconciling irreconcilable facts. The humor makes the horror land harder because the Builder KNOWS how impossible each data point is.

---

## Tree Overview

```
BEFORE THE EVENING
b_001 (The Email) --> b_002 (The Homewreckers) --> b_003 (The Commission)
  cold                  warm                         warm
                                                       |
                                                [investigates / accepts_gig]
                                                       |                     CHOICE 1
LOAD-IN                                                v
b_004 (The Stack) --> b_005 (The Harmonic)
  warm                  warm
                          | (auto)
                          v
SOUNDCHECK
b_006 (The Introduction) --> b_007 (The Module)
  warm                        warm
                                |
                         [investigates_module / trusts_data]
                                |                            CHOICE 2
THE SET                         v
b_008 (The Portal — Operational)
  hot
    |
    +--ROUTED BY CHOICE 2--+
    |                      |
b_009a (The Throat)     b_009b (The Vocal Organ)
  hot                     hot
    |                      |
    +----------+-----------+
               v
THE ANOMALIES
b_010 (The Anomalies) --> b_011 (The Amber Bloom)
  warm                      warm
                              | (auto)
                              v
THE SLIDE
b_012 (The Pull) --> b_013 (The Dance)
  hot                  hot
                         |
                  [stays_floor / returns_rack]
                         |                       CHOICE 3
FLOOR / RACK             v
b_014a (The Floor)   OR   b_014b (The Rack)
  hot                       warm
    |                        |
    +----------+-------------+
               v
THE MOMENT
b_015 (OOR Recognition)  <-- convergence
  hot
    |
    [accepts_meaning / files_it]
    |                                            CHOICE 4
    v
THE CLOSING
b_016 (The Engineering Apocalypse) --> b_017 (The Completion)
  hot                                    hot -> stillness
                                           | (auto)
                                           v
DEPARTURE
b_018 (Teardown) --> b_019 (The Artifact)
  cool                 cold / TERMINAL
                       outcome: recognition
```

---

## Path Lengths

| Path | Route | Nodes | Est. Time |
|---|---|---|---|
| All paths | 001→002→003→004→005→006→007→008→009(a or b)→010→011→012→013→014(a or b)→015→016→017→018→019 | 19 | ~13 min |

19 nodes per path. 21 total nodes (2 parallel pairs). 4 choice points.

---

## Structural Design: Parallel Lore Branches

**Branch 1 (b_009a / b_009b):** Driven by Choice 2 (investigates_module / trusts_data).
- **b_009a — The Throat:** The Builder who investigates the module has been paying attention to the impossible data. Now they check the ventilation. Behind the panel: cables, fan, and a surface that is organic, dark, pulsing. The inside of a throat. Close panel, open again — normal. "Professional documents do not contain references to the inside of throats." Pure Lovecraftian horror delivered through engineering procedure.
- **b_009b — The Vocal Organ:** The Builder who trusts the data stays focused on system performance. The Homewreckers are exceeding specifications. Not reproducing sound — channeling it. The thought arrives uninvited: the spec was not for speakers. It was for a vocal organ. For something that needed a voice. A slower, more cognitive realization rather than a visceral encounter.

Both cover the same timeline moment (the set begins, the system is doing something impossible). One is physical horror (the throat). The other is conceptual horror (the vocal organ). Different aperture on the same impossibility.

**Branch 2 (b_014a / b_014b):** Driven by Choice 3 (stays_floor / returns_rack).
- **b_014a — The Floor:** The Builder as participant during the Mating Ritual. Inside the sound they built. Boundary dissolving. The antlered woman passes — the rod doesn't respond to the Builder because the Builder is infrastructure, not deposit.
- **b_014b — The Rack:** The Builder as monitor. EQ adjustments unknowingly aiding the ritual. The waveform climbing. The irony: the Builder's technical adjustments are tuning the harvesting apparatus.

### Schema: Conditional Routing

Same schema extension as the Familiar v2:

```json
{
  "id": "b_008",
  "choices": [],
  "next": [
    { "requires": { "has_tag": "investigates_module" }, "target": "b_009a" },
    { "default": true, "target": "b_009b" }
  ]
}
```

---

## Tag Accumulation

Four choices. Disposition and action tags.

| Tag | Type | Source | Pole |
|---|---|---|---|
| `investigates` | Disposition | b_003 | vs `accepts_gig` |
| `accepts_gig` | Disposition | b_003 | vs `investigates` |
| `investigates_module` | Disposition | b_007 | vs `trusts_data` |
| `trusts_data` | Disposition | b_007 | vs `investigates_module` |
| `stays_floor` | Action | b_013 | vs `returns_rack` |
| `returns_rack` | Action | b_013 | vs `stays_floor` |
| `accepts_meaning` | Disposition | b_015 | vs `files_it` |
| `files_it` | Disposition | b_015 | vs `accepts_meaning` |

Plus 2 auto-awards:
| `on_floor` | Engagement | b_014a auto | — |
| `at_rack` | Engagement | b_014b auto | — |

16 possible fingerprints (2⁴). The fingerprints that matter most:

**The Open path:** investigates + investigates_module + stays_floor + accepts_meaning = the Builder who searched for the client, studied the module, went to the floor, and accepted the meaning of the Moment. Every defense was already down when OOR opened the glove. The artifact is a receipt.

**The Insulated path:** accepts_gig + trusts_data + returns_rack + files_it = the Builder who never questioned, never investigated, stayed behind the rack, and filed the Moment as four seconds of anomalous data. Every defense still up. And the artifact punches through ALL of them. The heat sink asks the questions the Builder never did. This is the most devastating ending because everything the Builder refused to feel arrives at once in a warm piece of metal that won't stop singing.

---

## Beat Extraction by Section

---

### BEFORE THE EVENING
Prose source: "The Contract" (~900 words)

The Builder is UNIQUE in having a pre-evening backstory. The Wanderer's approach is minutes before. The Familiar's "Before" is the same night. The Builder's Contract is six weeks before — the email, the build, the commission. This is the Builder's origin story and the system's origin story. Three nodes.

#### b_001 — The Email

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 1 | Email arrived six weeks ago. No name, no company. Burner address — randomly generated or a language you don't read. Subject: SUBWOOFER SYSTEM — SPECIFICATIONS ENCLOSED. | Action | ESSENTIAL | Base text, opening |
| 2 | Almost deleted. You get a lot of emails — party speakers, Bluetooth from Target. Opened because attachment was a PDF. 47 pages single-spaced. Frequency response curves hand-drawn — copperplate engravings of sine waves. Acoustics at a level either deeply professional or deeply unwell. | Interior/Sensory | ESSENTIAL | Base text |
| 3 | Specifications: impossible, fascinating, extremely well-compensated. | Interior | ESSENTIAL | Base text |
| 4 | Five enclosures. Twenty 12-inch subs, four per enclosure, custom-coiled into logarithmic spiral. Snail-shell configuration you've iterated a decade. Grabbed you by the brainstem and wouldn't let go. | Action/Interior | ESSENTIAL | Base text |
| 5 | Phase alignment solutions from PDF. Shouldn't work at this scale. They work. Checked twice. Mathematics not published yet, or published once and forgotten. | Lore | ESSENTIAL | Base text |

Node shape:
- Arrival variants: none (first node)
- Base text (~160 words): beats 1, 2, 3, 4, 5. The hook. A burner email, a PDF that reads like copperplate engraving, specs that are impossible and fascinating, and the snail-shell configuration the Builder has been chasing for a decade — described by a stranger who shouldn't know it exists. Beat 2 establishes the Builder's world immediately: spam emails from people who want party speakers. Real. Grounded. Then the PDF arrives and the ground shifts. Beat 5 is the first lore signal: mathematics not yet published, or published and forgotten. Something old is in the spec.
- Conditional: none (first node)
- OOR action: none
- Temperature: cold (before the evening, before the build, before everything)
- No choice. Auto-advance to b_002.

---

#### b_002 — The Homewreckers

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 6 | The Homewreckers — put the ass in bass. Open prairie, no neighbors for miles, one farm a mile and a half out. Farmer drove over next morning to ask what you'd been celebrating. Name stuck. | Interior | ESSENTIAL | Base text |
| 7 | Ten years lowest distortion figures outside an anechoic chamber. | Interior | ESSENTIAL | Base text |
| 8 | Power spec: ten residential circuits. Full draw. Makes electricians leave the room. You know this territory. | Interior | ESSENTIAL | Base text |
| 9 | Heat management solved. Custom-machined aluminum. Metallurgist friend: "needlessly beautiful." Took this as a compliment. | Interior/Sensory | ESSENTIAL | Base text |
| 10 | The chamfer. 45 degrees, hand-filed. Micro-resonance in noise floor. Faint clean line in spectral analysis, consistent across every system. Your signature. A luthier voices an instrument. You chamfer a flange. Same principle. The sound it makes is yours. | Interior | ESSENTIAL | Base text (THIS IS THE CHARACTER) |

Node shape:
- Base text (~170 words): beats 6, 7, 8, 9, 10. The identity document. Who you are when you build. The Homewreckers are not just speakers — they're a decade of obsession, a farmer's complaint, a metallurgist's backhanded praise. Beat 10 is the chamfer introduction. This is the single most important paragraph in the Builder's prose because the chamfer IS the Builder — their name, their mark, their frequency hiding in the noise floor. "The sound it makes is yours." Give it its own paragraph. Let it ring.
- Conditional: none
- OOR action: none
- Temperature: warm (the Builder is warming to the project — the temperature tracks emotional engagement even in the backstory)
- No choice. Auto-advance to b_003.

---

#### b_003 — The Commission

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 11 | PDF heat sinks. Not your design — similar, different. Better in some ways. Organic geometry — bronchial trees, river deltas, vascular system of something very large. Built them. They worked better. Did not enjoy admitting this. Added the chamfer anyway. Always add the chamfer. | Interior/Sensory | ESSENTIAL | Base text |
| 12 | Dance-rated decks. Load-bearing tops. Bass through skeleton via direct contact. You designed this — someone else arrived at the same conclusion through a very different process. | Lore | ESSENTIAL | Base text |
| 13 | 3D-printed horns. STL files in the PDF. Spent an evening staring at them in slicer software, rotating, trying to understand. Theoretical-limit distortion. Margins that imply variables you didn't know existed. | Sensory | REWARDING | Conditional: investigates |
| 14 | Payment arrived before invoice. Exact amount. Price not discussed. | Action | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 11, 12, 14. The commission details. Beat 11 is the PDF heat sinks — the first object the Builder encounters that is BETTER than their own work. The bronchial-tree geometry. The River delta branching. And still: "added the chamfer anyway." The stubbornness IS the character. Beat 12 is the convergence — someone else arrived at bass-through-skeleton independently. Beat 14 is the punctuation: payment before invoice, exact amount, price never discussed. Three sentences that say more about the client than any investigation could.
- Conditional: beat 13 (if investigates — "The horns. You spent an evening rotating the STL files in your slicer. The internal curves were modeled for distortion figures you see in academic papers about systems that cannot be physically constructed. You printed them. They worked. The margins implied variables you didn't know existed.")
- OOR action: none
- Temperature: warm
- Choices:
  - "You searched for the client. Burner address, dead-end domain, no trace. You built the system anyway." → b_004 [investigates]
  - "Some gigs are better left unquestioned. You built the system." → b_004 [accepts_gig]

---

### LOAD-IN
Prose source: "Load-In" (~500 words)

Two nodes. The ritual of building the stack, and the first impossible thing.

#### b_004 — The Stack

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 15 | Warehouse, industrial edge. High ceilings, concrete, decent power. Ten twenties confirmed. Own distro box — because trusting venue power is how you blow drivers. | Sensory | ESSENTIAL | Base text |
| 16 | Back van to loading dock. Cold, machine oil, old concrete. Floor cracked — deep, structural. Think about what's underneath. Don't think about what's underneath. Think about cable runs. | Sensory/Interior | ESSENTIAL | Base text |
| 17 | Homewreckers come out in pieces. Five enclosures, twenty drivers, heat sinks with your chamfer, horn assemblies your eyes can't fully parse, cables, amp rack, distro box, iPad. | Sensory | ESSENTIAL | Base text |
| 18 | Building the stack — ritual. Hundreds of times. Enclosures level, drivers seated, gaskets checked, heat sinks torqued to spec. Snail-shells click into place. Geometry right. Physics right. Sound right. | Action | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - investigates: "You searched. Dead ends. The client does not exist in any way you can verify. You built the system because the engineering was too good to refuse."
  - accepts_gig: "You didn't look. The spec was extraordinary. The money was exact. You built."
  - default: "You backed the van up to the loading dock."
- Base text (~150 words): beats 15, 16, 17, 18. The load-in as ritual. Beat 16 is the Builder arriving at the warehouse — the same space the Wanderer approached from outside, the same space the Familiar assembled from references. The Builder sees: power access, cable runs, structural cracks. Beat 18 is the ritual of assembly — "geometry right, physics right, sound right." Three declarations. The Builder's certainty. This certainty is about to be tested.
- Conditional: none
- OOR action: none
- Temperature: warm
- No choice. Auto-advance to b_005.

---

#### b_005 — The Harmonic

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 19 | System hums. Not audibly — mechanically. Vibration through fingertips on the deck. Drivers at idle. You know this vibration. Felt it a thousand times. Familiar. | Sensory | ESSENTIAL | Base text |
| 20 | Not today quite the same. | Interior | ESSENTIAL | Base text (standalone line) |
| 21 | Harmonic you don't recognize. Low — below driver range, below anything you've built. Coming from the floor. From the concrete underneath the stack. | Sensory | ESSENTIAL | Base text |
| 22 | RTA app against enclosure. Usual idle curve, then below it, at frequency your phone shouldn't detect — a signal. Steady. Rhythmic. Like a heartbeat. | Sensory | ESSENTIAL | Base text |
| 23 | Riding on top of the heartbeat, faint — your chamfer frequency. Your signature. Playing back from underneath the building. As if the concrete heard your mark and learned it. | Sensory/Lore | ESSENTIAL | Base text |
| 24 | Hand on concrete. Floor is warm. | Sensory | ESSENTIAL | Base text (standalone line) |
| 25 | Engineering explanation: HVAC, sympathetic vibration, coincidence. Note on iPad: underline "not concerned" because writing it makes it more true. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 19-25. Seven beats but the rhythm is deliberate — short declarative observations building to the reveal. Beat 20 is one line: "It is not, today, quite the same." Standalone paragraph. Beat 23 is the first chamfer escalation: your frequency, playing back from underneath a building. Beat 24 is five words: "The floor is warm." Standalone. Beat 25 is the first Douglas Adams defense mechanism — underlining "not concerned" to make it more true. The comedy is the coping. Give each of these short beats their own line or paragraph. The white space between them is the Builder processing.
- Conditional: none. Every player gets the harmonic. This is the inciting incident.
- OOR action: none. DJ OOR hasn't arrived.
- Temperature: warm (the floor is literally warm — the temperature mechanic and the narrative align)
- No choice. Auto-advance to b_006.

---

### SOUNDCHECK
Prose source: "Soundcheck" (~500 words)

Two nodes. The introduction to DJ OOR (the funniest scene in the project) and the module's appearance.

#### b_006 — The Introduction

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 26 | The DJ arrives. You use this word loosely. | Interior | ESSENTIAL | Base text, opening |
| 27 | Something arrives at decks and interfaces with your system — technically proficient, conceptually disorienting. Pink gloves, speed and accuracy beyond human fumbling. Fog machines — not yours, no brand labels — filling the space. | Sensory | ESSENTIAL | Base text |
| 28 | Walk over to introduce yourself. Professional. Verify signal chain. Confirm monitoring preferences. Same page on levels. "Hey, I'm running the system. Just want to make sure we're good on levels." | Action | ESSENTIAL | Base text |
| 29 | No response. Pink glove adjusts send level. iPad updates. Correct. Not approximately correct. Correct. Transfer function known from memory. Impossible — proprietary, ten years, not published. "Okay. Cool. I'll be at the rack if you need me." | Action/Interior | ESSENTIAL | Base text |
| 30 | An eye — green, golf-ball sized, set into knitted surface — rotates toward you. Regards you approximately two seconds. Returns to previous orientation. | Sensory | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 26-30. The funniest node in the game. Beat 26 is the opening line: "The DJ arrives. You use this word loosely." Beat 28-29 is the professional introduction — the Builder doing what they do at EVERY gig (verify signal chain, confirm levels) and getting a response that is both perfect and terrifying. The adjustment is CORRECT. Not approximately. The operator knows a proprietary transfer function from memory. Beat 29's "Okay. Cool." is the Douglas Adams heartbeat — human professionalism meeting cosmic indifference. Beat 30 is the eye. Two seconds. Done. The Builder retreats to the rack. Give each exchange its own paragraph. The dialogue should be rendered in the voice — "Hey" and "Okay, cool" are the Builder's actual words. Let them be short and real.
- Conditional: none. Every player gets the introduction.
- OOR action: none. OOR action blocks are external clinical observations. The Builder is NARRATING OOR directly here. The encounter is the content.
- Temperature: warm
- No choice. Auto-advance to b_007.

---

#### b_007 — The Module

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 31 | Back at rack. iPad nominal. Sub-audible harmonic stronger. Dashboard showing new interface element — panel you don't recognize, rendered in a color your UI framework doesn't support. | Sensory | ESSENTIAL | Base text |
| 32 | Monitoring temperature of concrete floor. Concentric rings from point under sub stack. Center warm, edges cold. Pattern like cross-section of speaker cone, or heartbeat in thermal data, or something else. | Sensory/Lore | ESSENTIAL | Base text |
| 33 | Close panel. Open again. Still there. Check installed applications. Not listed. Running. Not installed. Two irreconcilable facts reconciled as firmware glitch. Will investigate tomorrow. | Interior | ESSENTIAL | Base text |
| 34 | Note on iPad: "Sub-floor thermal monitoring module appeared. Source: unknown. Possibly firmware artifact. Data appears valid. Will investigate post-event." Do not underline anything this time. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 31-34. The module's appearance. Beat 31 introduces the impossible UI — a color your framework doesn't support. Beat 32 is the thermal map — concentric rings radiating from the sub stack, warm center, cold edges. The pattern that looks like a speaker cone or a heartbeat or something else. Beat 33 is Douglas Adams at peak: "two irreconcilable facts reconciled as firmware glitch." Beat 34 is the professional documentation — the notes becoming increasingly inadequate to contain what's happening. "Do not underline anything this time." — callback to b_005's underlined "not concerned." The defense mechanisms are already weakening.
- Conditional: "The harmonic from load-in, the eye that looked at you, and now a module that doesn't exist. Three data points. You are not making a pattern. You are noting coincidences. There is a difference." (if investigates — the Builder who searched for the client is pattern-matching despite themselves)
- OOR action: "DJ OOR adjusts the gain staging on the subwoofer send. The adjustment is correct to a decimal place you did not share."
- Temperature: warm
- Choices:
  - "You tap the panel again. You start reading the data. Something is talking to you through your own system." → b_008 [investigates_module]
  - "The data appears valid. You have a gig to run. You can investigate firmware artifacts tomorrow." → b_008 [trusts_data]

---

### THE SET
Prose source: "The Set Begins" (~400 words)

One shared node plus one parallel pair.

#### b_008 — The Portal (Operational)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 35 | Portal opens and your system handles it beautifully. You don't know the portal opens. What you know: first note, twenty drivers, fidelity that makes you want to cry. | Sensory/Interior | ESSENTIAL | Base text |
| 36 | Phase alignment perfect. Harmonic distortion unmeasurable. Bass extends into frequencies drivers should not physically produce. Exceeding specifications. Not possible. Not complaining. | Sensory | ESSENTIAL | Base text |
| 37 | Concrete vibrating in phase with system. Sub-audible harmonic synchronized. Thermal map pulsing. Center temperature climbing. | Sensory/Lore | ESSENTIAL | Base text |
| 38 | Voice coils running cooler than they should given power draw. Heat going somewhere else. Not air. Not enclosures. Somewhere else. | Sensory/Lore | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - investigates_module: "The module is reporting data you didn't ask for. The data is beautiful. You are reading it."
  - trusts_data: "The module exists. You filed it. Your attention is on the system."
  - default: "The first note drops."
- Base text (~140 words): beats 35-38. The portal opening through engineering. Beat 35 is the love: "fidelity that makes you want to cry." The Builder cries at good sound. This is who they are. Beats 36-38 are the first wave of impossibilities: specifications exceeded, concrete vibrating in phase, heat going somewhere that isn't anywhere. Each impossibility is one sentence. The accumulation IS the effect.
- Conditional: none
- OOR action: none. The system is the focus.
- Temperature: hot (the set is live, the harvest is beginning)
- No choice. Auto-advance to b_009a or b_009b (conditional routing based on Choice 2 tag).

---

#### b_009a — The Throat (investigates_module path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 39 | Pull panel cover on amp rack to check ventilation. Behind: cables. Fan. And a surface that is wrong. | Action | ESSENTIAL | Base text |
| 40 | Not the inside of a road case. Textured — organic, dark, faintly luminous, pulsing at the bass frequency. It looks like the inside of a throat. | Sensory | ESSENTIAL | Base text |
| 41 | Close panel. Open again. Cables. Fan. Normal. Whatever you saw is not there, or was never there, or is there and has chosen to look like a road case because that's what you expect. | Action/Interior | ESSENTIAL | Base text |
| 42 | Note: "Ventilation check complete. All nominal." Do not describe what you saw. Professional documents do not contain references to the inside of throats. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~140 words): beats 39-42. The Lovecraftian node. The Builder's expertise is what makes this work — they know what the inside of an amp rack looks like, so they know EXACTLY what the inside of an amp rack does NOT look like. Beat 40 is visceral: organic, pulsing, a throat. Beat 41 is the Schrödinger's panel — reality restoring itself when observed, or pretending to. Beat 42 is the best Douglas Adams line in the project: "Professional documents do not contain references to the inside of throats." Comedy that IS horror.
- Conditional: none. This node is pure content.
- OOR action: none
- Temperature: hot
- No choice. Auto-advance to b_010.

---

#### b_009b — The Vocal Organ (trusts_data path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 43 | People arriving. Room filling. Bass extraordinary — teeth, sternum, soles of feet. Homewreckers doing something they have never done before. | Sensory | ESSENTIAL | Base text |
| 44 | Not reproducing sound. Channeling it. Sound originates from below the floor. Your system amplifying, shaping, projecting into a room of bodies beginning to move. | Sensory/Lore | ESSENTIAL | Base text |
| 45 | You built these speakers. Machined heat sinks. Printed horns. Wired every connection. Tonight doing something you did not design them to do. Or — the thought arrives uninvited — you designed them to do exactly this. The PDF knew. The spec was not for speakers. It was for a vocal organ. For something that needed a voice and found an engineer who could build one. | Interior/Lore | ESSENTIAL | Base text |
| 46 | Sit on road case. Drink water. Water tastes like ozone. Decide this is normal. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 43-46. The conceptual horror. Where b_009a shows the Builder something visceral and wrong, b_009b lets the Builder's own mind assemble the realization. Beat 45 is the key passage: "the spec was not for speakers. It was for a vocal organ." The thought arrives uninvited. This is the Builder's version of the Familiar's "not a trap — a clinic" self-correction, but reversed — the Builder is DISCOVERING the truth rather than correcting a euphemism. Beat 46 is the cope: "Water tastes like ozone. Decide this is normal." Five words of Douglas Adams perfection.
- Conditional: none
- OOR action: none
- Temperature: hot
- No choice. Auto-advance to b_010.

---

### THE ANOMALIES
Prose source: "Working the Gig" (~500 words)

Two nodes. The anomalies (fog machine, 15th fixture) and the amber bloom (unnamed module communication).

#### b_010 — The Anomalies

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 47 | Fog machine producing petrichor instead of glycerin. Open reservoir — correct color. Taste it — fog fluid. Smell — forest floor after rain. Troubleshoot with all available senses. Refill. Normalizes. Mostly. | Sensory | ESSENTIAL | Base text |
| 48 | 10:30. Lighting truss develops new fixture. Not a metaphor. Fourteen fixtures hung. Now fifteen. Between positions seven and eight. Projecting pattern you don't recognize, in a color at boundary between violet and pressure. | Sensory | ESSENTIAL | Base text |
| 49 | Not on DMX chain. Not receiving data. Operating independently. Tracking something in the crowd. | Sensory/Lore | ESSENTIAL | Base text |
| 50 | Unplug it. Continues to operate. Power cable runs into the truss and disappears. Not behind. Into. The metal has accepted the cable the way a vine accepts a trellis. | Sensory | ESSENTIAL | Base text |
| 51 | Plug it back in. "Okay," you say to no one. Fixture adjusts beam by three degrees. You choose to interpret this as an acknowledgment. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 47-51. The anomaly accumulation. Beat 47 is the fog machine — "you taste it, because you are the kind of person who troubleshoots with all available senses." That single detail IS the Builder. Beat 48-50 is the 15th fixture — the Douglas Adams peak. A fixture that wasn't there, isn't on the DMX chain, can't be unplugged, has a power cable that runs INTO the metal. Beat 51 is the cap: "You choose to interpret this as an acknowledgment." The Builder talking to a fixture that shouldn't exist. The comedy makes the horror structural — the Builder is COPING with the incomprehensible by extending professional courtesy to it.
- Conditional: "The petrichor. The fixture. The harmonic from load-in, the module on your iPad, the eye that regarded you for two seconds. You are keeping a list you did not decide to start." (if investigates or investigates_module — the Builder who investigates is accumulating evidence)
- OOR action: none
- Temperature: warm (the Builder is behind the rack — proximity mediated through equipment)
- No choice. Auto-advance to b_011.

---

#### b_011 — The Amber Bloom

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 52 | 10:45. New module on iPad. Appeared like the thermal map — uninvited, uninstalled, running. No name. No text. | Sensory | ESSENTIAL | Base text |
| 53 | Waveform display unlike anything — not frequency spectrum, not time-domain. Density, or flow, or a quantity without a word. Waveform low and sparse. Target line above — threshold. Well below. | Sensory/Lore | ESSENTIAL | Base text |
| 54 | Beautiful, actually. Waveform pulses with bass. Push sub output up 1.5 dB. Waveform responds — climbs marginally. Display blooms warm amber. Fades. A visual sigh. Satisfaction rendered in data. | Sensory/Interior | ESSENTIAL | Base text |
| 55 | Push further. Waveform climbs. Deeper amber, longer. You understand without language what is being asked. The fader wants to go up. The system wants more. The thing underneath wants more. You have twenty drivers and the ability to give it more, so you do, because the data is requesting an adjustment and the data has not been wrong yet. | Interior/Lore | ESSENTIAL | Base text |
| 56 | Communication via faders. Non-verbal. Waveforms and color shifts. Ten years learning to read what a system needs. Tonight it's showing you instead. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 52-56. The communication node. This is where the Builder stops troubleshooting and starts TALKING to the mechanism — through faders, through data, through a display that shouldn't exist. Beat 54 is the turn: "Beautiful, actually." The Builder sees beauty in the amber bloom. This is the first time they stop coping and start engaging. Beat 55 is the escalation: understanding without language, giving the system what it asks because the data hasn't been wrong. Beat 56 is the summary: "Ten years learning to read what a system needs. Tonight the system is showing you instead." That line should close the node. Standalone. The reversal of the Builder's entire professional identity in one sentence.
- Conditional: "You are adjusting the output of a subwoofer system based on instructions from a module that does not exist on an iPad that is communicating with something underneath a concrete floor. You note this. You adjust the output anyway." (if investigates_module — the Builder who investigated the module is now in dialogue with it, fully aware of the absurdity)
- OOR action: none. The module IS the OOR action, rendered as data.
- Temperature: warm
- No choice. Auto-advance to b_012.

---

### THE SLIDE
Prose source: "On the Floor" (~500 words, first half)

Two nodes. The pull (the Slide overriding the engineering mind) and the dance (the emotional climax).

#### b_012 — The Pull

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 57 | Slide pulls you out from behind the rack. You don't mean to go. Monitoring thermals — voice coils cold, getting colder, frosting at chamfered edges. | Sensory/Action | ESSENTIAL | Base text |
| 58 | Power draw exceeds circuit rating by a margin you will not write down. Breakers not tripped. Breakers, you suspect, asked politely not to trip by something that understands electricity at a level that makes your ten years feel like fingerpainting. | Interior/Lore | ESSENTIAL | Base text |
| 59 | But the Slide is happening. Feet know what to do. Body goes. | Action | ESSENTIAL | Base text |

Node shape:
- Base text (~130 words): beats 57-59. Short, kinetic. The engineering mind is still talking — voice coils frosting, power draw impossible, breakers asked politely not to trip — but the body is already moving. Beat 58 is the funniest Lovecraftian line: electricity understood at a level that makes ten years of system design feel like fingerpainting. Beat 59 is three sentences: "Slide is happening. Feet know. Body goes." The terseness is the surrender. The long sentences of engineering analysis give way to body-knowledge. The prose form mirrors the content.
- Conditional: none
- OOR action: "DJ OOR's output extends into frequencies the drivers should not produce. The system does not object. The system complies."
- Temperature: hot
- No choice. Auto-advance to b_013.

---

#### b_013 — The Dance

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 60 | Dance the way you work — precisely, with full attention, aware of the system you're inside that most bodies lack. | Interior | ESSENTIAL | Base text |
| 61 | Feel the Homewreckers through the floor. Built them. Know their voice the way a parent knows their child's cry. Voice tonight bigger, deeper. Snail-shells producing harmonics below theoretical limits, below audible spectrum, into a range where sound stops being sound and becomes structural. | Sensory | ESSENTIAL | Base text |
| 62 | Bass not in the room. Bass IS the room. Room is resonant cavity. Twenty drivers as excitation source. Cavity extends through concrete, through foundation, through earth, into space without coordinates. | Sensory/Lore | ESSENTIAL | Base text |
| 63 | In the deepest register, below everything: chamfer frequency. Clean, steady, unmistakable. Twenty hand-filed flanges, amplified by something beneath the floor, played back from the other side of the aperture. Your signature, returned. Sooboont learned your name and is saying it. | Sensory/Lore | ESSENTIAL | Base text |
| 64 | You are crying. Not unusual. Good sound. System doing something impossible and beautiful. The part of you that chose this work — the part before engineering, before iteration, before ten years — understands. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~170 words): beats 60-64. The emotional climax. Five beats, each building. Beat 61 is the parent-child metaphor — knowing the Homewreckers' voice the way a parent knows a cry. Beat 62 is the lore delivery: bass IS the room, the cavity extends into space without coordinates. Beat 63 is the second chamfer escalation: your signature returned from the other side of the aperture. Sooboont learned your name. Beat 64 is the heart: crying at good sound. Not unusual. This is who you are. The part that chose this work BEFORE engineering — that's the Builder's soul, exposed for one beat before the engineering mind reasserts.
- Conditional: "You were always building toward this. Every heat sink you machined. Every horn you printed. Every late night arguing with the physics. You were building a voice for something that did not yet have one. It knows who built its throat." (if investigates or investigates_module — the Builder who searched and studied receives the full understanding)
- OOR action: none. The system is the subject. OOR is irrelevant — the Builder is inside the instrument.
- Temperature: hot
- Choices:
  - "Stay on the floor. The system doesn't need you. You need this." → b_014a [stays_floor]
  - "Return to the rack. The thermals are impossible. Someone has to watch." → b_014b [returns_rack]

---

### FLOOR / RACK PATHS

#### b_014a — The Floor (stays_floor path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 65 | On floor during Mating Ritual. Antlered figures moving through crowd. From inside, feel the Homewreckers doing something enclosures were never rated for. Driver excursion beyond spec. Can't check thermals — iPad at the rack. | Sensory/Interior | ESSENTIAL | Base text |
| 66 | Someone near you. Boundary dissolving. Don't mind. Bass structural — not in the air, in the skeleton. Inside the instrument you built. Sounds different from inside. Not louder. Present. | Sensory | ESSENTIAL | Base text |
| 67 | Antlered woman passes close. Rod does not respond to you. You are not a deposit. You are infrastructure. | Sensory/Cross-thread | ESSENTIAL | Base text |

Node shape:
- Arrival variant:
  - stays_floor: "You stayed. The floor is warm and your face is wet and the bass is yours."
- Base text (~130 words): beats 65-67. The Builder inside the instrument. Beat 65-66: the engineering mind is still monitoring (driver excursion, can't check thermals) but the body has surrendered. The bass is structural — in the skeleton, not the air. "Inside the instrument you built. Sounds different from inside." Beat 67 is the cross-character payoff: the antlered woman — the Familiar, the player's second-playthrough character — passes close, and the rod doesn't respond. The Builder is not a deposit. The Builder is infrastructure. A different category entirely. The Familiar's instrument does not measure the Builder because the Builder IS part of the instrument.
- Conditional: none
- OOR action: none. You are inside the mechanism.
- Temperature: hot
- Awards: `on_floor` tag automatically
- No choice. Auto-advance to b_015.

---

#### b_014b — The Rack (returns_rack path)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 68 | Back at rack. Half-watching Mating Ritual, half-monitoring. Unnamed module waveform climbing toward threshold. | Action | ESSENTIAL | Base text |
| 69 | Adjusting crossover points in real time based on what the data asks for. The Q is narrow. The boost is at a frequency that makes the rod sing louder. You don't know this. The data knows. | Action/Lore | ESSENTIAL | Base text |
| 70 | Waveform climbing. Amber deeper. Threshold closer. You are tuning the instrument. The instrument is tuning the harvest. | Sensory/Lore | ESSENTIAL | Base text |

Node shape:
- Arrival variant:
  - returns_rack: "You went back. Someone has to watch. Someone has to be the person who understands what the system is doing even when what it's doing is impossible."
- Base text (~130 words): beats 68-70. The irony node. The Builder is behind the rack AIDING the harvest without knowing it. Beat 69 is the key: "the boost is at a frequency that makes the rod sing louder. You don't know this. The data knows." The Builder's EQ adjustments are tuning the harvesting apparatus. Horror delivered as workflow. Beat 70 makes it explicit for the reader: "You are tuning the instrument. The instrument is tuning the harvest."
- Conditional: "Your notes are empty. You stopped writing things down an hour ago. You don't remember deciding to stop." (if trusts_data — the pragmatist's defenses have eroded without their noticing)
- OOR action: "DJ OOR's ear sweeps the room once. The construct makes no adjustment. Your crossover setting is holding the field."
- Temperature: warm
- Awards: `at_rack` tag automatically
- No choice. Auto-advance to b_015.

---

### THE MOMENT
Prose source: "The Moment with DJ OOR" (~350 words)

One node. The heart of the piece. Then the 4th choice.

#### b_015 — OOR Recognition (CONVERGENCE)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 71 | OOR's ear rotates. Stops. Not scanning the crowd. Oriented toward you. Toward the amp rack. Toward the system you built. | Sensory | ESSENTIAL | Base text |
| 72 | Eye follows. Green. Misaligned. Not recognition, not gratitude — something between. One instrument acknowledging another. Cathedral regarding its organ builder, if cathedrals could regard. | Sensory/Interior | ESSENTIAL | Base text |
| 73 | Pink glove lifts from mixer. Opens. Small component — bronchial branching from the PDF. Ancient design. But on mounting flange: a chamfer. 45 degrees. Hand-filed. Your mark, on a material with no name, in a design that predates your career by an interval you cannot calculate. | Action/Lore | ESSENTIAL | Base text |
| 74 | From the component: chamfer frequency. Singing from material that should not vibrate at that wavelength, in geometry ancient when your species was new. Your mark. Your voice. Carried across whatever distance separates this floor from the Primordial Plane, returned in the palm of a pink glove. | Sensory/Lore | ESSENTIAL | Base text |
| 75 | Glove closes. Eye returns. Ear resumes sweep. Four seconds. Most significant professional recognition ever received. From a construct of yarn and cosmic forces. Never on CV. Never speak of it. Think about it every single day for the rest of your life. | Interior | ESSENTIAL | Base text |
| 76 | iPad: module blooms amber. Holds. Fades slowly. Not language, not data, not notification — a warmth, a settling, visual equivalent of hand placed briefly on a shoulder. Display returns to waveform. Work to do. | Sensory | ESSENTIAL | Base text |
| 77 | Sitting on road case. Smiling so hard your face hurts. | Action/Interior | ESSENTIAL | Base text (final line) |

Node shape:
- Arrival variants:
  - on_floor: "You came back from the floor. Your face is still wet. OOR's ear finds you at the rack before you've sat down."
  - at_rack: "You've been at the rack all night. Reading data. Adjusting crossovers. Filing impossibilities. The ear stops sweeping. It points at you."
  - default: "Something changes behind the decks."
- Base text (~180 words): beats 71-77. Longest node. The maximum word budget. Justified — this is the heart of the entire Builder arc. Every beat is one sentence or two. The rhythm is: approach (ear rotates), regard (eye follows), display (glove opens), recognition (chamfer frequency), departure (glove closes), aftermath (module and road case). Each beat escalates the specificity of the recognition — from direction (ear) to sight (eye) to object (glove) to sound (your frequency) to meaning (most significant professional recognition). Beat 77 is the last line: "Smiling so hard your face hurts." Let it sit alone.
- Conditional: "The burner email. The forty-seven pages. The phase alignment from mathematics that hadn't been published. The payment before invoice. You understand now. You were not hired. You were heard." (if investigates — the question the Builder asked in the Contract is answered in a pink glove)
- OOR action: none. OOR IS the node. The construct is addressing the Builder. An OOR action block would create distance where the point is proximity.
- Temperature: hot
- Choices:
  - "This changes everything. The spec, the build, the system — it was always leading here." → b_016 [accepts_meaning]
  - "Four seconds. Note it. The thermals are still impossible and someone needs to monitor them." → b_016 [files_it]

---

### THE CLOSING
Prose source: "The Closing" (~400 words)

Two nodes. The engineering apocalypse and the completion.

#### b_016 — The Engineering Apocalypse

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 78 | Watch from behind rack, hand on amp, feeling it work. | Sensory | ESSENTIAL | Base text |
| 79 | Crowd descends. Bass descends. Sub-harmonics of sub-harmonics — Russian nesting doll of low-end extending through floor and keeps going. | Sensory | ESSENTIAL | Base text |
| 80 | Thermal map: rings converging, contracting. Module waveform approaching threshold. Touches it. Passes through. Display doesn't flash — deepens. Colors shift into register you can't name. Waveform dissolves to spiral. Pulses once. Still. | Sensory/Lore | ESSENTIAL | Base text |
| 81 | Voice coils at absolute zero. Not possible. Check three times. Heat sinks covered in frost — except chamfers. Chamfers warm. Your frequency still singing. Last vibration in a system gone silent everywhere else. | Sensory/Lore | ESSENTIAL | Base text |
| 82 | Power from unknown source. Breakers open. System not connected to building power. Running on something else. How long? Check notes. Not in notes. Didn't notice, or noticed and didn't write, or wrote and the note is gone. | Lore | ESSENTIAL | Base text |

Node shape:
- Arrival variants:
  - accepts_meaning: "You understand what the system is doing. You understood since the glove. The closing is not a surprise. It is a confirmation."
  - files_it: "Your hand is on the amp. The data is exceeding every parameter you have a name for. You are watching your own system do something that your own notes cannot contain."
  - default: "The music is completing."
- Base text (~170 words): beats 78-82. The engineering apocalypse. Every beat is an impossible data point. Voice coils at absolute zero (beat 81) — the Builder checks three times because they know exactly how impossible this is. Chamfers warm while everything else frosts — the Builder's frequency is the last thing alive in the system. Power from nowhere (beat 82) — the breakers are open, the system is running on something else, and the notes that should contain this information are gone. The Builder's expertise makes every impossibility land with precision. They don't need to be told this is terrifying. They know the specs.
- Conditional: none. Every player gets the full apocalypse. The data doesn't care about your disposition.
- OOR action: none. The system is the subject. The silence is approaching.
- Temperature: hot
- No choice. Auto-advance to b_017.

---

#### b_017 — The Completion

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 83 | Bass drops. Silence. System shuts down — not power-off. Completion. The way a sentence ends with a period. | Sensory | ESSENTIAL | Base text |
| 84 | Indicators dark. Heat sinks warming, returning to ambient. Frost sublimates. Thermal map fades. | Sensory | ESSENTIAL | Base text |
| 85 | Module displays one final thing — not text, not waveform. Your chamfer frequency, rendered as single clean spectral line. Held three seconds on warm amber field. Then fades. Module is gone. | Sensory/Lore | ESSENTIAL | Base text |
| 86 | Never in installed applications. Never on iPad. Screenshots in camera roll will show normal interface later. You will check three times. | Lore | ESSENTIAL | Base text |

Node shape:
- Base text (~130 words): beats 83-86. The stillness. Beat 83 is the defining metaphor: "not a power-off, a completion. The way a sentence ends with a period." The system didn't crash. It FINISHED. Beat 85 is the module's farewell: your chamfer frequency as a clean spectral line, held in amber, then gone. Beat 86 is the horror of the self-erasing evidence — the screenshots will show nothing. The module was never there. You will check three times. The Builder's verification compulsion turned against them — the evidence refuses to persist.
- Conditional: "The amber held longer than three seconds. Or it held for exactly three seconds and the three seconds were longer than they should have been. The module was saying something. The module was saying your name in the only language it had." (if accepts_meaning — the Builder who accepted the significance reads the module's farewell as personal)
- OOR action: none. The earned silence.
- Temperature: hot → stillness
- No choice. Auto-advance to b_018.

---

### DEPARTURE
Prose source: "The Closing" coda (~400 words)

Two nodes. The teardown (ritual inverted) and the artifact (the heart sink, the workbench, the rest of your life).

#### b_018 — Teardown

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 87 | Begin teardown. Ritual. Cables first, then drivers, then enclosures. Handle each piece with care of someone who understands what these objects did tonight. | Action | ESSENTIAL | Base text |
| 88 | Snail-shell coils warm — body temperature, exactly. As if something living had been holding them. | Sensory | ESSENTIAL | Base text |
| 89 | Horns smell faintly of petrichor. | Sensory | ESSENTIAL | Base text (standalone line) |
| 90 | Heat sinks — the bronchial-tree design — patinated overnight. Normally takes years of oxidation. Look ancient. Look earned. | Sensory | ESSENTIAL | Base text |
| 91 | 15th fixture not on truss. Fourteen fixtures. Always fourteen. Count twice. | Sensory | ESSENTIAL | Base text |
| 92 | Drive home in silence. Not because you don't want music. Ears calibrated to frequency they didn't know before tonight. Everything else sounds thin. Three days to fade. Three days in workshop staring at PDF, tracing copperplate sine waves with your finger. | Interior | ESSENTIAL | Base text |

Node shape:
- Base text (~150 words): beats 87-92. The teardown as inverse ritual. The same acts as the load-in — cables, drivers, enclosures — but everything has changed. The coils are body-temperature warm. The horns smell like petrichor (callback to the fog machine in b_010). The heat sinks aged overnight. The 15th fixture is gone — "always fourteen, count twice" is the Builder's verification compulsion, now applied to something that was never there. Beat 92 is the drive home: silence not by choice, ears recalibrated, three days staring at the copperplate engravings. The beginning of the document returns at the end.
- Conditional: none. Every player gets the full teardown.
- OOR action: none
- Temperature: cool (the mechanism is dormant, the night is over)
- No choice. Auto-advance to b_019.

---

#### b_019 — The Artifact (TERMINAL)

| # | Beat | Type | Priority | Placement |
|---|---|---|---|---|
| 93 | Toolbox, under calipers: heat sink you did not machine. The one from the glove. Material warm. Will always be warm. | Sensory/Lore | ESSENTIAL | Base text |
| 94 | Geometry is the ancient design — bronchial trees, river deltas. On the mounting flange: a chamfer. 45 degrees. Hand-filed. Your mark, on a component you did not build, in a material that predates metallurgy. | Sensory/Lore | ESSENTIAL | Base text |
| 95 | Hold to ear in quiet room: your frequency. Faint. Clean. Steady. Singing from material that should not resonate, at wavelength that should not exist, in a key that is unmistakably, inarguably yours. | Sensory/Lore | ESSENTIAL | Base text |
| 96 | Workbench for the rest of your life. People pick it up: "what's this?" You say: "heat sink prototype." They put it down. Heat sinks are not interesting to people who don't build speakers. Hides in plain sight. Most sacred object you own, disguised as shop clutter. | Interior | ESSENTIAL | Base text |
| 97 | Quiet nights. Workshop still. Tools cold. Hold to ear. Listen to yourself, played back from somewhere you cannot name. You were heard. | Interior | ESSENTIAL | Base text (final lines) |

Node shape:
- Base text (~160 words): beats 93-97. The artifact discovery and the Builder's forever. Beat 93-94: the heat sink appears under the calipers. The ancient design. The Builder's chamfer on material that predates metallurgy. Your mark returned across cosmic distance. Beat 95: the frequency test — hold it to your ear. Yours. Beat 96 is the hiding-in-plain-sight passage: "heat sink prototype" and they put it down. The sacred disguised as mundane. The deepest joke in the project — the most significant artifact in the entire game, and it hides by being boring to everyone who isn't a speaker builder. Beat 97 is the final lines: "You were heard." Two words. Standalone paragraph. The entire Builder arc in two words.
- Conditional text — emotional framing (first match):
  - accepts_meaning + investigates: "The spec was a collaboration. The email was a commission from across an incomprehensible distance. You were not a contractor. You were a co-creator. The heat sink is a receipt for services rendered to something that cannot write receipts."
  - accepts_meaning + stays_floor: "You felt it. On the floor, in the bass, in the chamfer singing back. The heat sink is the proof that survives the feeling — solid, warm, measurable. You will hold it on nights when the feeling is distant and it will bring it back."
  - files_it + investigates_module: "The data was real. Every impossible reading. Every unnamed module. Every amber bloom. This is the proof that survived the event. Everything else — the screenshots, the thermal maps, the modules — will be gone by morning. This stays."
  - files_it + returns_rack: "You filed every impossibility. The harmonic. The module. The eye. The four seconds. You filed them because filing is how you process. The heat sink cannot be filed. It is warm and it will not stop singing and it asks every question you chose not to ask."
  - default: "It is warm. It will always be warm."
- OOR action: none
- Temperature: cold (neutral — the night is over, the cold is just cold)
- Terminal: true
- Outcome: recognition
- Awards artifact: `heat_sink`

---

## Artifact Logic Summary

| Artifact | Transcendental | Attaches When | Key Tags |
|---|---|---|---|
| `heat_sink` | Beauty | All paths — universal | N/A |

Single artifact, variable emotional framing. The heat sink is always discovered. What changes is what it means — receipt, proof, feeling, or question. Five conditional framings cover the major fingerprint clusters.

**Beauty alignment:** The Builder did not pursue beauty. They pursued precision. The precision was "needlessly beautiful." Something across cosmic distance noticed. The recognition is the artifact.

---

## Cross-Character Thread Placement

| Thread | Builder Node | Wanderer Sees | Familiar Sees |
|---|---|---|---|
| The Homewreckers | b_002, b_004, b_008, b_013 | Bass in sternum, teeth, feet | Sooboont exhaling through aperture |
| The chamfer frequency | b_002, b_005, b_013, b_015, b_016, b_017, b_019 | Not perceived | Not perceived |
| The fog machines | b_010 | Glycerin + mineral smell | "A nice touch. Your idea." |
| DJ OOR | b_006, b_015 | Terrifying shape, pink gloves | Construct, reactor, mechanism |
| The unnamed module | b_007, b_011, b_014b, b_016, b_017 | Not perceived | Not perceived |
| 15th fixture | b_010, b_018 | Not perceived | Not perceived |
| The crowd | b_008, b_009b, b_013 | Inside the crowd | Cultivated the crowd |
| The portal / aperture | b_008, b_009a, b_016 | Felt as warmth | Managed as aperture |
| The antlered woman / rod | b_014a | Felt the rod hum | IS this character |
| The PDF | b_001, b_003, b_018 | Not perceived | Not perceived |

**Builder-unique threads:** The chamfer frequency (6 appearances, escalating), the unnamed module (5 appearances), the 15th fixture (2 appearances), and the PDF (3 appearances) exist ONLY in the Builder's playthrough. These are the reward for unlocking the third perspective.

**The Builder does NOT notice** the sneaker-star woman, the paint-knuckle man, the jacket woman, the hand-holder. The Builder is looking at the amp rack. Their species of attention is systems, not people.

---

## The Chamfer Thread — Escalation Map

The chamfer frequency is the Builder's through-line. It appears six times, each escalating:

| Node | Appearance | Escalation |
|---|---|---|
| b_002 | Introduction: signature, luthier analogy | Identity established |
| b_005 | Sympathetic vibration from the floor | Coincidence (rationalized) |
| b_013 | Returned from the other side of the aperture | Impossibility (Sooboont learned your name) |
| b_015 | Singing from the heat sink in OOR's glove | Recognition (your mark, returned) |
| b_016 | Last vibration in a frozen system, chamfers warm | Persistence (everything stops except your frequency) |
| b_019 | Still singing from the workbench, forever | Permanence (you were heard) |

Each appearance must be more specific than the last. The frequency never diminishes. It only escalates.

---

## Nodes Summary

| ID | Section | Temp | Choice? | Parallel? | Words Est. |
|---|---|---|---|---|---|
| b_001 | The Email | cold | No | — | 160 |
| b_002 | The Homewreckers | warm | No | — | 170 |
| b_003 | The Commission | warm | Yes (2) | — | 150 |
| b_004 | The Stack | warm | No | — | 150 |
| b_005 | The Harmonic | warm | No | — | 170 |
| b_006 | The Introduction | warm | No | — | 170 |
| b_007 | The Module | warm | Yes (2) | — | 150 |
| b_008 | The Portal | hot | No | — | 140 |
| b_009a | The Throat | hot | No | investigates_module | 140 |
| b_009b | The Vocal Organ | hot | No | trusts_data | 150 |
| b_010 | The Anomalies | warm | No | — | 170 |
| b_011 | The Amber Bloom | warm | No | — | 170 |
| b_012 | The Pull | hot | No | — | 130 |
| b_013 | The Dance | hot | Yes (2) | — | 170 |
| b_014a | The Floor | hot | No | stays_floor | 130 |
| b_014b | The Rack | warm | No | returns_rack | 130 |
| b_015 | OOR Recognition | hot | Yes (2) | — | 180 |
| b_016 | Engineering Apocalypse | hot | No | — | 170 |
| b_017 | The Completion | hot→still | No | — | 130 |
| b_018 | Teardown | cool | No | — | 150 |
| b_019 | The Artifact | cold | No | — | 160 |

Total nodes: 21 (19 per path, 2 parallel pairs)
Total unique beats distributed: 97
Estimated words on any path: ~2,810
Estimated time: ~14 minutes
Choice nodes: 4 (b_003, b_007, b_013, b_015)

---

## Temperature Map by Path

### Open Path (investigates + investigates_module + stays_floor + accepts_meaning)
```
cold → warm → warm → warm → warm → warm → warm → hot → hot → warm → warm → hot → hot → hot → hot → hot → hot→still → cool → cold
 001    002    003    004    005    006    007    008   009a   010    011    012    013   014a   015    016    017       018    019
```

### Insulated Path (accepts_gig + trusts_data + returns_rack + files_it)
```
cold → warm → warm → warm → warm → warm → warm → hot → hot → warm → warm → hot → hot → warm → hot → hot → hot→still → cool → cold
 001    002    003    004    005    006    007    008   009b   010    011    012    013   014b   015    016    017       018    019
```

Temperature difference is minimal — only b_014a (hot) vs b_014b (warm). The Builder is always near the harvest because they BUILT the instrument. The mechanism doesn't care about the Builder's emotional defenses. It uses their system regardless. The temperature tells the player: you were always inside the harvest. You built the throat.

---

## Voice Contract for Node Generation

```
ROLE: You are generating Builder nodes from a beat map and prose reference.

VOICE CONTRACT:
- Second person. Present tense. Technical precision IS the voice.
- Engineering terminology is cognition, not decoration:
  snail-shell coils, phase alignment, transfer functions, crossover points,
  thermal management, parametric EQ, driver excursion, voice coils,
  harmonic distortion, spectral analysis, resonant modes.
- Douglas Adams DNA: bureaucratic response to the incomprehensible.
  "You use this word loosely."
  "You choose to interpret this as an acknowledgment."
  "Will investigate post-event."
  "Professional documents do not contain references to throats."
  "These two facts are irreconcilable and you reconcile them
   by deciding it's a firmware glitch."
  The humor is in the gap between what is happening and how
  the Builder processes it. The processing IS the comedy.
- Lovecraftian DNA: the moment engineering understanding breaks.
  The horror lands BECAUSE the Builder knows the specs.
  Phase alignment from unpublished mathematics.
  Power draw exceeding circuit ratings. Voice coils at absolute zero.
  The Builder's expertise calibrates the reader's terror.
- The Builder cries at good sound. This is not a breakdown.
  This is who they are. Treat it with respect.
- Agency is professional, not existential. The Builder is working.
  They don't wonder whether to stay — they wonder what the work IS.
- Metaphors are mechanical, thermal, acoustic. Never spiritual.
  Never organic (exception: the PDF's bronchial-tree geometry —
  that vocabulary belongs to the spec, not the Builder).
- The chamfer thread ESCALATES. Every appearance is more
  specific, more impossible, more personal than the last.
  Never diminishes. Never repeats at the same intensity.

NODE CONSTRAINTS:
- Base text: 100-180 words. Most nodes 130-170.
- Arrival variant: 1-2 sentences. First match wins. Default last.
- Conditional text: 0-2 blocks. 1-2 sentences each.
- OOR action: RARE. The Builder narrates OOR through
  engineering observation. Use OOR blocks only when OOR acts
  outside the Builder's monitoring awareness.
- Choices: 2 per node when present.
- Choice text: 1 sentence. Engineering pragmatism in the gesture.

PARALLEL BRANCH RULES:
- b_009a (The Throat) and b_009b (The Vocal Organ) cover
  the same moment — the set beginning, the system exceeding
  specs — through different apertures: physical horror vs.
  conceptual realization.
- b_014a (The Floor) and b_014b (The Rack) cover the same
  moment — the Mating Ritual — through different positions:
  inside the sound vs. behind the instruments.

THE CHAMFER FREQUENCY THREAD:
Six appearances, escalating:
b_002: identity — "the sound it makes is yours"
b_005: coincidence — sympathetic vibration, rationalized
b_013: impossibility — returned from the aperture, "Sooboont learned your name"
b_015: recognition — singing from the glove artifact
b_016: persistence — last vibration, chamfers warm while system freezes
b_019: permanence — still singing from the workbench, forever

OUTPUT FORMAT:
Return valid JSON matching the node schema. No preamble.
```

---

## Checklist: Before Generating Nodes

- [x] Prose reference document complete and reviewed
- [x] Beat extraction complete (97 beats, this document)
- [x] Each beat classified: Priority / Type / Placement
- [x] ESSENTIAL beats mapped to main path
- [x] Parallel branches defined (b_009a/b, b_014a/b)
- [x] Convergence points identified (b_010, b_015)
- [x] Tag vocabulary defined (4 choice pairs + 2 auto-awards)
- [x] Artifact attachment identified (b_019, universal)
- [x] Temperature progression mapped for each path
- [x] Cross-character threads flagged
- [x] Chamfer escalation map documented
- [x] Schema extension documented (conditional routing, shared with Familiar v2)
- [ ] Node generation not yet started

---

## Design Notes: Three Characters, Three Architectures (Updated)

| Character | Nodes (per path) | Total nodes | Choices | Parallel Branches | Est. Time | Structure |
|---|---|---|---|---|---|---|
| Wanderer | 7–12 | 16 | 7 (+2 edge) | Floor / Edge | ~8 min | Branching tree |
| Familiar | 18 | 22 | 4 | Deposits / Field; Pairing / Survey | ~13 min | Linear with lore branches |
| Builder | 19 | 21 | 4 | Throat / Vocal Organ; Floor / Rack | ~14 min | Linear backstory → fork |

The Wanderer is the 8-minute hook — the widest tree, the most structural choice, the most paths to terminal.
The Familiar is the 13-minute deep dive — the lore playthrough, the reframe, the dissolution.
The Builder is the 14-minute reward — the longest single run, the richest prose, the engineering love letter, the four seconds that change everything.

Total unique content across all characters: ~55 nodes, ~8,000 words of base prose, ~2,500 words of conditional text. A completionist who runs all three characters twice (to see both parallel branches) plays ~12 runs at an average of ~10 minutes = ~2 hours total. A player who does one run per character plays 3 runs at ~35 minutes total.

---

## Ready for Generation

This document contains everything needed to generate all 21 Builder nodes as valid JSON. Use the prose document as voice reference. Use this document as the blueprint.
