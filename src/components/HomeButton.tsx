"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface HomeButtonProps {
  image: string;
}

export function HomeButton({ image }: HomeButtonProps) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-6 z-50 hidden md:block"
    >
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-12 h-12 rounded-[1rem] overflow-hidden border-2 border-muted bg-muted shadow-lg cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            alt="Home" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
