import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Droplets,
  Leaf,
  Award,
  ChevronDown,
  Building2,
  ArrowRight,
  Star,
  Zap,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

// ─── BRAND COLORS ───────────────────────────────────────────────────────────
// Primary turquoise: #3BBFCF / #2AACBC  (extracted from hero bg)
// Accent teal:       #1A9BAB
// Soft sky:          #D6F3F7
// ────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Strona główna", href: "#hero" },
  { label: "Pokaż na mapie", href: "#map" },
  { label: "O nas", href: "#about" },
  { label: "Oferta", href: "#offer" },
  { label: "Współpraca B2B", href: "#b2b" },
];

// ─── REUSABLE ────────────────────────────────────────────────────────────────
function SodaLogo({ white = false }) {
  const text = white ? "text-white" : "text-[#1A9BAB]";
  const wave = white ? "#fff" : "#3BBFCF";
  return (
    <a href="#hero" className="flex items-center gap-1 group select-none">
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="18" fill={wave} opacity=".18" />
        <circle cx="19" cy="19" r="11" fill={wave} opacity=".28" />
        <ellipse cx="19" cy="19" rx="6" ry="9" fill={wave} />
        <path
          d="M7 23 Q13 17 19 23 Q25 29 31 23"
          stroke={white ? "#fff" : "#1A9BAB"}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-black text-xl tracking-tight ${text}`}>
        Soda<span className={white ? "text-white/80" : "text-[#2AACBC]"}>Wave</span>
      </span>
    </a>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <SodaLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => navClick(e, l.href)}
              className="text-sm font-semibold text-gray-600 hover:text-[#2AACBC] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2AACBC] after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+48695864734"
            className="ml-2 bg-[#2AACBC] hover:bg-[#1A9BAB] text-white text-sm font-bold px-4 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-[#2AACBC]/30 flex items-center gap-1.5"
          >
            <Phone size={13} /> +48 695 864 734
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#2AACBC] p-1"
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-[#D6F3F7]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => navClick(e, l.href)}
              className="text-base font-semibold text-gray-700 hover:text-[#2AACBC] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+48695864734"
            className="bg-[#2AACBC] text-white font-bold px-4 py-2.5 rounded-full text-center mt-1"
          >
            Zadzwoń: +48 695 864 734
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(135deg,#fff 55%,#D6F3F7 55%)" }}
    >
      {/* Diagonal turquoise band */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(118deg, #3BBFCF 0%, #3BBFCF 44%, transparent 44%)",
          opacity: 0.13,
        }}
      />

      {/* Decorative bubbles */}
      {[
        { size: 220, x: "72%", y: "8%", op: 0.07 },
        { size: 120, x: "85%", y: "65%", op: 0.1 },
        { size: 60, x: "60%", y: "80%", op: 0.12 },
        { size: 90, x: "10%", y: "75%", op: 0.06 },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: "#3BBFCF",
            opacity: b.op,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-8 w-full py-16">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start z-10">
          {/* Turquoise badge */}
          <span className="inline-flex items-center gap-2 bg-[#D6F3F7] text-[#1A9BAB] text-xs font-bold px-3 py-1.5 rounded-full mb-6 animate-fade-in">
            <Droplets size={13} /> Nowoczesna wymiana cylindrów CO₂
          </span>

          <h1
            className="font-black leading-tight mb-4 animate-slide-up"
            style={{
              fontFamily: "'Nunito', 'Poppins', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              color: "#2AACBC",
              textShadow: "0 2px 24px rgba(42,172,188,0.12)",
            }}
          >
            Poczuj falę <br />
            <span
              style={{
                WebkitTextStroke: "2px #2AACBC",
                color: "transparent",
              }}
            >
              orzeźwienia
            </span>
          </h1>

          <div className="flex items-center gap-1 mb-6">
            <SodaLogo />
          </div>

          <p className="text-gray-600 leading-relaxed max-w-md mb-8 text-base animate-slide-up delay-100">
            SodaWave to nowoczesna i ekologiczna usługa wymiany cylindrów CO₂
            oraz sprzedaży syropów do saturatorów. Nasze autoryzowane punkty
            zapewniają szybki, bezpieczny i wygodny dostęp do wszystkiego,
            czego potrzebujesz do przygotowania napojów w domu. Wybierając
            SodaWave, stawiasz na jakość, wygodę i odpowiedzialność wobec
            środowiska.
          </p>

          <div className="flex flex-wrap gap-3 animate-slide-up delay-200">
            <a
              href="#map"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#map")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#2AACBC] hover:bg-[#1A9BAB] text-white font-bold px-6 py-3 rounded-full transition-all hover:shadow-xl hover:shadow-[#2AACBC]/30 flex items-center gap-2"
            >
              <MapPin size={16} /> Znajdź punkt
            </a>
            <a
              href="#offer"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#offer")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-[#2AACBC] text-[#2AACBC] hover:bg-[#D6F3F7] font-bold px-6 py-3 rounded-full transition-all flex items-center gap-2"
            >
              Nasza oferta <ArrowRight size={16} />
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex gap-8 animate-slide-up delay-300">
            {[
              { label: "Autoryzowanych punktów", value: "100+" },
              { label: "Partnerów handlowych", value: "3" },
              { label: "Lat doświadczenia", value: "5+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-[#2AACBC]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — visual placeholder */}
        <div className="relative flex justify-center items-end z-10 animate-fade-in delay-300">
          {/* Main card */}
          <div
            className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg,#3BBFCF,#1A9BAB)",
              minHeight: 400,
            }}
          >
            {/* Placeholder "team" visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-3">
              {/* Stylised silhouettes */}
              <div className="flex items-end gap-2 mb-4">
                {[
                  { h: 200, w: 80, shift: 0 },
                  { h: 230, w: 90, shift: 0 },
                  { h: 210, w: 80, shift: 0 },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="rounded-t-full opacity-30"
                    style={{
                      width: p.w,
                      height: p.h,
                      background: "#fff",
                    }}
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm font-semibold tracking-widest uppercase">
                Zespół SodaWave
              </span>
            </div>

            {/* Floating product chips */}
            <div className="absolute top-6 left-6 bg-white/90 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-400 inline-block" />
              <span className="text-xs font-bold text-gray-700">Quick Connect</span>
            </div>
            <div className="absolute top-6 right-6 bg-white/90 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
              <span className="text-xs font-bold text-gray-700">Wkręcane</span>
            </div>

            {/* Decorative wave */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full"
              viewBox="0 0 480 80"
              fill="none"
            >
              <path
                d="M0 40 Q120 10 240 40 Q360 70 480 40 L480 80 L0 80 Z"
                fill="white"
                opacity="0.15"
              />
            </svg>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
            <Leaf size={22} className="text-green-500" />
            <div>
              <div className="text-xs text-gray-500">Usługa</div>
              <div className="font-black text-gray-800 text-sm">Ekologiczna</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#map"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#map")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#2AACBC] animate-bounce"
      >
        <span className="text-xs font-semibold tracking-widest uppercase opacity-60">Przewiń</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, title, subtitle, children, light = false }) {
  return (
    <section
      id={id}
      className={`py-20 ${light ? "bg-[#F0FBFD]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-14">
            {subtitle && (
              <span className="inline-block bg-[#D6F3F7] text-[#1A9BAB] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mt-1">
                {title}
              </h2>
            )}
            <div className="mt-4 w-14 h-1.5 bg-[#2AACBC] mx-auto rounded-full" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ─── MAP SECTION ─────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <Section id="map" title="Znajdź punkt wymiany" subtitle="Sieć punktów" light>
      {/* Partners */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          { name: "Stokrotka", color: "#e74c3c", emoji: "🌸" },
          { name: "Lewiatan", color: "#f39c12", emoji: "🦁" },
          { name: "Chorten", color: "#2ecc71", emoji: "🏪" },
        ].map((p) => (
          <div
            key={p.name}
            className="bg-white border-2 border-[#D6F3F7] rounded-2xl px-8 py-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:border-[#2AACBC] transition-all group"
          >
            <span className="text-3xl">{p.emoji}</span>
            <span className="font-black text-gray-700 group-hover:text-[#2AACBC] transition-colors">
              {p.name}
            </span>
            <span className="text-xs text-gray-400">Partner sieci</span>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div
        className="w-full rounded-3xl overflow-hidden shadow-xl relative flex items-center justify-center"
        style={{
          minHeight: 380,
          background: "linear-gradient(135deg,#D6F3F7 0%,#B8EDF5 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <MapPin size={48} className="text-[#2AACBC]" strokeWidth={1.5} />
          <h3 className="text-xl font-black text-gray-700">
            Interaktywna mapa punktów
          </h3>
          <p className="text-gray-500 max-w-sm">
            Tutaj znajdzie się interaktywna mapa Google Maps z zaznaczonymi
            punktami wymiany cylindrów CO₂ w całej Polsce.
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="bg-[#2AACBC] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#1A9BAB] transition-all"
          >
            <ExternalLink size={15} /> Otwórz mapę
          </a>
        </div>

        {/* Decorative map pins */}
        {[
          { top: "20%", left: "25%", label: "Warszawa" },
          { top: "55%", left: "45%", label: "Łódź" },
          { top: "30%", left: "65%", label: "Białystok" },
          { top: "70%", left: "20%", label: "Wrocław" },
          { top: "65%", left: "70%", label: "Lublin" },
        ].map((pin) => (
          <div
            key={pin.label}
            className="absolute flex flex-col items-center"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className="w-4 h-4 rounded-full bg-[#2AACBC] border-2 border-white shadow-md animate-pulse" />
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  const pillars = [
    {
      icon: <Leaf size={28} />,
      title: "Ekologia",
      desc: "Wielokrotne użycie cylindrów CO₂ zamiast jednorazowych butelek. Mniej plastiku, mniejszy ślad węglowy.",
    },
    {
      icon: <Zap size={28} />,
      title: "Wygoda",
      desc: "Sieć punktów w popularnych sklepach spożywczych. Szybka wymiana bez czekania i zamawiania online.",
    },
    {
      icon: <Award size={28} />,
      title: "Polska firma",
      desc: "Działamy lokalnie, rozwijamy się w całym kraju. Wspieramy polską sieć handlową i polskich partnerów.",
    },
    {
      icon: <Star size={28} />,
      title: "Jakość",
      desc: "Oryginalne cylindry, atestowane i bezpieczne. Pełna kontrola jakości i certyfikowane napełnianie.",
    },
  ];

  return (
    <Section id="about" title="O nas" subtitle="Kim jesteśmy">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
        <div>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            SodaWave to marka należąca do firmy{" "}
            <strong className="text-[#2AACBC]">PRUMET</strong> – polskiej firmy
            z pasją do innowacji i odpowiedzialności ekologicznej. Od lat
            rozwijamy sieć autoryzowanych punktów wymiany cylindrów CO₂ do
            popularnych saturatorów domowych.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Naszą misją jest uczynienie ekologicznych napojów domowych
            dostępnymi dla każdego – szybko, tanio i wygodnie. Współpracujemy z
            największymi sieciami handlowymi w Polsce, w tym Stokrotką,
            Lewiatanem i Chortenem.
          </p>
        </div>
        <div
          className="rounded-3xl p-8 flex flex-col gap-4"
          style={{
            background: "linear-gradient(135deg,#3BBFCF,#1A9BAB)",
          }}
        >
          {[
            ["NIP", "8252205177"],
            ["Firma", "PRUMET"],
            ["Telefon", "+48 695 864 734"],
            ["Model", "Sieć punktów wymiany"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-white/20 pb-3 last:border-0 last:pb-0">
              <span className="text-white/70 text-sm font-semibold">{k}</span>
              <span className="text-white font-bold text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="bg-[#F0FBFD] hover:bg-white border-2 border-[#D6F3F7] hover:border-[#2AACBC] rounded-2xl p-6 text-center transition-all group hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-[#D6F3F7] group-hover:bg-[#2AACBC] text-[#2AACBC] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all">
              {p.icon}
            </div>
            <h3 className="font-black text-gray-800 mb-2">{p.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── OFFER SECTION ────────────────────────────────────────────────────────────
function OfferSection() {
  const cylinders = [
    {
      type: "Quick Connect",
      color: "#ec4899",
      bg: "#fdf2f8",
      border: "#f9a8d4",
      icon: <RefreshCw size={32} />,
      desc: "Szybka wymiana bez narzędzi – wystarczy podłączyć i cieszyć się gazowanym napojem. Idealne dla modeli SodaStream z systemem Quick Connect.",
      compat: ["SodaStream Source", "SodaStream Play", "SodaStream Spirit"],
    },
    {
      type: "Wkręcane",
      color: "#3b82f6",
      bg: "#eff6ff",
      border: "#bfdbfe",
      icon: <Zap size={32} />,
      desc: "Klasyczne cylindry z gwintem pasujące do większości urządzeń gazujących dostępnych na rynku. Niezawodne i powszechnie dostępne.",
      compat: ["SodaStream Crystal", "SodaStream Fizzi", "Inne marki"],
    },
  ];

  const syrups = [
    { name: "Pepsi", color: "#1a1a6e", emoji: "🥤" },
    { name: "Mirinda", color: "#f97316", emoji: "🟠" },
    { name: "7UP", color: "#22c55e", emoji: "🟢" },
  ];

  return (
    <Section id="offer" title="Nasza oferta" subtitle="Produkty" light>
      {/* Cylinders */}
      <h3 className="text-xl font-black text-gray-700 mb-6 flex items-center gap-2">
        <span className="w-6 h-1 bg-[#2AACBC] rounded-full inline-block" />
        Cylindry CO₂
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {cylinders.map((c) => (
          <div
            key={c.type}
            className="rounded-3xl p-8 border-2 hover:shadow-xl transition-all"
            style={{
              background: c.bg,
              borderColor: c.border,
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: c.color, color: "white" }}
            >
              {c.icon}
            </div>
            <h4
              className="text-xl font-black mb-3"
              style={{ color: c.color }}
            >
              Cylinder {c.type}
            </h4>
            <p className="text-gray-600 mb-5 text-sm leading-relaxed">{c.desc}</p>
            <div className="flex flex-wrap gap-2">
              {c.compat.map((m) => (
                <span
                  key={m}
                  className="text-xs font-semibold px-3 py-1 rounded-full border"
                  style={{ borderColor: c.color, color: c.color }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Syrups */}
      <h3 className="text-xl font-black text-gray-700 mb-6 flex items-center gap-2">
        <span className="w-6 h-1 bg-[#2AACBC] rounded-full inline-block" />
        Syropy smakowe
      </h3>
      <div className="grid sm:grid-cols-3 gap-6">
        {syrups.map((s) => (
          <div
            key={s.name}
            className="bg-white rounded-3xl p-8 border-2 border-[#D6F3F7] flex flex-col items-center gap-3 hover:border-[#2AACBC] hover:shadow-lg transition-all"
          >
            <span className="text-5xl">{s.emoji}</span>
            <h4 className="text-2xl font-black" style={{ color: s.color }}>
              {s.name}
            </h4>
            <p className="text-xs text-gray-500 text-center">
              Oryginalny syrop do saturatorów
            </p>
            <span className="bg-[#D6F3F7] text-[#1A9BAB] text-xs font-bold px-3 py-1 rounded-full">
              Dostępny w punktach
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── B2B SECTION ──────────────────────────────────────────────────────────────
function B2BSection() {
  const benefits = [
    "Dedykowany opiekun klienta B2B",
    "Preferencyjne warunki cenowe",
    "Dostawa do punktu sprzedaży",
    "Materiały marketingowe i POS",
    "Szkolenia dla personelu",
    "Elastyczne warunki rozliczeń",
  ];

  return (
    <Section id="b2b" title="Współpraca B2B" subtitle="Dla partnerów">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Szukasz partnera do wzbogacenia oferty swojego sklepu o produkty
            ekologiczne? Dołącz do sieci SodaWave i zaoferuj swoim klientom
            wygodną wymianę cylindrów CO₂ oraz markowe syropy.
          </p>
          <ul className="space-y-3 mb-8">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D6F3F7] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#2AACBC]" />
                </div>
                <span className="text-gray-700 font-medium">{b}</span>
              </li>
            ))}
          </ul>
          <a
            href="tel:+48695864734"
            className="bg-[#2AACBC] hover:bg-[#1A9BAB] text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-[#2AACBC]/30 inline-flex items-center gap-2"
          >
            <Phone size={16} /> Zadzwoń i omów szczegóły
          </a>
        </div>

        <div
          className="rounded-3xl p-8 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#2AACBC,#1A7A8A)" }}
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <Building2 size={40} className="mb-5 opacity-80" />
          <h3 className="text-2xl font-black mb-3">Zostań partnerem</h3>
          <p className="text-white/80 mb-6 text-sm leading-relaxed">
            Skontaktuj się z nami i dowiedz się, jak SodaWave może zwiększyć
            ruch w Twoim sklepie i zadowolenie klientów.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <Phone size={18} className="flex-shrink-0" />
              <span className="font-bold">+48 695 864 734</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <Building2 size={18} className="flex-shrink-0" />
              <span className="font-bold">PRUMET | NIP: 8252205177</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <Section id="contact" title="Kontakt" subtitle="Skontaktuj się" light>
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: <Phone size={26} />,
            title: "Telefon",
            value: "+48 695 864 734",
            href: "tel:+48695864734",
          },
          {
            icon: <Mail size={26} />,
            title: "E-mail",
            value: "kontakt@sodawave.pl",
            href: "mailto:kontakt@sodawave.pl",
          },
          {
            icon: <MapPin size={26} />,
            title: "Siedziba",
            value: "Polska",
            href: "#map",
          },
        ].map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="bg-white border-2 border-[#D6F3F7] hover:border-[#2AACBC] rounded-2xl p-8 flex flex-col items-center gap-3 text-center hover:shadow-lg transition-all group"
          >
            <div className="w-14 h-14 bg-[#D6F3F7] group-hover:bg-[#2AACBC] text-[#2AACBC] group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
              {c.icon}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {c.title}
            </span>
            <span className="font-black text-gray-800 group-hover:text-[#2AACBC] transition-colors">
              {c.value}
            </span>
          </a>
        ))}
      </div>

      {/* Simple contact form placeholder */}
      <div className="bg-white border-2 border-[#D6F3F7] rounded-3xl p-8 max-w-xl mx-auto">
        <h3 className="text-xl font-black text-gray-800 mb-6 text-center">
          Napisz do nas
        </h3>
        <div className="space-y-4">
          {[
            { label: "Imię i nazwisko", type: "text", ph: "Jan Kowalski" },
            { label: "Adres e-mail", type: "email", ph: "jan@firma.pl" },
            { label: "Telefon", type: "tel", ph: "+48 ___  ___ ___" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.ph}
                className="w-full border-2 border-gray-200 focus:border-[#2AACBC] rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
              Wiadomość
            </label>
            <textarea
              rows={4}
              placeholder="Twoja wiadomość..."
              className="w-full border-2 border-gray-200 focus:border-[#2AACBC] rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
            />
          </div>
          <button className="w-full bg-[#2AACBC] hover:bg-[#1A9BAB] text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#2AACBC]/30">
            Wyślij wiadomość
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: "linear-gradient(135deg,#1A7A8A,#0f5f6d)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <SodaLogo white />
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              Nowoczesna i ekologiczna usługa wymiany cylindrów CO₂ oraz
              sprzedaży syropów do saturatorów.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(l.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-4">Dane firmy</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <span className="text-white font-semibold">Firma:</span> PRUMET
              </li>
              <li>
                <span className="text-white font-semibold">NIP:</span>{" "}
                8252205177
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} />
                <a
                  href="tel:+48695864734"
                  className="hover:text-white transition-colors"
                >
                  +48 695 864 734
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} />
                <a
                  href="mailto:kontakt@sodawave.pl"
                  className="hover:text-white transition-colors"
                >
                  kontakt@sodawave.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} SodaWave / PRUMET. Wszelkie prawa
            zastrzeżone.
          </p>
          <p className="text-white/30 text-xs">
            NIP: 8252205177 | Polska
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Nunito', 'Poppins', 'Segoe UI', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in  { animation: fade-in  0.8s ease both; }
        .animate-slide-up { animation: slide-up 0.7s ease both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.35s; }

        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar />
      <Hero />
      <MapSection />
      <AboutSection />
      <OfferSection />
      <B2BSection />
      <ContactSection />
      <Footer />
    </div>
  );
}