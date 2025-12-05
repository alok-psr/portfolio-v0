"use client";

import { motion } from "framer-motion";
import { Experience } from "@/lib/db";

interface ExperienceClientProps {
  experiences: Experience[];
}

export function ExperienceClient({ experiences }: ExperienceClientProps) {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative border-l-2 border-border pl-8 ml-4"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent" />
          
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                {exp.period}
              </span>
            </div>
            <div className="text-accent font-medium">{exp.company}</div>
            <p className="text-muted-foreground leading-relaxed">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono border border-border px-2 py-1 rounded hover:border-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
