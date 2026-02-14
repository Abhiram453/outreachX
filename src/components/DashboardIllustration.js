"use client";

import { motion } from "framer-motion";

export default function DashboardIllustration({ size = "md" }) {
  const primaryColor = "#3b82f6";
  const secondaryColor = "#0ea5e9";
  const accentColor = "#8b5cf6";
  
  const sizes = {
    sm: "max-w-[200px]",
    md: "max-w-[300px]",
    lg: "max-w-[400px]",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${sizes[size]} mx-auto`}
    >
      <svg
        viewBox="0 0 300 250"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          cx="150"
          cy="125"
          r="100"
          fill="rgba(59, 130, 246, 0.05)"
        />
        
        {/* Envelope base */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {/* Envelope body */}
          <rect x="70" y="90" width="160" height="100" rx="8" fill={primaryColor} />
          
          {/* Envelope flap */}
          <motion.path
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            d="M70 98 L150 150 L230 98"
            fill={secondaryColor}
          />
          
          {/* Envelope inner */}
          <rect x="82" y="105" width="136" height="72" rx="4" fill="white" opacity="0.9" />
          
          {/* Message lines */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <rect x="95" y="120" width="80" height="6" rx="3" fill="#e5e7eb" />
            <rect x="95" y="135" width="110" height="6" rx="3" fill="#e5e7eb" />
            <rect x="95" y="150" width="60" height="6" rx="3" fill="#e5e7eb" />
          </motion.g>
        </motion.g>
        
        {/* Floating elements */}
        <motion.g
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Star 1 */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            d="M250 60 L253 70 L263 70 L255 77 L258 87 L250 80 L242 87 L245 77 L237 70 L247 70 Z"
            fill={accentColor}
          />
        </motion.g>
        
        <motion.g
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Star 2 */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
            d="M50 140 L52 146 L58 146 L53 150 L55 156 L50 152 L45 156 L47 150 L42 146 L48 146 Z"
            fill={secondaryColor}
          />
        </motion.g>
        
        {/* Connection dots */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.circle
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx="55"
            cy="80"
            r="6"
            fill={primaryColor}
            opacity="0.6"
          />
          <motion.circle
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx="245"
            cy="170"
            r="8"
            fill={accentColor}
            opacity="0.5"
          />
        </motion.g>
        
        {/* Network lines */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <line x1="55" y1="80" x2="85" y2="100" stroke={primaryColor} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="245" y1="170" x2="220" y2="155" stroke={accentColor} strokeWidth="2" strokeDasharray="4 4" />
        </motion.g>
        
        {/* Sparkles */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="200" cy="50" r="3" fill={secondaryColor} />
          <circle cx="270" cy="120" r="2" fill={primaryColor} />
          <circle cx="30" cy="180" r="2.5" fill={accentColor} />
        </motion.g>
        
        {/* Send arrow */}
        <motion.g
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.path
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            d="M180 210 L200 225 L180 240 M180 225 L220 225"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

// Small networking person illustration
export function NetworkingPersonIllustration() {
  const primaryColor = "#3b82f6";
  const skinTone = "#F5D0B0";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto max-w-[80px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Person */}
        <circle cx="50" cy="30" r="15" fill={skinTone} />
        <ellipse cx="50" cy="70" rx="25" ry="20" fill={primaryColor} />
        
        {/* Laptop */}
        <rect x="35" y="55" width="30" height="18" rx="2" fill="#374151" />
        <rect x="37" y="57" width="26" height="12" rx="1" fill="#60a5fa" />
        
        {/* Connection dots */}
        <motion.g
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="20" cy="20" r="5" fill="#8b5cf6" opacity="0.6" />
          <circle cx="80" cy="25" r="4" fill="#0ea5e9" opacity="0.6" />
          <circle cx="85" cy="60" r="3" fill="#3b82f6" opacity="0.6" />
        </motion.g>
        
        {/* Connection lines */}
        <line x1="25" y1="22" x2="40" y2="28" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <line x1="75" y1="27" x2="62" y2="30" stroke="#0ea5e9" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      </svg>
    </motion.div>
  );
}

// Message success illustration
export function MessageSuccessIllustration() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="relative"
    >
      <svg
        viewBox="0 0 80 80"
        className="w-full h-auto max-w-[60px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          cx="40"
          cy="40"
          r="35"
          fill="rgba(16, 185, 129, 0.1)"
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          cx="40"
          cy="40"
          r="25"
          fill="#10b981"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          d="M28 40 L36 48 L52 32"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
