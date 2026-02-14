"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-7 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 dark:from-indigo-900 dark:to-purple-900 border border-blue-200 dark:border-indigo-700 transition-all duration-300 flex items-center p-1"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #1e1b4b, #312e81)" 
          : "linear-gradient(135deg, #dbeafe, #e0f2fe)"
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <motion.div
        animate={{
          opacity: theme === "light" ? 1 : 0,
          scale: theme === "light" ? 1 : 0.5,
        }}
        className="absolute left-1"
      >
        <svg
          className="w-5 h-5 text-amber-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>

      {/* Moon icon */}
      <motion.div
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0.5,
        }}
        className="absolute right-1"
      >
        <svg
          className="w-5 h-5 text-indigo-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.div>

      {/* Toggle circle */}
      <motion.div
        animate={{
          x: theme === "dark" ? 26 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-white shadow-md"
        style={{
          boxShadow: theme === "dark" 
            ? "0 0 10px rgba(139, 92, 246, 0.5)" 
            : "0 0 10px rgba(59, 130, 246, 0.3)"
        }}
      />
    </motion.button>
  );
}
