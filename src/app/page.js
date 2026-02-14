"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NetworkingIllustration from "@/components/NetworkingIllustration";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

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
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-blue-400/20"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl bg-sky-400/20"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl bg-indigo-300/15"
      />
    </div>
  );
}

// Floating icons component
function FloatingIcons() {
  const icons = ["💼", "✉️", "🚀", "💡", "🤝", "⭐", "🎯", "📈"];
  
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
          className="absolute text-4xl"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
}

// Feature card component
function FeatureCard({ icon, title, description, delay, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`rounded-2xl p-6 cursor-pointer group transition-all backdrop-blur-xl shadow-lg ${
        theme === "dark"
          ? "bg-white/5 border border-white/10"
          : "bg-white/80 border border-blue-100"
      }`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${
        theme === "dark"
          ? "bg-gradient-to-br from-indigo-500 to-purple-600"
          : "bg-gradient-to-br from-blue-500 to-sky-400"
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white"
        : "bg-gradient-to-br from-blue-50 via-white to-sky-50 text-gray-800"
    }`}>
      <BackgroundOrbs />
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? theme === "dark"
              ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-sm py-4"
              : "bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm py-4"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`transition-colors ${theme === "dark" ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-blue-600"}`}>Features</a>
            <a href="#how-it-works" className={`transition-colors ${theme === "dark" ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-blue-600"}`}>How it Works</a>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <Link href="/dashboard" className={`transition-colors hidden sm:block ${theme === "dark" ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-blue-600"}`}>
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    theme === "dark"
                      ? "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                  }`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`transition-colors hidden sm:block ${theme === "dark" ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-blue-600"}`}>
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary px-5 py-2.5 rounded-xl font-medium text-sm"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <FloatingIcons />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Welcome to
                <br />
                <span className="gradient-text">OutreachX</span>
              </h1>
              
              <p className={`text-lg md:text-xl max-w-xl mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Transform cold outreach into meaningful professional connections. 
                Create personalized messages that get 3x more responses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/signup"
                    className={`px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 text-white ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                        : "bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500"
                    }`}
                  >
                    Generate Outreach Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#features"
                    className={`px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 border transition-colors ${
                      theme === "dark"
                        ? "border-white/20 text-gray-300 hover:bg-white/5"
                        : "border-blue-200 text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    Explore Features
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <NetworkingIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Everything You Need to
              <br />
              <span className="gradient-text">Network Like a Pro</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Powerful features designed to help you create meaningful connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤖"
              title="AI-Powered Generation"
              description="Our GPT-4 powered engine crafts personalized messages tailored to your target's background and interests."
              delay={0}
              theme={theme}
            />
            <FeatureCard
              icon="🎯"
              title="Multiple Intents"
              description="Whether you're seeking mentorship, internships, or referrals, we have templates for every purpose."
              delay={0.1}
              theme={theme}
            />
            <FeatureCard
              icon="✨"
              title="Tone Customization"
              description="Adjust the tone from professional to friendly, confident to humble - match your personality."
              delay={0.2}
              theme={theme}
            />
            <FeatureCard
              icon="⚡"
              title="Instant Refinement"
              description="Not quite right? Refine your message with one click - add empathy, make it shorter, or more specific."
              delay={0.3}
              theme={theme}
            />
            <FeatureCard
              icon="📊"
              title="Success Analytics"
              description="Track your outreach performance and optimize your messaging strategy over time."
              delay={0.4}
              theme={theme}
            />
            <FeatureCard
              icon="🔒"
              title="Privacy First"
              description="Your data stays yours. We never store or share your professional contacts."
              delay={0.5}
              theme={theme}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Three Simple Steps to
              <br />
              <span className="gradient-text">Perfect Outreach</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter Your Profile", desc: "Share your background, skills, and what makes you unique.", icon: "👤" },
              { step: "02", title: "Define Your Target", desc: "Tell us about the professional you want to connect with.", icon: "🎯" },
              { step: "03", title: "Get Your Message", desc: "Receive a personalized, ready-to-send outreach message.", icon: "✉️" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`rounded-2xl p-8 text-center h-full backdrop-blur-xl shadow-lg ${
                  theme === "dark"
                    ? "bg-white/5 border border-white/10"
                    : "bg-white/80 border border-blue-100"
                }`}>
                  <div className={`text-6xl font-bold absolute top-4 right-4 ${theme === "dark" ? "text-indigo-500/20" : "text-blue-500/20"}`}>
                    {item.step}
                  </div>
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                      : "bg-gradient-to-br from-blue-500 to-sky-400"
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{item.title}</h3>
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className={`hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r ${theme === "dark" ? "from-indigo-500" : "from-blue-500"} to-transparent`}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center relative overflow-hidden backdrop-blur-xl shadow-lg ${
              theme === "dark"
                ? "bg-white/5 border border-white/10"
                : "bg-white/80 border border-blue-100"
            }`}
          >
            <div className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-500/10 to-purple-600/10"
                : "bg-gradient-to-br from-blue-500/10 to-sky-400/10"
            }`}></div>
            <div className="relative z-10">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Ready to Transform Your
                <br />
                <span className="gradient-text">Networking?</span>
              </h2>
              <p className={`text-lg mb-8 max-w-xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Start crafting personalized outreach messages that help you land meetings, 
                mentors, and opportunities with OutreachX.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/signup"
                  className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2"
                >
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <p className={`text-sm mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>No credit card required • Free forever plan available</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${theme === "dark" ? "border-white/10" : "border-blue-100"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
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
            </div>
            <div className={`flex gap-8 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#" className={`transition-colors ${theme === "dark" ? "hover:text-indigo-400" : "hover:text-blue-600"}`}>Privacy</a>
              <a href="#" className={`transition-colors ${theme === "dark" ? "hover:text-indigo-400" : "hover:text-blue-600"}`}>Terms</a>
              <a href="#" className={`transition-colors ${theme === "dark" ? "hover:text-indigo-400" : "hover:text-blue-600"}`}>Contact</a>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>© 2026 OutreachX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}