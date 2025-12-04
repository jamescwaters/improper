"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormData } from "@/lib/schema";
import confetti from "canvas-confetti";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6B35", "#0099CC", "#FF9F1C"],
    });
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
        triggerConfetti();
        reset();
        setTimeout(() => {
          setIsOpen(false);
          setSubmitSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1565098772269-7b8f9f3a9b3f?w=2000&q=90)",
          }}
        />
        {/* Dark gradient overlay bottom-to-top */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/70 to-dark/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Improper Brewery
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal">
              Proudly Brewed on the Wrong Side of the Line
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 font-light"
          >
            Where Proper ends and the good times begin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="xl"
              className="bg-primary hover:bg-primary/90 text-white font-heading text-xl md:text-2xl px-10 py-8 rounded-lg shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105 active:scale-95"
            >
              Join the Improper 500 – Claim Your Spot
            </Button>
            <p className="text-sm text-white/70 italic">
              No snobs allowed. Flip-flops mandatory.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Email Capture Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-background">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl text-primary">
              Join the Improper 500
            </DialogTitle>
            <DialogDescription>
              Be among the first to know when we open. Founding members get exclusive perks!
            </DialogDescription>
          </DialogHeader>
          {submitSuccess ? (
            <div className="py-4 text-center">
              <p className="text-lg font-semibold text-primary">
                You&apos;re in! Tell Proper we said hi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  className="w-full"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="ZIP Code"
                  {...register("zipCode")}
                  className="w-full"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
