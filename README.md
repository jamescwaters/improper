# Improper Brewery - Pre-Launch Website

A single-page marketing site for Improper Brewery, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern, responsive design with custom color palette
- ✨ Smooth scroll-triggered animations with Framer Motion
- 📧 Email collection with Resend integration
- ⏱️ Countdown timer to opening date (June 1, 2026)
- 🍺 Interactive beer carousel
- 📱 Fully responsive and mobile-optimized

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** + Radix UI
- **Framer Motion**
- **Resend** for email collection
- **Zod** + React Hook Form for validation
- **Vercel Analytics** + Speed Insights

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Resend API key:
```
RESEND_API_KEY=your_resend_api_key_here
EMAIL_TO=your_email@example.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for Vercel deployment. Simply connect your Git repository to Vercel and deploy.

Make sure to add your environment variables in the Vercel dashboard:
- `RESEND_API_KEY`
- `EMAIL_TO`

## Project Structure

```
/app
  /components
    Hero.tsx
    MapSection.tsx
    WhyImproper.tsx
    Improper500.tsx
    BeerCarousel.tsx
    Countdown.tsx
    Footer.tsx
  /api
    /email
      route.ts
  page.tsx
  layout.tsx
  globals.css
/lib
  resend.ts
  schema.ts
  utils.ts
/components
  /ui
    button.tsx
    dialog.tsx
    input.tsx
```

## Color Palette

- Background: `#FFFDF7` (warm off-white)
- Primary: `#FF6B35` (coral/orange)
- Secondary: `#0099CC` (bright gulf blue)
- Accent: `#FF9F1C` (sunny yellow)
- Dark: `#1F2937` (almost black)

## Typography

- Headings: Bebas Neue
- Body: Inter

## License

Private project for Improper Brewery.

