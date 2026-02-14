import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Simple password hashing (use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// POST - Login or Register
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    if (action === "signup") {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists" },
          { status: 400 }
        );
      }

      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || email.split("@")[0],
        },
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: "Account created successfully",
      });
    }

    if (action === "login") {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          profile: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "No account found with this email" },
          { status: 401 }
        );
      }

      // Check password
      if (user.password !== hashedPassword) {
        return NextResponse.json(
          { success: false, error: "Incorrect password" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profile: user.profile,
        },
        message: "Login successful",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'login' or 'signup'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
