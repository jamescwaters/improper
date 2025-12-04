"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const beers = [
  {
    name: "Properly Confused Hazy IPA",
    abv: "6.8%",
    description: "Hazy enough to hide your secrets, hoppy enough to forget them.",
  },
  {
    name: "HOA's Nightmare Imperial Stout",
    abv: "9.2%",
    description: "Dark, bold, and definitely not approved by your homeowners association.",
  },
  {
    name: "Soundside Sunset Lager",
    abv: "5.4%",
    description: "Smooth as the Gulf breeze, crisp as a Proper complaint.",
  },
  {
    name: "Bridge Traffic Sour",
    abv: "4.9%",
    description: "Brewed with patience and lime. Because you'll need both.",
  },
];

export default function BeerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % beers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          What We&apos;re Brewing
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Mock Beer Can */}
                <div className="relative w-48 h-80 md:w-64 md:h-96 bg-gradient-to-b from-primary via-primary/90 to-primary/70 rounded-lg shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6">
                  <div className="absolute top-4 left-4 right-4 text-center">
                    <h3 className="font-heading text-2xl md:text-3xl text-white mb-2">
                      IMPROPER
                    </h3>
                    <div className="h-1 bg-white/30 w-full mb-2"></div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="font-heading text-xl md:text-2xl text-white mb-2">
                      {beers[currentIndex].name}
                    </p>
                    <p className="text-white/80 text-sm md:text-base mb-4">
                      {beers[currentIndex].abv} ABV
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white/90 text-xs md:text-sm italic">
                      {beers[currentIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {beers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to beer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

