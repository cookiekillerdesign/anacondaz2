import { useTranslation } from "react-i18next";
import { bookingContact } from "../lib/content";
import MagneticButton from "../components/MagneticButton";
import PasswordGate from "../components/PasswordGate";
import SectionHeading from "../components/SectionHeading";

export default function Booking({ first = false }) {
  const { t } = useTranslation();

  return (
    <section
      id="booking"
      className={`py-28 px-6 md:px-10 bg-ink-panel ${first ? "pt-32 md:pt-40" : "border-t border-paper/10"}`}
    >
      <div className="grid md:grid-cols-[1fr_auto] items-end gap-10">
        <div>
          <SectionHeading kicker={t("booking.kicker")} title={t("booking.title")} titleClassName="max-w-2xl" />
          <p className="text-paper-dim mt-5 max-w-lg leading-relaxed">{t("booking.body")}</p>
          <PasswordGate />
        </div>

        <div className="flex flex-col gap-3">
          <MagneticButton
            as="a"
            href={`mailto:${bookingContact.email}`}
            data-cursor="link"
            className="inline-flex w-fit items-center gap-3 bg-ochre text-ink px-6 py-3.5 text-sm font-medium overflow-hidden relative group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
              {t("booking.cta")}
            </span>
            <span className="absolute inset-0 bg-paper scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-[var(--ease-snap)]" />
          </MagneticButton>
          <a href={`tel:${bookingContact.phone.replace(/\s/g, "")}`} data-cursor="link" className="font-mono text-sm text-paper-dim hover:text-ochre transition-colors">
            {bookingContact.phone}
          </a>
          <span className="font-mono text-sm text-paper-dim">{bookingContact.email}</span>
        </div>
      </div>
    </section>
  );
}
