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
      className="group relative border border-border bg-background p-6 hover:border-accent transition-colors frame-corners"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3">
          {project.github && (
            <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </Link>
          )}
          <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-foreground">
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6 h-20 overflow-hidden">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-sm border border-transparent group-hover:border-accent/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
