# Track Production Guide — DJ OOR
**How Deep Offering was built. Blueprint for making more.**
**All audio is procedural Web Audio API. Zero samples. Single HTML file.**

---

## The Deep Offering Formula

The track that works has five layers entering sequentially over a chord progression, with a breakdown and return. Here's the exact recipe.

### Architecture

```
BARS  1-4:   Drums only (establish groove)
BARS  5-8:   + 303 acid (texture, low filter, fading in slowly)
BARS  9-12:  + Rolling bass + sub-bass + melody (THE DROP)
BARS  13-16: Everything full (acid filter opens, hats louder)
BARS  17-18: Beat drops out (bass rings free, melody louder)
BARS  19-20: Beat returns (everything peaks)
BARS  21-24: Fade out
```

24 bars at 124 BPM = ~46 seconds. Adjust bar counts for shorter/longer tracks.

### The Five Layers

Each layer has its own gain structure and enters at a specific bar. The key insight: **later layers are louder, earlier layers pull back when later layers enter.**

| Layer | Enters | Peak Gain | Notes |
|---|---|---|---|
| Drums | Bar 0 | kick 0.7, clap 0.16, hats 0.09-0.14 | Drops out bars 16-17, returns bar 18 |
| 303 Acid | Bar 4 | 0.45, drops to 0.3 when bass enters | Texture layer, NOT the lead once bass arrives |
| Rolling Bass | Bar 8 | 0.75 (sidechain pumps 0.03→0.75) | THE lead. Sidechain ducking against kick. |
| Sub-bass | Bar 8 | 0.45 (sidechain pumps 0.02→0.45) | Pure sine, follows chord roots. The weight. |
| Melody | Bar 8 | 0.15, louder (0.22) in breakdown | Sine wave, follows chord progression |

### Gain Management Rules

1. **The acid must yield to the bass.** When the bass enters, pull the acid gain down by ~35%. The 303 is texture once the bass arrives.
2. **Sidechain everything against the kick.** Bass and sub both duck to near-zero on kick beats and swell back over 65% of the half-beat. This creates the pump.
3. **Hats build with layers.** Louder after bar 12 (0.09→0.14 on offbeats). Subtle — the listener shouldn't notice the change consciously.
4. **The breakdown is about absence.** Drop kick and clap. Reduce hats to ghost level. Reduce acid to 0.12. Let bass ring at 0.65 without sidechain. Melody gets slightly louder. The missing kick creates tension.
5. **The return hits harder because of the breakdown.** Everything comes back at full level. The contrast IS the energy.

---

## Layer-by-Layer Construction

### Layer 1: Drums

**Kick** — tech house style. Two components:
```javascript
// Body: sine with fast pitch sweep
k.frequency.setValueAtTime(160, bt);
k.frequency.exponentialRampToValueAtTime(38, bt + 0.06);  // 60ms sweep
kg.gain.setValueAtTime(0.7, bt);
kg.gain.exponentialRampToValueAtTime(0.001, bt + 0.22);

// Click transient: triangle at 3.5kHz, 7ms
kc.frequency.value = 3500;
kcg.gain.setValueAtTime(0.12, bt);
kcg.gain.exponentialRampToValueAtTime(0.001, bt + 0.007);
```
The click transient is critical — it gives the kick the "snap" that cuts through the bass. Without it, the kick is a dull thud. With it, it's a tech house punch.

**Clap** on beats 2 and 4. Three layered noise bursts offset by 7ms:
```javascript
for (let layer = 0; layer < 3; layer++) {
  const off = layer * 0.007;
  // bandpass noise at 1300 + layer*350 Hz, Q: 1.5
  // decay: 110ms
}
```
The 7ms offset between layers creates the "flam" — multiple hands hitting slightly apart. The ascending bandpass frequencies (1300, 1650, 2000) give each layer a different tonal character.

**Hats** on eighth notes. Offbeats louder than downbeats:
```javascript
const hVol = isOffbeat ? 0.09 : 0.04;  // normal
const hVol = isOffbeat ? 0.14 : 0.07;  // after bar 12 (full layers)
const hVol = isOffbeat ? 0.04 : 0.02;  // breakdown
```
Highpass at 9kHz. Decay: 40ms. The offbeat emphasis drives the groove forward.

**Shaker** on sixteenths. Very quiet texture:
```javascript
const vol = (step % 4 === 0) ? 0.03 : 0.012;
```
Highpass at 11kHz. Decay: 25ms. You shouldn't consciously hear the shaker — you should feel it as "the groove has momentum."

### Layer 2: 303 Acid

**Oscillator:** Sawtooth. Richer harmonics than square for this role (the bass takes the square territory).

**Pattern:** 16 steps in the track's key. Mix of accents, slides, and rests:
```javascript
{ note: 87.31, accent: true, slide: false },   // root, accented
{ note: 0, accent: false, slide: false },       // rest
{ note: 103.83, accent: false, slide: true },   // 3rd, slides into next
// ...
```

**Filter:** Macro sweep — starts at 200Hz, opens to 3000Hz over the track. Q rises from 10 to 16. But — crucially — the acid gain DECREASES when the bass enters, so even as the filter opens, the acid doesn't dominate.

**Gain envelope:**
```
Bar 4:  0.001 (silent)
Bar 7:  0.45  (faded in over 3 bars)
Bar 8:  0.45  (bass enters)
Bar 10: 0.3   (pulled back for bass, over 2 bars)
Bar 16: 0.3→0.12 (breakdown, over 1 beat)
Bar 18: 0.12→0.35 (return, over 2 beats)
```

**Delay:** Dotted-eighth (BEAT * 0.75), feedback 0.28, lowpassed at 1500Hz. Creeps in over the first 40% of the acid's duration. Creates rhythmic complexity from the simple pattern.

### Layer 3: Rolling Bass

The star of the show. Three components:

**Sawtooth oscillator** (root) + **square oscillator** (octave up, gain 0.25) → mixed at 0.7 → lowpass filter (Q: 4) → gain (sidechain automated) → mix.

**Sidechain pump** — the defining sound:
```javascript
if (isKickBeat) {
  bassGain.gain.setValueAtTime(0.03, bt);           // duck to near-zero
  bassGain.gain.exponentialRampToValueAtTime(0.75, bt + BEAT/2 * 0.65);  // swell back
}
```
The exponential ramp is key — the bass swells back with a curve, not linearly. This creates the "breathing" feel.

**Filter pump** — opens on offbeats, closes on beats:
```javascript
const fOpen = (eighth % 2 === 1) ? 1600 : 600;
bassFilter.frequency.setValueAtTime(fOpen, bt);
bassFilter.frequency.exponentialRampToValueAtTime(400, bt + BEAT/2 * 0.9);
```
This creates a rhythmic brightness that complements the sidechain pump. The bass gets brighter as it swells louder.

**Octave jumps** on the 4th and 8th eighth notes:
```javascript
if (eighth === 3 || eighth === 7) {
  bassOsc.frequency.setValueAtTime(root * 2, bt);
  bassOsc.frequency.setValueAtTime(root, bt + BEAT / 2);
}
```
These give the bassline its "rolling" character — the octave jumps create rhythmic accents that feel like the bass is bouncing.

**Chord progression:** Root frequency changes every 2 bars. For F minor: Fm(87.31) → Ab(103.83) → Bb(116.54) → Fm(87.31).

### Layer 4: Sub-bass

Pure sine oscillator following the chord roots. No harmonics — just weight.
```javascript
const subOsc = ctx.createOscillator(); subOsc.type = 'sine';
```
Sidechain-ducked alongside the main bass. Peak gain: 0.45. This is the "feel it in your headphones" layer — it adds physical low-end that the sawtooth bass can't provide alone.

### Layer 5: Melody

Sine oscillator playing quarter notes. Each chord in the progression gets its own melodic phrase:
```javascript
const melNotes = {
  0: [349.23, 0, 415.30, 466.16, 0, 349.23, 311.13, 0],  // Fm: F4 _ Ab4 Bb4 _ F4 Eb4 _
  1: [415.30, 0, 523.25, 415.30, 0, 349.23, 0, 0],        // Ab: Ab4 _ C5 Ab4 _ F4 _ _
  2: [466.16, 0, 523.25, 583.33, 0, 466.16, 415.30, 0],   // Bb: Bb4 _ C5 D5 _ Bb4 Ab4 _
  3: [349.23, 0, 311.13, 349.23, 0, 415.30, 349.23, 0],   // Fm: F4 _ Eb4 F4 _ Ab4 F4 _
};
```
Lowpassed at 3kHz for warmth. Gain: 0.15 normally, 0.22 during breakdown (louder when the beat drops out).

---

## Key & Chord Progressions

Everything must be in the same key. The 303 pattern, bass roots, sub-bass, and melody all use notes from the same scale.

### Common keys for electronic music:

| Key | Root (Hz) | 3rd | 4th | 5th | Octave | Feel |
|---|---|---|---|---|---|---|
| **A minor** | 110.00 | 130.81 (C) | 146.83 (D) | 164.81 (E) | 220.00 | Dark, classic |
| **F minor** | 87.31 | 103.83 (Ab) | 116.54 (Bb) | 130.81 (C) | 174.61 | Deep, heavy |
| **C minor** | 130.81 | 155.56 (Eb) | 174.61 (F) | 196.00 (G) | 261.63 | Moody |
| **D minor** | 73.42 | 87.31 (F) | 98.00 (G) | 110.00 (A) | 146.83 | Very deep |
| **G minor** | 98.00 | 116.54 (Bb) | 130.81 (C) | 146.83 (D) | 196.00 | Melancholic |
| **C major** | 130.81 | 164.81 (E) | 174.61 (F) | 196.00 (G) | 261.63 | Bright, euphoric |
| **F major** | 87.31 | 110.00 (A) | 116.54 (Bb) | 130.81 (C) | 174.61 | Warm |

### Common chord progressions (as root Hz sequences):

| Name | Degrees | For A minor | For F minor |
|---|---|---|---|
| **Classic house** | i → III → IV → i | Am Cm D Am | Fm Ab Bb Fm |
| **Emotional** | i → VI → III → VII | Am F C G | Fm Db Ab Eb |
| **Driving** | i → IV → V → i | Am D E Am | Fm Bb C Fm |
| **Dark** | i → VII → VI → V | Am G F E | Fm Eb Db C |

---

## Arrangement Variations

### Shorter track (~32 seconds, 16 bars)
```
Bars 1-2:   Drums
Bars 3-6:   + Acid
Bars 7-10:  + Bass + melody
Bars 11-12: Break
Bars 13-14: Return
Bars 15-16: Fade
```

### Longer track (~64 seconds, 32 bars)
```
Bars 1-4:   Drums only
Bars 5-8:   + Acid (filter very low)
Bars 9-12:  + Bass + sub (acid pulls back)
Bars 13-16: + Melody enters
Bars 17-20: Everything full, hats build
Bars 21-22: Break (drop kick/clap)
Bars 23-24: Return
Bars 25-28: Peak (acid filter fully open, everything loud)
Bars 29-32: Deconstruct (layers exit: melody, bass, acid, just kick + hat fading)
```

### No acid version (pure bass house)
Skip the 303 entirely. Use the bass + sub + drums + melody. The filter pump on the bass IS the song.

### No melody version (pure acid + bass)
Skip the sine melody. Let the 303 and the rolling bass interact. The acid's filter sweep provides the melodic interest.

---

## BPM Guide

| BPM | Genre Feel | Bass Character | Notes |
|---|---|---|---|
| 96-108 | Deep house | Slow pump, long swell | More space between beats. Filter decays are longer. |
| 110-118 | Classic house | Medium pump | The sweet spot for groovy. |
| 120-126 | Tech house / bass house | Tight pump, quick swell | Deep Offering lives here. Most versatile. |
| 128-132 | Progressive / peak time | Driving pump | More energy, less groove. |
| 134-140 | Hard house / acid | Aggressive pump | The sidechain becomes a weapon. |

---

## Creating a New Track — Checklist

1. **Pick a key and progression.** Write out the Hz values for root, 3rd, 4th, 5th, octave. Pick a 4-chord progression.

2. **Write the 303 pattern.** 16 steps using scale tones. Put accents on strong beats (1, 5, 9, 13 of 16). Put slides between adjacent scale tones. Put rests where the bass will need space (every 4th step minimum).

3. **Write the melody.** 8 quarter notes per chord (one bar). Use chord tones on strong beats, passing tones on weak beats. Zeros for rests. Four arrays, one per chord.

4. **Set the arrangement.** Pick bar numbers for: drums only, acid enters, bass enters, break, return, fade.

5. **Set the gains.** The acid must pull back when the bass enters. The bass is the loudest non-drum element. The melody is the quietest. The sub-bass is felt, not heard.

6. **Set the macro filter sweep.** The acid filter starts at 200Hz and opens to 2500-3500Hz. The opening rate should be slow enough that you don't notice it bar-to-bar — you just realize at bar 16 that the acid sounds completely different from bar 4.

7. **Test and adjust.** The most common problem is the acid being too loud once the bass enters. Pull it back. The second most common problem is the sub-bass masking the kick — make sure the sidechain duck is deep enough (0.02-0.03).

---

---

## The Golden Hour Formula (Dark Indie Disco)

A different architecture from Deep Offering. Pad-first, atmosphere-heavy, everything fades in over bars not beats. Less aggressive, more hypnotic.

### Architecture

```
BARS  0-3:   Kick + offbeat hats only (minimal pulse)
BARS  4-7:   + Vocoder pad fades in (THE HARMONIC BED)
BARS  8-11:  + Acid whispers in underneath (texture, not lead)
BARS  12-15: + Bass + sub fade in over 2 bars (the groove arrives)
BARS  16-19: + Clap + melody with delay echoes (full, but spacious)
BARS  20-23: BREAK — pad + melody + delay tails only (4 bars of space)
BARS  24-27: Return, everything peaks
BARS  28-31: Long fade (10 beats)
```

32 bars at 122 BPM = ~64 seconds.

### Key Differences from Deep Offering

| | Deep Offering | Golden Hour |
|---|---|---|
| **First harmonic layer** | 303 acid (bar 4) | Vocoder pad (bar 4) |
| **Acid role** | Texture that yields to bass | Whisper underneath the pad |
| **Bass character** | Aggressive pump (0.03→0.75) | Gentle pump (0.03→0.65) |
| **Filter pump range** | 600-1600Hz | 500-1300Hz |
| **Atmosphere** | Acid delay only | Global reverb (2.5s) + acid delay + melody delay |
| **Clap** | From bar 0 | From bar 16 |
| **Hats** | Eighths from start | Offbeats only until bar 16 |
| **Breakdown** | 2 bars | 4 bars |
| **Overall vibe** | Pumping bass house | Dark indie disco, tension |

### The Pad-First Approach

The pad establishes harmony BEFORE the bass or melody arrive. This means:
1. The listener's ear locks onto the chord progression through the pad
2. When the bass enters, it reinforces what the ear already knows — satisfying, not surprising
3. The melody, arriving last, floats on top of an established harmonic bed

The pad should fade in over 4 bars — start at gain 0.01, reach 0.05 by bar 8. It grows slowly enough that the listener doesn't notice it arriving, they just realize the track has warmth now.

### Atmosphere: Three Delay/Reverb Layers

1. **Global reverb** — ConvolverNode with 2.5s impulse, 0.5 decay. The pad and acid both send into it. Creates the "room."
2. **Acid delay** — Dotted eighth (BEAT * 0.75), feedback 0.38, lowpassed at 1200Hz (dark echoes). Higher feedback than Deep Offering (0.38 vs 0.28) because the acid is quieter so the echoes can linger.
3. **Melody delay** — Dotted quarter (BEAT * 1.5), feedback 0.3, lowpassed at 2000Hz (brighter echoes). Different time from the acid delay creates polyrhythmic overlap.

### Gain Rules for This Style

- **Acid peaks at 0.2** (vs 0.45 in Deep Offering). It's a murmur.
- **Acid fade-in takes 4 bars** (vs 3 in Deep Offering). Slower everything.
- **Bass uses explicit fade-in multiplier**: `Math.min(1, (bar - bassBar) / 2)` — first bar at 50%, full at bar 2. No sudden appearance.
- **Pad grows over the entire track** — `Math.min(0.05, 0.01 + (bar - padBar)/4 * 0.01)`. Never stops growing, just reaches a ceiling.
- **Breakdown pad is 1.8x normal** — it fills the space the beat left behind.

### Sparse Acid Pattern (Golden Hour Style)

10 rests out of 16 steps. Only 2 accents. The acid barely plays — it's more about the delay echoes of the notes it does play than the notes themselves.

```javascript
{ note: 103.83, accent: false, slide: true  }, // Ab2
{ note: 0 }, { note: 116.54, accent: false, slide: true }, { note: 0 },
{ note: 130.81, accent: true, slide: true },  // C3 — one accent
{ note: 116.54, accent: false, slide: true }, { note: 0 }, { note: 0 },
{ note: 103.83, accent: false, slide: false }, { note: 0 }, { note: 0 },
{ note: 116.54, accent: false, slide: true },
{ note: 103.83, accent: true, slide: true },  // Ab2 — second accent
{ note: 0 }, { note: 0 }, { note: 0 },
```

### Melody with Delay Echoes

The melody is sparser too — more rests, letting the delay tails fill the gaps. Each note echoes at dotted-quarter intervals, creating ghost melodies that overlap with the real ones.

---

## Frequency Reference for Melody Writing

```
C3  = 130.81    C4  = 261.63    C5  = 523.25
Db3 = 138.59    Db4 = 277.18    Db5 = 554.37
D3  = 146.83    D4  = 293.66    D5  = 587.33
Eb3 = 155.56    Eb4 = 311.13    Eb5 = 622.25
E3  = 164.81    E4  = 329.63    E5  = 659.25
F3  = 174.61    F4  = 349.23    F5  = 698.46
Gb3 = 185.00    Gb4 = 369.99    Gb5 = 739.99
G3  = 196.00    G4  = 392.00    G5  = 783.99
Ab3 = 207.65    Ab4 = 415.30    Ab5 = 830.61
A3  = 220.00    A4  = 440.00    A5  = 880.00
Bb3 = 233.08    Bb4 = 466.16    Bb5 = 932.33
B3  = 246.94    B4  = 493.88    B5  = 987.77
```

Bass oscillators use octave 2-3. Melody uses octave 4-5. Sub-bass uses octave 2.
