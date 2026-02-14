"use client";

import { motion } from "framer-motion";

export default function LoginIllustration() {
  const primaryColor = "#3b82f6";
  const secondaryColor = "#0ea5e9";
  const skinTone = "#F5D0B0";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-blue-300" />
      
      <svg
        viewBox="0 0 400 350"
        className="w-full h-auto max-w-md mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background decorative circle */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          cx="200"
          cy="175"
          r="130"
          fill="rgba(59, 130, 246, 0.08)"
        />
        
        {/* Floating decorative elements */}
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          cx="320"
          cy="80"
          r="25"
          fill="rgba(14, 165, 233, 0.1)"
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          cx="80"
          cy="280"
          r="18"
          fill="rgba(59, 130, 246, 0.1)"
        />
        
        {/* Lock/Shield icon */}
        <motion.g
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <rect x="155" y="100" width="90" height="70" rx="10" fill={primaryColor} />
          <rect x="165" y="110" width="70" height="50" rx="6" fill="white" opacity="0.9" />
          <circle cx="200" cy="135" r="12" fill={primaryColor} />
          <rect x="196" y="135" width="8" height="15" rx="2" fill={primaryColor} />
          
          {/* Lock arc */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            d="M175 100 V85 A25 25 0 0 1 225 85 V100"
            stroke={secondaryColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
        
        {/* Person sitting at desk */}
        <g>
          {/* Chair */}
          <motion.rect
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 }}
            x="130"
            y="230"
            width="60"
            height="8"
            rx="4"
            fill="#d1d5db"
          />
          <rect x="155" y="238" width="10" height="40" fill="#9ca3af" />
          <motion.ellipse cx="160" cy="285" rx="25" ry="8" fill="#d1d5db" />
          
          {/* Person body */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="160"
            cy="215"
            rx="25"
            ry="20"
            fill={primaryColor}
          />
          
          {/* Head */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="160"
            cy="185"
            r="18"
            fill={skinTone}
          />
          
          {/* Hair */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            d="M142 180 Q145 165 160 162 Q175 165 178 180"
            fill="#374151"
          />
          
          {/* Arm pointing to screen */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            d="M175 210 Q200 200 220 180"
            stroke={skinTone}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Laptop/Device */}
        <g>
          <motion.rect
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35 }}
            x="220"
            y="200"
            width="100"
            height="65"
            rx="6"
            fill="#374151"
          />
          <rect x="225" y="205" width="90" height="55" rx="4" fill="#1f2937" />
          
          {/* Screen content - login form */}
          <rect x="240" y="215" width="60" height="8" rx="2" fill="#4b5563" />
          <rect x="240" y="228" width="60" height="8" rx="2" fill="#4b5563" />
          <rect x="250" y="242" width="40" height="10" rx="4" fill={primaryColor} />
          
          {/* Keyboard */}
          <motion.rect
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            x="210"
            y="268"
            width="120"
            height="8"
            rx="2"
            fill="#9ca3af"
          />
        </g>
        
        {/* Success checkmarks floating */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <circle cx="80" cy="150" r="15" fill="#10b981" opacity="0.2" />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            d="M72 150 L78 156 L88 144"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <circle cx="340" cy="200" r="12" fill="#10b981" opacity="0.2" />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            d="M334 200 L338 204 L346 194"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
        
        {/* Connection lines */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          d="M200 170 Q230 150 270 160"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeDasharray="6,4"
          opacity="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
