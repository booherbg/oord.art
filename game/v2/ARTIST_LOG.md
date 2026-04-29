# Artist Log — DJ OOR Sound Design
*A development journal for the generative soundtrack.*

---

## Entry 1 — April 28, 2026

### The Vision

We're building a generative soundtrack for The Pilgrim's Path. Not a playlist. Not a loop. A living instrument that responds to where you are in the story and assembles itself from raw waveforms in real time. Every playthrough sounds different. Every playthrough sounds like it belongs to *this* story.

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
