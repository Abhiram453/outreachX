import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch saved targets for a user
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

    const targets = await prisma.savedTarget.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { messages: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      targets,
    });
  } catch (error) {
    console.error("Error fetching targets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch targets" },
      { status: 500 }
    );
  }
}

// POST - Save a new target professional
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, name, title, company, industry, background, linkedinUrl } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { success: false, error: "User ID and name are required" },
        { status: 400 }
      );
    }

    const target = await prisma.savedTarget.create({
      data: {
        userId,
        name,
        title: title || null,
        company: company || null,
        industry: industry || null,
        background: background || null,
        linkedinUrl: linkedinUrl || null,
      },
    });

    return NextResponse.json({
      success: true,
      target,
    });
  } catch (error) {
    console.error("Error saving target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save target" },
      { status: 500 }
    );
  }
}

// PATCH - Update a saved target
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { targetId, name, title, company, industry, background, linkedinUrl } = body;

    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Target ID required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (company !== undefined) updateData.company = company;
    if (industry !== undefined) updateData.industry = industry;
    if (background !== undefined) updateData.background = background;
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl;

    const target = await prisma.savedTarget.update({
      where: { id: targetId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      target,
    });
  } catch (error) {
    console.error("Error updating target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update target" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a saved target
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetId = searchParams.get("id");

    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Target ID required" },
        { status: 400 }
      );
    }

    await prisma.savedTarget.delete({
      where: { id: targetId },
    });

    return NextResponse.json({
      success: true,
      message: "Target deleted",
    });
  } catch (error) {
    console.error("Error deleting target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete target" },
      { status: 500 }
    );
  }
}
