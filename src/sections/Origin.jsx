import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Origin() {
  const { t } = useTranslation();
  const bodyRef = useRef(null);
  const words = t("origin.body").split(" ");

  useEffect(() => {
    if (prefersReducedMotion() || !bodyRef.current) return;
    const spans = bodyRef.current.querySelectorAll("[data-scrub-word]");
    gsap.set(spans, { opacity: 0.22 });

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, [words.length]);

  return (
    <section id="origin" className="px-6 md:px-10 py-28 md:py-36">
      <SectionHeading kicker={t("origin.kicker")} title={t("origin.title")} className="mb-10 md:mb-16" />

      <p
        ref={bodyRef}
        className="text-paper text-xl md:text-3xl leading-relaxed md:leading-relaxed max-w-3xl font-display uppercase"
      >
        {words.map((w, i) => (
          <span key={i} data-scrub-word className="inline-block mr-[0.3em]">
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}
