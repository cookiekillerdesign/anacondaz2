import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { key: "home", to: "/" },
  { key: "about", to: "/about" },
  { key: "discography", to: "/discography" },
  { key: "tours", to: "/tours" },
  { key: "booking", to: "/booking" },
  { key: "contacts", to: "/contacts" },
];

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close the mobile menu automatically whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled && !open ? "bg-ink/90 backdrop-blur border-b border-paper/10" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/" className="block relative z-50" data-cursor="link">
          <img src="/logo.svg" alt="Anacondaz" className="h-7 md:h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.key}
              to={l.to}
              end={l.to === "/"}
              data-cursor="link"
              className={({ isActive }) =>
                `group relative text-sm transition-colors py-1 ${
                  isActive ? "text-ochre" : "text-paper-dim hover:text-paper"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(`nav.${l.key}`)}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px w-full bg-ochre origin-left transition-transform duration-300 ease-[var(--ease-snap)] ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={toggleLang}
            data-cursor="link"
            className="hazard-tag text-xs border border-paper/30 px-2 py-1 text-paper hover:border-ochre hover:text-ochre transition-colors"
          >
            {i18n.language === "ru" ? "EN" : "RU"}
          </button>
        </nav>

        <button
          className="md:hidden relative z-50 text-paper text-sm border border-paper/30 px-3 py-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden fixed inset-0 bg-ink flex flex-col justify-center px-6 gap-2"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: "cubic-bezier(0.16,1,0.3,1)" }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block font-display text-3xl uppercase py-2.5 border-b border-paper/10 ${
                      isActive ? "text-ochre" : "text-paper active:text-ochre"
                    }`
                  }
                >
                  {t(`nav.${l.key}`)}
                </NavLink>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + links.length * 0.06, duration: 0.5 }}
              onClick={toggleLang}
              className="hazard-tag text-xs self-start mt-6 border border-paper/30 px-2 py-1 text-paper"
            >
              {i18n.language === "ru" ? "EN" : "RU"}
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
