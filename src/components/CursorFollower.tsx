"use client";

import { useEffect, useState, useRef } from "react";

// Module-level ref to ensure cursor only mounts once across page navigations.
// We use a plain object ref (not useRef hook) at module level so it persists
// across component unmounts/mounts during Astro view transitions.
const cursorMountedRef = { current: false };

// VisualViewport ref for resize handling
const visualViewportRef = { current: null as typeof window extends VisualViewport ? VisualViewport : null };

export function CursorFollower() {
  // Guard: only mount once; return null on subsequent renders
  if (cursorMountedRef.current) {
    return null;
  }
  cursorMountedRef.current = true;

  const [showCursor, setShowCursor] = useState(true);
  const [dotX, setDotX] = useState(0);
  const [dotY, setDotY] = useState(0);
  const [ringX, setRingX] = useState(0);
  const [ringY, setRingY] = useState(0);

  // Check for touch/coarse pointers and prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice =
    typeof navigator !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice || prefersReducedMotion) {
    setShowCursor(false);
  }

  // Canvas size state - update on window resize and visualViewport resize
  const [canvasWidth, setCanvasWidth] = useState(() => window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(() => window.innerHeight);
  const [pixelRatio, setPixelRatio] = useState(() => window.devicePixelRatio);

  useEffect(() => {
    // Initial size setup
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
    setPixelRatio(window.devicePixelRatio);

    // Update on window resize
    const handleResize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
      setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // Update on visualViewport resize (mobile pinch/zoom)
    if (typeof visualViewport !== "undefined") {
      visualViewportRef.current = visualViewport;
      visualViewport.addEventListener("resize", handleResize);
    }

    // Mouse tracking using clientX/clientY only - NEVER pageX/pageY or scrollY
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      // CRITICAL: Use clientX/clientY only
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Respect mouse leave/enter on the document
    const doc = document.documentElement;
    doc.addEventListener("mouseleave", () => setShowCursor(false));
    doc.addEventListener("mouseenter", () => setShowCursor(true));

    // Add pointermove listener
    doc.addEventListener("pointermove", onPointerMove);

    // Animation loop - position dot and ring every requestAnimationFrame
    const animate = () => {
      if (!cursorMountedRef.current) return;

      // Dot follows pointer instantly with clientX/clientY
      setDotX(mouseX);
      setDotY(mouseY);

      // Ring follows with same position (no easing by default)
      setRingX(mouseX);
      setRingY(mouseY);

      // Continue loop only if still mounted
      cursorMountedRef.current ? requestAnimationFrame(animate) : cancelAnimationFrame(rafRef.current);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cursorMountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      doc.removeEventListener("pointermove", onPointerMove);
      doc.removeEventListener("mouseleave", () => setShowCursor(false));
      doc.removeEventListener("mouseenter", () => setShowCursor(true));
      window.removeEventListener("resize", handleResize);
      if (typeof visualViewport !== "undefined" && visualViewportRef.current) {
        visualViewportRef.current.removeEventListener("resize", handleResize);
      }
    };
  }, []); // Empty deps runs once on mount

  if (!showCursor) {
    return null;
  }

  // Cursor layer: portal directly under <body>
  // Positioned: fixed; top:0; left:0; width:100vw; height:100vh;
  // overflow:hidden; pointer-events:none; z-index:9999; transform:none; contain:none;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "none",
        contain: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Dot - follows pointer with clientX/clientY, NO CSS transition */}
      <div
        style={{
          position: "absolute",
          left: `${dotX}px`,
          top: `${dotY}px`,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "currentColor",
          // INSTANT position - no transition. The transition CSS property is NOT set here.
          // Any transition would cause lag. We use direct JS position updates instead.
          margin: 0,
          // Make it clearly visible
          boxShadow: "0 0 8px currentColor",
          // pointerEvents: auto so it doesn't block clicks on underlying interactive elements
          pointerEvents: "auto",
        }}
        data-testid="cursor-dot"
      />

      {/* Ring - follows pointer */}
      <div
        style={{
          position: "absolute",
          left: `${ringX}px`,
          top: `${ringY}px`,
          width: 20,
          height: 20,
          border: "2px solid currentColor",
          borderRadius: "50%",
          pointerEvents: "auto",
          opacity: 0.5,
        }}
        data-testid="cursor-ring"
      />
    </div>
  );
}