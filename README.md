# OutreachX - Professional Networking Outreach Optimizer

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 Problem Statement

Students currently use platforms like LinkedIn for cold outreach to seek mentorship and internships, but these messages are often either overly generic or inappropriately informal. This mismatch in communication style leads to extremely low response rates from industry professionals, effectively limiting a student's access to the "hidden" job market and vital professional guidance.

## 💡 Solution

**OutreachX** is a dedicated agent that transforms raw student profiles and intent into highly personalized, professional outreach templates that significantly increase engagement rates.

## ✨ Features

- **📝 Smart Profile Builder**: Capture key student information including skills, experience, and career interests
- **🎯 Target Professional Details**: Input information about the professional you want to reach
- **🎭 Multiple Intent Types**: Support for mentorship, internship inquiry, informational interviews, job referrals, networking, and industry advice
- **🎨 Customizable Tone**: Choose from Professional, Friendly Professional, Enthusiastic, or Humble & Curious tones
- **📏 Flexible Length**: Concise, Standard, or Detailed message options
- **⚡ Instant Generation**: Generate personalized messages in seconds
- **✏️ Edit & Customize**: Edit generated messages before sending
- **📋 One-Click Copy**: Copy messages to clipboard instantly
- **🔄 Regenerate**: Not happy? Regenerate with one click
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🌙 Dark Mode**: Automatic dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/outreach-optimizer.git
cd outreach-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS
- **Language**: JavaScript (ES6+)
- **State Management**: React useState
- **API Routes**: Next.js API Routes

## 📁 Project Structure

```
outreach-optimizer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.js          # API route for message generation
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Main application page
│   ├── components/
│   │   ├── GeneratedMessage.js       # Message display & actions
│   │   ├── Header.js                 # App header
│   │   ├── IntentSelector.js         # Outreach intent selection
│   │   ├── StudentProfileForm.js     # Student profile form
│   │   ├── TargetProfessionalForm.js # Target professional form
│   │   └── ToneSelector.js           # Tone & length selection
│   └── lib/
│       └── messageGenerator.js       # Message generation logic
├── public/
├── package.json
└── README.md
```

## 🎮 How to Use

### Step 1: Enter Your Profile
Fill in your details including:
- Full name
- University/College
- Major/Field of Study
- Year of Study
- Key Skills
- Relevant Experience/Projects
- Career Interests

### Step 2: Add Target Professional Details
Enter information about the professional you want to reach:
- Professional's Name
- Job Title
- Company
- Industry
- Their Background/Achievements
- Any Common Ground/Connections

### Step 3: Select Intent & Style
Choose:
- **Intent**: Mentorship, Internship, Informational Interview, Referral, Networking, or Industry Advice
- **Tone**: Professional, Friendly Professional, Enthusiastic, or Humble & Curious
- **Length**: Concise, Standard, or Detailed

### Step 4: Generate & Send
Click "Generate Message" to create your personalized outreach. Edit if needed, then copy and paste into LinkedIn or email!

## 🎨 Message Types Supported

| Intent | Description |
|--------|-------------|
| 🎓 Mentorship | Seeking guidance and career advice |
| 💼 Internship Inquiry | Exploring internship opportunities |
| 💬 Informational Interview | Learning about their career path |
| 👥 Job Referral | Requesting a job referral |
| 🔗 General Networking | Building professional connections |
| 💡 Industry Advice | Getting specific industry insights |

## 🔧 Customization

### Adding New Intents
Edit `src/lib/messageGenerator.js` to add new intent templates:

```javascript
const templates = {
  yourNewIntent: {
    professional: {
      concise: (data) => `Your template here...`,
      standard: (data) => `Your template here...`,
      detailed: (data) => `Your template here...`,
    },
    friendly: {
      // ...
    }
  }
};
```

### Extending with AI
To integrate with OpenAI or other AI services, update `src/app/api/generate/route.js`:

```javascript
// Add your AI API integration here
const response = await openai.chat.completions.create({
  // ...
});
```

## 📈 Why It Works

1. **Personalization**: Uses specific details about both the student and the professional
2. **Professional Tone**: Avoids informal language while staying approachable
3. **Clear Structure**: Each message has a clear introduction, body, and call-to-action
4. **Respectful of Time**: Messages acknowledge the professional's busy schedule
5. **Specific Ask**: Each message includes a concrete, achievable request

## 🏆 Hackathon Submission

This project was built to address the problem of ineffective cold outreach by students seeking mentorship and career opportunities.

### Key Achievements
- ✅ Full-stack application with modern tech stack
- ✅ Professional UI with responsive design
- ✅ Multiple message templates for various scenarios
- ✅ Intelligent message personalization
- ✅ User-friendly multi-step form

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for better professional networking**
