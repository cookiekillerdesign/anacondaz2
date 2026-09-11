import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";
import { heroSlides } from "../lib/content";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Hero({ introDone }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const sliderWrapRef = useRef(null);

  // scroll parallax: slider drifts + scales down slightly as the section
  // scrolls past (depth cue, standard awwwards hero treatment)
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(sliderWrapRef.current, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
      <div ref={sliderWrapRef} className="absolute inset-0">
        <HeroSlider slides={heroSlides} />
      </div>

      <div className="relative z-10 px-6 md:px-10 pb-14 md:pb-20">
        <div className="reveal-line block mb-4">
          <span
            data-word-inner
            className="hazard-tag text-ochre text-sm inline-block will-change-transform"
            style={{
              transform: introDone ? "translateY(0)" : "translateY(110%)",
              transition: "transform 0.7s var(--ease-snap) 0.15s",
            }}
          >
            {t("hero.kicker")}
          </span>
        </div>

        <RevealText
          as="h1"
          text={t("hero.manifesto")}
          play={introDone}
          delay={0.28}
          className="font-display fluid-h1 uppercase leading-[1.15] max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-paper-dim text-base md:text-lg max-w-md mt-5"
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <MagneticButton
            as="Link"
            to="/tours"
            data-cursor="link"
            className="mt-8 inline-flex w-fit items-center gap-3 bg-ochre text-ink px-6 py-3.5 text-sm font-medium overflow-hidden relative group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
              {t("hero.cta")}
            </span>
            <span className="absolute inset-0 bg-paper scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-[var(--ease-snap)]" />
          </MagneticButton>
        </motion.div>
      </div>

      <ScrollCue introDone={introDone} />
    </section>
  );
}

function ScrollCue({ introDone }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={introDone ? { opacity: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="hidden md:flex absolute right-8 bottom-14 z-10 flex-col items-center gap-3"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-paper-dim [writing-mode:vertical-rl]">
        SCROLL
      </span>
      <span className="w-px h-10 bg-paper/30 overflow-hidden relative">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-ochre animate-scroll-cue" />
      </span>
    </motion.div>
  );
}
