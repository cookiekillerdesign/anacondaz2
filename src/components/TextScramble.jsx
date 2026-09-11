import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ";

// Scrambles into the target string once on mount. Skips the effect entirely
// under prefers-reduced-motion — this is the site's one deliberate load
// animation, not a hover-repeat gimmick.
export default function TextScramble({ text, className = "", speed = 28 }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    const totalFrames = text.length * 3;
    frame.current = 0;

    const tick = () => {
      const progress = frame.current / speed;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < progress) {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      frame.current++;
      if (frame.current < totalFrames) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, speed]);

  return <span className={className}>{display}</span>;
}
