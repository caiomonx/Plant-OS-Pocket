# ECG Daily Challenge - Content Guidelines

This document provides standardized rules for creating new clinical cases for the **ECG Daily Challenge (Desafio Diário ECG)** module. All new cases must follow these instructions to ensure high-quality, reproducible, and medically accurate learning experiences.

## 1. File and Directory Structure
- All ECG cases are stored in `src/data/challenges/dailyEcgCases.js` within the `DAILY_ECG_CASES` array.
- All diagnosis entities and distractors are stored in `src/data/challenges/diagnoses.js` within the `DIAGNOSES` array.
- Images must be placed in the `public/desafio_ecg/` folder.
- Image names must follow the format `ecg_casoX.png` (or `.jpg`), where `X` is the case number (e.g., `ecg_caso1.png`).

## 2. Case Object Structure (JSON)
Each case must have the following structure:
```javascript
{
  id: 'ecg_case_001',
  dayId: 1,
  date: 'YYYY-MM-DD',
  imageUrl: '/desafio_ecg/ecg_caso1.png',
  correctDiagnosisId: 'string_id',
  clinicalCase: 'string',
  explanation: 'string'
}
```

## 3. Formatting the `clinicalCase` (The Hint)
The `clinicalCase` field serves as a clinical hint that is revealed **only after the user fails their first attempt**.
- Keep it concise but clinically relevant.
- Include patient demographics (age, sex), main complaint, and relevant history or vitals if necessary.
- **Example:** "Paciente de 60 anos, masculino, avaliado em clínica reclamando de vaga dor retroesternal em esforço. Nunca apresentou dor em repouso."

## 4. Formatting the `explanation` (Amalgamated Technical Report)
The `explanation` is shown after the user finishes the case (either by winning or losing). It must be an **amalgamated** narrative paragraph that flows logically through three phases:
1. **ECG Findings ("O ECG mostra"):** Technical description of the tracing (rate, rhythm, axis, PR/QRS/QT intervals, specific waves).
2. **Clinical Interpretation ("Interpretação clínica"):** What the findings mean in the context of the patient.
3. **Medical Action ("O que fazer? / Conduta"):** The immediate or long-term management based on the diagnosis.

**Rule:** Do not use explicit bullet points or headers like "O ECG mostra:" inside the string. Instead, write a cohesive, professional medical report. 

**Example:**
"Este ECG revela um ritmo sinusal de 77 bpm com intervalo PR e eixo normais. Destacam-se ondas Q proeminentes e ondas T invertidas nas derivações inferiores (DII, DIII e aVF). Essas alterações indicam um infarto antigo de parede inferior. Como conduta ambulatorial, deve-se ter atenção aos fatores de risco cardiovasculares e providenciar tratamento secundário padrão com aspirina e estatinas."

## 5. Adding Diagnoses and Distractors
Before using a new `correctDiagnosisId`, ensure it exists in `diagnoses.js`.
- If it does not exist, add it to the appropriate section.
- Always add relevant **distractors** (e.g., if adding "Atrial Flutter 2:1", add "Atrial Flutter 3:1" as a distractor) to increase the difficulty and learning value.
- Add plenty of `aliases` (synonyms, acronyms, homonyms) to ensure the autocomplete search bar works effectively for the user.
- **CRITICAL:** All new diagnosis IDs used must be added to the `ECG_WHITELIST` array in `src/pages/ChallengeEcgPage.jsx`.
