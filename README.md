<div align="center">

# BeinBout Frontend

UI Web untuk platform monitoring kesehatan mental BeinBout.

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,html,css,nodejs,vercel" alt="tech stack" />

</div>

---

## Team ID: CC26 - PS072

1. CFS250D6Y309 - Muhamad Nadira Fabyansyah (Project Manager & AI Engineer)
2. CFS134D6Y504 - Agung Arya Dwipa Laksana (Back-end Developer)
3. CFS134D6Y415 - Kaka Kendra Nugraha (Front-end Developer)
4. CFS296D6Y591 - Muhammad Irfan Daffa' Ardianto (Front-end Developer)
5. CFS134D6Y584 - Denisyal Hendra Putra (Front-end Developer)

---

## Ringkasan Proyek

Frontend BeinBout mencakup:
- autentikasi (email/password + Google OAuth),
- onboarding quiz awal,
- analisis hasil AI,
- dashboard insight,
- daily journal,
- weekly checkup,
- route guard dan session handling.

---

## Fitur Utama

- Landing page + halaman About
- Auth flow (`/login`, `/register`, `/callback`)
- Onboarding (`/quiz` → `/complete-data` → `/quiz-analysis`)
- Dashboard analytics (`/dashboard`)
- Daily journal (`/journal`, `/journal/new`, `/journal/:id`)
- Weekly checkup (`/checkup`)
- Custom Not Found page (`*`)

---

## Quick Start

### Prasyarat
- Node.js LTS
- npm

### Instalasi

```bash
git clone https://github.com/BeinBout/Capstone-Project-FE.git
cd Capstone-Project-FE
npm install --force
```

### Environment

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Menjalankan aplikasi

```bash
npm run dev
```

### Build production

```bash
npm run build
npm run preview
```

---

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

---

## Arsitektur Frontend

### Route & Guard
- `AuthOnly`: wajib login
- `NewUserOnly`: flow user baru/onboarding

### Auth State
- Global auth state via `AuthProvider`
- Verifikasi token ke endpoint `/auth/verify/me`
- Auto logout saat status `401`

### API Layer
- Axios instance: `VITE_API_URL + /api/v1`
- Bearer token otomatis dari `localStorage`

### Service Layer
- `src/services/auth/*`
- `src/services/dashboard/*`
- `src/services/landing/*`

---

## Endpoint yang Dipakai Frontend

- `/auth/register`
- `/auth/login`
- `/auth/google-oauth`
- `/auth/verify/me`
- `/auth/logout`
- `/profile-and-inpe`
- `/profile-and-inpe/:quizId`
- `/showing-questions?type=initial|weekly`
- `/daily-journal`
- `/daily-journal/:id`
- `/dashboard/stats`
- `/dashboard/main`
- `/dashboard/chart`
- `/dashboard/is-wc-available`
- `/weekly-checkup`

---

## Struktur Folder

```bash
Capstone-Project-FE/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── styles/
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## Deployment Notes

- SPA rewrite sudah aktif di `vercel.json`.
- Isi env di Vercel:
	- `VITE_API_URL`
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`

---

## localStorage Keys

- `token`
- `quiz_answers`
- `quiz_result`

---

### Frontend Documentation by BeinBout Team
