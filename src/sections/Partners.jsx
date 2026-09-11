import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { partners } from "../lib/content";

export default function Partners() {
  const { t } = useTranslation();

  return (
    <section id="partners" className="border-t border-paper/10 py-20 px-6 md:px-10">
      <p className="hazard-tag text-ochre text-sm mb-8">{t("partners.kicker")}</p>
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        {partners.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xl md:text-2xl text-paper-dim hover:text-ochre hover:tracking-wide transition-all duration-300 uppercase"
          >
            {p.name}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
