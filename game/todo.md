# TODO — The Call of Sooboont

## Current arc map (21 nodes)

```
spine_001 → 002 → 003 → 004 → 005
                              ├── engage_001 → unity_001 → 002 → 003
                              │                                   └── post_unity_001
                              │                                         ├── beauty_001 → 002
                              │                                         │               └── post_beauty_001
                              │                                         │                     ├── truth_001 → 002
                              │                                         │                     │               └── post_truth_001
                              │                                         │                     │                     ├── goodness_001 → 002
                              │                                         │                     │                     │               └── closing_001 → 002
                              │                                         │                     │                     │                               └── outcome_transcendence [TERMINAL]
                              │                                         │                     │                     └── closing_001 (skip goodness)
                              │                                         │                     └── mating_ritual_001 [STUB]
                              │                                         └── oor_approach_001 [STUB]
                              ├── withdraw_001 [STUB]
                              └── called_001 [STUB — requires pale_antler artifact]
```

**21 written nodes. 4 stub branches. 1 complete path (transcendence).**

---

## Priorities

### P0 — Architecture (decide before writing more content)

**1. Perspective system design**
The lore defines three playthroughs: Wanderer (written), Familiar (unlock after 1 run), Oor (requires holy artifact). Currently all nodes are `"perspective": "wanderer"` and nothing routes between perspectives.

Needs decisions:
- Does perspective change the START node only, or does it branch at every node?
- Do Familiar/Oor perspectives run parallel to the Wanderer arc (same events, different framing) or through completely different nodes?
- How are perspective-specific tags namespaced? (e.g. `familiar_*`, `oor_*`)
- Recommended approach: **shared spine, perspective-specific arrival variants and OOR actions.** The Wanderer sees the crowd. The Familiar sees the yield density. Oor sees the circuit. Same events, different instruments.

**2. JSON consolidation**
10 files is manageable now but will fragment badly as content grows. Proposed structure:

```
game/
  nodes/
    act1_spine.json        (spine_001–005)
    act2_engagement.json   (engage_001, all transcendental branches + posts)
    act3_closing.json      (closing_001–002, outcome_transcendence)
    stubs.json             (withdraw, called, oor_approach, mating_ritual)
  world/
    characters.json        (Wanderer, Familiar, Oor — start nodes, tags, description)
    artifacts.json         (artifact definitions, where found, what they unlock)
    lore/
      oor_actions.json
      oor_actions_2.json
      lore-viewer.html
```

Alternative: single flat `nodes.json` — simple, greppable, loses organization at scale.

---

### P1 — Content quality

**3. Choice differentiation audit**

Current problem: most choice pairs share a destination node and only differ by tag. When both choices are written in similar internal/reflective register, they blur. Players can't tell which to pick and the distinction feels cosmetic.

Flagged pairs that feel too similar:
- `unity_003`: "You are still here." vs "Something came back with you that wasn't there before." — both reflective, both passive. Soft exit.
- `beauty_002`: "The room is still. Something has just been taken." vs "You want to stay inside this as long as possible." — the second is more active but barely.
- `closing_001`: "Your face is close to the floor." vs "You are down. Around you the crowd is down." — both describe the same physical state.

Fixes:
- Route to different nodes more often (not just different tags on same destination)
- Make one choice active/external, one choice internal/reflective — so the player self-identifies
- Use verb-forward choice text: what you DO, not what you OBSERVE

**4. Language polish pass**

The "Not X — more like Y" construction is a house style now — it works but appears ~8 times in the arc. Risk of becoming a tic. Flag nodes where it appears more than once per screen.

Other patterns to watch:
- Over-hedged abstractions: "something like", "a kind of", "in some way"
- Explaining the metaphor after landing it ("The separation you've been maintaining is structural. You've always known this." — the second sentence undercuts the first)
- Parallel lists of three (appears in several OOR actions and node texts)

Nodes needing the most attention: `engage_001`, `unity_001`, `post_unity_001`. The earlier transcendental nodes are tighter. The spine nodes are the best prose in the arc.

**5. Score / end-of-run dynamics**

The OOR harvest log at outcome_transcendence has hardcoded numbers ("Unity × 11 seconds", "Truth × 6 minutes 44 seconds"). Options:

- **Decorative** (current) — numbers are flavor, always the same. Fine for now.
- **Tag-based variation** — numbers vary by path. Quick win: if player has `holds` tag, Truth duration is shorter. If `releases`, Unity duration is longer. Adds ~10 lines of engine logic.
- **Real tracking** — timestamp when transcendentals are awarded, compute actual duration. More complex, more satisfying.

Recommendation: tag-based variation is the sweet spot. Makes the numbers feel earned without requiring a timer.

---

### P2 — New systems

**6. Artifact system**

`pale_antler` is currently a phantom — required for `called_001` but never awarded. 

Needs design:
- What are artifacts? Objects found in the world with cross-run persistence?
- Where is `pale_antler` found? (Probably on a second run, or through a hidden branch)
- What do artifacts unlock vs. what do transcendentals unlock?
- Suggested model: **artifacts = cross-run state** (persist between playthroughs), **transcendentals = within-run state** (reset each run)

**7. Discovery system**

Not yet built. The lore supports environmental details, ambient observation, objects with lore attached. Could be:
- Flavor nodes (dead ends that add atmosphere, no choices)
- Hotspot interactions (choose to investigate something, get lore)
- Hidden choice unlock (found object unlocks a choice that wasn't visible before)

Low priority until perspective system and artifact system are designed — discovery nodes are most useful as perspective-specific reveals.

---

### P3 — Tooling

**8. Node browser**

The lore-viewer pattern (collapsible sections, search) applied to nodes. Would show:
- All nodes as a list with ID, text preview, temperature, transcendental
- Filter by perspective, branch, temperature
- Click node → see full content + connections (what links to it, what it links to)
- Highlight stubs
- No editing — just reading/navigating

**9. Node editor / content pipeline**

Longer term. Making the JSON easier to update without hand-editing:
- Form-based node editor in the browser
- Export to JSON
- Could also consider a markdown-based format that compiles to JSON (easier to write prose in)

---

## What NOT to prioritize yet

- Second-run / Familiar perspective (needs P0 perspective design first)
- Oor perspective (same)
- Withdrawal path (stub is fine — low narrative priority vs. building perspective system)
- Full artifact inventory (design it, don't build it yet)

---

## Quick wins (can do any time)

- [x] Fix `outcome_transcendence` in demo — currently shows summary card, should render the full node text as the payoff
- [ ] Add 3-5 flavor/discovery nodes to the spine (environmental details in spine_003–004 that can be examined)
- [x] Write tag-based variation for harvest log numbers (small engine change + 10 lines of logic)
- [x] Audit and rewrite the 3 flagged choice pairs (choice differentiation, see P1 item 3)

## Next session: pick up here first

### Tag system refactor (implemented)

**Decision:** Tags = persistent character inventory only. Local tags replaced by `choice.arrival` — bridge text embedded on the choice object, consumed by the next node, never stored in state.

**Engine change completed:**
- Add `state.pending_arrival = null` to initial state
- `choose(nextId, tag, arrival)` stores `arrival` to `state.pending_arrival`
- `render()` uses `pending_arrival` before checking `arrival_variants`, then clears it
- HTML choice buttons pass the arrival field: `onclick="choose('${c.next}','${c.tag}','${c.arrival}')"`

**Persistent tag set (final — 10 tags):**
```
drawn / drifting / wary / willing          ← profile
self_monitoring / holds / denies / accepts ← depth
all_four → REPLACE with state.transcendentals.length === 4
refused                                    ← escape path
```

**State model (final):**
```
state.tags[]              → character inventory (persistent, checkable)
state.transcendentals[]   → discovery inventory (unity/beauty/truth/goodness)
state.artifacts[]         → object inventory (pale_antler, etc.)
choice.arrival            → bridge text (not state, consumed immediately)
```

**Node migration completed:**
- Local-tag `arrival_variants` were moved to `choice.arrival` across the written arc
- Non-persistent local tags were removed from choices
- `all_four` checks were replaced with `transcendentals_complete`

**After engine + refactor is done → move to:**
- Choice differentiation audit (flagged pairs in todo P1/item 3)
- Language polish pass

---

## Completed this session

- [x] `story_design.md` — canonical design doc with human spectrum, tag architecture, evening beats, outcome definitions, spine definitions, writing rules
- [x] Lore-viewer: Familiars section rewritten (constructs, not humans; humans are harvest material)
- [x] Lore-viewer: Escape outcome rewritten (dark longing framing, not "you are safe")
- [x] Lore-viewer: Crowd quote updated (removed "some are servants")
- [x] Lore-viewer: "Suboont" typo fixed → "Sooboont"
- [x] `withdraw.json` — `withdraw_001` node written (the walk away, stub path now active)
- [x] `outcome_escape.json` — `outcome_escape` terminal node written
- [x] Both new files wired into `demo_draft.html`
