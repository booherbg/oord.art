# Run 3 (Goodness) — Creative Workshop

**Nodes audited:** w_loading_dock, w_loading_dock_insta, w_bartender_run3, w_silence_run3, w_jacket_woman
**Voice rules applied from:** feedback_wanderer_voice.md, feedback_editorial_rules.md
**Prior audit referenced:** WANDERER_RUN3_AUDIT.md

---

## Recommendation

**Ship the Main Version. Consider cherry-picking from Variation B. Skip Variation A for now.**

Three versions were drafted. Here's the honest assessment, biased toward what's simplest to ship and strongest to play:

### Main Version: "The Crossing" — RECOMMENDED

The Wanderer sees the jacket woman holding and walks across the room. That's the goodness. The narrator goes quiet because you're busy caring, not because of a revelation.

**Pros:**
- Solves the core problem directly: goodness = agency, and this is the first time the Wanderer DOES something
- Clean differentiation from Run 2: Run 2 happens TO you (slide reverses), Run 3 is done BY you (you walk over)
- Simplest implementation: 4 nodes revised, a few conditional_text updates to w_011/w_012
- The narrator going quiet as side effect (not event) is the single strongest rewrite in the whole doc
- "The voice goes quiet because you're busy" — one line that does all the thematic work

**Cons:**
- The jacket woman conversation could feel thin on replay. It's one scene carrying the whole transcendental
- The "I kept my jacket on last time" / "It's exhausting" exchange may need another pass — it's close to thesis-statement territory even in the revised version

**Cross-run threading (SHIPPED):** The jacket woman now appears in Run 1 (w_009). The arrow finds her and she doesn't step in. The Wanderer recognizes the holding-back posture. This was also mirrored in f_014 — the Familiar notes the deposit that didn't yield, the armor that held. In Run 3, the Wanderer does what neither the arrow nor the rod could: walks across the room. The mechanism failed. A person succeeded.

**Verdict:** This is 80% of the impact for 20% of the effort. Ship this, tune in playtesting.

---

### Variation A: "The Offering" — DEFER

The Wanderer gives the matchbook to the jacket woman. It comes back. The system won't let you be truly selfless.

**Pros:**
- Philosophically the richest. The matchbook returning is a gut punch. It engages directly with the game's central tension (genuine experience inside a harvesting machine)
- The OOR action is excellent: "The construct returned the artifact. The artifact is the instrument. The yield is the willingness."
- Would give Run 3 the most distinct identity of any run

**Cons:**
- Too much for the player to process in the moment. "I gave it away, it came back, what does that mean?" is a think-about-it-later beat, not a feel-it-now beat. Goodness should feel simple
- The matchbook-returns mechanic needs engine support (temporarily removing an artifact, then restoring it) — or at minimum, careful state handling
- Makes the goodness feel complicated when the entire thesis is that goodness is the simplest transcendental
- The jacket woman doesn't actually need the matchbook. The scene works because of proximity, not objects

**Verdict:** This is the kind of idea that's better as a v2 or a secret alternate path. It would be a strong "second goodness" for a player who's already seen the main version. But it shouldn't be the default.

---

### Variation B: "The Regulars" — CHERRY-PICK

Goodness as communal care. The loading dock crew becomes a unit. Nobody went to talk to the jacket woman last time. You go because you're the newest and don't know the rules.

**Pros:**
- The warmest version. "Nobody went. You go." is a great line
- The communal goodness angle is original — no other run does this
- The loading dock scene in this version is the strongest of all three (the crew has history, dynamic, roles)
- The bartender scene has great texture: denim jacket ordering for the quiet woman, the chin-nod toward the jacket woman
- "Sometimes the newest person is the one who doesn't know the rules well enough to follow them" — strong insight

**Cons:**
- Distributed goodness is harder to feel than focused goodness. The transcendental awards at a moment that doesn't have a single clear peak
- Requires the loading dock crew to persist as named characters across 3 nodes. That's more character tracking than any other run
- The "communal" angle, while original, risks diluting the Wanderer's personal arc. Runs 1-2-4 are about the Wanderer's inner experience. Run 3 suddenly being about a group breaks the pattern
- Longest to implement: the bartender and silence nodes are substantially different, not just revised

**Verdict:** Don't ship this as the main version. But steal from it:

**Lines worth stealing for the Main Version:**
- The denim jacket making room without being asked (already in Main loading dock — good)
- "They don't wait for you but they don't close the door either" (already in Main — good)
- The quiet woman saying "Someone should go talk to her" could seed the jacket woman earlier, as a one-line conditional_text in the bartender node. Plant the awareness, pay it off later
- "She'll come when she comes" — great loading dock dialogue that could replace something weaker

---

## Handoff: Review Checklist

Before implementing into JSON, verify together:

### High-Impact Items (review these first)
- [x] **Jacket woman conversation** — DONE. Revised dialogue: "I don't know. I keep waiting to feel like I'm actually here." / "It's exhausting." Workshopped to avoid self-analysis, land pensive/unsure instead. Applied to JSON.
- [x] **Narrator silence beat** — DONE. Replaced "the voice goes quiet because you're busy" (busy = wrong connotation, mind keeping itself occupied). New passage: the space between thoughts opens wide enough to hold another person. Workshopped from character inward per WORKSHOP_GUIDE.md. Applied to JSON.
- [x] **Loading dock pacing** — REVIEWED. Revised version (~320 words) is proportional to w_003 (297) and w_009 (253). Dialogue-heavy structure reads faster than word count suggests. No flag. Loading dock text not yet applied to JSON (next pass).

### Consistency Checks
- [ ] **Gravel lot / "paved now" conflict** — w_002 mentions a gravel lot. w_loading_dock_insta has dialogue saying "paved now." These contradict. Proposed fix in the analogy audit: change the Instagram dialogue. Confirm.
- [ ] **w_011 conditional stacking** — The goodness arrival variant ("The voice is still quiet. Not because something was taken. Because something was given.") and the silence conditional (jacket woman at the door) both fire. Check that additive rendering reads naturally, not redundantly.
- [ ] **w_012 blank_key** — The revised epilogue ("It's warm. You don't know what it opens. You put it back.") is better than the current. But the blank_key artifact is provisional per earlier feedback. If the artifact changes, this text changes too. Flag for later. NOTE: blank_key conditional_text now lives on w_jacket_woman as a simple placeholder ("A key. Small, metal, no teeth... You put it back in your pocket."). Old truth_shard reference removed.
- [ ] **Bartender conditionals** — The chose_whiskey / chose_fog variants assume these tags persist from Run 1. Verify.
- [ ] **OOR action voice** — "Voluntary yield has a resonance the construct has catalogued but cannot reproduce. It has occurred 7 times in 4,200 harvests." — Does the specificity (7 times, 4,200 harvests) match the OOR voice in other nodes, or is this more precise than OOR usually gets?

### Scope Check
- [x] **Do we ship all 4 revised nodes or start with 2?** DECIDED: Shipped w_silence_run3 + w_jacket_woman (the structural rewrite). Loading dock and bartender are next pass.
- [ ] **Variation B cherry-picks** — Do we want to seed the jacket woman earlier (bartender node conditional about "someone should go talk to her")? Nice but not essential.

---

## Ship Plan

### If shipping all 4 nodes (~45 min)
1. Replace w_loading_dock, w_bartender_run3, w_silence_run3, w_jacket_woman text in wanderer_nodes.json
2. Update w_011 arrival variant and conditional_text for goodness tag
3. Update w_012 epilogue conditional for goodness tag
4. Update OOR actions for w_silence_run3 and w_jacket_woman
5. Read-through of full Run 3 path (w_002 → w_loading_dock → w_bartender_run3 → w_silence_run3 → w_jacket_woman → w_011 → w_012)

### If shipping core only (~20 min)
1. Replace w_silence_run3 and w_jacket_woman only
2. Update w_011/w_012 conditionals
3. Leave loading dock and bartender for next pass

---

## Diagnosis & Audit Detail

### The Goodness Problem

*Everything below is the full 10-round audit that produced the recommendation above. Reference as needed — the recommendation section is the distilled version.*

The current Run 3 arc is labeled "goodness" but delivers something closer to a second pass at truth/authenticity. Here's the structural comparison:

**Run 2 (awards Truth):** You know the slide → OOR reverses it → you stumble → paint-knuckle man catches you → stripped of autopilot → actually present.

**Run 3 (awards Goodness):** You have the narrator → bartender tunes you → you watch jacket woman drop her armor → narrator dissolves → actually present.

Same skeleton: comfortable pattern → disruption → forced presence → connection. Run 2 strips a physical habit (muscle memory). Run 3 strips a cognitive habit (narration). The deepening is real but the movement is identical. This is why Run 3 doesn't feel like goodness. It feels like Truth Take Two.

**What's missing:** Agency. In Run 2, things happen TO the Wanderer (the slide reverses, someone catches them). In the current Run 3, things also happen TO the Wanderer (the bartender tunes them, the narrator dissolves). Neither run asks the Wanderer to DO something.

Goodness requires will. Not perception (Truth), not synchronization (Unity), not witnessing (Beauty). Goodness is choosing to act for someone else's benefit without being prompted.

---

## Ten Rounds of Progressive Audit

### Round 1: Thematic Diagnosis

**Examined:** The four-transcendental arc across all runs.

**Found:** Each transcendental should have a distinct movement:
- **Unity (Run 1):** Passive absorption. The crowd takes you in. You didn't choose it.
- **Truth (Run 2):** Reactive correction. The system catches you performing. Someone helps.
- **Goodness (Run 3):** Should be active choice. You see someone and choose to reach out.
- **Beauty (Run 4):** Contemplative witnessing. You watch the Builder and understand craft.

The progression passive → reactive → active → contemplative is a character arc across runs. The Wanderer grows from being carried to carrying. Run 3 is the pivot point — the first time they act rather than receive.

**Changed:** Established that the jacket woman scene must be restructured around the Wanderer's CHOICE to approach, not the passive dissolution of the narrator.

---

### Round 2: What Goodness Should Be

**Examined:** The game's lore, the transcendental system, what goodness means within the harvest mechanism.

**Found:** Goodness in this game creates the deepest tension of any transcendental. The other three can be extracted without the human's awareness or consent. But genuine goodness — choosing to care for someone — can't be manufactured by the mechanism. OOR can sync bodies (Unity). OOR can disrupt patterns (Truth). The Builder's craft can be witnessed (Beauty). But nobody can make you walk across a room for a stranger. The mechanism can create the conditions. The act has to come from the human.

This means the goodness yield is qualitatively different. It's voluntary. The harvest benefits from it, but the harvest didn't produce it. This tension — genuine care inside a system that commodifies it — is the heart of the game's philosophy. The experience is real AND it's being collected. These are not in contradiction.

**Changed:** The revised arc: bartender tunes the Wanderer to see people clearly → Wanderer sees jacket woman holding → Wanderer CHOOSES to walk over → narrator goes quiet because you're busy caring, not because of an epiphany → the connection is small and human and the oldest thing in the room.

---

### Round 3: Loading Dock Deep Dive

**Examined:** w_loading_dock cadence, character specificity, lore pacing.

**Found:**
- Three characters introduced too rapidly. Third person has zero description.
- Dialogue transitions are abrupt — no physical beats between lines.
- Instagram info arrives as a dense speech. Real conversation parcels info one piece at a time.
- The narrator's interpretation of reactions ("Not surprised. Not confused. Like someone just answered a question she'd been carrying around for days") is over-explained. "Huh" does its own work.
- The scene tries to accomplish too many things simultaneously: matchbook effect, character intros, lore seeding (Instagram, Ashley, left_pocket_empty, Fargo, flash drive), and transition inside.

**Changed:**
- Gave the third person a detail (she's standing apart, newer to the group, still deciding her belonging).
- Added the denim jacket making room without being asked — plants the goodness-through-inclusion theme.
- Added "You pull out the matchbook. You're not sure why." — gives the Wanderer uncertainty, motivation.
- Cut the narrator's interpretation of reactions. "Her face does something private" replaces "Not surprised. Not confused. Like someone just answered a question..."
- Spread Instagram info across more natural dialogue beats.
- Added physical actions between dialogue lines (pocketing phone, stubbing cigarette, nodding).
- Closing: "They don't wait for you but they don't close the door either." — inclusion without ceremony.

---

### Round 4: Bartender Deep Dive

**Examined:** w_bartender_run3 voice, function, what the tuning should set up.

**Found:**
- Previous audit flagged "lens" and "filter" as Builder language. Still present.
- "The mechanism does what it needs to do" — the Wanderer doesn't think in mechanisms.
- "The people are more specific" — vague summary instead of concrete showing.
- The tuning should change WHAT the Wanderer sees, not HOW they feel. Post-tuning, the Wanderer should notice people (specific, human) rather than patterns (cosmic, system-level). This sets up the goodness act: they see the jacket woman as a person who needs something, not as a pattern to observe.

**Changed:**
- Replaced "lens/filter" with "Like blinking underwater and finding the water is clear."
- Cut "The mechanism does what it needs to do" entirely.
- Replaced "the people are more specific" with a concrete showing: "The woman near the speakers — you can see the tendons in her wrist as she moves."
- Final beat: "You're carrying something that wasn't in the drink" — kept this. It's good. But shifted what follows toward seeing people rather than feeling calibrated.
- The bartender now makes eye contact briefly. "It feels like a handoff." Not dismissive — purposeful.

---

### Round 5: The Silence — Differentiating from Run 2

**Examined:** w_silence_run3 structure vs. Run 2 slide reversal.

**Found:** The core problem. Run 2: disruption (slide reverses) → presence (forced). Run 3: disruption (narrator dissolves) → presence (forced). Same engine. The narrator dissolving is a slightly deeper version of the same thing.

The fix: the narrator doesn't dissolve from revelation. It goes quiet because the Wanderer is doing something it wasn't designed for. The narrator is built for watching, collecting, describing at a safe distance. When the Wanderer chooses to REACH — to cross the floor toward a stranger — the narrator has no protocol for this. It doesn't dissolve poetically. It just stops because you're busy.

**Key line:** "The voice goes quiet because you're busy."

This is fundamentally different from Run 2. Run 2 = the system disrupts your pattern. Run 3 = YOU disrupt your own pattern by choosing to act. Run 2 is passive. Run 3 is active. The narrator going quiet is a CONSEQUENCE of the choice, not the event.

**Changed:**
- Restructured the node: observation → seeing jacket woman → the CHOICE to approach → narrator going quiet as consequence.
- Cut the extended meta-narration about narration ("You notice these things because the voice tells you to..." — three sentences of cognitive self-analysis collapsed to one).
- Cut "The gap is so full that the voice was the thing making it seem empty" — thesis statement, philosophy. Replaced with the active choice and its practical consequence.
- The jacket woman no longer removes her jacket in this node. That moves to w_jacket_woman. The silence node ends with the Wanderer in motion — crossing the floor.

---

### Round 6: The Jacket Woman — The Climax

**Examined:** w_jacket_woman as the goodness-yielding moment.

**Found:**
- Current conversation is too articulate. The jacket woman delivers five consecutive sentences of clean self-analysis at 1am in a warehouse. Real people don't speak in thesis statements.
- The current scene is about mutual recognition (two observers recognizing each other). This is interesting but it's not goodness. Recognition is perception. Goodness is action.
- "These are facts, not observations" — the narrator commenting on its own silence. Self-defeating.
- The ocean/river metaphor is geological-scale, Familiar territory, not Wanderer.

**Changed:**
- The Wanderer arrives having already crossed the floor (the act of goodness is the approach).
- The conversation is messier. Shorter sentences. Pauses. Physical beats. "I don't know why I'm telling you this."
- The jacket comes off during the conversation, not before it. The Wanderer's presence enables it but doesn't cause it.
- Cut "These are facts, not observations." Trust the prose shift.
- Replaced ocean metaphor with domestic: "the way weight settles in a house when the last person comes home."
- The goodness is explicit in its smallness: "Two people, one of whom chose to walk over, the other of whom chose to let them stay."
- The narrator doesn't return. There's nothing to narrate. "Two people standing at the edge of a dance floor, watching, quiet. That's the whole thing."

---

### Round 7: The Through-Line — What Is the Wanderer Looking For?

**Examined:** The Wanderer's motivation across Run 3.

**Found:** Run 1 motivation: following the sound. Run 2 motivation: returning by choice (yarn_knot draws them back). Run 3 motivation: unclear. The matchbook is the gate artifact, but what DRIVES the Wanderer this time?

The progression: drawn → returning → owing. By Run 3, the Wanderer isn't seeking an experience. They've had experiences. Something in the matchbook's warmth feels like unfinished business. Not curiosity. Obligation — the quiet kind, the kind that shows up as "I should go back" without a clear reason.

This subtle shift from seeker to returner opens the door for goodness. You're no longer here to GET something. Something in you recognizes you OWE something. Not to the mechanism. To the people. To the jacket woman who kept her armor on. To the loading dock crew who held the door. To whatever it is about this place that keeps pulling you back.

**Changed:**
- Revised w_002 arrival variant (matchbook): "This is your third time. The matchbook is warm in your pocket and the warmth feels like unfinished business. You're not here to follow the bass tonight. You're not sure why you're here."
- The motivation reveals itself through the act. The Wanderer doesn't know why they came back until they're walking across the floor toward the jacket woman. Then they know.

---

### Round 8: Integrated Draft

Full revised text appears in the **Revised Node Text** section below. All changes from Rounds 1–7 integrated.

---

### Round 9: Voice & Editorial Rules

**Applied against all revised text:**

**Em dashes:** Found and replaced 4 instances. Used periods or restructured sentences.

**Run-on sentences:** Checked all passages. None found in revised text — the revised prose trends shorter.

**Authorial intrusion:** Caught one instance: "It's older than the bass and the fog and whatever's underneath the floor" — borderline but acceptable because the Wanderer can feel something under the floor without naming it. Kept.

**Metaphor discipline:** All metaphors checked against Wanderer's register (corporeal, domestic, lived-experience):
- "Like blinking underwater" ✓
- "The way a door settles when you stop leaning against it" ✓
- "The way weight settles in a house when the last person comes home" ✓
- "Like hearing a song through the wall of the room where it's being mixed" ✓

**"Frequency" check:** Not used in revised text. ✓

**Show don't tell:** Cut all remaining instances of narrator explaining its own silence.

**No systems language:** Cut all instances of "mechanism," "filter," "lens," "calibration."

---

### Round 10: System Integration

**Artifacts & Transcendentals:**
- w_jacket_woman still awards transcendental "goodness" and tag "goodness." No change needed.
- blank_key artifact at w_012 epilogue still works. Blaine noted this is provisional. The revised arc might suggest a different artifact — see note below.

**Artifact note:** Given the revised arc (goodness = choosing to approach), the artifact could be something the jacket woman gives you rather than something that appears in your pocket. A button from her jacket. Something she hands you deliberately. Voluntary exchange, not mysterious appearance. But this is a design decision for Blaine — noted, not implemented.

**Revised w_011 conditional (goodness tag):**
Current: "The voice is gone. Not missing. Released. The closing finds you already inside it."
Revised: "The voice is still quiet. Not because something was taken. Because something was given. The closing finds you already inside it."

**Revised w_012 conditional (goodness tag):**
Current text about blank_key works but final sentence is too abstract: "You close your hand around it and think of possibilities that may come to pass if only you have the courage to fulfill them."
Revised: "You close your hand around it. It's warm. You don't know what it opens. You put it back."

**Revised OOR action for w_jacket_woman:**
Current: "Goodness yielded. The internal audience dissolved. What was taken: the surplus narration. What remains: a voice that speaks when there is something to say."
Revised: "Goodness yielded. Not extracted. Given. The construct notes the distinction. Voluntary yield has a resonance the construct has catalogued but cannot reproduce. It has occurred 7 times in 4,200 harvests."

**Revised OOR action for w_silence_run3:**
Current: "The aperture registers a new flow. The construct did not initiate this one."
Revised: "The aperture registers a flow. The construct did not initiate this one. The bartender set the conditions. The watcher made the choice. Causality is not the construct's concern. Yield is."

**Choice text at w_silence_run3:**
Current: "Approach her."
Keep as-is. Clean.

---

## Revised Node Text — Main Version

> **Direction:** Goodness as active choice. The Wanderer sees someone holding and chooses to cross the distance. The narrator goes quiet because you're busy caring, not because of revelation.

---

### w_loading_dock — THE LOADING DOCK

Three people are leaning against the loading dock, passing a cigarette. The dock door is propped open with a cinder block. Bass leaks through the gap. Not the front-door bass. Something rawer, less filtered. Like hearing a song through the wall of the room where it's being mixed.

You walk over. The one with the beanie looks up from her vape. She doesn't say anything but she doesn't look away either. The tall one in the denim jacket shifts his weight to make room without being asked. A small thing. The kind of thing people do when they've been coming to the same place long enough that a stranger doesn't change the temperature.

You pull out the matchbook. You're not sure why. Maybe it's credentials. Maybe it's a question.

The beanie girl takes it. Opens the cover. Reads. Her face does something private.

"Huh," she says. She passes it to the denim jacket.

He reads it slower. Holds it at an angle under the sodium light. "...hmm." He hands it to the woman next to him. She's standing slightly apart from the other two, still deciding how much of this group she belongs to.

She glances at it. Whatever she reads confirms something she'd already decided. "You going in?" She hands it back and steps toward the door.

"You been before?" the denim jacket asks. He doesn't wait for your answer. "I follow them on instagram. The account's dead. One photo of this building, no caption." He pulls out his phone, tilts the cracked screen toward you. "Three followers. Me, some girl named Ashley, and a handle called left_pocket_empty."

"They're doing something in Fargo," the beanie girl says. "Some art thing."

"Who told you that?"

"Guy with the flash drive."

He nods like this explains everything. Pockets his phone. The beanie girl stubs her cigarette on the dock and follows the others toward the door.

They don't wait for you but they don't close the door either. You follow. The matchbook is back in your pocket. You don't remember anyone handing it back.

---

### w_bartender_run3 — THE TUNING

The side door puts you behind the bar. Not in front of it. Behind it, in the narrow corridor where the bottles live. The bartender is three feet away. She looks up when you step through. A flicker of recognition she doesn't try to explain.

She's already making something. She slides it across the bar and watches you take it. Brief eye contact. It feels like a handoff.

**[conditional: chose_whiskey]** It's the whiskey sour. Your whiskey sour. The bitters first, the rosemary trimmed clean, the ratios exactly right. She made this for you once, and you chose it, and now she's made it again without being asked. The fact that she knew is not something you can explain.

**[conditional: chose_fog]** It's the fog drink. Amber, heavy, the moss floating on the surface. She made this for you once, and you chose it, and now she's made it again without being asked. The fact that she knew is not something you can explain.

You drink. Something settles. Not warmth. Clarity. Like blinking underwater and finding the water is clear. Same room, same crowd, but the blur you didn't know was there is gone. The woman near the speakers, you can see the tendons in her wrist as she moves. The paint-knuckle man is somewhere on the floor. You can hear him laughing from here.

You step out from behind the bar.

**[conditional: append]** The denim jacket guy from the loading dock is already deep in it, dancing with his eyes closed. He looks like he's been doing this for years. He probably has.

**OOR action:** The bartender's adjustments are not sanctioned by the construct. They are tolerated. The distinction is important to no one except the bartender.

---

### w_silence_run3 — THE SILENCE

You're walking through the crowd. The bartender's drink is still in you. Not warming. Clearing. The voice in your head is talking, the one that narrates, the one that collects, the one that turns every experience into something you can describe later. But it's further away than usual. Pushed back by something the drink carried.

You see people. Not the way you usually see them, as details to collect, textures to catalog. You see them the way you see someone at a bus stop. Plainly. Without reaching for what they mean.

The fog clings to the shoulders of the man in the denim jacket. The condensation on the plastic cups catches the orange light. A woman near the speakers is dancing with her whole body, chin up, completely gone. The paint-knuckle man is leaning against a pillar, watching the floor. Content.

You see the woman with the jacket.

She is standing near the edge of the floor. Jacket zipped. Arms crossed. Not watching the crowd. Watching the distance between herself and the crowd. Maintaining it. She has been here before. You can tell because her position is too precise to be an accident. She knows exactly how close she can stand without being pulled in.

Your jaw tightens. You recognize the posture.

The voice says: note her and keep moving. The voice says: she is interesting and you can think about why later. The voice has said this about every person you've ever noticed from a safe distance.

You walk toward her.

Not because the arrow pointed. Not because the rod chirped. Not because the music built to a swell. Because she looks like she's holding something heavy and you remember what that feels like.

The voice goes quiet. Not because you reached a revelation. Because you're doing something it didn't plan for. The narrator is built for watching, not for reaching. You're reaching. You're crossing the floor toward a person you've never met because something in the way she's standing makes you want to be near her. Not for you. For her.

The voice goes quiet because you're busy.

**OOR action:** The aperture registers a flow. The construct did not initiate this one. The bartender set the conditions. The watcher made the choice. Causality is not the construct's concern. Yield is.

**Choice:** "Approach her." → w_jacket_woman

---

### w_jacket_woman — THE CROSSING

She looks at you. She wasn't expecting you. Nobody crosses the room to someone with their arms crossed and their jacket zipped. That's the whole point of the armor.

"Hi," you say. Without the narrator, hi is all you've got.

She takes a second. "Hi."

You stand next to her. Not facing her. Facing the floor, both watching. The paint-knuckle man is out there. The sneaker-star woman. Two hundred people moving for reasons they don't need to explain. You watch them together.

You don't try to get her to talk. You just stand there.

After a while she lets out a breath.

"I kept my jacket on last time," she says. She's not looking at you. "The whole night. Stood right here." A pause. "I watch things. I hold onto everything so I can describe it later." She stops. "It's exhausting."

You nod. The nod is enough.

She looks at her jacket. Her hands go to the zipper. She pauses. Then she unzips it. Folds it over her arm with the care of someone who knows exactly what she's removing. Her shoulders drop. Not dramatically. The way a door settles when you stop leaning against it.

"I don't know why I'm telling you this."

You don't know either. But you're here. That's what you can offer. You don't have insight or the right sentence. You have proximity. You walked across a room for it.

Something passes between you. Not the Unity of the slide, that was two hundred bodies in sync, anonymous. This is specific. Two people, one of whom chose to walk over, the other of whom chose to let them stay. Small. Human. Older than the bass and the fog and whatever's underneath the floor.

Something below the floor shifts. A warmth. A settling. You feel it accept what passed between you. Not with gratitude. With the way weight settles in a house when the last person comes home.

The voice doesn't come back. You wait for it. There's nothing to narrate. Two people standing at the edge of a dance floor, watching, quiet. That's the whole thing.

**OOR action:** Goodness yielded. Not extracted. Given. The construct notes the distinction. Voluntary yield has a resonance the construct has catalogued but cannot reproduce. It has occurred 7 times in 4,200 harvests.

**awards_transcendental:** goodness
**awards_tags:** goodness, silence
**Choice:** "The closing is starting. You can feel it." → w_011

---

### Supporting Changes

**w_002 arrival variant (matchbook):**
> This is your third time. The matchbook is warm in your pocket and the warmth feels like unfinished business. You're not here to follow the bass tonight. You're not sure why you're here.

**w_011 arrival variant (goodness tag):**
> The voice is still quiet. Not because something was taken. Because something was given. The closing finds you already inside it.

**w_011 conditional (silence tag):**
> The jacket woman is near the door. She's carrying her jacket over one arm. She sees you and doesn't wave. She just looks at you and the look is enough. Two people who were holding and then stopped holding. She walks out into the cold. You don't follow. You don't need to.

**w_012 epilogue conditional (goodness tag):**
> You put your hand in your coat pocket. The matchbook is there, warm. But something else is in the pocket with it. A key. Small, metal, warm from your body heat or from something else. You turn it over. No teeth. The shaft is smooth where the cuts should be. It opens nothing. You close your hand around it. It's warm. You put it back.

---

## Variation A: The Offering

> **Direction:** Goodness as sacrifice within the machine. The Wanderer tries to give the matchbook away. The system returns it. The act was genuine; the mechanism won't let it complete. Darker, more philosophically charged.

---

### w_loading_dock — THE LOADING DOCK

Same as main version.

---

### w_bartender_run3 — THE WEIGHT

The side door puts you behind the bar. The bartender looks up. Recognition. She's already making your drink.

She slides it across and you feel the weight of everything in your pockets. Not physical weight. The matchbook, warm against your hip. The yarn from the first night, still there. Objects you didn't ask for and can't seem to lose. The narrator has been building a museum in your head, cataloging every detail, every texture, every stranger's hands. Three visits' worth of inventory.

You drink. The weight doesn't lighten. It clarifies. You can feel exactly what you're carrying. For the first time you're not sure you want to keep carrying it.

**[conditional: chose_whiskey]** The whiskey sour is identical. The same rosemary. The same precision. She's made it three times now. The fact that she knew is not something you can explain. The fact that you've been collecting these observations like stamps is something you can.

**[conditional: chose_fog]** The fog drink is identical. Amber, mossy, exact. She's made it twice without being asked. You notice yourself noticing this, filing it, adding it to the collection, and for the first time the collecting feels heavy.

**[conditional: append]** The denim jacket guy from the loading dock is already on the floor. Eyes closed. He's not collecting anything. He's just here.

---

### w_silence_run3 — THE GIVING

You're walking through the crowd. The weight is still there. The narrator is talking, cataloging, adding to the museum. You've been doing this your whole life. Noticing things and holding onto them. Every room you've ever been in has been processed, described, filed. You are a walking archive of your own experience and the archive is full and the shelves are bowing.

You see the woman with the jacket.

She's in her usual spot. Edge of the floor. Zipped. Arms crossed. She is holding everything too. You can see it in her. The same weight. The same shelves.

The matchbook is warm in your pocket.

You walk toward her. She looks at you warily. You pull the matchbook from your pocket and hold it out.

"Read this," you say.

She takes it. Opens it. Reads whatever it says to her — the sentence that was lifted from her heart the way it was lifted from yours. Her face changes. Not the way the loading dock crew's faces changed. Something deeper. Her eyes get wet and she doesn't wipe them.

"How did you know?" she says.

You didn't know. You just had it and she seemed like she needed it more.

"Keep it," you say.

The voice in your head goes quiet. Not from revelation. From release. You just gave away the only proof you were ever here. The narrator has nothing left to catalog. The archive just lost its most important artifact. You gave it away because someone else needed it more and the giving is the lightest thing you've felt all night.

She holds the matchbook with both hands. Her jacket is still on. Her arms are no longer crossed because they're holding the matchbook. The armor didn't need to come off. Something just needed to be placed in her hands.

---

### w_jacket_woman — THE RETURN

You check your pocket a minute later. The matchbook is there. Still warm. Still yours.

You gave it away and it came back.

Something in you sinks. Not with disappointment exactly. With the understanding that you can't actually give this up. The mechanism needs you to carry it. Your sacrifice was genuine and it was also accounted for. The goodness was real. The system's acceptance of the goodness was also real. You wanted, for one moment, to give something away completely. And you can't.

She's still next to you. She doesn't know the matchbook came back. She's standing easier now. Whatever she read is still working in her.

"It said something to me," she says. "Something I needed."

You nod. You don't tell her it's back in your pocket. What would be the point? The moment was real. What she read was real. The giving was real even if the object refused to stay given.

Something below the floor shifts. A warmth. It received what you offered. Not the matchbook. The willingness. The gesture of opening your hand when every instinct said to hold. The system took the yield and returned the instrument.

The voice comes back. Quieter. Carrying less. Something was taken from the narration, or something was given away from it, and either way the museum has fewer shelves and the rooms are bigger and the echoes have changed.

**OOR action:** Goodness yielded. The construct returned the artifact. The artifact is the instrument. The yield is the willingness. The construct does not distinguish between receiving and collecting. This distinction is important to the human. It is not important to the construct.

**awards_transcendental:** goodness

---

### Supporting Changes (Variation A)

**w_011 arrival variant (goodness tag):**
> You gave something away tonight and it came back and the giving was real and the returning was real and you are carrying both. The closing finds you holding everything and holding it lighter.

**w_012 epilogue conditional (goodness tag):**
> You put your hand in your coat pocket. The matchbook is there. Of course it is. But something else is with it. A key. Small, metal, no teeth. You hold it up to the sodium light. A key that opens nothing. You gave something away tonight and the world gave you this in return: the shape of a door you haven't found yet. The matchbook is warm. The key is warm. You put them both back.

---

## Variation B: The Regulars

> **Direction:** Goodness as communal care. The loading dock crew becomes central. The Wanderer joins a small community and discovers goodness not as a grand gesture but as the accumulated small kindnesses of people who show up.

---

### w_loading_dock — THE REGULARS

Three people are leaning against the loading dock, but they know each other. The beanie girl says something and the denim jacket laughs. The third woman, quieter, newer, is holding a cup and smiling at the laughing even though she missed the joke. This is a unit. Small, informal, built by showing up rather than introduction.

Bass leaks through the propped door. Not the front-door bass. Something rawer.

You walk over. The denim jacket sees you first. "You got the book?" he says. Not demanding. The way a kid asks if you brought the ball.

You pull out the matchbook.

The beanie girl takes it. Reads. "Huh." She passes it. The denim jacket reads slower. "...hmm." The quiet woman reads and says nothing but her grip on her cup changes.

"Come on," the beanie girl says. Not to you specifically. To the group. "Show's starting."

You're part of the group now. No one discussed it. The denim jacket holds the door. The beanie girl lights a new cigarette in the hallway. The quiet woman walks next to you and says "First time through the side?" and when you shake your head she nods like that's credentials enough.

This is how it works. You show up enough times and the door-holding and the cigarette-sharing and the walking-next-to accumulate into something. Not friendship exactly. Something older. Something that doesn't need a name because it predates the need for one.

The matchbook is back in your pocket. You don't remember anyone handing it back.

---

### w_bartender_run3 — THE GROUP

The group splits at the bar. The denim jacket orders for the quiet woman without asking, knowing her drink. The beanie girl orders something complicated that the bartender handles with no acknowledgment. The bartender makes your drink last. Your drink.

**[conditional: chose_whiskey]** The whiskey sour. Your whiskey sour. Same rosemary. Same ratios. She made it without being asked. You don't try to explain this. You hold your cup with both hands.

**[conditional: chose_fog]** The fog drink. Your fog drink. Amber, heavy, the moss floating on top. She made it without being asked. You hold it with both hands and the warmth is familiar.

When she slides it across, she catches the denim jacket's eye and does something with her chin. A direction. He looks toward the floor and nods.

"She's here again," he says to the beanie girl. He means the jacket woman. You follow his gaze. She's in her spot. Edge of the floor. Zipped. Arms crossed.

"She come in the front?" the beanie girl asks.

"Always comes in the front."

The quiet woman is watching the jacket woman. "Someone should go talk to her," she says. The way you say someone should call the landlord. Not volunteering. Noting that a thing needs doing.

The denim jacket shrugs. "I tried last time. She didn't want to talk." He's not hurt by this. It's information.

The beanie girl stubs her cigarette. "She'll come when she comes." She heads for the floor.

You drink. The bartender's tuning settles into you. The group disperses into the crowd, but they don't really disperse. You can feel them, distributed through the room. Present. Placed.

---

### w_silence_run3 — THE GOING

You're on the floor and the crowd is deep in it and the paint-knuckle man is laughing somewhere and the regulars from the loading dock are scattered but present and the voice in your head is narrating all of this.

And you see the jacket woman.

She's where she always is. Edge. Zipped. Holding.

The denim jacket tried last time. She wasn't ready. The quiet woman noted that someone should go. The beanie girl said she'll come when she comes.

Nobody went.

You go.

Not because you're braver than them. Not because you have some insight they lack. Because you're the newest person in this small group and sometimes the newest person is the one who doesn't know the rules well enough to follow them. They know she doesn't want to talk. You don't know that yet. Or you do, and the bartender's drink has made you less interested in what you know and more interested in what you could do.

You stand next to her. She looks at you. You didn't plan this far ahead.

The voice goes quiet. The same way it went quiet when the loading dock crew included you without discussion and you realized you were part of something and the narrating wasn't needed because the being-part-of was enough.

---

### w_jacket_woman — THE INVITATION

She looks at the dance floor. She looks at you.

"You came from the side door?" she says.

You nod.

"They're always over there," she says. "The regulars. I see them every time." A pause. "Every time I stand right here and see them."

"You should come say hi," you say. Not a speech. Not a thesis. A regular thing that regular people say.

She almost smiles. Something in her shoulders shifts. Not dramatically.

"I kept my jacket on last time," she says.

"So did I," you say. You're not sure this is true but it feels true. The first night you held everything at a distance too. You watched. You collected. You stood at the edge and documented instead of arriving.

She looks at her jacket. Unzips it slowly. Folds it over her arm.

You stand together for a while. The paint-knuckle man walks by and raises a hand at you. You raise one back. Small gesture. The gesture is the content.

The denim jacket is on the floor, deep in it. The beanie girl is near the speakers. The quiet woman is at the bar, watching the floor with the bartender. Your group. You didn't build it. You just showed up enough times.

Something below the floor shifts. Not the dramatic yield of the slide or the circle. A warmth. The way soil absorbs slow rain. Most of the nourishment comes from the rain you don't notice.

The voice stays quiet. Not because something was taken or given. Because you're part of something and being part of it is the whole thing and the narrator was never needed for this. It was always just you, showing up.

**OOR action:** Goodness yielded. Distributed across multiple agents. No single source. No single act. The construct has observed this pattern before: small, cumulative, communal. The aggregate yield is lower than concentrated individual extraction. The construct notes this. The construct does not have a preference. The construct has noted it 7 times.

**awards_transcendental:** goodness

---

### Supporting Changes (Variation B)

**w_011 arrival variant (goodness tag):**
> You came from the side door tonight and found people who hold the door without being asked. The closing finds you already inside something.

**w_012 epilogue conditional (goodness tag):**
> You put your hand in your coat pocket. The matchbook is there. And something else. A key. Small, metal, warm. No teeth. You think about the loading dock and the held door and the jacket woman almost smiling and you think maybe the key doesn't need teeth. Maybe the door was never locked. You put it back.

---

## Familiar Path

Familiar audit has been moved to its own documents:
- **[FAMILIAR_NODE_AUDIT.md](FAMILIAR_NODE_AUDIT.md)** — Node-by-node voice/register fixes (~12 line-level changes)
- **[FAMILIAR_HARVEST_LEDGER.md](FAMILIAR_HARVEST_LEDGER.md)** — Harvest manifest reward system design (2 new choices, path-dependent ending readout)
