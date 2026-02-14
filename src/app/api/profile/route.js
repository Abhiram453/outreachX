import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch user profile
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        _count: {
          select: {
            messages: true,
            savedTargets: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        profile: user.profile,
        stats: user._count,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// POST - Create or update user profile
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, university, major, year, skills, experience, interests, linkedinUrl } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    // Upsert profile (create if not exists, update if exists)
    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        university: university || null,
        major: major || null,
        year: year || null,
        skills: skills || null,
        experience: experience || null,
        interests: interests || null,
        linkedinUrl: linkedinUrl || null,
      },
      create: {
        userId,
        university: university || null,
        major: major || null,
        year: year || null,
        skills: skills || null,
        experience: experience || null,
        interests: interests || null,
        linkedinUrl: linkedinUrl || null,
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
