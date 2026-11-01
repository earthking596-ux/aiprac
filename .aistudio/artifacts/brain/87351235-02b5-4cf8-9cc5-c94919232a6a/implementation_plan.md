# Python Compiler – AI Practical Code Library

A streamlined, responsive code repository web application named **Python Compiler** that lets students copy complete, syntax-verified Python practical programs (`P01` to `P09`) and their shared common modules (`RMP.py` and `RWP.py`) to the clipboard with a single click anywhere on the card.

## User Review & Critical Decisions

> [!IMPORTANT]
> The plan uses the following recommended defaults based on your reference image and uploaded PDF:

- **Card Display & Ordering**: Immediately below the **Python Compiler** heading, the **Common Python Files** section displays `RMP.py` and `RWP.py` side by side in a two-column layout, followed by a subtle horizontal divider, the **Practical Programs** heading, and all 9 practical cards (`P01` to `P09`) in a two-column desktop grid.
- **Exact Reconstructed PDF Code**: All 9 practical scripts and both common files (`RMP.py` and `RWP.py`) are reconstructed verbatim from the PDF's `Input:-` sections with broken OCR lines repaired, proper 4-space Python indentation, and verified Python syntax.
- **Supabase Backend + Instant Pre-Seeded Fallback**: Includes full `@supabase/supabase-js` integration reading from `practicals` and `common_files` tables via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, plus a SQL migration/seed script and automatic fallback to the built-in verified dataset so every card works immediately out of the box without any login or setup screen.

---

## 1. Overview & Core Concept

- **What It Does**: Opens directly onto the practical listing page (zero login, zero extra navigation bars or popups). Clicking anywhere on `RMP.py`, `RWP.py`, or any practical card (`P01`–`P09`) immediately copies that file's complete, executable Python code to the clipboard and triggers a clean "Copied Successfully!" toast notification.
- **Target Audience / Persona**: Computer Science / AI students who need fast, accurate access to their laboratory programs (`BFS`, `IDDFS`, `A* Search`, `Recursive Best First Search`, `Decision Tree`, `Naive Bayes`, `Neural Network`, `AdaBoost`, and `Reinforcement Learning`) and required helper modules (`RMP.py`, `RWP.py`).
- **Key Value**: Eliminates OCR copy-paste errors, broken line wraps, and missing indentation from PDF documents while keeping `RMP.py` and `RWP.py` modular and separate as required by the practical imports.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Direct Landing**: User opens **Python Compiler** and immediately sees the **Common Python Files** (`RMP.py`, `RWP.py`) at the top, followed by **Practical Programs** (`P01` through `P09`).
  2. **One-Click Copy**: Clicking anywhere on a card copies the complete Python source code via `navigator.clipboard.writeText()` (with a fallback `<textarea>` copy handler for strict iframe environments).
  3. **Visual Confirmation**: A floating toast notification (`Copied Successfully!`) appears briefly, and the clicked card's action text momentarily updates to confirm the copy action while keeping the user on the same page.
- **Visual Identity & Theme** (Strictly matching the reference screenshot):
  - *Aesthetic Direction*: Clean, dark navy developer utility interface with zero visual clutter.
  - *Color Palette & Mood*:
    - `--background`: Deep navy canvas (`#060d18` / `#081120`)
    - `--card`: Rounded dark slate-blue surface (`#11263c` / `#132a42`) with subtle border (`#1e3a5a`) and hover elevation (`#17324f`)
    - `--primary`: Cyan / sky-blue (`#29b6f6` / `#38bdf8`) for `RMP.py`, `RWP.py`, and practical numbers (`P01`–`P09`)
    - `--foreground`: Crisp white (`#ffffff`) for headings and practical titles
    - `--muted`: Light sky-blue (`#93c5fd` / `#7dd3fc`) for `Copy Code →` label
  - *Typography & Hierarchy*: Clean geometric sans-serif (`Plus Jakarta Sans` / `Outfit`) with `tabular-nums` for practical identifiers (`P01`–`P09`).
  - *Component Styling & Layout*: Centered container (`max-w-5xl`), 2-column grid on desktop (`grid-cols-1 md:grid-cols-2 gap-4`), generous internal card padding (`p-6`), `rounded-2xl` corners, and a subtle horizontal divider separating Common Python Files from Practical Programs.
- **Interactive Feedback & Motion**: Smooth 150ms hover border/background transition on cards, subtle arrow shift on `Copy Code →`, and a non-intrusive toast notification.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Exact Separation of `RMP.py` and `RWP.py`**
  - *Chosen Approach*: Place `RMP.py` and `RWP.py` in the top **Common Python Files** section as dedicated cards, keeping `from RMP import dict_gn` / `from RWP import rwp_examples` inside the respective practicals (`P01`–`P04`, `P06`).
  - *Why*: Matches the exact instructions and the reference UI screenshot while ensuring students can save `RMP.py` and `RWP.py` in the same folder as their practical scripts.
- **Decision 2: Supabase Data Layer with Built-in Verified Seed Data**
  - *Chosen Approach*: Query Supabase tables (`common_files` ordered by id and `practicals` ordered by `display_order`) using public read-only anon credentials from environment variables, while bundling the exact verified Python source code as an automatic fallback and providing the complete Supabase SQL schema + RLS policies + seed script.
  - *Why*: Guarantees 100% uptime and immediate one-click copying even before external Supabase credentials are configured, while fulfilling the exact `practicals` and `common_files` table specifications and RLS security rules.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌───────────────────────────────────────────────────────────────────┐
│                         Python Compiler UI                        │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Header: "Python Compiler"                                   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Section: "Common Python Files"                              │  │
│  │  ┌───────────────────────────┐ ┌──────────────────────────┐ │  │
│  │  │ RMP.py                    │ │ RWP.py                   │ │  │
│  │  │ Copy Code →               │ │ Copy Code →              │ │  │
│  │  └───────────────────────────┘ └──────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ────────────────────────── Divider ────────────────────────────  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Section: "Practical Programs" (2-Column Grid)               │  │
│  │  [P01: BFS]                 [P02: IDDFS]                    │  │
│  │  [P03: A* Search]           [P04: Recursive Best First]     │  │
│  │  [P05: Decision Tree]       [P06: Naive Bayes]              │  │
│  │  [P07: Neural Network]      [P08: AdaBoost]                 │  │
│  │  [P09: Reinforcement Learning]                              │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────┬───────────────────────────────────┬───────────────┘
                │                                   │
                ▼                                   ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│   Clipboard Service           │   │   Supabase Data Service       │
│ - navigator.clipboard API     │   │ - Tables: common_files,       │
│ - Iframe fallback copy        │   │   practicals (public RLS)     │
│ - Toast state notification    │   │ - Pre-seeded PDF code store   │
└───────────────────────────────┘   └───────────────────────────────┘
```

- **Data Model & State**:
  - `common_files` table: `id`, `filename` (`RMP.py`, `RWP.py`), `description`, `code`
  - `practicals` table: `id`, `practical_number` (`P01`–`P09`), `title`, `description`, `code`, `display_order` (1–9)
- **Interactive Component & State Mapping**:
  - Clicking any card invokes `handleCopyCode(item.code, item.id)` which writes the exact multi-line Python string to the clipboard, sets `copiedId` for immediate card feedback, and displays the temporary `"Copied Successfully!"` notification banner for 2.2 seconds.
