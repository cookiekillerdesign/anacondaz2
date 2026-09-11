import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { socials } from "../lib/content";

export default function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-paper/10 py-8 px-6 md:px-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="text-sm text-paper-dim hover:text-ochre transition-colors"
            >
              {s.name}
            </a>
          ))}
          <Link to="/contacts" data-cursor="link" className="text-sm text-ochre hover:text-paper transition-colors">
            {t("nav.contacts")} →
          </Link>
        </div>

        <div className="flex items-center gap-6 text-sm text-paper-dim">
          <span>{t("footer.rights")}</span>
          <span className="font-mono">ANACONDAZ.RU</span>
        </div>
      </div>
    </footer>
  );
}
