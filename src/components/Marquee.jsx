import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const BASE_SPEED = 40; // px/sec baseline
const MAX_BOOST = 6; // multiplier ceiling from scroll velocity

export default function Marquee({ items, className = "" }) {
  const track = [...items, ...items];
  const trackRef = useRef(null);
  const dirRef = useRef(1);

  useEffect(() => {
    if (prefersReducedMotion() || !trackRef.current) return;

    const el = trackRef.current;
    const width = el.scrollWidth / 2;
    let x = 0;
    let speed = BASE_SPEED;
    let lastScrollY = window.scrollY;
    let velocityBoost = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      dirRef.current = delta >= 0 ? 1 : -1;
      velocityBoost = gsap.utils.clamp(0, BASE_SPEED * MAX_BOOST, Math.abs(delta) * 2.2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    gsap.ticker.add(tick);
    function tick(_time, deltaMs) {
      // decay the scroll-driven boost back to baseline every frame so the
      // marquee settles into a calm drift when the page is still
      velocityBoost = gsap.utils.interpolate(velocityBoost, 0, 0.06);
      speed = BASE_SPEED + velocityBoost;
      x -= (dirRef.current * speed * (deltaMs / 1000));
      if (x <= -width) x += width;
      if (x >= 0) x -= width;
      gsap.set(el, { x });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className={`overflow-hidden border-y border-paper/10 py-3 ${className}`}>
      <div ref={trackRef} className="flex w-max gap-10 will-change-transform">
        {track.map((item, i) => (
          <span key={i} className="hazard-tag text-sm text-paper-dim whitespace-nowrap">
            {item} <span className="text-ochre mx-2">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
