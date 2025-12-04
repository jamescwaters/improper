# Improper Brewery – Pre-Launch Website (Vercel + Next.js)

## Goal
Single-page marketing site to collect emails and create massive local excitement for Improper Brewery (located outside Gulf Breeze Proper). Must feel fun, rebellious, coastal, and very “insider Gulf Breeze.”

## Tech Stack (required)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI components
- Framer Motion (scroll-triggered animations
- Resend + React Email for email collection (no Mailchimp)
- Vercel Analytics + Speed Insights
- Form validation with Zod + React Hook Form

## Domain
improperbrewery.com (already purchased)

## Color Palette
--background: #FFFDF7 (warm off-white)
--primary: #FF6B35 (coral/orange – “Sunset Neon”)
--secondary: #0099CC (bright gulf blue)
--accent: #FF9F1C (sunny yellow)
--dark: #1F2937 (almost black for text)
--muted: #6B7280

## Typography
font-heading: "Bebas Neue", sans-serif (big, bold, slightly retro)
font-body: "Inter", sans-serif

## Page Structure (exact sections & copy)

### 1. Hero Section (100vh)
Background: full-bleed hero image OR gradient + subtle animated wave pattern
Overlay: dark gradient bottom → top for readability

Content (centered on mobile, left-aligned on desktop):
# Improper Brewery
Proudly Brewed on the Wrong Side of the Line

Where Proper ends and the good times begin.

CTA Button (huge, coral): Get on the List – Be the First to Drink Improper →
Email capture modal/pop-up (collects: first name, email, zip code)

Small text under button:
No snobs allowed. Flip-flops mandatory.

### 2. The Great Divide (Map Section)
Full-width section with background #0099CC + white waves top/bottom

Interactive or static map illustration showing:
- Gulf Breeze Proper outlined in pastel baby blue with label “Proper”
- Rest of area in bright coral with huge pin + beer mug at brewery location
- Caption: Same water. Same breeze. Way fewer rules.

### 3. Why Improper? (6 Reasons)
6 cards in a 2×3 grid (1 column on mobile) with icons and punchy lines:
- Dogs the size of ponies welcome 🐕
- Live music that goes past 9 p.m. 🎸
- Food trucks every weekend 🌮
- Beers with names your HOA would hate 😈
- Parking you don’t have to pay for 🅿️
- Sunset views without the Proper attitude 🌅

### 4. Founding Members Club – The Improper 500 (Main Conversion Section)
Background: #1F2937 (dark) with coral accents

Headline:
Join the Improper 500

Subheadline:
The first 500 locals to sign up become Founding Members and get:

- Lifetime 10% off everything
- Invite to the secret pre-opening party (yes, free beer)
- Your name permanently etched on our “Wall of Impropriety”
- First dibs on every time we drop limited cans

Live counter (real or fake at first):
437 SPOTS LEFT

Large email form directly in section (no popup) → Name / Email / ZIP → Submit (coral button)

Success message: “You’re in. Now go tell Proper we said hi.”

### 5. Beer Teaser Carousel
4–5 mock cans that auto-rotate every 5 seconds (or swipe on mobile):
- Properly Confused Hazy IPA
- HOA’s Nightmare Imperial Stout
- Soundside Sunset Lager
- Bridge Traffic Sour (brewed with patience and lime)

Each with ridiculous fake ABV and funny one-liner.

### 6. Countdown Timer
“We’re opening in…”
Big flip-clock style countdown to target date (edit this line → June 1, 2026 12:00:00 GMT-5)

### 7. Footer
Background: #1F2937

Links:
Instagram | Facebook | TikTok
hello@improperbrewery.com

Tiny text:
Improper Brewery – Coming 2026 to the right side of the line.
No solicitors, HOAs, or Proper residents who can’t take a joke.

## Animations (Framer Motion)
- Hero text fades + slides in on load
- Cards in “Why Improper” stagger fade-up on scroll
- Counter in Improper 500 animates up when in view
- Beer cans slide in from sides

## SEO & Metadata
Title: Improper Brewery | Gulf Breeze’s Rebellious New Brewery (Coming 2026)
Description: Proudly brewed outside Gulf Breeze Proper. Join the Improper 500 for lifetime discounts and first access.Open Graph image: mock can with logo + tagline

## Final Deliverables from Cursor
/ app
  / page.tsx                ← main page
  / components
      Hero.tsx
      MapSection.tsx
      WhyImproper.tsx
      Improper500.tsx
      BeerCarousel.tsx
      Countdown.tsx
      Footer.tsx
  / lib
      resend.ts
      schema.ts (zod)
/ public
      /images (hero, map, cans, etc.)

Deploy immediately to Vercel with one click of button.

Now go tell Cursor:  
“Build the entire site exactly as described in design.md using Next.js App Router + Tailwind + Framer Motion + Resend for emails.”

Let me know when you drop the file in — I’ll help you tweak copy or add Easter eggs (like a hidden page at /proper that rickrolls people).