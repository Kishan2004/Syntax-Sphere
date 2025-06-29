# 🌀 Syntax Sphere

**Syntax Sphere** is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to help developers quickly learn and reference syntax across multiple programming languages.

This project uses **React + Vite** for the frontend with HMR and ESLint, and **Express + MongoDB** for the backend.

---

## 🚀 Features

- 🔍 Quick syntax search across languages
- 🧠 Easy-to-understand code snippets
- 📦 Organized into client/server folders
- ⚡️ Fast refresh via Vite HMR
- 📐 ESLint rules and clean project structure

---

## 🧱 Tech Stack

- **Frontend:** React + Vite + Tailwind (optional)
- **Backend:** Express.js + MongoDB
- **Linting:** ESLint + Prettier (Vite plugins)
- **Version Control:** Git + GitHub

---

## 📁 Project Structure

syntax-sphere/
├── client/                       # Frontend (React + Vite)
│   ├── public/                   # Static files (index.html, favicon, etc.)
│   ├── src/                      # Source code
│   │   ├── assets/               # Images, icons, styles
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page-level React components
│   │   ├── services/             # API interaction logic (e.g., with RTK Query or axios)
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Main CSS (or Tailwind)
│   ├── .eslintrc.cjs             # Linting rules
│   ├── vite.config.js            # Vite config
│   ├── package.json              # Frontend dependencies
│   └── README.md                 # (Optional) Frontend-specific readme
│
├── server/                       # Backend (Node.js + Express)
│   ├── controllers/              # Logic for route handlers
│   ├── models/                   # Mongoose models (schemas)
│   ├── routes/                   # Express routes
│   ├── config/                   # DB config, environment configs
│   ├── middleware/               # Custom middleware (auth, logging, etc.)
│   ├── server.js                 # Main Express server
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables (not committed)
│
├── README.md                     # Main project README ✅
├── .gitignore                    # Ignore node_modules, .env, etc.
└── LICENSE                       # MIT or other license
