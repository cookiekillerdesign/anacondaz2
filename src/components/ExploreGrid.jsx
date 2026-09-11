import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const items = [
  { key: "about", to: "/about" },
  { key: "discography", to: "/discography" },
  { key: "tours", to: "/tours" },
  { key: "booking", to: "/booking" },
];

export default function ExploreGrid() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-paper/10 py-28 px-6 md:px-10">
      <SectionHeading kicker={t("home.explore.kicker")} title={t("home.explore.title")} className="mb-12" />

      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={item.to}
              data-cursor="link"
              className="group relative block border border-paper/15 p-6 md:p-8 overflow-hidden hover:border-ochre transition-colors"
            >
              <span className="absolute inset-0 bg-ochre scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[var(--ease-snap)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl md:text-3xl uppercase group-hover:text-ink transition-colors">
                    {t(`home.explore.${item.key}.title`)}
                  </span>
                  <span className="text-2xl group-hover:text-ink group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </div>
                <p className="text-paper-dim group-hover:text-ink/70 transition-colors max-w-sm">
                  {t(`home.explore.${item.key}.desc`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
