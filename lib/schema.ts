import { z } from "zod";

export const emailSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  email: z.string().email("Please enter a valid email address"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});

export type EmailFormData = z.infer<typeof emailSchema>;

