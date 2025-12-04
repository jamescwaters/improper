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

const INITIAL_SPOTS = 437;
const TOTAL_SPOTS = 500;

export default function Improper500() {
  const [spotsLeft, setSpotsLeft] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  useEffect(() => {
    if (isInView) {
      // Animate counter from 500 to 437
      let current = 500;
      const interval = setInterval(() => {
        current -= 1;
        setSpotsLeft(current);
        if (current <= INITIAL_SPOTS) {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isInView]);

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
        setSubmitSuccess(true);
        setSpotsLeft((prev) => Math.max(0, prev - 1));
        triggerConfetti();
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 6000);
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
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
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
              className="bg-primary/20 border-2 border-primary rounded-lg p-8 mb-8"
            >
              <p className="text-2xl md:text-3xl font-heading text-primary">
                You&apos;re in! Tell Proper we said hi.
              </p>
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
