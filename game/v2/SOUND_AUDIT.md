# Sound Audit: Song Player Rebuild + EP B-Side Notes

## Song Player Rebuild Plan

### The Gap

The song player (`stToggleListen`) reuses the in-game `SoundtrackEngine`, which was built for reactive zone crossfading — it doesn't compose, it just adjusts gain tables. The EP compose functions are true compositions: per-bar envelope curves, phase-based arcs, evolving filter sweeps across the full duration.

| | Game SoundtrackEngine | EP B-side |
|---|---|---|
| **Acid Q** | 4–9 (polite) | 10–18 (bites) |
| **Acid filter sweep** | +300/+600 above static zone base (150–600 Hz) | +800/+2500 above an evolving base that ramps across the whole track |
| **Scheduling resolution** | Quarter-note | Sixteenth-note |
| **Dynamics** | Flat gain per zone, crossfade between zones | Per-bar volume curves that breathe over hundreds of bars |
| **Effects** | Shared reverb, one acid delay | Per-track reverb (tuned impulse), delay sends with filtered feedback |
| **Pad detune** | +/-5 cents | +/-7 cents (wider) |
| **Bass sub** | Present but simple envelope | Independent sub envelope with sidechain-style pump |
| **Structure** | Zone gain table swap with linear ramp | Phase-based: named phases at bar numbers, instruments enter/exit with shaped curves |

### What the Rebuild Looks Like

The song player already fakes a composed track — it walks through a fixed zone sequence (`hum > pulse > warehouse > floor > transcendent > floor > breakdown > floor > transcendent > closing > silence`, 110 bars total, ~3.5 minutes). Replace that zone-walk with a single compose function, EP-style:

1. **Own compose function** (like `compose_harvest`) rather than routing through `SoundtrackEngine.setZone()`. Still generative — randomized root, progression, acid pattern, melody — but with a composed arc.
2. **Phase map** translating the current zone sequence into bar numbers: `{ HUM: 0, PULSE: 1, WARE: 9, FLOOR: 21, PEAK: 33, BREAK: 49, RETURN: 55, PEAK2: 63, TRANSCEND: 79, CLOSING: 87, SILENCE: 95 }` — same proportions, but now each phase gets shaped fade curves instead of a gain table swap.
3. **EP acid settings**: Q up to 10–18 range, filter base that ramps from ~200 Hz at HUM to ~1200 Hz at PEAK (like church's `filterBase` approach), accent peaks at +2500.
4. **EP bass pump**: dedicated sub oscillator with the sidechain-style "gasp" envelope from harvest.
5. **Sixteenth-note scheduler** using `startSched` instead of the 25ms `setInterval` advance loop.
6. **Per-track reverb/delay** with the EP's tuned impulse and filtered feedback.

The interface stays the same — `stToggleListen` creates/resumes an AudioContext, calls the compose function, gets back a cleanup function. Stop button calls cleanup. The `SoundtrackEngine` class is untouched and still handles in-game audio.

### Tradeoff

The song player is currently just "play the game engine in demo mode." Rebuilding it means maintaining two sound systems — the zone-driven engine for gameplay, and a compose function for the standalone player. But they're already architecturally different in practice (the EP proves the compose pattern works independently), and the song player's fixed zone sequence means it doesn't benefit from the zone system's reactivity anyway.

Net: it's basically writing a seventh EP track that's ~3.5 minutes long, reusing the EP's `startSched`, `schedKick`, `schedHat`, `schedClap` utilities, with the EP's acid/bass/pad balance.

### Harvest snare in the game engine

The harvest snare roll (layered claps with ghost note doubling on final four hits, sixteenth-note escalation) is a strong candidate for the game engine's `_snareRoll` method, which currently only fires on transcendent zone entry. The game engine version is simpler — it could adopt harvest's approach for more punch on transcendent transitions.

---

## EP Listening Notes

### Harvest (B2) — Closer

**Acid line: LOCKED.** The gating, levels, and movement over time are validated. The squelch-to-full-pattern arc — step gating from beats-only through eighths to full, with melody interaction mode — is the track's signature. Don't rework.

**Build structure: Goa trance logic.** Not every layer at fixed intervals. Three groups with breathing room:

1. **Foundation** (bars 0–8): Kick fades in, bass joins at bar 8. Groove locks.
2. **Groove breathes** (bars 8–20): Just kick + bass. Let the listener lock in.
3. **Percussion cluster** (bars 20–28): Shaker → hats → clap, 4-bar intervals. Quick texture additions.
4. **Settled groove** (bars 28–40): Full rhythm breathes before the acid.
5. **Acid squelch** (bars 40–72): 32 bars of slow build, the tension engine. Submix ramps over 16 bars.
6. **Pad** (bar 56): Harmonic bed arrives under the squelch.
7. **Acid opens** (bar 72): First big moment. Submix ramps over 8 bars.
8. **Melody** (bar 96): Track arrives. 8-bar fade-in.
9. **Peak** (bar 128): Full ride until break at 224.

Build takes ~4:12 (35% of track). Classic goa proportion. Chamfer fades to noise floor over 56 bars — still present during the groove, gone by the time acid is cooking.

**Snare:** Uses `schedSnare` (low body at 500Hz, 4 crack layers 900–2400Hz, click transient). Chemical Brothers / big beat style. Fills every 16 bars from ACID onward, 8-bar escalating roll at bars 240–248.

**Mix notes (2026-04-29):**
- Bass is overpowering — fun but buries the acid and pads. Needs to come down.
- Acid is hard to hear over the warm bassline. Needs more presence in the mix.
- Melody is also slightly quiet but better than acid.
- Pads are basically inaudible. Need to come up significantly.
- First bass hit enters a bit hard — needs a gentler fade-in.

### Golden Hour (A3) — Perfect

No changes. Incredibly warm. Feels like its own thing — doesn't quite belong with the other tracks stylistically, which is part of what makes it special.

**Idea: first-class role in the game.** Golden Hour's warmth and standalone quality suggest it could anchor a specific game moment rather than just living on the EP. Possibilities:
- A dedicated zone or game state that triggers Golden Hour's pad-first, kick-light, delay-heavy character
- The closing/remembrance screen soundtrack (currently uses the SoundtrackEngine's `closing` zone, which is just chamfer + quiet pad — Golden Hour's full warmth would hit harder)
- An unlockable "golden hour" mode on the song player after earning all transcendentals

### Tikkun (A2)

At ~13 minutes. The build/shatter/rebuild arc is structurally ambitious — deconstruction from bar 40 through the void, then gradual mend. Resonator singing section closes it out.
