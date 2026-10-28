# 🚀 RESUMATE — AI-Powered ATS Resume Intelligence & Career Copilot

An interactive, high-performance React web application built with modern component architecture, React Router v7, React Context API, and standard React Hooks. Built strictly aligned with the College React Course Plan (Lectures 1–72).

---

## 🌟 Core Career Suite

1. 📋 **Fast Job Application Tracker (`/tracker`)**
   - Fast, streamlined job application pipeline with stages: `Applied`, `Interview`, `Offered`, `Rejected`.
   - Fast 1-click inline entry and direct on-card status changes.
   - Comprehensive dashboard analytics: Total, Under Review, Interviews, Offers, and Conversion Rate %.
   - Full CRUD modal and local search filtering with 100% `localStorage` persistence.

2. 📄 **Live ATS Resume Builder (`/builder`)**
   - Dual-pane live resume editor with real-time preview.
   - 4 sleek ATS-compliant themes with vector PDF export.

2. 🔍 **ATS Resume Intelligence Scanner (`/scanner`)**
   - Scan resumes against target job descriptions.
   - TF-IDF keyword match algorithm, hard & soft skills breakdown, formatting audit.

3. ✉️ **AI Cover Letter Generator (`/cover-letter`)**
   - Role-specific cover letter drafts tailored to candidate skills.

4. 🎓 **Interview Preparation & Q&A Hub (`/interview-prep`)**
   - STAR framework talking points, recruiter tips, and question bank.

5. 🎯 **Personalized Career Roadmap (`/roadmap`)**
   - 4 Tech Career Tracks (ML, Full Stack, Java Backend, Data Analyst) with interactive milestone checklists.

6. 👤 **LinkedIn Profile Analyzer (`/linkedin-analyzer`)**
   - Recruiter SEO scoring, headline generator, and About section optimizer.
   - Animated progress bar with completion % and motivational achievement badges (`Fresh Explorer 🌱`, `Skilled Developer ⚡`, `Industry Ready 🚀`).
   - Recommended project ideas and learning tips for each milestone.
   - Progress saved in `localStorage`.

4. 🌐 **Multilingual Support (Site-Wide)**
   - Supports 3 languages: **English (`en`)**, **हिन्दी (`hi`)**, and **ਪੰਜਾਬੀ (`pa`)**.
   - Accessible language switcher in the Navbar.
   - Instant UI translation powered by React Context API (`LanguageContext`).
   - Selected language persists across browser reloads via `localStorage`.
   - AI generation prompts automatically adapt to the chosen language.

5. 👤 **LinkedIn Profile Analyzer (`/linkedin-analyzer`)**
   - Paste-and-audit LinkedIn Headline, About section, Skills, and Target Role (no LinkedIn login required).
   - Heuristic Recruiter SEO scoring (0–100) with section-by-section breakdown.
   - Concrete checklist of strengths and missing elements.
   - **3 AI-Generated High-Converting Headlines** (*Role & Stack*, *Metric & Impact*, *Value Proposition*) with 1-click copy to clipboard.
   - **AI Recruiter-Ready About Section Generator** with 1-click copy to clipboard.

---

## 🛠️ Tech Stack & Syllabus Compliance (Lectures 1–72)

- **React 18**: Functional Components, JSX, Props, Component Composition, Conditional Rendering, Lists.
- **React Hooks**: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, Custom Hooks (`useLocalStorage`, `useLanguage`, `useTitle`).
- **React Router**: `<Routes>`, `<Route>`, `<NavLink>`, dynamic parameters, protected routes, and 404 catch-all page.
- **Context API**: `LanguageContext` for global internationalization state.
- **Forms & Validation**: Controlled inputs, error states, form reset, character/word counters.
- **REST API Simulation**: Debounced search input, async loading spinner, empty states, pagination patterns.
- **Styling**: Tailwind CSS, Cyber Glassmorphism, Responsive Mobile-First Design.
- **Icons & Effects**: Lucide React, Canvas Confetti.

---

## 🏃 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3001/](http://localhost:3001/)** in your web browser.

### 3. Build for Production
```bash
npm run build
```
Creates a production-ready optimized bundle in the `dist/` directory.

---

## 📁 Project Structure

```
RESUMATE/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── common/
    │   │   ├── AuthModal.jsx
    │   │   ├── GlassCard.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── ScoreGauge.jsx
    │   │   └── Toast.jsx
    │   └── views/
    │       ├── AccountView.jsx
    │       ├── ApplicationTrackerView.jsx  (NEW)
    │       ├── AtsScannerView.jsx
    │       ├── CareerRoadmapView.jsx       (NEW)
    │       ├── CoverLetterView.jsx
    │       ├── CustomerSupportView.jsx
    │       ├── JobSearchMatchView.jsx      (NEW)
    │       ├── LandingPageView.jsx
    │       ├── LinkedInAnalyzerView.jsx    (NEW)
    │       ├── NotFoundView.jsx
    │       └── ResumeBuilderView.jsx
    ├── context/
    │   ├── LanguageContext.jsx             (NEW)
    │   └── ResumeContext.jsx
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useTitle.js
    └── utils/
        ├── atsDetectorEngine.js
        ├── atsEngine.js
        ├── bulletImpactEngine.js
        ├── coverLetterEngine.js
        ├── initialData.js
        ├── jobMatchingEngine.js            (NEW)
        ├── linkedinEngine.js               (NEW)
        ├── roadmapData.js                  (NEW)
        └── translations.js                 (NEW)
```

---

© 2026 RESUMATE. 100% Client-Side Privacy. Built for Academic Project Evaluation.
