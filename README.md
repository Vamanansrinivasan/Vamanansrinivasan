# ⚡ KINETIX LABS // Next-Gen Performance Footwear E-Commerce

> An ultra-modern, end-to-end e-commerce web application promoting high-performance sneakers, engineered with **React 19**, **Vite**, a zero-latency **Base64 image pipeline**, and **Firebase Storage**.

---

## 🚀 Features

- **⚡ Zero-Latency Base64 Image Engine**: High-fidelity product visuals stored and rendered as Base64 Data URIs (`data:image/jpeg;base64,...`), completely eliminating external image host latency and broken links.
- **🔥 Firebase Storage Integration**: Direct client-side cloud integration using the official Firebase Storage SDK with `uploadString(ref, base64, 'data_url')`.
- **🛠️ Firebase Storage & Base64 Studio**: In-app studio modal for testing Firebase project credentials, inspecting Base64 payloads (bytes, character counts, MIME types), and uploading custom images with automatic Base64 encoding and cloud upload.
- **👟 Interactive 3D Hero Showcase**: Floating sneaker presentation with interactive colorway and edition switcher, reactive glow backdrops, and live engineering readouts (Weight: 215g, Energy Return: 89%).
- **🔍 Advanced Catalog & Filtering**: Search by shoe name, technology, or colorway; filter across Road Racing, Streetwear & Lifestyle, Trail & Outdoor, and Limited Drops; dynamic price and rating sorting.
- **🛍️ Slide-Over Cart Drawer**: Free Express Air shipping progress meter ($150 threshold), promo code discounts (`KINETIX20`, `VIP50`), size and quantity stepper controls with `localStorage` persistence.
- **💳 3-Step Encrypted Checkout Flow**: Shipping validation, interactive card visualization with Apple Pay / Google Pay simulations, and order confirmation with generated tracking ID `#KNX-XXXXXX` and particle celebration via `canvas-confetti`.
- **✨ Publish Custom Shoe Drops**: Form modal allowing store managers to upload an image from their device, auto-convert it to Base64, sync to Firebase Storage, and instantly publish it live to the store catalog.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with custom design system (Glassmorphism, dark aesthetic, neon glowing borders, HSL color tokens)
- **Cloud Storage**: [Firebase Storage](https://firebase.google.com/products/storage)
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX**: Canvas Confetti

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/Vamanansrinivasan/Vamanansrinivasan.git

# Navigate to the project directory
cd Vamanansrinivasan

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## ☁️ Firebase Storage Configuration

KINETIX runs out-of-the-box with built-in Base64 cloud storage fallback. To link your own Firebase project:

1. Click the **Firebase Storage** button in the top navigation bar.
2. Select the **Firebase Config Credentials** tab.
3. Paste your Firebase project credentials (`apiKey`, `projectId`, `storageBucket`).
4. Click **Save Firebase Settings**.

Alternatively, define the following variables in a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📄 License

MIT License. Designed and engineered for high-performance athletic footwear.
