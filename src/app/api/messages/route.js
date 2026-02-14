import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch message history
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit")) || 20;
    const offset = parseInt(searchParams.get("offset")) || 0;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    const messages = await prisma.generatedMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        target: {
          select: {
            id: true,
            name: true,
            company: true,
          },
        },
      },
    });

    const total = await prisma.generatedMessage.count({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      messages,
      total,
      hasMore: offset + messages.length < total,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST - Save a new generated message
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      targetName,
      targetTitle,
      targetCompany,
      targetId,
      intent,
      tone,
      length,
      message,
      generationType,
    } = body;

    if (!userId || !targetName || !intent || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const savedMessage = await prisma.generatedMessage.create({
      data: {
        userId,
        targetId: targetId || null,
        targetName,
        targetTitle: targetTitle || null,
        targetCompany: targetCompany || null,
        intent,
        tone: tone || "professional",
        length: length || "standard",
        message,
        generationType: generationType || "template",
      },
    });

    return NextResponse.json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save message" },
      { status: 500 }
    );
  }
}

// PATCH - Update message (rating, copied, sent status)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { messageId, rating, copied, sent, gotResponse } = body;

    if (!messageId) {
      return NextResponse.json(
        { success: false, error: "Message ID required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (copied !== undefined) updateData.copied = copied;
    if (sent !== undefined) updateData.sent = sent;
    if (gotResponse !== undefined) updateData.gotResponse = gotResponse;

    const updatedMessage = await prisma.generatedMessage.update({
      where: { id: messageId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get("id");

    if (!messageId) {
      return NextResponse.json(
        { success: false, error: "Message ID required" },
        { status: 400 }
      );
    }

    await prisma.generatedMessage.delete({
      where: { id: messageId },
    });

    return NextResponse.json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
