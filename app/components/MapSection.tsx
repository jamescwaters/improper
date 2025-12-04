"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="relative w-full bg-secondary py-20 overflow-hidden">
      {/* Wave patterns */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#FFFDF7"
          ></path>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#FFFDF7"
          ></path>
        </svg>
      </div>

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
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-blue-200/60 rounded-lg border-2 border-blue-300/80 flex items-center justify-center">
                <span className="text-blue-800 font-heading text-2xl md:text-4xl font-bold">
                  Proper
                </span>
              </div>

              {/* Rest of area - bright coral */}
              <div className="absolute inset-0 bg-primary/30">
                {/* Brewery location pin */}
                <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="relative"
                  >
                    {/* Pin */}
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                      <span className="text-2xl md:text-4xl">🍺</span>
                    </div>
                    {/* Pin shadow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black/20 rounded-full blur-sm"></div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-white/80 text-sm md:text-base">
                Gulf Breeze Area
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-8 text-white text-xl md:text-2xl font-heading"
            >
              Same water. Same breeze. Way fewer rules.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

