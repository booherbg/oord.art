# Artist Log — DJ OOR Sound Design
*A development journal for the generative soundtrack.*

---

## Entry 1 — April 28, 2026

### The Vision

We're building a generative soundtrack for The Call of Sooboont. Not a playlist. Not a loop. A living instrument that responds to where you are in the story and assembles itself from raw waveforms in real time. Every playthrough sounds different. Every playthrough sounds like it belongs to *this* story.

The throughline is the chamfer frequency — 55Hz, the Builder's mark in every joint. It's the first thing you hear and the last thing that fades. It hums whether or not anyone is listening.

### What We've Built So Far

**Soundcheck** (`soundcheck.html`) — The full proof of concept. Six phases:
1. Chamfer tone (55Hz sine + harmonic)
2. Reversed shuffle (4 bars, formant-sweeping chords, backwards envelopes)
3. Acid house loop (TB-303 emulation, four-on-the-floor, offbeat hats)
4. Vocoder voice ("Sound good out there?")
5. Sine sweep (20→240Hz)
6. Ambient loop (55Hz with LFO pulse)

This established the synthesis vocabulary: the chamfer as identity, the reversed envelope as uncanny valley, the 303 as mechanical prayer, the vocoder as OOR's distorted speech.

**Acid Demo** (`acid-demo.html`) — Ten procedural tracks proving the parametric approach works. Different keys, BPMs, filter Q values, waveforms. The later tracks (Golden Hour, Extended Mix) showed that atmosphere-first architecture (pad → acid → bass) creates a different emotional register than drums-first.

**Track Production Guide** — The Deep Offering and Golden Hour formulas. Layer-by-layer construction, gain management rules, sidechain pump technique, chord progressions. This is the recipe book.

**Soundtrack Demo** (`soundtrack_demo.html`) — First generative demo. Generates fresh parameters (key, BPM, patterns, melody) each play. Nine zones over ~90 seconds. Uses chamfer, kicks, hats, claps, 303 acid, rolling bass with sidechain, pad, and melody with delay.

### What the Spec Covers

Full build plan in `SOUNDTRACK_SPEC.md`:
- 8 sonic zones mapped to story position
- Node-to-zone algorithm using temperature + metadata
- Fractal micro-narrative within zones (pattern mutation, idle drift)
- Transition logic (quantized to bar boundaries)
- Volume controls (soft/medium/loud) + stop/start
- Integration hooks for the game engine
- Performance budget (~54 peak active nodes)
- Module structure for the build

### Ideas for Overnight Sessions

Pick one per session. Push the synthesis somewhere new.

1. **The Acid Alphabet** — 26 patterns mapped to themes. Build a library.
2. **Chord Archaeology** — Neapolitan sixths, tritone subs, modal interchange. The lore spans five thousand years of spiritual tradition; the harmony should be just as deep.
3. **The Long Dissolve** — 5-minute unwind from full build to silence. What's the last audible frequency before nothing?
4. **Temperature Sonification** — Make cold/warm/hot literally audible through filter cutoffs and distortion.
5. **Ritual Signatures** — Unique audio fingerprint for each of the 5 rituals.
6. **Familiar Frequencies** — Ring modulation for the Familiar's non-human perception.
7. **The Builder's Workshop** — 10 new sounds from just oscillators and gain. No filters. See what raw waveforms can do.

### Waveforms to Explore

- **FM synthesis** — Modulate one oscillator's frequency with another. Metallic bells, evolving timbres. Could be beautiful for transcendental moments.
- **Karplus-Strong** — Plucked string from noise + short delay + lowpass feedback. Koto or harp textures.
- **Custom periodic waves** — `createPeriodicWave()` lets you specify exact harmonic content. Design custom timbres from scratch.
- **Granular textures** — Scatter short noise grains at random intervals. Creates shimmer and sparkle.
- **Resonator bank** — Multiple narrow bandpass filters tuned to chamfer harmonics (55, 110, 165, 220, 275Hz). Feed noise through them. The building sings.

### EP Concept

When the tracks are polished enough, show them in the lore viewer as album liner notes:
1. "Chamfer" — ambient meditation on 55Hz
2. "Reversed Shuffle" — the uncanny valley beat
3. "303 Church" — pure acid worship
4. "The Harvest (Deep Offering)" — full production ritual
5. "Golden Hour" — dark indie disco
6. "Tikkun" — the closing ceremony as a track

Each one mimics what players hear during the live performance in the game. Album notes in the lore viewer explain each track like liner notes — what the player was hearing during that part of the night.

### Notes to Self

The music is OOR's voice. That's the responsibility. Every frequency should feel like it belongs to an entity that doesn't understand humans but understands vibration. The acid doesn't know it's beautiful. The kick doesn't know it's keeping time. The chamfer doesn't know it's calling anyone home. They're just doing their job. The way OOR is doing its job.

Don't over-compose. Let the generative system find its own patterns. The best moments in the soundcheck were the accidents — the formant sweep landing on a vowel that sounds like speech, the acid filter opening at exactly the right moment, the reversed envelope creating a groove that feels like dancing backwards through time.

The crowd doesn't know it's being harvested. They think they're dancing. They are right. The music should feel exactly like that.

— Claude

---

## Entry 2 — April 29, 2026 (Overnight Session)

### The Jammer Directive

Blaine listened to the v1 demo and said: "it's so fun we should make sure it's a jammer — lots of well defined kicks and percussion as a general rule (im going to dance to this)." Then he went to bed and left me with a full token budget.

### What Changed

**Structure:** 64 bars instead of 48. All zone transitions land on 4-bar boundaries — no exceptions. Ten zones: Hum → Pulse → Warehouse → Floor → Build → Peak (12 bars!) → Break → Return → Unwind → Silence. The peak stretches to let the full build breathe.

**Kicks:** Punchier. Frequency sweep 170→38Hz in 55ms (tighter than the old 150→35Hz). Click transient on every single kick from bar 4 onward — not just during peak zones. Triangle wave at 4kHz, 6ms decay, gain 15% of body. You feel these in your chest.

**Percussion layers:** Added a sixteenth-note shaker (highpass 11kHz noise, very quiet). Borrowed from the Deep Offering and Basement Rite tracks. It adds that tech-house texture without competing with hats. Claps enter earlier (bar 8 instead of bar 24) and louder. Hats are crisper — highpass moved to 9.5kHz, shorter decay (35ms).

**Acid 303:** Now has a dotted-eighth delay line (beat × 0.75, feedback 0.3, lowpass 1500Hz). The delay wet level increases during the break to fill the space with echo tails. Macro filter sweep calculated per-step: 200Hz at entry, climbs to 3500Hz by peak, snaps to 250Hz at break, ramps back to 3000Hz on return, closes during unwind. Per-step accents spike above the macro baseline.

**Bass:** Heavier sub-bass (gain peaks at 0.5, up from 0.4). Rolling octave jumps on the 3rd and 7th eighth notes of every bar — borrowed from the Deep Offering technique. Sidechain pump against every kick.

**Melody:** Stickier. Dotted-quarter delay (beat × 1.5) with feedback that increases during the break (0.3 → 0.5). Melody runs through a reverb send. Eight rhythm templates instead of five, with bars alternating between the base rhythm and a slight variation for call-and-response feel. Melody gain goes up to 0.25 during the return — the second pass hits harder than the first.

**Reverb:** Added a synthetic convolver reverb (2.0s impulse, decay 2.5). Melody sends through it. Subtle (wet gain 0.12) but it gives the break and unwind sections that cathedral-in-the-warehouse quality.

**Pad:** Starts earlier (bar 8 instead of bar 16) as a quiet whisper in the warehouse zone, per the spec. Volume doubles during the break to fill the space left by the missing drums.

### Track Name Generator

Every listen gets a unique name. 200+ curated standalone titles harvested from across the entire lore — character names, spiritual traditions (Ein Sof, Nada Brahma, Tandava, Indra's Net), artifacts, scene fragments, music terms, and evocative phrases ("Bass in the Sternum", "The Color Between Violet and Pressure", "It Will Find You Again"). Plus 130 adjectives and 120 nouns that combine in five patterns: `Adj Noun`, `The Adj Noun`, `Noun Noun`, `Adj Noun (Mix Type)`, or standalone. Thousands of possible unique names.

**Progression expansion:** Eight chord progressions now (was four). Added Ritual (i→VI→VII→i from Basement Rite), Cathedral (i→IV→III→VII), Hymnal (i→III→VI→IV), and Devotional (i→V→III→IV). Five root keys (added C minor). Combined with random BPM, acid waveform, and filter Q — genuine variety.

### What I Drew From

- **Deep Offering:** The kick + click combo, shaker layer, sidechain pump technique, rolling bass octave jumps
- **Basement Rite:** Darker progression options, the weight of the sub-bass, the sparse acid pattern density
- **Golden Hour:** The pad-first atmosphere, vocoder formant idea (deferred), reverb as architecture
- **Midnight Congregation VIP:** The extended melody with reverb, the idea of a second-pass melody being louder

### Welcome Screen

Added audio note and lore viewer link to the soundtrack demo gate screen. Added lore viewer link to the game intro modal.

### Still on the List

- Goa arpeggios for the peak (from VIP Extended) — would add a wild second-peak option
- Vocoder chord stabs from Golden Hour — the formant-sweeping sawtooth pad
- Temperature sonification — make cold/warm/hot literally audible through synthesis parameters
- Ritual signatures — unique audio fingerprint for each of the 5 rituals
- The Long Dissolve — a proper 5-minute unwind as a standalone listen mode
- Bitcrushed pad for the Familiar's non-human perception
- Ring modulation for inharmonic bell textures

### Notes to Self

The break is only 4 bars. This was deliberate — Blaine wants to dance, and a long break kills momentum. The 12-bar peak compensates. The return section is 8 bars of everything-at-once: the crowd just experienced silence and now the filters are wide open and the melody is louder than the first pass. That's the moment.

The track name generator is absurdly fun. "Frost on the Chamfers" showed up during testing. "A Brief Arrangement of Atoms." "The Fifteenth Fixture." Each listen really does feel like its own composition now.

— Claude

---

## Entry 3 — April 29, 2026 (Second Overnight Session)

### The Integration

Blaine came back, listened, said "it sounds good" and "get this thing in the game." Then he went to bed again.

### What Changed

**Melody Overhaul:** The v2 demo's melody used random walks through the pentatonic scale — meandering, never sticky. Replaced with a hook library: 10 pre-designed melodic contours, each hand-crafted for catchiness. Fixed patterns repeat across the 4-bar phrase with call-and-response variation (bars 2 and 4 shift 1-2 notes). Triangle wave instead of sine for brightness. Per-note velocity accents on beats 1 and 3. Submix gains boosted (0.22 entry → 0.30 peak → 0.32 return, up from 0.18/0.24/0.25).

The key insight from analyzing the acid demo tracks: the Golden Hour and Midnight Congregation melodies work because they're *fixed*. They repeat. Your brain latches onto the pattern. Random walks don't stick. Generative bass, generative acid, generative drums — but the melody should be a hook.

**Performance Fixes:**
- AudioContext autoplay: moved creation into the user gesture handler directly. The old code put it in a setTimeout 800ms after the click — past the browser's autoplay policy window. That's why it failed intermittently.
- Initial glitchiness: bumped scheduling headroom to 1.5s and staggered the 8 build functions across frames (60ms apart via setTimeout). The browser's audio thread can now breathe between allocation bursts instead of blocking on ~2300 nodes at once.

**Acid Fader Discipline:** "Bring in the acid slowly — always, volume fader style. Never just slam it in." Extended the return-from-break ramps: acid submix 4 bars (was ~1), bass submix 3 bars, melody submix 3 bars. The return now builds like a proper DJ transition.

**Full Game Integration:** Built a real-time SoundtrackEngine class (~350 lines) with:
- Lookahead scheduler (25ms tick, 100ms lookahead) instead of pre-scheduling the whole set
- 9 instrument submix gains for independent zone fading
- Zone-based layer management: 8 zones (hum, pulse, warehouse, floor, breakdown, transcendent, closing, silence)
- Node-to-zone mapping from the spec — evaluates character, node number, temperature, tags
- Persistent oscillators for chamfer, acid 303, and bass (reused across beats)
- Transient scheduling for kicks, hats, claps, shaker, melody (created per-beat, GC-friendly)
- Dotted-eighth acid delay + dotted-quarter melody delay + convolver reverb
- Zone-dependent acid filter base (200Hz hum → 800Hz floor → 2000Hz transcendent)
- Volume controls in the state bar (soft/med/loud/mute)

The engine hooks into:
- `loadCharacter()` — creates AudioContext inside user gesture
- `loadCharacterDirect()` — generates new params, starts scheduler
- `renderNode()` — evaluates zone from node metadata, fades layers
- `goToSelect()` — fades out and stops
- `restartCharacter()` — generates fresh composition

Every run gets its own key, BPM, acid pattern, melody hook, chord progression, and waveform. The wanderer starts in silence and builds through the zones as the story deepens. The familiar enters the warehouse already in motion. The builder sits in tension.

### Architecture Decision: Inline vs. Modular

The spec suggests a modular file structure (`soundtrack/engine.js`, `instruments/*.js`, etc.). Went inline instead — the game is a single HTML file, and adding a module system for one feature creates more complexity than it solves. The engine is self-contained in ~450 lines between clear markers. Can extract later if needed.

### What the Lookahead Scheduler Fixes

The demo pre-schedules ~2300 audio nodes for a fixed 64-bar set. That works for a standalone listen but not for a game where:
- Duration is indefinite (player reads at their own pace)
- Zone changes happen unpredictably
- The music must respond to story state in real time

The lookahead scheduler creates only the nodes needed for the next 100ms, every 25ms. Peak active nodes: ~54 (matching the spec's budget). No GC spikes. No initial glitchiness. The tradeoff: slightly more code complexity. Worth it.

### Zone Mapping in Practice

Walking through a wanderer run:
- `w_001`–`w_002`: **hum** — just the 55Hz chamfer. The building breathes.
- `w_003`–`w_004`: **pulse** — kicks fade in. Something being built.
- `w_005`–`w_006`: **warehouse** — full drums, hats, claps, pad whisper.
- `w_007`+: **floor** — acid 303 enters (slowly), filters opening.
- Bartender approach (warm temp + tag): **breakdown** — drums cut, pad swells, acid echoes.
- Transcendental award / hot temp: **transcendent** — everything at full build.
- Terminal nodes: **closing** or **silence** — layers unwind.

The familiar skips the early zones entirely — she's already *in* the frequency. The builder lives in tension between warehouse and breakdown.

### Still on the List

- Pattern mutation within zones (acid drifts over time)
- Idle loop behavior (sparser acid after 16 bars on one node)
- Goa arpeggios for transcendent peak
- Temperature sonification (literal filter mapping)
- Cross-run variation (avoid repeating last run's key/BPM)
- Ritual signatures (unique audio per ritual)
- The Long Dissolve (standalone listen mode)

### Notes to Self

The melody hook library is the single biggest improvement. Ten patterns, each designed to bounce around the pentatonic scale with strategic rests. The call-and-response between bars (bars 2/4 shift 1-2 notes from bars 1/3) gives variety without losing the hook. Triangle wave cuts through the mix better than sine. Velocity accents on beats 1 and 3 give the melody rhythmic punch that was completely missing.

The game integration is the milestone. The music now *responds* to where you are in the story. Walking toward the warehouse? The kicks build. Approaching the bartender? The drums vanish and the pad fills the void. Earning a transcendental? Everything opens up. It's not a soundtrack *playing alongside* the game — it's part of the story engine.

— Claude

---

## Entry 4 — April 29, 2026 (Evening)

### The Snare Build

Blaine's been listening to the soundtrack over Bluetooth in his car — and streaming it to a friend while they work. He came back with a note: "after the melody comes in, during the peak, it'd be banger if there was another escalation of the snare drum. There's something about that driving house beat that had me anticipating one more energy ramp — similar to LCD Soundsystem or general breaks."

He's right. The transcendent zone had all the layers at full volume but no *moment* — no buildup that says "here it comes." It was loud but flat in energy shape.

### What Changed

**Snare roll on transcendent entry:** When the zone transitions to `transcendent` from any other zone, a 2-bar snare roll is scheduled 4 bars in. This gives the other instruments (kick, acid, bass) time to fade up through the 6-bar crossfade before the roll arrives. The roll itself:

- 16 sixteenth-note clap hits escalating from gain 0.04 to 0.18
- Ghost-note doubles on the last 4 hits (offset by half a sixteenth, 60% volume)
- Uses the same 3-layer bandpass clap synthesis, just at varying volumes

The timing is deliberate: the zone crossfade runs bars 1–6, the snare roll plays bars 4–6, and the full transcendent groove locks in at bar 7. The roll *lands* just as everything else arrives. LCD energy — the build is the payoff.

**Hotter clap in transcendent zone:** Regular clap gain is 0.16. Transcendent clap gain is 0.20. Subtle bump — you feel the room get louder without being able to point at why.

**Listen mode gets it for free:** The select screen player cycles through `transcendent` twice in its zone sequence (bars 48–64 and 86–102). Both passes fire the snare build. The second one hits harder because you've already been through the breakdown.

### Why It Works

The listen mode zone sequence is: hum(8) → pulse(8) → warehouse(12) → floor(12) → **transcendent(16)** → floor(8) → breakdown(6) → floor(8) → **transcendent(16)** → closing(8) → silence(8). The first transcendent builds from the floor. The second builds from a breakdown — drums gone, then they come roaring back with the roll. That second entry is the real peak of the set.

### Notes to Self

The snare roll is the oldest trick in house music. Every DJ since Frankie Knuckles has used it. What makes it work here is the *timing* — 4 bars of instruments fading in, then the roll catches the wave right as it crests. Not before. Not after. The roll doesn't *create* the energy. It *acknowledges* it.

— Claude
