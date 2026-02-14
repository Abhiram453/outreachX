import { generateMessage, validateFormData, detectSuspiciousPatterns } from "@/lib/messageGenerator";
import { generateWithAI, isAIEnabled, generateFollowUpMessage } from "@/lib/aiGenerator";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { isFollowUp, previousMessage, ...formData } = body;
    
    // Validate form data
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }
    
    // Check for suspicious patterns
    const warnings = detectSuspiciousPatterns(formData);
    
    let message;
    let generationType = "template";
    
    // Handle follow-up generation
    if (isFollowUp && previousMessage) {
      if (isAIEnabled()) {
        message = await generateFollowUpMessage(formData, previousMessage);
        generationType = "ai-followup";
      }
      
      // Fallback follow-up
      if (!message) {
        const profName = formData.targetProfessional?.name?.trim() || "there";
        message = `Hi ${profName === "there" ? profName : profName},

I wanted to follow up on my previous message. I remain very interested in connecting and learning more about opportunities at ${formData.targetProfessional?.company || "your company"}.

I completely understand you're busy, and I appreciate any time you might have. Even a brief 10-minute conversation would be incredibly valuable to me.

Thank you for your consideration.

Best regards,
${formData.studentProfile?.name || ""}`;
        generationType = "template-followup";
      }
    } else {
      // Regular message generation
      // Try AI generation first if available
      if (isAIEnabled()) {
        message = await generateWithAI(formData);
        if (message) {
          generationType = "ai";
        }
      }
      
      // Fallback to template-based generation
      if (!message) {
        message = generateMessage(formData);
        // Add slight delay to simulate processing (better UX)
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
    
    return NextResponse.json({
      success: true,
      message,
      generationType,
      aiEnabled: isAIEnabled(),
      warnings: warnings.length > 0 ? warnings : undefined,
    });
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json(
      { success: false, errors: ["An error occurred while generating the message"] },
      { status: 500 }
    );
  }
}
