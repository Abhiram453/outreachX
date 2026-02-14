"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SignupIllustration from "@/components/SignupIllustration";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

// Animated background orbs
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-sky-400/20"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl bg-blue-400/20"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full blur-3xl bg-indigo-300/15"
      />
    </div>
  );
}

// Floating icons component
function FloatingIcons() {
  const icons = ["🎯", "💡", "🤝", "⭐"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [-20, -40, -20],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: 5 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-3xl hidden lg:block"
          style={{
            right: `${5 + i * 8}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const { theme } = useTheme();
  const { signup, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setSocialLoading("google");
    setError("");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setSocialLoading("");
    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    
    if (!hasMinLength) return "Password must be at least 8 characters";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    return null;
  };

  const handleContinue = () => {
    setError("");
    
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      handleContinue();
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signup(formData.name, formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white"
        : "bg-gradient-to-br from-sky-50 via-white to-blue-50 text-gray-800"
    }`}>
      <BackgroundOrbs />
      <FloatingIcons />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>

      {/* Header */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl border-b shadow-sm ${
          theme === "dark"
            ? "bg-gray-900/80 border-white/10"
            : "bg-white/80 border-blue-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                  : "bg-gradient-to-br from-blue-500 to-sky-400"
              }`}
            >
              <span className="text-xl">✉️</span>
            </motion.div>
            <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Outreach<span className={theme === "dark" ? "text-indigo-400" : "text-blue-500"}>X</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className={`transition-colors hidden sm:block ${
              theme === "dark" ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-blue-600"
            }`}>
              Sign In
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              {/* Signup Card */}
              <div className={`rounded-3xl p-8 backdrop-blur-xl border transition-colors duration-300 shadow-xl ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 shadow-indigo-500/5"
                  : "bg-white/80 border-blue-100 shadow-blue-500/10"
              }`}>
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : "bg-gradient-to-br from-blue-500 to-sky-400"
                    }`}
                  >
                    <span className="text-3xl">🚀</span>
                  </motion.div>
                  <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Create Account</h1>
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Start your networking journey today</p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2].map((s) => (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step >= s
                            ? theme === "dark"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "bg-gradient-to-r from-blue-500 to-sky-400 text-white"
                            : theme === "dark"
                              ? "bg-white/5 text-gray-500 border border-white/10"
                              : "bg-blue-50 text-gray-400 border border-blue-100"
                        }`}
                      >
                        {step > s ? "✓" : s}
                      </div>
                      {s < 2 && (
                        <div className={`flex-1 h-0.5 ${
                          step > s 
                            ? theme === "dark" ? "bg-indigo-500" : "bg-blue-500" 
                            : theme === "dark" ? "bg-white/10" : "bg-blue-100"
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none ${
                            theme === "dark"
                              ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                              : "bg-white/50 border-blue-100 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          }`}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none ${
                            theme === "dark"
                              ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                              : "bg-white/50 border-blue-100 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          }`}
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <motion.button
                        type="button"
                        onClick={handleContinue}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3.5 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 text-white shadow-lg ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25"
                            : "bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 shadow-blue-500/25"
                        }`}
                      >
                        Continue
                        <span>→</span>
                      </motion.button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none ${
                            theme === "dark"
                              ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                              : "bg-white/50 border-blue-100 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          }`}
                          placeholder="••••••••"
                          required
                        />
                        <p className={`text-xs mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                          Min 8 chars, 1 uppercase, 1 number, 1 special character
                        </p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none ${
                            theme === "dark"
                              ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                              : "bg-white/50 border-blue-100 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          }`}
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          type="button"
                          onClick={() => setStep(1)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border ${
                            theme === "dark"
                              ? "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
                          }`}
                        >
                          <span>←</span>
                          Back
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 text-white shadow-lg ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25"
                              : "bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 shadow-blue-500/25"
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Creating...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className={`flex-1 h-px ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`}></div>
                  <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>or</span>
                  <div className={`flex-1 h-px ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`}></div>
                </div>

                {/* Google Sign-in Button */}
                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={socialLoading === "google"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-3 transition-colors shadow-sm ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  } ${socialLoading === "google" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {socialLoading === "google" ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continue with Google
                </motion.button>

                {/* Terms */}
                <p className={`text-xs text-center mt-6 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className={`hover:underline ${theme === "dark" ? "text-indigo-400" : "text-blue-500"}`}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className={`hover:underline ${theme === "dark" ? "text-indigo-400" : "text-blue-500"}`}>Privacy Policy</Link>
                </p>
              </div>

              {/* Login link */}
              <p className={`text-center mt-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Already have an account?{" "}
                <Link href="/login" className={`font-medium ${theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-blue-500 hover:text-blue-600"}`}>
                  Sign in
                </Link>
              </p>
            </motion.div>

            {/* Right side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "from-indigo-400 to-purple-500"
                    : "from-sky-500 to-blue-600"
                }`}>
                  Join Our Community
                </h2>
                <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Connect with professionals and amplify your networking success.
                </p>
              </div>
              <SignupIllustration />
              
              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "✨", text: "AI-Powered" },
                  { icon: "🎯", text: "Personalized" },
                  { icon: "⚡", text: "Instant Results" },
                  { icon: "🤝", text: "Network Growth" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10"
                        : "bg-white/60 border-blue-100"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}