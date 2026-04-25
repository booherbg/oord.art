# Builder + Cross-Character — Proposed Fixes
**Source: BUILDER_ASSESSMENT.md**
**Covers: builder_nodes.json (minor voice), wanderer_nodes.json (fabric_strip cleanup), cross-character threading**

---

## 1. pale_antler Gate — NO ACTION NEEDED

The audit flagged this as missing. It's not. The `pale_antler` artifact is:
- **Awarded at:** familiar_nodes.json terminal node (line 478), outcome: "dissolution"
- **Required by:** builder_nodes.json `unlock_requires` (line 7)

The gate is wired correctly. Familiar completion → pale_antler → Builder path unlocks. No fix needed.

---

## 2. fabric_strip — Orphaned References (NEEDS FIX)

`fabric_strip` is referenced twice in w_002 (THE WAREHOUSE) but is never awarded by any node in the game. The memory file confirms: "fabric_strip artifact reference needs reassignment or removal."

### Where it appears:

**w_002 arrival variant (line 50-56):**
```json
{
  "text": "You've arrived at the source of the Sound. When did you start seeking it? Have you been following this Sound for your entire life? You can't help but feel like you've been here before.",
  "default": false,
  "requires": {
    "has_tag": "hidden",
    "has_artifact": "fabric_strip"
  }
}
```

**w_002 conditional text (line 60-65):**
```json
{
  "append": "You notice a group of people standing by the loading dock on the side of the building. The door is propped open and they're about to head back inside.",
  "condition": {
    "has_artifact": "fabric_strip"
  }
}
```

### Analysis:

The `hidden` tag is also never awarded anywhere. Both the `fabric_strip` artifact and `hidden` tag are dead code — remnants of an earlier design iteration.

The **conditional text** about seeing the loading dock group should trigger when the player has the `matchbook` — that's the artifact that gates the loading dock choice on the same node. Having the conditional text gated on a different artifact than the choice it sets up is a bug.

The **arrival variant** about déjà vu ("you can't help but feel like you've been here before") is a Run 3 flavor — the player is returning with the matchbook. It should also be gated on `matchbook`.

### Proposed fix:

**Conditional text — change gate from fabric_strip to matchbook:**
```json
{
  "append": "You notice a group of people standing by the loading dock on the side of the building. The door is propped open and they're about to head back inside.",
  "condition": {
    "has_artifact": "matchbook"
  }
}
```

**Arrival variant — change gate from fabric_strip + hidden to matchbook:**
```json
{
  "text": "You've arrived at the source of the Sound. When did you start seeking it? Have you been following this Sound for your entire life? You can't help but feel like you've been here before.",
  "default": false,
  "requires": {
    "has_artifact": "matchbook"
  }
}
```

**Impact:** Low risk. No content changes — same text, same function, just gates that can actually trigger now. The loading dock conditional text will now correctly appear when the player has the matchbook (the same condition that reveals the loading dock choice). The déjà vu arrival variant will fire on Run 3 returns.

**Side note:** Confirm no other files reference `fabric_strip` or `hidden` tag before removing. Grep results show only wanderer_nodes.json lines 55 and 63.

---

## 3. Builder Voice — Minor Fixes (3 items)

These are small. The Builder voice is strong — these are tightening, not reworking.

### Fix A: b_009b — Trim the vocal organ realization

The realization lands in three sentences where one would hit harder. The Builder's voice under stress is terse ("Not possible. Not complaining." in b_008).

**BEFORE (b_009b, last paragraph):**
```
You sit down on your road case. You drink some water. The water tastes like ozone. You decide this is normal.
```

This is actually fine — my audit overcalled it. The "you decide this is normal" is peak Douglas Adams. **No change.**

The earlier passage in the same node is the real issue:

**BEFORE:**
```
It was a set of instructions for building an organ. A vocal organ. For something that needed a voice in this realm and found an engineer who could build one.
```

**AFTER:**
```
It was a set of instructions for building a vocal organ. For something that needed a voice in this realm.
```

**Changes:** Cut "A vocal organ" (redundant after "organ") and "found an engineer who could build one" (the Builder doesn't need to narrate being found — they're telling themselves what the spec was, not what happened to them). Two sentences instead of three. The realization hits on "vocal organ" and the implication does the rest.

---

### Fix B: b_016 — Give the missing notes more space

Three impossibilities in sequence (absolute zero, unknown power source, missing notes) but the third — the Builder discovering their own notes are gone — is the most psychologically devastating and needs more air.

**BEFORE (b_016, final lines):**
```
The amp is drawing power from a source that is not the ten twenty-amp circuits because the circuits are off. Breakers open. The system is running on something else. How long? You check your notes. The anomaly is not in your notes. You didn't notice it. Or you noticed and didn't write it down. Or you wrote it down and the note is gone.
```

**AFTER:**
```
The amp is drawing power from a source that is not the ten twenty-amp circuits because the circuits are off. Breakers open. The system is running on something else.

You check your notes. You have been writing notes all night. The power anomaly is not in them. You didn't notice it. Or you noticed and didn't write it down. Or you wrote it down and the note is gone.
```

**Changes:** (1) Added paragraph break before "You check your notes" — the moment needs a beat of white space. (2) Cut "How long?" — the Builder wouldn't ask this; they'd go straight to the notes. (3) Added "You have been writing notes all night" — reminds the reader (and the Builder) that note-taking is the core coping mechanism, making its failure more devastating. Tiny addition, big payoff.

---

### Fix C: b_002 — Consider adding one human detail to backstory

The pre-evening Builder is entirely solitary: workshop, iPad, modeling software, emails, farming anecdote. The Homewreckers farmer story is warm but isolated. One more small human thread would prevent the Builder from reading as a hermit archetype.

**This is a suggestion, not a proposed edit.** Options for Blaine to consider:

1. The metallurgist friend who said "needlessly beautiful" — already mentioned. Could expand by one sentence: "She came by the shop every few months. She never understood the audio side. She always understood the metal."
2. A gig detail — "You've done a hundred load-ins. The worst was a wedding in August. The best was a warehouse outside Fargo where the concrete resonated at 43 Hz and the Homewreckers sang for three hours straight." (Fargo callback to the loading dock dialogue.)
3. Leave it. The Builder's solitude IS the character — they relate to systems, not people. The chamfer is their signature because human connection isn't.

**Recommendation:** Option 3 (leave it). The Builder's isolation makes the OOR moment (b_015) hit harder. The most significant professional recognition comes from something inhuman because the Builder has always been building toward something inhuman. Adding human warmth dilutes that.

---

## 4. Cross-Character Threading — Bartender in b_004

The Builder arrives at the warehouse and loads in. The bartender is already in position (confirmed by Familiar prose: "One is behind what the humans have arranged as a bar"). The Builder would pass the bar area during setup.

**Proposed addition to b_004 conditional text:**

```json
{
  "append": "A woman behind the bar is arranging bottles with a focus that reminds you of your own setup routine - not socializing, calibrating. You nod at her. She doesn't look up."
}
```

**Impact:** Low. One sentence. Threads to: (1) the Wanderer's bartender experience (w_007e — "she watches her own hands"), (2) the Familiar's self-description ("pouring liquids into glasses with the careful focus of someone performing a ritual she learned from observation"), (3) the Builder's own obsessive precision. A craftsperson recognizing another craftsperson without knowing what the other is building. The Builder nods. The bartender doesn't respond. The seam holds from the Builder's side too.

**Note:** This should be unconditional (no `condition` field) — every Builder player should see it. It's the only human being the Builder notices all night who isn't DJ OOR.

---

## 5. Artifact Relationship — chamfer_token vs heat_sink

The Wanderer Run 4 draft proposes a `chamfer_token` artifact (a piece of metal with the 45-degree angled cut). The Builder path awards a `heat_sink` artifact (the component from OOR's glove). These are related but distinct.

### Decision needed:

**Option A: Same physical object, different perception.**
The Wanderer's `chamfer_token` and the Builder's `heat_sink` are the same artifact — a small piece of metal with a chamfer. The Wanderer sees texture (heavy, warm, angled cut, makes a note). The Builder sees engineering (bronchial-tree geometry, impossible material, their own signature frequency). This is thematically consistent — "same room, different literacy" applies to artifacts too. But mechanically it's weird: the Builder finds the heat sink in their toolbox at home, the Wanderer finds the chamfer token in their coat pocket at the warehouse. Same object in two places?

**Option B: Same family, different objects.**
The chamfer_token is a PIECE of the Builder's work — a fragment, a shaving, something that fell from the chamfering process. The heat_sink is the finished component. Both carry the chamfer frequency. The Wanderer gets a splinter. The Builder gets the artifact. This makes more physical sense and preserves the unlock hierarchy (the Builder's version is more complete because the Builder has done more work).

**Option C: Only the Builder gets the physical artifact.**
The Wanderer's Run 4 awards the `beauty` transcendental but no physical artifact. The beauty experience IS the artifact — seeing craft, recognizing it. The heat_sink remains Builder-exclusive. This is cleanest mechanically but loses the nice detail of the Wanderer carrying something physical from the encounter.

**Recommendation:** Option B. Same family, different objects. The Wanderer's chamfer_token is a small piece of chamfered metal — a fragment, warm, humming faintly. The Builder's heat_sink is the full component — the bronchial geometry, the impossible material, singing the chamfer frequency forever. Same mark, different scale. The Wanderer touched the edge of something; the Builder holds the center.

---

## Impact Summary

| Item | Target | Severity | Status |
|---|---|---|---|
| pale_antler gate | — | — | Already wired. No action. |
| fabric_strip → matchbook | wanderer_nodes.json w_002 | Medium | Dead code fix. Two condition swaps. |
| b_009b vocal organ trim | builder_nodes.json | Low | Cut 10 words. |
| b_016 missing notes spacing | builder_nodes.json | Low | Add paragraph break + 8 words. |
| b_002 human detail | builder_nodes.json | — | Recommendation: leave it. |
| Bartender cross-thread | builder_nodes.json b_004 | Low | Add 1 conditional text block. |
| Artifact relationship | Design decision | Medium | Recommendation: Option B (same family, different objects). |

**Total proposed code changes:** 4 small edits + 1 new conditional text block.
**Total design decisions for review:** 2 (b_002 human detail, artifact relationship).
