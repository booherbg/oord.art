# Generative Soundtrack System — Build Specification
**The Call of Sooboont · DJ OOR**
**Draft v0.1 — April 2026**

---

## Vision

A continuous generative soundtrack that responds to story position. Never the same twice. It builds, breathes, shifts, and unwinds in a fractal narrative of its own — a DJ set running alongside the story, reading the room.

Every sound is synthesized in real time from raw waveforms. No samples. No pre-recorded audio. The chamfer frequency (55Hz) runs as a through-line from the first screen to the last. OOR's voice is the music. The music is OOR's voice.

---

## Sonic Zones

The soundtrack operates in 8 zones. Each zone defines which instruments are active, their gain levels, filter states, and behavioral parameters.

### Zone 0: THE HUM
**Active:** Chamfer oscillator (55Hz sine + 110Hz harmonic, LFO-modulated at 0.2Hz)
**Character:** A low, warm presence. The building breathing. You feel it before you hear it.
**Gain:** 0.08–0.12
**Trigger:** Character select screen, early approach nodes, post-portal nodes

### Zone 1: THE PULSE
**Active:** Chamfer + kick drum (sine sweep 150→35Hz in 70ms)
**Character:** Metronomic. Something being built. Distant but inevitable.
**Gain:** Kick 0.4, building to 0.6 over 4 bars
**Trigger:** Approaching the warehouse, early interior nodes

### Zone 2: THE WAREHOUSE
**Active:** Chamfer + kick (full) + hi-hat (noise, highpass 9kHz, offbeat accent) + pad (detuned sine triads, very quiet)
**Character:** Full drums, rhythmic foundation. The room has a pulse. The pad warms the harmonic space underneath.
**Gain:** Kick 0.7, hat 0.09 offbeat / 0.04 downbeat, pad 0.02–0.04
**Trigger:** Inside the warehouse, crowd scenes

### Zone 3: THE FLOOR
**Active:** Zone 2 + 303 acid bassline (square or sawtooth through resonant lowpass, Q 10–18)
**Character:** The acid enters. Squelchy, alive. The 303 filter sweeps through resonant peaks. The dance floor has a voice.
**Gain:** Acid 0.3–0.45 (yields to bass if bass is active)
**Trigger:** Dance floor nodes, OOR visible, crowd moving

### Zone 4: THE BREAKDOWN
**Active:** Chamfer + pad (1.5x normal gain) + sparse acid echoes (gain 0.1, filter closed to 200Hz) + melody delay tails if melody was active
**Character:** The beat drops out. Tension fills the absence. The missing kick is louder than the kick was. This is the bartender. This is the moment before the choice.
**Gain:** No drums. Pad fills the space.
**Trigger:** Bartender scenes, reflective moments, high-stakes choice nodes

### Zone 5: THE TRANSCENDENT
**Active:** All instruments at full build. Kick (+ click transient 3.5kHz) + hat (louder, 0.14 offbeat) + clap (beats 2 & 4) + 303 acid (filter wide open, Q increased) + rolling bass (sawtooth, sidechain-pumped) + sub-bass (sine, following roots) + pad (wider detune ±7 cents) + melody (sine, lowpassed, with dotted-quarter delay)
**Character:** Everything. Full build. The filters are wide, the sidechain is breathing, the melody floats on top. This is the moment the harvest peaks.
**Trigger:** Transcendental award nodes (`awards_transcendental !== null`), temperature `hot`

### Zone 6: THE CLOSING
**Active:** Layers exit in reverse order over 8–16 bars: clap → melody → acid → bass → hat → kick → pad → chamfer alone
**Character:** The long unwind. The acid filter closes slowly (3000→200Hz over 8 bars). The bass sidechain pump gentles. The chamfer swells as other layers recede.
**Trigger:** Portal closing nodes, terminal nodes with `outcome = 'transcendence'` or `outcome = 'harvest'`

### Zone 7: THE SILENCE
**Active:** Chamfer only, fading from 0.08 → 0 over 8 bars. Then nothing.
**Character:** The absence after. The building still resonates but you can feel the emptiness arriving.
**Trigger:** Exit nodes, escape outcomes, post-game state

---

## Node-to-Zone Mapping

Evaluated on every node transition. Uses node metadata, not hardcoded node IDs.

```javascript
function getZone(node, runState, persistentState) {
  // Terminal nodes
  if (node.terminal) {
    if (node.outcome === 'escape') return 'silence';
    return 'closing';
  }

  // Transcendental award overrides everything
  if (node.awards_transcendental) return 'transcendent';

  // Temperature-based override
  if (node.temperature === 'hot') return 'transcendent';

  const char = runState.character;
  const num = parseInt(node.id.split('_')[1]);

  // Bartender / reflective scenes
  if (runState.tags.includes('approached_bartender') &&
      node.temperature === 'warm') return 'breakdown';

  // Character-specific mapping
  if (char === 'wanderer') {
    if (num <= 2) return 'hum';
    if (num <= 4) return 'pulse';
    if (num <= 6) return 'warehouse';
    if (node.temperature === 'cold') return 'pulse';
    return 'floor';
  }

  if (char === 'familiar') {
    if (num <= 2) return 'warehouse';
    if (node.temperature === 'cold') return 'breakdown';
    return 'floor';
  }

  if (char === 'builder') {
    if (num <= 3) return 'warehouse';
    if (node.temperature === 'warm' || node.temperature === 'hot') return 'floor';
    return 'breakdown';
  }

  return 'warehouse';
}
```

### Temperature as Secondary Signal
- **cold** → shift down one zone (floor → warehouse, warehouse → pulse)
- **hot** → transcendent
- **cool/warm** → no override (zone determined by node position)

### Exit Nodes
Any choice leading to departure or any terminal node with outcome `escape` → immediate transition to Zone 7 (THE SILENCE). Unwind is rapid (4 bars) to convey the decisiveness of leaving.

---

## Fractal Micro-Narrative

Within each zone, the music runs its own internal build/release cycle. Staying on one node never sounds static.

### The Phrase Cycle (every 8 bars)
One full pass through the 4-chord progression. Each cycle, parameters vary slightly:

1. **Acid pattern mutation** — 1–2 notes shift pitch. An accent moves to an adjacent step. A slide adds or removes. The core pattern stays recognizable but drifts.

2. **Filter macro breath** — Within each 8-bar phrase, the acid filter base frequency opens (200→800Hz) then resets. Creates a "breathing" independent of zone transitions.

3. **Pad detune drift** — Oscillator detune shifts ±1 cent each phrase. Pad gradually shimmers wider, then narrows.

4. **Kick emphasis** — Every other phrase, beat 1 gains the click transient. Creates a subtle hypermetric accent.

5. **Melodic variation** — Same rhythmic template, but pitch choices drift through the pentatonic scale. The melody wanders within its own contour.

### The Idle Loop
If the player stays on one node for > 16 bars (2 phrase cycles):
- 303 pattern becomes sparser (more rests)
- Pad grows slightly louder
- A second, very quiet acid voice enters (detuned by a 5th, gain 0.05)
- Overall mix gently pulses with a long LFO (0.05Hz)

This prevents wallpaper. The music remains alive during reading and decision-making.

---

## Transitions

### Moving UP (hum → pulse → warehouse → floor → transcendent)
- New layers fade in over 2–4 bars
- Existing layers adjust gain over 1–2 bars
- Continuous elements (chamfer, active oscillators) are uninterrupted

### Moving DOWN (transcendent → floor → warehouse → pulse → hum)
- Layers fade out in reverse order of entry, 2–4 bars each
- Acid filter closes before the acid exits
- Chamfer swells slightly as other layers recede

### Entering BREAKDOWN
- Drums cut immediately (the silence IS the effect)
- Pad crossfades to 1.5x gain over 0.5 seconds
- Acid filter snaps to 200Hz, gain drops to 0.1

### Entering TRANSCENDENT
- All instruments ramp to peak over 0.5 seconds
- A crash noise burst (white noise through bandpass 2–8kHz, 300ms decay) marks the transition
- Acid filter Q increases by 4 (more squelch)

### Timing Quantization
All transitions snap to the next downbeat for musical coherence:
```javascript
function getNextBarTime() {
  const elapsed = ctx.currentTime - setStartTime;
  const currentBar = Math.floor(elapsed / bar);
  return setStartTime + (currentBar + 1) * bar;
}
```

---

## Controls

### Volume
Three levels, presented as small text buttons:
- **SOFT** — masterGain = 0.25
- **MEDIUM** — masterGain = 0.5 (default)
- **LOUD** — masterGain = 0.8

Volume changes crossfade over 0.3 seconds.

### Stop / Start
- **STOP** — Closes AudioContext immediately. Total silence. No fade.
- **START** — Creates fresh AudioContext, generates new parameters, begins from THE HUM. Every restart is a new composition.

### UI Placement
Bottom-right corner of the game. Small, unobtrusive. Never overlapping prose text. Text buttons only — no icons except a stop/play toggle.

### Welcome Note Text
Add to the opening screen:
> *Music plays during this experience. You can adjust volume or pause at any time using the controls in the corner.*

---

## Integration with Game Engine

### Initialization
On first user interaction (welcome screen click), satisfying browser autoplay policy:
```javascript
const soundtrack = new SoundtrackEngine();
soundtrack.init(); // creates AudioContext
soundtrack.setZone('hum');
```

### Node Transition Hook
In `renderNode()`, after the node is displayed:
```javascript
function renderNode(nodeId) {
  // ... existing rendering code ...
  const zone = getZone(nodeMap[nodeId], run, persistent);
  soundtrack.setZone(zone);
}
```

### Run-Level Parameters
Generated once per run, stored in `run.soundtrack`:
```javascript
run.soundtrack = {
  key: 45,                    // MIDI root (A2)
  bpm: 122,
  progression: [0, 8, 3, 10], // semitone offsets from root
  acidPattern: [...],          // 16-step array
  melody: [...],               // 4 bars × 8 eighth notes
  acidWaveform: 'sawtooth',
  acidQ: 14.5,
};
```

### Cross-Run Variation
Subsequent runs avoid repeating the last run's key and BPM (±4 minimum). Store `persistent.lastSoundtrack = { key, bpm }` and filter during generation.

---

## Technical Architecture

### Module Structure
```
game/v2/soundtrack/
├── engine.js          # SoundtrackEngine class
├── instruments/
│   ├── chamfer.js     # 55Hz hum + harmonic + LFO
│   ├── drums.js       # Kick (+ click transient), hat, clap
│   ├── acid.js        # 303 bassline
│   ├── bass.js        # Rolling bass + sub (sidechain)
│   ├── pad.js         # Detuned sine triads
│   └── melody.js      # Melody + delay
├── generator.js       # Parameter generation
├── zones.js           # Zone definitions and transition logic
└── utils.js           # Noise buffers, impulse responses, curves
```

### Audio Graph
```
[instruments] → [instrument gains] → [zone submix] →
                                      [reverb send] → [convolver] → [reverb return] →
                                      masterGain → compressor → destination
                                      masterGain → analyser (visualization)
```

Compressor: threshold -8dB, ratio 6:1, knee 12dB (from soundcheck).

### Performance Budget
Target: < 200 active AudioNodes at peak.

| Instrument | Continuous Nodes | Transient (per beat) |
|---|---|---|
| Chamfer | 4 (2 osc + LFO + gain) | — |
| Kick | — | 4 (body osc + click osc + 2 gains) |
| Hat | — | 3 (source + filter + gain) |
| Clap | — | 9 (3 layers × 3 nodes) |
| Acid | 4 (osc + filter + noteGain + submix) | — |
| Bass | 6 (2 osc + filter + 3 gains) | — |
| Pad | 12 (3 voices × 3 detuned osc + 3 gains) | — |
| Melody | — | 3 per note (osc + filter + gain) |
| Delay | 3 (delay + filter + feedback) | — |
| Reverb | 2 (convolver + gain) | — |
| Master | 3 (gain + comp + analyser) | — |

Peak active: ~34 continuous + ~20 transient = ~54 nodes. Well within budget.

### Scheduling
Lookahead scheduler for real-time zone changes with sample-accurate timing:

```javascript
class Scheduler {
  constructor(ctx, bpm) {
    this.beat = 60 / bpm;
    this.nextBeat = ctx.currentTime;
    this.lookahead = 0.1; // 100ms
  }

  start() {
    this.timer = setInterval(() => this.advance(), 25);
  }

  advance() {
    while (this.nextBeat < this.ctx.currentTime + this.lookahead) {
      this.onBeat(this.nextBeat, this.beatCount);
      this.nextBeat += this.beat;
      this.beatCount++;
    }
  }
}
```

---

## Synthesis Reference

### Constants
```
CHAMFER_HZ  = 55           A1, the building's resonant frequency
BPM_RANGE   = [118, 126]   house tempo
BEAT        = 60 / BPM
BAR         = BEAT × 4
```

### 303 Acid (from soundcheck Phase 3b)
- Oscillator: square or sawtooth (random per run)
- Filter: lowpass, Q 10–18 (random per run)
- Pattern: 16 steps from minor scale, generated fresh
- Filter per step: accent peak (2500–3500Hz) → base (200–400Hz) over 2.5 sixteenths
- Slide: frequency glide over 80% of sixteenth duration

### Kick (from soundcheck + track production guide)
- Body: sine 150→35Hz exponential sweep in 60–70ms
- Click transient: triangle 3.5kHz, 7ms decay (added in Zone 5+)
- Gain: 0.7, exponential decay 220ms

### Rolling Bass (from track production guide)
- Sawtooth + square (octave up, gain 0.25) → lowpass Q:4 → sidechain gain
- Sidechain: duck to 0.03 on kick, exponential swell to 0.75 over 65% of half-beat
- Filter pump: 600Hz on beats, 1600Hz on offbeats, exponential close
- Follows chord roots, changes every 2 bars

### Reversed Shuffle (from soundcheck Phase 3)
- Reserved for specific ritual moments (OOR Slide, special nodes)
- Swell from 0.01 to peak at 85% of beat, hard cut at 90%
- Not part of the generative background — too distinctive

### Vocoder (from soundcheck Phase 4)
- Reserved for soundcheck easter egg and specific builder nodes
- Not part of the generative system

---

## Future Ideas & Overnight Jam Session Notes

### Waveform Exploration
- **Custom periodic waves** — `createPeriodicWave()` with custom harmonic spectra: even-only (hollow organ), odd-only (clarinet), harmonics that shift via crossfading between periodic waves
- **FM synthesis** — One oscillator modulating another's frequency. Metallic, bell-like tones for transcendental moments. Classic DX7 territory.
- **Karplus-Strong** — Plucked string from noise burst through short delay with lowpass feedback. Harp or koto textures for the Familiar path.
- **Granular shimmer** — Short noise grains (5–20ms) at random intervals and pitches. "Sparkle" effect for transcendental peaks.

### New Instrument Ideas
- **Dub delay** — Dotted quarter, feedback 0.5+, delay time modulated by 0.1Hz LFO. Swirling spatial effect. Beautiful during closing.
- **Bitcrushed pad** — Reduce sample rate of pad output. Lo-fi degraded texture for the Familiar's non-human perception.
- **Vocoded chord stabs** — Short chord hits through the soundcheck vocoder chain. Robotic filtered accents. Signature DJ OOR.
- **Resonator bank** — Narrow bandpass filters tuned to chamfer harmonics (55, 110, 165, 220, 275Hz). Feed noise through them. Singing-bowl quality tied to the building.

### Overnight Session Experiments

1. **The Acid Alphabet** — Generate 26 acid patterns, one per letter. Map to story themes. "A" for aggressive, "Z" for zen. Store the best.

2. **Chord Archaeology** — Unusual progressions: Neapolitan sixths, tritone subs, modal interchange. The lore draws from many traditions; the harmony should too.

3. **The Long Dissolve** — A 5-minute unwind deconstructing full build to silence. Experiment with layer exit order, filter close rates, the last audible frequency.

4. **Temperature Sonification** — Map temperature directly to synthesis: cold = lowpass cutoff drops, warm = filter opens, hot = distortion increases. Make temperature literally audible.

5. **Ritual Signatures** — Audio identity for each ritual: The Opening = rising sine sweep. The Mating Ritual = reversed shuffle. The OOR Slide = vocoder call. The Dance Circle = spinning stereo pan. The Closing = the long dissolve.

6. **Familiar Frequencies** — Ring modulation (multiply two signals → sum/difference frequencies). Inharmonic bell/gong textures. The Familiar doesn't hear like a human.

7. **The Builder's Workshop** — 10 new sounds from scratch: only sine, sawtooth, square, triangle, noise. No filters. No effects. Just oscillators and gain. See what emerges from constraint.

### EP Track Concepts (for lore expansion)

When ready to showcase in the lore viewer as album liner notes:

1. **"Chamfer"** — 55Hz extended into 4-minute ambient meditation. Just the hum, harmonics, LFO. The building breathing.
2. **"Reversed Shuffle"** — The uncanny valley beat, extended and evolved. Backwards envelopes, formant sweeps. 5 minutes.
3. **"303 Church"** — Pure acid worship. 8 minutes of filter sweeps over four-on-the-floor. Just the machine praying.
4. **"The Harvest (Deep Offering)"** — Full production: drums → acid → bass → melody → break → return. The whole ritual.
5. **"Golden Hour"** — Dark indie disco. Pad-first, atmosphere-heavy, delay-drenched. The bartender's soundtrack.
6. **"Tikkun"** — The closing ceremony as a track. Full build to long dissolve. The last sound is 55Hz fading to silence.

---

## Build Order

1. **Phase 1: Engine scaffold** — `SoundtrackEngine` class with `init()`, `setZone()`, `setVolume()`, `stop()`. Zone-based gain management. No instruments yet — just the architecture.

2. **Phase 2: Chamfer + kick** — Zones 0–1. The hum and the pulse. Test zone transitions.

3. **Phase 3: Full drums + pad** — Zone 2. Hat, clap scheduling. Pad synth with chord changes.

4. **Phase 4: Acid 303** — Zone 3. Pattern generation, filter sweeps, slides and accents.

5. **Phase 5: Bass + sub** — Sidechain ducking, filter pump, chord following.

6. **Phase 6: Melody + delay** — Zone 5. Pentatonic generation, dotted-quarter delay with feedback.

7. **Phase 7: Breakdown + transcendent** — Zones 4 and 5. Drum muting, gain adjustments, crash noise burst.

8. **Phase 8: Closing + silence** — Zones 6 and 7. Layer exit sequencing, long acid unwind, chamfer fade.

9. **Phase 9: Fractal micro-narrative** — Pattern mutation, idle drift, phrase-level variation.

10. **Phase 10: UI + welcome note** — Volume controls, stop/start, welcome text.

---

*Build in a separate branch. Merge when stable.*
