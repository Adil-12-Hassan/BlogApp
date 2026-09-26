# 🚀 Syed Hassan - MERN Stack Developer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-orange?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🌐 [View Live Portfolio](https://hassan-porfolio-web.vercel.app/) &nbsp;|&nbsp; 👨‍💻 [GitHub Profile](https://github.com/adil-12-hassan)

</div>

---

## 📌 About

A personal developer portfolio built with **React + Vite** on the frontend and **Node.js + Express** on the backend. Designed to showcase my skills, services, and projects as a full-stack MERN developer - clean, fast, responsive, and production-ready.

---

## ✨ Features

- ⚡ **Blazing fast** - powered by Vite bundler
- 📱 **Fully responsive** - works on all screen sizes (desktop, tablet, mobile)
- 🎨 **Smooth animations** - skill bars, scroll effects, hover transitions
- 📬 **Working contact form** - sends real emails via Nodemailer + Gmail SMTP
- ✅ **Form validation** - real-time field validation with error/success states
- 🔢 **Character counter** - live counter on message textarea (max 500 chars)
- 🔗 **Active nav links** - highlights current section on scroll
- 🍔 **Hamburger menu** - animated mobile navigation

---

## 📂 Sections

| Section | Description |
|---|---|
| **Hero** | Introduction, social links, stats, and CTA buttons |
| **About** | Bio, info grid, and animated skill bars |
| **Services** | 6 service cards - Frontend, Backend, API, DB, Full Stack, UI/UX |
| **Projects** | All personal and client projects with live/GitHub links |
| **Contact** | Contact info + working email form |
| **Footer** | Quick links, services, contact details |

### 🗂️ Projects Section

The portfolio includes a dedicated **Projects** section that showcases all my work - personal builds, client projects, and open-source contributions. Each project card displays:

- **Category tag** - e.g. Full Stack, Frontend, API
- **Project title and description**
- **Live demo link** and **GitHub repository link**

Projects are displayed in a responsive grid that adapts from 3 columns on desktop → 2 on tablet → 1 on mobile.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - component-based UI
- **Vite** - fast dev server and optimized builds
- **CSS3** - custom properties, flexbox, grid, animations
- **Font Awesome** - icons
- **Google Fonts** - Poppins

### Backend
- **Node.js** - runtime
- **Express.js** - REST API server
- **Nodemailer** - email sending via Gmail SMTP
- **CORS** - cross-origin request handling
- **dotenv** - environment variable management

---

## 📁 Project Structure

```
📦 Frontend (React + Vite)
├── public/
│   └── person.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── .env
└── package.json

📦 Backend (Node.js + Express)
├── server.js
├── vercel.json
├── .env
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- A Gmail account with an **App Password**

---

### 🖥️ Frontend Setup

Make your own frontend as structure is above mentioned.

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000
```

---

### 🔧 Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
node server.js
```

Create a `.env` file in the backend root:

```env
PORT=5000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
RECEIVER_EMAIL=your_gmail@gmail.com
FRONTEND_URL=http://localhost:5173
```

> **Important:** `EMAIL_PASS` must be a **Gmail App Password**, not your regular Gmail password.
> Generate one at: Google Account → Security → 2-Step Verification → App Passwords

---

### 📬 API Endpoint

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/send-email` | Sends contact form email |

**Request body for `/send-email`:**
```json
{
  "fname": "John Doe",
  "email": "john@example.com",
  "subject": "Project Discussion",
  "message": "Hello, I would like to..."
}
```

---

## 🚀 Deployment

| Part | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Vercel](https://vercel.com) |

Set all `.env` variables in the Vercel dashboard under **Project → Settings → Environment Variables** for both frontend and backend.

---

## 📸 Live Preview

🌐 **[Live](https://hassan-porfolio-web.vercel.app/)**

---

## 👨‍💻 Author

**Syed Hassan**
MERN Stack Developer - Faisalabad, Pakistan

[![GitHub](https://img.shields.io/badge/GitHub-adil--12--hassan-181717?style=flat&logo=github)](https://github.com/adil-12-hassan)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-orange?style=flat&logo=vercel)](https://hassan-porfolio-web.vercel.app/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ using the MERN Stack
</div>