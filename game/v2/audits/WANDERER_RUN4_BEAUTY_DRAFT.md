# Wanderer Run 4 — Beauty Branch (Draft)
**Character: The Wanderer, through the silence**
**Gate: truth_shard artifact, at w_004b (THE OPERATOR)**
**Theme: seeing OOR as craft. The Builder. Beauty in the gap between intention and execution.**
**3 nodes + modified gate choice on w_004b**

---

## Gate Modification: w_004b (THE OPERATOR)

Add a new choice to w_004b, gated by truth_shard:

```json
{
  "text": "There's someone behind the speakers.",
  "next": "w_behind_the_rack",
  "tag": "saw_builder",
  "requires": { "has_artifact": "truth_shard" }
}
```

The Wanderer, through the silence (the narrator voice is quieter, simpler — carry the Run 3 style), notices what they missed before: past the fog, past the decks, past the thing with the pink gloves — there is a person. Not performing. Not dancing. Working.

---

## Node 1: w_behind_the_rack (BEHIND THE RACK)

**Subtitle:** BEHIND THE RACK

You move past the decks. The fog is thicker here and the heat is different — drier, sharper, carrying a smell like hot metal and solder. The bass is so deep it's not sound anymore. It's the floor disagreeing with itself.

Someone is sitting on a road case behind a rack of equipment you don't recognize. They have an iPad balanced on one knee. Their other hand is resting on the side of a speaker cabinet the way you'd rest your hand on a sleeping dog.

They are crying. Not sobbing — just tears, running, ignored. They wipe their face with the back of their wrist without looking up from the iPad. Their eyes are moving between the screen and the speaker stack with a focus that has nothing to do with you or the crowd or the fog or the arrow spinning on the floor behind you. They are listening to something. You can't hear it. Or you can, and it's the bass, but they're hearing something inside the bass that you're not — a frequency within a frequency, the way a word has letters.

The equipment around them is theirs. You know this the way you know when someone built their own bookshelf — not because it's rough, but because the seams are personal. Decisions everywhere. The cables are routed with care. The speaker cabinets are massive, matte, covered in a pattern you can't quite parse, and wherever a panel meets a frame there's a small angled cut — the same angle, every joint, hand-done. You don't know what it's for. They know what it's for.

DJ OOR's ear rotates. It pauses on the person behind the rack the way it paused on you. But the pause is different. When it looked at you, it was measuring. When it looks at them, it is — the word your quiet voice supplies is *listening*. The way you'd listen to the person who taught you how to speak.

**Temperature:** warm
**Awards tags:** saw_builder
**Choice:** "Watch them work." → w_the_craft

---

## Node 2: w_the_craft (THE CRAFT)

**Subtitle:** THE CRAFT

They don't know you're watching. Or they do and it doesn't change anything.

The iPad screen shows something you can't read from here — charts or waveforms or something between the two, flickering amber. Their fingers adjust a knob on the rack and three things happen: the bass shifts, the amber on the screen brightens, and two people near the front of the dance floor take a step closer to each other. The three events are simultaneous. You don't think they're connected. You think they might all be the same event.

The speaker cabinet nearest you is humming. Not the bass — something underneath it, quiet, personal, like a sewing machine running in the next room. You lean closer. The angled cut on the mounting panel is vibrating. Not the cabinet. Not the driver. Just the cut itself, producing a sound so faint you can only hear it because the voice in your head is quiet enough to let it through.

It's a single note. Clean. Steady. It doesn't belong to the song. It belongs to the cabinet. Or to the person who cut the angle. A signature left in the material the way initials get carved into wet concrete — not for anyone to see, but because you were there and the concrete was wet and your hands wanted to leave something behind.

You look at them. They are not a performer. They are not a priest. They are a person who built something and is sitting inside it while it does the thing they built it to do, and the thing it is doing is more than they designed, and they can hear it, and that is why they are crying.

You have never built anything like this. But you recognize the tears. You've cried at a song before. You've cried at a painting, at a building, at a sentence in a book. The tears that come when something made by hands reaches past the making and touches something that hands can't reach.

**Temperature:** hot
**Awards tags:** witnessed_craft
**Choice:** "Stay until they notice you." → w_beauty_yielded

---

## Node 3: w_beauty_yielded (THE MAKING)

**Subtitle:** THE MAKING

They look up. Not startled — they just run out of things to adjust. The screen has gone steady amber. The bass is holding. Whatever they were tuning has found its level.

They see you and their face does something you don't expect. Not the bouncer's assessment. Not the bartender's calibration. A look you've seen at open mic nights and gallery shows and community theater curtain calls — the look of someone who made a thing and has been seen making it.

"Sound good out there?" they ask. Voice is rough. They clear their throat.

You nod. It's the truest thing you've communicated all night.

They look back at the speaker stack. The pink gloves are moving on the mixer and the thing behind the decks is operating the equipment this person built. A machine made of yarn and impossible geometry, playing an instrument made of aluminum and obsession. You saw OOR before and it was terrifying — the size of the ear, the clustering eyes, the sense that you were standing inside something that was eating you. But from here, from behind, through this person's attention, you see the other side of it. Someone received an email. Someone read a spec sheet. Someone machined metal and printed plastic and wired connections and drove a van to a warehouse and built a stack and sat on a road case and listened to their work do something impossible, and cried because it was beautiful, and wiped their face, and kept working.

The terror doesn't go away. The beauty doesn't cancel the horror. They exist in the same object the way the front and back of a hand are the same hand. What you're feeling is not understanding. It's the absence of the need to choose between them.

Something yields. Not from you this time — from the space between you and the Builder, from the act of witnessing craft and recognizing it as craft. The floor warms. The faint note from the angled cut rises for a moment, clear and deliberate, and then settles back to its whisper.

The Builder looks at you one more time. They nod. Then they check their iPad and the moment is over and they are back to work and you are standing behind a rack of equipment in a warehouse that is eating people's feelings and someone built the mouth.

**Temperature:** hot
**Awards transcendental:** beauty
**Awards tags:** beauty
**Choice:** "The closing is starting. You can feel it." → w_011

---

## Conditional Text for Existing Nodes

### w_011 (THE CLOSING CEREMONY) — new arrival variant:
```json
{
  "requires": { "has_tag": "beauty" },
  "text": "The voice is quiet. Behind the rack, the Builder is watching their system close the way a surgeon watches the last suture. You know the sound you're hearing. You know someone made it.",
  "default": false
}
```

### w_012 (THE EPILOGUE) — new conditional text:
```json
{
  "condition": { "has_tag": "beauty" },
  "append": "You put your hand in your coat pocket and find a piece of metal. Small, heavy, warm. There's an angled cut on one edge — forty-five degrees, hand-filed. You hold it up to the sodium light and for a moment you can hear the note it makes, faint and clean, a frequency that belongs to someone you watched cry at their own work. You put it back in your pocket. You'll keep it. Not because you understand what it is. Because someone made it, and making things that outlast the making is the closest anyone gets to whatever was underneath that floor.",
  "awards_artifact": "chamfer_token"
}
```

---

## Notes

**Voice calibration:** These nodes carry the post-silence Wanderer voice from Run 3. Shorter sentences. Less interior narration. More physical observation. The Wanderer is PRESENT in a way they weren't in Run 1 — they notice the angled cut, the cable routing, the tears, without the collector-voice cataloguing everything for later. They're just seeing.

**What the Wanderer does NOT know:** They don't know what a chamfer is. They don't know about transfer functions or phase alignment or the PDF. They see "an angled cut" and "charts or waveforms." The Builder's technical world is translated into the Wanderer's texture world. Same object, different literacy.

**Cross-character threads:**
- The chamfer: Builder sees it as a signature frequency in spectral analysis. Wanderer sees it as an angled cut that vibrates and makes a quiet note. Same physical detail, entirely different cognitive framework.
- The tears: Builder's prose says "you cry at good sound." Wanderer sees the tears and recognizes them from their own experience (songs, paintings, buildings). Same tears, different explanation.
- OOR: Wanderer saw it as terrifying in Run 1. Now sees it from behind, through the Builder's relationship to it, and sees something built. The horror doesn't dissolve — it coexists with the craft.
- The iPad amber: Builder experiences it as a data interface with the harvest mechanism. Wanderer sees "charts or waveforms, flickering amber." Same screen, completely opaque to the Wanderer.

**Why the gate is at w_004b:** This is the node where the Wanderer watches OOR operate. In Run 1, they saw the terrifying exterior. With the truth_shard (post-silence, post-jacket-woman), they can see past the performance to the infrastructure. The Builder was always there — the Wanderer just wasn't quiet enough to notice.

**Artifact:** chamfer_token — a small piece of metal with the Builder's 45-degree chamfer. The Wanderer's version of the Builder's heat_sink. Same object family, stripped of technical context, experienced as pure texture. "Heavy, warm, angled cut, makes a note."
