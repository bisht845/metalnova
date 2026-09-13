# Metalnova — Corporate Website

A corporate website built for **Metalnova**, a precision electrical contact components manufacturer, developed as part of my internship project at **Smarted Systems**.

🔗 **Live site:** _add your Vercel URL here_
🏢 **Client:** Metalnova (precision cold-heading of electrical contact rivets and clad materials)
🎓 **Built at:** Smarted Systems — Internship Project

---

## About the Project

Metalnova manufactures electrical contact components for automotive, electrical, electronics, and industrial applications. This website showcases the company's products, manufacturing capabilities, quality certifications, and provides a way for potential clients to request quotes for their products.

## Features

- **Home** — Hero section, company highlights, and a preview of featured products
- **About Us** — Company background and manufacturing philosophy
- **Our Products** — Full product catalog (copper wires, solid contact rivets, bimetal contact rivets, and more) with detailed specification pages
- **Quality Commitments** — ISO 9001, CE, and RoHS certification details and quality standards
- **Contact Us** — Contact information and inquiry form
- **Request a Quote** — Product-specific quotation request form with WhatsApp/inquiry integration
- **Admin Panel** — Basic admin interface for managing site content
- Fully responsive design across desktop, tablet, and mobile
- Multi-language support (language switcher in the navbar)

## Tech Stack

- **Frontend:** React 19 + Vite 6
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Language:** JavaScript (JSX) + TypeScript config
- **Deployment:** Vercel

## Project Structure

```
src/
├── assets/           # Images, videos, and certification PDFs
├── components/       # Reusable components (Navbar, Footer, Loader, Logo)
├── pages/            # Route-level pages (Home, About, Products, ProductDetail,
│                       Certifications, Contact, Admin)
├── services/         # Service layer (catalog, inquiries, admin, theme)
├── theme.js          # Theme/color configuration
├── countryPhone.js   # Country code data for phone inputs
├── api.js            # API helper functions
└── App.jsx           # Root component & route definitions
```

## Getting Started

**Prerequisites:** Node.js (v18 or later recommended)

1. Clone the repository
   ```bash
   git clone https://github.com/CodeMaann/metal-nova.git
   cd metal-nova
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

## Deployment

This project is deployed on **Vercel** using the Vite framework preset:

- **Build Command:** `vite build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Since this is a single-page application using client-side routing (React Router), a `vercel.json` rewrite rule is included to ensure all routes resolve correctly:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Acknowledgements

Developed as an internship project at **Smarted Systems**. Original site structure and content built collaboratively with the internal development team; subsequent fixes and updates (image display, layout, and content corrections) were implemented as part of ongoing project maintenance.
