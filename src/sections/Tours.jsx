import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { tours } from "../lib/content";
import MagneticButton from "../components/MagneticButton";
import SectionHeading from "../components/SectionHeading";

const monthsRu = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateStr, isRu) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const months = isRu ? monthsRu : monthsEn;
  return { day: d.getDate(), month: months[d.getMonth()] };
}

export default function Tours({ first = false }) {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (
    <section
      id="tours"
      className={`py-28 px-6 md:px-10 ${first ? "pt-32 md:pt-40" : "border-t border-paper/10"}`}
    >
      <SectionHeading kicker={t("tours.kicker")} title={t("tours.title")} className="mb-12" />

      <div className="flex flex-col">
        {tours.map((show, i) => {
          const d = formatDate(show.date, isRu);
          return (
            <motion.div
              key={`${show.city}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative grid grid-cols-[64px_1fr_auto] md:grid-cols-[80px_1fr_1fr_auto] items-center gap-4 py-5 border-b border-paper/10 overflow-hidden"
            >
              <span className="absolute inset-y-0 left-0 w-0 bg-paper/[0.04] group-hover:w-full transition-all duration-500 ease-[var(--ease-snap)]" />

              <div className="relative z-10 font-mono text-ochre leading-none">
                {d ? (
                  <>
                    <div className="text-2xl">{d.day}</div>
                    <div className="text-xs uppercase">{d.month}</div>
                  </>
                ) : (
                  <div className="text-xs uppercase text-paper-dim">{t("tours.tba")}</div>
                )}
              </div>

              <div className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                <p className="text-paper">{isRu ? show.city : show.cityEn}</p>
                <p className="text-paper-dim text-sm">{show.country}</p>
              </div>

              <div className="relative z-10 hidden md:block text-paper-dim text-sm">{show.venue}</div>

              {show.ticketUrl ? (
                <MagneticButton
                  href={show.ticketUrl}
                  data-cursor="link"
                  className="relative z-10 inline-flex w-fit items-center gap-2 border border-paper/30 px-4 py-2 text-xs hover:border-ochre hover:text-ochre transition-colors"
                >
                  {t("tours.cta")}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </MagneticButton>
              ) : (
                <span className="relative z-10 text-paper-dim text-xs">—</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
