"use client";

import { useState } from "react";
import { Project } from "@/lib/db";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [filter, setFilter] = useState<string>("All");
  const allTags = ["All", ...Array.from(new Set(initialProjects.flatMap((p) => p.tags)))];

  const filteredProjects = filter === "All" 
    ? initialProjects 
    : initialProjects.filter((p) => p.tags.includes(filter));

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tag
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
