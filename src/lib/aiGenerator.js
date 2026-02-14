import OpenAI from "openai";

// Initialize OpenAI client - supports both OpenAI and OpenRouter
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  
  // Check if it's an OpenRouter key (starts with sk-or-)
  if (apiKey.startsWith('sk-or-')) {
    return new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "OutreachX",
      },
    });
  }
  
  // Regular OpenAI key
  return new OpenAI({ apiKey });
};

// Get model name based on API provider
const getModelName = () => {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (apiKey.startsWith('sk-or-')) {
    return "openai/gpt-4o-mini"; // OpenRouter model format
  }
  return "gpt-4o-mini";
};

const intentDescriptions = {
  mentorship: "seeking mentorship and career guidance",
  internship: "exploring internship opportunities",
  informational: "requesting an informational interview to learn about their career path",
  referral: "requesting a job referral",
  networking: "building professional connections",
  advice: "seeking industry-specific advice and insights",
};

const toneDescriptions = {
  professional: "formal and business-like, maintaining a professional demeanor",
  friendly: "warm yet professional, approachable but respectful",
  enthusiastic: "energetic and passionate, showing genuine excitement",
  humble: "humble and curious, respectful and eager to learn",
};

const lengthDescriptions = {
  concise: "under 100 words, brief and to the point",
  standard: "100-150 words, balanced detail",
  detailed: "150-200 words, comprehensive",
};

function buildPrompt(formData) {
  const { studentProfile, targetProfessional, intent, tone, length, additionalContext } = formData;
  
  // Handle case when professional's name is not provided
  const profName = targetProfessional.name?.trim() || "the hiring team";
  const profTitle = targetProfessional.title?.trim() || "professional";
  const hasSpecificPerson = targetProfessional.name?.trim();
  
  return `You are an expert at writing professional networking outreach messages. Generate a personalized LinkedIn/email outreach message based on the following details:

## Student Profile:
- Name: ${studentProfile.name}
- University: ${studentProfile.university}
- Major: ${studentProfile.major}
- Year: ${studentProfile.year || "Not specified"}
- Skills: ${studentProfile.skills || "Not specified"}
- Experience: ${studentProfile.experience || "Not specified"}
- Career Interests: ${studentProfile.interests || "Not specified"}
- LinkedIn URL: ${studentProfile.linkedinUrl || "Not provided"}

## Target Professional/Company:
- Name: ${profName}${!hasSpecificPerson ? " (Unknown - address to team/company)" : ""}
- Job Title: ${profTitle}
- Company: ${targetProfessional.company}
- Industry: ${targetProfessional.industry || "Not specified"}
- Background/Achievements: ${targetProfessional.background || "Not specified"}
- Connection/Common Ground: ${targetProfessional.connection || "None mentioned"}

## Message Requirements:
- Intent: ${intentDescriptions[intent] || intent}
- Tone: ${toneDescriptions[tone] || tone}
- Length: ${lengthDescriptions[length] || length}
${additionalContext ? `- Additional Context: ${additionalContext}` : ""}

## Guidelines:
1. ${hasSpecificPerson ? "Start with a personalized greeting using the professional's name" : "Start with an appropriate greeting (e.g., 'Dear Hiring Team at [Company]' or 'Hello [Company] Team')"}
2. Establish credibility briefly (who you are)
3. Show genuine interest and specific knowledge about the company/industry
4. Make a clear, specific ask (e.g., 15-20 minute call, application consideration)
5. Be respectful of their time
6. End with a professional signature
7. Do NOT include generic phrases like "I came across your profile"
8. Make it feel authentic and personalized
9. Include specific details from the provided information
${!hasSpecificPerson ? "10. Since no specific person is mentioned, focus on the company and role rather than personal details" : ""}

Generate ONLY the message text, no additional commentary or explanations.`;
}

export async function generateWithAI(formData) {
  const openai = getOpenAIClient();
  
  if (!openai) {
    // Return null if no API key - fallback to template-based generation
    return null;
  }

  try {
    const prompt = buildPrompt(formData);
    
    const completion = await openai.chat.completions.create({
      model: getModelName(),
      messages: [
        {
          role: "system",
          content: "You are an expert professional networking coach who helps students craft compelling outreach messages. Your messages are always personalized, professional, and have high response rates. You never use generic phrases and always make the message feel authentic.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return null;
  }
}

export async function refineMessage(originalMessage, refinementType, formData) {
  const openai = getOpenAIClient();

  const refinementPrompts = {
    "More empathy": "Make this message more empathetic and emotionally intelligent while maintaining professionalism. Show genuine care about the recipient's time.",
    "Shorter": "Make this message much more concise (aim for 50-75 words) while keeping the key points and maintaining impact. Remove all filler words.",
    "More formal": "Make this message more formal and business-like. Use proper professional language suitable for executive-level communication.",
    "Add specifics": "Add more specific details and make the message more personalized. Include concrete examples where appropriate.",
    // Legacy keys for backward compatibility
    empathy: "Make this message more empathetic and emotionally intelligent while maintaining professionalism.",
    shorter: "Make this message more concise while keeping the key points and maintaining impact.",
    formal: "Make this message more formal and business-like while keeping it personable.",
    friendly: "Make this message warmer and more approachable while maintaining professionalism.",
    confident: "Make this message more confident and assertive while remaining respectful.",
    specific: "Add more specific details and make the message more personalized.",
  };
  
  // Get the prompt for this refinement type
  const prompt = refinementPrompts[refinementType] || "Improve this message.";

  // If no OpenAI, use simple fallback
  if (!openai) {
    return simpleRefine(originalMessage, refinementType);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: getModelName(),
      messages: [
        {
          role: "system",
          content: "You are an expert at refining professional networking messages. Make targeted improvements while preserving the core message and intent.",
        },
        {
          role: "user",
          content: `${prompt}\n\nOriginal message:\n${originalMessage}\n\nReturn only the refined message, no explanations.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content?.trim() || simpleRefine(originalMessage, refinementType);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return simpleRefine(originalMessage, refinementType);
  }
}

// Simple non-AI refinement fallback
function simpleRefine(message, refinementType) {
  if (!message) return message;
  
  switch (refinementType) {
    case "Shorter":
    case "shorter":
      // Remove filler words and shorten
      const sentences = message.split(/[.!?]+/).filter(s => s.trim());
      if (sentences.length <= 2) return message; // Already short
      const shortened = sentences.slice(0, Math.max(2, Math.ceil(sentences.length * 0.6))).join(". ");
      const result = shortened.trim();
      return result + (result.endsWith(".") ? "" : ".");
    
    case "More formal":
    case "formal":
      return message
        .replace(/Hi /g, "Dear ")
        .replace(/Hey /g, "Dear ")
        .replace(/Thanks!/g, "Thank you.")
        .replace(/!/g, ".")
        .replace(/I'd love to/g, "I would be honored to")
        .replace(/can't wait/gi, "look forward to")
        .replace(/awesome/gi, "excellent")
        .replace(/really /gi, "");
    
    case "More empathy":
    case "empathy":
      const empathyInsert = "I truly appreciate your time and understand how valuable it is. ";
      // Try to insert after greeting, or prepend if no greeting found
      const empathyResult = message.replace(/^(Dear|Hi|Hello)[^,\n]*[,\n]\s*/i, (match) => match + empathyInsert);
      if (empathyResult === message) {
        // No greeting found, prepend
        return empathyInsert + message;
      }
      return empathyResult;
    
    case "Add specifics":
    case "specific":
      return message + "\n\nI would be happy to share more specific details about my projects and how they align with your work.";
    
    default:
      return message;
  }
}

export function isAIEnabled() {
  return !!process.env.OPENAI_API_KEY;
}

// Generate a follow-up message based on the original
export async function generateFollowUpMessage(formData, previousMessage) {
  const openai = getOpenAIClient();
  const { studentProfile, targetProfessional } = formData;
  
  const profName = targetProfessional.name?.trim() || "the team";
  
  const prompt = `You are an expert at writing professional follow-up messages. Generate a polite follow-up message based on the following:

## Original Message:
${previousMessage}

## Context:
- Student Name: ${studentProfile.name}
- Target: ${profName} at ${targetProfessional.company}
- Industry: ${targetProfessional.industry || "Not specified"}

## Follow-up Guidelines:
1. Keep it short (50-80 words)
2. Reference the previous outreach politely
3. Reiterate interest briefly
4. Respect their time
5. Don't be pushy or desperate
6. Add one new piece of value if possible (e.g., recent achievement, shared news)
7. End with a gentle call-to-action

Generate ONLY the follow-up message text.`;

  if (!openai) {
    // Simple fallback follow-up
    return `Hi ${profName === "the team" ? "there" : profName},

I wanted to follow up on my previous message. I remain very interested in connecting and learning more about opportunities at ${targetProfessional.company}.

I completely understand you're busy, and I appreciate any time you might have. Even a brief 10-minute conversation would be incredibly valuable to me.

Thank you for your consideration.

Best regards,
${studentProfile.name}`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: getModelName(),
      messages: [
        {
          role: "system",
          content: "You are an expert at writing professional follow-up messages that are polite, brief, and effective. Your follow-ups have high response rates because they respect the recipient's time while showing genuine interest.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return null;
  }
}
