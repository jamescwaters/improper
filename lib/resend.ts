import { Resend } from "resend";

// Only initialize Resend if API key is available (allows build to succeed)
// The error will be thrown at runtime when the API is actually called
export const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

