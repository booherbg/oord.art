# Lore Branches + Completionist Easter Egg
**Two sections. Read together or separately.**

---

# Part 1: Lore Branch Opportunities

The A→B→C pattern (or A→B1→B2→C) works when:
- The main spine is carrying exposition that slows the pace
- A detail deserves more space than a sentence or two of conditional text
- Curious players should be rewarded for poking at the world
- The detail is NOT load-bearing (skipping it doesn't break the story)

Assessed every node across Wanderer (all runs), Builder, and Familiar prose. Three strong candidates, one "maybe," and several I considered and rejected.

---

## RECOMMENDED: w_003 — The Floor Rings (A→B→C)

**Current problem:** w_003 (NON-EUCLIDEAN BEATS) is the longest Run 1 node. It carries room description, crowd observation, the sync-emergence detail, AND the fractal ring detail. The rings are lore-significant — they're the aperture visualization — but they're embedded in a dense paragraph the player might skim through.

**Proposed structure:**
```
w_003 (room + crowd, tightened) 
  → "Move into the dance floor" → w_004 [main path]
  → "Look at the rings on the floor" → w_003_rings [lore] → w_004
```

**Proposed lore node — w_003_rings (THE RINGS):**

```json
{
  "id": "w_003_rings",
  "subtitle": "THE RINGS",
  "text": "You kneel down. The concrete is warm. Warmer than it should be — warmer than the air, warmer than the bodies around you.\n\nThe rings are projected. You know this because projection is the simplest explanation. But when you put your hand flat on the floor, inside the innermost ring, the light does not fall on your skin. It falls under it. The rings are not on the concrete. They are in it. Or beneath it. The fractal layers you glimpsed from the edge are dense here — geometric, recursive, descending into the floor like looking down a stairwell that goes further than a building should go.\n\nYou pull your hand back. The warmth stays in your palm for a few seconds after.",
  "arrival_variants": [],
  "conditional_text": [],
  "oor_action": "The aperture notes the proximity. The membrane thins by a fraction. It is not enough.",
  "temperature": "warm",
  "awards_transcendental": null,
  "awards_artifact": null,
  "awards_tags": ["examined_rings"],
  "choices": [
    {
      "text": "Stand up. Move toward the speaker stack.",
      "next": "w_004"
    }
  ],
  "next": null,
  "terminal": false,
  "outcome": null
}
```

**Changes to w_003:** Remove the sentences about fractal layers from the base text ("When you look at them directly they seem flat, projected, normal. When you catch them in your peripheral vision the rings have structure — fractal layers descending into the floor..."). Replace with something shorter: "When you look at the rings directly they seem flat. Projected. Normal. When you catch them in your peripheral vision they aren't." The detail moves to the lore node.

**Impact:** w_003 loses ~50 words and gains a choice. Curious players get a standalone beat about the rings (and the `examined_rings` tag, which could trigger conditional text later — "the warmth you felt in the rings is the same warmth" etc.). Main-path players skip it and the story flows.

**Verdict: Do this.** Clean win. Low risk.

---

## RECOMMENDED: w_loading_dock — Instagram Detail (A→B→C)

**Current problem:** The Instagram detail ("I follow OOR on instagram. Three followers...") is a buried in dialogue in w_loading_dock. It's one of the best Easter eggs in the game and it deserves to breathe. The loading dock node also carries the matchbook exchange, the Fargo reference, and the flash drive mention — a lot of lore crammed into one conversation.

**Proposed structure:**
```
w_loading_dock (matchbook exchange + entry)
  → "Go in through the side door." → w_bartender_run3 [main path, current]
  → "Ask about the instagram." → w_loading_dock_insta [lore] → w_bartender_run3
```

**Proposed lore node — w_loading_dock_insta (THE ACCOUNT):**

```json
{
  "id": "w_loading_dock_insta",
  "subtitle": "THREE FOLLOWERS",
  "text": "\"Show me,\" you say.\n\nThe denim jacket guy pulls out his phone. The account is @dj_oor. One post. A photo of a concrete floor — cracked, lit from underneath in a way that could be a projection or could be something else. No caption. No tags. Posted eleven months ago.\n\nThree followers. Him. @ashleyt — no posts, no profile picture, bio reads \"antler enthusiast.\" And @left_pocket_empty — no posts, no profile picture, no bio, following zero accounts.\n\n\"Left pocket empty never posted,\" he says. \"Never liked anything. Never commented. Account was made the same day as OOR's. I think it's the bouncer.\"\n\n\"You think the bouncer has an instagram,\" the beanie girl says.\n\n\"I think the bouncer IS an instagram.\"\n\nThey look at each other. Nobody laughs. The loading dock is cold and the bass is leaking through the gap in the door and you are standing with two strangers and a conspiracy theory about a nightclub DJ with three followers, one of whom might be the door security, and none of this is normal, and you are going inside anyway.",
  "arrival_variants": [],
  "conditional_text": [],
  "oor_action": null,
  "temperature": "cool",
  "awards_transcendental": null,
  "awards_artifact": null,
  "awards_tags": ["saw_instagram"],
  "choices": [
    {
      "text": "Go in through the side door.",
      "next": "w_bartender_run3"
    }
  ],
  "next": null,
  "terminal": false,
  "outcome": null
}
```

**Changes to w_loading_dock:** Trim the Instagram dialogue from the base text. Keep the Fargo reference and flash drive mention in the loading dock (they're quick). Remove the denim jacket guy's Instagram speech. Add the new choice.

The Instagram detail currently in w_loading_dock (lines: "I follow OOR on instagram. Three followers. Me, some girl named Ashley, and an account called left pocket empty that's never posted.") gets moved and EXPANDED in the lore node — the player actually sees the account, the one post, the three followers, and the loading dock crew's theory about the bouncer.

**Impact:** The loading dock node gets tighter. The Instagram detail gets room to be funny and creepy. The `saw_instagram` tag could trigger callbacks — e.g., when the Wanderer sees the bouncer's SECURITY jacket folded on the chair in w_011/w_012, conditional text: "Left pocket empty. You think about the bouncer's instagram account. You wonder if the account is still active. You wonder if the bouncer is."

**Verdict: Do this.** The Instagram detail is one of the best pieces of worldbuilding in the game and it's currently a throwaway line. It deserves a scene.

---

## MAYBE: w_007e — Rod Encounter Separation

**Current state:** w_007e (AT THE BAR) carries: the drink, the sneaker-star woman, the antler woman, the rod measurement, the existential cold pull. It's the densest Run 1 node.

**Considered structure:**
```
w_007e (drink + observation, tightened)
  → "Follow the antlered woman." → w_008e [current]
  → "Stay at the bar. Watch her from here." → w_007e_rod [rod encounter lore] → w_008e
```

**Why I'm hesitant:** The rod encounter is the Familiar crossover moment. It's the hum the Wanderer feels that the Familiar confirms from the other side. Making it optional means some players miss the cross-character payoff — the Wanderer being measured without their consent. That moment is too good to be skippable.

**Alternative approach:** Instead of making the rod encounter a lore branch, make the sneaker-star woman observation a lore branch. She's currently one sentence in w_003 (conditional text) and one sentence in w_007e. She's a cross-character thread but not load-bearing. A lore node where you watch her dance — really watch, the way the silence-Wanderer watches — could work as optional depth.

But honestly, w_007e's density is part of its character. You're at the bar. Things are happening around you. You're absorbing a lot. The overwhelm is the point. Splitting it might make the bar feel less like a bar.

**Verdict: Skip this.** The node is dense but the density is earned. Leave it.

---

## CONSIDERED AND REJECTED:

**Run 4 nodes (w_behind_the_rack → w_the_craft → w_beauty_yielded):** These are already a lore branch off the main spine — Run 4 IS the optional depth. Branching inside the branch is over-engineering.

**Builder b_010 (fog machine + 15th fixture):** Could split the anomalies into two nodes. But the comedy of the Builder's escalating professional responses ("okay," you say to no one) depends on the anomalies accumulating in a single beat. Splitting them breaks the rhythm.

**Familiar prose — pairing sequence:** The Mating Ritual section could have a lore branch where you watch the Familiar pair additional couples. But the Familiar prose is a reference document, not nodes yet. Lore branches should be planned when the Familiar beat map is extracted.

**w_silence_run3:** This is the climax of Run 3. No branches. The player is in it.

---

## Lore Branch Summary

| Branch | Pattern | Location | Verdict |
|---|---|---|---|
| Floor rings | A→B→C | w_003 → w_003_rings → w_004 | **Do this** |
| Instagram | A→B→C | w_loading_dock → w_loading_dock_insta → w_bartender_run3 | **Do this** |
| Rod encounter | A→B→C | w_007e → w_007e_rod → w_008e | Skip — too important to be optional |
| Run 4 internals | A→B1→B2→C | w_behind_the_rack sub-branch | Skip — already a branch |
| Builder anomalies | A→B→C | b_010 split | Skip — comedy depends on accumulation |
| Familiar pairing | A→B→C | Future, during beat extraction | Note for later |

---

---

# Part 2: The Completionist Easter Egg

## Trigger Condition

The player reaches **w_beauty_yielded** (Wanderer Run 4, the Builder encounter) while holding **heat_sink** (the Builder's artifact).

This means they have completed:
1. Wanderer Run 1 (yarn_knot)
2. Wanderer Run 2 (matchbook, via goodness)
3. Wanderer Run 3 (truth_shard, via truth)
4. Familiar full path (pale_antler)
5. Builder full path (heat_sink)
6. Wanderer Run 4 (requires truth_shard, arrives at w_beauty_yielded)

**Six runs minimum.** This is the deepest possible state. The player has seen every perspective, every character, every side of the evening. They know about the harvest, the aperture, the familiars, the Homewreckers, the chamfer, and the Builder's tears. They are watching the Builder from the Wanderer's eyes while carrying the Builder's artifact in the Wanderer's pocket.

They have earned something extraordinary.

---

## THE EASTER EGG: "SOUNDCHECK"

### What happens:

At w_beauty_yielded, when the Wanderer nods and the Builder asks "Sound good out there?" — instead of the normal text continuing, the screen clears. No prose. No choices. Just:

**The chamfer frequency plays.**

A real audio tone. A single, clean, sustained note — the Builder's signature frequency, rendered as actual audio through the player's speakers or headphones. It holds for three seconds on a warm amber screen. No text. Just the note.

Then: silence. Two seconds.

Then: **the Cupid Shuffle kicks in — backwards.**

Not a recording of the Cupid Shuffle. A vocoded, pitch-shifted, sub-bass-heavy deconstruction of it. The call-and-response structure reversed: "right the to, right the to" — the same reversal from w_slide_run2b but as actual audio. It plays for exactly four bars. The bass is absurd. The bass is the kind of bass that vibrates your desk. It is the Homewreckers, finally audible.

During the four bars, text appears on screen — not prose. Stage directions. In monospace. Like a technical document:

```
SYSTEM STATUS:
  Subwoofer array: 20 drivers, 5 enclosures, snail-shell configuration
  Power draw: [EXCEEDS PARAMETERS]
  Thermal status: [IMPOSSIBLE]
  Chamfer frequency: DETECTED
  Operator: ACKNOWLEDGED
  
  You were heard.
```

The text fades. The reversed Cupid Shuffle fades. One more beat of silence.

Then: **a vocoded voice says "Sound good out there?"**

The Builder's line. Rendered as audio. Low, warm, processed through something that makes it sound like it's coming from underneath the floor. The player hears their own game speaking to them in the Builder's voice, played through the vocal apparatus the Builder constructed.

Then the screen transitions — not to the next node. To a new terminal node:

---

### Node: w_soundcheck (THE SOUNDCHECK)

```json
{
  "id": "w_soundcheck",
  "subtitle": "THE SOUNDCHECK",
  "text": "The Builder looks at you. You look at the Builder. The heat sink in your pocket is warm.\n\nThe bass drops to nothing. The crowd keeps dancing. The fog keeps rolling. But the sound is gone — all of it, the music, the crowd noise, the shuffling feet, the glasses at the bar. Total silence. Like someone pressed mute on the building.\n\nThen you hear it. Coming from everywhere and nowhere. From the speakers and the floor and the walls and the heat sink in your pocket, all at once:\n\nA soundcheck.\n\nThe system the Builder built, the system that Sooboont specified, the system that DJ OOR has been operating all night — it runs a soundcheck. For you. A sine sweep that starts below hearing and climbs through your skeleton and up through your chest and into your ears and past your ears into a register that isn't sound anymore. The Homewreckers cycle through their range — all twenty drivers, all five enclosures — and you can feel each one individually, like fingers on a piano, and then together, like a choir, and the sound they make together is not a frequency. It is a name.\n\nYour name. Not the one on your ID. The one that lives in the gap between what you notice and what you are. The one the rod measured at the bar. The one the silence revealed. The one the Builder chamfered into every flange.\n\nThe soundcheck ends. The music comes back. The Builder is looking at their iPad. The crowd is dancing. Nothing has changed. Everything has changed. You are standing in a warehouse that just called you by name and the name it used was made of bass.\n\nThe heat sink in your pocket is vibrating. It has never done this before. When you take it out later, in the cold, under the sodium lights, it will still be vibrating. It will vibrate for three days. On the fourth day it will go still and you will hold it to your ear and hear nothing and feel a loss so specific it has a frequency, and the frequency will be yours.",
  "arrival_variants": [],
  "conditional_text": [],
  "oor_action": "System test complete. All parameters nominal. The Builder's instrument performs to specification. The specification was always you.",
  "temperature": "hot",
  "awards_transcendental": null,
  "awards_artifact": "soundcheck",
  "awards_tags": ["soundcheck", "completionist"],
  "choices": [
    {
      "text": "The closing is starting. You can feel it.",
      "next": "w_011"
    }
  ],
  "next": null,
  "terminal": false,
  "outcome": null
}
```

---

### Audio Implementation Notes

**Minimum viable version (achievable in a web game):**
1. The chamfer frequency: a single sustained sine tone, ~55 Hz, played via Web Audio API. Three seconds. Fade in/out.
2. The reversed Cupid Shuffle: a pre-produced audio clip. Four bars. Vocoded, pitch-shifted, heavy sub-bass. Could be produced in any DAW and served as an MP3/OGG.
3. The vocoded "Sound good out there?": a pre-produced audio clip. One sentence. Vocoded through something that sounds like the floor is talking.
4. The sine sweep (during the text node): Web Audio API oscillator sweep, 20 Hz to 200 Hz over 5 seconds. Simple to implement, genuinely physical to experience.

**Ideal version (with more audio production):**
5. The reversed Cupid Shuffle is procedurally generated per-session — tempo, key, and effects seeded by the player's choice fingerprint across all runs. Every completionist hears a slightly different version.
6. The vocoded voice uses the player's display name (from account or a text field on the character select screen). Text-to-speech → vocoder chain. "Hey, [name]. Sound good out there?" 
7. The sine sweep includes the chamfer frequency as a persistent undertone — it never fully fades, just sits under everything, the Builder's mark embedded in the system test.

**What the player keeps:**
- `soundcheck` artifact — described as "a frequency. Not an object. A frequency that was yours before you had a name for it. It shows up in spectral analysis as a faint, clean line."
- The artifact is visible on the main page. Hovering over it plays the chamfer frequency tone. Always. Every time they come back to the game.

---

### Why this works:

**It's earned.** Six runs. Every character. Every perspective. The player has been reading about bass that shakes your sternum, about frequencies below hearing, about the Homewreckers putting the ass in bass. And then — for the first time in the entire game — they actually HEAR it. The game stops being text and becomes the thing it's been describing. The fourth wall doesn't break. It vibrates.

**It's the Builder's gift.** The Builder built the system. The Wanderer is inside it. The easter egg is the system doing what it was built to do — addressing the person standing inside it. "Sound good out there?" is the Builder's line, but now OOR is saying it, through the speakers the Builder built, to the player who built the experience by playing six times.

**It's funny.** A soundcheck. After everything — the cosmic horror, the transcendentals, the dissolution, the chamfer singing across primordial distances — the system runs a soundcheck. Like a roadie testing the PA before a gig. "Check, check. One two." Except the one-two is a sine sweep through your skeleton and the PA is a Lovecraftian construct made of yarn.

**It incorporates audio at the only moment where audio would be surprising.** The entire game is text. The player has been imagining the bass, the Cupid Shuffle, the chamfer frequency, the vocoded voice. Then, six runs deep, the game plays audio for the first and only time. The surprise IS the medium change. Text → sound. The Wanderer's experience becoming the player's experience. The membrane between game and player becoming thin.

---

### Artifact Display Text (main page hover):

**soundcheck**
*"A frequency. Not an object. You heard it once, in a warehouse, after six visits. The system the Builder built ran a soundcheck and the soundcheck was you. When you close your eyes you can still feel the sine sweep in your chest. The bass was yours before you had a name for it."*

[Hovering plays the chamfer tone.]
