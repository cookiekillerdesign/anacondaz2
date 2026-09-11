import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

// Desktop-only decorative cursor. Ring lags the dot with a spring-like
// quickTo tween; expands + fills ochre over anything tagged data-cursor.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      ring.dataset.active = target ? "true" : "false";
      gsap.to(ring, {
        scale: target ? 2.4 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
      if (target) {
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" data-active="false" aria-hidden="true" />
    </>
  );
}
