"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("Message sent successfully!");
    
    // Reset after showing success
    setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="relative p-6 border border-border/50 bg-background/50 backdrop-blur-sm frame-corners"
    >
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-accent">&gt;</span> Send Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-mono text-muted-foreground">
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
              type="text"
              id="name"
              required
              className="w-full bg-muted/30 border border-border rounded-none p-3 outline-none transition-colors focus:bg-muted/50"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
              type="email"
              id="email"
              required
              className="w-full bg-muted/30 border border-border rounded-none p-3 outline-none transition-colors focus:bg-muted/50"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
            Message
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
            id="message"
            required
            rows={5}
            className="w-full bg-muted/30 border border-border rounded-none p-3 outline-none transition-colors focus:bg-muted/50 resize-none"
            placeholder="Hello, I'd like to work with you..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || isSuccess}
          className={`w-full py-3 px-6 font-bold flex items-center justify-center gap-2 transition-all duration-300 rounded-none border-2 ${
            isSuccess 
              ? "bg-green-500/10 border-green-500 text-green-500" 
              : "bg-accent/10 border-accent text-accent hover:bg-accent hover:text-white"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Sent!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Transmit
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
