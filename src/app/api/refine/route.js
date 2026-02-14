import { refineMessage, isAIEnabled } from "@/lib/aiGenerator";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, refinementType, formData } = await request.json();
    
    if (!message || !refinementType) {
      return NextResponse.json(
        { success: false, error: "Message and refinement type are required" },
        { status: 400 }
      );
    }
    
    let refined;
    try {
      refined = await refineMessage(message, refinementType, formData);
    } catch (refineError) {
      console.error("Refinement error:", refineError);
      // Return original message if refinement fails
      refined = message;
    }
    
    // If refinement returned nothing, use original
    if (!refined || refined.trim() === "") {
      refined = message;
    }
    
    return NextResponse.json({
      success: true,
      message: refined,
      refinementType,
      aiEnabled: isAIEnabled(),
    });
  } catch (error) {
    console.error("Error refining message:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while refining the message" },
      { status: 500 }
    );
  }
}
