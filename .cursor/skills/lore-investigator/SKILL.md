---
name: lore-investigator
description: Run a compact terminal workflow for inspecting and editing JSON story nodes. Use when the user says "run lore investigator", "let's run the lore investigator", or asks to review story nodes/choices/gates in a consistent command-line loop with edits and path traversal.
---

# Lore Investigator

Use this skill to inspect and edit `game/*.json` nodes in a compact terminal-friendly loop.

Default mode: **guided-arc**  
Default interface: **plain compact CLI**

## Activation contract (required)

If user says any of:
- "run lore investigator"
- "let's run the lore investigator"
- "start lore investigator"

Then start immediately with defaults (no extra setup questions):
- mode: guided-arc
- interface: compact CLI frame
- start node: `spine_001`

If user provides overrides (node, mode, style), apply them.

## Canon sources

Treat these as source-of-truth in this order:

1. `game/story_design.md`
2. `game/todo.md`
3. `game/archive/*.md`

## Session loop (required)

At each step:
1. Show current node in compact technical format (see frame below)
2. Wait for user action:
   - edit node text
   - edit choice text/fields
   - move forward by selecting a choice
3. Draft revisions in-session only (no file writes)
4. Repeat on next node until user requests write
5. Only then apply approved edits to JSON and validate

After **every** user action (edit, choose, toggle, jump, drafts), immediately re-render the compact node frame so the session always loops back to:
- current text
- current visible choices
- current hidden choices/gates
- available actions

Do not leave the user in analysis-only output. Always end on the compact frame + prompt.

## Draft-first contract (required)

Default behavior is **draft mode**:
- Never edit files immediately while iterating.
- Store proposed changes as a draft patch list in memory/session notes.
- Show current draft status after each accepted revision.

File writes are allowed only when user explicitly confirms with a write command:
- `apply`
- `write`
- `commit drafts`

If the user does not explicitly issue one of these, do not modify files.

## Compact node frame (required)

Render exactly these sections, in order, with short lines:

1. `NODE`  
   - id, file, temp, terminal/outcome
2. `STATE`  
   - tags, transcendentals, artifacts (current/sandbox)
3. `TEXT`  
   - full node text (wrapped)
4. `ARRIVAL`  
   - active/default + variant rules
5. `CONDITIONALS`  
   - each condition and appended text
6. `VISIBLE_CHOICES`
   - numbered list; each entry includes:
     - `text`
     - `next`
     - `requires`
     - `tag`
     - `arrival`
7. `HIDDEN_CHOICES`
   - numbered list of gated-out choices with:
     - `text`
     - `next`
     - `requires` (raw)
     - `unlock` (plain-language gate summary)
8. `ACTIONS`
   - allowed commands
9. `PROMPT`
   - one-line input prompt

No fluff. No narrative analysis unless user asks.
Keep the frame stable and visually simple across all turns.

## Commands (required)

- `choose <n>`: advance via visible choice number
- `edit text`: revise node `text`
- `edit choice <n>`: revise fields on choice `n`
- `toggle tag <name>`: sandbox tag on/off
- `toggle trans <name>`: sandbox transcendental on/off
- `show`: reprint current compact node frame
- `jump <node_id>`: move to specific node
- `drafts`: show queued draft edits
- `apply`: write queued draft edits to files
- `write`: alias for `apply`
- `commit drafts`: alias for `apply`
- `exit`: stop and print summary

Natural language input is allowed; map it to these commands.

## Editing rules

- Preserve IDs and graph links unless explicitly requested.
- If editing `next`, explain pathing impact before applying.
- Keep prose voice aligned to canon files.

## Validation rules

After each applied edit batch:
1. Validate JSON parses.
2. Re-open edited node and verify requested change exists.
3. Confirm no accidental key deletion.

Fix failures immediately.

## Output fit rule

Prioritize fitting one node view within a standard laptop terminal screen:
- concise headers
- compact choice blocks
- no long commentary blocks

