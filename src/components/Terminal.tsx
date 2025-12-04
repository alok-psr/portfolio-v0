"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Command {
  command: string;
  output: React.ReactNode;
}

export function Terminal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<Command[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const pages = ["home", "about", "projects", "contact", "blog", "experience"];
  const socialLinks: Record<string, string> = {
    x: "https://x.com/AL0K__PSR",
    github: "https://github.com/alok-psr",
    linkedin: "https://www.linkedin.com/in/alok-pratap-singh-rathor-209240324/",
    lc: "https://leetcode.com/u/Al0k__psr/",
  };
  const systemCommands = ["help", "clear", "theme"];
  const allCommands = [...pages, ...Object.keys(socialLinks), ...systemCommands];

  // Toggle with Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSelectedIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = allCommands.filter((cmd) =>
      cmd.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev >= suggestions.length - 1 ? 0 : prev + 1));
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (selectedIndex !== -1) {
        setInput(suggestions[selectedIndex]);
        setSuggestions([]);
      } else if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(" ");
    const action = args[0];
    let output: React.ReactNode = "";

    // Direct navigation check
    if (pages.includes(action)) {
      output = `Navigating to /${action === "home" ? "" : action}...`;
      setTimeout(() => {
        router.push(action === "home" ? "/" : `/${action}`);
        setIsOpen(false);
      }, 800);
      setHistory((prev) => [...prev, { command: cmd, output }]);
      setSuggestions([]);
      return;
    }

    if (socialLinks[action]) {
      output = `Opening ${action}...`;
      window.open(socialLinks[action], "_blank");
      setHistory((prev) => [...prev, { command: cmd, output }]);
      setSuggestions([]);
      return;
    }

    switch (action) {
      case "help":
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <ul className="list-disc list-inside pl-2 text-muted-foreground">
              <li><span className="text-accent">[page]</span> - Navigate directly (e.g., 'projects', 'about')</li>
              <li><span className="text-accent">[social]</span> - Open social link (e.g., 'github', 'x')</li>
              <li><span className="text-accent">clear</span> - Clear terminal history</li>
              <li><span className="text-accent">theme [light/dark]</span> - Toggle theme (coming soon)</li>
              <li><span className="text-accent">help</span> - Show this help message</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">Pages: {pages.join(", ")}</p>
            <p className="text-xs text-muted-foreground">Socials: {Object.keys(socialLinks).join(", ")}</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setSuggestions([]);
        return;
      case "goto":
        // Keep for backward compatibility
        const page = args[1];
        if (pages.includes(page)) {
          output = `Navigating to /${page === "home" ? "" : page}...`;
          setTimeout(() => {
            router.push(page === "home" ? "/" : `/${page}`);
            setIsOpen(false);
          }, 800);
        } else {
          output = `Page not found: ${page}. Try: ${pages.join(", ")}`;
        }
        break;
      case "open":
        // Keep for backward compatibility
        const social = args[1];
        if (socialLinks[social]) {
          output = `Opening ${social}...`;
          window.open(socialLinks[social], "_blank");
        } else {
          output = `Link not found: ${social}. Try: ${Object.keys(socialLinks).join(", ")}`;
        }
        break;
      default:
        output = `Command not found: ${action}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If a suggestion is selected, use it
    if (selectedIndex !== -1 && suggestions[selectedIndex]) {
        handleCommand(suggestions[selectedIndex]);
        setInput("");
        setSelectedIndex(-1);
        return;
    }

    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
    setSelectedIndex(-1);
  };

  return (
    <>
      {/* Trigger Hint */}
      <div className="fixed bottom-4 right-4 z-50 hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur border border-border px-3 py-1.5 rounded-md shadow-sm">
        <span>Press</span>
        <kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">Ctrl+K</kbd>
        <span>for Terminal</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div className="w-full max-w-2xl bg-background border border-border shadow-2xl overflow-hidden rounded-lg flex flex-col max-h-[80vh] frame-corners">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <TerminalIcon className="w-4 h-4" />
                  <span>user@portfolio:~$</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-4 min-h-[300px]"
                onClick={() => inputRef.current?.focus()}
              >
                <div className="text-muted-foreground">
                  Welcome to the portfolio terminal. Type <span className="text-accent">'help'</span> to get started.
                </div>
                {history.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-foreground">{item.command}</span>
                    </div>
                    <div className="pl-5 text-foreground/90 whitespace-pre-wrap">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background relative">
                {/* Suggestions Popup */}
                {suggestions.length > 0 && (
                  <div className="absolute bottom-full left-4 mb-2 w-64 bg-background border border-border rounded-md shadow-lg overflow-hidden z-10">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        className={cn(
                          "px-3 py-2 text-sm font-mono cursor-pointer hover:bg-muted transition-colors",
                          index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                        )}
                        onClick={() => {
                          setInput(suggestion);
                          setSuggestions([]);
                          inputRef.current?.focus();
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 font-mono text-sm">
                  <ChevronRight className="w-4 h-4 text-accent animate-pulse" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/50"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
