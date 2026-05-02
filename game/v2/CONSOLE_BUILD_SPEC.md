# TIKKUN MACHINE — Console Build Specification

**Chamfer 055 / DJ OOR**
**Draft v1.0 — May 2026**

---

## 1. SPIRIT OF THE PROJECT

This is an easter egg inside an easter egg. The Chamfer 055 EP is already a hidden bonus inside a browser game. The Tikkun Machine takes one track from that EP and turns it into a playable instrument. It exists because it's fun to build and fun to play. That's the whole justification.

### How we got here

The project started as a generative Web Audio soundtrack for a browser-based interactive fiction game (The Call of Sooboont). The soundtrack grew into a 5-track EP — 303 Church, The Harvest, Golden Hour, Drift, and Tikkun — all synthesized in real time from raw waveforms. No samples, no recordings. Every frequency generated from sine, sawtooth, square, triangle, and noise.

Now we're taking Tikkun — the closing track, the 13-minute arc of build/break/gather/mend — and exposing its guts as a live performance console. Every layer. Every parameter. Every knob that matters.

### What it is (and isn't)

The Tikkun Machine is a **toy that happens to sound incredible**. It is not a DAW. It is not a production tool. It is not trying to compete with Ableton or VCV Rack. It's a dance party in a box — a single page you open, and within seconds you're building a track that grooves.

The key insight is the **center concept**: every control has a home position that recreates the original composed track. You can twist every knob to the extremes and never get lost — just twist back. The song is always there, waiting. This means the console is approachable even if you've never touched a synthesizer. Hit play. Things sound good. Start exploring.

### Future vision

This architecture is designed with portability in mind:

- **All five tracks** could get their own console pages, each reflecting the unique character of that track (303 Church would be all about the filter; Drift would be about delay feedback and absence).
- **Hardware port**: the parameter set maps cleanly to physical controls. A Daisy Seed or RP2350 running Rust/CircuitPython could drive the same audio engine through real knobs and faders on a custom PCB. The web version is the prototype for that.
- **But start with Tikkun**. Tikkun has the richest structure (11 phases, 10 layers, the shatter/rebuild arc) and the most interesting interplay between layers. If the console works for Tikkun, it works for everything.

---

## 2. INTERFACE LAYOUT

The console occupies a single full-screen page. Think: a mixing desk that someone built into a piece of furniture in 1983 and it still works perfectly. Warm, dark, alive with light.

### 2.1 Overall Grid

```
┌─────────────────────────────────────────────────────────────┐
│  TRANSPORT BAR                                               │
│  [▶ PLAY] [■ STOP]  BPM: [120]  ROOT: [A2 ▼]  PROG: [3 ▼] │
├─────────────────────────────────────────────────────────────┤
│  PHASE BAR                                                   │
│  [VESSEL] [GATHER] [MEND] [PEAK] [DESCENT] [DISSOLVE]      │
│  [SING] [HUM]   ──────────────────────────   [⟲ RESTORE]   │
├────┬────┬────┬────┬────┬────┬────┬──────────┤
│KICK│SNARE│HATS│BASS│PADS│ACID│PLUCK│ MASTER  │
│    │CLAP │    │    │    │    │MELODY│         │
│ ◉  │ ◉  │ ◉  │ ◉  │ ◉  │ ◉  │  ◉  │         │
│    │     │    │    │    │    │     │ CHAMFER  │
│ ▊▊ │ ▊▊  │ ▊▊ │ ▊▊ │ ▊▊ │ ▊▊ │ ▊▊  │  ◉ drn │
│    │     │    │    │    │    │     │ RESON.   │
│[VOL]│[VOL]│[VOL]│[VOL]│[VOL]│[VOL]│[VOL] │  ◉ bank│
│    │     │    │    │    │    │     │         │
│(k1)│(k1) │(k1)│(k1)│(k1)│(k1)│(k1) │[MSTR VOL]│
│(k2)│(k2) │(k2)│(k2)│(k2)│(k2)│(k2) │         │
│(k3)│     │(k3)│(k3)│(k3)│(k3)│(k3) │ SIDECHAIN│
│    │     │    │    │    │    │     │ (depth)  │
│[▸] │[▸]  │[▸] │[▸] │[▸] │[▸] │[▸]  │ (recov.) │
│    │     │    │    │    │    │     │         │
│    │     │    │    │    │    │     │ REVERB   │
│    │     │    │    │    │    │     │ (room)   │
│    │     │    │    │    │    │     │ (hall)   │
│    │     │    │    │    │    │     │         │
│    │     │    │    │    │    │     │ [🔔 BELL]│
│    │     │    │    │    │    │     │ [💥SHATTR]│
│    │     │    │    │    │    │     │         │
│    │     │    │    │    │    │     │ [⟳ REROLL│
│    │     │    │    │    │    │     │   ALL]   │
└────┴─────┴────┴────┴────┴────┴─────┴─────────┘
```

### 2.2 Channel Strip Anatomy (7 strips)

Each of the 7 channel strips follows the same visual structure, top to bottom:

1. **Layer label** — e.g. "KICK", "ACID", "PLUCK" in monospace caps
2. **Power toggle** — a large illuminated circular button (diameter ~44px touch target). Glows amber when ON, dim when OFF. This is the most important control on each strip.
3. **Spectrum visualizer** — a small (strip-width x 40px) real-time EQ display showing that layer's audio output. Segmented LED-bar style with 8-12 frequency bands. Green-to-amber gradient. Peak hold dots.
4. **Level fader** — a vertical slider (the layer's submix gain). Full range 0.0-1.0. The fader track should glow faintly with the layer's color.
5. **Macro knobs** (2-3 per strip) — round knob controls, each labeled underneath. These are the most character-defining parameters for that layer. See Section 4 for per-layer assignments.
6. **Expand button** — a small [+] or [▸] toggle that reveals an expanded panel below the strip with the remaining parameters for that layer. Collapsed by default.
7. **Expanded panel** (hidden by default) — additional knobs/sliders for deeper parameters. Opens as a dropdown below the strip, pushing content down.

### 2.3 Master Section

The rightmost column, slightly wider than the channel strips. Contains:

- **Master volume** fader
- **Chamfer (drone)** — power toggle + volume knob + frequency knob (27.5-110 Hz) + LFO rate knob
- **Resonator Bank** — power toggle + volume knob + modulation depth knob
- **Sidechain Pump** — depth knob + recovery knob (these are global, affecting bass behavior)
- **Reverb sends** — room wet level knob, hall wet level knob
- **Bell trigger** — a large, satisfying button. Press it and a bell rings. Labeled "BELL" with an LED that flashes on trigger.
- **Shatter trigger** — a large, satisfying button. Triggers the glass burst, kills all layer toggles except chamfer, enters VOID mode. Labeled "SHATTER" with a red LED flash.
- **Re-roll All** — regenerates acid pattern, melody, chord progression, and root note. LED spins while regenerating.

### 2.4 Transport Bar

Fixed at the top of the page. Contains:

- **Play/Stop** — large toggle button. Play starts the scheduler; Stop kills all audio.
- **BPM** — numeric input or knob, range 90-150, default 120. Changes take effect on next bar boundary.
- **Root note selector** — dropdown: C2, D2, F2, G2, A2 (MIDI 36, 38, 41, 43, 45). Requires re-init of chord/melody on change.
- **Progression selector** — dropdown, indices 0-7 (the 8 PROGS presets). Requires re-init.
- **Current bar** — numeric display showing bar number
- **Current phase** — text display showing phase name (INTRO, VESSEL, etc.)
- **Elapsed time** — mm:ss display

### 2.5 Phase Bar

A row of buttons below the transport, one per phase:

`[VESSEL] [GATHER] [MEND] [PEAK] [DESCENT] [DISSOLVE] [SING] [HUM]`

These are **not timeline scrub points** — they are **snapshot presets**. Hitting one shifts all layer defaults (volumes, filter positions, which layers are nominally active) to match that phase's energy level. They do not override manual toggles. The active phase button glows.

A separate **RESTORE** button re-engages the full composed automation arc from the current position, surrendering all manual control back to the track's original score.

### 2.6 iPad / Touch Considerations

- All touch targets minimum 44x44px
- Knobs respond to vertical drag (finger up = clockwise = increase)
- Faders respond to vertical drag
- No hover-dependent interactions
- Phase buttons and triggers are large enough for confident tapping
- The layout should reflow to a scrollable single-column on narrow screens, with the transport bar and phase bar remaining fixed at top
- Consider: on mobile, the expanded panels could be full-width modal drawers rather than inline expansions

---

## 3. AUDIO ARCHITECTURE

The current `compose_tikkun()` function in `ep.html` is a monolithic composition — it schedules every note for every layer in a single callback, with phase-based gain automation controlling which layers are audible. For the console, this needs to be restructured into a controllable instrument.

### 3.1 Submix Bus Per Layer

Each of the 7 playable layers (plus Chamfer and Resonator Bank) gets its own submix `GainNode`:

```
Layer oscillators/sources
  → Layer processing (filters, effects)
    → Layer submix GainNode  ← controlled by layer fader
      → AnalyserNode (for per-strip visualizer)
        → Master GainNode
          → Compressor
            → ctx.destination
```

The submix nodes currently exist in `compose_tikkun()` as `bassSub`, `acidSub`, `melSub`, `pluckSub`. This pattern needs to be extended to all layers:

| Layer | Current submix | Needs creation |
|-------|---------------|----------------|
| Kick | routes directly to `master` | YES — add `kickSub` |
| Snare/Clap | routes directly to `master` | YES — add `snareSub` |
| Hats/Shaker | routes directly to `master` | YES — add `hatSub` |
| Bass | `bassSub` exists | Already done |
| Pads | routes directly to `master` | YES — add `padSub` |
| Acid | `acidSub` exists | Already done |
| Melody/Pluck | `melSub`, `pluckSub` exist | Already done (merge to one `melodySub`) |
| Chamfer | `chamEnv` | Already done (acts as submix) |
| Resonator | `resBus` exists | Already done |

### 3.2 AnalyserNode Per Strip

Each submix bus feeds an `AnalyserNode` for the channel strip visualizer:

```javascript
const kickAnalyser = ctx.createAnalyser();
kickAnalyser.fftSize = 256; // 128 frequency bins — more than enough for 8-12 bars
kickAnalyser.smoothingTimeConstant = 0.7;
kickSub.connect(kickAnalyser);
kickAnalyser.connect(master);
```

The `requestAnimationFrame` loop reads `getByteFrequencyData()` from each analyser and renders the spectrum bars. See Section 5 for visual spec.

### 3.3 Scheduler Refactoring

The current scheduler (`startSched()`) fires a single callback per sixteenth note, and the callback decides what to play based on bar number and phase. For the console:

**Keep the single scheduler loop** but refactor the callback to check per-layer toggle state:

```javascript
// Pseudocode for the refactored step callback
function onStep(t, step, barNum, sib) {
  const isBeat = sib % 4 === 0;
  const isEighth = sib % 2 === 0;
  const beatIdx = Math.floor(sib / 4);
  const ci = Math.floor((barNum % 8) / 2) % 4;
  const rootMidi = params.chordRoots[ci];

  // Each layer checks its own toggle
  if (layers.kick.enabled && isBeat) {
    schedKick(t, layers.kick.volume, layers.kick.click);
  }
  if (layers.hats.enabled && isEighth) {
    const off = (sib / 2) % 2 === 1;
    schedHat(t, off ? layers.hats.offbeatVol : layers.hats.onbeatVol, nb);
  }
  if (layers.acid.enabled) {
    playGoaStep(t, sib, barNum, 0, layers.acid.filterBase, layers.acid.peakVol);
  }
  // ... etc for each layer
}
```

Key design decisions:

- **Phase automation becomes optional.** When the console is in manual mode (default on load), phase structure is ignored — layers play or don't based on their toggle state. Phase buttons shift *default values* but don't gate layers.
- **Parameters are reactive.** When a knob changes, the new value is stored in the layer's state object. The next scheduled event picks it up. We do not try to modify already-scheduled Web Audio parameter ramps.
- **The bar counter still runs.** Even in manual mode, `barNum` increments. This lets RESTORE re-engage the composed arc from wherever you are.

### 3.4 Phase Automation Mode

Two modes, toggled by the RESTORE button:

1. **Manual mode** (default on load): Layer toggles and knob positions are authoritative. Phase structure is ignored for gating purposes.
2. **Composed mode** (engaged by RESTORE): The original `compose_tikkun()` gain automation drives layer levels and enables/disables. Manual toggles are overridden. Knob positions still apply for sound-shaping parameters (filter, decay, etc.) but volume is driven by the score.

Hitting any toggle or moving a volume fader while in composed mode snaps back to manual mode for that layer.

### 3.5 Generative Re-roll

Four generative elements can be regenerated:

| Element | Function | When it takes effect |
|---------|----------|---------------------|
| Goa acid pattern | Regenerates the 32-step pattern | Next pattern cycle (next bar 0 of the 2-bar loop) |
| Melody hook | Picks new HOOK preset + generates variations | Next melody trigger |
| Chord progression | Picks new PROGS entry, recomputes chord roots/voices | Next bar boundary (requires re-init) |
| Root note | Picks new root from ROOTS | Next bar boundary (requires full re-init) |

Each has an individual re-roll button in its expanded panel. The master "Re-roll All" in the master section triggers all four simultaneously.

### 3.6 Sidechain as Global

The bass sidechain pump (currently hardcoded in `pumpBass()`) becomes a global parameter pair:

- **Depth**: how deep the gain ducks (default: ducks to 0.03, range: 0.01-0.15)
- **Recovery**: how fast it comes back (default: `beat * 0.325`, range: 0.15-0.45 as beat fraction)

These live in the master section and affect bass behavior regardless of phase.

---

## 4. PER-LAYER CONTROL SPEC

For each layer: the macro knobs (always visible), expanded panel parameters, and defaults. All defaults represent the composed track at PEAK energy unless noted otherwise. Full parameter tables are in `CONSOLE_SPEC.md`.

### 4.1 KICK

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | PUNCH | Pitch start frequency | 150 Hz | 100-300 Hz |
| K2 | DECAY | Envelope decay time | 0.22s | 0.08-0.5s |
| K3 | CLICK | Click layer level (multiplier of kick vol) | 0.08 | 0.0-0.20 (0.0 = click off) |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Pitch end | 35 Hz | 20-60 Hz |
| Pitch sweep time | 0.060s | 0.02-0.15s |

**Default volume (fader):** 0.78

**Pattern:** Four-on-the-floor (every beat). Fixed — the console does not expose per-step kick programming.

### 4.2 SNARE / CLAP

Two sub-instruments sharing one strip. Clap plays the steady backbeat; Snare fires on fills.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | TONE | Clap bandpass center frequency | 1200 Hz | 800-2000 Hz |
| K2 | SNAP | Clap decay time | 0.11s | 0.05-0.25s |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Clap BP Q | 1.5 | 0.5-4.0 |
| Snare body BP freq | 500 Hz | 300-800 Hz |
| Snare body decay | 0.2s | 0.08-0.4s |
| Fill density | auto | off / sparse / auto |

**Default volume (fader):** 0.18

**Pattern:** Clap on beats 2 and 4. Snare fires on fill bars only (pre-transition). Fill behavior is automatic in composed mode; in manual mode, fills fire every 32 bars for punctuation.

### 4.3 HATS / SHAKER

Hi-hat and shaker share a strip. Shaker is a textural addition that follows the hat.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | BRIGHT | Highpass frequency | 9500 Hz | 6000-14000 Hz |
| K2 | OPEN | Hat decay time | 0.035s | 0.015-0.08s |
| K3 | SHAKER | Shaker level (multiplier) | 1.0 | 0.0-2.0 (0.0 = shaker off) |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Off-beat emphasis | 2.0x | 1.0-3.0x (ratio of off-beat to on-beat volume) |
| Shaker HP frequency | 11000 Hz | 8000-15000 Hz |

**Default volume (fader):** 0.13 (off-beat) / 0.065 (on-beat) — fader controls overall hat level, off-beat emphasis is a ratio multiplier.

**Pattern:** Eighth notes, off-beats louder. Fixed grid.

### 4.4 BASS

The character voice. Sawtooth + square oscillators through resonant lowpass, sidechain-pumped against the kick.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | FILTER | Filter cutoff (open position) | 750 Hz | 200-2000 Hz |
| K2 | RESO | Filter Q (resonance) | 4 | 1-12 |
| K3 | SUB | Sub-oscillator level (multiplier) | 0.67 | 0.0-1.0 |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Octave osc level | 0.25 | 0.0-0.6 |
| Filter closed position | 350 Hz | 150-600 Hz |
| Octave jumps on/off | true | bool |
| Main osc waveform | sawtooth | saw / square / triangle |

**Default volume (fader):** 0.65

**Note:** Sidechain depth and recovery are in the master section (see 3.6). The bass filter alternates between open/closed positions on odd/even beats — the FILTER knob controls the open position.

**Pattern:** Fires on every beat, following chord root. Octave jumps on the 3rd and 7th eighth notes when enabled.

### 4.5 PADS

Quiet by design. Detuned sine voices creating warmth underneath everything.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | WIDTH | Detune amount (cents) | 7 | 0-20 |
| K2 | ATTACK | Attack time | 0.6s | 0.1-2.0s |
| K3 | RELEASE | Release time | 0.6s | 0.1-2.0s |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Voice count | 3 | 1 / 2 / 3 |
| Osc type | sine | sine / triangle |
| Reverb send | on | bool |

**Default volume (fader):** 0.040

**Pattern:** Fires every 2 bars. Voices follow the 4-chord progression.

### 4.6 ACID (GOA)

The star of the show. A single oscillator through a resonant filter, driven by a generative 32-step pattern. This is where the console really shines — the acid parameters are the most fun to twist.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | FILTER | Filter base frequency | 2200 Hz (PEAK) | 200-4000 Hz |
| K2 | SCREAM | Filter Q (resonance) | 14 (mid-range of random 10-18) | 4-25 |
| K3 | DELAY | Delay wet level | 0.16 | 0.0-0.4 |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Waveform | random (saw/square) | saw / square |
| Accent filter offset | +1800 Hz | 400-3000 Hz |
| Filter decay target | base * 0.45 | 0.2-0.7 (multiplier) |
| Filter envelope time | sixteenth * 2.5 | 1.5-4.0 (sixteenth mult) |
| Pan LFO rate | 0.05 Hz | 0.01-0.3 Hz |
| Pan LFO depth | 0.5 | 0.0-1.0 |
| Delay time | beat * 0.75 | 0.5-1.5 (beat mult) |
| Delay feedback | 0.32 | 0.0-0.65 |
| Delay filter | 1500 Hz LP | 600-4000 Hz |
| Rest probability | 0.13 | 0.0-0.35 |
| Accent prob (downbeat) | 0.55 | 0.2-0.9 |
| Accent prob (other) | 0.18 | 0.05-0.4 |
| Slide probability | 0.45 | 0.1-0.7 |
| **[Re-roll pattern]** | — | button |

**Default volume (fader):** 0.45

**Pattern:** 32-step generative sequence. See `CONSOLE_SPEC.md` Layer 6 for the full generation algorithm.

### 4.7 MELODY / PLUCK

Two sub-voices: the FM pluck (primary, percussive, kalimba-like) and a triangle melody (soft, legato, farewell-voice character). In the console, both are available simultaneously — the triangle melody isn't phase-gated to DISSOLVE.

**Macro knobs:**
| # | Label | Parameter | Default | Range |
|---|-------|-----------|---------|-------|
| K1 | BRIGHT | FM mod depth (attack brightness) | freq * 1.2 | 0.5-3.0 (freq mult) |
| K2 | PLUCK | FM mod decay time | 0.12s | 0.04-0.3s |
| K3 | SPACE | Pluck delay feedback | 0.28 | 0.0-0.55 |

**Expanded panel:**
| Parameter | Default | Range |
|-----------|---------|-------|
| Head note volume | 0.62 | 0.2-0.9 |
| Fill note volume | 0.42 | 0.15-0.7 |
| Note duration | beat * 0.85 | 0.5-1.5 (beat mult) |
| Pan spread | 0.35 | 0.0-0.8 |
| Delay time | beat * 1.5 | 0.5-2.0 (beat mult) |
| Delay filter | 1800 Hz LP | 800-4000 Hz |
| Reverb send | 0.15 | 0.0-0.6 |
| High-note attenuation | on | on / off (MIDI > 72: -6% per semitone, floor 0.5x) |
| Triangle voice on/off | off | bool |
| Triangle volume | 0.45 | 0.15-0.7 |
| Triangle LP cutoff | 2500 Hz | 1000-5000 Hz |
| Triangle attack | 0.15s | 0.05-0.5s |
| Triangle delay feedback | 0.45 | 0.2-0.6 |
| **[Re-roll melody]** | — | button |

**Default volume (fader):** 0.58 (pluckSub at PEAK)

**Pattern:** Eighth notes, head notes (beats 1 and 3) louder than fills. Follows generated melody hook over the 4-chord progression.

---

## 5. VISUAL DESIGN LANGUAGE

The Tikkun Machine looks like a piece of equipment someone built in 1983 and has been running ever since. Warm. Worn. Alive.

### 5.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--console-bg` | `#0A0806` | Main background — near-black with warm undertone |
| `--console-surface` | `#141210` | Strip backgrounds, panel surfaces |
| `--console-surface-raised` | `#1C1916` | Expanded panels, modal backgrounds |
| `--amber` | `#E8961A` | Active toggles, active phase buttons, warm accents |
| `--amber-glow` | `rgba(232, 150, 26, 0.3)` | LED glow halos, active state shadows |
| `--amber-dim` | `#6B4A10` | Inactive toggles, dimmed indicators |
| `--green` | `#33CC66` | Meter bars (low level) |
| `--green-mid` | `#88CC33` | Meter bars (mid level) |
| `--yellow-hot` | `#CCCC22` | Meter bars (high level) |
| `--red-clip` | `#CC3333` | Meter bars (clip), Shatter button LED |
| `--phosphor` | `#44FF88` | Spectrum visualizer bars, text readouts on meters |
| `--phosphor-dim` | `rgba(68, 255, 136, 0.15)` | Ghost bars, inactive spectrum |
| `--text` | `#A09080` | Labels, parameter names |
| `--text-bright` | `#D0C0A8` | Active labels, value readouts |
| `--text-dim` | `#504840` | Inactive labels, secondary info |
| `--border` | `#2A2420` | Strip dividers, panel borders |
| `--border-warm` | `#3A2818` | Accent borders, active strip highlight |

### 5.2 CRT Scan Line Overlay

A fixed-position overlay covering the entire page, creating the impression of a CRT monitor:

```css
.crt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}
```

Add a subtle screen curvature vignette:

```css
.crt-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
}
```

The scan lines should be subtle — you notice them subconsciously, not consciously. Opacity 0.08 max.

### 5.3 Button Styles

**Power toggles** (layer on/off):
- Shape: circle, 44px diameter
- Off state: dark surface with 1px `--amber-dim` border, no fill
- On state: filled `--amber`, soft `box-shadow: 0 0 12px var(--amber-glow)`, 1px bright border
- Transition: 150ms ease on all properties
- The glow should pulse subtly with the beat when the layer is producing audio (see 5.6)

**Phase buttons:**
- Shape: rounded rectangle (border-radius 4px), padding 8px 16px
- Default: `--console-surface` fill, 1px `--border` stroke, `--text-dim` label
- Active (current default phase): `--amber-dim` fill, `--amber` border, `--text-bright` label
- Hover: brighten border to `--amber`
- Font: monospace, 10px, letter-spacing 0.1em, uppercase

**Trigger buttons** (Bell, Shatter):
- Shape: rounded rectangle, larger (60px wide, 48px tall)
- Bell: `--amber-dim` border, "BELL" label. On press: flash `--amber` fill for 200ms, LED indicator pulses
- Shatter: `--red-clip` dim border, "SHATTER" label. On press: flash red fill, screen briefly flickers (CRT glitch effect, 300ms)

**RESTORE button:**
- Distinct styling — dashed border to indicate "this is different"
- Rounded rectangle, `--amber-dim` dashed border
- On engage: border becomes solid `--amber`, label glows

### 5.4 Knob Style

Rotary knobs rendered as CSS/SVG elements:

- Outer ring: 40px diameter circle, 2px `--border-warm` stroke
- Fill arc: a colored arc from 7-o'clock to current position (using SVG arc or conic-gradient), color `--amber`
- Pointer: a short radial line from center toward the current position
- Value readout: small text below the knob showing the current numeric value (e.g., "2200 Hz", "0.32", "4")
- Center dot: small circle at the knob center, glows `--amber` when the value matches the composed default

Touch interaction: vertical drag. Finger up = increase. The knob's visual rotation should track smoothly. Total range: 270 degrees (from 7-o'clock through bottom to 5-o'clock).

Double-tap to reset to center (the composed default for the current phase).

### 5.5 Fader Style

Vertical slider:

- Track: 4px wide, 120px tall, `--console-surface` fill with `--border` outline
- Thumb: 20px wide, 8px tall, `--amber` fill with subtle glow
- Fill: the portion of the track below the thumb fills with `--amber-dim`
- Value readout: small text adjacent showing dB or percentage

### 5.6 Meter / Visualizer Style

Per-strip spectrum visualizer (the bouncing bars):

- 8-12 vertical bars per strip, evenly spaced across the strip width
- Each bar is segmented (3px segments with 1px gaps) to emulate LED meters
- Color gradient from bottom to top: `--green` (low) -> `--green-mid` -> `--yellow-hot` -> `--red-clip` (top two segments only)
- Peak hold: a single bright segment that hangs at the highest point for ~800ms before falling
- Bars respond to frequency data from the layer's AnalyserNode
- When the layer is off: bars are dark, one or two bottom segments glow `--phosphor-dim` (the meter is alive but reading silence)
- Render using `<canvas>` per strip, or a single canvas with regions. Canvas is preferred for performance.

### 5.7 Animation Guidelines

- **LED pulse**: active power toggles pulse their glow in sync with the BPM. The pulse is subtle — a 10-15% brightness variation, not a full blink. Use `Math.sin(phase)` keyed to beat position.
- **Knob response**: smooth, no stepping. Use `requestAnimationFrame` for visual updates, not the audio scheduler.
- **Meter falloff**: bars drop at ~24dB/second (fast enough to feel responsive, slow enough to read). Peak hold dots drop after 800ms.
- **Phase transitions**: when hitting a phase button, all affected knobs animate smoothly to their new default positions over 200ms.
- **Shatter effect**: on trigger, the CRT overlay briefly intensifies (scan lines go to opacity 0.3 for one frame), all meter bars flash white, then all layers except chamfer go dark.

### 5.8 Typography

- **Primary font**: `'DM Mono', monospace` (already loaded by the EP page)
- **Display font**: `'Bebas Neue', sans-serif` (already loaded) — used for the page title and section headers
- **Labels**: 9-10px, letter-spacing 0.1em, uppercase, `--text-dim`
- **Values**: 10px, tabular-nums, `--text-bright`
- **Knob labels**: 9px, centered below the knob, `--text`
- **Phase buttons**: 10px, letter-spacing 0.1em, uppercase

### 5.9 Overall Vibe

Imagine a control room in a concrete building. The equipment is old but impeccably maintained. Every LED works. Every knob turns smoothly. The meters bounce with the precision of something that was calibrated yesterday. The light comes from the controls themselves — amber glows, green phosphor traces, the occasional red flash when something clips. The background is so dark it disappears. You're not looking at a screen. You're looking through a window at a machine.

---

## 6. INTERACTION MODEL

### 6.1 Page Load State

When the console page loads:

1. Audio context is created but suspended (waiting for user gesture, per browser policy)
2. All UI renders in its "off" state — meters dark, toggles dim, knobs at center positions
3. User clicks PLAY (or taps anywhere on mobile)
4. Audio context resumes
5. **Kick** toggles ON automatically, begins firing on the beat
6. **Chamfer** toggles ON automatically, drone fades in over 2 seconds
7. Everything else stays OFF
8. The user has a pulse to build from

This starting state is deliberate: kick + chamfer is the minimum viable groove. It sounds good immediately. The user's first action is to toggle something else on, and the moment they do, they understand the instrument.

### 6.2 Building and Stripping

- Toggle a layer ON: it begins playing on the next musical boundary (next beat for drums, next bar for melodic/harmonic layers). The power toggle glows, the meter comes alive.
- Toggle a layer OFF: it stops scheduling new events. Already-playing notes finish naturally (tails ring out, delays fade). The power toggle dims. The meter fades to silence.
- This is the primary performance gesture: building the track up by toggling layers on, stripping it back by toggling them off.

### 6.3 Knob Behavior

- All knob changes take effect on the **next musical event** for that layer. If you twist the acid filter knob, the current note keeps its filter position — the next note picks up the new value. This prevents clicks and glitches.
- Knobs have a **center detent** feel: the composed default position is marked (the center dot glows amber when you're at it). You can feel home.
- **Double-tap** a knob to snap it to its center (composed default for the current phase).
- Knobs display their current value as text below the knob. Values update in real time as you twist.

### 6.4 Phase Preset Behavior

Hitting a phase button (e.g., PEAK):

1. All layer *default volumes* shift to match PEAK's energy levels (kick 0.78, bass 0.65, acid 0.45, etc.)
2. All *parameter defaults* shift to match PEAK's settings (acid filter at 2200 Hz, pad detune at 7 cents, etc.)
3. Knobs animate to the new defaults over 200ms
4. Layer toggles are **not affected** — if you had the snare off, it stays off
5. The phase button glows to show it's the active preset

This means phase buttons are energy presets, not arrangement cues. You can hit GATHER to get that sparse, filter-opening acid energy, then toggle on the kick yourself for a variation that doesn't exist in the original track.

### 6.5 RESTORE

RESTORE re-engages the composed automation arc:

1. All layer toggles snap to match the current bar's phase gating (if bar 60 = GATHER, only acid + hats + shaker + chamfer are on)
2. All volumes and parameters snap to the composed values for the current bar
3. The console enters "composed mode" — the original gain automation drives everything
4. Hitting any toggle or moving any fader exits composed mode for that layer
5. The RESTORE button shows "COMPOSED" with a solid glow while active

### 6.6 Shatter

The Shatter button is a performance event:

1. Glass burst sound triggers immediately
2. All layer toggles go OFF except Chamfer
3. Chamfer volume steps up to 0.08 (the VOID level)
4. Three bells ring at staggered intervals (0.5, 1.2, and 2.3 bars after the trigger)
5. The console is now in a "void" state — meters dark, silence except for the drone
6. The performer manually re-enables layers to rebuild, creating their own "gather" and "mend"

Shatter can be triggered at any time. It's always dramatic.

### 6.7 Bell

The Bell button triggers a single bell tone:

- Pitch: current chord root + 24 (two octaves up)
- Volume: 0.16
- Decay: 5.5 seconds
- Routes through the bell reverb bus (hall reverb, 5s impulse)
- Can be triggered repeatedly — bells stack (but be mindful of gain accumulation)
- The LED on the button flashes amber for the duration of the bell's decay

### 6.8 Re-roll

Re-roll buttons regenerate the generative elements:

- **Pattern re-roll** (acid expanded panel): generates a new 32-step Goa pattern using the same algorithm and scale. Takes effect on the next pattern cycle.
- **Melody re-roll** (pluck expanded panel): picks a new hook from the 10 HOOKS presets and regenerates variations. Takes effect on the next melody trigger.
- **Re-roll All** (master section): regenerates acid pattern, melody, and optionally chord progression and root note. Optionally: a brief "thinking" animation (LED spins for 200ms) to give the moment weight.

Re-rolls should never cause audible glitches. The new pattern waits for the right moment to enter.

---

## 7. TECHNICAL NOTES

### 7.1 Single File Architecture

The console is a single HTML file, matching the EP's architecture:

- All CSS in `<style>` tags in the `<head>`
- All JavaScript in a `<script>` tag before `</body>`
- No external dependencies except Google Fonts (DM Mono, Bebas Neue) — same fonts already used by the EP page
- No build step, no bundler, no framework
- File name: `tikkun.html` (or `console.html`), living alongside `ep.html`

### 7.2 Web Audio API Specifics

- Create `AudioContext` on first user gesture (click/tap on the Play button). Store as global `ctx`.
- Master chain: `master` (GainNode) -> `comp` (DynamicsCompressor, threshold -8dB, ratio 6:1, knee 12dB) -> `ctx.destination`
- All persistent oscillators (chamfer, acid, bass, sub, resonator bank) are created once and started on play. They run continuously. Layer muting is done via submix gain, not by stopping/starting oscillators.
- Per-event instruments (kick, hat, clap, snare, shaker, pad voices, pluck notes, bells, shatter bursts) are created and destroyed per event. Use `autoClean()` pattern from `ep.html` — attach `onended` handler to disconnect and release nodes.
- Reverb buses use synthetic impulse responses generated via `createImpulse()`. No external audio files.
- The scheduler uses `setInterval(25ms)` with a 1.5-second lookahead, matching `startSched()` in the EP. This gives stable timing without blocking the UI thread.

### 7.3 Canvas Visualizers

Per-strip spectrum displays rendered on `<canvas>` elements:

```javascript
function drawMeter(canvas, analyser, isActive) {
  const ctx2d = canvas.getContext('2d');
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  // Map frequency bins to 8-12 display bars
  // Draw segmented bars with color gradient
  // Update peak hold positions
  // If !isActive, draw dim ghost bars
}
```

Use a single `requestAnimationFrame` loop that iterates all 7 strip canvases plus the master meter. Target 30fps (every other frame on 60Hz displays) to keep CPU usage reasonable.

### 7.4 Touch Events

For knobs and faders on touch devices:

- Listen for `touchstart`, `touchmove`, `touchend` on knob/fader elements
- On `touchstart`: record the initial Y position and current parameter value
- On `touchmove`: calculate deltaY from start, map to parameter change. Use a sensitivity factor (e.g., 200px of drag = full range).
- Prevent default on touch events to avoid scroll interference
- Use `touch-action: none` CSS on interactive elements

For double-tap detection:
- Track last tap time per element
- If two taps within 300ms, reset to center value
- Use this for knob reset-to-default

### 7.5 State Management

All layer and global state lives in a plain JavaScript object:

```javascript
const state = {
  playing: false,
  composedMode: false,
  bpm: 120,
  rootIndex: 4,  // index into ROOTS array
  progIndex: 0,  // index into PROGS array
  activePhasePreset: 'PEAK',
  layers: {
    kick:    { enabled: false, volume: 0.78, pitchStart: 150, pitchEnd: 35, sweepTime: 0.06, decay: 0.22, clickLevel: 0.08 },
    snare:   { enabled: false, volume: 0.18, bpCenter: 1200, bpQ: 1.5, decay: 0.11, bodyBp: 500, bodyDecay: 0.2 },
    hats:    { enabled: false, volume: 0.13, hpFreq: 9500, decay: 0.035, offbeatRatio: 2.0, shakerLevel: 1.0, shakerHp: 11000 },
    bass:    { enabled: false, volume: 0.65, filterOpen: 750, filterClosed: 350, filterQ: 4, subLevel: 0.67, octLevel: 0.25, octJumps: true, waveform: 'sawtooth' },
    pads:    { enabled: false, volume: 0.040, detune: 7, attack: 0.6, release: 0.6, voices: 3, oscType: 'sine', reverbSend: true },
    acid:    { enabled: false, volume: 0.45, filterBase: 2200, filterQ: 14, delayWet: 0.16, waveform: 'sawtooth', accentOffset: 1800, decayTarget: 0.45, envTime: 2.5, panRate: 0.05, panDepth: 0.5, delayTime: 0.75, delayFb: 0.32, delayFilter: 1500, restProb: 0.13, accentDownbeat: 0.55, accentOther: 0.18, slideProb: 0.45 },
    melody:  { enabled: false, volume: 0.54, fmDepth: 1.2, fmDecay: 0.12, delayFb: 0.28, headVol: 0.62, fillVol: 0.42, noteDur: 0.85, panSpread: 0.35, delayTime: 1.5, delayFilter: 1800, triEnabled: false, triVol: 0.45, triLp: 2500, triAttack: 0.15, triDelayFb: 0.45 }
  },
  master: {
    volume: 0.5,
    chamfer: { enabled: true, volume: 0.05, freq: 55, harmonicLevel: 0.12, lfoRate: 0.2, lfoDepth: 0.008 },
    resonator: { enabled: false, volume: 0.22, modDepth: 0.35, harmonicCount: 5 },
    sidechain: { depth: 0.03, recovery: 0.325 },
    reverb: { roomWet: 0.18, hallWet: 0.40 }
  }
};
```

When a knob moves, update the state object. The scheduler reads from state on each step. This keeps audio and UI cleanly separated.

### 7.6 Linking to the EP

The console page should link back to the EP page. Consider a small "back to EP" link in the corner. The EP page should also link to the console — perhaps a small icon or text on the Tikkun track row that says "OPEN CONSOLE" or a gear/knob icon.

### 7.7 Performance Budget

- Target: smooth 30fps visuals + glitch-free audio on iPad Air (2022) or equivalent
- The scheduler interval (25ms) is the heartbeat — this must never be starved
- Canvas rendering should be decoupled and can drop frames gracefully
- Avoid creating DOM elements in the audio callback
- Pre-create noise buffers on init (one 0.5s buffer, reused for all noise-based instruments)
- Limit active AnalyserNodes — they add CPU overhead. Consider disabling analysers for layers that are toggled off.

---

## 8. FUTURE ROADMAP

### 8.1 Additional Track Consoles

Each of the five EP tracks could get its own console page, reflecting the unique character of that track:

| Track | Console Character | Signature Controls |
|-------|------------------|--------------------|
| **303 Church** | Pure acid worship — the console IS the filter | Giant filter cutoff knob dominates the page. Q knob. Pattern mutation rate. That's almost it. |
| **The Harvest** | Full production desk — closest to Tikkun | Similar channel strip layout, but with the break/return narrative built into the phase buttons |
| **Golden Hour** | Pad-focused, atmospheric | Fewer strips, larger. Reverb and delay are primary controls. The "glow" is the instrument. |
| **Drift** | Delay machine — feedback and absence | Minimal controls: one chord, one delay line, one filter. The console is about what you take away. |
| **Tikkun** | The full machine (this spec) | Everything |

### 8.2 Scene Memory

Save and recall knob positions:

- 4-8 scene slots, each storing a complete snapshot of all layer states
- Save: press and hold a scene button for 1 second to store current state
- Recall: tap a scene button to recall stored state (smooth parameter interpolation over 500ms)
- Scenes persist in `localStorage`
- A "default" scene per phase preset is pre-loaded (the composed defaults)

### 8.3 MIDI Input

Map hardware MIDI controllers to console parameters:

- MIDI Learn mode: click a knob, then move a MIDI CC — the mapping is saved
- Standard mapping for common controllers (e.g., Akai APC, Novation Launch Control)
- MIDI note triggers for Bell and Shatter
- MIDI clock sync (receive external clock to lock BPM)
- Uses the Web MIDI API (`navigator.requestMIDIAccess()`)

### 8.4 Hardware / Embedded Port

The parameter architecture is designed to map to physical hardware:

**Target platforms:**
- Daisy Seed (ARM Cortex-M7, 480MHz, hardware audio codec)
- RP2350 (dual-core ARM Cortex-M33, with external audio DAC)

**Control surface:**
- 7 toggle switches (layer on/off)
- 7 rotary potentiometers (layer volumes)
- 14-21 rotary potentiometers (2-3 macro knobs per layer)
- 2 momentary buttons (Bell, Shatter)
- 8 momentary buttons (phase presets)
- 1 rotary encoder (BPM)
- Small OLED display (128x64) showing current phase, bar number, BPM

**Audio output:**
- Stereo line-level out (3.5mm or 1/4")
- The synthesis engine would be ported to Rust (for Daisy Seed via `libdaisy`) or CircuitPython (for RP2350)
- All synthesis algorithms are simple enough for real-time on Cortex-M7 at 48kHz

**What maps cleanly to hardware:**
- All knob parameters are continuous float ranges — direct analog pot mapping
- Layer toggles are binary — direct switch mapping
- Trigger buttons are momentary — direct button mapping
- The generative elements (pattern re-roll) would use a dedicated button

**What needs adaptation:**
- Expanded panel parameters would need a shift/page mode on the hardware
- Visualizers would be simplified (LED bar per channel, not spectrum display)
- Root/progression selection would use a rotary encoder + display menu

### 8.5 EP Integration

- Console page links back to EP page
- EP page links to console from the Tikkun track row
- Share the same audio utility functions (`createNoise`, `createImpulse`, `mtf`, `genParams`, etc.) — consider extracting to a shared `<script>` include or just duplicating (single-file architecture favors duplication for simplicity)
- The console could optionally play the other tracks in "listen-only" mode (the existing EP playback with the transport bar), so you can switch between playing Tikkun and listening to the full EP without leaving the page

---

## Appendix: Phase Default Tables

Quick reference for what each phase preset sets as defaults. These are the values that knobs snap to when you hit a phase button.

### Layer Volumes by Phase

| Layer | VESSEL | GATHER | MEND | PEAK | DESCENT | DISSOLVE | SING | HUM |
|-------|--------|--------|------|------|---------|----------|------|-----|
| Kick | 0.72 | off | 0.72 | 0.78 | 0.78->0 | off | off | off |
| Snare/Clap | 0.16 | off | 0.18 | 0.18 | 0.16->0 | off | off | off |
| Hats | 0.12 | 0.07 | 0.13 | 0.13 | 0.12->0 | off | off | off |
| Bass | 0.55 | 0.50 (bar 81) | 0.65 | 0.65 | 0.55->0 | 0.45->0 | off | off |
| Pads | 0.038 | 0.030 | 0.035 | 0.040 | 0.036 | 0.035->0 | off | off |
| Acid | off | 0.40 | 0.40 | 0.45 | 0.45->0 | sparse | off | off |
| Melody/Pluck | 0.45 | off | 0.25->0.60 | 0.58 | 0.40->0 | tri 0.42 | off | off |
| Chamfer | 0.05 | 0.05 | 0.05 | 0.05 | 0.07 | 0.10 | 0.11 | 0.12->0 |
| Resonator | off | off | off | off | off | off | 0.22 | off |

### Acid Filter Base by Phase

| Phase | Filter Base (Hz) | Character |
|-------|-----------------|-----------|
| GATHER | 400 -> 1800 (ramps) | Slowly opening, cautious |
| MEND | 800 -> 2400 (ramps) | Continuing to open |
| PEAK | 2200 +/- 300 (modulates) | Wide open, breathing |
| DESCENT | 2200 -> 660 (closing) | Saying goodbye |
| DISSOLVE | sparse long notes | Final figures |

---

*This is a labor of love. The machine should feel like something you want to spend an afternoon with — not because you have to, but because you started playing and an hour disappeared. The acid is screaming, the kick is punching, the pluck is singing, and you're grinning because you made that happen with six toggle switches and a handful of knobs. Build it with joy.*
