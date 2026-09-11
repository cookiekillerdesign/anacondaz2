import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

let uid = 0;

/**
 * Splits `text` into words, each clipped inside its own overflow-hidden
 * mask, and animates them up into place with a stagger. Two modes:
 *  - scroll (default): fires once when the element enters the viewport.
 *  - manual: pass `play` (boolean) to trigger it yourself, e.g. once a
 *    preloader timeline completes. Useful for above-the-fold hero copy
 *    where ScrollTrigger's "enters viewport" check fires before paint.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.045,
  delay = 0,
  play,
  once = true,
}) {
  const ref = useRef(null);
  const idRef = useRef(null);
  if (idRef.current === null) idRef.current = `rt-${uid++}`;

  const words = text.split(" ");

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const spans = ref.current.querySelectorAll("[data-word-inner]");
    gsap.set(spans, { yPercent: 110 });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const spans = ref.current.querySelectorAll("[data-word-inner]");

    const anim = () =>
      gsap.to(spans, {
        yPercent: 0,
        duration: 0.9,
        ease: "cubic-bezier(0.16,1,0.3,1)",
        stagger,
        delay,
      });

    if (play !== undefined) {
      if (play) anim();
      return;
    }

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once,
      onEnter: anim,
    });
    return () => st.kill();
  }, [play, stagger, delay, once]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="reveal-line" style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
            <span data-word-inner className="inline-block will-change-transform">
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
