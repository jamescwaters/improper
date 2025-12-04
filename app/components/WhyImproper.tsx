"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🐕",
    text: "Dogs the size of ponies welcome",
  },
  {
    icon: "🎸",
    text: "Live music that goes past 9 p.m.",
  },
  {
    icon: "🌮",
    text: "Food trucks every weekend",
  },
  {
    icon: "😈",
    text: "Beers with names your HOA would hate",
  },
  {
    icon: "🅿️",
    text: "Parking you don't have to pay for",
  },
  {
    icon: "🌅",
    text: "Sunset views without the Proper attitude",
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
          className="font-heading text-5xl md:text-6xl lg:text-7xl text-center mb-12 text-dark"
        >
          Why Improper?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100"
            >
              <div className="text-5xl md:text-6xl mb-4 text-center">
                {reason.icon}
              </div>
              <p className="text-lg md:text-xl font-semibold text-center text-dark">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

