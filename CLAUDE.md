# CLAUDE.md — Video Autonamer

## What This Project Is
A Video Autonaming Tool used by a marketing/video team to generate standardized naming conventions for video assets across different workflows: AI-generated content, in-house production, and asset-based generation (PCC, IHP, GMM).

This tool is not just a formatter — it is a **naming system enforcer**. It reduces human error and must never introduce interpretation or ambiguity.

---

## Core Objective
Generate a structured, deterministic naming string based on user inputs, following strict formatting rules and internal lexicon conventions.

**Same inputs must always produce the same output. No exceptions.**

---

## Non-Negotiables
- Deterministic output
- Strict formatting
- No silent logic changes
- No reordering outside defined hierarchy
- Inputs must be validated and sanitized
- Outputs must update in real time

---

## Naming Structure Principles
- Naming is modular, composed of multiple segments (product, source, concept, VO, etc.)
- Each segment has a fixed format and order
- Every code must map to a defined meaning — no ambiguity

---

## Critical Formatting Rules

### 1. Voice Over (VO) — Video ID Formatting
- User inputs a numeric identifier (e.g., `017.01`)
- System MUST format it as: `vid{VideoID}`
- Example: `017.01` → `vid017.01`
- Do NOT replace dots with commas
- Do NOT alter numeric structure
- Always prefix with `vid`

### 2. AI Footage — Product Handling

**Multi-product selection:**
- Multiple products are concatenated with `_`
- Example: `ACN_FOU_CNC`

**Product ordering (critical — never change this):**
1. ACN (Acne) → always first if present
2. All other products → alphabetical order
3. FOU (Foundation) → second to last
4. CNC (Concealer) → always last
- Example input: FOU, ASU, CNC, ACN → Output: `ACN_ASU_FOU_CNC`

**No Visible Product:**
- If selected: product selector is hidden, NO product codes included in output

**Asset-based generation (PCC, IHP, GMM):**
- Selected products MUST still be included in the naming output

---

## Lexicon — Core Concept Definitions
| Code | Meaning |
|------|---------|
| IHP | In House Production |
| TEC | Technology |
| PRD | Product |
| CAM | Camera Footage |
| iPH | iPhone Footage |
| SFX | Sound Effects |
| VO | Voice Over |
| T | Title |
| SEQ | Sequence |
| GMM | Growth Marketing Manager |
| PCC | Performance Content Creator |
| AUT | Authority |

---

## Product Code Mapping
| Code | Product |
|------|---------|
| ACN | Acne |
| FOU | Foundation |
| CNC | Concealer |
| ASU | Acne Supplement |
| CSU | Collagen Supplement |
| ECZ | Eczema |
| NEC | Neck |
| HYP | Hyperpigmentation |
| TWL | Towels |
| AORL | Acne Oral |
| ATOP | Acne Topical |
| ACLN | Acne Cleansing |

These codes must remain consistent and never be renamed dynamically.

---

## Scene Codes
| Code | Meaning |
|------|---------|
| PH | Product Hero |
| BFORE | Before |
| APPLY | Apply |
| AFTER | After |
| TSTOP | Thumbstopper |
| GS | Green Screen |
| QUIZ | Quiz |
| BROLL | B-roll |
| RTT | Real-time transformation |

---

## Generation Modes
- AI-generated content
- In-house production
- Asset-based generation (PCC, IHP, GMM)

---

## Concept Themes
The full Concept Themes reference (Goal, Description, Structure, "What Is" breakdown) is shared with the Marketing Auto Namer. See that repository's CLAUDE.md for the complete definition.

---

## Edge Cases to Always Handle
- Multiple products selected in random order → apply hierarchy
- Users pasting malformed IDs → sanitize without over-transforming
- Empty optional fields → handle gracefully
- Switching between generation modes (AI / Asset-based)

---

## UX Expectations
- Inputs validated and sanitized
- Prevent invalid characters where needed
- Preserve user intent — do not over-transform input
- Real-time output updates
