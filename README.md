# Glowify · Cosmetics E‑commerce SPA

Glowify is a modern cosmetics storefront built with React + Vite. It showcases curated beauty products, allows shoppers to browse detailed pages, and manage their cart via a responsive, animation-rich experience that’s ready for portfolio or recruiter demos.

---

## Features

- **Product listing** – Home page fetches local JSON data and renders a responsive grid with reusable `ProductCard` components.
- **Product detail routing** – Slug-based routes (`/product/:slug`) fetch data, display hero imagery, and provide “Add to Cart” actions.
- **Global cart with Context API** – Centralized `CartContext` exposes `addToCart` / `removeFromCart`, quantities, and derived totals.
- **Add & remove cart items** – Cart page lists items, shows counts, totals, and allows removing products inline.
- **Framer Motion polish** – Route transitions, ProductCard hover interactions, and animated cart mutations keep the UI feeling dynamic yet subtle.

---

## Tech Stack

- **React 19** + **Vite** for a fast DX
- **React Router v6+** for client-side routing
- **Context API** for state sharing without extra dependencies
- **Framer Motion** for smooth, performant animations

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

---

## Folder Structure

```
├─ public/                 # Static assets
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx / .css
│  │  └─ ProductCard.jsx / .css
│  ├─ context/
│  │  └─ CartContext.jsx   # Global cart provider + hook
│  ├─ data/
│  │  └─ products.json     # Mock cosmetics catalog
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ ProductDetail.jsx
│  │  ├─ Cart.jsx
│  │  └─ About.jsx
│  ├─ App.jsx              # Router + layout shell
│  └─ main.jsx             # React entry
├─ package.json
└─ vite.config.js
```

---

## Performance & Best Practices

- **`useCallback` & `useMemo`** guard against unnecessary renders: cart event handlers (`addToCart`, `removeFromCart`), cart totals, and slug-based lookups only recompute when dependencies change.
- **Memoized context value**: `CartContext` wraps its `value` in `useMemo`, ensuring consumers update only when cart data or handlers truly change.
- **Derived flags** (e.g., `hasItems`) and timed button states keep components readable and minimize repeated logic.

---

Ready to extend? Plug in real APIs, add checkout flows, or deploy as-is to showcase your React craftsmanship. Have fun! 💄
