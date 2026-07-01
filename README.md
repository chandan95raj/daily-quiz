<div align="center">

# 🚀 Daily AI Quiz Challenge

### 🧠 Play Daily • Learn Daily • Compete Daily

A modern AI-powered Daily Quiz web application built with **React + Vite**, powered by **Groq AI**, **Google Apps Script**, and **Google Sheets**.

🌐 **Live Demo:** https://daily-quiz-chi.vercel.app/

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Backend-success?logo=googlesheets)
![Apps Script](https://img.shields.io/badge/Apps%20Script-Google-orange?logo=google)
![Groq AI](https://img.shields.io/badge/Groq-AI-black)

</div>

---

# ✨ Features

- 🤖 Daily AI-generated quiz questions
- 📅 Same questions for everyone throughout the day
- 🔄 New questions generated automatically every day
- ⏱️ 2 Minute 30 Second timer
- 👤 Enter your name before participating
- ✅ One submission per user per day
- 🏆 Live Daily Leaderboard
- 📖 Yesterday's Questions & Answers
- 📱 Fully Responsive Design
- ⚡ Super Fast React + Vite
- ☁️ No Database Required
- 📊 Google Sheets as Backend
- 🔥 AI Powered using Groq API

---

# 🖥️ Live Website

## 🌍 Play Now

👉 https://daily-quiz-chi.vercel.app/

---

# 📸 Preview

### Home

- Daily Quiz
- Live Timer
- AI Questions
- Leaderboard
- Yesterday Answers

---

# 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| React | Frontend |
| Vite | Build Tool |
| JavaScript | Application Logic |
| Google Apps Script | Backend API |
| Google Sheets | Data Storage |
| Groq AI | AI Question Generation |
| JSONP | Cross-Origin Requests |
| Vercel | Deployment |

---

# 📂 Project Structure

```
daily-ai-quiz/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── assets/
│
├── public/
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ How It Works

```text
                User
                  │
                  ▼
          React + Vite Frontend
                  │
          JSONP Request
                  │
                  ▼
       Google Apps Script API
          │               │
          │               │
          ▼               ▼
 Google Sheets        Groq AI
          │               │
          └──────┬────────┘
                 ▼
      Daily AI Questions
                 │
                 ▼
      Leaderboard + Answers
```

---

# 📅 Daily Question Flow

```
User opens website
        │
        ▼
Questions already generated today?
        │
   ┌────┴────┐
   │         │
  Yes       No
   │         │
   ▼         ▼
Return     Generate via AI
Questions       │
                ▼
        Save in Google Sheet
                │
                ▼
        Return to Users
```

---

# 🏆 Leaderboard Rules

- One submission per user per day
- Higher score ranks first
- If scores are equal:
  - Lower completion time wins

---

# 📖 Yesterday Answers

After each day finishes,

Yesterday's AI questions become visible with:

- Question
- Topic
- Correct Answer

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/yourusername/daily-ai-quiz.git
```

Go inside

```bash
cd daily-ai-quiz
```

Install dependencies

```bash
npm install
```

Start Development Server

```bash
npm run dev
```

Build Production

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

# ☁️ Backend Setup

Backend uses

- Google Apps Script
- Google Sheets
- Groq AI API

No SQL Database required.

---

# 📊 Google Sheets

Two Sheets are used.

### Leaderboard

| Name | Score | Total | Time | Date |

---

### Questions

| Quiz Date | Questions JSON | Created At | Source |

---

# 🔐 Environment

Google Apps Script Script Properties

```
GROQ_API_KEY=your_api_key_here
```

---

# 🎯 Quiz Topics

Questions are generated from

- React
- Java
- JavaScript
- Node.js
- HTML
- CSS

Difficulty:

- Easy
- Medium

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Google Apps Script

Storage

- Google Sheets

---

# 💡 Future Improvements

- Login with Google
- Weekly Leaderboard
- Monthly Ranking
- Player Profiles
- XP System
- Achievement Badges
- Category Selection
- Admin Dashboard
- Analytics
- Dark Theme

---

# 🤝 Contributing

Contributions are welcome!

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push
5. Create Pull Request

---

# ⭐ Support

If you like this project,

Please give it a ⭐ on GitHub.

It helps a lot ❤️

---

<div align="center">

## Made with ❤️ by Chandan Raj

🚀 Live Demo:

https://daily-quiz-chi.vercel.app/

</div>