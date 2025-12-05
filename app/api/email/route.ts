import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { emailSchema } from "@/lib/schema";
import { saveSignup, emailExists, getSignupCount } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    // Check for duplicate email
    if (emailExists(validatedData.email)) {
      return NextResponse.json(
        { error: "You're already on the list! Check your email for confirmation." },
        { status: 400 }
      );
    }

    // Save to text file
    const timestamp = new Date().toISOString();
    const saved = saveSignup({
      firstName: validatedData.firstName,
      email: validatedData.email,
      zipCode: validatedData.zipCode,
      timestamp,
    });

    if (!saved) {
      console.error("Failed to save signup to file");
      // Continue anyway - email notification is more important
    }

    // Send email notification (if Resend is configured)
    if (resend) {
      try {
        const { error } = await resend.emails.send({
          from: "Improper Brewery <onboarding@resend.dev>",
          to: process.env.EMAIL_TO || "hello@improperbrewery.com",
          reply_to: validatedData.email,
          subject: `New Improper 500 Signup: ${validatedData.firstName}`,
          html: `
            <h2>New Improper 500 Signup</h2>
            <p><strong>Name:</strong> ${validatedData.firstName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>ZIP Code:</strong> ${validatedData.zipCode}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Total Signups:</strong> ${getSignupCount()}</p>
          `,
        });

        if (error) {
          console.error("Failed to send email:", error);
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      signupNumber: getSignupCount(),
      message: "Successfully joined the Improper 500!",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET endpoint to retrieve signup count
export async function GET() {
  try {
    const count = getSignupCount();
    return NextResponse.json({ count, total: 500, spotsLeft: Math.max(0, 500 - count) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get signup count" }, { status: 500 });
  }
}

