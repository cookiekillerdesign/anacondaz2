import { useEffect, useRef } from "react";
import RevealText from "./RevealText";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

export default function SectionHeading({ kicker, title, className = "", titleClassName = "" }) {
  const kickerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !kickerRef.current) return;
    gsap.set(kickerRef.current, { autoAlpha: 0, x: -12 });
    const st = ScrollTrigger.create({
      trigger: kickerRef.current,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(kickerRef.current, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }),
    });
    return () => st.kill();
  }, []);

  return (
    <div className={className}>
      <p ref={kickerRef} className="hazard-tag text-ochre text-sm mb-5">
        {kicker}
      </p>
      <RevealText
        as="h2"
        text={title}
        className={`font-display fluid-h2 uppercase leading-[1.2] ${titleClassName}`}
      />
    </div>
  );
}
