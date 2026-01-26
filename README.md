# 🏏 SR Sports - E-Commerce & Shop Management Platform

A comprehensive full-stack application built for **SR Sports** to manage cricket gear sales, coaching services, and live streaming. This project features a high-performance public store and a powerful, offline-first **Admin Dashboard** for daily shop operations.


## 🚀 Tech Stack

* **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend / CMS:** [Sanity.io](https://www.sanity.io/) (Headless CMS)
* **Deployment:** [Vercel](https://vercel.com/)
* **Utilities:** `jspdf` (PDF Generation), `jspdf-autotable`, `localstorage` (Persistence)

---

## ✨ Features

### 🛒 Public Store (Customer Facing)
* **Dynamic Product Catalog:** Real-time product fetching from Sanity CMS.
* **Smart Filtering:** Filter by category (Bats, Gloves, Pads) and search by name.
* **Responsive Design:** Mobile-first UI optimized for all devices.
* **Service Pages:** Dedicated sections for Pro Coaching and Live Streaming.

### 🛡️ Admin Dashboard (Shop Manager)
A custom-built "Command Center" for the shop owner to manage daily operations without needing the CMS.
* **🔐 Security:** PIN-protected access (Session-based locking).
* **⚡ Quick Actions:**
    * **Restock:** One-click stock addition (`+`) with instant API updates.
    * **Sell:** Record sales with "Standard Price" prompts.
    * **Transfer:** Bulk transfer items to coaches/friends with "Notes" support.
* **📒 Khata (Credit Ledger):** Digital ledger to track "Pay Later" customers. Data persists locally on the device.
* **📊 Reports:** Download daily sales logs as **PDF** (formatted receipt) or **CSV** (Excel).
* **💾 Auto-Save:** Session history is saved to LocalStorage, preventing data loss on page refresh.

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/sr-sports.git](https://github.com/YOUR_USERNAME/sr-sports.git)
cd sr-sports
```
### 2. Install Dependencies
```bash
cd frontend
npm install
```
### 3. Configure Environmental Variables
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_secret_write_token
```
### 4. Run Development Server
```bash
npm run dev
```
---

## Live Demo: https://sr-sports-official.vercel.app

----


