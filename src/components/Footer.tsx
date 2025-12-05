"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        
        <div className="flex items-center gap-6">
          <Link href="https://github.com/alok-psr" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/alok-pratap-singh-rathor-209240324/" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://x.com/AL0K__PSR" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="mailto:alokrathor136@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
        </div>

        
      </div>
    </footer>
  );
}
