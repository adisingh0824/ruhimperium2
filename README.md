# 🌐 Ruh Imperium — The Art of the Wayfarer

An upscale, immersive full-stack luxury e-commerce and digital scent discovery platform built with **React**, **Vite**, and **Tailwind CSS**. Ruh Imperium couples premier sustainable Indian botanical sourcing with exquisite digital experiences.

---

## 🎨 Design Philosophy: *The Sand & Slate Theme*

Ruh Imperium is structured on a bespoke luxury editorial design, straying away from generic layouts to capture the true tactile warmth of fine craft:
- **Visual Palette**: A signature blend of creamy, warm sand tones (`#FAFAFA`, `bg-sand-50/70`) contrasted by deep obsidian-stone slate (`#2D2926`) and accented by golden metallic ochres (`#D4BC96`).
- **Typography Pairing**: Elegant display headers paired with classical serif typefaces for journal storytelling and clean geometric tracking (`tracking-[0.25em]`) for technical laboratory elements.
- **Architectural Honesty**: Clean structural negative space, genuine high-contrast buttons, and delicate, responsive micro-animations powered by custom Tailwind transitions.

---

## 🚀 Key Implemented Modules

### 1. 🛍️ Premier Scent Colection & PDP (Product Detail Profile)
- Premium Extrait de Parfums compounded at a rich **22% concentration ratio**.
- **Contextual PDP Modal**: Displays detailed scent architecture (Top Notes, Heart Notes, Base Notes), sourcing territory, size configuration (50ml / 10ml), and verified buyer ratings.
- **Olfactory Logbook Form**: Fully interactive customer review logger, letting customers submit reviews with name, star ratings, and custom sensory feedback.

### 2. 🗺️ Sourcing Map (Territory of Scent)
- Interactive geographical coordinates map charting active botanical resource recovery.
- Tap nodes (Kannauj, Wayanad, Assam, Mysore) to read active source diaries and view immediate related fragrance profiles for instant shop redirection.

### 3. 🧭 Personalized Scent Finder (Olfactory Alignment Quiz)
- Immersive multi-step personality alignment tool analyzing user travel inclinations, climate preferences, and aromatic tones.
- Automatically calculates point arrays to suggest a tailored signature perfume match.
- Unlocks exclusive wayfarer promotional codes (`WAYFARER15`) copyable directly with one-click feedback.

### 4. 🧪 Digital Scent Blend Lab (The Digital Cooperage)
- Interactive compounding simulator allowing users to drag ratios of Top, Middle, and Base ingredients.
- **Dynamic compounding engine**: Generates mock custom formulas, bespoke product titles, scientific descriptions, and dynamic visual CSS color gradients reflecting the active compound.

### 5. ✍️ Wanderlust Diary (Travel Journals)
- Interactive editorial blog framework presenting detailed field research articles of Himalayan forests, Kannauj distilleries, and spice trading logs.

### 6. 🤝 The Founders Registry
- Highlights our executive team: **Vimal Singh (Founder & Head Perfumer)** and **Aditya Singh (Co-Founder & Chief Explorer)** with high-end, realistic studio portrait imagery.

### 7. 🔐 Executive HQ Control Panel (Admin Portal)
- Accessible by clicking **HQ Login** in the top navigation header or mobile drawers.
- **Corporate Credentials**:
  - **Username/Email**: 
  - **Cipher Password**: 
- **Dynamic Capabilities**:
  - **Product Deck**: Modulate or sunset existing fragrances, edit pricing rates, size details, sillage specs, and upload replacement bottle photos directly from any local device (phone/laptop) via instant Base64 compression. Supports adding entirely new perfumes.
  - **Consignment Operations (Orders)**: View real-time consumer orders placed via the website checkout. Update fulfillment statuses (Processing, Dispatched, In Transit, Out for Delivery, Delivered, Cancelled) and edit speed courier tracking codes.
  - **Brand Assets Manager**: Swap the homepage landing hero cover image, change the founders' studio portraits, and edit founders' names and bios with instant preservation in local state.

### 8. 🚚 Live Scent Delivery Tracker
- Accessible by clicking **Track Order** in the header.
- Allows customers to input their order tracking code (e.g. `RP-38410-IN`) to see their live shipment timeline.
- Reflects the latest logs, packaging statuses, and dispatch notes modified by the administrators.

---

## 🛠️ Technology Stack & Dependencies

- **Frontend Core**: React 18 (TypeScript), Vite
- **Styling Engine**: Tailwind CSS (with arbitrary variables defined for unified branding)
- **Iconography**: Lucide React (featherlight, refined vector paths)
- **State Management**: Standalone client state with immediate reactive feedback loops for cart addition, reviews injection, quiz matching, and live custom laboratory formulation compounding.

---

## 💻 Technical Setup and Running Locally

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Install base dependencies:
   ```bash
   npm install
   ```

2. Boot the local development server:
   ```bash
   npm run dev
   ```

3. Compile the production-ready build:
   ```bash
   npm run build
   ```

---

*“Between the destination and the departure lies the scent of the journey.” — RUH IMPERIUM*
