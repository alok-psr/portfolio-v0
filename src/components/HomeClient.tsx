"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProfileData, Project } from "@/lib/db";

interface HomeClientProps {
  profile: ProfileData;
  projects: Project[];
}

export function HomeClient({ profile, projects }: HomeClientProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] p-8 text-center space-y-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-muted mx-auto relative z-10 bg-muted flex items-center justify-center">
             {profile.image ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={profile.image} alt={profile.name} className="object-cover w-full h-full" />
             ) : (
               <span className="text-4xl font-bold text-muted-foreground">ME</span>
             )}
          </div>
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10 scale-150 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-accent">{profile.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {profile.title}
            <br />
            {profile.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-6 pt-4"
        >
            <Link href={profile.social.github} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="w-6 h-6" />
            </Link>
            <Link href={profile.social.linkedin} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-6 h-6" />
            </Link>
            <Link href={profile.social.twitter} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" />
            </Link>
            <Link href={profile.social.email} className="text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-6 h-6" />
            </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-12 text-sm text-muted-foreground flex items-center gap-2"
        >
          <Terminal className="w-4 h-4" />
          <span>Press <kbd className="bg-muted px-1 rounded border border-border font-mono text-xs">Ctrl+K</kbd> to navigate via terminal</span>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="w-full max-w-5xl px-4 py-20 border-t border-border/50">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link href="/projects" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </section>

      {/* Skills Section - Recruiter Relevant */}
      <section className="w-full max-w-5xl px-4 py-20 border-t border-border/50">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-full">
                 <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm font-mono">
                            {skill}
                        </span>
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* Experience Summary Section */}
      <section className="w-full max-w-3xl px-4 py-20 border-t border-border/50">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="flex gap-4">
                <Link href="/resume.pdf" target="_blank" className="text-accent hover:underline flex items-center gap-1">
                    Download Resume <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/experience" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                    View Full History <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
        <div className="space-y-8">
            <div className="border-l-2 border-border pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent" />
                <h3 className="text-xl font-bold">Senior Full Stack Developer</h3>
                <p className="text-accent">Tech Solutions Inc.</p>
                <p className="text-sm text-muted-foreground mb-2">2022 - Present</p>
                <p className="text-muted-foreground">Leading development of scalable web apps and mentoring junior devs.</p>
            </div>
            <div className="border-l-2 border-border pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-muted" />
                <h3 className="text-xl font-bold">Frontend Developer</h3>
                <p className="text-accent">Creative Agency</p>
                <p className="text-sm text-muted-foreground mb-2">2020 - 2022</p>
                <p className="text-muted-foreground">Built interactive websites for high-profile clients.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
