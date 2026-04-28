# Workshop Handoff

**Date:** 2026-04-28
**Status:** Ready for review session. Beauty node needs prose workshop (priority).

---

## What Was Done (in JSON)

Changes shipped directly to the node files:
- **wanderer_nodes.json** — w_009: jacket woman no longer enters the circle. She refuses. Wanderer recognizes the posture. ("You know that posture. You've been standing in some version of it all night.")
- **wanderer_nodes.json** — w_silence_run3: Full rewrite (workshop Main Version + workshopped narrator-silence passage). New structure: observation → jacket woman posture → jaw tighten → voice says keep moving → walk toward her → space between thoughts opens. OOR action updated.
- **wanderer_nodes.json** — w_jacket_woman: Full rewrite, renamed "THE CROSSING." Workshopped dialogue ("I keep waiting to feel like I'm actually here" / "It's exhausting"). New OOR action (voluntary yield). Old truth_shard conditional replaced with blank_key placeholder.
- **familiar_nodes.json** — f_014: jacket woman refusal mirrored from Familiar's perspective. ("The deposit did not yield. You note it.") Sooboont's draw moved to paint-knuckle man.

Still proposed in docs, not yet shipped:
- w_loading_dock revised text (proportional, reviewed, ready to apply)
- w_bartender_run3 revised text
- w_011/w_012 conditional updates for goodness tag
- w_002 arrival variant for Run 3

---

## Review Order

### 0. Beauty Node — THE HANDS (needs prose workshop)

**Status:** Design agreed, rough draft exists, prose needs full workshopping.
**Priority:** First task in next session. Needs fresh context and full attention.

#### What was decided:
- Beauty lives in **Run 1** as a branch off **w_005 (THE DECISION)**
- Third choice alongside "submit to the dance floor" and "GET OUT": **"Take a step back. You're not leaving. You're not ready. You need a second."**
- The Wanderer steps sideways, leans against the wall near the amp rack, and sees **someone working behind the speakers** — the Builder
- One node: **w_005b (THE HANDS)**. The Wanderer watches the Builder's hands. Sees craft. Recognizes that the room was built by someone who cared. Beauty and horror are the same thing. Beauty yielded.
- Drops back to **w_006 (THE OOR SLIDE)** so Unity can still be earned in the same run
- Awards `awards_transcendental: "beauty"` AND `awards_tags: ["beauty", "saw_builder"]` — visible reward, not silent
- Introduces the Builder character for the first time. Plants seed for full v2 Builder path.

#### What needs workshopping:
1. **The prose itself.** A rough draft was written at 60% context. It needs full reworking with fresh attention. The draft had the right beats but the language was generic in places. Key moments to nail:
   - The hands working inside the panel (craft, precision, ten-thousand-times familiarity)
   - The frequency shift when the Builder makes an adjustment ("a frequency you couldn't hear a second ago is suddenly there")
   - The eye contact through the gap in the speakers (brief, not performed, the way a carpenter sees someone watching)
   - The beauty/horror synthesis: "the thing they built processes people and the thing they built is beautiful and these are not in contradiction"
   - All in Wanderer register: concrete, domestic, lived-experience. No systems language.

2. **w_011 and w_012 conditionals.** Need compound conditionals for beauty + entered_circle (both present in same run). The first_match chains currently check beauty first — if the beauty tag fires alone, the Run 1 Unity closing text gets masked. Fix: add `has_all_tags: ["beauty", "entered_circle"]` conditional BEFORE the existing standalone beauty check in both w_011 and w_012. Write text that holds both experiences: "You saw the hands that built this place. And then you danced anyway."

3. **w_005 choice text.** The third choice needs to feel like a real emotional option, not a game branch. It's the pause between surrender and flight. Current draft: "Take a step back. You're not leaving. You're not ready. You need a second." May need tuning.

4. **Arrival variant at w_006.** If the player comes from w_005b instead of w_005, w_006 needs an arrival variant that acknowledges the sideways step: the Wanderer saw something and now they're joining the dance floor carrying that knowledge. Brief — one line.

#### Mechanical checklist:
- [ ] Create node w_005b in wanderer_nodes.json
- [ ] Add third choice to w_005
- [ ] Add arrival_variant to w_006 for `has_tag: "saw_builder"`
- [ ] Add compound conditional to w_011 for beauty + entered_circle
- [ ] Add compound conditional to w_012 for beauty + entered_circle
- [ ] Verify w_004b's existing `has_artifact: "blank_key"` Builder branch still works (this becomes the v2 full path; w_005b is the v1 light version)
- [ ] Confirm `has_all_tags` is supported or implement it

#### Reference for prose workshop:
- **Wanderer voice rules:** concrete before abstract, no systems language, domestic metaphors, show don't tell
- **Builder introduction principles:** The Wanderer sees the Builder through their own register, not the Builder's. No engineering language. The craft is described through what the Wanderer can observe: hands, wire, the sound changing.
- **Beauty/horror thesis:** The craftsmanship is undeniable. The purpose is extraction. These are not in contradiction. This is the specific flavor of Beauty this game earns — not "look at the sunset" but "someone poured their life into building something that eats people."
- **Rough draft** exists in this conversation's history but should be rewritten from scratch with these principles.

---

### 1. Run 3 Goodness Rewrite (in progress)

**Doc:** [RUN3_GOODNESS_WORKSHOP.md](RUN3_GOODNESS_WORKSHOP.md)
**Status:** Core nodes shipped (silence + jacket woman). Remaining items below.

**DONE:**
- w_silence_run3 full rewrite — applied to JSON
- w_jacket_woman full rewrite — applied to JSON
- Dialogue workshopped and locked
- Narrator silence beat workshopped and locked
- Loading dock pacing reviewed (proportional, no flag)

**Still to do:**
- Apply revised w_loading_dock text to JSON
- Apply revised w_bartender_run3 text to JSON
- Update w_011/w_012 conditionals for goodness tag
- Update w_002 arrival variant for Run 3
- Consistency checks #4–8 from workshop checklist (gravel lot conflict, w_011 stacking, bartender conditionals, OOR voice specificity)
- Variation B cherry-picks decision

**Time estimate:** ~30 min to finish.

---

### 2. Familiar Node Fixes (quick wins)

**Doc:** [FAMILIAR_NODE_AUDIT.md](FAMILIAR_NODE_AUDIT.md)
**Read first:** The "Flagged Nodes" section. 12 line-level edits, no structural changes.

**What's ready to ship:**
- f_003: trim lore exposition ("calcified" replaces psychology)
- f_004: cut "The connection is open" (redundant)
- f_006: add "Their word is more generous. Yours is more accurate."
- f_008: "harvestable" → rod reading
- f_009: "instrument calibrated" → "organism grown"
- f_012: "chemical reaction" → "fermentation" + add "The seam holds."
- f_014: em-dash fix on paint-knuckle man line (still pending)
- f_016: break run-on sentence
- f_007: add humor threading (400 harvests line)
- f_010a: add body-awareness beat

**Decision needed:** Any edits you want to cut or adjust?

**Time estimate:** ~15 min review, ~15 min to ship. All mechanical find-and-replace in familiar_nodes.json.

---

### 3. Harvest Ledger Reward System (new feature)

**Doc:** [FAMILIAR_HARVEST_LEDGER.md](FAMILIAR_HARVEST_LEDGER.md)
**Read first:** The Recommendation section, then the Review Checklist.

**What's proposed:**
- 2 new light choices at f_006 (harvest focus) and f_013 (extraction method)
- 4 new tags
- Path-dependent manifest text in f_018 (4 base variants + 4 operational notes)
- Jacket woman refusal as a data point in the manifest

**Decision needed:**
1. Does `has_all_tags` exist in the engine, or do we need composite tags?
2. Is 6 total choices right for the path, or cut one?
3. Read the manifest variants — do the numbers and units land?
4. Add the jacket woman "armor held" line to manifests?

**Time estimate:** ~20 min review, ~30 min to ship (mostly writing conditional_text entries).

---

### 4. Analogy & Lore Audit (reference)

**Doc:** [ANALOGY_LORE_AUDIT.md](ANALOGY_LORE_AUDIT.md)
**When to read:** Before or during the Run 3 and Familiar shipping steps. It flags 9 hard analogy issues and 2 lore inconsistencies across all nodes. Most overlap with the node-level fixes above, but two standalone issues need decisions:

- **Gravel lot / "paved now" contradiction** (w_002 vs w_loading_dock_insta) — quick dialogue fix
- **w_011 conditional contradiction** (saw_oor + entered_circle can both fire) — needs conditional_mode or rewrite

---

### 5. Superseded Docs (do not use)

These are from earlier audit passes and have been replaced:
- ~~WANDERER_RUN3_AUDIT.md~~ → superseded by RUN3_GOODNESS_WORKSHOP.md
- ~~PROPOSED_WANDERER_RUN3_EDITS.md~~ → superseded by RUN3_GOODNESS_WORKSHOP.md

Both are flagged in their headers. Left intact for reference but should not be used for implementation.

---

## Suggested Session Flow

**Start next session with:** "Let's workshop the beauty node. Read HANDOFF.md section 0, then w_004, w_004b, w_005, and w_006 in wanderer_nodes.json for surrounding context."

If we have ~90 minutes:

| Order | Task | Time | Blocking? |
|---|---|---|---|
| **0** | **Workshop + ship w_005b (THE HANDS)** | **30 min** | **Yes — prose needs full attention** |
| 1 | Ship Familiar node fixes (quick wins) | 15 min | No — independent |
| 2 | Review Run 3 recommendation + ship core nodes | 30 min | Yes — the main event |
| 3 | Review harvest ledger design | 15 min | No — can defer |

If we have ~30 minutes: Do step 0 only. The beauty node is the freshest design decision and benefits most from a clean context window. Everything else is documented and can wait.
