<div align="center">

# ⚡ LinkPulse — Ultra Pro URL Shortener & Real-time Analytics Engine

<p align="center">
  A state-of-the-art, production-ready, full-stack <strong>URL Shortener, QR Code Generator & Real-time Click Analytics Web Application</strong> built with <strong>Next.js 14 (App Router)</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Upstash Redis</strong>.
</p>

[![Next.js 14](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E599?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</div>

## 📌 Table of Contents

- [✨ Comprehensive Feature Breakdown](#-comprehensive-feature-breakdown)
- [🏗️ System Architecture & Data Flow](#%EF%B8%8F-system-architecture--data-flow)
- [🗄️ Database Data Schema & Redis Storage](#%EF%B8%8F-database-data-schema--redis-storage)
- [📁 Project Folder Structure](#-project-folder-structure)
- [🔌 Deep-Dive API Documentation](#-deep-dive-api-documentation)
- [⚙️ Upstash Redis Database Setup Guide](#%EF%B8%8F-upstash-redis-database-setup-guide)
- [🚀 Local Installation & Development Guide](#-local-installation--development-guide)
- [🛠️ Troubleshooting & Frequently Asked Questions](#%EF%B8%8F-troubleshooting--frequently-asked-questions)
- [📄 License & Authors](#-license--authors)

---

## ✨ Comprehensive Feature Breakdown

### 1. 🌐 Interactive HTML5 Canvas Particle Engine
- Uses a native JavaScript HTML5 `<canvas>` background engine running at 60 FPS.
- Particles dynamically connect to nearby nodes with translucent laser vectors.
- **Real-time Mouse Attraction**: When moving the cursor across the screen, nearby particles react to cursor coordinates, forming dynamic glowing vector webs.

### 2. 🖤 Pitch-Black Cyber Dark Aesthetic & Keyframe Animations
- Designed with an ultra-deep `#000000` pitch-black dark theme.
- Features multi-layered visual keyframes:
  - 🌌 **360° Rotating Aurora Mesh Blob** with hue-shifting gradient blur.
  - ⚡ **Continuous Laser Light Sweep Beam** traveling across the viewport.
  - 📐 **3D Cyber Grid Overlay** with smooth linear infinite scrolling.

### 3. 🎛️ Permanently Accessible Pro Link Customization Panel
- **Custom Short Aliases**: Brand your links with custom alphanumeric slugs (e.g., `linkpulse/my-custom-code`). Includes validation for hyphens, underscores, and dots while blocking system-reserved keywords (`api`, `stats`, `not-found`, etc.).
- 🔒 **Password-Protected Links**: Assign an access password to short links. Visitors must enter the correct password on a custom challenge screen before being redirected to the target URL.
- ⏱️ **Auto-Expiration (TTL - Time To Live)**: Configure link lifespans (**1 Hour**, **24 Hours**, **7 Days**, **30 Days**, or **Never**). Utilizes Redis native `EXPIRE` commands to automatically clean up expired links.

### 4. 📲 High-Resolution PNG QR Code Generator & Downloader
- Generates instant inline QR codes for every shortened URL.
- Includes a 1-click **Download PNG Image** feature that converts SVG vectors into downloadable `.png` files via HTML5 Canvas rasterization.

### 5. 🎉 JavaScript Celebration Particle Burst
- Fires a 50+ particle confetti explosion upon successful URL shortening to provide tactile visual feedback.

### 6. 📊 Real-time Click Analytics & Recent History Dashboard
- Tracks total clicks for every short link atomically in Redis via `redis.incr("clicks:" + code)`.
- Client-side history stores recent links in `localStorage` and batch-queries live click counts using Redis `mget` pipeline via `/api/stats`.
- Features an instant search filter to query saved history by alias, destination URL, or creation date.

### 7. 💬 1-Click Social Media Sharing Matrix
- Instant share shortcuts for **WhatsApp**, **X (Twitter)**, and **Telegram**.

---

## 🏗️ System Architecture & Data Flow

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

## 🗄️ Database Data Schema & Redis Storage

LinkPulse stores mappings using simple key-value pairs in **Upstash Redis**:

### 1. Link Object Key: `url:<code>`
Stores the JSON stringified metadata object for a short link:

```json
{
  "url": "https://example.com/target-long-url-destination",
  "password": "optional-secret-access-password",
  "createdAt": 1721950000000,
  "expiresAt": 1722036400000
}
```

*Note: For backward compatibility, legacy plain URL strings (e.g. `"https://example.com"`) are also parsed seamlessly.*

### 2. Click Counter Key: `clicks:<code>`
Stores an integer counter representing total redirects:

```
clicks:my-alias => 42
```

### 3. Key Expiration (TTL)
When an auto-expiration timeframe (e.g., 24 hours) is set, native Redis TTL is applied:

```bash
EXPIRE url:my-alias 86400
EXPIRE clicks:my-alias 86400
```

---

## 📁 Project Folder Structure

```
url-shortener/
├── .env.example                # Environment variables template
├── .env.local                  # Real local environment credentials (git-ignored)
├── .gitignore                  # Git ignore rules protecting credentials & builds
├── .vscode/
│   └── settings.json           # Tailwind CSS at-rule linter settings
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and build scripts
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation
├── tailwind.config.ts          # Tailwind CSS theme & font configuration
├── tsconfig.json               # TypeScript compiler configuration
└── src/
    ├── app/
    │   ├── [code]/
    │   │   └── route.ts        # 302 Redirection & Password Challenge Route Handler
    │   ├── api/
    │   │   ├── shorten/
    │   │   │   └── route.ts    # POST URL Shortening API Handler
    │   │   └── stats/
    │   │       └── route.ts    # POST Batch Click Statistics API Handler
    │   ├── not-found/
    │   │   └── page.tsx        # Styled 404 Link Not Found Page
    │   ├── globals.css         # Global styles, cyber animations & particle layers
    │   ├── layout.tsx          # SEO Root Layout & Open Graph Metadata
    │   └── page.tsx            # Main Interactive Dashboard & Canvas Particle Engine
    └── lib/
        ├── redis.ts            # Upstash Redis Client initialization & fallback checks
        └── utils.ts            # URL validation, alias sanitization, & nanoid generators
```

---

## 🔌 Deep-Dive API Documentation

### 1. Shorten URL Endpoint
**`POST /api/shorten`**

Validates the target URL, verifies custom alias availability, sets optional password/expiration parameters, and stores the mapping in Redis.

#### Request Headers:
`Content-Type: application/json`

#### Request Body Parameters:
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `url` | `string` | **Yes** | Destination URL (auto-prefixes `https://` if omitted). |
| `customAlias` | `string` | No | Custom code/alias (3-50 alphanumeric, hyphens, underscores, dots). |
| `password` | `string` | No | Optional access password for link protection. |
| `expiresIn` | `number` | No | Lifespan duration in seconds (`3600`, `86400`, `604800`, `2592000`). |

#### Request Example:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "customAlias": "cool-video",
  "password": "secret123",
  "expiresIn": 86400
}
```

#### Success Response (`200 OK`):
```json
{
  "code": "cool-video",
  "shortUrl": "http://localhost:3000/cool-video",
  "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "createdAt": 1721950000000,
  "expiresAt": 1722036400000,
  "isProtected": true,
  "clicks": 0
}
```

#### Error Responses:
- `400 Bad Request`: Invalid URL format or custom alias character violation.
- `409 Conflict`: Custom alias is already registered in Redis.
- `500 Internal Server Error`: Unconfigured Redis credentials or database failure.

---

### 2. Batch Click Statistics Endpoint
**`POST /api/stats`**

Accepts an array of short codes and uses Redis `mget` pipeline to fetch current click counts.

#### Request Body:
```json
{
  "codes": ["cool-video", "demo-link", "xyz123"]
}
```

#### Success Response (`200 OK`):
```json
{
  "stats": {
    "cool-video": 128,
    "demo-link": 45,
    "xyz123": 0
  }
}
```

---

### 3. Dynamic Redirection Route
**`GET /[code]`**

Handles incoming traffic on short links:
1. Performs a lookup in Redis for `url:<code>`.
2. If `password` is set and query parameter `?pwd=...` is missing or invalid, serves an inline HTML Password Challenge screen.
3. If valid: asynchronously increments click count (`INCR clicks:<code>`) and returns a **302 Redirect** (`NextResponse.redirect`).
4. If not found or expired: redirects to `/not-found?code=xyz`.

---

## ⚙️ Upstash Redis Database Setup Guide

LinkPulse uses **Upstash Redis** (REST API) for serverless key-value storage.

### Step 1: Create Free Upstash Database
1. Go to [Upstash Console](https://console.upstash.com) and log in.
2. Click **Create Database**.
3. Name your database (e.g. `linkpulse-db`).
4. Select a region close to your primary location (e.g. `ap-south-1 Mumbai` or `us-east-1 N. Virginia`).
5. Choose the **Free** tier and click **Create**.

### Step 2: Retrieve REST API Credentials
1. Select your created database from the dashboard.
2. Scroll down to the **REST API** section.
3. Copy the values for:
   - `UPSTASH_REDIS_REST_URL` (e.g. `https://xxx.upstash.io`)
   - `UPSTASH_REDIS_REST_TOKEN` (e.g. `AX...`)

---

## 🚀 Local Installation & Development Guide

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/4bhiigit/URL_Shortner-Password-Protected-.git
   cd URL_Shortner-Password-Protected-
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root project folder:
   ```env
   UPSTASH_REDIS_REST_URL="https://your-database.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_token_here"
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

6. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛠️ Troubleshooting & Frequently Asked Questions

<details>
<summary><strong>Q: Why do I see a warning about Upstash credentials when running locally?</strong></summary>

<br />

**A:** You need to create a `.env.local` file in your root folder and paste your real `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from your Upstash console.

</details>

<details>
<summary><strong>Q: Can custom aliases contain special characters?</strong></summary>

<br />

**A:** Custom aliases accept alphanumeric characters (`a-z`, `A-Z`, `0-9`), hyphens (`-`), underscores (`_`), and dots (`.`). Reserved system words like `api` or `stats` are restricted.

</details>

<details>
<summary><strong>Q: Is this application 100% free to run and host?</strong></summary>

<br />

**A:** Yes! Next.js is open source, and Upstash Redis provides 10,000 free commands/day, which is more than enough for personal projects and portfolio demonstrations.

</details>

---

## 📄 License & Authors

Distributed under the **MIT License**. Free for personal and commercial use.

- **Author**: Abhishek ([4bhiigit](https://github.com/4bhiigit))
- **Repository**: [URL_Shortner-Password-Protected-](https://github.com/4bhiigit/URL_Shortner-Password-Protected-.git)

<div align="center">

Made with ❤️ using Next.js, Tailwind CSS & Upstash Redis

</div>
