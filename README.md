⭐ Support

If you like this project, please star ⭐ the repository
and feel free to fork or contribute.
# 📝 Task Manager App (Web + Android)

A modern **Task Manager application** built using **React**, **Firebase**, and **Android (Capacitor)**.  
The app allows users to register, log in, and manage their daily tasks securely on both **web** and **Android mobile**.

---

## 🚀 Live Website

🌐 **Firebase Hosted URL**  
https://task-manager-7a93b.web.app/login

---

## 📱 Android Application

- Android app generated using **Capacitor**
- Same Firebase backend as the web app
- Optimized **release APK (small size)**
- APK files are **not committed to GitHub** (best practice)

---

## ✨ Features

### 🔐 Authentication
- User Registration (Username, Email, Password)
- User Login
- Firebase Authentication
- Personalized dashboard with username

### ✅ Task Management
- Add new tasks
- Set due date
- Optional description
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Completed / Pending)

### 🎨 UI & UX
- Clean and modern UI
- Responsive design (mobile + desktop)
- Highlighted input fields
- User-friendly date picker

---

## 🛠 Tech Stack

### 🌐 Web
- React (Create React App)
- Tailwind CSS
- React Router

### 🔥 Backend
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

### 🤖 Mobile
- Capacitor
- Android Studio
- Gradle (Release build)

---

## 📂 Project Structure

task-manager/
│
├── android/ # Android (Capacitor) project
├── public/ # Static files
├── src/
│ ├── components/ # UI components
│ ├── context/ # Auth & Task Context
│ ├── firebase/ # Firebase config
│ ├── pages/ # Login, Register, Dashboard
│ ├── routes/ # Protected routes
│ ├── App.jsx
│ └── index.js
│
├── firebase.json
├── tailwind.config.js
├── package.json
├── .gitignore
└── README.md


---

## 🔒 Security

- Firebase API keys are **safe to expose** (client-side only)
- Firestore access protected using **security rules**
- Sensitive files excluded via `.gitignore`:
  - `node_modules/`
  - `build/`
  - `android/app/build/`
  - `*.apk`
  - `*.aab`
  - `.firebase/`

---

👨‍💻 Author

Vikas Bhor
MSc Computer Science
Web & Android Developer

