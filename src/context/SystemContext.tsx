"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SystemState {
  fontMode: "default" | "hacker";
  setFontMode: (mode: "default" | "hacker") => void;
  isTerminalOpen: boolean;
  setTerminalOpen: (isOpen: boolean) => void;
}

const SystemContext = createContext<SystemState | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [fontMode, setFontMode] = useState<"default" | "hacker">("default");
  const [isTerminalOpen, setTerminalOpen] = useState(false);

  // Apply classes to body based on state
  useEffect(() => {
    const body = document.body;
    
    // Font
    if (fontMode === "hacker") body.classList.add("font-hacker");
    else body.classList.remove("font-hacker");

  }, [fontMode]);

  return (
    <SystemContext.Provider
      value={{
        fontMode,
        setFontMode,
        isTerminalOpen,
        setTerminalOpen,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
}
