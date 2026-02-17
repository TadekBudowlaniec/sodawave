import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
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
  ExternalLink,
} from "lucide-react";

// Configure default Leaflet marker icons so they load correctly with Vite
if (L && L.Icon && L.Icon.Default) {
  // eslint-disable-next-line no-underscore-dangle
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}

// ─── BRAND COLORS ─────────────────────────────────────────────────────────
// Primary turquoise : #3BBFCF / #2AACBC
// Accent teal       : #1A9BAB
// Soft sky          : #D6F3F7
// ──────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Strona główna",  href: "#hero"  },
  { label: "Pokaż na mapie", href: "#map"   },
  { label: "O nas",          href: "#about" },
  { label: "Oferta",         href: "#offer" },
  { label: "Współpraca B2B", href: "#b2b"   },
];

const scroll = (href) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

const POLAND_CENTER = [52.1, 19.4];

const MAP_POINTS = [
  {
    id: 1,
    partner: "Stokrotka",
    city: "Warszawa",
    name: "Stokrotka Warszawa – Mokotów",
    address: "ul. Puławska 120, Warszawa",
    position: [52.196, 21.022],
  },
  {
    id: 2,
    partner: "Lewiatan",
    city: "Łódź",
    name: "Lewiatan Łódź – Retkinia",
    address: "ul. Maratońska 45, Łódź",
    position: [51.747, 19.406],
  },
  {
    id: 3,
    partner: "Chorten",
    city: "Białystok",
    name: "Chorten Białystok – Centrum",
    address: "ul. Lipowa 30, Białystok",
    position: [53.132, 23.164],
  },
  {
    id: 4,
    partner: "Stokrotka",
    city: "Wrocław",
    name: "Stokrotka Wrocław – Krzyki",
    address: "ul. Powstańców Śląskich 180, Wrocław",
    position: [51.087, 17.020],
  },
  {
    id: 5,
    partner: "Lewiatan",
    city: "Lublin",
    name: "Lewiatan Lublin – Czechów",
    address: "ul. Północna 36, Lublin",
    position: [51.262, 22.566],
  },
  {
    id: 6,
    partner: "Chorten",
    city: "Kraków",
    name: "Chorten Kraków – Podgórze",
    address: "ul. Wielicka 85, Kraków",
    position: [50.028, 19.959],
  },
  {
    id: 7,
    partner: "Stokrotka",
    city: "Poznań",
    name: "Stokrotka Poznań – Jeżyce",
    address: "ul. Dąbrowskiego 120, Poznań",
    position: [52.412, 16.897],
  },
  {
    id: 8,
    partner: "Lewiatan",
    city: "Gdańsk",
    name: "Lewiatan Gdańsk – Przymorze",
    address: "ul. Kołobrzeska 50, Gdańsk",
    position: [54.404, 18.591],
  },
  {
    id: 9,
    partner: "Chorten",
    city: "Rzeszów",
    name: "Chorten Rzeszów – Śródmieście",
    address: "ul. Piłsudskiego 10, Rzeszów",
    position: [50.041, 21.999],
  },
  {
    id: 10,
    partner: "Stokrotka",
    city: "Szczecin",
    name: "Stokrotka Szczecin – Prawobrzeże",
    address: "ul. Andrzeja Struga 25, Szczecin",
    position: [53.399, 14.620],
  },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────
function SodaLogo({ white = false }) {
  const wave = white ? "#fff" : "#3BBFCF";
  return (
    <a
      href="#hero"
      onClick={(e) => { e.preventDefault(); scroll("#hero"); }}
      className="flex items-center gap-1.5 select-none"
    >
      <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
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
      <span
        className="font-black text-xl tracking-tight"
        style={{ color: white ? "#fff" : "#1A9BAB" }}
      >
        Soda
        <span style={{ color: white ? "rgba(255,255,255,0.8)" : "#2AACBC" }}>
          Wave
        </span>
      </span>
    </a>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scroll(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <SodaLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="text-sm font-semibold text-gray-600 hover:text-[#2AACBC] transition-colors"
              style={{ position: "relative" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+48695864734"
            className="ml-2 text-white text-sm font-bold px-5 py-2 rounded-full transition-all flex items-center gap-2"
            style={{ background: "#2AACBC" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1A9BAB")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2AACBC")}
          >
            <Phone size={13} /> +48 695 864 734
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1"
          style={{ color: "#2AACBC" }}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          background: "#fff",
          borderTop: "1px solid #D6F3F7",
        }}
      >
        <nav className="flex flex-col px-6 py-5 gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="text-base font-semibold text-gray-700"
              style={{ color: "#374151" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+48695864734"
            className="text-white font-bold px-4 py-3 rounded-full text-center"
            style={{ background: "#2AACBC" }}
          >
            Zadzwoń: +48 695 864 734
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "72px",
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 55%, #D6F3F7 55%)",
      }}
    >
      {/* Diagonal turquoise band */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(118deg, #3BBFCF 0%, #3BBFCF 44%, transparent 44%)",
          opacity: 0.11,
          pointerEvents: "none",
        }}
      />

      {/* Decorative bubbles */}
      {[
        { size: 220, x: "72%", y: "6%",  op: 0.07 },
        { size: 120, x: "84%", y: "62%", op: 0.09 },
        { size: 60,  x: "60%", y: "78%", op: 0.11 },
        { size: 90,  x: "9%",  y: "72%", op: 0.06 },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: "#3BBFCF",
            opacity: b.op,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        className="max-w-7xl mx-auto px-6 w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
          gap: "2rem",
          padding: "4rem 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT */}
        <div className="flex flex-col items-start">
          <span
            className="animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#D6F3F7",
              color: "#1A9BAB",
              fontSize: "11px",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "999px",
              marginBottom: "20px",
              letterSpacing: "0.04em",
            }}
          >
            <Droplets size={13} /> Nowoczesna wymiana cylindrów CO₂
          </span>

          <h1
            className="animate-slide-up"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#2AACBC",
              marginBottom: "16px",
              textShadow: "0 2px 24px rgba(42,172,188,0.12)",
            }}
          >
            Poczuj falę{" "}
            <br />
            <span
              style={{
                WebkitTextStroke: "2.5px #2AACBC",
                color: "transparent",
              }}
            >
              orzeźwienia
            </span>
          </h1>

          <div style={{ marginBottom: "20px" }}>
            <SodaLogo />
          </div>

          <p
            className="animate-slide-up delay-100"
            style={{
              color: "#4b5563",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "28px",
              fontSize: "15px",
            }}
          >
            SodaWave to nowoczesna i ekologiczna usługa wymiany cylindrów CO₂
            oraz sprzedaży syropów do saturatorów. Nasze autoryzowane punkty
            zapewniają szybki, bezpieczny i wygodny dostęp do wszystkiego,
            czego potrzebujesz do przygotowania napojów w domu.
          </p>

          <div
            className="animate-slide-up delay-200"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
          >
            <a
              href="#map"
              onClick={(e) => { e.preventDefault(); scroll("#map"); }}
              style={{
                background: "#2AACBC",
                color: "#fff",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: "0 4px 14px rgba(42,172,188,0.3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A9BAB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2AACBC")}
            >
              <MapPin size={16} /> Znajdź punkt
            </a>
            <a
              href="#offer"
              onClick={(e) => { e.preventDefault(); scroll("#offer"); }}
              style={{
                border: "2px solid #2AACBC",
                color: "#2AACBC",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D6F3F7")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Nasza oferta <ArrowRight size={16} />
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-slide-up delay-300"
            style={{ display: "flex", gap: "36px", marginTop: "36px" }}
          >
            {[
              { label: "Autoryzowanych punktów", value: "100+" },
              { label: "Partnerów handlowych",   value: "3"    },
              { label: "Lat doświadczenia",       value: "5+"   },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2AACBC", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — visual card */}
        <div
          className="animate-fade-in delay-300"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              minHeight: "400px",
              borderRadius: "24px",
              background: "linear-gradient(145deg, #3BBFCF, #1A9BAB)",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(42,172,188,0.35)",
              position: "relative",
            }}
          >
            {/* Silhouettes placeholder */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: "32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginBottom: "16px" }}>
                {[
                  { h: 190, w: 76 },
                  { h: 220, w: 86 },
                  { h: 200, w: 76 },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      width: p.w,
                      height: p.h,
                      background: "#fff",
                      opacity: 0.25,
                      borderRadius: "50% 50% 0 0",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Zespół SodaWave
              </span>
            </div>

            {/* Floating chips */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "rgba(255,255,255,0.93)",
                borderRadius: "16px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ec4899", display: "inline-block" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>Quick Connect</span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.93)",
                borderRadius: "16px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>Wkręcane</span>
            </div>

            {/* Wave decoration */}
            <svg
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}
              viewBox="0 0 460 80"
              fill="none"
            >
              <path
                d="M0 40 Q115 10 230 40 Q345 70 460 40 L460 80 L0 80 Z"
                fill="white"
                opacity="0.12"
              />
            </svg>
          </div>

          {/* Floating eco badge */}
          <div
            style={{
              position: "absolute",
              bottom: "-16px",
              left: "-16px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Leaf size={22} color="#22c55e" />
            <div>
              <div style={{ fontSize: "10px", color: "#9ca3af" }}>Usługa</div>
              <div style={{ fontWeight: 900, color: "#1f2937", fontSize: "13px" }}>Ekologiczna</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#map"
        onClick={(e) => { e.preventDefault(); scroll("#map"); }}
        className="animate-bounce"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          color: "#2AACBC",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
          Przewiń
        </span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────
function Section({ id, title, subtitle, children, light = false }) {
  return (
    <section
      id={id}
      style={{ padding: "80px 0", background: light ? "#F0FBFD" : "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {(title || subtitle) && (
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            {subtitle && (
              <span
                style={{
                  display: "inline-block",
                  background: "#D6F3F7",
                  color: "#1A9BAB",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 14px",
                  borderRadius: "999px",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {subtitle}
              </span>
            )}
            {title && (
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  fontWeight: 900,
                  color: "#1f2937",
                  marginTop: "4px",
                }}
              >
                {title}
              </h2>
            )}
            <div
              style={{
                width: "56px",
                height: "6px",
                background: "#2AACBC",
                borderRadius: "999px",
                margin: "16px auto 0",
              }}
            />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ─── MAP SECTION ──────────────────────────────────────────────────────────
function MapSection() {
  return (
    <Section
      id="map"
      title="Znajdź punkt wymiany"
      subtitle="Sieć punktów w Polsce"
      light
    >
      <div
        className="soda-map-shell"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* Map with search */}
        <MapWithSearch />

        {/* Side panel with partner legend */}
        <div
          className="soda-map-panel"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "2px solid #D6F3F7",
            boxShadow: "0 10px 30px rgba(15, 118, 110, 0.08)",
            padding: "24px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={20} color="#2AACBC" />
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                color: "#1f2937",
              }}
            >
              Partnerzy SodaWave
            </h3>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            Punkty wymiany cylindrów CO₂ i sprzedaży syropów znajdziesz w
            popularnych sieciach handlowych w całej Polsce. Wybierz miasto, aby
            zobaczyć najbliższy sklep.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "4px",
            }}
          >
            {["Stokrotka", "Lewiatan", "Chorten"].map((name) => (
              <span
                key={name}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "#F0FBFD",
                  border: "1px solid #D6F3F7",
                  color: "#1A9BAB",
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: "8px",
              paddingTop: "12px",
              borderTop: "1px dashed #E5E7EB",
              fontSize: "12px",
              color: "#9ca3af",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span>• Kliknij marker na mapie, aby zobaczyć szczegóły punktu.</span>
            <span>• Wszystkie punkty oferują: cylindry CO₂ oraz syropy smakowe.</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MapWithSearch() {
  const [searchCity, setSearchCity] = useState("");
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  const normalized = searchCity.trim().toLowerCase();
  const visiblePoints = normalized
    ? MAP_POINTS.filter((p) => p.city.toLowerCase().includes(normalized))
    : MAP_POINTS;

  // Inicjalizacja mapy Leaflet tylko raz
  useEffect(() => {
    if (!mapContainerRef.current || leafletMapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(POLAND_CENTER, 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    leafletMapRef.current = map;

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // Aktualizacja markerów przy zmianie filtrowanych punktów
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    visiblePoints.forEach((p) => {
      const marker = L.marker(p.position).addTo(map);
      marker.bindPopup(
        `<div style="min-width:180px">
           <div style="font-size:12px;font-weight:800;color:#111827;margin-bottom:2px">
             ${p.name}
           </div>
           <div style="font-size:11px;color:#6b7280;margin-bottom:6px">
             ${p.address} · ${p.city}
           </div>
           <div style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px;border-radius:999px;background:#D6F3F7;border:1px solid #2AACBC;font-size:10px;font-weight:700;color:#0f766e;margin-bottom:4px">
             Dostępne: Cylindry i Syropy
           </div>
           <div style="margin-top:4px;font-size:10px;color:#9ca3af">
             Partner: ${p.partner}
           </div>
         </div>`
      );
      markersRef.current.push(marker);
    });

    if (visiblePoints.length > 0) {
      map.setView(visiblePoints[0].position, 8);
    } else {
      map.setView(POLAND_CENTER, 6);
    }
  }, [visiblePoints]);

  return (
    <div
      className="soda-map-container"
      style={{
        background: "linear-gradient(135deg, #D6F3F7, #B8EDF5)",
        borderRadius: "24px",
        padding: "18px 18px 16px",
        boxShadow: "0 10px 40px rgba(15, 118, 110, 0.16)",
        border: "1px solid rgba(148, 211, 221, 0.7)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "32px",
              borderRadius: "999px",
              background: "#2AACBC",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0f766e",
              }}
            >
              Mapa punktów
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#1f2937",
                fontWeight: 600,
              }}
            >
              Wymiana cylindrów i syropów
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: "240px",
            flex: "1 1 180px",
          }}
        >
          <input
            type="text"
            placeholder="Wyszukaj po mieście (np. Warszawa)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "999px",
              border: "1px solid rgba(148, 211, 221, 0.9)",
              padding: "8px 30px 8px 12px",
              fontSize: "13px",
              outline: "none",
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(148, 211, 221, 0.45)",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "11px",
              color: "#6b7280",
            }}
          >
            {visiblePoints.length}/{MAP_POINTS.length}
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.8)",
        }}
      >
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function AboutSection() {
  const pillars = [
    { icon: <Leaf size={26} />,     title: "Ekologia",     desc: "Wielokrotne użycie cylindrów CO₂ zamiast jednorazowych butelek. Mniej plastiku, mniejszy ślad węglowy."            },
    { icon: <Zap size={26} />,      title: "Wygoda",       desc: "Sieć punktów w popularnych sklepach spożywczych. Szybka wymiana bez czekania i zamawiania online."                 },
    { icon: <Award size={26} />,    title: "Polska firma", desc: "Działamy lokalnie, rozwijamy się w całym kraju. Wspieramy polską sieć handlową i polskich partnerów."              },
    { icon: <Star size={26} />,     title: "Jakość",       desc: "Oryginalne cylindry, atestowane i bezpieczne. Pełna kontrola jakości i certyfikowane napełnianie."                 },
  ];

  return (
    <Section id="about" title="O nas" subtitle="Kim jesteśmy">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px",
          alignItems: "center",
          marginBottom: "56px",
        }}
      >
        <div>
          <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "16px", marginBottom: "16px" }}>
            SodaWave to ekologiczna alternatywa dla napojów gazowanych w
            jednorazowych butelkach. Jako marka należąca do firmy{" "}
            <strong style={{ color: "#2AACBC" }}>PRUMET</strong> działamy w
            duchu Gospodarki Obiegu Zamkniętego (GOZ) – cylindry CO₂ krążą w
            systemie wymiany, zamiast stawać się odpadem.
          </p>
          <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: "12px" }}>
            Zapewniamy kompleksową obsługę dla punktów sprzedaży: od{" "}
            <strong>wdrożenia</strong> (materiały POS, ekspozytory), przez{" "}
            <strong>logistykę</strong> (stałe dostawy i odbiór pustych
            cylindrów), aż po <strong>serwis</strong> i wsparcie opiekuna B2B.
            Dzięki temu sklepy mogą w prosty sposób włączyć się w GOZ i
            zaoferować klientom wygodną wymianę cylindrów oraz oryginalne
            syropy.
          </p>
          <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "14px" }}>
            Współpracujemy z największymi sieciami handlowymi w Polsce:
            Stokrotką, Lewiatanem i Chortenem, budując gęstą sieć punktów
            SodaWave w całym kraju.
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #3BBFCF, #1A9BAB)",
            borderRadius: "24px",
            padding: "32px",
          }}
        >
          {[
            ["NIP",    "8252205177"         ],
            ["Firma",  "PRUMET"             ],
            ["Telefon","+48 695 864 734"    ],
            ["Model",  "Sieć punktów wymiany"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.18)",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>{k}</span>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {pillars.map((p) => (
          <div
            key={p.title}
            style={{
              background: "#F0FBFD",
              border: "2px solid #D6F3F7",
              borderRadius: "20px",
              padding: "28px 24px",
              textAlign: "center",
              transition: "all 0.25s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#2AACBC";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(42,172,188,0.15)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F0FBFD";
              e.currentTarget.style.borderColor = "#D6F3F7";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#D6F3F7",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#2AACBC",
              }}
            >
              {p.icon}
            </div>
            <h3 style={{ fontWeight: 900, color: "#1f2937", marginBottom: "8px" }}>{p.title}</h3>
            <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── OFFER ────────────────────────────────────────────────────────────────
function OfferSection() {
  return (
    <Section id="offer" title="Nasza oferta" subtitle="Produkty" light>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
          gap: "28px",
          alignItems: "stretch",
        }}
      >
        {/* Produkty */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {/* Cylinder Quick Connect */}
          <div
            style={{
              background: "#fdf2f8",
              border: "2px solid #f9a8d4",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 14px 40px rgba(219, 39, 119, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "18px",
                background: "#ec4899",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <RefreshCw size={26} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: "#be185d",
                  marginBottom: "4px",
                }}
              >
                Cylinder Quick Connect
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#4b5563",
                  lineHeight: 1.7,
                }}
              >
                Szybki montaż, pasuje do nowych saturatorów. Idealny do modeli z
                systemem Quick Connect.
              </p>
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "11px",
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#f9a8d4",
                  color: "#4b5563",
                  fontWeight: 700,
                }}
              >
                60 L napoju
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Leaf size={12} /> Ekologia
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#dcfce7",
                  color: "#166534",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Zap size={12} /> Oszczędność
              </span>
            </div>
          </div>

          {/* Cylinder Wkręcany */}
          <div
            style={{
              background: "#eff6ff",
              border: "2px solid #bfdbfe",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 14px 40px rgba(37, 99, 235, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "18px",
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Zap size={26} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: "#1d4ed8",
                  marginBottom: "4px",
                }}
              >
                Cylinder Wkręcany
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#4b5563",
                  lineHeight: 1.7,
                }}
              >
                Uniwersalny, pasuje do klasycznych modeli saturatorów. Sprawdzony
                standard na rynku.
              </p>
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "11px",
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#bfdbfe",
                  color: "#1e3a8a",
                  fontWeight: 700,
                }}
              >
                Pasuje do klasycznych gwintów
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#dcfce7",
                  color: "#166534",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Leaf size={12} /> Mniej plastiku
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#fef9c3",
                  color: "#854d0e",
                  fontWeight: 700,
                }}
              >
                Wymiana zamiast kupna nowego
              </span>
            </div>
          </div>

          {/* Syropy */}
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #D6F3F7",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 12px 32px rgba(15, 118, 110, 0.12)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "18px",
                background: "#2AACBC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Droplets size={26} />
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                color: "#0f766e",
              }}
            >
              Syropy SodaStream
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#4b5563",
                textAlign: "center",
                lineHeight: 1.7,
              }}
            >
              Oryginalne syropy do saturatorów w popularnych smakach: Pepsi,
              Mirinda, 7UP oraz Lemoniada.
            </p>
            <div
              style={{
                marginTop: "4px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
                fontSize: "11px",
              }}
            >
              {["Pepsi", "Mirinda", "7UP", "Lemoniada"].map((name) => (
                <span
                  key={name}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "#F0FBFD",
                    border: "1px solid #D6F3F7",
                    color: "#1A9BAB",
                    fontWeight: 700,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
            <span
              style={{
                background: "#D6F3F7",
                color: "#1A9BAB",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "999px",
                marginTop: "6px",
              }}
            >
              Dostępny w punktach
            </span>
          </div>
        </div>

        {/* Box z ekologią/oszczędnością */}
        <div
          style={{
            background: "linear-gradient(145deg, #3BBFCF, #1A7A8A)",
            borderRadius: "28px",
            padding: "26px 24px",
            color: "#fff",
            boxShadow: "0 20px 45px rgba(15, 118, 110, 0.38)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Leaf size={26} />
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 900,
              }}
            >
              Ekologicznie i oszczędnie
            </h3>
          </div>
          <p
            style={{
              marginTop: "10px",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Wymiana cylindrów zamiast kupowania nowych zmniejsza ilość odpadów i
            pozwala zaoszczędzić nawet kilkadziesiąt procent w porównaniu z
            wodą gazowaną w butelkach PET.
          </p>
          <ul
            style={{
              marginTop: "14px",
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "13px",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.16)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={12} />
              </span>
              Niższy koszt 1 litra napoju w porównaniu z butelkami sklepowymi.
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.16)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={12} />
              </span>
              Jeden cylinder to nawet do 60 litrów napoju bez dodatkowych
              butelek.
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ pod ofertą */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "24px",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 900,
            color: "#111827",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "999px",
              background: "#D6F3F7",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2AACBC",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            ?
          </span>
          FAQ
        </h3>
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: "18px",
            border: "1px solid #E5E7EB",
            padding: "16px 18px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "6px",
              color: "#111827",
            }}
          >
            Jaka jest różnica między cylindrem niebieskim a różowym?
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#4B5563",
              lineHeight: 1.7,
            }}
          >
            Cylinder <strong>różowy</strong> to system{" "}
            <strong>Quick Connect</strong> – specjalne złącze „klik”, które
            pasuje do nowych modeli saturatorów i umożliwia bardzo szybki
            montaż. Cylinder <strong>niebieski</strong> jest{" "}
            <strong>wkręcany</strong> i posiada klasyczny gwint, dzięki czemu
            współpracuje z większością tradycyjnych urządzeń do gazowania
            wody. Oba cylindry zawierają tę samą ilość gazu CO₂, różnią się
            jedynie typem mocowania do urządzenia.
          </p>
        </div>
      </div>
    </Section>
  );
}

// ─── B2B ──────────────────────────────────────────────────────────────────
function B2BSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log("Formularz B2B:", data);
    reset();
  };

  const benefits = [
    "Brak inwestycji",
    "Darmowy ekspozytor",
    "Zysk netto ok. 6.32 zł na wymianie",
    "Obsługa 24/7",
  ];

  const nipPattern = /^[0-9]{10}$/;

  return (
    <Section id="b2b" title="Współpraca B2B" subtitle="Dla sklepów">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Formularz */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "2px solid #D6F3F7",
            padding: "28px 24px",
            boxShadow: "0 14px 40px rgba(15, 118, 110, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A9BAB",
                marginBottom: "4px",
              }}
            >
              Formularz dla sklepów
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#4b5563",
              }}
            >
              Wypełnij zgłoszenie, a nasz opiekun skontaktuje się z Tobą i
              przedstawi warunki współpracy.
            </p>
          </div>

          {[
            {
              name: "companyName",
              label: "Nazwa firmy",
              type: "text",
              placeholder: "Nazwa sklepu / sieci",
            },
            {
              name: "nip",
              label: "NIP",
              type: "text",
              placeholder: "10-cyfrowy NIP (bez myślników)",
              validation: {
                pattern: {
                  value: nipPattern,
                  message: "NIP powinien składać się z 10 cyfr",
                },
              },
            },
            {
              name: "fullName",
              label: "Imię i nazwisko",
              type: "text",
              placeholder: "Osoba kontaktowa",
            },
            {
              name: "email",
              label: "Adres e-mail",
              type: "email",
              placeholder: "kontakt@twojsklep.pl",
              validation: {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Podaj poprawny adres e-mail",
                },
              },
            },
            {
              name: "phone",
              label: "Telefon",
              type: "tel",
              placeholder: "+48 ___ ___ ___",
            },
            {
              name: "address",
              label: "Adres lokalu",
              type: "text",
              placeholder: "Ulica, numer, miejscowość",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                style={{
                  display: "block",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6b7280",
                  marginBottom: "6px",
                }}
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: "To pole jest wymagane",
                  ...(field.validation || {}),
                })}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: errors[field.name]
                    ? "2px solid #ef4444"
                    : "2px solid #e5e7eb",
                  padding: "10px 12px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2AACBC";
                  e.target.style.boxShadow =
                    "0 0 0 1px rgba(42,172,188,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = errors[field.name]
                    ? "#ef4444"
                    : "#e5e7eb";
                }}
              />
              {errors[field.name] && (
                <p
                  style={{
                    marginTop: "4px",
                    fontSize: "11px",
                    color: "#b91c1c",
                  }}
                >
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "4px",
              width: "100%",
              border: "none",
              borderRadius: "999px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              background: "#2AACBC",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(42,172,188,0.45)",
              opacity: isSubmitting ? 0.8 : 1,
              transition: "background 0.2s, transform 0.1s, box-shadow 0.2s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(42,172,188,0.35)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(42,172,188,0.45)";
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1A9BAB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2AACBC";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(42,172,188,0.45)";
            }}
          >
            {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
          </button>

          {isSubmitSuccessful && (
            <p
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#16a34a",
              }}
            >
              Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.
            </p>
          )}
        </form>

        {/* Korzyści dla partnera */}
        <div
          style={{
            background: "linear-gradient(145deg, #2AACBC, #1A7A8A)",
            borderRadius: "24px",
            padding: "26px 22px",
            color: "#ffffff",
            boxShadow: "0 20px 45px rgba(15, 118, 110, 0.4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Building2 size={26} />
            <div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                }}
              >
                Korzyści dla partnerów
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                Dołącz do sieci SodaWave i zwiększ atrakcyjność swojej oferty.
              </p>
            </div>
          </div>

          <ul
            style={{
              marginTop: "14px",
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "13px",
            }}
          >
            {benefits.map((b) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.14)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Star size={13} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px dashed rgba(255,255,255,0.22)",
              fontSize: "12px",
              color: "rgba(240,253,250,0.9)",
            }}
          >
            Zadzwoń również bezpośrednio:{" "}
            <a
              href="tel:+48695864734"
              style={{
                fontWeight: 800,
                color: "#ffffff",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              +48 695 864 734
            </a>
            .
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function ContactSection() {
  const contacts = [
    { icon: <Phone size={26} />, title: "Telefon", value: "+48 695 864 734",    href: "tel:+48695864734"             },
    { icon: <Mail size={26} />,  title: "E-mail",  value: "kontakt@sodawave.pl", href: "mailto:kontakt@sodawave.pl"   },
    { icon: <MapPin size={26} />,title: "Siedziba", value: "Polska",             href: "#map"                         },
  ];

  return (
    <Section id="contact" title="Kontakt" subtitle="Skontaktuj się" light>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {contacts.map((c) => (
          <a
            key={c.title}
            href={c.href}
            style={{
              background: "#fff",
              border: "2px solid #D6F3F7",
              borderRadius: "20px",
              padding: "32px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              textAlign: "center",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#2AACBC";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(42,172,188,0.15)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D6F3F7";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#D6F3F7",
                color: "#2AACBC",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {c.icon}
            </div>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {c.title}
            </span>
            <span style={{ fontWeight: 900, color: "#1f2937" }}>{c.value}</span>
          </a>
        ))}
      </div>

      {/* Contact form */}
      <div
        style={{
          background: "#fff",
          border: "2px solid #D6F3F7",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1f2937", textAlign: "center", marginBottom: "24px" }}>
          Napisz do nas
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Imię i nazwisko", type: "text",  ph: "Jan Kowalski"  },
            { label: "Adres e-mail",    type: "email", ph: "jan@firma.pl"  },
            { label: "Telefon",         type: "tel",   ph: "+48 ___ ___ ___" },
          ].map((f) => (
            <div key={f.label}>
              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
              >
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.ph}
                style={{
                  width: "100%",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2AACBC")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          ))}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "10px",
                fontWeight: 700,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "6px",
              }}
            >
              Wiadomość
            </label>
            <textarea
              rows={4}
              placeholder="Twoja wiadomość..."
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
                resize: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2AACBC")}
              onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
          <button
            style={{
              width: "100%",
              background: "#2AACBC",
              color: "#fff",
              fontWeight: 700,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              fontSize: "15px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1A9BAB";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(42,172,188,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2AACBC";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Wyślij wiadomość
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "linear-gradient(135deg, #1A7A8A, #0f5f6d)", padding: "56px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          <div>
            <SodaLogo white />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "16px", lineHeight: 1.7 }}>
              Nowoczesna i ekologiczna usługa wymiany cylindrów CO₂ oraz
              sprzedaży syropów do saturatorów.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 900, marginBottom: "16px" }}>Nawigacja</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {NAV_LINKS.map((l) => (
                <li key={l.href} style={{ marginBottom: "8px" }}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scroll(l.href); }}
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 900, marginBottom: "16px" }}>Dane firmy</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>
              {[
                { label: "Firma",   val: "PRUMET"          },
                { label: "NIP",     val: "8252205177"       },
              ].map(({ label, val }) => (
                <li key={label} style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#fff", fontWeight: 600 }}>{label}: </span>{val}
                </li>
              ))}
              <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Phone size={12} />
                <a
                  href="tel:+48695864734"
                  style={{ color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  +48 695 864 734
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={12} />
                <a
                  href="mailto:sodawave@sodawave.pl"
                  style={{ color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  sodawave@sodawave.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>
            © {new Date().getFullYear()} SodaWave / PRUMET. Wszelkie prawa zastrzeżone.
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
            NIP: 8252205177 | Polska
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Nunito', 'Poppins', 'Segoe UI', sans-serif", minHeight: "100vh" }}>
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
