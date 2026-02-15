import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { uid, email, name, image, provider } = await request.json();

    // Validate required fields
    if (!uid || !email) {
      return NextResponse.json(
        { error: "UID and email are required" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Update existing user with latest info
      user = await prisma.user.update({
        where: { email },
        data: {
          name: name || user.name,
          image: image || user.image,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          image,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });
    }

    // Create session token
    const sessionToken = Buffer.from(
      JSON.stringify({ userId: user.id, email: user.email, provider, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })
    ).toString("base64");

    const response = NextResponse.json(
      {
        message: "Authentication successful",
        user,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for session
    response.cookies.set("auth_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Firebase auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed", details: error.message },
      { status: 500 }
    );
  }
}
