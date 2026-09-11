import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { discography, spotify } from "../lib/content";
import Marquee from "../components/Marquee";
import SectionHeading from "../components/SectionHeading";

export default function Discography({ first = false }) {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (
    <section
      id="discography"
      className={`py-28 ${first ? "pt-32 md:pt-40" : "border-t border-paper/10"}`}
    >
      <div className="px-6 md:px-10">
        <SectionHeading kicker={t("discography.kicker")} title={t("discography.title")} titleClassName="max-w-2xl" />
        <p className="text-paper-dim mt-4 max-w-lg">{t("discography.sub")}</p>

        <div className="mt-8 border border-paper/15">
          <iframe
            title="Ночь с астраханцем — Spotify"
            style={{ borderRadius: 0 }}
            src={`https://open.spotify.com/embed/album/${spotify.featuredAlbumId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>

      <Marquee className="my-14" items={discography.map((d) => (isRu ? d.title : d.titleEn))} />

      <div className="px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {discography.map((d, i) => (
          <TiltCard key={d.title} index={i} featured={d.featured}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ochre">{d.year}</span>
              {d.type && (
                <span className="font-mono text-[10px] tracking-wide text-paper-dim border border-paper/20 px-1.5 py-0.5">
                  {d.type}
                </span>
              )}
            </div>
            <p className="font-display text-sm md:text-base leading-snug uppercase group-hover:text-ochre transition-colors">
              {isRu ? d.title : d.titleEn}
            </p>
          </TiltCard>
        ))}
      </div>

      <div className="px-6 md:px-10 mt-10 border border-paper/15">
        <iframe
          title="Anacondaz — весь каталог на Spotify"
          src={`https://open.spotify.com/embed/artist/${spotify.artistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function TiltCard({ children, index, featured }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor="link"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative border border-paper/15 p-4 flex flex-col justify-between aspect-square hover:border-ochre transition-colors overflow-hidden ${
          featured ? "bg-ink-panel-light" : "bg-ink-panel"
        }`}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${glowX} ${glowY}, rgba(253,184,19,0.18), transparent 70%)`,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
