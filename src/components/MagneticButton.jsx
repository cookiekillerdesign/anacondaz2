import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

export default function MagneticButton({ children, href, to, className = "", as = "a", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // "Link" = internal client-side route (React Router), "a" = plain anchor
  // (external unless it's a #hash/mailto/tel, in which case skip target=_blank)
  const isInternalHref = typeof href === "string" && /^(#|mailto:|tel:)/.test(href);
  const Comp = as === "Link" ? MotionLink : motion[as];
  const linkProps =
    as === "Link"
      ? { to }
      : as === "a"
        ? { href, ...(isInternalHref ? {} : { target: "_blank", rel: "noreferrer" }) }
        : {};

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...linkProps}
      {...props}
    >
      {children}
    </Comp>
  );
}
