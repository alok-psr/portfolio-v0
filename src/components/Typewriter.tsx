"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Typewriter({ children }: { children: React.ReactNode }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (typeof children === "string") {
      setIsTyping(true);
      setDisplayedText("");
      
      let i = 0;
      const text = children;
      
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 5); // Speed of typing

      return () => clearInterval(timer);
    }
  }, [children]);

  if (typeof children !== "string") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 5 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <span>
      {displayedText}
      {isTyping && <span className="animate-pulse ml-1">▍</span>}
    </span>
  );
}
