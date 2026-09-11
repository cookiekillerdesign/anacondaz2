import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const SESSION_KEY = "anacondaz-intro-played";

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [skip] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1" || prefersReducedMotion();
    } catch {
      return prefersReducedMotion();
    }
  });
  const rootRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBottomRef = useRef(null);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        document.body.style.overflow = "";
        onDone();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
    })
      .to(
        panelTopRef.current,
        { yPercent: -100, duration: 0.9, ease: "cubic-bezier(0.65,0,0.35,1)" },
        "+=0.15"
      )
      .to(
        panelBottomRef.current,
        { yPercent: 100, duration: 0.9, ease: "cubic-bezier(0.65,0,0.35,1)" },
        "<"
      );

    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (skip) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[90]" aria-hidden="true">
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-ink flex items-end justify-center pb-2 overflow-hidden"
      >
        <img src="/logo.svg" alt="" className="h-10 md:h-14 w-auto opacity-90" />
      </div>
      <div ref={panelBottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink flex items-start justify-center pt-4">
        <span className="font-mono text-ochre text-sm tabular-nums">
          {String(count).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}
