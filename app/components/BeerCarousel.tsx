"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const beers = [
  {
    name: "Properly Confused Hazy IPA",
    abv: "6.8%",
    description: "Hazy enough to hide your secrets, hoppy enough to forget them.",
    gradient: "from-primary via-primary/90 to-primary/70",
    textColor: "text-white",
  },
  {
    name: "HOA's Nightmare Imperial Stout",
    abv: "9.2%",
    description: "Dark, bold, and definitely not approved by your homeowners association.",
    gradient: "from-dark via-gray-800 to-dark",
    textColor: "text-white",
  },
  {
    name: "Soundside Sunset Lager",
    abv: "5.4%",
    description: "Smooth as the Gulf breeze, crisp as a Proper complaint.",
    gradient: "from-accent via-accent/90 to-accent/70",
    textColor: "text-dark",
  },
  {
    name: "Bridge Traffic Sour",
    abv: "4.9%",
    description: "Brewed with patience and lime. Because you'll need both.",
    gradient: "from-secondary via-secondary/90 to-secondary/70",
    textColor: "text-white",
  },
  {
    name: "Blue Angel Sunday",
    abv: "5.8%",
    description: "That 2 p.m. flyover in a glass.",
    gradient: "from-blue-900 via-blue-800 to-blue-900",
    textColor: "text-white",
    isBlueAngel: true,
  },
];

export default function BeerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % beers.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev + 1) % beers.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + beers.length) % beers.length);
    }
  };

  const currentBeer = beers[currentIndex];

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
          <div
            className="relative h-96 md:h-[600px] flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const startX = touch.clientX;
              const handleTouchEnd = (e: TouchEvent) => {
                const touch = e.changedTouches[0];
                const endX = touch.clientX;
                if (startX - endX > 50) {
                  handleSwipe("left");
                } else if (endX - startX > 50) {
                  handleSwipe("right");
                }
                document.removeEventListener("touchend", handleTouchEnd);
              };
              document.addEventListener("touchend", handleTouchEnd);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Mock Beer Can */}
                <div
                  className={`relative w-48 h-80 md:w-64 md:h-96 bg-gradient-to-b ${currentBeer.gradient} rounded-lg shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6 transition-transform duration-300`}
                >
                  {/* Blue Angel Special Design */}
                  {currentBeer.isBlueAngel && (
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      {/* Jets with contrails */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 400">
                        {/* Jet 1 */}
                        <path
                          d="M 50 100 Q 60 150 70 200"
                          stroke="#FFD700"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle cx="70" cy="200" r="3" fill="#FFD700" />
                        {/* Jet 2 */}
                        <path
                          d="M 80 120 Q 90 170 100 220"
                          stroke="#FFD700"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle cx="100" cy="220" r="3" fill="#FFD700" />
                        {/* Jet 3 */}
                        <path
                          d="M 110 140 Q 120 190 130 240"
                          stroke="#FFD700"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle cx="130" cy="240" r="3" fill="#FFD700" />
                        {/* Jet 4 */}
                        <path
                          d="M 140 160 Q 150 210 160 260"
                          stroke="#FFD700"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle cx="160" cy="260" r="3" fill="#FFD700" />
                        {/* Foam at bottom */}
                        <path
                          d="M 30 350 Q 50 340 70 350 Q 90 360 110 350 Q 130 340 150 350 Q 170 360 190 350"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          fill="none"
                          opacity="0.6"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 right-4 text-center z-10">
                    <h3 className={`font-heading text-2xl md:text-3xl ${currentBeer.textColor} mb-2`}>
                      IMPROPER
                    </h3>
                    <div className={`h-1 ${currentBeer.textColor}/30 w-full mb-2`}></div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
                    <p className="font-heading text-xl md:text-2xl mb-2">
                      <span className="text-accent drop-shadow-lg font-bold">{currentBeer.name}</span>
                    </p>
                    <p className={`${currentBeer.textColor}/80 text-sm md:text-base mb-4`}>
                      {currentBeer.abv} ABV
                    </p>
                  </div>

                  {/* Tagline Overlay on Hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 text-center z-20 bg-black/70 backdrop-blur-sm rounded-lg p-3"
                    >
                      <p className={`text-xs md:text-sm italic ${currentBeer.textColor}`}>
                        {currentBeer.description}
                      </p>
                    </motion.div>
                  )}

                  {!isHovered && (
                    <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                      <p className={`${currentBeer.textColor}/90 text-xs md:text-sm italic`}>
                        {currentBeer.description}
                      </p>
                    </div>
                  )}
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
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
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
