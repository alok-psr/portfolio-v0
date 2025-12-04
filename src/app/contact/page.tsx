"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="text-muted-foreground">
          Let's build something amazing together.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                hello@example.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-muted/50 p-6 rounded-lg border border-border"
        >
          <p className="text-muted-foreground mb-4">
            Prefer the terminal?
          </p>
          <div className="font-mono text-sm bg-black/80 text-green-400 p-4 rounded border border-border/50">
            <p>$ mail -s "Hello" hello@example.com</p>
            <p className="text-gray-500 mt-2"># Or just use the form below (coming soon)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
