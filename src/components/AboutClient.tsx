"use client";

import { motion } from "framer-motion";
import { ProfileData } from "@/lib/db";

interface AboutClientProps {
  profile: ProfileData;
}

export function AboutClient({ profile }: AboutClientProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold">{profile.about.title}</h1>
        <p className="text-muted-foreground">
          {profile.about.subtitle}
        </p>
      </motion.div>

      <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {profile.about.description1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {profile.about.description2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {profile.about.description3}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm font-mono">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
