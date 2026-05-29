# 🛠️ Checklist: Creating a New Clinical Module

This document defines the mandatory steps and necessary properties to render a new module on the main `Modules` page of the application.

## 1. Brainstorming Guideline and Initial Structuring (AI Trigger)
> **⚠️ CRITICAL INSTRUCTION FOR AI:** Upon reading this file at the beginning of a new module creation, you MUST **stop** and remind the user to define the User Interface (UI) structure and the module's flow. (e.g., Will the module work page-by-page? Will it be real-time like ACLS? Will it be a specific case like a diagnostic challenge?). 
- [ ] **Do not generate code** before structuring and validating the mechanical and visual functioning of the module with the user.
- [ ] Document the defined flow mentally or in the chat to guide development.

## 2. New Major Area (Specialty Filter)
*Check if the module belongs to an existing specialty (e.g., Cardiology, Emergency).*
- [ ] **Is it a new area?** (e.g., Otorhinolaryngology, Neurology).
- [ ] **Action:** Add the new filter "Chip/Badge" to the UI, located **immediately below the search bar**.

## 3. Mandatory Module Card Properties
To render the module card correctly in the grid, the following data must be defined in the object/database:

- [ ] **Module Name:** (e.g., *Vertigo Approach*)
- [ ] **Icon (lucide-react):** The exact component to be imported. (e.g., `<ScanEye />` or `<RotateCw />`)
- [ ] **Is Work In Progress (WIP):** Every newly created module **must** start with the `isWip: true` property to render the visual development tag/badge on the Card UI.
- [ ] **Difficulty Level (1 to 5):**
  - *1: Basic / Academic*
  - *2: Internship / Ward*
  - *3: Standard ER*
  - *4: Complex Cases / ICU*
  - *5: Specialist*
  - **Chosen Value:** [Insert number]
- [ ] **Route (URL):** The exact path for the React Router. (e.g., `/modulos/vertigo`)
- [ ] **Dominant Color:** Secondary color that will contrast with the card's default (useful for the icon, progress bar, or highlight border). 
  - **Code/Class (Tailwind or Hex):** (e.g., `bg-teal-500` or `#14b8a6`)

## 4. Front-end Integration Checklist
- [ ] The icon was properly imported in the file that renders the cards (`import { IconName } from 'lucide-react';`).
- [ ] The route `/modulos/module-name` was registered in the main routing file (e.g., `App.routes.tsx` or `main.tsx`).
- [ ] The chosen dominant color respects accessibility contrast with the application's light/dark mode.
- [ ] The base component for the module page was created and responds to the specified route.

## 5. Implementation: Initial Test Case
- [ ] **Single Simple Case:** After theoretical structuring and initial UI setup (previous steps), the first practical implementation step must focus on creating **only 1 simple clinical case**.
- [ ] This case will serve exclusively to test the flow and newly implemented mechanics of that module. (Unless the user explicitly instructs otherwise).

## 6. Clinical Flow Notes (Quick Summary)
*Briefly describe the main mechanics of this module.*
- **Scenario:** Dizziness triage in the ER.
- **Main Mechanics:** Division between Acute Syndrome (HINTS Plus) and Episodic Syndrome (Dix-Hallpike) with visual nystagmus interpretation (GIFs).

## 7. Intern vs. Resident Mode (New Standardization)
The application flows support two progression difficulties selected on the Landing Page. When creating components that offer clinical tips, tooltips, or formula assistance, you **MUST** respect the `GameConfigContext`:

1.  **Consume Context:** 
    - `import { useGameConfig } from '@/contexts/GameConfigContext';`
    - `const { isResidentMode } = useGameConfig();`

2.  **Anamnesis / History:** 
    - MUST remain identical for both modes. Do not highlight or color-code clinical text differently.

3.  **Laboratory Reference Values (Tooltips):** 
    - Render tooltips with normal reference ranges ONLY IF `!isResidentMode`. 
    - In Resident mode, references must be hidden (forcing the resident to know them).

4.  **Formula Help (`FormulaHelpButton` / OSCE Penalties):** 
    - The `FormulaHelpButton` already handles the `isResidentMode` multiplier internally and provides an alert modal.
    - Ensure your specific OSCE engine mathematically catches `formulaHintWeight` (if provided) or multiplies `formulaHintClicks` accordingly to penalize the Resident mode severely while clamping the minimum step score to `0` using `Math.max(0, finalScore)`.