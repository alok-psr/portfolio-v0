"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SystemState {
  fontMode: "default" | "hacker";
  setFontMode: (mode: "default" | "hacker") => void;
}

const SystemContext = createContext<SystemState | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [fontMode, setFontMode] = useState<"default" | "hacker">("default");

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
