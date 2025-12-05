"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HomeButtonProps {
  image: string;
}

export function HomeButton({ image }: HomeButtonProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  if (pathname === "/") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-6 z-50 hidden md:block"
    >
      <Link href="/" className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-12 h-12 rounded-[1rem] overflow-hidden border-2 border-muted bg-muted shadow-lg cursor-pointer relative z-10 peer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            alt="Home" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        {
          visible && (
            <motion.span
              initial={{ opacity: 0, x: -3 }}
              animate={{ opacity: 1, x: 1 }}
              transition={{duration:0.3,ease:"easeInOut"}}
        
              className="text-sm font-mono font-bold bg-background/80 backdrop-blur px-2 py-1 rounded border border-border shadow-sm opacity-0 transition-all duration-300 "
            >
              Home
            </motion.span>
          )
        }
      </Link>
    </motion.div>
  );
}
