import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch user stats and analytics
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

    // Get total messages count
    const totalMessages = await prisma.generatedMessage.count({
      where: { userId },
    });

    // Get messages by intent
    const messagesByIntent = await prisma.generatedMessage.groupBy({
      by: ["intent"],
      where: { userId },
      _count: true,
    });

    // Get messages by tone
    const messagesByTone = await prisma.generatedMessage.groupBy({
      by: ["tone"],
      where: { userId },
      _count: true,
    });

    // Get AI vs template usage
    const generationTypes = await prisma.generatedMessage.groupBy({
      by: ["generationType"],
      where: { userId },
      _count: true,
    });

    // Get copied count
    const copiedCount = await prisma.generatedMessage.count({
      where: { userId, copied: true },
    });

    // Get sent count
    const sentCount = await prisma.generatedMessage.count({
      where: { userId, sent: true },
    });

    // Get response count
    const responseCount = await prisma.generatedMessage.count({
      where: { userId, gotResponse: true },
    });

    // Get average rating
    const avgRating = await prisma.generatedMessage.aggregate({
      where: { userId, rating: { not: null } },
      _avg: { rating: true },
    });

    // Get recent messages (last 5)
    const recentMessages = await prisma.generatedMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        targetName: true,
        targetCompany: true,
        intent: true,
        createdAt: true,
      },
    });

    // Get saved targets count
    const savedTargetsCount = await prisma.savedTarget.count({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalMessages,
        copiedCount,
        sentCount,
        responseCount,
        responseRate: sentCount > 0 ? ((responseCount / sentCount) * 100).toFixed(1) : 0,
        averageRating: avgRating._avg.rating?.toFixed(1) || null,
        savedTargetsCount,
        messagesByIntent: messagesByIntent.reduce((acc, item) => {
          acc[item.intent] = item._count;
          return acc;
        }, {}),
        messagesByTone: messagesByTone.reduce((acc, item) => {
          acc[item.tone] = item._count;
          return acc;
        }, {}),
        generationTypes: generationTypes.reduce((acc, item) => {
          acc[item.generationType] = item._count;
          return acc;
        }, {}),
        recentMessages,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
