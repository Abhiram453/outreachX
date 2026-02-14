"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function NetworkingIllustration() {
  const { theme } = useTheme();
  
  const primaryColor = theme === "dark" ? "#6366f1" : "#3b82f6";
  const secondaryColor = theme === "dark" ? "#a855f7" : "#0ea5e9";
  const skinTone1 = "#F5D0B0";
  const skinTone2 = "#D4A574";
  const skinTone3 = "#8B6F47";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Background circle */}
      <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${
        theme === "dark" ? "bg-indigo-500" : "bg-blue-300"
      }`} />
      
      <svg
        viewBox="0 0 500 400"
        className="w-full h-auto max-w-lg mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background decorative circle */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          cx="250"
          cy="200"
          r="150"
          fill={theme === "dark" ? "rgba(99, 102, 241, 0.1)" : "rgba(59, 130, 246, 0.08)"}
        />
        
        {/* Smaller decorative circles */}
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          cx="380"
          cy="100"
          r="30"
          fill={theme === "dark" ? "rgba(168, 85, 247, 0.15)" : "rgba(14, 165, 233, 0.1)"}
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          cx="120"
          cy="320"
          r="20"
          fill={theme === "dark" ? "rgba(99, 102, 241, 0.15)" : "rgba(59, 130, 246, 0.1)"}
        />
        
        {/* Table */}
        <motion.rect
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          x="120"
          y="280"
          width="260"
          height="12"
          rx="6"
          fill={theme === "dark" ? "#374151" : "#e5e7eb"}
        />
        <rect x="140" y="292" width="8" height="40" fill={theme === "dark" ? "#4b5563" : "#d1d5db"} />
        <rect x="352" y="292" width="8" height="40" fill={theme === "dark" ? "#4b5563" : "#d1d5db"} />
        
        {/* Person 1 - Left (Woman with laptop) */}
        <g>
          {/* Hair */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            cx="160"
            cy="170"
            rx="28"
            ry="32"
            fill="#1f2937"
          />
          {/* Face */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            cx="160"
            cy="175"
            rx="22"
            ry="25"
            fill={skinTone1}
          />
          {/* Body */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            d="M130 210 Q130 240 145 270 L175 270 Q190 240 190 210 Q175 200 160 200 Q145 200 130 210"
            fill={primaryColor}
          />
          {/* Laptop on table */}
          <rect x="135" y="260" width="50" height="3" fill="#6b7280" />
          <rect x="140" y="240" width="40" height="25" rx="2" fill="#374151" />
          <rect x="143" y="243" width="34" height="19" rx="1" fill="#1f2937" />
          {/* Arms */}
          <path d="M140 220 Q130 240 145 260" stroke={skinTone1} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M180 220 Q190 240 175 260" stroke={skinTone1} strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Person 2 - Center (Man presenting) */}
        <g>
          {/* Hair */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="250"
            cy="140"
            rx="26"
            ry="28"
            fill="#4b3621"
          />
          {/* Face */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="250"
            cy="148"
            rx="22"
            ry="24"
            fill={skinTone2}
          />
          {/* Body */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            d="M220 180 Q215 220 225 270 L275 270 Q285 220 280 180 Q265 170 250 170 Q235 170 220 180"
            fill="#f3f4f6"
          />
          {/* Tie */}
          <path d="M250 180 L245 200 L250 220 L255 200 L250 180" fill={secondaryColor} />
          {/* Arms gesturing */}
          <motion.path
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            d="M225 190 Q200 180 190 160"
            stroke={skinTone2}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            d="M275 190 Q300 180 310 160"
            stroke={skinTone2}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* Clipboard/tablet in hand */}
          <rect x="295" y="145" width="30" height="40" rx="3" fill={theme === "dark" ? "#4b5563" : "#d1d5db"} />
          <rect x="298" y="150" width="24" height="30" rx="2" fill="white" />
        </g>
        
        {/* Person 3 - Right (Woman with coffee) */}
        <g>
          {/* Hair */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            cx="340"
            cy="168"
            rx="26"
            ry="30"
            fill="#854d0e"
          />
          {/* Face */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            cx="340"
            cy="175"
            rx="20"
            ry="23"
            fill={skinTone3}
          />
          {/* Body */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            d="M310 210 Q308 240 318 270 L362 270 Q372 240 370 210 Q355 200 340 200 Q325 200 310 210"
            fill={secondaryColor}
          />
          {/* Arms */}
          <path d="M315 220 Q305 240 320 260" stroke={skinTone3} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M365 220 Q380 230 385 250" stroke={skinTone3} strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Coffee cup */}
          <rect x="378" y="245" width="15" height="20" rx="2" fill="white" />
          <path d="M393 250 Q400 255 393 265" stroke="#d1d5db" strokeWidth="2" fill="none" />
        </g>
        
        {/* Speech bubbles / connection icons */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Chat bubble 1 */}
          <rect x="180" y="100" width="40" height="25" rx="12" fill={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(59, 130, 246, 0.15)"} />
          <circle cx="192" cy="112" r="3" fill={primaryColor} />
          <circle cx="200" cy="112" r="3" fill={primaryColor} />
          <circle cx="208" cy="112" r="3" fill={primaryColor} />
          
          {/* Chat bubble 2 */}
          <rect x="280" y="90" width="50" height="25" rx="12" fill={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(14, 165, 233, 0.15)"} />
          <rect x="288" y="99" width="25" height="3" rx="1" fill={secondaryColor} />
          <rect x="288" y="105" width="18" height="3" rx="1" fill={secondaryColor} opacity="0.6" />
        </motion.g>
        
        {/* Floating elements */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="90" cy="150" r="8" fill={primaryColor} opacity="0.3" />
          <circle cx="410" cy="180" r="6" fill={secondaryColor} opacity="0.3" />
          <circle cx="430" cy="280" r="10" fill={primaryColor} opacity="0.2" />
        </motion.g>
        
        {/* Connection lines */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          d="M160 175 Q200 130 250 148"
          stroke={theme === "dark" ? "rgba(99, 102, 241, 0.3)" : "rgba(59, 130, 246, 0.2)"}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          d="M250 148 Q300 130 340 175"
          stroke={theme === "dark" ? "rgba(168, 85, 247, 0.3)" : "rgba(14, 165, 233, 0.2)"}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
