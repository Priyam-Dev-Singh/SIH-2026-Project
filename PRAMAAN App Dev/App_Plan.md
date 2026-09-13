# PRAMAAN Mobile Officer Prototype

## Goal
Build a polished, mobile-first checkpoint application that lets SIH judges complete the full PRAMAAN identity-screening journey using realistic synthetic data. All processing is simulated locally; no AI, OCR, biometrics, authentication, database, or government system is connected.

## Experience
- Create a compact officer workspace with Home, Verify, History, and Profile navigation.
- Keep touch targets large, text projector-readable, and the primary action obvious.
- Use a restrained government-security visual system: white and pale blue surfaces, deep navy controls, blue accents, and status-only green, amber, and red.
- Preserve a practical mobile portrait flow while adapting cleanly to tablet and landscape widths.

## Verification Workflow
- Build the complete sequence: document capture, quality checks, extracted passport data, validation, forensic review, face capture, face comparison, risk assessment, officer decision, and recorded audit result.
- Add short simulated processing states and reliable forward/back navigation so the demonstration cannot get stuck.
- Provide a persistent demo-scenario selector for Normal and High Risk cases.
- Use clearly synthetic passport, MRZ, portrait, and evidence data.
- Show explainable evidence, not binary “real/fake” claims, and repeat that the authorized officer makes the final decision.

## Main Screens
- Home dashboard with checkpoint/session identity, activity totals, and recent verifications.
- Verification workspace with a progress stepper, camera-style capture frames, document preview, check rows, forensic comparison, face match, risk score, evidence details, decision confirmation, and success state.
- History with status filters and selectable record summaries.
- Profile with demo officer, checkpoint, role, app version, and session state.

## Interaction and State
- Keep all demo data and newly recorded decisions in local React state.
- Update History immediately after a decision is confirmed.
- Support Clear, Refer, and Escalate outcomes with a confirmation dialog.
- Let judges review evidence from the risk screen and reopen completed records from History.

## Technical Details
- Use React, TypeScript, Tailwind CSS v4 semantic tokens, existing accessible UI primitives, and Lucide line icons.
- Organize reusable app-shell, navigation, badge, check-row, evidence, document, progress, risk, and result components for straightforward React Native reimplementation.
- Add route-specific metadata and use the index route as the actual application.
- Validate desktop and mobile rendering plus the primary Normal and High Risk paths in the browser.
