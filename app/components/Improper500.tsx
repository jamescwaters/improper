"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormData } from "@/lib/schema";
import confetti from "canvas-confetti";

const TOTAL_SPOTS = 500;

export default function Improper500() {
  const [spotsLeft, setSpotsLeft] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [initialCount, setInitialCount] = useState(500);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  // Fetch initial signup count on mount
  useEffect(() => {
    fetch("/api/email")
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          const currentCount = data.count;
          setInitialCount(currentCount);
          setSpotsLeft(TOTAL_SPOTS - currentCount);
        }
      })
      .catch((err) => console.error("Failed to fetch signup count:", err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  useEffect(() => {
    if (isInView && initialCount < TOTAL_SPOTS) {
      // Animate counter from 500 to current count
      let current = TOTAL_SPOTS;
      const target = TOTAL_SPOTS - initialCount;
      const interval = setInterval(() => {
        current -= 1;
        setSpotsLeft(current);
        if (current <= target) {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isInView, initialCount]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF6B35", "#0099CC", "#FF9F1C", "#FFFFFF"],
    });
    // Additional burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FF6B35", "#0099CC", "#FF9F1C"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FF6B35", "#0099CC", "#FF9F1C"],
      });
    }, 250);
  };

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitSuccess(true);
        // Update counter with new count from server
        if (result.signupNumber !== undefined) {
          setSpotsLeft(TOTAL_SPOTS - result.signupNumber);
        } else {
          setSpotsLeft((prev) => Math.max(0, prev - 1));
        }
        triggerConfetti();
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 6000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to join. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filledSpots = TOTAL_SPOTS - spotsLeft;
  const progressPercentage = (filledSpots / TOTAL_SPOTS) * 100;

  return (
    <section className="py-20 bg-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 text-white">
            Join the Improper 500
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            The first 500 locals to sign up become Founding Members and get:
          </p>

          <ul className="text-left max-w-2xl mx-auto mb-12 space-y-4 text-lg md:text-xl">
            <li className="flex items-start">
              <span className="text-primary mr-3 text-2xl">✓</span>
              <span>Lifetime 10% off everything</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-2xl">✓</span>
              <span>Invite to the secret pre-opening party (yes, free beer)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-2xl">✓</span>
              <span>Your name permanently etched on our &quot;Wall of Impropriety&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-2xl">✓</span>
              <span>First dibs on every time we drop limited cans</span>
            </li>
          </ul>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/10 rounded-full h-6 md:h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-secondary via-secondary/80 to-primary h-full rounded-full"
              />
            </div>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              {filledSpots} of {TOTAL_SPOTS} spots claimed
            </p>
          </motion.div>

          {/* Counter */}
          <motion.div
            ref={counterRef}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-block bg-primary/20 px-8 py-6 rounded-lg border-2 border-primary">
              <p className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
                {spotsLeft} SPOTS LEFT
              </p>
            </div>
          </motion.div>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/20 border-2 border-primary rounded-lg p-8 mb-8 space-y-4"
            >
              <p className="text-2xl md:text-3xl font-heading text-primary mb-4">
                You&apos;re etched in impropriety – share the rebellion?
              </p>
              <motion.a
                href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20Improper%20500!%20Proudly%20brewed%20on%20the%20wrong%20side%20of%20the%20line.%20%23ImproperBrewery&url=https://www.improperbrewery.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-heading px-6 py-3 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X
              </motion.a>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto space-y-4"
            >
              <Input
                placeholder="First Name"
                {...register("firstName")}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
              />
              {errors.firstName && (
                <p className="text-sm text-red-400">{errors.firstName.message}</p>
              )}

              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}

              <Input
                placeholder="ZIP Code"
                {...register("zipCode")}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-400">{errors.zipCode.message}</p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white text-xl md:text-2xl py-8 font-heading hover:scale-105 active:scale-95 transition-transform"
              >
                {isSubmitting ? "Submitting..." : "Claim Your Spot"}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
