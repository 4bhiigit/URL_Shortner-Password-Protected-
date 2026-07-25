<div align="center">

# ⚡ LinkPulse — Pro URL Shortener & Analytics App

<p align="center">
  A high-performance, full-stack <strong>URL Shortener, QR Code Generator & Real-time Click Analytics App</strong> built with <strong>Next.js 14 (App Router)</strong>, <strong>Tailwind CSS</strong>, and <strong>Upstash Redis</strong>.
</p>

[![Next.js 14](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E599?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</div>

## 🌟 Key Highlights

- 🌌 **Interactive HTML5 Canvas Background**: Reacts to mouse movements with dynamic laser particle connections.
- 🖤 **Pitch-Black Cyber Theme**: Layered rotating aurora mesh blob, laser beam sweep, and dark cyber grid.
- 🎛️ **Pro Link Customization**:
  - 🔗 **Custom Short Aliases**: Brand your links (e.g., `linkpulse/my-brand`).
  - 🔒 **Password Protection**: Challenge visitors with a password before 302 redirection.
  - ⏱️ **Auto-Expiration (TTL)**: Configure link lifespan (1h, 24h, 7d, 30d, or Never).
- 📲 **Instant PNG QR Code Generator**: Live preview + 1-click **Download PNG Image** button.
- 🎉 **JS Particle Celebration Burst**: Confetti explosion on link creation.
- 📊 **Real-time Analytics**: Synchronized click counters powered by Upstash Redis `mget` pipeline.
- 💬 **1-Click Social Sharing**: Instant share to **WhatsApp**, **X (Twitter)**, and **Telegram**.

---

## 🏗️ Architecture Overview

```
                      +----------------------------------+
                      |         Next.js App Router       |
                      |  (Tailwind CSS + HTML5 Canvas)   |
                      +-----------------+----------------+
                                        |
                 +----------------------+----------------------+
                 |                                             |
                 v                                             v
        +------------------+                          +------------------+
        |  Client UI (/)   |                          |    API Routes    |
        |  - Shorten Form  |                          |  - /api/shorten  |
        |  - PNG QR Code   |                          |  - /api/stats    |
        |  - Live Analytics|                          |  - /[code] (302) |
        +--------+---------+                          +--------+---------+
                 |                                             |
                 +----------------------+----------------------+
                                        |
                                        v
                            +-----------------------+
                            |     Upstash Redis     |
                            |  - url:<code> -> URL  |
                            |  - clicks:<code> -> N |
                            +-----------------------+
```

---

<details>
<summary><strong>📱 Screenshots & Feature Walkthrough (Click to expand)</strong></summary>

<br />

| Feature | Description |
| :--- | :--- |
| **Custom Short Aliases** | Create branded short codes with validation for dots, hyphens, and alphanumeric text. |
| **Password Protection** | Renders an inline password challenge screen when accessing protected links. |
| **Auto-Expiration** | Atomically sets Redis key TTL so links automatically expire after the configured duration. |
| **PNG QR Code Download** | Converts SVG canvas into high-resolution downloadable PNG files. |
| **Live Click Tracking** | Batch fetches click counts from Upstash Redis for instant history updates. |

</details>

---

<details>
<summary><strong>🔌 API Reference & Endpoints (Click to expand)</strong></summary>

<br />

### 1. `POST /api/shorten`
Creates a short link mapping in Upstash Redis.

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url",
  "customAlias": "my-alias",
  "password": "optional-secret",
  "expiresIn": 86400
}
```

**Response:**
```json
{
  "code": "my-alias",
  "shortUrl": "https://your-domain/my-alias",
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": 1721950000000,
  "isProtected": true,
  "clicks": 0
}
```

---

### 2. `POST /api/stats`
Batch fetches current click counts for an array of short codes.

**Request Body:**
```json
{
  "codes": ["my-alias", "code2"]
}
```

---

### 3. `GET /[code]`
Performs 302 redirect or renders password challenge screen.

</details>

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/4bhiigit/URL_Shortner-Password-Protected-.git
cd URL_Shortner-Password-Protected-
npm install
```

### 2. Configure Local Environment

Create a `.env.local` file in the root project directory:

```env
UPSTASH_REDIS_REST_URL="https://your-database.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
```

### 3. Start Local Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

Distributed under the MIT License. Free for personal & commercial use.

<div align="center">

Made with ❤️ using Next.js & Upstash Redis

</div>
