"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const refinementOptions = [
  {
    id: "empathy",
    label: "More Empathetic",
    icon: "💝",
    description: "Add emotional intelligence",
  },
  {
    id: "shorter",
    label: "Make Shorter",
    icon: "✂️",
    description: "More concise",
  },
  {
    id: "formal",
    label: "More Formal",
    icon: "👔",
    description: "Business-like tone",
  },
  {
    id: "friendly",
    label: "More Friendly",
    icon: "😊",
    description: "Warmer approach",
  },
  {
    id: "confident",
    label: "More Confident",
    icon: "💪",
    description: "Assertive but respectful",
  },
  {
    id: "specific",
    label: "Add Details",
    icon: "🎯",
    description: "More personalized",
  },
];

export default function RefineOptions({ message, onRefine, isRefining, aiEnabled }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRefine = async (optionId) => {
    if (!aiEnabled) {
      alert("AI refinement requires an OpenAI API key. The template-based generation doesn't support refinement.");
      return;
    }
    setSelectedOption(optionId);
    await onRefine(optionId);
    setSelectedOption(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">✨</span>
        <h4 className="font-medium text-slate-800 dark:text-slate-200">
          Refine Your Message
        </h4>
        {!aiEnabled && (
          <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
            Requires AI
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {refinementOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: aiEnabled ? 1.02 : 1 }}
            whileTap={{ scale: aiEnabled ? 0.98 : 1 }}
            onClick={() => handleRefine(option.id)}
            disabled={isRefining || !aiEnabled}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              selectedOption === option.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            } ${!aiEnabled ? "opacity-50 cursor-not-allowed" : ""} ${
              isRefining && selectedOption === option.id ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{option.icon}</span>
              <div>
                <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                  {option.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {option.description}
                </p>
              </div>
            </div>
            {isRefining && selectedOption === option.id && (
              <div className="mt-2 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                Refining...
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      {!aiEnabled && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          💡 Add your OpenAI API key in the environment variables to enable AI-powered refinements.
        </p>
      )}
    </motion.div>
  );
}
