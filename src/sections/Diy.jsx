import { useTranslation } from "react-i18next";
import RevealText from "../components/RevealText";

export default function Diy() {
  const { t } = useTranslation();

  return (
    <section id="diy" className="border-t border-paper/10 py-28 px-6 md:px-10">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-start">
        <p className="hazard-tag text-ochre text-sm">{t("diy.kicker")}</p>

        <div>
          <RevealText
            as="h2"
            text={t("diy.title")}
            className="font-display fluid-h2 uppercase leading-[1.2] max-w-xl"
          />
          <p className="text-paper-dim mt-5 max-w-lg leading-relaxed">{t("diy.body")}</p>
        </div>
      </div>
    </section>
  );
}
