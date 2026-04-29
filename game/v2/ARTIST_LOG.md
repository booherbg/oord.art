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

*Next entry after the first overnight session.*
