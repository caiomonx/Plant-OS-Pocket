# Creation Rules: Antibiotic Therapy Challenge

This document establishes the gold standard for creating clinical cases in the **Antibiotic Therapy Challenge** module. Strictly follow these guidelines to ensure a consistent, engaging, and high-level clinical pedagogical experience.

## 1. Basic Structure of the Clinical Case

Each clinical case must be structured in a **3-progressive-clues** format, focusing on the evolution of infectious clinical reasoning. The final goal of the user is not only to guess the pathology but to **choose the ideal antimicrobial therapy** for the presented scenario.

### The 3 Clues

The progression of information must simulate the temporal and laboratory evolution of a case in real life.
*Important: The text of each clue MUST NOT contain prefixes like "[1st Clue]:" or "(Clue 1)", as the graphical interface already organizes this information.*

*   **Clue 1 (Clinical Presentation and Epidemiology):**
    *   **Goal:** Establish the syndromic picture and severity.
    *   **Content:** Age, sex, main complaint, duration of symptoms, essential vital signs, and focal findings of the physical exam.
    *   **Example:** "A 65-year-old man arrives at the emergency room with a productive cough (rusty sputum), fever of 39.2°C, and right-sided pleuritic chest pain for 3 days. BP 100x60, HR 110, RR 28, SatO2 91% on room air. Physical exam reveals crackles in the lower third of the right hemithorax."

*   **Clue 2 (Initial Exams and/or Gram Stain):**
    *   **Goal:** Refine clinical suspicion with imaging, general exams, or rapid microbiological tests (Bacterioscopy / Rapid Tests).
    *   **Content:** Imaging findings (e.g., chest X-ray, CT), severity markers, and, when applicable, the Gram stain result of the infected site.
    *   **Example:** "Chest X-ray shows frank lobar consolidation in the right lung base with air bronchograms. Sputum Gram stain demonstrates a predominance of lancet-shaped Gram-positive diplococci."

*   **Clue 3 (Culture Result):**
    *   **Goal:** Confirm the etiologic agent to allow de-escalation or maintenance of treatment.
    *   **Content:** Definitive identification of the bacteria/virus/fungus.
    *   **Example:** "Sputum culture and blood culture collected at admission came back positive for Streptococcus pneumoniae (Pneumococcus)."

---

## 2. Rules for Summary and Feedback (`summary`)

The `summary` is the crowning achievement of clinical reasoning. It is displayed when the user wins or loses the case, serving as a true "mini-lecture".

### 2.1. Correlation with Clues (Mandatory)
The summary text **must explicitly connect** to the information provided in the clues, explaining *why* those findings led to the correct answer. The user needs to understand the rationale behind each step of the deduction.
*Attention: Explicitly cite the clue in parentheses "(1st clue)" to complete the correlation, indicating to the user how the presented information relates.*

*   **Bad Example:** "The disease is pneumonia. The treatment is Ceftriaxone."
*   **Good Example:** "The patient presents a classic picture of severe CAP requiring hospitalization (1st clue). The consolidation (2nd clue) associated with Gram-positive diplococci in the sputum points strongly to pneumococcal infection..."

### 2.2. Explicit Dosing and Duration (Mandatory)
The antibiotic therapy module does not require dose calculation to pass the stage, but the **final feedback MUST teach the complete prescription**.
In the summary, the chosen treatment **must** be accompanied by:
1.  **Standard dose** (in adults or weight-based in pediatrics).
2.  **Route of administration** (PO, IV, IM).
3.  **Frequency/Interval** (e.g., Q8h, once daily).
4.  Recommended **duration of treatment** (when well-established in guidelines).

*   **Example of Therapeutic Text:** "Empiric treatment indicated in a hospital setting typically involves a 3rd generation Cephalosporin (Ceftriaxone 1g to 2g IV once daily for 7 days), associated with a macrolide (Azithromycin 500mg IV or PO once daily for 3 to 5 days) for atypical coverage."

### 2.3. De-escalation and Stewardship Principles
Whenever Clue 3 presents a culture that allows narrowing the spectrum, the summary must mention the concept of antimicrobial de-escalation, teaching the medical practice of transitioning from empiric to targeted therapy and, if applicable, the IV-to-PO transition.

---

## 3. Case Validation Checklist

Before adding a case to `cases.js`, verify:
- [ ] Does the case have exactly 3 progressive clues?
- [ ] Are the clues free of prefixes like "[1st Clue]:", "(Clue 2)", etc.?
- [ ] Does the `summary` correlate with the clinical findings and exams presented in the case?
- [ ] Are the doses, routes, and intervals of the correct antibiotic/therapy detailed in the `summary`?
- [ ] Is the treatment selected as the correct response (`correctTherapyId`) correctly registered in the database (`therapies.js`)?
- [ ] Does the case difficulty match the expected level (level 5 - advanced complexity/specialized reasoning)?
