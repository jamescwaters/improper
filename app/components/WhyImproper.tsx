"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    headline: "Real dogs welcome (not just purse puppies)",
    subtext: "Bring the lab, the mutt, or the Great Dane. We've got room to run.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <circle cx="9" cy="9" r="1.5"/>
        <circle cx="15" cy="9" r="1.5"/>
        <path d="M12 13.5c-1.5 0-2.5-.5-2.5-1.5s1-1.5 2.5-1.5 2.5.5 2.5 1.5-1 1.5-2.5 1.5z"/>
      </svg>
    ),
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    headline: "Live music that actually goes past 9 p.m.",
    subtext: "Because some of us don't turn into pumpkins at sunset.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
      </svg>
    ),
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    headline: "Epic local eats lineup every weekend",
    subtext: "Oysters, BBQ, tacos — real Gulf Coast flavor, zero chain nonsense.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <path d="M8.5 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
        <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    headline: "Beers with names your HOA would hate",
    subtext: "We checked — they definitely hate them.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        <path d="M9 10h6v2H9zm0 4h6v2H9z"/>
      </svg>
    ),
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    headline: "Front-row seats to the Blue Angels Sunday show",
    subtext: "That 2 p.m. flyover hits different with a cold one in your hand.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        <circle cx="18" cy="4" r="1.5"/>
        <circle cx="20" cy="6" r="1"/>
      </svg>
    ),
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    headline: "Prime golf-course views (they get the ladies' tea parties)",
    subtext: "We'll take cold beer on the patio over finger sandwiches any day.",
    icon: (
      <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z"/>
        <path d="M19 19c0 1.1-2.69 2-6 2s-6-.9-6-2c0-.99 2.16-1.81 5-1.97v1.73h2V2h2v16.03c2.84.16 5 .98 5 1.97z"/>
        <circle cx="19" cy="19" r="2"/>
        <path d="M19 17v4M17 19h4"/>
      </svg>
    ),
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export default function WhyImproper() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl text-center mb-16 text-dark"
        >
          Why Improper?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 cursor-pointer"
            >
              <div className={`${reason.bgColor} ${reason.color} rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto mb-6`}>
                {reason.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-center text-dark mb-3 tracking-wide leading-tight">
                {reason.headline}
              </h3>
              <p className="text-sm md:text-base text-muted text-center leading-relaxed italic">
                {reason.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
