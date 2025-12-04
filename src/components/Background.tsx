"use client"

import { useEffect, useRef } from "react";

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;



    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      container.style.setProperty("--mouse-x", `${clientX}px`);
      container.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Mouse Spotlight */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_300px_at_var(--mouse-x)_var(--mouse-y),rgba(var(--accent-rgb),0.15),transparent_80%)]"
        style={
          {
            "--accent-rgb": "37, 99, 235", // Fallback or dynamic
          } as React.CSSProperties
        }
      />
      
      {/* Dark mode adjustment for spotlight color if needed, handled via CSS variables usually, 
          but here we use a simple radial gradient. 
          Let's make sure the accent color matches the theme.
      */}
      <style jsx global>{`
        :root {
          --accent-rgb: 37, 99, 235;
        }
        .dark {
          --accent-rgb: 59, 130, 246;
        }
      `}</style>
    </div>
  );
}
