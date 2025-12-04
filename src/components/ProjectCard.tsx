"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between overflow-hidden border border-border/50 bg-card/50 p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/10 frame-corners cursor-hover"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-xl font-bold transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex gap-3">
          {project.github && (
            <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          )}
          <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6 h-20 overflow-hidden relative z-10 transition-colors duration-200">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-mono bg-muted/50 text-muted-foreground rounded-md border border-transparent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
