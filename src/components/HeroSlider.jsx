import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Deterministic generative placeholder — gold/black duotone compositions in
// the site's own graphic language (halftone + diagonal cuts), per the redesign
// kit's rule: never fake real photography, use placeholders/generative art
// until the client sends real assets. Swap PLACEHOLDER_SLIDES for real
// 1920x1080 photo URLs in src/lib/content.js (heroSlides) when they arrive.
const compositions = [
  (id) => (
    <g>
      <rect width="1920" height="1080" fill="#0a0a0a" />
      <circle cx="1400" cy="540" r="520" fill="#fdb813" opacity="0.9" />
      <rect x="0" y="0" width="1920" height="1080" fill={`url(#dots-${id})`} />
      <polygon points="0,1080 700,1080 300,600 0,780" fill="#141414" />
    </g>
  ),
  (id) => (
    <g>
      <rect width="1920" height="1080" fill="#141414" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={-200 + i * 260} y="0" width="120" height="1080" fill="#fdb813" opacity={i % 2 ? 0.85 : 0.15} transform={`skewX(-18)`} />
      ))}
      <rect x="0" y="0" width="1920" height="1080" fill={`url(#dots-${id})`} />
    </g>
  ),
  (id) => (
    <g>
      <rect width="1920" height="1080" fill="#0a0a0a" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx="960" cy="540" r={100 + i * 140} fill="none" stroke="#fdb813" strokeWidth="26" opacity={0.9 - i * 0.12} />
      ))}
      <rect x="0" y="0" width="1920" height="1080" fill={`url(#dots-${id})`} />
    </g>
  ),
  (id) => (
    <g>
      <rect width="1920" height="1080" fill="#fdb813" />
      <polygon points="0,0 960,0 0,1080" fill="#0a0a0a" />
      <polygon points="1920,1080 960,1080 1920,0" fill="#141414" />
      <rect x="0" y="0" width="1920" height="1080" fill={`url(#dots-${id})`} opacity="0.5" />
    </g>
  ),
];

function PlaceholderSlide({ index }) {
  const id = `slide-${index}`;
  return (
    <svg viewBox="0 0 1920 1080" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`dots-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#000" opacity="0.35" />
        </pattern>
      </defs>
      {compositions[index % compositions.length](id)}
      <text x="40" y="1040" fontFamily="IBM Plex Mono, monospace" fontSize="20" fill="#f5f1e6" opacity="0.5">
        PHOTO SLOT — 1920×1080 — заменить на реальное фото
      </text>
    </svg>
  );
}

// diagonal wipe: a wide skewed band sweeps in from the right and covers the
// frame with a diagonal leading edge (matches the site's cut-divider motif),
// instead of a flat fade. Only the entering slide needs the full geometry —
// it paints on top of the outgoing one, so the outgoing slide just fades as
// a safety net in case stacking order ever changes.
const wipeVariants = {
  enter: { clipPath: "polygon(120% 0%, 260% 0%, 280% 100%, 140% 100%)" },
  center: { clipPath: "polygon(-30% 0%, 110% 0%, 130% 100%, -10% 100%)" },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function HeroSlider({ slides = [null, null, null], interval = 5500 }) {
  const [active, setActive] = useState(0);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion || slides.length <= 1) return;
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval, reducedMotion]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-ink">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={active}
          variants={reducedMotion ? undefined : wipeVariants}
          initial={reducedMotion ? { opacity: 0 } : "enter"}
          animate={reducedMotion ? { opacity: 1 } : "center"}
          exit={reducedMotion ? { opacity: 0 } : "exit"}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full"
            style={!reducedMotion ? { animation: `kenburns ${interval + 1100}ms linear forwards` } : undefined}
          >
            {slides[active]?.url ? (
              <img src={slides[active].url} alt="" className="w-full h-full object-cover" />
            ) : (
              <PlaceholderSlide index={active} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* legibility gradients for nav + caption overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/60" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 md:right-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="link"
              aria-label={`Slide ${i + 1}`}
              className="relative h-1 w-8 bg-paper/25 overflow-hidden"
            >
              {i === active && !reducedMotion && (
                <span
                  key={active}
                  className="absolute inset-y-0 left-0 bg-ochre"
                  style={{ animation: `slide-progress ${interval}ms linear forwards` }}
                />
              )}
              {i === active && reducedMotion && <span className="absolute inset-0 bg-ochre" />}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1) translate(0, 0); }
          to { transform: scale(1.12) translate(-1%, -1%); }
        }
        @keyframes slide-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
