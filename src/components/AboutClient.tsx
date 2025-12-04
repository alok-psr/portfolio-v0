"use client";

import { motion } from "framer-motion";
import { ProfileData } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";

interface AboutClientProps {
  profile: ProfileData;
}

export function AboutClient({ profile }: AboutClientProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PageHeader 
        title={profile.about.title} 
        description={profile.about.subtitle} 
      />

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
          className="pt-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Technical Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="bg-card border border-border/50 p-6 rounded-xl hover:border-accent/50 transition-colors duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                <span className="text-2xl">🎨</span> Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.frontend.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-muted/50 border border-border rounded-md text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-card border border-border/50 p-6 rounded-xl hover:border-accent/50 transition-colors duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                <span className="text-2xl">⚙️</span> Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.backend.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-muted/50 border border-border rounded-md text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-card border border-border/50 p-6 rounded-xl hover:border-accent/50 transition-colors duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                <span className="text-2xl">🛠️</span> Tools & Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.tools.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-muted/50 border border-border rounded-md text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
