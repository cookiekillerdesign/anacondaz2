import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function CutDivider() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { skewY: -2.2 },
        {
          skewY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div ref={ref} className="h-6 md:h-8 bg-ochre cut-divider-rev origin-left" aria-hidden="true" />
    </div>
  );
}
