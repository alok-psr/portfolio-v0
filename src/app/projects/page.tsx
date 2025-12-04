"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A collection of my work, from web apps to command-line tools.
        </p>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm font-mono border transition-colors ${
              filter === "all"
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-background border-border hover:border-accent"
            }`}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 text-sm font-mono border transition-colors ${
                filter === tag
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background border-border hover:border-accent"
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
