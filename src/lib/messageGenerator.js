// Message generation utility with templates
// This provides intelligent message generation without requiring an external AI API

// Helper: Get appropriate greeting based on available professional info
function getGreeting(data) {
  const prof = data.targetProfessional;
  if (prof.name?.trim()) {
    return prof.name.trim();
  }
  // Fallback based on title or company
  if (prof.title?.trim()) {
    return prof.title.trim();
  }
  return `${prof.company} Team`;
}

// Helper: Preprocess data to handle optional fields
function preprocessData(formData) {
  const data = JSON.parse(JSON.stringify(formData)); // Deep clone
  const prof = data.targetProfessional;
  
  // Set fallback for name
  if (!prof.name?.trim()) {
    prof.name = getGreeting(data);
  }
  
  // Set fallback for title
  if (!prof.title?.trim()) {
    prof.title = "professional";
  }
  
  return data;
}

const templates = {
  mentorship: {
    professional: {
      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I noticed ${data.targetProfessional.connection}. ` : ""}Your work at ${data.targetProfessional.company} as ${data.targetProfessional.title} aligns closely with my career interests${data.studentProfile.interests ? ` in ${data.studentProfile.interests}` : ""}.

Would you be open to a 15-20 minute call to discuss your career journey? I would greatly value your insights.

Best regards,
${data.studentProfile.name}`,

      standard: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, and I am a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I came across your profile while ${data.targetProfessional.connection}. ` : ""}I have been following your impressive career trajectory at ${data.targetProfessional.company}, and I am deeply inspired by your work as ${data.targetProfessional.title}.

${data.targetProfessional.background ? `I was particularly impressed by ${data.targetProfessional.background}. ` : ""}${data.studentProfile.experience ? `In my own journey, I have ${data.studentProfile.experience}. ` : ""}Your experience in the ${data.targetProfessional.industry || "industry"} closely aligns with my career aspirations${data.studentProfile.interests ? `, particularly in ${data.studentProfile.interests}` : ""}.

I would be incredibly grateful if you could spare 15-20 minutes for a brief conversation to discuss your career path and any advice you might have for someone starting out. I am flexible with timing and happy to work around your schedule.

Thank you for considering my request. I look forward to the possibility of connecting with you.

Warm regards,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} pursuing a degree in ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I discovered your profile through ${data.targetProfessional.connection}, and ` : ""}I am reaching out because your career journey and current role as ${data.targetProfessional.title} at ${data.targetProfessional.company} represent exactly the path I aspire to follow.

${data.targetProfessional.background ? `I have been particularly inspired by ${data.targetProfessional.background}. ` : "Your work in this field has caught my attention for the innovative approach you bring. "}${data.studentProfile.skills ? `I have been developing skills in ${data.studentProfile.skills}, and ` : ""}${data.studentProfile.experience ? `through my experiences including ${data.studentProfile.experience}, I have ` : "I have "}cultivated a strong foundation that I believe could benefit from your mentorship.

${data.studentProfile.interests ? `My specific interests lie in ${data.studentProfile.interests}, and ` : ""}I believe your insights could be invaluable in helping me navigate the early stages of my career in ${data.targetProfessional.industry || "this field"}. I am eager to learn about:
- How you approached critical career decisions
- Skills you consider most valuable in your role
- Any recommendations for someone at my stage

Would you be open to a brief 20-minute virtual coffee chat? I would be deeply honored to learn from your experience. I am flexible with scheduling and happy to accommodate your availability.

Thank you for taking the time to consider my request. I genuinely appreciate your time and understand how valuable it is.

Best regards,
${data.studentProfile.name}
${data.studentProfile.university}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I noticed ${data.targetProfessional.connection} - how cool! ` : ""}Your journey to ${data.targetProfessional.title} at ${data.targetProfessional.company} is super inspiring.

Any chance you'd have 15 minutes for a quick chat about your career path? Would love to hear your story!

Cheers,
${data.studentProfile.name}`,

      standard: (data) => `Hi ${data.targetProfessional.name}!

Hope you're having a great week! I'm ${data.studentProfile.name}, currently a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I found your profile while ${data.targetProfessional.connection}, and ` : ""}I've been really inspired by your career journey!

${data.targetProfessional.background ? `I especially loved learning about ${data.targetProfessional.background}. ` : ""}Your role as ${data.targetProfessional.title} at ${data.targetProfessional.company} is exactly the kind of career I'm working towards${data.studentProfile.interests ? `, especially the ${data.studentProfile.interests} aspect` : ""}.

${data.studentProfile.experience ? `I've been working on ${data.studentProfile.experience}, and ` : ""}I'd love to hear more about your path and any advice you might have for someone just starting out. Would you be open to a quick 15-20 minute chat?

Thanks so much for considering!

Best,
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope this message finds you well and not too buried in emails! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I came across your profile through ${data.targetProfessional.connection}, and ` : ""}I just had to reach out because your career path is genuinely inspiring!

${data.targetProfessional.background ? `I was particularly amazed by ${data.targetProfessional.background}. That's exactly the kind of impact I hope to make someday! ` : ""}Your role as ${data.targetProfessional.title} at ${data.targetProfessional.company} represents the perfect blend of ${data.studentProfile.interests || "skills and impact"} that I'm striving for.

${data.studentProfile.skills ? `I've been building my skills in ${data.studentProfile.skills}, and ` : ""}${data.studentProfile.experience ? `through projects like ${data.studentProfile.experience}, ` : ""}I've gotten a taste of what I love about this field. But I know there's so much more to learn, and that's where I'm hoping you might be able to help!

I'd absolutely love to hear about:
- What first drew you to this field
- How you navigated key turning points in your career
- What you wish you knew when starting out

Would you be open to a quick virtual coffee chat sometime? I promise to keep it brief and respect your time. Any insights you could share would mean the world to me!

Thanks so much for reading this far - I really appreciate it!

Warmly,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  },
  internship: {
    professional: {
      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} in ${data.studentProfile.major} at ${data.studentProfile.university}. I am interested in internship opportunities at ${data.targetProfessional.company}${data.studentProfile.skills ? `, particularly roles involving ${data.studentProfile.skills}` : ""}.

Would you be able to share any insights about opportunities or the application process?

Best regards,
${data.studentProfile.name}`,

      standard: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, and I am a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. I am reaching out to express my strong interest in internship opportunities at ${data.targetProfessional.company}.

${data.targetProfessional.background ? `I have been following ${data.targetProfessional.company}'s work, particularly ${data.targetProfessional.background}, and ` : ""}I believe my background aligns well with your team's work. ${data.studentProfile.skills ? `I have developed skills in ${data.studentProfile.skills}` : "I have been building relevant technical skills"}${data.studentProfile.experience ? `, and my experience includes ${data.studentProfile.experience}` : ""}.

I would greatly appreciate any insights you could share about potential opportunities or the best way to pursue a role at ${data.targetProfessional.company}.

Thank you for your time and consideration.

Best regards,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I came across your profile while ${data.targetProfessional.connection}, and ` : ""}I am reaching out to express my strong interest in internship opportunities at ${data.targetProfessional.company}.

${data.targetProfessional.background ? `I have been following ${data.targetProfessional.company}'s innovative work in ${data.targetProfessional.background}, and ` : ""}I am genuinely excited about the possibility of contributing to your team. ${data.studentProfile.skills ? `I have developed a strong foundation in ${data.studentProfile.skills}` : "I have been developing relevant technical skills"}${data.studentProfile.experience ? `, complemented by hands-on experience in ${data.studentProfile.experience}` : ""}.

${data.studentProfile.interests ? `My particular interest lies in ${data.studentProfile.interests}, which ` : "My career interests "}align closely with ${data.targetProfessional.company}'s mission and values. I am eager to apply my skills in a real-world setting and contribute meaningfully to your ${data.targetProfessional.industry || "team"}.

I would be grateful for any insights you could share regarding:
- Current or upcoming internship openings
- The qualities your team values in candidates
- Any advice on strengthening my application

I understand you have a demanding schedule, and I truly appreciate any guidance you can provide. Would you be open to a brief conversation at your convenience?

Thank you for considering my request.

Sincerely,
${data.studentProfile.name}
${data.studentProfile.university}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. I'm really interested in internship opportunities at ${data.targetProfessional.company}!

Any advice on the best way to apply or what the team looks for?

Thanks!
${data.studentProfile.name}`,

      standard: (data) => `Hi ${data.targetProfessional.name}!

I hope you're doing well! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. I've been super interested in ${data.targetProfessional.company}'s work${data.targetProfessional.background ? `, especially ${data.targetProfessional.background}` : ""}, and I'm hoping to find an internship opportunity there.

${data.studentProfile.skills ? `I've been working on ${data.studentProfile.skills}` : "I've been building my skills"}${data.studentProfile.experience ? ` through projects like ${data.studentProfile.experience}` : ""}, and I'd love to put them to use at ${data.targetProfessional.company}!

Would you have any insights on the best way to apply or what the team typically looks for in interns? Any advice would be hugely appreciated!

Thanks so much!
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope you're having a great day! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile while ${data.targetProfessional.connection}, and ` : ""}I'm reaching out because ${data.targetProfessional.company} has been my dream place to intern!

${data.targetProfessional.background ? `I've been following the company's work on ${data.targetProfessional.background}, and it's exactly the kind of innovative environment I want to be part of. ` : ""}${data.studentProfile.skills ? `I've developed skills in ${data.studentProfile.skills}` : "I've been building relevant skills"}${data.studentProfile.experience ? `, and through ${data.studentProfile.experience}, I've gotten hands-on experience that I think would transfer well` : ""}.

${data.studentProfile.interests ? `I'm especially excited about opportunities related to ${data.studentProfile.interests}. ` : ""}I know landing a great internship takes more than just applying online, so I'd love to hear:
- What made you choose ${data.targetProfessional.company}?
- What qualities does the team value most?
- Any tips for making my application stand out?

I know you're busy, so even a quick response would mean a lot. Thanks so much for taking the time to read this!

Cheers,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  },
  informational: {
    professional: {
      standard: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I discovered your profile through ${data.targetProfessional.connection}. ` : ""}I am researching career paths in ${data.targetProfessional.industry || "your field"} and would value the opportunity to learn from your experience.

Your journey to ${data.targetProfessional.title} at ${data.targetProfessional.company} represents the kind of career trajectory I aspire to. ${data.targetProfessional.background ? `I am particularly interested in learning more about ${data.targetProfessional.background}. ` : ""}

Would you be available for a brief 15-20 minute informational interview? I would be grateful for any insights you could share about the industry and your career path.

Best regards,
${data.studentProfile.name}`,

      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. I am exploring careers in ${data.targetProfessional.industry || "your field"} and would appreciate learning about your experience at ${data.targetProfessional.company}.

Would you be open to a brief informational interview?

Best regards,
${data.studentProfile.name}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, and I am a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I came across your profile while ${data.targetProfessional.connection}, and ` : ""}I am reaching out to request an informational interview to learn about your career journey.

Your experience as ${data.targetProfessional.title} at ${data.targetProfessional.company} is incredibly inspiring. ${data.targetProfessional.background ? `I was particularly impressed by ${data.targetProfessional.background}. ` : ""}As I navigate my own career exploration, I am eager to understand the ${data.targetProfessional.industry || "industry"} better from someone with your expertise.

${data.studentProfile.skills ? `I have been developing skills in ${data.studentProfile.skills}` : "I have been building my skill set"}${data.studentProfile.experience ? ` and recently worked on ${data.studentProfile.experience}` : ""}.${data.studentProfile.interests ? ` I am particularly interested in ${data.studentProfile.interests}.` : ""}

I would be grateful for 15-20 minutes of your time to discuss:
- Your career journey and key decisions along the way
- Day-to-day responsibilities in your role
- Trends and opportunities in the ${data.targetProfessional.industry || "field"}
- Advice for someone starting out

I understand your time is valuable, and I am happy to work around your schedule.

Thank you for considering my request.

Respectfully,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      standard: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile through ${data.targetProfessional.connection}, and ` : ""}I'm really curious about your career path!

Your role as ${data.targetProfessional.title} at ${data.targetProfessional.company} sounds fascinating.${data.targetProfessional.background ? ` I especially want to hear about ${data.targetProfessional.background}.` : ""} I'm exploring careers in ${data.targetProfessional.industry || "this space"} and would love to learn from your experience.

Would you be up for a quick virtual coffee chat? I'd love to hear your story!

Thanks for considering!
${data.studentProfile.name}`,

      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. Would love to hear about your journey to ${data.targetProfessional.title} at ${data.targetProfessional.company}!

Open to a quick chat?

Thanks!
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope you're having a great week! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile through ${data.targetProfessional.connection}, and ` : ""}I'm reaching out because your career journey really caught my attention!

Your path to becoming ${data.targetProfessional.title} at ${data.targetProfessional.company} is exactly the kind of story I'd love to learn from.${data.targetProfessional.background ? ` I'm especially interested in hearing about ${data.targetProfessional.background}!` : ""} As someone exploring the ${data.targetProfessional.industry || "industry"}, I have so many questions!

${data.studentProfile.skills ? `I've been working on ${data.studentProfile.skills}` : "I've been developing my skills"}${data.studentProfile.experience ? ` through ${data.studentProfile.experience}` : ""}, but I know there's so much I can learn from someone with your experience.${data.studentProfile.interests ? ` I'm particularly drawn to ${data.studentProfile.interests}.` : ""}

I'd love to chat about:
- What drew you to this field
- How you made key career decisions
- What a typical day looks like for you
- Any "I wish I knew this earlier" wisdom!

Would you be open to a 15-20 minute call? I promise to be respectful of your time!

Thanks so much!
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  },
  referral: {
    professional: {
      standard: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `${data.targetProfessional.connection}. ` : ""}I am reaching out regarding opportunities at ${data.targetProfessional.company}.

I have been following ${data.targetProfessional.company}'s work${data.targetProfessional.background ? `, particularly ${data.targetProfessional.background},` : ""} and I am genuinely excited about the possibility of joining your team. ${data.studentProfile.skills ? `My background includes ${data.studentProfile.skills}` : "I have developed relevant skills"}${data.studentProfile.experience ? `, and I have gained experience through ${data.studentProfile.experience}` : ""}.

I understand if a referral is not possible, but I would be grateful for any guidance on positioning myself as a strong candidate. I have attached my resume for your reference.

Thank you for considering my request.

Best regards,
${data.studentProfile.name}`,

      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. I am interested in opportunities at ${data.targetProfessional.company}${data.studentProfile.skills ? ` and have experience in ${data.studentProfile.skills}` : ""}.

Would you be open to discussing the referral process or sharing advice on the application?

Best regards,
${data.studentProfile.name}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I reached out because ${data.targetProfessional.connection}. ` : ""}I am writing to express my strong interest in opportunities at ${data.targetProfessional.company}.

${data.targetProfessional.background ? `I have been following ${data.targetProfessional.company}'s impressive work on ${data.targetProfessional.background}, and ` : ""}I believe my background and skills align well with your team's needs. ${data.studentProfile.skills ? `I have developed expertise in ${data.studentProfile.skills}` : "I have built a strong foundation"}${data.studentProfile.experience ? `, complemented by hands-on experience including ${data.studentProfile.experience}` : ""}.

${data.studentProfile.interests ? `I am particularly drawn to ${data.studentProfile.interests}, which ` : "My career interests "}align closely with ${data.targetProfessional.company}'s mission. I understand that employee referrals carry significant weight in the hiring process, and I am wondering if you would be willing to:
- Review my resume and share feedback
- Provide insights on what the team looks for in candidates
- Consider referring me if you feel my profile is a good match

I completely understand if this is not something you are comfortable with, and I would be equally grateful for any advice on how to position myself effectively.

Thank you for taking the time to consider my request.

Respectfully,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      standard: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `${data.targetProfessional.connection}. ` : ""}I'm really excited about opportunities at ${data.targetProfessional.company}!

${data.studentProfile.skills ? `I've been working with ${data.studentProfile.skills}` : "I've been building relevant skills"}${data.studentProfile.experience ? ` on projects like ${data.studentProfile.experience}` : ""}, and I think I'd be a great fit.${data.targetProfessional.background ? ` I'm especially interested in the work around ${data.targetProfessional.background}.` : ""}

Would you be open to chatting about the referral process or any tips for the application? No pressure at all – any guidance would be amazing!

Thanks so much!
${data.studentProfile.name}`,

      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} interested in ${data.targetProfessional.company}. Would you be open to sharing any tips on the application process?

Thanks!
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope you're doing great! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile through ${data.targetProfessional.connection}, and ` : ""}I'm reaching out because ${data.targetProfessional.company} is genuinely my dream company!

${data.targetProfessional.background ? `I've been following the amazing work around ${data.targetProfessional.background}, and ` : ""}I'm super excited about potentially joining the team. ${data.studentProfile.skills ? `I've developed skills in ${data.studentProfile.skills}` : "I've been building relevant experience"}${data.studentProfile.experience ? ` through projects like ${data.studentProfile.experience}` : ""}.${data.studentProfile.interests ? ` I'm especially passionate about ${data.studentProfile.interests}!` : ""}

I know referrals are a big ask, so I wanted to be upfront about what I'm hoping for:
- Any advice on making my application stand out
- Insights on what the team values most
- If you feel comfortable, potentially a referral (totally okay if not!)

I'd love to send over my resume if you're open to taking a look. No pressure at all – I really appreciate any guidance you can offer!

Thanks so much for your time!
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  },
  networking: {
    professional: {
      standard: (data) => `Dear ${data.targetProfessional.name},

My name is ${data.studentProfile.name}, and I am a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I noticed ${data.targetProfessional.connection}. ` : ""}I am reaching out to connect with professionals in ${data.targetProfessional.industry || "the field"}.

Your experience as ${data.targetProfessional.title} at ${data.targetProfessional.company} caught my attention.${data.targetProfessional.background ? ` I was particularly impressed by ${data.targetProfessional.background}.` : ""} ${data.studentProfile.interests ? `My interests in ${data.studentProfile.interests} align closely with your work.` : "I believe we share similar professional interests."}

I would be honored to connect and learn from your experience as I develop my own career path.

Best regards,
${data.studentProfile.name}`,

      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. I would be honored to connect with you and learn from your experience in ${data.targetProfessional.industry || "the industry"}.

Looking forward to connecting.

Best regards,
${data.studentProfile.name}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I came across your profile while ${data.targetProfessional.connection}, and ` : ""}I am reaching out to expand my professional network in ${data.targetProfessional.industry || "the field"}.

Your career as ${data.targetProfessional.title} at ${data.targetProfessional.company} is truly inspiring.${data.targetProfessional.background ? ` I was particularly impressed by ${data.targetProfessional.background}.` : ""} ${data.studentProfile.skills ? `I have been developing skills in ${data.studentProfile.skills}` : "I have been building my professional skills"}${data.studentProfile.experience ? ` through ${data.studentProfile.experience}` : ""}.

${data.studentProfile.interests ? `My interests in ${data.studentProfile.interests} ` : "My professional interests "}align closely with the work you do, and I believe connecting could be mutually beneficial. I am always eager to learn from experienced professionals and share insights from my own journey.

I would be honored to add you to my network and perhaps exchange perspectives on ${data.targetProfessional.industry || "the industry"} from time to time.

Thank you for considering my connection request.

Warm regards,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      standard: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile through ${data.targetProfessional.connection}, and ` : ""}I'd love to connect!

Your work as ${data.targetProfessional.title} at ${data.targetProfessional.company} is really inspiring.${data.targetProfessional.background ? ` I especially admire ${data.targetProfessional.background}!` : ""} ${data.studentProfile.interests ? `I'm interested in ${data.studentProfile.interests}, which seems aligned with your work.` : ""}

Always looking to learn from amazing people in ${data.targetProfessional.industry || "the industry"}!

Cheers,
${data.studentProfile.name}`,

      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. Would love to connect and learn from your experience at ${data.targetProfessional.company}!

Best,
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope you're having a fantastic week! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I discovered your profile while ${data.targetProfessional.connection}, and ` : ""}I'm reaching out because connecting with great people is the best part of building a career!

Your journey to ${data.targetProfessional.title} at ${data.targetProfessional.company} is super inspiring!${data.targetProfessional.background ? ` I especially love ${data.targetProfessional.background} – so cool!` : ""} ${data.studentProfile.skills ? `I've been working on ${data.studentProfile.skills}` : "I've been developing my skills"}${data.studentProfile.experience ? ` and recently ${data.studentProfile.experience}` : ""}.

${data.studentProfile.interests ? `My interests in ${data.studentProfile.interests} ` : "My professional interests "}seem really aligned with your work, and I think we'd have some great conversations!

I don't have a specific ask – I just love connecting with people who are doing interesting things in ${data.targetProfessional.industry || "the field"}. Would love to have you in my network!

Cheers,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  },
  advice: {
    professional: {
      standard: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} studying ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I encountered your profile while ${data.targetProfessional.connection}. ` : ""}I am seeking advice from experienced professionals in ${data.targetProfessional.industry || "your field"}.

Your expertise as ${data.targetProfessional.title} at ${data.targetProfessional.company} makes you an ideal person to ask about ${data.studentProfile.interests || "industry trends and career development"}.${data.targetProfessional.background ? ` Your work on ${data.targetProfessional.background} is particularly relevant to my interests.` : ""}

If you have a moment, I would greatly appreciate your perspective on current trends or skills that are becoming increasingly valuable in the field.

Thank you for your time.

Best regards,
${data.studentProfile.name}`,

      concise: (data) => `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} at ${data.studentProfile.university}. I would appreciate any advice you might have about ${data.studentProfile.interests || "succeeding in your field"}.

Thank you for your time.

Best regards,
${data.studentProfile.name}`,

      detailed: (data) => `Dear ${data.targetProfessional.name},

I hope this message finds you well. My name is ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} pursuing ${data.studentProfile.major} at ${data.studentProfile.university}. ${data.targetProfessional.connection ? `I came across your profile while ${data.targetProfessional.connection}, and ` : ""}I am reaching out to seek advice from someone with your expertise.

Your experience as ${data.targetProfessional.title} at ${data.targetProfessional.company} places you at the forefront of ${data.targetProfessional.industry || "the industry"}.${data.targetProfessional.background ? ` I have been following your work on ${data.targetProfessional.background}, and ` : " "}I believe your insights would be invaluable as I navigate my career path.

${data.studentProfile.skills ? `I have been developing skills in ${data.studentProfile.skills}` : "I have been building my skill set"}${data.studentProfile.experience ? ` and have experience including ${data.studentProfile.experience}` : ""}. ${data.studentProfile.interests ? `My interests lie specifically in ${data.studentProfile.interests}.` : ""}

I would be grateful for your perspective on:
- Critical skills for success in ${data.targetProfessional.industry || "your field"}
- Emerging trends shaping the industry
- How to position myself as a strong candidate

I understand your time is valuable, and even a brief response would be tremendously helpful.

Thank you for considering my request.

Respectfully,
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    },
    friendly: {
      standard: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I discovered you while ${data.targetProfessional.connection}, and ` : ""}I'm hoping to pick your brain about ${data.targetProfessional.industry || "the industry"}!

Your work as ${data.targetProfessional.title} at ${data.targetProfessional.company} is super impressive.${data.targetProfessional.background ? ` I've especially noticed ${data.targetProfessional.background}.` : ""} ${data.studentProfile.interests ? `I'm interested in ${data.studentProfile.interests}` : "I'm exploring this field"} and would love any advice you might have!

What skills or trends should someone like me be focusing on?

Thanks so much!
${data.studentProfile.name}`,

      concise: (data) => `Hi ${data.targetProfessional.name}!

I'm ${data.studentProfile.name}, a ${data.studentProfile.major} ${data.studentProfile.year || "student"} curious about ${data.targetProfessional.industry || "your field"}. Any quick tips for someone starting out?

Thanks!
${data.studentProfile.name}`,

      detailed: (data) => `Hi ${data.targetProfessional.name}!

Hope I'm not catching you at a busy time! I'm ${data.studentProfile.name}, a ${data.studentProfile.year || "student"} at ${data.studentProfile.university} studying ${data.studentProfile.major}. ${data.targetProfessional.connection ? `I found your profile while ${data.targetProfessional.connection}, and ` : ""}I'm on a mission to learn as much as I can about ${data.targetProfessional.industry || "your field"}!

Your experience as ${data.targetProfessional.title} at ${data.targetProfessional.company} makes you one of the best people to learn from.${data.targetProfessional.background ? ` I've been especially curious about ${data.targetProfessional.background}!` : ""} ${data.studentProfile.skills ? `I've been working on ${data.studentProfile.skills}` : "I've been building my skills"}${data.studentProfile.experience ? ` through ${data.studentProfile.experience}` : ""}.

${data.studentProfile.interests ? `I'm particularly interested in ${data.studentProfile.interests}, so ` : ""}I was hoping you might share:
- Skills that really make a difference in your work
- Trends you're most excited about
- "Do this, not that" advice for someone starting out

Even a super quick response would make my day! I know you're busy, so I really appreciate any wisdom you can share.

Thanks so much!
${data.studentProfile.name}
${data.studentProfile.linkedinUrl ? data.studentProfile.linkedinUrl : ""}`
    }
  }
};

// Add enthusiastic and humble variations
const addToneVariations = () => {
  Object.keys(templates).forEach(intent => {
    if (!templates[intent].enthusiastic) {
      templates[intent].enthusiastic = {};
      Object.keys(templates[intent].professional).forEach(length => {
        templates[intent].enthusiastic[length] = templates[intent].friendly[length] || templates[intent].professional[length];
      });
    }
    if (!templates[intent].humble) {
      templates[intent].humble = {};
      Object.keys(templates[intent].professional).forEach(length => {
        templates[intent].humble[length] = templates[intent].professional[length];
      });
    }
  });
};

addToneVariations();

export function generateMessage(formData) {
  // Preprocess to handle optional fields (name, title)
  const data = preprocessData(formData);
  const { intent, tone, length } = data;
  
  // Get the appropriate template
  const intentTemplates = templates[intent] || templates.networking;
  const toneTemplates = intentTemplates[tone] || intentTemplates.professional;
  const templateFn = toneTemplates[length] || toneTemplates.standard;
  
  if (typeof templateFn === 'function') {
    return templateFn(data);
  }
  
  // Fallback message
  return `Dear ${data.targetProfessional.name},

I am ${data.studentProfile.name}, a student at ${data.studentProfile.university}. I am reaching out to connect and learn from your experience at ${data.targetProfessional.company}.

Best regards,
${data.studentProfile.name}`;
}

// Check for suspicious profile patterns
function detectSuspiciousPatterns(formData) {
  const warnings = [];
  const profile = formData.studentProfile;
  
  // Check for generic/placeholder names
  const genericNames = ["test", "user", "name", "john doe", "jane doe", "asdf", "qwerty"];
  if (genericNames.some(n => profile.name?.toLowerCase().includes(n))) {
    warnings.push("Profile name appears to be a placeholder");
  }
  
  // Check for very short or repetitive content
  if (profile.skills?.trim().length < 10) {
    warnings.push("Skills section seems incomplete");
  }
  
  if (profile.experience?.trim().length < 20) {
    warnings.push("Experience section seems too brief for verification");
  }
  
  // Check for repetitive characters or spam patterns
  const spamPattern = /(.)\1{4,}/; // 5+ repeated characters
  if (spamPattern.test(profile.name) || spamPattern.test(profile.skills) || spamPattern.test(profile.experience)) {
    warnings.push("Content contains suspicious repetitive patterns");
  }
  
  // Validate LinkedIn URL format if provided (optional field)
  if (profile.linkedinUrl?.trim()) {
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|profile)\/[\w-]+\/?$/i;
    if (!linkedinPattern.test(profile.linkedinUrl.trim())) {
      warnings.push("LinkedIn URL format is invalid");
    }
  }
  
  return warnings;
}

export function validateFormData(formData) {
  const errors = [];
  
  // Required fields validation - Student Profile
  if (!formData.studentProfile.name?.trim()) {
    errors.push("Please enter your name");
  }
  if (!formData.studentProfile.email?.trim()) {
    errors.push("Please enter your email");
  }
  if (!formData.studentProfile.university?.trim()) {
    errors.push("Please enter your university");
  }
  if (!formData.studentProfile.major?.trim()) {
    errors.push("Please enter your major/field");
  }
  if (!formData.studentProfile.skills?.trim()) {
    errors.push("Please enter your skills");
  }
  if (!formData.studentProfile.experience?.trim()) {
    errors.push("Please enter your experience");
  }
  // LinkedIn is optional - no validation required
  
  // Required fields validation - Target Professional (only company and industry required)
  // Name and title are optional - user may not know the specific person
  if (!formData.targetProfessional.company?.trim()) {
    errors.push("Please enter the company name");
  }
  if (!formData.targetProfessional.industry?.trim()) {
    errors.push("Please enter the industry");
  }
  if (!formData.intent) {
    errors.push("Please select an outreach intent");
  }
  
  // LinkedIn URL format validation (only if provided)
  const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|profile)\/[\w-]+\/?$/i;
  if (formData.studentProfile.linkedinUrl?.trim() && !linkedinPattern.test(formData.studentProfile.linkedinUrl.trim())) {
    errors.push("Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)");
  }
  
  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.studentProfile.email?.trim() && !emailPattern.test(formData.studentProfile.email.trim())) {
    errors.push("Please enter a valid email address");
  }
  
  return errors;
}

// Export for use in API to add warnings to response
export { detectSuspiciousPatterns };
