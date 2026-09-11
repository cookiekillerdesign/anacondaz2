import { useTranslation } from "react-i18next";
import MagneticButton from "../components/MagneticButton";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 text-center">
      <span className="hazard-tag text-ochre text-sm mb-6">404</span>
      <h1 className="font-display fluid-h1 uppercase leading-[1.15] mb-8">
        {t("notFound.title")}
      </h1>
      <MagneticButton
        as="Link"
        to="/"
        data-cursor="link"
        className="inline-flex items-center gap-2 border border-paper/30 px-6 py-3 text-sm hover:border-ochre hover:text-ochre transition-colors"
      >
        {t("footer.backHome")}
      </MagneticButton>
    </section>
  );
}
