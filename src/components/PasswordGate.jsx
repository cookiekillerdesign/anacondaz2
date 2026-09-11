import { useState } from "react";
import { useTranslation } from "react-i18next";

const CORRECT = "1111";
const FILE = "/anacondaz-presskit.pdf";

export default function PasswordGate() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === CORRECT) {
      setUnlocked(true);
      setWrong(false);
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="border border-paper/20 p-5 mt-8 max-w-sm">
      <p className="hazard-tag text-xs text-ochre mb-1">{t("booking.materials.title")}</p>
      <p className="text-paper-dim text-xs mb-4 leading-relaxed">{t("booking.materials.hint")}</p>

      {unlocked ? (
        <a
          href={FILE}
          download
          className="inline-flex items-center gap-2 border border-ochre text-ochre px-4 py-2 text-sm hover:bg-ochre hover:text-ink transition-colors"
        >
          {t("booking.materials.download")}
        </a>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            placeholder={t("booking.materials.placeholder")}
            className="flex-1 bg-transparent border border-paper/30 px-3 py-2 text-sm text-paper placeholder:text-paper-dim focus:border-ochre outline-none"
          />
          <button
            type="submit"
            className="border border-paper/30 px-4 py-2 text-sm hover:border-ochre hover:text-ochre transition-colors"
          >
            {t("booking.materials.unlock")}
          </button>
        </form>
      )}
      {wrong && <p className="text-xs text-ochre mt-2">{t("booking.materials.wrong")}</p>}
    </div>
  );
}
