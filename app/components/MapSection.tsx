"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="relative w-full bg-secondary py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-white/20">
            {/* Map Illustration */}
            <div className="relative w-full h-96 md:h-[500px] bg-white/20 rounded-lg overflow-hidden">
              {/* Gulf Breeze Proper area - pastel baby blue */}
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-blue-200/70 rounded-lg border-3 border-blue-300/90 flex items-center justify-center shadow-lg">
                <span className="text-blue-800 font-heading text-2xl md:text-4xl font-bold">
                  Proper
                </span>
              </div>

              {/* Rest of area - bright coral */}
              <div className="absolute inset-0 bg-primary/40">
                {/* Brewery location pin */}
                <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5, duration: 0.8 }}
                    className="relative"
                  >
                    {/* Pin */}
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full border-4 border-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="text-3xl md:text-5xl">🍺</span>
                    </div>
                    {/* Pin shadow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-10 h-5 bg-black/30 rounded-full blur-md"></div>
                    {/* Pulse animation */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary rounded-full"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-white/90 text-sm md:text-base font-semibold">
                Gulf Breeze Area
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-8 text-white text-xl md:text-2xl lg:text-3xl font-heading"
            >
              Same water. Same breeze. Way fewer rules.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
