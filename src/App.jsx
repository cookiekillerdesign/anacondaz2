import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DiscographyPage from "./pages/DiscographyPage";
import ToursPage from "./pages/ToursPage";
import BookingPage from "./pages/BookingPage";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ScrollTrigger, prefersReducedMotion } from "./lib/gsap";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    // keep ScrollTrigger's internal scroll reads in sync with Lenis's
    // virtual scroll position (otherwise pinned/scrubbed triggers drift)
    lenis.on("scroll", ScrollTrigger.update);

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative">
        <Preloader onDone={() => setIntroDone(true)} />
        <Cursor />
        <div className="halftone-overlay" aria-hidden="true" />
        <Nav />
        <RouteChangeHandler lenisRef={lenisRef} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage introDone={introDone} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/discography" element={<DiscographyPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

// on every route change: snap scroll back to top (Lenis owns scroll when
// active, so nudge it directly — plain window.scrollTo won't move a Lenis
// virtual scroll) and re-measure ScrollTrigger positions against the new
// page's DOM.
function RouteChangeHandler({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
