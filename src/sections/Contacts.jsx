import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { socials, bookingContact } from "../lib/content";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <section id="contacts" className="relative pt-32 md:pt-40 pb-24 px-6 md:px-10 overflow-hidden">
      <SectionHeading kicker={t("contacts.kicker")} title={t("contacts.title")} className="mb-10" />

      <div className="flex flex-wrap gap-x-10 gap-y-3 mb-4 relative z-10">
        {socials.map((s, i) => (
          <MagneticButton
            key={s.name}
            as="a"
            href={s.url}
            data-cursor="link"
            className="group inline-flex items-center gap-2 text-paper-dim hover:text-ochre transition-colors text-lg"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {s.name}
            </motion.span>
            <span className="inline-block -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              ↗
            </span>
          </MagneticButton>
        ))}
      </div>

      <p className="relative z-10 font-mono text-sm text-paper-dim mt-8">{bookingContact.email}</p>

      {/* big outlined wordmark watermark — subtle signature flourish */}
      <div aria-hidden="true" className="select-none pointer-events-none -mb-4 md:-mb-8 mt-10">
        <span
          className="block font-display uppercase leading-none text-transparent"
          style={{
            fontSize: "clamp(3rem, 14vw, 11rem)",
            WebkitTextStroke: "1px rgba(245,241,230,0.12)",
          }}
        >
          ANACONDAZ
        </span>
      </div>
    </section>
  );
}
