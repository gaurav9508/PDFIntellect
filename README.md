# PDFIntellect 🧠📄

An AI-powered PDF note-taking web app built with **Next.js**, **Convex**, **Clerk**, **Gemini API**, and **TailwindCSS**. Easily upload, extract, and summarize PDFs using the power of generative AI.

Vercel: [https://pdfintellect.vercel.app/](http://pdfintellect-private.vercel.app)

---

## 🚀 Features

* Upload & store PDF files
* AI-powered content extraction using Gemini Pro
* Create and save notes
* User auth & plan tracking with Clerk + Convex
* Upgrade system with PayPal integration
* Responsive UI with TailwindCSS & ShadCN components

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), TailwindCSS, ShadCN
* **Backend**: Convex DB (hosted DB + functions)
* **AI**: Google Gemini Pro API
* **Auth**: Clerk
* **Payments**: PayPal

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pdfintellect.git
cd pdfintellect
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=prod:your-convex-id

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 🔌 Backend Integration: Convex + Gemini API

Convex handles the database, file metadata, user info, and integrates Gemini for summarization.

You can set up Gemini integration in **two ways**:

### ✅ Method 1: Using Convex CLI (recommended)

Store Gemini API Key securely with:

```bash
npx convex env set GOOGLE_API_KEY "your_api_key_here"
```

Then access it inside your Convex function:

```ts
const apiKey = ctx.env.GOOGLE_API_KEY;
```

This prevents hardcoding the API key in your code.

### 🛠️ Method 2: Manual .env file (for local/dev)

1. Create a `.env` file inside the `convex/` folder.
2. Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

3. Access using:

```ts
const apiKey = process.env.GEMINI_API_KEY;
```

Make sure to include `.env` in `.gitignore`.

Key Convex functions used:

* `fileStorage.generateUploadUrl` – Generates temporary upload URLs
* `fileStorage.AddFileEntryToDb` – Stores file metadata
* `fileStorage.getFileUrl` – Fetches full file URL from storage
* `myAction.ingest` – Calls Gemini API to process PDF content
* `user.createUser`, `user.userUpgradePlan` – Manages user auth & upgrade state

Gemini API is integrated using `fetch` in `ingest.ts`, and PDF parsing is done client-side using `/api/pdf-loader?pdfUrl=...` route.

---

## 🧪 Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment on Vercel

* You **can use private repos** on the **Vercel Free tier**.
* Import GitHub repo into [Vercel](https://vercel.com/)
* Add env variables in **Project Settings > Environment Variables**
* Deploy ✅

---

## 💰 Plan Upgrade

PayPal-based upgrade system for unlimited uploads:

* Uses `PayPalButtons`
* Triggers `userUpgradePlan` mutation in Convex
* Stored in `user.ts` mutation file

---

## 👤 Auth with Clerk

* User sign-in via Clerk
* Auto-creation in Convex
* Avatar menu using `<UserButton />`

---

## 🤖 Gemini PDF Summary

The route `/api/pdf-loader?pdfUrl=` reads a PDF and extracts text.
Text is then passed to Gemini for summarization and ingestion.

---

> Built with ❤️ by Gaurav Soni
