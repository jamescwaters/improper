"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormData } from "@/lib/schema";

const INITIAL_SPOTS = 437;

export default function Improper500() {
  const [spotsLeft, setSpotsLeft] = useState(INITIAL_SPOTS);
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
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isInView]);

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
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-4 text-primary">
            Join the Improper 500
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            The first 500 locals to sign up become Founding Members and get:
          </p>

          <ul className="text-left max-w-2xl mx-auto mb-12 space-y-4 text-lg">
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Lifetime 10% off everything</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Invite to the secret pre-opening party (yes, free beer)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Your name permanently etched on our &quot;Wall of Impropriety&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>First dibs on every time we drop limited cans</span>
            </li>
          </ul>

          <motion.div
            ref={counterRef}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-block bg-primary/20 px-8 py-4 rounded-lg border-2 border-primary">
              <p className="font-heading text-4xl md:text-5xl text-primary">
                {spotsLeft} SPOTS LEFT
              </p>
            </div>
          </motion.div>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/20 border-2 border-primary rounded-lg p-6 mb-8"
            >
              <p className="text-2xl font-heading text-primary">
                You&apos;re in. Now go tell Proper we said hi.
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
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.firstName && (
                <p className="text-sm text-red-400">{errors.firstName.message}</p>
              )}

              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}

              <Input
                placeholder="ZIP Code"
                {...register("zipCode")}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-400">{errors.zipCode.message}</p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

