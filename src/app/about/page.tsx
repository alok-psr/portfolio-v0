"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-muted-foreground">
          Developer, Designer, and Creator.
        </p>
      </motion.div>

      <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Hello! I'm Alok, a passionate developer based in San Francisco. I love building things for the web, from simple landing pages to complex web applications.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          My journey started when I wrote my first line of code in Python. Since then, I've explored various technologies and frameworks, but I always find myself coming back to the web.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          When I'm not coding, you can find me reading about the latest tech trends, playing video games, or hiking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Tailwind CSS", "PostgreSQL", "Docker"].map((tech) => (
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
