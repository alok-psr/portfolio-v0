"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const [text, setText] = useState(title);
  const originalText = title;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [title]); // Re-run if title changes

  return (
    <div className="flex flex-col items-center justify-center text-center mb-16 space-y-6">
      <motion.div
        className="relative p-4"
        whileHover={{ 
            scale: 1.02,
            textShadow: "2px 0px 0px rgba(255,0,0,0.5), -2px 0px 0px rgba(0,255,255,0.5)",
            transition: { duration: 0.1 }
        }}
      >
        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter relative z-10 font-mono transition-colors duration-300 hover:text-accent uppercase">
          {text}
        </h1>
        {/* Decorative brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-muted-foreground max-w-lg"
      >
        {description}
      </motion.p>
    </div>
  );
}
