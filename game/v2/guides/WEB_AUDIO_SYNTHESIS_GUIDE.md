# Web Audio Synthesis Guide — DJ OOR
**How we built the audio for the soundcheck easter egg.**
**Use this to create short audio moments throughout the story.**

---

## Prerequisites

Every page that plays audio needs:

1. **An AudioContext**, created on user interaction (browser autoplay policy):
```javascript
const ctx = new (window.AudioContext || window.webkitAudioContext)();
ctx.resume(); // Safari requirement
```

2. **A master signal chain** (gain → compressor → destination):
```javascript
const masterGain = ctx.createGain();
masterGain.gain.value = 0.7;
const compressor = ctx.createDynamicsCompressor();
compressor.threshold.value = -8;
compressor.ratio.value = 6;
masterGain.connect(compressor);
compressor.connect(ctx.destination);
```

3. **Utility functions** (noise buffer, impulse response, distortion curve) — see soundcheck.html for implementations.

---

## Technique 1: The Reversed Shuffle

**What it sounds like:** A vocoded, sub-bass-heavy dance track where every hit swells INTO the beat then cuts, instead of attacking from silence. Sounds like a record playing backwards but rhythmically coherent.

**Why it works:** Normal audio envelopes attack fast and decay slow (drum hit → ring out). Reversing this — slow swell → hard cut — is the cheapest way to make anything sound "backwards" without actually reversing audio. The brain recognizes the rhythm but flags the dynamics as wrong. Uncanny valley for your ears.

### Signal Chain

```
┌─ Bass (sawtooth 58Hz → lowpass 120Hz → gain envelope) ──┐
│                                                           │
├─ Sub-bass (sine 29Hz → gain envelope) ───────────────────┤
│                                                           │
├─ Chord Voice 1 (saw 116Hz → bandpass → distortion → gain)┤
├─ Chord Voice 2 (saw 155Hz → bandpass → distortion → gain)├→ submix → dry/wet split
├─ Chord Voice 3 (saw 196Hz → bandpass → distortion → gain)┤     ├→ dry (0.7) → master
├─ Chord Voice 4 (saw 233Hz → bandpass → distortion → gain)┤     └→ convolver (0.3) → master
│                                                           │
└─ Hi-hats (noise → highpass 7kHz → gain envelope) ────────┘
```

### The Three Key Tricks

**1. Reversed gain envelope (the "backwards" feel)**

Normal kick drum: `gain = 1.0 → decay to 0 over 200ms`
Our version: `gain = 0.01 → swell to 0.5 over 85% of beat → hard cut to 0.01`

```javascript
const BEAT = 60 / BPM;
for (let beat = 0; beat < totalBeats; beat++) {
  const t = startTime + beat * BEAT;
  gain.gain.setValueAtTime(0.01, t);                         // start silent
  gain.gain.exponentialRampToValueAtTime(0.5, t + BEAT * 0.85); // swell up
  gain.gain.setValueAtTime(0.01, t + BEAT * 0.9);            // hard cut
}
```

The `exponentialRampToValueAtTime` is important — linear ramps sound mechanical. Exponential ramps sound organic because real-world energy transfer is exponential.

The hard cut at 90% of the beat leaves a tiny 10% gap of near-silence before the next swell starts. This gap is what makes it sound reversed rather than just pulsing.

**2. Formant-sweeping bandpass filters (the "vocoder" sound)**

A vocoder works by analyzing the spectral shape of a voice (formants) and imposing it onto a synth. We skip the analysis step and just sweep bandpass filters through formant-like frequencies on a schedule.

Human vowel formants live at roughly:
- F1: 300-800 Hz (jaw openness — "ah" vs "ee")
- F2: 800-2500 Hz (tongue position — "oo" vs "ee")
- F3: 2000-3500 Hz (voice quality)
- F4: 3000-5000 Hz (breathiness)

We use four sawtooth oscillators at chord tones (Bb major: Bb2, Eb3, G3, Bb3), each routed through a bandpass filter. Each filter sweeps through a different formant frequency per beat:

```javascript
const formantFreqs = [
  [400, 900, 2200, 3200],   // "set A" — open vowel
  [600, 1200, 2600, 3500],  // "set B" — mid vowel
  [300, 800, 2000, 3000],   // "set C" — closed vowel
  [500, 1100, 2400, 3300]   // "set D" — nasal
];

// Each beat, assign a formant set and sweep to the next
bp.frequency.setValueAtTime(formantFreqs[setIndex][voiceIndex], t);
bp.frequency.linearRampToValueAtTime(formantFreqs[nextSetIndex][voiceIndex], t + BEAT);
```

The `Q` value on the bandpass (we use 6) controls how "vowel-like" it sounds. Higher Q = more resonant, more obviously vocal. Lower Q = smoother, more pad-like.

**3. Room convolution (the "warehouse" space)**

A synthetic impulse response gives the sound physical space:

```javascript
function createImpulseResponse(duration, decay) {
  const len = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * decay));
    }
  }
  return buf;
}
```

`duration: 0.8` and `decay: 0.15` gives a short, dense reverb — like a concrete room. Longer decay = cathedral. Shorter = closet. The 70/30 dry/wet split keeps the bass tight while adding space to the upper harmonics.

### Making a 5-Second Variant

Change the bar count and adjust the submix fade times:

```javascript
function playShortShuffle(startTime, bars) {
  bars = bars || 2; // 2 bars ≈ 4 seconds at 118 BPM
  const duration = BEAT * (bars * 4);
  // ... same code but loop for `bars` instead of 4
  // shorter fade-in/out: 0.5s instead of 1.5s
  submix.gain.linearRampToValueAtTime(0.35, startTime + 0.5);
  submix.gain.setValueAtTime(0.35, startTime + duration - 0.5);
  submix.gain.linearRampToValueAtTime(0, startTime + duration);
}
```

### Making It Sound Different Each Time

Vary these parameters per call:
- **Key:** Change the bass frequency (58 → 65 for C, 73 for D, etc.) and adjust chord notes proportionally
- **Formant sets:** Shuffle the formant frequency arrays
- **BPM:** 110-128 range all works
- **Distortion amount:** 4 = smooth, 8 = gritty, 15 = harsh
- **Reverb decay:** 0.1 = tight room, 0.3 = hall

---

## Technique 2: The Vocoder Voice

**What it sounds like:** Words emerging from underneath concrete. Inhuman but recognizable. The player reads the text and then hears a sound that their brain pattern-matches to the words.

**Why it works:** It's a formant synthesizer — we shape noise and a low oscillator through bandpass filters tuned to the resonant frequencies of human vowels. The result is technically not speech, but the brain's speech-recognition circuits fire anyway because the formant transitions match what vowels "look like" spectrally.

### Signal Chain

```
noise buffer ─┬→ gain (noise level) ─┬→ bandpass F1 ─┬→ distortion → lowpass 500Hz → output gain → master
              │                       └→ bandpass F2 ─┘
sawtooth 70Hz → gain (voiced level) ──┘
```

### How It Works

**Step 1: Define phonemes as formant pairs + timing**

Each phoneme is a pair of formant frequencies (F1, F2), a duration, and a type (voiced or unvoiced):

```javascript
const phonemes = [
  { f1: 5000, f2: 7000, dur: 0.18, type: 'noise' },  // "S" — sibilant, noise-only
  { f1: 500,  f2: 1500, dur: 0.28, type: 'voiced' },  // "ow" — open vowel
  { f1: 350,  f2: 900,  dur: 0.18, type: 'voiced' },  // "nd" — nasal
  { f1: 300,  f2: 2300, dur: 0.30, type: 'voiced' },  // "goo" — back vowel
  // ...
];
```

Voiced phonemes (vowels, nasals) use the sawtooth oscillator as the carrier — it provides pitch and harmonic richness. Unvoiced phonemes (S, T, breath) use the noise buffer — no pitch, just shaped air.

**Step 2: Schedule formant transitions**

For each phoneme, snap the bandpass filters to the target formant frequencies and switch the carrier mix:

```javascript
phonemes.forEach(p => {
  bp1.frequency.setValueAtTime(p.f1, t);
  bp2.frequency.setValueAtTime(p.f2, t);

  if (p.type === 'voiced') {
    voicedMix.gain.setValueAtTime(0.5, t);   // sawtooth dominates
    noiseMix.gain.setValueAtTime(0.15, t);    // little breath
  } else {
    voicedMix.gain.setValueAtTime(0.05, t);   // almost no pitch
    noiseMix.gain.setValueAtTime(0.5, t);     // noise dominates
  }

  // amplitude envelope per phoneme
  voiceSubmix.gain.setValueAtTime(0.001, t);
  voiceSubmix.gain.linearRampToValueAtTime(0.6, t + 0.04);  // fast attack
  voiceSubmix.gain.setValueAtTime(0.6, t + p.dur - 0.03);
  voiceSubmix.gain.linearRampToValueAtTime(0.001, t + p.dur); // gap between phonemes

  t += p.dur;
});
```

**Step 3: Heavy processing**

The output runs through WaveShaper distortion (amount: 20 — aggressive) and a lowpass filter at 500Hz. This does two things:
- The distortion adds harmonics that fill the spectral gaps between formants, making the voice denser
- The lowpass removes all the upper harmonics, making it sound like the voice is coming from underneath something heavy — concrete, a subwoofer, the floor

### Designing New Phrases

To create a new vocoder phrase, you need to map the phrase into phonemes. Quick reference for common English phonemes:

| Sound | Type | F1 (Hz) | F2 (Hz) | Duration (s) |
|---|---|---|---|---|
| "ah" (father) | voiced | 700 | 1200 | 0.25-0.35 |
| "ee" (feet) | voiced | 300 | 2300 | 0.20-0.30 |
| "oo" (boot) | voiced | 300 | 800 | 0.25-0.30 |
| "eh" (bed) | voiced | 500 | 1800 | 0.20-0.25 |
| "uh" (but) | voiced | 600 | 1200 | 0.20-0.25 |
| "oh" (boat) | voiced | 400 | 900 | 0.25-0.30 |
| "s" / "sh" | noise | 4000-6000 | 6000-8000 | 0.12-0.20 |
| "t" / "k" | noise | 2000-4000 | 3000-5000 | 0.06-0.10 |
| "n" / "m" | voiced | 300-400 | 800-1200 | 0.12-0.18 |
| "r" | voiced | 400 | 1300 | 0.15-0.20 |
| "l" | voiced | 350 | 1100 | 0.12-0.18 |
| breath / "?" | noise | 400-600 | 1500-2500 | 0.15-0.25 |

**Example — "to the left":**
```javascript
[
  { f1: 2500, f2: 4000, dur: 0.08, type: 'noise' },  // t
  { f1: 300,  f2: 800,  dur: 0.18, type: 'voiced' },  // oo
  { f1: 400,  f2: 1800, dur: 0.12, type: 'noise' },   // th
  { f1: 600,  f2: 1200, dur: 0.15, type: 'voiced' },  // uh
  { f1: 350,  f2: 1100, dur: 0.10, type: 'voiced' },  // l
  { f1: 500,  f2: 1800, dur: 0.18, type: 'voiced' },  // eh
  { f1: 3000, f2: 5000, dur: 0.10, type: 'noise' },   // ft
  { f1: 400,  f2: 1500, dur: 0.15, type: 'noise' },   // (breath)
]
```

### Controlling the "depth" of the voice

- **Sawtooth fundamental frequency:** 70Hz = deep male, 120Hz = higher, 50Hz = Barry White from inside a cave
- **Lowpass cutoff:** 500Hz = muffled underground, 800Hz = more intelligible, 300Hz = pure rumble
- **Distortion amount:** 20 = harsh/robotic, 10 = smoother, 30 = obliterated
- **Bandpass Q:** 8 = sharp resonant vowels, 4 = more diffuse, 12 = laser-focused formants

---

## Technique 3: Acid House Loop

**What it sounds like:** The Roland TB-303 bass line that defined acid house. A squelchy, resonant, sliding bass synthesizer with a four-on-the-floor kick.

### Signal Chain

```
square osc (bass) → resonant lowpass (the 303 filter) → distortion → gain envelope
                     ↑
                     filter envelope (accent/slide per step)

sine osc (kick) → gain envelope (pitch + amp)

noise → highpass (open hat) → gain envelope
```

### The 303 Filter

The TB-303 sound is almost entirely about the filter. A square wave through a resonant lowpass filter with envelope modulation:

```javascript
const osc = ctx.createOscillator();
osc.type = 'square';

const filter = ctx.createBiquadFilter();
filter.type = 'lowpass';
filter.Q.value = 15;  // high resonance — the "squelch"

osc.connect(filter);
// ... filter.frequency is automated per step
```

Each step of the sequence has:
- A **note** (frequency for the oscillator)
- A **filter envelope** (cutoff sweeps from high to low, or slides between notes)
- An **accent** flag (louder + more filter sweep = the "wow" notes)
- A **slide** flag (portamento to the next note instead of re-triggering)

### The Step Sequencer

The 303 sound comes from a 16-step pattern where each step has note, accent, and slide flags. The pattern repeats per bar:

```javascript
const pattern = [
  { note: 110.00, accent: true,  slide: false }, // A2 !
  { note: 0,      accent: false, slide: false }, // rest
  { note: 130.81, accent: false, slide: true  }, // C3 ~  (slides into next)
  { note: 164.81, accent: false, slide: false }, // E3
  // ... 16 steps total
];
```

**Accented steps** get louder amplitude (0.45 vs 0.28) and a wider filter sweep (3500Hz → 300Hz vs 1200Hz → 300Hz). The accent is what creates the "wow" or "squelch" — the filter opens wide and snaps shut.

**Slide steps** use `linearRampToValueAtTime` on the oscillator frequency instead of `setValueAtTime`, creating portamento between notes. The 303's slide is what makes it sound liquid rather than staccato.

**Rest steps** just set gain to near-zero. The oscillator keeps running — this matters because the filter state persists through rests, creating subtle resonant tails.

### The Filter Envelope (The Squelch)

This is the whole trick. Per step:

```javascript
const filterPeak = p.accent ? 3500 : 1200;
bassFilter.frequency.setValueAtTime(filterPeak, t);
bassFilter.frequency.exponentialRampToValueAtTime(300, t + sixteenth * 2);
```

The filter snaps open to `filterPeak` at the start of the note and decays to 300Hz over two sixteenth notes. With Q at 15, the filter resonance peak creates a singing/squelching overtone during the sweep. Higher Q = more squelch. Lower Q = more muffled.

**The critical values:**
- `Q: 15` — high resonance. 10 is subtle, 20 is screaming, 25+ will self-oscillate (can be musical but risks blowing speakers)
- Filter sweep from 1200-3500Hz down to 300Hz — wider range = more dramatic
- Decay time of 2 sixteenths — shorter = punchier, longer = more liquid

### Kick Drum Synthesis

A sine wave with rapidly descending pitch:

```javascript
const kick = ctx.createOscillator();
kick.type = 'sine';
kick.frequency.setValueAtTime(150, t);              // start high
kick.frequency.exponentialRampToValueAtTime(35, t + 0.07); // sweep down fast

const kickGain = ctx.createGain();
kickGain.gain.setValueAtTime(0.6, t);
kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22); // short decay
```

The 150→35Hz pitch sweep in 70ms is what makes it sound like a kick instead of a bass note. Faster sweep = punchier. Slower = boomier. Each kick is a NEW oscillator (oscillators are single-use in Web Audio — you start and stop them once).

### Making Acid Variants

Change these per call to get different loops:
- **Key:** Transpose all notes by a ratio. E.g., for key of C: multiply all frequencies by `130.81/110` (minor third up)
- **Pattern:** Rearrange which steps are accented, slid, or rested. More accents = more aggressive. More slides = more liquid.
- **Filter Q:** 12 = smooth house, 15 = classic acid, 20 = hard acid, 25 = industrial
- **BPM:** 118-128 = classic, 130+ = hard acid, 108-115 = deep house
- **Distortion:** 4 = clean, 6 = warm, 10 = gritty, 15+ = harsh
- **Waveform:** `square` = classic 303, `sawtooth` = brighter/buzzier

---

## Using in the Story

### Integration Pattern

For the main game (index.html), add audio as an enhancement layer:

1. Create the AudioContext on first user interaction (any choice click)
2. Play short audio clips tied to specific nodes via a `node.audio` field:

```json
{
  "id": "w_006",
  "audio": {
    "type": "shuffle",
    "bars": 2,
    "key": "Bb",
    "bpm": 118,
    "delay": 1000
  }
}
```

3. The audio system reads the config and calls the appropriate synthesis function
4. Always fade in/out (never hard-start audio on a text-based game — let it emerge)

### Suggested Placement

| Node | Audio | Duration | Why |
|---|---|---|---|
| w_006 (THE OOR SLIDE) | Short shuffle, normal envelopes | 5s | The player first feels the Cupid Shuffle |
| w_slide_run2b (WRONG WAY) | Reversed shuffle | 5s | The reversal — same audio, backwards feel |
| w_008f (MOVEMENT IN UNITY) | Pad/drone — sustained chord, no rhythm | 5s | The dissolution moment, rhythmless |
| w_010a (DANCE CIRCLE) | Acid bass loop | 5s | The circle energy, raw and direct |
| w_011 (THE CLOSING) | Chamfer tone, very quiet | 3s | The earned silence |
| w_004b (THE OPERATOR) | Single sub-bass pulse | 2s | OOR adjusting — one felt correction |
| w_silence_run3 | Silence (literally stop all audio) | — | The silence IS the audio event |
| w_beauty_yielded | Full soundcheck sequence | 30s | The easter egg |
