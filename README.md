# SIH-2026-Project
# PRAMAAN — AI-Powered Identity Trust Engine

> **Smart India Hackathon 2026 · Problem Statement 26188**  
> **AI-Based Fake Identity & Document Screening System**  
> **Theme:** Blockchain & Cybersecurity · **Category:** Software  
> **Team:** Sinister 6

PRAMAAN is an **AI-powered identity trust engine** designed to strengthen identity and document verification at high-volume checkpoints.

Instead of treating verification as a simple **“Is this document fake?”** decision, PRAMAAN combines multiple independent signals and answers:

> **“What evidence suggests that this identity should or should not be trusted?”**

---

## 🎯 The Problem

Traditional identity verification is heavily dependent on manual inspection. This creates several gaps:

- Manual verification is slow and increases officer workload.
- Sophisticated document alterations can be difficult to identify visually.
- Fake or modified documents can enable impersonation.
- Information can be inconsistent across different parts of the same document.
- A genuine document can still be presented by the wrong person.
- High passenger volume increases verification time and operational pressure.
- A compromised identity can become a security vulnerability before a crime occurs.

PRAMAAN addresses these gaps through **multi-signal, evidence-backed verification**.

---

# 🚀 What PRAMAAN Does

PRAMAAN processes a document and its presenter through a layered verification pipeline:

```text
Capture
   ↓
OCR / MRZ Extraction
   ↓
Rule Validation
   ↓
Document Forensics
   ↓
Identity Verification
   ↓
Risk Assessment
   ↓
Blockchain Commit
   ↓
Officer Decision
```

Each layer contributes evidence to the final verification outcome.

---

# ✨ Core Features

### 1. 📷 Mobile Document & Face Capture

The mobile application provides the first stage of verification:

- Identity document capture
- Face capture
- Guided verification workflow
- Image quality assessment
- Checkpoint-oriented workflow
- Support for constrained/offline environments in the planned architecture

---

### 2. 🔎 Dual-Source Verification

PRAMAAN extracts identity information from the document using **OCR and MRZ processing** and cross-checks the results.

This helps identify:

- OCR ↔ MRZ inconsistencies
- Invalid or incomplete fields
- Suspicious identity information
- Document data mismatches

This provides a deterministic verification layer before higher-level AI analysis.

---

### 3. 🧪 Document Forensics

The document is analysed for manipulation indicators across:

- Photographs
- Text regions
- Document regions
- Visual artifacts
- Potentially altered areas

The architecture supports computer-vision-based forensic analysis for identifying suspicious document manipulation.

---

### 4. 👤 Identity Verification

A document can be genuine while still being presented by the wrong person.

PRAMAAN therefore compares:

```text
Document Photograph
        ↕
     Live Face
```

The system uses face-analysis / face-verification technologies to determine whether the presenter is consistent with the identity represented by the document.

---

### 5. ⚠️ Explainable Risk Engine

PRAMAAN does not depend on a single binary model output.

Multiple verification signals are fused into an **explainable risk score**.

The officer can see:

- Overall risk level
- Contributing anomalies
- Verification evidence
- Recommended action

This keeps the human officer in the decision loop, particularly for uncertain cases.

---

### 6. 🔗 Trust Ledger & Auditability

Verification events can be committed to a blockchain-backed trust layer.

The architecture is designed around **hashed verification records rather than unnecessarily exposing raw identity data on-chain**.

This provides:

- Tamper-evident records
- Immutable audit trails
- Historical verification
- Investigation support
- Increased accountability

The proposed ledger layer supports **Hyperledger Fabric / Polygon** based deployment scenarios.

---

### 7. 🖥️ Identity Trust Command Center

The web interface provides officers and authorized personnel with a centralized view of verification activity.

Planned/Prototype capabilities include:

- Verification dashboard
- Live verification activity
- Risk distribution
- Verification history
- High-risk case identification
- Case investigation
- Evidence visualization
- Audit information
- Officer decision support

---

# 🧠 Technical Approach

PRAMAAN follows a modular architecture so individual AI, backend, mobile and trust-layer components can be developed and upgraded independently.

```text
┌──────────────────────────────┐
│        Mobile Capture        │
│   Document + Face + Liveness │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       API & Backend          │
│  Authentication / Processing │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       AI Processing          │
│ OCR · MRZ · CV · Face · ML  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Risk Assessment         │
│ Multi-signal Evidence Fusion │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Trust Ledger         │
│  Hashes · Audit · Integrity  │
└──────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Mobile

- React Native
- JavaScript / TypeScript ecosystem
- Expo

## Web

- React
- TypeScript
- Vite
- Modern component-based UI architecture

## AI / ML

- Python
- PaddleOCR / MRZ processing
- OpenCV
- Pillow
- NumPy
- PyTorch
- Pandas
- InsightFace / ArcFace
- RapidFuzz
- Pytest

## Backend & APIs

- FastAPI
- Node.js
- REST APIs
- JWT-based authentication

## Databases

- PostgreSQL
- MongoDB

## Infrastructure

- Docker
- Modular service architecture

## Trust Layer

- Hyperledger Fabric
- Polygon
- Cryptographic hashing
- Tamper-evident audit records

---

# 📁 Repository Structure

```text
PRAMAAN/
│
├── web/
│   └── Identity Trust Command Center
│
├── app/
│   └── Mobile Verification Application
│
├── ai-ml/
│   ├── OCR/
│   ├── document-forensics/
│   ├── face-verification/
│   └── risk-engine/
│
├── backend/
│   ├── api/
│   ├── services/
│   └── authentication/
│
├── blockchain/
│   └── trust-ledger/
│
└── README.md
```

> The exact implementation structure may evolve as the prototype modules are integrated.

---

# 🔐 Security & Privacy by Design

Identity and biometric information is highly sensitive. PRAMAAN therefore follows a **data-minimization-oriented architecture**.

Key principles:

- Minimize unnecessary retention of sensitive information.
- Separate operational data from audit commitments.
- Prefer hashes / verification commitments for ledger records.
- Apply role-based access control to verification systems.
- Secure API communication and authentication.
- Keep human officers responsible for final decisions in uncertain cases.

The solution is designed with India's **Digital Personal Data Protection Act (DPDPA) 2023** considerations in mind.

---

# 🧩 Feasibility

PRAMAAN is designed as a modular system that can be built and scaled incrementally.

### Technical Feasibility

- OCR, computer vision, document forensics and face verification have established implementation frameworks.
- AI, backend and mobile components can be developed independently.
- REST APIs make integration with authorized external systems possible.
- The architecture supports server-side processing with future edge/offline deployment.

### Known Challenges

- Sophisticated and previously unseen forgeries
- Poor image quality
- False positives / false negatives
- Sensitive biometric and identity data
- Limited access to real government databases during prototyping
- Network constraints at remote checkpoints

### Mitigation Strategy

- Diverse genuine and synthetically tampered training data
- Automated image-quality checks
- Multi-signal verification
- Human review for uncertain cases
- Encryption and role-based access control
- Mock/simulated integrations during development
- Future edge and offline readiness

---

# 🌍 Impact & Use Cases

PRAMAAN is designed around a reusable identity verification engine rather than a single-use application.

### 🛂 Border Checkpoints

- Passport + Visa + Face verification
- Faster first-level screening
- Evidence-backed officer decisions

### 👮 Police / Traffic Checkpoints

- Identity document verification
- Rapid roadside or security checks
- Detection of suspicious identity/document combinations

### 🚗 Rental & Service Businesses

- Identity + driving licence verification
- Faster customer onboarding
- Reduced fraud risk

### 🏢 Property / High-Trust Services

- Identity document + applicant verification
- Additional document-integrity checks before authorized onboarding or transactions

---

# 📈 Expected Benefits

### For Border Officers

- Faster first-level screening
- Suspicious regions and inconsistencies highlighted
- Clear recommendations instead of purely manual comparison
- Reduced workload and human error

### For Border Authorities

- Standardized verification
- Centralized verification records
- Secure audit trail
- Better policy enforcement and decision-making

### For Investigation / Intelligence

- Historical verification records
- Identification of recurring anomalies
- Preserved evidence for follow-up
- Support for tracking fraudulent patterns

### For Legitimate Travellers

- Faster processing
- Fewer unnecessary delays
- More consistent screening
- Increased trust in the verification process

---

# 🗺️ Deployment Roadmap

```text
Prototype
    ↓
Single Checkpoint
    ↓
Multi-Checkpoint
    ↓
Scalable Border Network
    ↓
Nationwide Deployment
```

The initial objective is to validate the complete verification workflow. The architecture can then be expanded across multiple checkpoints and use cases.

---

# 🔬 Research Foundation

The system design draws on established work and standards including:

- **ICAO Doc 9303** — Machine Readable Travel Documents (MRZ standard)
- **Deng et al. (2019)** — ArcFace: Additive Angular Margin Loss for Deep Face Recognition
- **InsightFace** — Open-source 2D/3D face analysis
- **Amerini et al. (2011)** — SIFT-based Copy-Move Forgery Detection
- **NIST FRVT** — Face Recognition Vendor Test
- **Fellegi & Sunter (1969)** — A Theory for Record Linkage
- **Hyperledger Fabric** — Permissioned distributed ledger
- **RFC 6962** — Certificate Transparency / Merkle-tree audit concepts
- **Digital Personal Data Protection Act, 2023** — India

---

# 🏆 Smart India Hackathon 2026

**Problem Statement:** 26188  
**Title:** AI-Based Fake Identity & Document Screening System  
**Theme:** Blockchain & Cybersecurity  
**Category:** Software  
**Team:** Sinister 6

---

## 👥 Team

**Sinister 6**
Priyam Dev Singh (Team Lead)

Rayyan Rasool Mir

Armaan Athar

Ariba Fatima

Alimuddin Ahsan

Nubaid Uddin

Built for **Smart India Hackathon 2026**.

---

## ⚠️ Prototype Disclaimer

PRAMAAN is currently being developed as a hackathon prototype. Some integrations, AI models, government database connections and blockchain components may use simulated or development implementations.

The prototype demonstrates the **end-to-end verification concept and system architecture**, while production deployment would require authorized data sources, extensive validation, security audits, regulatory compliance and operational testing.


