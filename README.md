# 🌊 SodaWave – Strona Wizytówka

**SodaWave** to nowoczesna i ekologiczna usługa wymiany cylindrów CO₂ oraz sprzedaży syropów do saturatorów. Strona firmowa zbudowana w React + Vite + Tailwind CSS.

---

## 🚀 Szybki start

### 1. Wymagania
- **Node.js** `>= 18.x` ([pobierz](https://nodejs.org))
- **npm** `>= 9.x` (dołączony do Node.js)

### 2. Instalacja

```bash
# Zainstaluj wszystkie zależności
npm install
```

### 3. Uruchomienie trybu deweloperskiego

```bash
npm run dev
```

Strona będzie dostępna pod adresem: **http://localhost:5173**

### 4. Budowanie wersji produkcyjnej

```bash
npm run build
```

Pliki wyjściowe znajdziesz w folderze `dist/`.

### 5. Podgląd wersji produkcyjnej lokalnie

```bash
npm run preview
```

---

## 📁 Struktura projektu

```
sodawave/
├── public/
│   └── favicon.svg          # Ikona przeglądarki (logo SodaWave)
│
├── src/
│   ├── SodaWave.jsx          # 🎯 GŁÓWNY PLIK – cała aplikacja React
│   ├── main.jsx              # Punkt wejścia React (montuje App)
│   └── index.css             # Style globalne + Tailwind directives
│
├── index.html                # Szablon HTML (entry point Vite)
├── package.json              # Zależności i skrypty npm
├── vite.config.js            # Konfiguracja Vite
├── tailwind.config.js        # Konfiguracja Tailwind + kolory marki
├── postcss.config.js         # PostCSS (wymagany przez Tailwind)
├── .eslintrc.cjs             # Reguły ESLint
├── .gitignore                # Pliki ignorowane przez Git
└── README.md                 # Ta dokumentacja
```

---

## 🎨 Kolory marki SodaWave

| Token             | Hex       | Zastosowanie                    |
|-------------------|-----------|---------------------------------|
| `soda-primary`    | `#2AACBC` | Przyciski CTA, akcenty           |
| `soda-dark`       | `#1A9BAB` | Hover, tło kart info            |
| `soda-light`      | `#3BBFCF` | Logo, dekoracje                 |
| `soda-bg`         | `#D6F3F7` | Odznaki, tło soft               |
| `soda-bg-soft`    | `#F0FBFD` | Naprzemienne tła sekcji         |
| `soda-footer`     | `#1A7A8A` | Stopka gradient start           |
| `soda-footer-dk`  | `#0f5f6d` | Stopka gradient end             |

Kolory dostępne w Tailwind jako `bg-soda-primary`, `text-soda-dark`, itd.

---

## 🧩 Sekcje strony

| Sekcja              | ID          | Opis                                      |
|---------------------|-------------|-------------------------------------------|
| Nawigacja           | —           | Fixed navbar, responsywny hamburger       |
| Hero                | `#hero`     | Hasło, CTA, statystyki, ukośne tło        |
| Mapa punktów        | `#map`      | Partnerzy + placeholder mapy Google       |
| O nas               | `#about`    | Misja firmy, 4 filary (Ekologia, Wygoda…) |
| Oferta              | `#offer`    | Cylindry Quick Connect / Wkręcane, Syropy |
| Współpraca B2B      | `#b2b`      | Korzyści dla partnerów, dane kontaktowe   |
| Kontakt             | `#contact`  | Formularz + kafelki kontaktowe            |
| Stopka              | —           | Nawigacja, dane firmy PRUMET              |

---

## 📦 Zainstalowane paczki

### Produkcyjne (`dependencies`)
- `react` – biblioteka UI
- `react-dom` – renderowanie React w przeglądarce
- `lucide-react` – ikony SVG (MapPin, Phone, Mail, Menu…)

### Deweloperskie (`devDependencies`)
- `vite` – błyskawiczny bundler
- `@vitejs/plugin-react` – plugin React dla Vite
- `tailwindcss` – utility-first CSS framework
- `postcss` + `autoprefixer` – wymagane przez Tailwind
- `eslint` + pluginy – linting kodu

---

## 🏢 Dane firmy

| Pole      | Wartość              |
|-----------|----------------------|
| Marka     | **SodaWave**         |
| Firma     | **PRUMET**           |
| NIP       | `8252205177`         |
| Telefon   | `+48 695 864 734`    |
| E-mail    | `kontakt@sodawave.pl` |

---

## 📄 Licencja

Własnościowy kod. Wszelkie prawa zastrzeżone © 2024 SodaWave / PRUMET.
