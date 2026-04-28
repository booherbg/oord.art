# Familiar Path — Harvest Ledger Design

## Recommendation

**The Familiar's reward should be a harvest manifest: a clinical, path-dependent readout that appears near the end of the path (f_018) and reflects the player's operational choices in the Familiar's geological/organic voice.**

This proposal adds 2 light choices, 4 new tags, and ~8 conditional_text entries. No new nodes. No story progression changes. The pale_antler artifact remains the game-state reward. The ledger is pure flavor — a field notebook entry that makes the Familiar feel like an ancient professional who has filed thousands of these.

**Why this is the right reward:** The Familiar isn't having a personal experience. It's running a harvest. Its "reward" is the same thing a geologist gets at the end of a survey: a reading. The reading is specific, clinical, and quietly reveals whether the Familiar's choices were precise or sloppy, detached or compromised. The player doesn't get graded — they get a report that sounds like it was written by something that has been doing this since before the continents separated.

**What makes it replayable:** 6 total choice points (4 existing + 2 new) produce meaningfully different manifests. A player who tuned deep/sieved/embedded/watched-the-person gets a reading haunted by anomalous data and body-residue. A player who tuned surface/bulk/pulled-back/watched-the-yield gets a clean, efficient, forgettable report. Neither is better. The Familiar has no preference. The player might.

---

## Handoff: Review Checklist

Before shipping to JSON, we should verify together:

### Consistency Checks
- [ ] **`has_all_tags` support** — The manifest conditionals require AND logic (e.g., `harvests_deep` AND `sieved_extraction`). Confirm the engine supports `has_all_tags`, or decide to use composite tags instead.
- [ ] **f_014 arrival_variants** — f_014 currently has existing conditional_text for `lingers_on_watcher`. The new `sieved_extraction`/`bulk_extraction` arrival_variants need to coexist without collision. Verify rendering order.
- [ ] **f_018 conditional_text stacking** — f_018 currently has one conditional (`lingers_on_watcher`). We're adding up to 8 more. Confirm that multiple conditional_text entries append correctly in sequence (manifest base, then operational note, then watcher note if applicable).
- [ ] **Tag persistence** — The 4 new tags (`harvests_deep`, `harvests_surface`, `sieved_extraction`, `bulk_extraction`) need to persist from f_006/f_013 through f_018. Verify they follow the same persistence model as existing tags like `reads_crowd`.
- [ ] **Choice text voice** — Read the 4 new choice texts aloud in the Familiar's voice. Flag anything that sounds like a game menu instead of an ancient being adjusting an instrument.

### Creative Checks
- [ ] **Manifest numbers** — Are "3.2 standard confluences" and "4.9 standard" and "2.1 vein extractions" the right scale? They should feel like real measurements, not round numbers or game scores. Adjust if any feel too neat.
- [ ] **"Standard" as a unit modifier** — Does "standard confluences" land? It implies a baseline the Familiar has calibrated against across thousands of harvests. If it feels too lab-coat, we can cut it.
- [ ] **Operational note tone** — The `watches_person` variants are the most emotionally charged ("You are not sure why you wanted to," "A habit you do not recall developing"). Confirm these don't break the Familiar's register or anticipate the dissolution too early.
- [ ] **Manifest placement in f_018** — Currently proposed after the watcher-leaves paragraph. Could also go after "Objects are less committed to causality than people suppose." Which landing feels more natural?

### Scope Check
- [ ] **Is 6 choices too many for a linear path?** The Familiar path is 20 nodes. 6 choices means a decision roughly every 3 nodes. This is lighter than the Wanderer but heavier than the current 4. If it feels busy, we can cut one of the two new choices (f_013 is more cuttable than f_006).

---

## Design Detail

### Concept

The Familiar's reward is operational, not personal. At the end of the path, the player sees a brief harvest manifest — a clinical readout of what was extracted, in the Familiar's geological/organic register, with lore-appropriate units. The manifest is path-dependent: different choices produce different measurements, giving the path replayability without altering story progression.

The pale_antler artifact stays as the game-state reward. The ledger is flavor — the Familiar's field report.

---

## Existing Choice Points (No Changes Needed)

These already shape the Familiar's operational posture. They feed into the manifest.

| Node | Choice A | Choice B | What it measures |
|---|---|---|---|
| f_003 | `reads_crowd` | `monitors_aperture` | Preparation method: field survey vs. pressure reading |
| f_008 | `stays_embedded` | `pulls_back` | Operational stance: immersion vs. precision |
| f_011 | `notes_and_moves` | `lingers_on_watcher` | Anomaly response: catalogue vs. investigate |
| f_014 | `watches_yield` | `watches_person` | Final frame: aggregate data vs. individual |

---

## New Light Choices (2 additions)

### Choice 5: Harvest Focus — at f_006 (THE AGITATION)

Currently f_006 has no choices. The Familiar watches OOR begin operating. This is the natural moment to choose what the rod prioritizes.

**Insert choices at end of f_006:**

```
"choices": [
  {
    "text": "Tune the rod to the deep seams. The confluences run oldest there.",
    "next": "f_007",
    "tag": "harvests_deep",
    "arrival": null,
    "requires": null
  },
  {
    "text": "Tune the rod to the surface deposits. What is ready now.",
    "next": "f_007",
    "tag": "harvests_surface",
    "arrival": null,
    "requires": null
  }
]
```

**Remove:** `"next": "f_007"` (replaced by choices)

**Why this works:** The Familiar is an instrument operator choosing a frequency band. Deep seams = slower to extract, richer, older deposits (Unity/Goodness concentrations that have been building across lifetimes). Surface deposits = faster, purer, already loose (Truth/Beauty concentrations close to the skin). Neither is better. Different harvest strategies.

**f_007 arrival_variants to add:**

```json
{
  "requires": { "has_tag": "harvests_deep" },
  "text": "The rod is tuned low. It reads the oldest deposits first, the ones layered under years of calcification. The surface noise falls away."
},
{
  "requires": { "has_tag": "harvests_surface" },
  "text": "The rod is tuned high. It reads what is already loose, already rising. The deep seams will keep for another harvest."
}
```

---

### Choice 6: Extraction Method — at f_013 (THE CIRCLE)

Currently f_013 has no choices. The arrow spins, the assay runs. This is the natural moment to choose HOW the Familiar processes what the circle exposes.

**Insert choices at end of f_013:**

```json
"choices": [
  {
    "text": "Let the rod sieve. Take only what passes clean.",
    "next": "f_014",
    "tag": "sieved_extraction",
    "arrival": null,
    "requires": null
  },
  {
    "text": "Let the rod draw wide. Take the full deposit, calcification and all.",
    "next": "f_014",
    "tag": "bulk_extraction",
    "arrival": null,
    "requires": null
  }
]
```

**Remove:** `"next": "f_014"` (replaced by choices)

**Why this works:** Sieving = lower volume, higher purity. The Familiar is selective, takes only clean transcendental material, leaves the rest. Bulk = higher volume, mixed purity. The Familiar takes everything the rod can draw, trusting Sooboont to sort it. This is the classic field-assay tradeoff: precision vs. yield.

**f_014 arrival_variants to add:**

```json
{
  "requires": { "has_tag": "sieved_extraction" },
  "text": "The rod is filtering. It passes over the mixed deposits and sings only for the clean veins. Less volume. No contamination."
},
{
  "requires": { "has_tag": "bulk_extraction" },
  "text": "The rod draws everything. Clean and calcified together. Volume is high. Sooboont can sort what you cannot."
}
```

---

## The Manifest

Appears as conditional_text in **f_018 (THE DISPERSAL)**, after the paragraph about the watcher leaving. The Familiar is standing in the empty room, the harvest complete. This is when an operator would check the instrument.

The manifest is 3-4 lines. Clinical. Specific. Uses the Familiar's geological/organic vocabulary. Never sounds like a video game stats screen — sounds like a geologist's field notebook.

**Note on jacket woman (UPDATED):** f_014 was revised — the jacket woman no longer enters the circle. The Familiar notes the refusal: "The deposit did not yield. You note it." This is a data point the manifest could reference. Consider adding a line to the manifest variants acknowledging one deposit that held (e.g., "One concentration noted but not drawn. The armor held. Filed."). This would thread naturally into the `watches_person` operational notes, which already reference the watcher's anomalous reading. Two unmined deposits: one who refused (jacket woman), one who was uncategorizable (watcher).

### Manifest Structure

Each manifest has three components:
1. **Primary yield** — what was harvested, in what concentration (driven by `harvests_deep` / `harvests_surface`)
2. **Extraction quality** — purity vs. volume (driven by `sieved_extraction` / `bulk_extraction`)
3. **Operational note** — a one-line observation shaped by the Familiar's stance choices (`stays_embedded`/`pulls_back`, `watches_yield`/`watches_person`)

### Units Vocabulary

All units should sound like they belong in a geological survey or a mycologist's field log. Never engineering. Never video game.

| Measurement | What it describes | Register |
|---|---|---|
| confluences | Unity yield — things that flowed together | geological (river systems) |
| vein-grade | Truth yield — exposed seams, purity rating | geological (mining assay) |
| voluntary yield | Goodness yield — what was given, not taken | biological (sap, resin) |
| luminance | Beauty yield — the visible residue | organic (bioluminescence) |
| root-mass | density of deep deposits | biological |
| calcification residue | contamination from years of suppression | geological |
| stratum / strata | layers of accumulated deposit | geological |
| confluence density | how tightly Unity deposits were packed | geological |
| membrane throughput | flow rate through the aperture | organic (osmosis) |

---

### Manifest Variants

**8 primary combinations** (2 harvest focus x 2 extraction method x 2 operational stance variants that matter most). Below are the key variants. The operational stance (`stays_embedded`/`pulls_back`, `watches_yield`/`watches_person`) modifies the final line.

---

#### Deep + Sieved

> The rod holds its final reading. You check it the way you always check it.
>
> Primary yield: confluences, 3.2 standard, sieved from four strata. Root-mass density: concentrated. Calcification residue: negligible. The deep material passed clean. Surface deposits were not pursued. They will keep.

**+ stays_embedded:**
> The body is still resonating. Some of the density it carried is in the reading. You cannot determine how much is harvest and how much is residue from participation. You file both.

**+ pulls_back:**
> The survey was clean. Distance preserved the instrument's calibration. Every reading is the rod's, not the body's.

**+ watches_person:**
> One reading unclassified. The watcher's deposit did not match any standard concentration. Filed as anomalous. The rod is still humming at a frequency you did not tune it to.

**+ watches_yield:**
> All readings nominal. The aggregate confirms sufficient flow restoration. The drain will hold.

---

#### Deep + Bulk

> The rod holds its final reading.
>
> Primary yield: confluences, 4.9 standard, unsieved, from four strata. Root-mass density: high, mixed. Calcification residue: present, moderate. Volume compensates. Sooboont will sort what the rod did not.

**+ stays_embedded:**
> Some of the body's resonance is in the bulk reading. It is not distinguishable from the harvest. This does not concern you. This concerns you slightly.

**+ pulls_back:**
> The volume is high. The purity is Sooboont's problem. The survey mapped the full deposit and the rod drew all of it.

**+ watches_person:**
> One deposit drawn unsorted with the rest. The watcher's concentration is in the bulk now, mixed with the others. You cannot retrieve it separately. You are not sure why you wanted to.

**+ watches_yield:**
> Total volume: above historic mean. The drain is clear. The flow will hold longer than usual. Good yield. Simple report.

---

#### Surface + Sieved

> The rod holds its final reading.
>
> Primary yield: 2.1 vein extractions, surface-grade, 96% uncontaminated. Thin material, cleanly drawn. The deep strata were not pursued. They will need another harvest, or ten, or a number the rod does not predict.

**+ stays_embedded:**
> The surface material moved through the body during extraction. It was warm. That is a measurement, not a sentiment.

**+ pulls_back:**
> Clean extraction. The rod's readings match the survey exactly. Surface deposits are predictable. This is their virtue and their limitation.

**+ watches_person:**
> One surface reading did not behave like the others. The watcher's deposit rose without agitation, already loose, already offered. The rod sieved it and found no calcification. None. This is not typical.

**+ watches_yield:**
> Purity: exceptional. Volume: below mean. The drain clears but slowly. Another harvest will be needed sooner than usual.

---

#### Surface + Bulk

> The rod holds its final reading.
>
> Primary yield: surface draw, 3.8 standard volumes, mixed purity. The loose material came easily. Some calcification pulled with it. The deep strata remain for next time.

**+ stays_embedded:**
> The body processed a higher volume than the rod intended. Participation amplified the draw. The surplus is unclassified.

**+ pulls_back:**
> Fast extraction. The survey identified what was loose and the rod drew it all. Efficient. The purity is adequate.

**+ watches_person:**
> The watcher's surface deposit was the cleanest draw of the night. The rod held it separately for a moment before adding it to the bulk. A habit you do not recall developing.

**+ watches_yield:**
> Volume: adequate. Mixed purity, mixed strata. The flow is restored. Standard harvest.

---

## Implementation Notes

### Where to insert the manifest

In f_018 (THE DISPERSAL), as conditional_text entries. The manifest fires after the main text about humans leaving. The existing `lingers_on_watcher` conditional stays — it fires separately (different condition).

The conditional_text array would need **8 entries** (one per harvest-focus + extraction-method combination), each with an `append` that includes the base manifest + a nested check for stance. 

**Simpler approach:** Since the JSON doesn't support nested conditionals, implement as follows:

1. The **base manifest** (3 lines) is driven by a combination of `harvests_deep`/`harvests_surface` + `sieved_extraction`/`bulk_extraction`. This means 4 manifest variants.

2. The **operational note** (1 line) is a separate conditional_text entry driven by `stays_embedded`/`pulls_back` or `watches_yield`/`watches_person`. These fire independently and append after the manifest.

This means f_018 gets:
- 4 conditional_text entries for the base manifest (one per combination)
- 4 conditional_text entries for the operational note (one per stance tag that matters most — probably keyed to the f_014 choice since it's freshest)

Total: 8 conditional_text additions to f_018. Plus the existing `lingers_on_watcher` conditional. Clean, no nested logic needed.

### Condition structure for combination tags

The JSON supports `has_tag` checks. For combinations, use:

```json
{
  "condition": {
    "has_all_tags": ["harvests_deep", "sieved_extraction"]
  },
  "append": "..."
}
```

If `has_all_tags` isn't supported in the engine, add a note to implement it — it's a simple AND check on the tag array. Alternatively, derive a single composite tag at the choice point (e.g., `harvest_profile_deep_sieved`) but that's less elegant.

### What NOT to do

- Don't make the manifest a separate node. It belongs in the flow of f_018, not as its own screen.
- Don't add numbers that feel like XP or scores. "3.2 standard confluences" is a field measurement, not a score. The Familiar would never rank a harvest.
- Don't let the manifest text break the dissolution in f_020. The manifest is f_018 business. By f_019/f_020, the Familiar is past reporting.
- Don't make any combination feel like a "wrong" choice. Deep/sieved is not better than surface/bulk. They're different strategies for different conditions. The Familiar has done this thousands of times. It knows there is no optimal.

---

## Optional: Manifest as Visual Element

If the game ever has a UI layer, the manifest could render as a small card or instrument readout — the rod's final measurement displayed in a format that looks like a geological survey entry or a lab notebook page. Handwritten-style font, faded ink, maybe a small rod-frequency waveform.

This is cosmetic. The text alone does the work.

---

## Summary

| Element | Count | Impact |
|---|---|---|
| New choices | 2 (f_006, f_013) | Light, same-destination, tag-only |
| New tags | 4 (`harvests_deep`, `harvests_surface`, `sieved_extraction`, `bulk_extraction`) |
| New arrival_variants | 4 (2 per new choice, in f_007 and f_014) |
| New conditional_text | ~8 in f_018 (4 manifest base + 4 operational notes) |
| Nodes modified | 4 (f_006, f_007, f_013, f_014) + f_018 |
| Story progression changes | None |
| New nodes | None |

Total choice points after implementation: **6** (up from 4). The Familiar path stays linear but the player's operational fingerprint is more specific. Replays with different choices produce a noticeably different harvest report without any structural divergence.

---

## Ship Plan

Once the checklist above is clear, implementation is straightforward:

### Step 1: Engine check (~5 min)
Confirm `has_all_tags` works or decide on composite tags. This gates everything else.

### Step 2: Add new choices to f_006 and f_013 (~10 min)
Mechanical JSON edits. Add choices, remove `next`, add arrival_variants to f_007 and f_014.

### Step 3: Write final manifest text (~20 min)
Take the 4 base manifests + 4 operational notes from this doc, adjust any numbers or phrasing flagged in review, and format as conditional_text entries for f_018.

### Step 4: Playtest read-through (~15 min)
Read through 2-3 path combinations end to end. Check that the manifest lands naturally in f_018 and doesn't compete with the dissolution in f_020. Verify the arrival_variants in f_007 and f_014 don't feel like interruptions.

### Step 5: Commit
One commit. All changes are in familiar_nodes.json. No other files affected.
