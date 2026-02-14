"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardIllustration, { MessageSuccessIllustration } from "@/components/DashboardIllustration";

// Initial form data
const initialFormData = {
  studentProfile: {
    name: "",
    email: "",
    university: "",
    major: "",
    year: "",
    skills: "",
    experience: "",
    interests: "",
    linkedinUrl: "",
  },
  targetProfessional: {
    name: "",
    title: "",
    company: "",
    industry: "",
    background: "",
    linkedinUrl: "",
  },
  intent: "",
  tone: "professional",
  length: "standard",
};

// Intent options
const intents = [
  { id: "mentorship", icon: "🎓", label: "Mentorship", desc: "Seek guidance and advice" },
  { id: "internship", icon: "💼", label: "Internship", desc: "Apply for internship opportunities" },
  { id: "informational", icon: "💡", label: "Info Interview", desc: "Learn about their career path" },
  { id: "referral", icon: "🤝", label: "Referral", desc: "Request job referral" },
  { id: "networking", icon: "🌐", label: "Networking", desc: "Build professional connection" },
  { id: "advice", icon: "📚", label: "Career Advice", desc: "Get industry insights" },
];

// Tone options
const tones = [
  { id: "professional", label: "Professional", icon: "👔" },
  { id: "friendly", label: "Friendly", icon: "😊" },
  { id: "enthusiastic", label: "Enthusiastic", icon: "🔥" },
  { id: "humble", label: "Humble", icon: "🙏" },
];

// Step progress component
function StepProgress({ currentStep, steps }) {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <motion.div
            animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium transition-all ${
              currentStep >= step.id
                ? theme === "dark"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-sky-400 text-white"
                : theme === "dark"
                  ? "bg-white/10 text-gray-500"
                  : "bg-blue-50 text-gray-400"
            }`}
          >
            {currentStep > step.id ? "✓" : step.icon}
          </motion.div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 transition-all ${
                currentStep > step.id 
                  ? theme === "dark" ? "bg-indigo-500" : "bg-blue-500"
                  : theme === "dark" ? "bg-white/10" : "bg-blue-100"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Input field component
function InputField({ label, type = "text", value, onChange, placeholder, textarea, required }) {
  const { theme } = useTheme();
  const Component = textarea ? "textarea" : "input";
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      }`}>
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <Component
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={textarea ? 3 : undefined}
        className={`w-full px-4 py-3 rounded-xl resize-none outline-none transition-all ${
          theme === "dark"
            ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            : "bg-blue-50/50 border border-blue-100 text-gray-800 placeholder-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
        }`}
      />
    </div>
  );
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  // Email verification state
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [demoCode, setDemoCode] = useState(""); // For demo purposes

  // New features state
  const [messageHistory, setMessageHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [variantB, setVariantB] = useState("");
  const [showVariants, setShowVariants] = useState(false);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [analytics, setAnalytics] = useState({ generated: 0, copied: 0, refined: 0 });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("outreachx_formData");
      const savedStep = localStorage.getItem("outreachx_currentStep");
      const savedEmailVerified = localStorage.getItem("outreachx_emailVerified");
      const savedHistory = localStorage.getItem("outreachx_messageHistory");
      const savedAnalytics = localStorage.getItem("outreachx_analytics");
      
      if (savedFormData) {
        try {
          setFormData(JSON.parse(savedFormData));
        } catch (e) {
          console.error("Error loading saved form data:", e);
        }
      }
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
      if (savedEmailVerified === "true") {
        setEmailVerified(true);
      }
      if (savedHistory) {
        try {
          setMessageHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Error loading message history:", e);
        }
      }
      if (savedAnalytics) {
        try {
          setAnalytics(JSON.parse(savedAnalytics));
        } catch (e) {
          console.error("Error loading analytics:", e);
        }
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("outreachx_formData", JSON.stringify(formData));
    }
  }, [formData]);

  // Save current step to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("outreachx_currentStep", currentStep.toString());
    }
  }, [currentStep]);

  // Save email verified status
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("outreachx_emailVerified", emailVerified.toString());
    }
  }, [emailVerified]);

  // Save message to history
  const saveToHistory = (message, type = "initial") => {
    const historyItem = {
      id: Date.now(),
      message,
      type, // initial, follow-up, variant
      intent: formData.intent,
      company: formData.targetProfessional.company,
      timestamp: new Date().toISOString(),
    };
    const newHistory = [historyItem, ...messageHistory].slice(0, 20); // Keep last 20
    setMessageHistory(newHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("outreachx_messageHistory", JSON.stringify(newHistory));
    }
  };

  // Update analytics
  const trackAnalytics = (action) => {
    const newAnalytics = { ...analytics, [action]: analytics[action] + 1 };
    setAnalytics(newAnalytics);
    if (typeof window !== "undefined") {
      localStorage.setItem("outreachx_analytics", JSON.stringify(newAnalytics));
    }
  };

  // Import LinkedIn profile data (simulated - extracts from URL)
  const importLinkedInProfile = async (url, type = "student") => {
    if (!url.trim()) {
      toast.error("Please enter a LinkedIn URL");
      return;
    }
    
    // Extract username from LinkedIn URL
    const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/i);
    if (!match) {
      toast.error("Invalid LinkedIn URL format");
      return;
    }
    
    const username = match[1].replace(/-/g, " ");
    const capitalizedName = username.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    
    if (type === "student") {
      updateProfile("name", capitalizedName);
      updateProfile("linkedinUrl", url);
      toast.success(`Imported: ${capitalizedName}`);
    } else {
      updateTarget("name", capitalizedName);
      updateTarget("linkedinUrl", url);
      toast.success(`Imported: ${capitalizedName}`);
    }
  };

  // Generate A/B variants
  const generateVariants = async () => {
    const allErrors = [
      ...validateStep1(),
      ...validateStep2(),
      ...validateStep3(),
    ];

    if (allErrors.length > 0) {
      allErrors.forEach(err => toast.error(err));
      return;
    }

    setIsLoading(true);
    setShowVariants(true);

    try {
      // Generate two variants with different approaches
      const [responseA, responseB] = await Promise.all([
        fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, variant: "A" }),
        }),
        fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, tone: formData.tone === "professional" ? "friendly" : "professional", variant: "B" }),
        }),
      ]);

      const [dataA, dataB] = await Promise.all([responseA.json(), responseB.json()]);

      if (dataA.success && dataB.success) {
        setGeneratedMessage(dataA.message);
        setVariantB(dataB.message);
        saveToHistory(dataA.message, "variant-A");
        saveToHistory(dataB.message, "variant-B");
        trackAnalytics("generated");
        trackAnalytics("generated");
        toast.success("A/B variants generated!");
      } else {
        toast.error("Failed to generate variants");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate variants");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate follow-up message
  const generateFollowUp = async () => {
    if (!generatedMessage) {
      toast.error("Generate an initial message first");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isFollowUp: true,
          previousMessage: generatedMessage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedMessage(data.message);
        setIsFollowUp(true);
        saveToHistory(data.message, "follow-up");
        trackAnalytics("generated");
        toast.success("Follow-up message generated!");
      } else {
        toast.error("Failed to generate follow-up");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate follow-up");
    } finally {
      setIsLoading(false);
    }
  };

  // Load message from history
  const loadFromHistory = (item) => {
    setGeneratedMessage(item.message);
    setShowHistory(false);
    toast.success("Message loaded from history");
  };

  // Clear history
  const clearHistory = () => {
    setMessageHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("outreachx_messageHistory");
    }
    toast.success("History cleared");
  };

  const steps = [
    { id: 1, icon: "👤", label: "Your Profile" },
    { id: 2, icon: "🎯", label: "Target" },
    { id: 3, icon: "✨", label: "Style" },
  ];

  const updateProfile = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      studentProfile: { ...prev.studentProfile, [field]: value },
    }));
    // Reset verification if email changes
    if (field === "email") {
      setEmailVerified(false);
      setVerificationSent(false);
      setVerificationCode("");
      setDemoCode("");
    }
  };

  const updateTarget = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      targetProfessional: { ...prev.targetProfessional, [field]: value },
    }));
  };

  // Helper: Validate LinkedIn URL
  const isValidLinkedInUrl = (url) => {
    if (!url.trim()) return false;
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|profile)\/[\w-]+\/?$/i;
    return linkedinPattern.test(url.trim());
  };

  // Helper: Validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  };

  // Send verification code to email
  const sendVerificationCode = async () => {
    if (!isValidEmail(formData.studentProfile.email)) {
      toast.error("Please enter a valid email address first");
      return;
    }
    
    setVerificationLoading(true);
    
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.studentProfile.email,
          action: "send"
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVerificationSent(true);
        toast.success("Verification code sent!");
        // In development, show the demo code
        if (data._demoCode) {
          setDemoCode(data._demoCode);
        }
      } else {
        toast.error(data.error || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  };

  // Verify the code entered by user
  const verifyCode = async () => {
    if (!verificationCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }
    
    setVerificationLoading(true);
    
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.studentProfile.email,
          code: verificationCode,
          action: "verify"
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEmailVerified(true);
        toast.success("Email verified successfully!");
      } else {
        toast.error(data.error || "Invalid verification code");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  };

  // Validation for Step 1 - Student Profile
  const validateStep1 = () => {
    const stepErrors = [];
    if (!formData.studentProfile.name.trim()) stepErrors.push("Your name is required");
    if (!formData.studentProfile.email.trim()) {
      stepErrors.push("Email is required");
    } else if (!isValidEmail(formData.studentProfile.email)) {
      stepErrors.push("Please enter a valid email address");
    } else if (!emailVerified) {
      stepErrors.push("Please verify your email address");
    }
    if (!formData.studentProfile.university.trim()) stepErrors.push("University/College is required");
    if (!formData.studentProfile.major.trim()) stepErrors.push("Major/Field of study is required");
    if (!formData.studentProfile.skills.trim()) stepErrors.push("Key skills are required");
    if (!formData.studentProfile.experience.trim()) stepErrors.push("Relevant experience is required");
    // LinkedIn is optional, but validate format if provided
    if (formData.studentProfile.linkedinUrl.trim() && !isValidLinkedInUrl(formData.studentProfile.linkedinUrl)) {
      stepErrors.push("Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)");
    }
    return stepErrors;
  };

  // Validation for Step 2 - Target Professional
  const validateStep2 = () => {
    const stepErrors = [];
    // Name and title are optional - user might not know the specific person
    if (!formData.targetProfessional.company.trim()) stepErrors.push("Company is required");
    if (!formData.targetProfessional.industry.trim()) stepErrors.push("Industry is required");
    if (formData.targetProfessional.linkedinUrl.trim() && !isValidLinkedInUrl(formData.targetProfessional.linkedinUrl)) {
      stepErrors.push("Please enter a valid LinkedIn URL for the professional");
    }
    return stepErrors;
  };

  // Validation for Step 3 - Intent
  const validateStep3 = () => {
    const stepErrors = [];
    if (!formData.intent) stepErrors.push("Please select an outreach intent");
    return stepErrors;
  };

  // Navigate to next step with validation
  const goToStep = (step) => {
    let stepErrors = [];
    
    if (step === 2) {
      stepErrors = validateStep1();
    } else if (step === 3) {
      stepErrors = validateStep2();
    }
    
    if (stepErrors.length > 0) {
      stepErrors.forEach(err => toast.error(err));
      return;
    }
    
    setCurrentStep(step);
  };

  const handleGenerate = async () => {
    // Validate all steps before generating
    const allErrors = [
      ...validateStep1(),
      ...validateStep2(),
      ...validateStep3(),
    ];

    if (allErrors.length > 0) {
      allErrors.forEach(err => toast.error(err));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedMessage(data.message);
        setVariantB(""); // Clear variant B
        setShowVariants(false);
        setIsFollowUp(false);
        saveToHistory(data.message, "initial");
        trackAnalytics("generated");
        toast.success("Message generated!");
        // Set warnings if any suspicious patterns detected
        if (data.warnings && data.warnings.length > 0) {
          setWarnings(data.warnings);
        } else {
          setWarnings([]);
        }
      } else if (data.errors) {
        data.errors.forEach(err => toast.error(err));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    trackAnalytics("copied");
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear all form data and start fresh
  const clearForm = () => {
    setFormData(initialFormData);
    setGeneratedMessage("");
    setVariantB("");
    setShowVariants(false);
    setIsFollowUp(false);
    setCurrentStep(1);
    setWarnings([]);
    setEmailVerified(false);
    setVerificationSent(false);
    setVerificationCode("");
    setDemoCode("");
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("outreachx_formData");
      localStorage.removeItem("outreachx_currentStep");
      localStorage.removeItem("outreachx_emailVerified");
    }
    toast.success("Form cleared!");
  };

  // Refine the generated message based on quick refinement option
  const refineMessage = async (refinementType) => {
    if (!generatedMessage) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: generatedMessage,
          refinementType,
          formData,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedMessage(data.message);
        trackAnalytics("refined");
        toast.success("Message refined!");
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error refining message:", error);
      toast.error("Failed to refine message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark"
        ? "bg-[#0a0a0f] text-white"
        : "bg-gradient-to-br from-blue-50 via-white to-sky-50 text-gray-800"
    }`}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === "dark" ? "bg-indigo-600/10" : "bg-blue-400/10"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${
          theme === "dark" ? "bg-purple-600/10" : "bg-sky-400/10"
        }`} />
      </div>
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        theme === "dark"
          ? "bg-black/50 border-white/10"
          : "bg-white/70 border-blue-100"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                : "bg-gradient-to-br from-blue-500 to-sky-400"
            }`}>
              <span className="text-xl">✉️</span>
            </div>
            <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Outreach<span className={theme === "dark" ? "text-indigo-400" : "text-blue-500"}>X</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Settings menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowUserMenu(false);
                }}
                className={`transition-colors ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              {showSettingsMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border z-50 overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-900 border-white/10"
                      : "bg-white border-blue-100"
                  }`}
                >
                  <div className={`px-4 py-3 border-b ${theme === "dark" ? "border-white/10" : "border-blue-100"}`}>
                    <p className={`text-xs font-medium uppercase tracking-wider ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      Settings
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between transition-colors ${
                      theme === "dark"
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {theme === "dark" ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      Theme
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${theme === "dark" ? "bg-white/10" : "bg-blue-100"}`}>
                      {theme === "dark" ? "Dark" : "Light"}
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
            {/* User menu with logout */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowSettingsMenu(false);
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-500 to-sky-400"
                }`}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border z-50 overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-900 border-white/10"
                      : "bg-white border-blue-100"
                  }`}
                >
                  <div className={`px-4 py-3 border-b ${theme === "dark" ? "border-white/10" : "border-blue-100"}`}>
                    <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                      {user?.name || "User"}
                    </p>
                    <p className={`text-xs truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} title={user?.email || ""}>
                      {user?.email || ""}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition-colors ${
                      theme === "dark"
                        ? "text-red-400 hover:bg-white/5"
                        : "text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl p-8 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white/80 border border-blue-100 backdrop-blur-xl shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>Create Your Message</h1>
                  <p className={`mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>Fill in the details to generate a personalized outreach</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearForm}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    theme === "dark"
                      ? "bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50"
                      : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300"
                  }`}
                  title="Clear all form data"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear
                </motion.button>
              </div>

              <StepProgress currentStep={currentStep} steps={steps} />

              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <InputField
                      label="Your Name"
                      value={formData.studentProfile.name}
                      onChange={(e) => updateProfile("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                    
                    {/* Email with Verification */}
                    <div className="space-y-3">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <InputField
                            label="Email"
                            type="email"
                            value={formData.studentProfile.email}
                            onChange={(e) => updateProfile("email", e.target.value)}
                            placeholder="you@email.com"
                            required
                            disabled={emailVerified}
                          />
                        </div>
                        {!emailVerified && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={sendVerificationCode}
                            disabled={verificationLoading || !isValidEmail(formData.studentProfile.email)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              verificationLoading || !isValidEmail(formData.studentProfile.email)
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
                            }`}
                          >
                            {verificationLoading ? "Sending..." : verificationSent ? "Resend" : "Verify"}
                          </motion.button>
                        )}
                        {emailVerified && (
                          <div className="flex items-center gap-1 px-3 py-2.5 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
                            <span>✓</span> Verified
                          </div>
                        )}
                      </div>
                      
                      {/* Verification Code Input */}
                      {verificationSent && !emailVerified && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                              className={`flex-1 px-4 py-2.5 rounded-xl border-2 text-center text-lg tracking-widest font-mono ${
                                theme === "dark"
                                  ? "bg-gray-800 border-gray-700 text-white"
                                  : "bg-white border-gray-200 text-gray-900"
                              } focus:border-blue-500 focus:outline-none transition-colors`}
                            />
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={verifyCode}
                              disabled={verificationLoading || verificationCode.length !== 6}
                              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                                verificationLoading || verificationCode.length !== 6
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {verificationLoading ? "..." : "Verify"}
                            </motion.button>
                          </div>
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            📧 Check your email for the verification code
                          </p>
                          {demoCode && (
                            <p className="text-xs text-blue-500 bg-blue-50 px-3 py-2 rounded-lg">
                              🔧 Demo mode: Your code is <span className="font-mono font-bold">{demoCode}</span>
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>
                    
                    <InputField
                      label="University"
                      value={formData.studentProfile.university}
                      onChange={(e) => updateProfile("university", e.target.value)}
                      placeholder="Your university name"
                      required
                    />
                    <InputField
                      label="Major / Field"
                      value={formData.studentProfile.major}
                      onChange={(e) => updateProfile("major", e.target.value)}
                      placeholder="Your field of study"
                      required
                    />
                    <InputField
                      label="Key Skills"
                      value={formData.studentProfile.skills}
                      onChange={(e) => updateProfile("skills", e.target.value)}
                      placeholder="Your technical and soft skills"
                      required
                    />
                    <InputField
                      label="Relevant Experience"
                      value={formData.studentProfile.experience}
                      onChange={(e) => updateProfile("experience", e.target.value)}
                      placeholder="Internships, projects, achievements..."
                      textarea
                      required
                    />
                    <div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <InputField
                            label="LinkedIn Profile URL (optional)"
                            type="url"
                            value={formData.studentProfile.linkedinUrl}
                            onChange={(e) => updateProfile("linkedinUrl", e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => importLinkedInProfile(formData.studentProfile.linkedinUrl, "student")}
                          disabled={!formData.studentProfile.linkedinUrl.trim()}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            formData.studentProfile.linkedinUrl.trim()
                              ? theme === "dark"
                                ? "bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                                : "bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
                              : "opacity-50 cursor-not-allowed " + (theme === "dark" ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400")
                          }`}
                          title="Extract name from LinkedIn URL"
                        >
                          Import
                        </motion.button>
                      </div>
                      <p className={`text-xs mt-1.5 flex items-center gap-1 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}>
                        <span>💡</span> Paste URL and click Import to extract name
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => goToStep(2)}
                      className="w-full btn-primary py-3.5 rounded-xl font-semibold"
                    >
                      Continue to Target
                    </motion.button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <InputField
                      label="Professional's Name (optional)"
                      value={formData.targetProfessional.name}
                      onChange={(e) => updateTarget("name", e.target.value)}
                      placeholder="Leave blank if unknown"
                    />
                    <InputField
                      label="Job Title (optional)"
                      value={formData.targetProfessional.title}
                      onChange={(e) => updateTarget("title", e.target.value)}
                      placeholder="e.g., Hiring Manager, Recruiter"
                    />
                    <InputField
                      label="Company"
                      value={formData.targetProfessional.company}
                      onChange={(e) => updateTarget("company", e.target.value)}
                      placeholder="Company they work at"
                      required
                    />
                    <InputField
                      label="Industry"
                      value={formData.targetProfessional.industry}
                      onChange={(e) => updateTarget("industry", e.target.value)}
                      placeholder="e.g., Technology, Finance, Healthcare, Consulting"
                      required
                    />
                    <InputField
                      label="Background / Notes"
                      value={formData.targetProfessional.background}
                      onChange={(e) => updateTarget("background", e.target.value)}
                      placeholder="Any relevant info about them..."
                      textarea
                    />
                    <div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <InputField
                            label="LinkedIn Profile URL (optional)"
                            type="url"
                            value={formData.targetProfessional.linkedinUrl}
                            onChange={(e) => updateTarget("linkedinUrl", e.target.value)}
                            placeholder="https://linkedin.com/in/theirprofile"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => importLinkedInProfile(formData.targetProfessional.linkedinUrl, "professional")}
                          disabled={!formData.targetProfessional.linkedinUrl.trim()}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            formData.targetProfessional.linkedinUrl.trim()
                              ? theme === "dark"
                                ? "bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                                : "bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
                              : "opacity-50 cursor-not-allowed " + (theme === "dark" ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400")
                          }`}
                          title="Extract name from LinkedIn URL"
                        >
                          Import
                        </motion.button>
                      </div>
                      <p className={`text-xs mt-1.5 flex items-center gap-1 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}>
                        <span>💡</span> Paste URL and click Import to extract name
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 btn-secondary py-3 rounded-xl font-medium"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => goToStep(3)}
                        className="flex-1 btn-primary py-3 rounded-xl font-semibold"
                      >
                        Continue
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Intent Selection */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}>
                        Outreach Intent
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {intents.map((intent) => (
                          <motion.button
                            key={intent.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, intent: intent.id })}
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.intent === intent.id
                                ? theme === "dark"
                                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border-2 border-indigo-500"
                                  : "bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-400"
                                : theme === "dark"
                                  ? "bg-white/5 border border-white/10 hover:border-indigo-500/50"
                                  : "bg-white/60 border border-blue-100 hover:border-blue-300"
                            }`}
                          >
                            <span className="text-2xl mb-2 block">{intent.icon}</span>
                            <span className={`font-medium block ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}>{intent.label}</span>
                            <span className={`text-xs ${
                              theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}>{intent.desc}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Tone Selection */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}>
                        Message Tone
                      </label>
                      <div className="flex gap-3">
                        {tones.map((tone) => (
                          <motion.button
                            key={tone.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, tone: tone.id })}
                            className={`flex-1 py-3 rounded-xl text-center transition-all ${
                              formData.tone === tone.id
                                ? theme === "dark"
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-sky-400 text-white"
                                : theme === "dark"
                                  ? "bg-white/5 border border-white/10 text-gray-300"
                                  : "bg-white/60 border border-blue-100 text-gray-600"
                            }`}
                          >
                            <span className="block text-lg mb-1">{tone.icon}</span>
                            <span className="text-sm">{tone.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 btn-secondary py-3 rounded-xl font-medium"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="flex-1 btn-primary py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <span>✨</span> Generate Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right column - Generated Message */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-3xl p-8 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white/80 border border-blue-100 backdrop-blur-xl shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>Generated Message</h2>
                {generatedMessage && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                      theme === "dark"
                        ? "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                    }`}
                  >
                    {copied ? (
                      <>
                        <span>✓</span> Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {generatedMessage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Verification warnings */}
                  {warnings.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border ${
                        theme === "dark"
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">⚠️</span>
                        <div>
                          <p className={`font-medium text-sm ${
                            theme === "dark" ? "text-yellow-300" : "text-amber-700"
                          }`}>
                            Profile Verification Notice
                          </p>
                          <ul className={`mt-2 text-sm space-y-1 ${
                            theme === "dark" ? "text-yellow-200/80" : "text-amber-600"
                          }`}>
                            {warnings.map((warning, i) => (
                              <li key={i}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className={`p-6 rounded-2xl border ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-indigo-500/20"
                      : "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200"
                  }`}>
                    <p className={`whitespace-pre-wrap leading-relaxed ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}>
                      {generatedMessage}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="flex-1 btn-secondary py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Regenerate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateFollowUp}
                      disabled={isLoading}
                      className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                          : "bg-purple-50 border border-purple-200 text-purple-600 hover:bg-purple-100"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Follow-up
                    </motion.button>
                  </div>

                  {/* A/B Variants Button */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateVariants}
                      disabled={isLoading}
                      className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30"
                          : "bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      Generate A/B Variants
                    </motion.button>
                  </div>

                  {/* A/B Variants Display */}
                  {showVariants && variantB && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <p className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}>Variant B (alternative tone):</p>
                      <div className={`p-4 rounded-xl border ${
                        theme === "dark"
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-emerald-50 border-emerald-200"
                      }`}>
                        <p className={`whitespace-pre-wrap text-sm leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {variantB}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            navigator.clipboard.writeText(variantB);
                            trackAnalytics("copied");
                            toast.success("Variant B copied!");
                          }}
                          className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-medium ${
                            theme === "dark"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          Copy Variant B
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Follow-up indicator */}
                  {isFollowUp && (
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === "dark" ? "text-purple-300" : "text-purple-600"
                    }`}>
                      <span>📨</span> This is a follow-up message
                    </div>
                  )}

                  {/* Quick refinement options */}
                  <div>
                    <p className={`text-sm mb-3 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>Quick refinements:</p>
                    <div className="flex flex-wrap gap-2">
                      {["More empathy", "Shorter", "More formal", "Add specifics"].map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => refineMessage(option)}
                          disabled={isLoading}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            isLoading 
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } ${
                            theme === "dark"
                              ? "bg-white/5 border border-white/10 text-gray-300 hover:border-indigo-500 hover:text-indigo-300"
                              : "bg-white/80 border border-blue-100 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <DashboardIllustration size="sm" />
                  <h3 className={`text-lg font-medium mb-2 mt-4 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}>No message yet</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Fill in the form and click generate to create your personalized outreach message
                  </p>
                </div>
              )}
            </motion.div>

            {/* Tips card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-3xl p-6 mt-6 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white/80 border border-blue-100 backdrop-blur-xl shadow-lg"
              }`}
            >
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                <span>💡</span> Pro Tips for {formData.intent ? intents.find(i => i.id === formData.intent)?.label || "Outreach" : "Outreach"}
              </h3>
              <ul className={`space-y-3 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {formData.intent === "mentorship" ? (
                  <>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Show you&apos;ve researched their career path</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Be specific about what you want to learn</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Offer to work around their schedule</li>
                  </>
                ) : formData.intent === "internship" ? (
                  <>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Highlight relevant skills and projects</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Show enthusiasm for the company&apos;s mission</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Mention specific teams or projects that interest you</li>
                  </>
                ) : formData.intent === "referral" ? (
                  <>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Have a specific role in mind</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Explain why you&apos;re a good fit briefly</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Make it easy with your resume link</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Research your target&apos;s recent posts or achievements</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Keep your ask specific (e.g., &quot;15-min call&quot; not &quot;chat sometime&quot;)</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Mention mutual connections or shared interests</li>
                  </>
                )}
              </ul>
            </motion.div>

            {/* Analytics card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-3xl p-6 mt-6 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white/80 border border-blue-100 backdrop-blur-xl shadow-lg"
              }`}
            >
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                <span>📊</span> Your Stats
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className={`text-center p-3 rounded-xl ${
                  theme === "dark" ? "bg-white/5" : "bg-blue-50"
                }`}>
                  <p className={`text-2xl font-bold ${
                    theme === "dark" ? "text-indigo-400" : "text-blue-500"
                  }`}>{analytics.generated}</p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>Generated</p>
                </div>
                <div className={`text-center p-3 rounded-xl ${
                  theme === "dark" ? "bg-white/5" : "bg-blue-50"
                }`}>
                  <p className={`text-2xl font-bold ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`}>{analytics.copied}</p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>Copied</p>
                </div>
                <div className={`text-center p-3 rounded-xl ${
                  theme === "dark" ? "bg-white/5" : "bg-blue-50"
                }`}>
                  <p className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-400" : "text-purple-500"
                  }`}>{analytics.refined}</p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>Refined</p>
                </div>
              </div>
            </motion.div>

            {/* Message History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-3xl p-6 mt-6 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white/80 border border-blue-100 backdrop-blur-xl shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold flex items-center gap-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  <span>📜</span> Message History
                </h3>
                {messageHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    Clear
                  </button>
                )}
              </div>
              {messageHistory.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {messageHistory.slice(0, 5).map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => loadFromHistory(item)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-white/10 border border-white/5"
                          : "bg-gray-50 hover:bg-blue-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.type === "follow-up"
                            ? theme === "dark" ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-600"
                            : item.type.includes("variant")
                              ? theme === "dark" ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-600"
                              : theme === "dark" ? "bg-indigo-500/20 text-indigo-300" : "bg-blue-100 text-blue-600"
                        }`}>
                          {item.type === "follow-up" ? "Follow-up" : item.type.includes("variant") ? item.type : "Initial"}
                        </span>
                        <span className={`text-xs ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-xs line-clamp-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {item.message.substring(0, 100)}...
                      </p>
                      {item.company && (
                        <p className={`text-xs mt-1 ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                          → {item.company}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-2xl mb-2 ${
                    theme === "dark" ? "bg-white/5" : "bg-blue-50"
                  }`}>
                    📭
                  </div>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    No messages yet. Generate your first outreach!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
