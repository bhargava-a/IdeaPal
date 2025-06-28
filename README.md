<h1 align="center"> IdeaPal – Your AI Study Buddy</h1>

<p align="center">
  A personalized AI-powered learning platform that makes education interactive, intelligent, and fun.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-v13-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%26%20DB-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Gemini-API-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square" />
</p>

---

##  Overview

**IdeaPal** is an AI-powered education app designed to personalize student learning. With smart course recommendations, interactive learning modules, and a unique **Gemini-based Doubt Chaining System**, students can engage with content like never before.

---

##  Features

- 🔐 Firebase-based Sign up / Login (Google or Email)
- 🎯 Personalized course suggestions based on user input
- 🔍 Search with trending dropdown + filters (Subject, Language, etc.)
- 📚 Module-based learning with humor, quizzes & notes
- ❓ **AI-Powered Doubt Resolution** using Gemini API:
  - Highlight text → click `?` icon → open mini chat window
  - Ask follow-up questions (supports **doubt chaining**)  
  - Background blurs, current context stays focused
- ✅ Auto-evaluation quizzes
- 📈 Progress tracking and learning history
- 🌓 Light/Dark mode toggle

---

##  Gemini AI – Doubt Chaining System

- Highlight any word/sentence
- Hover → `?` icon appears → click to trigger popup
- Chat-like doubt resolution powered by **Google Gemini API**
- Supports **nested follow-ups**, stacking multiple popups like a thread
- User remains in flow without leaving the module

---

##  Tech Stack

| Layer       | Tool/Tech           |
|-------------|---------------------|
| Frontend    | Next.js + Tailwind  |
| AI Backend  | Gemini API (Google AI) |
| Auth + DB   | Firebase Auth + Firestore |
| Hosting     | Vercel              |

---

##  Getting Started

```bash
git clone https://github.com/your-username/ideapal.git
cd ideapal
npm install
npm run dev
