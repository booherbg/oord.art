# Builder Content Assessment
**Files reviewed: BUILDER_PROSE.md, BUILDER_BEAT_MAP.md, builder_nodes.json, CHARACTER_PROSE_GUIDE.md**

---

## What Exists

The Builder is the most fully developed character in the project. Three complete documents:

1. **BUILDER_PROSE.md** (~4,700 words) — Full continuous prose, six sections (The Contract, Load-In, Soundcheck, The Set Begins, Working the Gig, On the Floor, The Moment with DJ OOR, The Closing). Voice reference document with detailed notes section.

2. **BUILDER_BEAT_MAP.md** (~5,500 words) — Complete beat extraction with 97 beats across 21 nodes. Every beat classified by type, priority, and placement. Full node shape specifications including arrival variants, conditional text, OOR actions, temperatures, and choices. Tree diagram, tag vocabulary, temperature maps, voice contract, cross-character thread placement table, chamfer escalation map. Ready for node generation.

3. **builder_nodes.json** — All 21 nodes generated and implemented. Full JSON with choices, conditional text, arrival variants, parallel branches (b_009a/b_009b, b_014a/b_014b), tags, and artifacts. The `heat_sink` artifact is awarded at terminal node b_019.

**Status: Fully built.** Prose → beat map → nodes. The pipeline is complete.

---

## Voice Consistency

The Builder voice is remarkably consistent across all three documents. Key markers that hold:

**Working well:**
- Engineering terminology as cognition: snail-shell coils, phase alignment, transfer functions, crossover points, thermal management, driver excursion, voice coils, harmonic distortion. Never decorative. Always how the Builder actually thinks.
- Douglas Adams DNA: "You use this word loosely." "Professional documents do not contain references to the inside of throats." "These two facts are irreconcilable and you reconcile them by deciding it's a firmware glitch." The gap between what is happening (cosmic horror) and how it's processed (professional troubleshooting) is sustained across all 21 nodes.
- The chamfer thread escalates cleanly: identity (b_002) → coincidence (b_005) → impossibility (b_013) → recognition (b_015) → persistence (b_016) → permanence (b_019). Six appearances, never at the same intensity, never diminishing.
- Emotional core: "you cry at good sound" is established once and trusted thereafter. Never over-explained. The tears at b_013 and the smile at b_015 are the two emotional peaks, properly spaced.

**Minor voice issues:**

**1. The vocal organ realization is slightly overwritten (b_009b):**
> "It was a set of instructions for building an organ. A vocal organ. For something that needed a voice in this realm and found an engineer who could build one."

Three sentences to land one insight. The Builder's voice is terse under stress — "not possible, not complaining" in b_008. The vocal organ realization should hit harder with fewer words. **Fix:** "The spec was not for speakers. It was for a vocal organ. You sit down. The water tastes like ozone."

**2. The closing section (b_016) accumulates impossibilities but doesn't vary the rhythm:**
Voice coils at absolute zero — impossibility. Power from unknown source — impossibility. Notes missing — impossibility. Three in sequence. The Builder's processing voice should differentiate them — one gets checked three times (already does), one gets a note (already does), but the third (the missing notes) should have a different texture. The Builder who has been writing notes ALL NIGHT discovering the notes are gone is the most psychologically devastating data point. Give it more space.

**3. The farm anecdote in b_002 is the warmest moment in the Builder's backstory:**
> "the farmer drove over the next morning to ask what you'd been celebrating"

This is great — lived-in, funny, real. But it's the ONLY moment of human warmth in the pre-evening sections. The Builder's world before OOR is presented as entirely solitary: workshop, iPad, modeling software, emails. One more small human detail (a collaborator, a customer interaction, a moment at a gig) would prevent the pre-evening Builder from feeling like a hermit archetype.

---

## What's Needed to Build Out the Builder Path

The Builder path is already built. What's needed is **integration**, not content:

1. **Gate implementation:** The Builder path is gated by `has_artifact: "pale_antler"` (the Familiar's antler artifact). This means the player must complete both Wanderer (any branch) AND Familiar before accessing the Builder. The `pale_antler` artifact is referenced in builder_nodes.json but doesn't appear to be awarded anywhere in the current Familiar nodes — **this needs to be created in the Familiar node generation.** The Familiar prose describes antlers folding down, dissolution, the antler potentially remaining after the body becomes optional. The `pale_antler` artifact should be awarded at the Familiar's terminal node.

2. **Run 4 (Beauty) gate from Wanderer side:** The Wanderer's Run 4 (drafted in WANDERER_RUN4_BEAUTY_DRAFT.md) gates at w_004b with truth_shard. This is a DIFFERENT path to the Builder — the Wanderer observes the Builder from outside, while the Builder path IS the Builder. These are complementary, not redundant. The Wanderer's Run 4 awards `beauty` transcendental and a `chamfer_token` artifact. The Builder path awards `beauty` transcendental and a `heat_sink` artifact. Need to decide: are these the same beauty, or two aspects? Recommendation: same transcendental, different artifacts. The Wanderer's chamfer_token is a piece of the Builder's world experienced as pure texture. The Builder's heat_sink is the same world experienced as engineering. Same beauty, different literacy.

3. **fabric_strip artifact:** Referenced in w_002's conditional text and arrival variants but never defined or awarded anywhere visible. The memory file notes "fabric_strip artifact reference needs reassignment or removal." This is a loose end — either assign it to an early Wanderer path or remove the references.

---

## How the Builder Path Works as a Lore Unlock

The progression chain works:

**Wanderer** → sees the evening from inside the crowd. Feels the bass, sees OOR, dances, yields. Gets an artifact (yarn_knot, matchbook, or truth_shard depending on branch). Player knows: something happened, it was intense, they were processed.

**Familiar** → sees the same evening as the operator. Reads frequencies, pairs deposits, manages the aperture, dissolves. Gets the pale_antler. Player knows: the party was a harvesting apparatus, the bartender and bouncer were ancient beings, the crowd was raw material, the transcendentals were extracted and sent to Sooboont.

**Builder** → sees the same evening from behind the equipment. Built the speakers. Gets the PDF, the Homewreckers, the chamfer. Player knows: someone MADE the instrument. The spec came from across an incomprehensible distance. The Builder's craft was recruited by the mechanism. The horror and the beauty are the same object.

Each playthrough answers the previous one's question:
- After Wanderer: "What was that?" → Familiar answers: "A harvest."
- After Familiar: "Who built the machine?" → Builder answers: "A person. With hands. Who cries at good sound."
- After Builder: "Was it worth it?" → The heat sink answers: "You were heard."

The unlock chain is emotionally correct. The Builder path is the reward — the most detailed, the longest, the funniest, and the most emotionally devastating. It should come last.

---

## Suggested Beat Structure: The Builder's Evening

Already complete in BUILDER_BEAT_MAP.md. Summary:

| Phase | Nodes | Beat |
|---|---|---|
| Before the Evening | b_001 → b_002 → b_003 | The email, the Homewreckers, the commission. Six weeks of backstory. |
| Load-In | b_004 → b_005 | Stack assembly, the harmonic. First impossible thing. |
| Soundcheck | b_006 → b_007 | Introduction to OOR ("you use this word loosely"), the module appears. |
| The Set | b_008 → b_009a/b | Portal opens through engineering. Throat (visceral) or Vocal Organ (conceptual). |
| Anomalies | b_010 → b_011 | Fog machine, 15th fixture, amber bloom communication. |
| The Slide | b_012 → b_013 | Pulled to the floor, dancing inside the instrument, Sooboont says the Builder's name. |
| Floor/Rack | b_014a or b_014b | Inside the sound or behind the instruments during the Mating Ritual. |
| The Moment | b_015 | OOR recognition. The glove. The chamfer. Four seconds. Heart of the piece. |
| The Closing | b_016 → b_017 | Engineering apocalypse, system completion. |
| Departure | b_018 → b_019 | Teardown, artifact (heat sink on the workbench forever). |

19 nodes per path, 21 total, 4 choice points, ~14 minutes. This is already well-designed.

---

## Cross-Character Threading: What the Builder Should See Differently

**Current threading (from BUILDER_BEAT_MAP.md):**

| Thread | Builder sees | Wanderer sees | Familiar sees |
|---|---|---|---|
| The Homewreckers | Specs, coils, their own creation | Bass in sternum and jaw | Sooboont exhaling through aperture |
| DJ OOR | Operator who knows their transfer function | Terrifying shape with pink gloves | Construct, reactor to be monitored |
| The fog | Petrichor anomaly, troubleshooting target | Thick, warm, obscuring | "A nice touch. My idea." |
| The crowd | Bodies on their dance-rated decks | Fellow humans, community | Deposits, resonance field |

**Correctly absent from Builder's awareness:**
The Builder does NOT notice the sneaker-star woman, paint-knuckle man, jacket woman, or hand-holder. The Builder looks at the amp rack. Their species of attention is systems, not people. This is the right call — it makes the Builder's perspective genuinely alien in a different way from the Familiar's. The Familiar sees people as deposits (still sees people). The Builder doesn't see people at all.

**Potential thread to add:**
The bartender. The Builder is behind the bar area during load-in (b_004) and the bartender is already present (the Familiar's "Before" section confirms the familiars are in position before the crowd arrives). The Builder could notice the bartender in passing — not as a familiar, not as a frequency reader, but as someone who handles bottles with an unusual precision that the Builder recognizes from their own work. A craftsperson recognizing another craftsperson. One sentence in b_004: "A woman behind the bar is arranging bottles with a focus that reminds you of yourself during setup — not performing, calibrating." This threads to both the Wanderer's bartender experience and the Familiar's self-description without requiring the Builder to understand what the bartender IS.

---

## Final Assessment

The Builder path is the most complete character arc in the project. Prose, beat map, and nodes are all done and consistent. Voice is strong. Chamfer thread escalation is elegant. Douglas Adams / Lovecraft blend works.

**Priority items:**
1. Create pale_antler artifact in Familiar terminal node (gate for Builder path)
2. Resolve fabric_strip references in wanderer_nodes.json
3. Consider adding bartender cross-thread in b_004
4. Decide on chamfer_token vs heat_sink artifact relationship for Wanderer Run 4

**No rewrites needed.** The Builder is ready for playtesting. Ship it.
