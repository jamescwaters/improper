import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { emailSchema } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    // Store in Resend contacts or send to your email
    const { data, error } = await resend.emails.send({
      from: "Improper Brewery <onboarding@resend.dev>",
      to: process.env.EMAIL_TO || "hello@improperbrewery.com",
      reply_to: validatedData.email,
      subject: `New Improper 500 Signup: ${validatedData.firstName}`,
      html: `
        <h2>New Improper 500 Signup</h2>
        <p><strong>Name:</strong> ${validatedData.firstName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>ZIP Code:</strong> ${validatedData.zipCode}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

