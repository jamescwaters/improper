import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { emailSchema } from "@/lib/schema";
import { createServerClient } from "@/lib/supabase";

const buffer = 186;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    // Initialize Supabase client
    const supabase = createServerClient();

    // Check if email already exists
    const { data: existingSignup } = await supabase
      .from("signups")
      .select("email")
      .eq("email", validatedData.email)
      .single();

    if (existingSignup) {
      return NextResponse.json(
        { error: "You're already on the list! Check your email for confirmation." },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data: signup, error: dbError } = await supabase
      .from("signups")
      .insert({
        first_name: validatedData.firstName,
        email: validatedData.email,
        zip_code: validatedData.zipCode,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save signup. Please try again." },
        { status: 500 }
      );
    }

    // Get total count
    const { count } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true });

    // Send email notification (if Resend is configured)
    if (resend) {
      try {
        await resend.emails.send({
          from: "Improper Brewery <onboarding@resend.dev>",
          to: process.env.EMAIL_TO || "hello@improperbrewery.com",
          reply_to: validatedData.email,
          subject: `New Improper 500 Signup: ${validatedData.firstName}`,
          html: `
            <h2>New Improper 500 Signup</h2>
            <p><strong>Name:</strong> ${validatedData.firstName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>ZIP Code:</strong> ${validatedData.zipCode}</p>
            <p><strong>Total Signups:</strong> ${count || 0}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      signupNumber: count + buffer || 0,
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
    const supabase = createServerClient();
    const { count, error } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to get signup count" },
        { status: 500 }
      );
    }

    const total = 500;
    
    const spotsLeft = Math.max(0, total - (count + buffer || 0));

    return NextResponse.json({
      count: count + buffer|| 0,
      total,
      spotsLeft,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get signup count" },
      { status: 500 }
    );
  }
}

