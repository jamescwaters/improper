"use client";

import { motion } from "framer-motion";

const comparisons = [
  {
    proper: "HOA-approved quiet hours",
    improper: "Live music that goes past 9 p.m.",
    properIcon: "🔇",
    improperIcon: "🎸",
  },
  {
    proper: "Dress code enforced",
    improper: "Flip-flops mandatory",
    properIcon: "👔",
    improperIcon: "🩴",
  },
  {
    proper: "No pets over 20 lbs",
    improper: "Dogs the size of ponies welcome",
    properIcon: "🚫",
    improperIcon: "🐕",
  },
  {
    proper: "Paid parking only",
    improper: "Parking you don't have to pay for",
    properIcon: "💰",
    improperIcon: "🅿️",
  },
  {
    proper: "Generic beer names",
    improper: "Beers with names your HOA would hate",
    properIcon: "📋",
    improperIcon: "😈",
  },
  {
    proper: "Proper attitude required",
    improper: "Sunset views without the Proper attitude",
    properIcon: "😐",
    improperIcon: "🌅",
  },
];

export default function RulesWeBreak() {
  return (
    <section className="relative w-full bg-secondary py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              The Rules We Break
            </h2>
            <p className="text-xl md:text-2xl text-white/90">
              Same water. Same breeze. Way fewer rules.
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Proper Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-blue-200/90 backdrop-blur-sm rounded-2xl p-6 border-3 border-blue-300 shadow-lg">
                <h3 className="font-heading text-3xl md:text-4xl text-blue-900 mb-6 text-center">
                  Proper
                </h3>
                <div className="space-y-4">
                  {comparisons.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/60 rounded-lg p-4 border-2 border-blue-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.properIcon}</span>
                        <p className="text-blue-900 font-medium text-sm md:text-base">
                          {item.proper}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Improper Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-primary/90 backdrop-blur-sm rounded-2xl p-6 border-3 border-primary shadow-lg">
                <h3 className="font-heading text-3xl md:text-4xl text-white mb-6 text-center">
                  Improper
                </h3>
                <div className="space-y-4">
                  {comparisons.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="bg-white/20 rounded-lg p-4 border-2 border-white/30 cursor-pointer transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.improperIcon}</span>
                        <p className="text-white font-semibold text-sm md:text-base">
                          {item.improper}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-white text-lg md:text-xl font-heading">
              Choose your side. We chose ours.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

