"use client";

import { motion } from "framer-motion";

export default function FloatingElements() {
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const elements = [
    { icon: "💼", left: "10%", top: "20%", delay: 0 },
    { icon: "✉️", left: "80%", top: "30%", delay: 0.5 },
    { icon: "🎯", left: "15%", top: "70%", delay: 1 },
    { icon: "🚀", left: "85%", top: "60%", delay: 1.5 },
    { icon: "💡", left: "50%", top: "15%", delay: 2 },
    { icon: "🤝", left: "70%", top: "80%", delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingVariants}
          animate="animate"
          className="absolute text-4xl opacity-20"
          style={{ left: el.left, top: el.top }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: el.delay, duration: 0.5 }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-30"
        style={{ left: "-10%", top: "-10%" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full blur-3xl opacity-20"
        style={{ right: "-5%", bottom: "10%" }}
      />
    </div>
  );
}
