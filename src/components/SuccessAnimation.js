"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false, loading: () => <div className="w-[200px] h-[200px]" /> }
);

// Lottie animation URLs
const ANIMATIONS = {
  success: "https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json",
  email: "https://assets4.lottiefiles.com/packages/lf20_u25cckyh.json",
  rocket: "https://assets9.lottiefiles.com/packages/lf20_l4ny0jud.json",
  confetti: "https://assets1.lottiefiles.com/packages/lf20_u4yrau.json",
};

export default function SuccessAnimation({ onComplete, recipientName }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl"
      >
        {/* Lottie Animation */}
        <div className="relative">
          <Player
            autoplay
            loop={false}
            src={ANIMATIONS.success}
            style={{ height: "200px", width: "200px" }}
            className="mx-auto"
          />
          
          {/* Floating envelope */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              className="w-16 h-16 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-slate-800 dark:text-white mt-4"
        >
          Message Ready! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-600 dark:text-slate-300 mt-2"
        >
          Your personalized outreach message for{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {recipientName}
          </span>{" "}
          is ready to send!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25"
          >
            View Message
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-xl"
            >
              {["✨", "🚀", "💼", "🎯", "⭐"][i]}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
