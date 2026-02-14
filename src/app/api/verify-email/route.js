import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store for verification codes (use Redis/DB in production)
const verificationCodes = new Map();

// Generate 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification code
export async function POST(request) {
  try {
    const { email, action, code } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (action === "send") {
      // Generate and store code
      const code = generateCode();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
      
      verificationCodes.set(email.toLowerCase(), {
        code,
        expiresAt,
        attempts: 0,
      });

      // Send actual email via Resend
      console.log(`[EMAIL VERIFICATION] Sending code ${code} to ${email}`);
      
      let emailSent = false;
      let emailError = null;
      
      try {
        if (process.env.RESEND_API_KEY) {
          const result = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "OutreachX <onboarding@resend.dev>",
            to: email,
            subject: "Your OutreachX Verification Code",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4F46E5; text-align: center;">OutreachX Email Verification</h2>
                <p style="color: #374151; font-size: 16px;">Your verification code is:</p>
                <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 8px;">${code}</span>
                </div>
                <p style="color: #6B7280; font-size: 14px;">This code expires in 10 minutes.</p>
                <p style="color: #6B7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;" />
                <p style="color: #9CA3AF; font-size: 12px; text-align: center;">OutreachX - Professional Networking Outreach Optimizer</p>
              </div>
            `,
          });
          console.log("Resend result:", result);
          emailSent = !result.error;
          if (result.error) {
            emailError = result.error.message;
          }
        }
      } catch (err) {
        console.error("Failed to send email:", err);
        emailError = err.message;
      }

      return NextResponse.json({
        success: true,
        message: emailSent ? "Verification code sent to your email" : "Check the code below (email sending failed)",
        // Always show demo code for hackathon - remove in production
        _demoCode: code,
        _emailSent: emailSent,
        _emailError: emailError,
      });
    }

    if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { success: false, error: "Verification code is required" },
          { status: 400 }
        );
      }

      const stored = verificationCodes.get(email.toLowerCase());

      if (!stored) {
        return NextResponse.json(
          { success: false, error: "No verification code found. Please request a new one." },
          { status: 400 }
        );
      }

      // Check expiration
      if (Date.now() > stored.expiresAt) {
        verificationCodes.delete(email.toLowerCase());
        return NextResponse.json(
          { success: false, error: "Code expired. Please request a new one." },
          { status: 400 }
        );
      }

      // Check attempts
      if (stored.attempts >= 5) {
        verificationCodes.delete(email.toLowerCase());
        return NextResponse.json(
          { success: false, error: "Too many attempts. Please request a new code." },
          { status: 429 }
        );
      }

      // Verify code
      if (stored.code !== code) {
        stored.attempts++;
        return NextResponse.json(
          { success: false, error: "Invalid code. Please try again." },
          { status: 400 }
        );
      }

      // Success - remove code
      verificationCodes.delete(email.toLowerCase());

      return NextResponse.json({
        success: true,
        verified: true,
        message: "Email verified successfully!",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process verification" },
      { status: 500 }
    );
  }
}
