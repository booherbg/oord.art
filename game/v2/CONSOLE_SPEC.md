# TIKKUN SYNTHESIZER CONSOLE -- PARAMETER CATALOG

Standalone web page exposing the Tikkun track as a live performance instrument.
Loads with kick running. Each layer has a master on/off toggle plus underlying knobs.

---

## SHARED INFRASTRUCTURE

### Master Bus
- **Compressor**: threshold -8 dB, ratio 6:1, knee 12 dB (fixed -- not exposed)
- **Master Gain**: default 0.5, range 0.0--1.0 (expose as master volume)

### Reverb Bus (room)
- Impulse duration: 2.5s, decay factor 2.0
- Wet level: 0.18
- **Expose**: wet level (0.0--0.5, default 0.18)

### Bell Reverb Bus (hall)
- Impulse duration: 5.0s, decay factor 1.8
- Wet level: 0.40
- **Expose**: wet level (0.0--0.7, default 0.40)

### Global Timing
- **BPM**: 120 (expose, range 90--150, default 120)
- Derived: beat = 60/bpm, bar = beat*4, sixteenth = beat/4

### Tonality (generative, set once per session)
- Root note: picked from [36, 38, 41, 43, 45] (MIDI C2, D2, F2, G2, A2)
- Chord progression: picked from 8 presets, 4-chord cycle
- Scale: natural minor
- **Expose**: root selector (dropdown of the 5 roots), progression selector (dropdown/index 0--7)
- These require re-init on change; not real-time knobs

---

## LAYER 1: KICK

Source: sine oscillator, pitch sweep 150 Hz -> 35 Hz over 60ms. Optional click layer (triangle at 3500 Hz, very short burst).

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume (peak) | 0.78 (at PEAK) | 0.2--1.0 | YES | Primary control |
| Click on/off | true | bool | YES | Adds high-end attack transient |
| Click level | vol * 0.08 | 0.02--0.20 (multiplier) | YES | Relative to kick vol |
| Pitch start | 150 Hz | 100--300 Hz | YES | Higher = snappier attack |
| Pitch end | 35 Hz | 20--60 Hz | YES | Lower = more sub thump |
| Pitch sweep time | 0.060s | 0.02--0.15s | YES | Shorter = punchier |
| Decay time | 0.22s | 0.08--0.5s | YES | Tail length |
| Osc type | sine | fixed | NO | Sine is the right choice |

**Pattern**: fires on every beat (quarter note). Fixed -- no per-step pattern exposed.

---

## LAYER 2: SNARE / CLAP

Two instruments sharing a layer toggle.

### Clap
Source: 3 staggered noise bursts through bandpass filters (1200, 1600, 2000 Hz), Q=1.5. Stagger offset 7ms per layer.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | 0.18 | 0.05--0.4 | YES | |
| BP center | 1200 Hz (base) | 800--2000 Hz | YES | Shifts all 3 bands together |
| BP Q | 1.5 | 0.5--4.0 | MAYBE | Wider Q = more open clap |
| Decay | 0.11s | 0.05--0.25s | YES | |
| Layer stagger | 7ms | 3--15ms | NO | Subtle; keep fixed |

**Pattern**: beats 2 and 4 (backbeat). Fixed.

### Snare
Source: noise body (BP at 500 Hz, Q=0.8) + 4 noise rings (BP 900--2400 Hz, Q=2) + square click at 1800 Hz. Used for fills, not steady pattern.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | varies (fill context) | 0.05--0.35 | YES | |
| Body BP freq | 500 Hz | 300--800 Hz | YES | Tunes the body |
| Ring BP base | 900 Hz | 600--1500 Hz | NO | Keep fixed |
| Body decay | 0.2s | 0.08--0.4s | YES | |
| Click level | vol * 0.4 | 0.1--0.6 (mult) | NO | Keep fixed |

**Pattern**: fills only (pre-transition bars). Not a steady voice.

---

## LAYER 3: HATS / SHAKER

### Hi-Hat
Source: noise buffer through highpass at 9500 Hz. Very short decay.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume (on-beat) | 0.065 | 0.02--0.15 | YES | |
| Volume (off-beat) | 0.13 | 0.04--0.25 | YES | Off-beats are louder |
| HP frequency | 9500 Hz | 6000--14000 Hz | YES | Lower = darker hat |
| Decay | 0.035s | 0.015--0.08s | YES | Longer = open hat character |

**Pattern**: eighth notes, off-beats louder. Fixed grid.

### Shaker
Source: noise buffer through highpass at 11000 Hz. Even shorter than hat.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume (on-beat) | 0.018 | 0.005--0.04 | YES | |
| Volume (off-beat) | 0.008 | 0.002--0.02 | YES | |
| HP frequency | 11000 Hz | 8000--15000 Hz | MAYBE | Mostly texture |
| Decay | 0.025s | 0.01--0.05s | NO | Keep short |

---

## LAYER 4: BASS

Source: sawtooth oscillator + square oscillator (one octave up, mixed at 0.25). Sub oscillator (sine, one octave below root). All through lowpass filter.

Sidechain pump: gain ducks to 0.03 on beat attack, recovers over beat*0.325. Filter sweeps closed on each beat.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Peak volume | 0.65 | 0.2--0.9 | YES | Overall bass level |
| Sub level | peak * 0.67 | 0.3--1.0 (mult) | YES | Sub-octave blend |
| Octave osc level | 0.25 | 0.0--0.6 | YES | Grit/harmonics amount |
| Filter cutoff (open) | 500--1000 Hz | 200--2000 Hz | YES | Alternates odd/even beats |
| Filter cutoff (closed) | 350 Hz | 150--600 Hz | YES | Where it sweeps down to |
| Filter Q | 4 | 1--12 | YES | Resonance |
| Sidechain depth | ducks to 0.03 | 0.01--0.15 | YES | How deep the pump goes |
| Sidechain recovery | beat * 0.325 | 0.15--0.45 (as beat fraction) | YES | Speed of pump release |
| Osc type (main) | sawtooth | saw/square/triangle | MAYBE | Character change |
| Osc type (octave) | square | saw/square/triangle | NO | Keep fixed |

**Pattern**: follows chord root, fires on every beat. Octave jumps on specific eighth-note positions from mid-VESSEL onward.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Octave jump on/off | true (from bar 16+) | bool | MAYBE | |

---

## LAYER 5: PADS

Source: per-note sine oscillators with detuned unison voices. Triggered every 2 bars, duration = min(2*bar, 5s). Slow attack (0.6s) and release (0.6s).

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | 0.040 (at PEAK) | 0.01--0.08 | YES | Quiet by design |
| Detune (cents) | 7 (at PEAK) | 0--20 | YES | Width/chorus effect |
| Voice count | 3 | 1/2/3 | MAYBE | Thins or thickens |
| Attack time | 0.6s | 0.1--2.0s | YES | |
| Release time | 0.6s | 0.1--2.0s | YES | |
| Osc type | sine | sine/triangle | MAYBE | Triangle adds overtones |
| Reverb send | on (in INTRO/VOID/DISSOLVE) | bool | YES | |

**Pattern**: fires every 2 bars on first sixteenth. Voices follow the 4-chord progression.

---

## LAYER 6: ACID (GOA)

Source: single oscillator (sawtooth or square, 50/50 random) through resonant lowpass filter. Stereo panner with slow LFO. Delay effect with feedback.

### Oscillator / Filter

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Waveform | random: saw or square | saw/square | YES | Fundamental character |
| Filter Q (resonance) | random 10--18 | 4--25 | YES | The acid scream |
| Filter base freq | phase-dependent (400--2200) | 200--4000 | YES | How open the filter sits |
| Filter accent peak offset | +1800 Hz (accent), +600 Hz (normal) | 400--3000 | YES | Accent intensity |
| Filter decay target | base * 0.45 | 0.2--0.7 (as multiplier) | YES | How far filter closes |
| Filter envelope time | sixteenth * 2.5 | 1.5--4.0 (as sixteenth mult) | YES | Decay speed |
| Note volume (peak) | 0.45 | 0.15--0.7 | YES | |
| Accent volume multiplier | 1.0 (accent) / 0.6 (normal) | 0.4--1.0 | MAYBE | |

### Stereo Pan LFO

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Pan LFO rate | 0.05 Hz | 0.01--0.3 Hz | YES | Slow sweep speed |
| Pan LFO depth | 0.5 | 0.0--1.0 | YES | Stereo width |

### Delay

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Delay time | beat * 0.75 (dotted eighth) | 0.5--1.5 (as beat mult) | YES | |
| Delay feedback | 0.32 | 0.0--0.65 | YES | Past 0.65 risks runaway |
| Delay filter | 1500 Hz LP | 600--4000 Hz | YES | Darkness of repeats |
| Delay wet level | 0.16 (at GATHER) | 0.0--0.4 | YES | |

### 32-Step Goa Pattern (generative)

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Rest probability | 0.13 | 0.0--0.35 | YES | Pattern density |
| Accent prob (downbeat) | 0.55 | 0.2--0.9 | YES | Rhythmic emphasis |
| Accent prob (other) | 0.18 | 0.05--0.4 | YES | |
| Slide probability | 0.45 | 0.1--0.7 | YES | Legato amount |
| Downbeat accent force prob | 0.7 | 0.3--1.0 | MAYBE | |
| Direction reversal range | 3 semitones | 2--7 | NO | Melodic contour |
| Regenerate button | n/a | trigger | YES | New pattern from same scale |

---

## LAYER 7: MELODY / PLUCK

Two sub-voices: FM pluck (primary, VESSEL through DESCENT) and triangle melody (DISSOLVE only).

### FM Pluck
Source: sine carrier + sine modulator at 2x frequency (octave). Fast FM decay gives kalimba/prepared-piano attack. Stereo panned randomly per note.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume (head notes) | 0.62 | 0.2--0.9 | YES | Strong beats |
| Volume (fill notes) | 0.42 | 0.15--0.7 | YES | Weaker beats |
| FM mod depth (attack) | freq * 1.2 | 0.5--3.0 (as freq mult) | YES | Attack brightness |
| FM mod decay | 0.12s | 0.04--0.3s | YES | How fast pluck mellows |
| FM mod floor | freq * 0.02 | 0.01--0.1 (as freq mult) | NO | Keep low |
| Note duration | beat * 0.85 | 0.5--1.5 (as beat mult) | YES | |
| Pan spread | +/-0.35 | 0.0--0.8 | YES | Stereo image width |
| Reverb send | 0.15 | 0.0--0.6 | YES | Bloom into room reverb, ramps during MEND |

### Pluck Delay

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Delay time | beat * 1.5 +/- 8ms jitter | 0.5--2.0 (as beat mult) | YES | |
| Delay feedback | 0.28 | 0.0--0.55 | YES | |
| Delay filter | 1800 Hz LP | 800--4000 Hz | YES | |

### Triangle Melody (DISSOLVE farewell voice)
Source: triangle oscillator through 2500 Hz lowpass. Slow attack, long decay. Own delay bus.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | 0.45 | 0.15--0.7 | YES | |
| LP cutoff | 2500 Hz | 1000--5000 Hz | MAYBE | |
| Attack | 0.15s | 0.05--0.5s | YES | |
| Decay | beat * 1.5 | 1.0--2.5 (as beat mult) | YES | |
| Note drop probability | linear with phase progress | 0.0--0.8 | MAYBE | |
| Delay feedback | 0.45 | 0.2--0.6 | YES | Higher than pluck delay |
| Delay filter | 2200 Hz LP | 1000--4000 Hz | YES | |

### Melody Generation (generative, set per session)

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Hook pattern | picked from 10 presets | dropdown/index 0--9 | YES | Melodic contour |
| Variation amount | +/-1 semitone on chord 2/4 | 0--3 | MAYBE | |
| Regenerate button | n/a | trigger | YES | New melody from same hook |

---

## LAYER 8: CHAMFER (DRONE)

Source: two sine oscillators at CHAMFER_HZ (55 Hz = A1) and 2x harmonic (110 Hz). Slow LFO modulates envelope gain.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Fundamental freq | 55 Hz | 27.5--110 Hz | YES | Drone pitch (A0--A2) |
| Harmonic level | 0.12 | 0.0--0.3 | YES | Second partial blend |
| Envelope level | 0.05 (VESSEL) | 0.02--0.15 | YES | Overall drone volume |
| LFO rate | 0.2 Hz | 0.05--0.8 Hz | YES | Shimmer speed |
| LFO depth | 0.008 | 0.0--0.03 | YES | Shimmer amount |

**Behavior**: always present, level changes per phase. Fades out over final 24 bars.

---

## LAYER 9: RESONATOR BANK (SING phase)

Source: 5 sine oscillators at CHAMFER_HZ harmonics (1x through 5x). Each fades in staggered, then cross-modulates volume via slow sine function.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| On/off | off until SING | bool | YES | Enable/disable the bank |
| Harmonic count | 5 | 3--8 | MAYBE | More = denser chord |
| Base volume | 0.22 | 0.08--0.4 | YES | Divided by harmonic number |
| Stagger time | 2 bars each | 1--4 bars | MAYBE | Entrance spacing |
| Modulation depth | 0.35 | 0.0--0.5 | YES | Amplitude breathing |
| Modulation rate | 0.10 * barNum | 0.05--0.20 | MAYBE | |
| Fade-in time | 6 bars | 2--12 bars | NO | Keep musical |

---

## LAYER 10: BELLS / SHATTER (EVENTS)

One-shot voices triggered at structural moments. Not looping layers.

### Bell
Source: FM synthesis -- sine carrier, sine modulator at freq * 1.41421 (sqrt(2) ratio). Mod depth decays from freq*2.4 to freq*0.04 over 4.5s.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | 0.11--0.20 | 0.05--0.35 | YES | |
| FM ratio | 1.41421 | 1.0--3.0 | MAYBE | Inharmonicity |
| FM depth start | freq * 2.4 | 1.0--4.0 (mult) | MAYBE | Attack brightness |
| FM depth end | freq * 0.04 | 0.01--0.1 (mult) | NO | |
| Total decay | 5.5s | 2.0--8.0s | YES | Ring time |
| Manual trigger | n/a | button | YES | Play a bell on demand |

### Shatter (glass burst)
Source: noise buffer through highpass, sweeping 2200--11000 Hz.

| Parameter | Default | Range | Expose? | Notes |
|-----------|---------|-------|---------|-------|
| Volume | 0.28 | 0.1--0.5 | MAYBE | |
| HP start | 2200 Hz | 1000--5000 Hz | NO | |
| HP end | 11000 Hz | 6000--16000 Hz | NO | |
| Decay | 1.4s | 0.5--3.0s | MAYBE | |
| Manual trigger | n/a | button | YES | Useful for live performance |

---

## PHASE STRUCTURE / TRANSPORT

The track is 400 bars at 120 BPM (~13:20). Phases control which layers are active and their gain envelopes.

| Phase | Bars | Duration | Active Layers |
|-------|------|----------|---------------|
| INTRO | 0--7 | 0:00--0:16 | Chamfer, Pad |
| VESSEL | 8--39 | 0:16--1:20 | +Bass, +Kick (bar 16), +Hat (16), +Clap (24), +Pluck (32), acid tease (24) |
| SHATTER | 40 | 1:20--1:22 | Glass burst + 3 bells, everything cuts |
| VOID | 41--56 | 1:22--1:52 | Chamfer only, 1 bell at midpoint |
| GATHER | 57--88 | 1:52--2:56 | +Acid (Goa), +Hats (bar 61), +Shaker (69), +Bass (bar 81) |
| MEND | 89--168 | 2:56--5:36 | +Kick+Hats+Shaker (89), +Clap+Pluck (97), full drive (105+) |
| PEAK | 169--264 | 5:36--8:48 | Everything locked at full energy |
| DESCENT | 265--304 | 8:48--10:08 | Elements fade out in order |
| DISSOLVE | 305--344 | 10:08--11:28 | Triangle melody enters, acid/bass/pluck say goodbye |
| SING | 345--376 | 11:28--12:32 | Resonator bank, chamfer |
| HUM | 377--400 | 12:32--13:20 | Chamfer alone, fading to silence |

### Console transport model
- Timeline scrubber showing current bar and phase name
- Phase jump buttons (click to jump to any phase start)
- The console overrides phase-based gain automation: if a layer is toggled ON, it stays on regardless of phase. Phase structure becomes a suggestion/preset system, not a gate.
- "Restore phase automation" button re-engages the composed envelope for all layers

---

## CONSOLE DESIGN NOTES

### What loads immediately
Kick fires on beat 1 at default volume. Chamfer drone is on. Everything else starts toggled off. This gives the performer a pulse to build from.

### Recommended knob groupings per layer strip
1. **Toggle** (on/off, large)
2. **Volume** (main fader)
3. **Tone** (the single most character-defining parameter: filter cutoff for bass/acid, HP freq for hats, detune for pads, FM depth for pluck)
4. **Shape** (envelope/decay time)
5. **Expanded panel** (click to reveal remaining parameters)

### Parameters that should stay fixed
- Oscillator types for kick (sine), hat/clap/snare (noise), chamfer (sine), pads (sine), resonator bank (sine)
- Clap layer stagger timing
- Snare internal ring filter structure
- Bell FM depth floor
- Sidechain timing relationship to beat grid

### Generative elements requiring regenerate buttons
- Goa acid 32-step pattern
- Melody hook + variations
- Chord progression selection
- Root note selection
- All four share a single "re-roll all" button plus individual regenerate triggers

### Sidechain as a global control
The bass sidechain pump is baked into `pumpBass()`. For the console, expose sidechain as a global parameter pair (depth + recovery) that affects bass behavior regardless of which phase is active.
