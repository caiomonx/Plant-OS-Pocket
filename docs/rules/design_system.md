# Design System - Antigravity Medical App

This document details the application's design system, focused on creating a premium "Medical Grade" experience that is immersive and highly readable. It serves as the definitive guide to ensure visual consistency in the frontend and facilitate the portability of the aesthetics to other projects or components.

## 1. Core Principles

- **Medical Grade Focus:** The design must convey professionalism and clarity, avoiding the generic looks of basic templates.
- **Visual Hierarchy:** High contrast between critical data and the background, and dramatic differences in size/weight between headers and body text to quickly guide the clinician's eye.
- **Depth:** Floating elements, precise shadows (`box-shadow`), and "Glassmorphism" interfaces to organize dense data into clear visual layers without clutter.
- **Dynamism and Motion:** Medical interfaces don't need to be static and tedious. The restrained yet omnipresent use of micro-interactions and cascaded reveals (staggered reveals) is mandatory.

## 2. Typography

The typography aims to be legible and clean, yet with a modern clinical personality. We move away from common patterns in favor of more distinct and premium fonts.

- **Main Families Used:** `Plus Jakarta Sans`, `Urbanist`, `Outfit`.
- **Tailwind Configuration (Primary):**
  ```javascript
  fontFamily: {
    sans: ['"Plus Jakarta Sans"', 'sans-serif'],
  }
  ```
- **Headings:** Dense, heavy font (Bold/Extrabold), ensuring instant reading and scannability (e.g., `font-urbanist` or `font-outfit` with `font-bold text-2xl/3xl`).
- **Body (General Text):** Legible font (Regular/Medium), comfortable for prolonged reading of clinical findings and anamnesis (e.g., `font-sans text-sm` or `text-base` with good `line-height`).

## 3. Colors and Background (Palette & Background)

The palette prioritizes a deep Dark Mode accented by bright colors for interactive elements. 100% black backgrounds (`#000000`) or "washed out" interfaces are avoided.

- **Global Background (Root/Body):**
  - Base color: `#091525` (Deep Dark Navy).
  - Global CSS ensures it fills the entire screen, regardless of scroll.

- **Surface Elements (Cards, Modals):**
  - **Glassmorphism:** Constant use of semi-transparent backgrounds with blur (backdrop filter).
  - Main utility class: `.glass-panel` (already in `index.css`).
  - *Tailwind Fallback:* `bg-zinc-900/70 backdrop-blur-md`.

- **Accents:**
  - **Main Actions:** Sharp and vibrant colors (Sky, Rose, Emerald) for Buttons, Alerts, or indicative icons.
  - **Differentiation:** The contrast and brightness of the accent color should be the primary way to draw the user's attention to where they should click.

## 4. Animations and Micro-Interactions

CSS-only animations are the foundation for maintaining high application performance. Libraries like Framer Motion are restricted only to complex transitions of very specific states.

### Global CSS Animation Classes (in `index.css`)
- `.animate-slide-up`: Entrance of elements from below (`translateY(100%)` to `0`).
- `.animate-fade-in`: Simple appearance via opacity (`0` to `1`).
- `.holoFloat`: Subtle floating animation (`translateY(-15px) rotate(0.8deg)`) to give a 3D / holographic look to illustrations or highlighted containers.

### Staggered Reveals
Whenever rendering a list (e.g., list of exams, differential diagnoses, patient cards), use staggered animation so that items appear in an organic sequence.
- `.stagger-reveal`: Applies a smooth `fadeSlideUp` (from `translateY(12px)` to `0`).
- Delay Modifiers:
  - `.stagger-reveal-1` (delay: 150ms)
  - `.stagger-reveal-2` (delay: 300ms)
  - `.stagger-reveal-3` (delay: 450ms)
  - `.stagger-reveal-card` (delay and duration adjusted for full cards)

> **Accessibility Note:** The system respects OS preferences (via `@media (prefers-reduced-motion: reduce)`) by disabling motion automatically to prevent discomfort (vertigo/epilepsy).

## 5. Components and Visual Structures

### Clinical Cards
- Smoothly rounded corners (`rounded-xl` to `rounded-3xl` depending on size).
- The background should use `.glass-panel` and preferably contain a very subtle border to highlight it (e.g., `border border-white/5` or `border-slate-800/50`).
- Internal spacing is always generous (`p-5` or `p-6`). Nothing should feel "squeezed".

### Buttons and Interactive Elements
- Every clickable element **MUST** have 3 well-defined states:
  - **Hover:** Slight scale increase (`hover:scale-[1.02]`), change in background brightness, or addition of glow/shadow.
  - **Active:** Quick and tactile scale reduction (`active:scale-95`).
  - **Focus:** Visible outlines for reliable keyboard navigation.

### Hiding Scrollbars
- The app prefers to hide native scrollbars to maintain immersion and a clean visual, while preserving scroll and touch functionality.
- Utility to be used in long content containers: `.no-scrollbar`.

## 6. Layout and Spacing (Grid & Whitespace)

- **Responsive Mobile-First:** The design collapses organically on small screens (intensive use on mobile phones during shifts).
- **Breaking the Grid (Asymmetry):** To prevent rich interfaces from looking like an endless spreadsheet, vary the sizes and proportions of elements. Mix wide and narrow areas using CSS Grid (`grid-cols-12` with different span combinations, e.g., `col-span-8` and `col-span-4`).
- **Whitespace (Negative Space):** Allow elements to breathe. Robust Margins and Gaps (e.g., `gap-4` to `gap-8`) directly improve readability and decrease clinician visual fatigue.

---

## 7. Snippets and Quick Reference (Tailwind Examples)

### Standard Glassmorphism Card (with animated entrance)
```jsx
<div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-xl stagger-reveal-1 hover:-translate-y-1 transition-transform duration-300">
  <h2 className="font-urbanist font-bold text-2xl text-white mb-2">History of Present Illness</h2>
  <p className="font-sans text-slate-300 text-base leading-relaxed">
    Patient reports acute onset chest pain approximately 45 minutes ago...
  </p>
</div>
```

### Primary Action Button
```jsx
<button className="bg-sky-600 hover:bg-sky-500 active:scale-95 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all duration-200 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-sky-500/25">
  Confirm Diagnosis
</button>
```

### Asymmetric Column Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Large Main Area */}
  <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
    {/* Main Content */}
  </div>
  
  {/* Smaller Side Panel */}
  <div className="glass-panel p-6 rounded-2xl">
    {/* Status / Ações / Metrics */}
  </div>
</div>
```
