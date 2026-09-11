import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { collabTracks } from "../lib/content";
import SectionHeading from "../components/SectionHeading";

export default function Collabs({ first = false }) {
  const { t } = useTranslation();

  return (
    <section
      id="collabs"
      className={`py-28 px-6 md:px-10 ${first ? "pt-32 md:pt-40" : "border-t border-paper/10"}`}
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16">
        <SectionHeading kicker={t("collabs.kicker")} title={t("collabs.title")} />

        <div>
          <p className="text-paper-dim mb-2 max-w-md leading-relaxed">{t("collabs.body")}</p>
          <div className="flex flex-col border-t border-paper/10">
            {collabTracks.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative flex items-center justify-between py-4 border-b border-paper/10 overflow-hidden"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-paper/[0.04] group-hover:w-full transition-all duration-500 ease-[var(--ease-snap)]" />
                <div className="relative z-10">
                  <p className="text-paper group-hover:translate-x-1 transition-transform duration-300">{c.title}</p>
                  <p className="text-paper-dim text-sm">feat. {c.withArtist}</p>
                </div>
                <span className="relative z-10 font-mono text-xs text-ochre">{c.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
