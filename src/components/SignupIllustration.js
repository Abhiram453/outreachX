"use client";

import { motion } from "framer-motion";

export default function SignupIllustration() {
  const primaryColor = "#3b82f6";
  const secondaryColor = "#0ea5e9";
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
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-sky-300" />
      
      <svg
        viewBox="0 0 400 350"
        className="w-full h-auto max-w-md mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background decorative circles */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          cx="200"
          cy="175"
          r="140"
          fill="rgba(14, 165, 233, 0.06)"
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          cx="200"
          cy="175"
          r="100"
          fill="rgba(59, 130, 246, 0.05)"
        />
        
        {/* Floating decorative elements */}
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          cx="330"
          cy="70"
          r="20"
          fill="rgba(14, 165, 233, 0.15)"
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          cx="70"
          cy="260"
          r="15"
          fill="rgba(59, 130, 246, 0.15)"
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          cx="350"
          cy="220"
          r="12"
          fill="rgba(16, 185, 129, 0.15)"
        />
        
        {/* Central platform/podium */}
        <motion.ellipse
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          cx="200"
          cy="290"
          rx="120"
          ry="25"
          fill="rgba(59, 130, 246, 0.1)"
        />
        
        {/* Person 1 - Left */}
        <g>
          {/* Body */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="120"
            cy="250"
            rx="22"
            ry="30"
            fill={primaryColor}
          />
          {/* Head */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="120"
            cy="205"
            r="20"
            fill={skinTone1}
          />
          {/* Hair */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            cx="120"
            cy="195"
            rx="22"
            ry="15"
            fill="#1f2937"
          />
          {/* Arm waving */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            d="M135 235 Q155 210 145 180"
            stroke={skinTone1}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Smile */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8 }}
            d="M112 210 Q120 218 128 210"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Person 2 - Center (main character creating account) */}
        <g>
          {/* Body */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            cx="200"
            cy="240"
            rx="28"
            ry="38"
            fill={secondaryColor}
          />
          {/* Head */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            cx="200"
            cy="185"
            r="25"
            fill={skinTone2}
          />
          {/* Hair */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            d="M175 175 Q180 155 200 150 Q220 155 225 175 Q220 165 200 163 Q180 165 175 175"
            fill="#4b5563"
          />
          {/* Eyes */}
          <circle cx="192" cy="185" r="3" fill="#1f2937" />
          <circle cx="208" cy="185" r="3" fill="#1f2937" />
          {/* Smile */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8 }}
            d="M190 195 Q200 205 210 195"
            stroke="#374151"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arms holding device */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            d="M170 230 Q160 215 155 200"
            stroke={skinTone2}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            d="M230 230 Q240 215 245 200"
            stroke={skinTone2}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Phone/Device in front of center person */}
        <motion.g
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.65, type: "spring" }}
        >
          <rect x="160" y="115" width="80" height="55" rx="8" fill="#1f2937" />
          <rect x="165" y="120" width="70" height="45" rx="4" fill="#374151" />
          {/* Form fields on device */}
          <rect x="175" y="128" width="50" height="6" rx="2" fill="#6b7280" />
          <rect x="175" y="138" width="50" height="6" rx="2" fill="#6b7280" />
          {/* Join button */}
          <rect x="182" y="150" width="36" height="10" rx="4" fill={primaryColor} />
          <text x="193" y="158" fill="white" fontSize="6" fontWeight="bold">JOIN</text>
        </motion.g>
        
        {/* Person 3 - Right */}
        <g>
          {/* Body */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55 }}
            cx="280"
            cy="250"
            rx="22"
            ry="30"
            fill="#8b5cf6"
          />
          {/* Head */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55 }}
            cx="280"
            cy="205"
            r="20"
            fill={skinTone3}
          />
          {/* Hair */}
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55 }}
            cx="280"
            cy="193"
            rx="20"
            ry="18"
            fill="#1f2937"
          />
          {/* Arm welcoming */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            d="M265 235 Q245 215 255 185"
            stroke={skinTone3}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Smile */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.85 }}
            d="M272 210 Q280 218 288 210"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Stars/sparkles */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.path
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            d="M60 120 L63 128 L72 128 L65 133 L68 142 L60 136 L52 142 L55 133 L48 128 L57 128 Z"
            fill="#fbbf24"
          />
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
        >
          <motion.path
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            d="M340 140 L342 146 L348 146 L343 150 L345 156 L340 152 L335 156 L337 150 L332 146 L338 146 Z"
            fill="#fbbf24"
          />
        </motion.g>
        
        {/* Welcome text bubble */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <rect x="155" y="50" width="90" height="35" rx="12" fill="white" stroke={primaryColor} strokeWidth="2" />
          <polygon points="195,85 200,95 210,85" fill="white" stroke={primaryColor} strokeWidth="2" />
          <polygon points="196,84 200,92 209,84" fill="white" />
          <text x="175" y="73" fill={primaryColor} fontSize="12" fontWeight="bold">Welcome!</text>
        </motion.g>
        
        {/* Plus icons indicating adding/creating */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        >
          <circle cx="330" cy="160" r="10" fill={primaryColor} opacity="0.2" />
          <path d="M326 160 H334 M330 156 V164" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <circle cx="70" cy="170" r="8" fill={secondaryColor} opacity="0.2" />
          <path d="M67 170 H73 M70 167 V173" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
