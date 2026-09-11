import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared easing to match the CSS --ease-snap curve everywhere GSAP is used.
export const EASE_SNAP = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_POWER = "cubic-bezier(0.65, 0, 0.35, 1)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
