import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import L from "leaflet";
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
  Instagram,
  Facebook,
} from "lucide-react";

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

export const sodaWaveLocations = [
  { id: 1, lat: 51.938981958301675, lng: 22.384780370042876, address: "Aleje Tadeusza Kościuszki 40, Łuków", name: "Sklep Rondo, Delikatesy Sezam", hours: "7–23" },
  { id: 2, lat: 53.1235, lng: 18.0163, address: "Bydgoszcz", name: "Galeria Focus, stoisko Markiewka", hours: "8–18" },
  { id: 3, lat: 53.1026, lng: 18.0315, address: "ul. Białogardzka 27, Bydgoszcz", name: "Warzywniaczek", hours: "8–18" },
  { id: 4, lat: 53.1594, lng: 18.1633, address: "ul. Narcyza Gieryna 4, Bydgoszcz", name: "Sklep Groszek", hours: "8–18" },
  { id: 5, lat: 53.1092, lng: 18.0538, address: "ul. Baczyńskiego 35, Bydgoszcz", name: "Żulka-Kulka, sklep spożywczy", hours: "8–18" },
  { id: 6, lat: 53.1165, lng: 17.9942, address: "ul. Marii Konopnickiej 2A/3, Bydgoszcz", name: "sklep spożywczy", hours: "8–18" },
  { id: 7, lat: 53.1332, lng: 18.0062, address: "ul. Gdańska 85, Bydgoszcz", name: "Warzywniaczek", hours: "8–18" },
  { id: 8, lat: 53.1163, lng: 17.9806, address: "ul. Waryńskiego 51/63U, Bydgoszcz", name: "Warzywniak Świeżak", hours: "8–18" },
  { id: 9, lat: 53.1412, lng: 18.0135, address: "ul. 11 Listopada 8, Bydgoszcz", name: "Delikatesy Na Leśnym", hours: "8–18" },
  { id: 10, lat: 53.1054, lng: 18.0152, address: "ul. A. Grzymały-Siedleckiego 10, Bydgoszcz", name: "Salon Prasowy", hours: "8–18" },
  { id: 11, lat: 53.1475, lng: 17.9501, address: "ul. Kolbego 44, Bydgoszcz", name: "Epaka, punkt wysyłek", hours: "8–18" },
  { id: 12, lat: 53.1154, lng: 17.9856, address: "ul. Juliusza Kossaka 48, Bydgoszcz", name: "Warzywniak U Agi", hours: "8–18" },
  { id: 13, lat: 53.1251, lng: 17.9515, address: "ul. Nakielska 156, Bydgoszcz", name: "Delikatesy", hours: "8–18" },
  { id: 14, lat: 52.7954, lng: 18.2570, address: "ul. Świętego Ducha 26, Inowrocław", name: "Pasmanteria Guziczek", hours: "8–18" },
  { id: 15, lat: 52.7820, lng: 18.2550, address: "ul. Okrężek 20, Inowrocław", name: "Sklep Julia", hours: "8–18" },
  { id: 16, lat: 52.7905, lng: 18.2530, address: "al. Kopernika 8A, Inowrocław", name: "Sklep ABC", hours: "8–18" },
  { id: 17, lat: 52.7885, lng: 18.2610, address: "ul. Wojska Polskiego 19B, Inowrocław", name: "Intercom, sklep komputerowy", hours: "8–18" },
  { id: 18, lat: 52.8630, lng: 17.9540, address: "ul. 4 Stycznia 54 / Artylerzystów 1B, Barcin", name: "Markiewka Sklep", hours: "8–18" },
  { id: 19, lat: 52.6580, lng: 17.9575, address: "ul. Jagiełły 20, Mogilno", name: "Naprawa Obuwia Szewc", hours: "8–18" },
  { id: 20, lat: 52.9535, lng: 17.9220, address: "Plac 1000-lecia 20, Łabiszyn", name: "Markiewka Sklep", hours: "8–18" },
  { id: 21, lat: 52.8055, lng: 18.0875, address: "ul. Rynek 22, Pakość", name: "Kleks", hours: "8–18" },
  { id: 22, lat: 52.7533, lng: 18.1105, address: "ul. Główna 17, Janikowo", name: "Markiewka Sklep", hours: "8–18" },
  { id: 23, lat: 53.0965, lng: 17.9355, address: "ul. Szubińska 8, Białe Błota", name: "Warzywa i Owoce", hours: "8–18" },
  { id: 24, lat: 52.8488, lng: 17.7205, address: "ul. Potockiego 1, Żnin", name: "Best-Seler", hours: "8–18" },
  { id: 25, lat: 52.6285, lng: 18.1720, address: "ul. Św. Ducha 17, Strzelno", name: "Sklep Polski Prill", hours: "8–18" },
  { id: 26, lat: 53.0015, lng: 17.7405, address: "ul. Bema 3, Szubin", name: "Czysta Chata", hours: "8–18" },
  { id: 27, lat: 53.1415, lng: 17.5955, address: "ul. Dąbrowskiego 36, Nakło nad Notecią", name: "Czysta Chata", hours: "8–18" },
  { id: 28, lat: 53.0805, lng: 18.2255, address: "ul. Żwirki i Wigury 1, Solec Kujawski", name: "Sklep spożywczy Jola", hours: "8–18" },
  { id: 29, lat: 53.3135, lng: 17.9380, address: "ul. Pomianowskiego 9, Koronowo", name: "Sklep Zajączek", hours: "8–18" },
  { id: 30, lat: 53.3155, lng: 17.9420, address: "ul. Witosa 14, Koronowo", name: "Chatka Puchatka", hours: "8–18" },
  { id: 31, lat: 52.9005, lng: 18.1360, address: "ul. Jęczmienna 2A, Złotniki Kujawskie", name: "Markiewka", hours: "8–18" },
  { id: 32, lat: 52.8425, lng: 18.2110, address: "ul. Dworcowa 17, Jaksice", name: "Lewiatan", hours: "8–18" },
  { id: 33, lat: 52.8965, lng: 18.2435, address: "Rojewo 141", name: "Lewiatan", hours: "8–18" },
  { id: 34, lat: 52.8905, lng: 18.3205, address: "Gniewkówiec 21", name: "Lewiatan", hours: "8–18" },
  { id: 35, lat: 52.9725, lng: 18.0665, address: "ul. Bydgoska 14I/J, Nowa Wieś Wielka", name: "sklep spożywczy", hours: "8–18" },
  { id: 36, lat: 52.8975, lng: 18.4065, address: "ul. Dworcowa 4, Gniewkowo", name: "Lewiatan", hours: "8–18" },
  { id: 37, lat: 53.0205, lng: 18.6410, address: "ul. W. Dziewulskiego 39C, Toruń", name: "Epaka, punkt wysyłek", hours: "8–18" },
  { id: 38, lat: 53.0165, lng: 18.5910, address: "ul. Kraszewskiego 38, Toruń", name: "sklep spożywczo-warzywny", hours: "8–18" },
  { id: 39, lat: 53.0285, lng: 18.5710, address: "ul. Bartosza Głowackiego 2, Toruń", name: "Sklep Cykoria", hours: "8–18" },
  { id: 40, lat: 52.9905, lng: 18.5810, address: "ul. Poznańska 80, Toruń", name: "Lewiatan", hours: "8–18" },
  { id: 41, lat: 52.9855, lng: 18.6110, address: "ul. Strzałowa 7, Toruń", name: "Lewiatan", hours: "8–18" },
  { id: 42, lat: 53.0185, lng: 18.5860, address: "ul. Bema 20A, Toruń", name: "Lewiatan", hours: "8–18" },
  { id: 43, lat: 52.9955, lng: 18.6310, address: "ul. Łódzka 35, Toruń", name: "Lewiatan", hours: "8–18" },
  { id: 44, lat: 53.0255, lng: 18.6510, address: "ul. Łyskowskiego 29/35, Toruń", name: "Lewiatan", hours: "8–18" },
  { id: 45, lat: 53.2205, lng: 17.8905, address: "Mochle 14", name: "Sklep Odido", hours: "8–18" },
  { id: 46, lat: 52.6785, lng: 18.3285, address: "ul. Rynek 1, Kruszwica", name: "DW-Kiosk", hours: "8–18" },
  { id: 47, lat: 52.6805, lng: 18.3305, address: "ul. Kujawska 29A, Kruszwica", name: "DW-Kiosk", hours: "8–18" },
  { id: 48, lat: 53.1255, lng: 17.9555, address: "ul. Nakielska 180, Bydgoszcz", name: "Lin", hours: "8–18" },
  { id: 49, lat: 53.0185, lng: 18.5755, address: "ul. Fałata 92, Toruń", name: "Sklep ABC", hours: "8–18" },
  { id: 50, lat: 52.7935, lng: 18.2505, address: "ul. Wojska Polskiego, Inowrocław", name: "Witaminka 1", hours: "8–18" },
  { id: 51, lat: 52.7936, lng: 18.2506, address: "ul. Wojska Polskiego, Inowrocław", name: "Witaminka 2", hours: "8–18" },
  { id: 52, lat: 52.7937, lng: 18.2507, address: "ul. Wojska Polskiego, Inowrocław", name: "Witaminka 3", hours: "8–18" },
  { id: 53, lat: 53.1155, lng: 17.9855, address: "ul. Juliusza Kossaka 43, Bydgoszcz", name: "Rumaks", hours: "8–18" },
  { id: 54, lat: 52.8205, lng: 18.3505, address: "Wierzchosławice 56", name: "Chatka Puchatka", hours: "8–18" },
  { id: 55, lat: 53.1105, lng: 18.0405, address: "ul. Kaczyńskiego 36/9, Bydgoszcz", name: "Groszek", hours: "8–18" },
  { id: 56, lat: 52.7555, lng: 18.1055, address: "ul. Ogrodowa 24, Janikowo", name: "Delikatesy", hours: "8–18" },
  { id: 57, lat: 52.7505, lng: 18.1105, address: "ul. Dworcowa 17, Janikowo", name: "sklep", hours: "8–18" },
  { id: 58, lat: 53.3105, lng: 17.9505, address: "ul. Szosa Bydgoska 33, Koronowo", name: "Delikatesy", hours: "8–18" },
  { id: 59, lat: 53.0205, lng: 18.0205, address: "Brzoza", name: "Warzywniak", hours: "8–18" },
  { id: 60, lat: 52.25628017997793, lng: 20.97681638900404, address: "ul. Piaskowa 6, Warszawa", name: "Lewiatan", hours: "7–23" },
  { id: 61, lat: 52.09160676550525, lng: 21.61931811238021, address: "ul. Mińska 8, Siennica", name: "Antosiewicz, sklep wielobranżowy", hours: "8–18" },
  { id: 62, lat: 51.9494455870526, lng: 22.052085027715055, address: "Stary Jamielnik 69", name: "Lewiatan", hours: "7–21" },
  { id: 63, lat: 51.93318663901361, lng: 22.37589898168492, address: "ul. Stodolna 19A, Łuków", name: "Stokrotka", hours: "7–21" },
  { id: 64, lat: 53.1264, lng: 18.0504, address: "Bydgoszcz", name: "Galeria Pomorska, stoisko Markiewka", hours: "8–18" },
  { id: 65, lat: 51.943397604616976, lng: 22.38275631237166, address: "ul. K. I. Gałczyńskiego 52, Łuków", name: "Lewiatan", hours: "8–22" },
  { id: 66, lat: 51.95402459932325, lng: 22.389352225864968, address: "Farfak 62, Łuków", name: "Sklep spożywczy Ewa", hours: "8–18" },
  { id: 67, lat: 51.94320457876996, lng: 22.378351527581383, address: "ul. Leopolda Staffa 4, Łuków", name: "Strefa Alkoholi", hours: "8–23" },
  { id: 68, lat: 51.98941291931856, lng: 22.795084846040833, address: "ul. Brzeska 53A, Międzyrzec Podlaski", name: "Lewiatan", hours: "6–21" },
  { id: 69, lat: 52.0893724320998, lng: 22.442928398838518, address: "ul. Dębowa 4, Zbuczyn", name: "Stacja Paliw Zbuczyn", hours: "6–22" },
  { id: 70, lat: 52.15331431802724, lng: 22.24433141787723, address: "ul. Garwolińska 80, Siedlce", name: "Lewiatan", hours: "8–21" },
  { id: 71, lat: 52.157479896866846, lng: 22.250006170923967, address: "Romanówka 18, Siedlce", name: "Chorten", hours: "6–21" },
  { id: 72, lat: 52.178827409211905, lng: 22.289864182564557, address: "ul. Dąbrowskiego 8, Siedlce", name: "Lewiatan", hours: "6–20" },
  { id: 73, lat: 52.04836284747071, lng: 22.298016354490937, address: "Gostchorz 42A, Siedlce", name: "Lewiatan", hours: "8–21" },
  { id: 74, lat: 52.02327767969077, lng: 22.312644035266672, address: "Biardy 36", name: "Groszek", hours: "8–18" },
  { id: 75, lat: 52.00270247114304, lng: 22.397915069500144, address: "Krynka 226", name: "Lewiatan", hours: "8–21" },
  { id: 76, lat: 52.03505257330378, lng: 22.3580851201243, address: "Radomyśl 44", name: "Lewiatan", hours: "8–21" },
  { id: 77, lat: 51.9927957901223, lng: 22.300122540331376, address: "ul. Księży Sopyłów 39A, Gręzówka", name: "Lewiatan", hours: "8–21" },
  { id: 78, lat: 51.803032437382825, lng: 22.19039709953342, address: "ul. Łukowska 66, Krzywda", name: "Strzyżewski J., dywany", hours: "8–18" },
  { id: 79, lat: 51.9829770598782, lng: 22.778727604251163, address: "ul. Lubelska 62, Międzyrzec Podlaski", name: "EPaka", hours: "8–16" },
  { id: 80, lat: 52.16417916832067, lng: 22.276193203839465, address: "ul. Jana Kilińskiego 19, Siedlce", name: "Witamina, owoce i warzywa", hours: "8–17" },
  { id: 81, lat: 51.87270205045594, lng: 22.19017372536445, address: "Stanin 150", name: "Staszko", hours: "7–17" }
];

const MAP_POINTS = sodaWaveLocations.map((p) => ({
  ...p,
  position: [p.lat, p.lng],
  city: p.address.includes(", ") ? p.address.split(", ").pop() : p.address.split(" ")[0] || p.address,
}));

const FAQ_ITEMS = [
  {
    question: "Czym różni się cylinder różowy od niebieskiego?",
    type: "long",
  },
  {
    question: "Jak działa wymiana cylindra CO₂?",
    answer:
      "Przynosisz pusty cylinder do punktu SodaWave i od razu wymieniasz go na pełny. Cały proces jest szybki i prosty.",
  },
  {
    question: "Czy muszę wcześniej coś zamawiać lub się rejestrować?",
    answer:
      "Nie. Wymiana odbywa się od ręki, bez zamawiania i bez formalności.",
  },
  {
    question: "Jakie cylindry mogę wymienić?",
    answer:
      "Wymieniamy cylindry pasujące do wszystkich saturatorów dostępnych na rynku, w tym modele wkręcane oraz Quick Connect.",
  },
  {
    question: "Czy gaz w cylindrach jest bezpieczny?",
    answer:
      "Tak. Wszystkie cylindry to certyfikowany, bezpieczny gaz spożywczy CO₂.",
  },
  {
    question: "Gdzie znajdę punkty wymiany SodaWave?",
    answer:
      "Nasze punkty znajdują się w wielu miastach, a sieć stale się rozwija. Aktualne lokalizacje znajdziesz na naszej mapie.",
  },
  {
    question: "Czy mogę kupić syropy SodaStream w punktach SodaWave?",
    answer:
      "Tak. W punktach dostępne są popularne syropy SodaStream, które możesz kupić przy okazji wymiany cylindra.",
  },
  {
    question: "Czy korzystanie z SodaWave jest bardziej ekologiczne?",
    answer:
      "Tak. Wymiana cylindrów i korzystanie z saturatorów ogranicza zużycie jednorazowych plastikowych butelek i wspiera gospodarkę obiegu zamkniętego.",
  },
  {
    question: "Ile trwa wymiana cylindra?",
    answer: "Zazwyczaj tylko chwilę – tyle, ile standardowa obsługa w punkcie.",
  },
];

const SEO_REGIONS = [
  {
    name: "Województwo Podlaskie",
    cities: [
      "Augustów",
      "Białystok",
      "Bielsk Podlaski",
      "Brańsk",
      "Choroszcz",
      "Ciechanowiec",
      "Czarna Białostocka",
      "Czyżew",
      "Drohiczyn",
      "Goniądz",
      "Grajewo",
      "Hajnówka",
      "Jedwabne",
      "Kleszczele",
      "Kolno",
      "Knyszyn",
      "Łapy",
      "Łomża",
      "Mońki",
      "Rajgród",
      "Sejny",
      "Siemiatycze",
      "Sokółka",
      "Supraśl",
      "Suwałki",
      "Szczuczyn",
      "Tykocin",
      "Wasilków",
      "Zabłudów",
      "Zambrów",
    ],
  },
  {
    name: "Województwo Pomorskie",
    cities: [
      "Brusy",
      "Bytów",
      "Chojnice",
      "Czarna Woda",
      "Czarne",
      "Człuchów",
      "Debrzno",
      "Dzierzgoń",
      "Gdańsk",
      "Gdynia",
      "Hel",
      "Jastarnia",
      "Kartuzy",
      "Kościerzyna",
      "Krynica Morska",
      "Kwidzyn",
      "Lębork",
      "Malbork",
      "Miastko",
      "Nowy Dwór Gdański",
      "Pelplin",
      "Prabuty",
      "Puck",
      "Reda",
      "Rumia",
      "Skarszewy",
      "Słupsk",
      "Sopot",
      "Starogard Gdański",
      "Sztum",
      "Tczew",
      "Ustka",
      "Wejherowo",
      "Władysławowo",
    ],
  },
  {
    name: "Województwo Śląskie",
    cities: [
      "Będzin",
      "Bielsko-Biała",
      "Bieruń",
      "Blachownia",
      "Bytom",
      "Chorzów",
      "Cieszyn",
      "Czeladź",
      "Czechowice-Dziedzice",
      "Czerwionka-Leszczyny",
      "Dąbrowa Górnicza",
      "Gliwice",
      "Imielin",
      "Jastrzębie-Zdrój",
      "Jaworzno",
      "Kalety",
      "Katowice",
      "Knurów",
      "Koziegłowy",
      "Krzanowice",
      "Krzepice",
      "Kuźnia Raciborska",
      "Lędziny",
      "Lubliniec",
      "Łaziska Górne",
      "Miasteczko Śląskie",
      "Mikołów",
      "Myszków",
      "Orzesze",
      "Piekary Śląskie",
      "Pilica",
      "Poręba",
      "Pszczyna",
      "Pyskowice",
      "Racibórz",
      "Radlin",
      "Ruda Śląska",
      "Rybnik",
      "Rydułtowy",
      "Siemianowice Śląskie",
      "Skoczów",
      "Sławków",
      "Sosnowiec",
      "Sośnicowice",
      "Strumień",
      "Szczyrk",
      "Świętochłowice",
      "Tarnowskie Góry",
      "Toszek",
      "Tychy",
      "Ustroń",
      "Wilamowice",
      "Wisła",
      "Wodzisław Śląski",
      "Wojkowice",
      "Zabrze",
      "Zawiercie",
      "Żory",
      "Żywiec",
    ],
  },
  {
    name: "Województwo Świętokrzyskie",
    cities: [
      "Bodzentyn",
      "Busko-Zdrój",
      "Chęciny",
      "Chmielnik",
      "Daleszyce",
      "Jędrzejów",
      "Kazimierza Wielka",
      "Kielce",
      "Koprzywnica",
      "Końskie",
      "Kunów",
      "Łagów",
      "Małogoszcz",
      "Opatów",
      "Osiek",
      "Ostrowiec Świętokrzyski",
      "Pińczów",
      "Połaniec",
      "Sandomierz",
      "Skalbmierz",
      "Skarżysko-Kamienna",
      "Starachowice",
      "Staszów",
      "Suchedniów",
      "Wąchock",
      "Wiślica",
    ],
  },
  {
    name: "Województwo Warmińsko-Mazurskie",
    cities: [
      "Bartoszyce",
      "Biała Piska",
      "Bisztynek",
      "Braniewo",
      "Dobre Miasto",
      "Elbląg",
      "Ełk",
      "Frombork",
      "Giżycko",
      "Górowo Iławeckie",
      "Iława",
      "Jeziorany",
      "Kętrzyn",
      "Kisielice",
      "Lidzbark",
      "Lidzbark Warmiński",
      "Lubawa",
      "Mikołajki",
      "Miłakowo",
      "Miłomłyn",
      "Mrągowo",
      "Nidzica",
      "Nowe Miasto Lubawskie",
      "Olecko",
      "Olsztyn",
      "Orneta",
      "Ostróda",
      "Pasłęk",
      "Pieniężno",
      "Ruciane-Nida",
      "Sępopol",
      "Susz",
      "Szczytno",
      "Tolkmicko",
      "Węgorzewo",
    ],
  },
  {
    name: "Województwo Wielkopolskie",
    cities: [
      "Adamanów",
      "Bojanowo",
      "Borek Wielkopolski",
      "Budzyń",
      "Chodzież",
      "Czarnków",
      "Czempiń",
      "Dąbie",
      "Dobra",
      "Dolsk",
      "Gniezno",
      "Gostyń",
      "Grabów nad Prosną",
      "Grodzisk Wielkopolski",
      "Jaraczewo",
      "Jarocin",
      "Kalisz",
      "Kępno",
      "Kleczew",
      "Koło",
      "Konin",
      "Kościan",
      "Krotoszyn",
      "Krzywiń",
      "Krzyż Wielkopolski",
      "Leszno",
      "Lwówek",
      "Margonin",
      "Międzychód",
      "Mikstat",
      "Mosina",
      "Murowana Goślina",
      "Nekla",
      "Nowy Tomyśl",
      "Oborniki",
      "Odolanów",
      "Opalenica",
      "Ostrów Wielkopolski",
      "Ostrzeszów",
      "Pleszew",
      "Poznań",
      "Puszczykowo",
      "Pyzdry",
      "Rakoniewice",
      "Rawicz",
      "Rogoźno",
      "Sieraków",
      "Słupca",
      "Stawiszyn",
      "Sulmierzyce",
      "Szamocin",
      "Szamotuły",
      "Ślesin",
      "Śmigiel",
      "Tuliszków",
      "Turek",
      "Ujście",
      "Wągrowiec",
      "Wieleń",
      "Wielichowo",
      "Wolsztyn",
      "Września",
      "Wyrzysk",
      "Zbąszyń",
      "Złotów",
    ],
  },
  {
    name: "Województwo Zachodniopomorskie",
    cities: [
      "Barlinek",
      "Białogard",
      "Borne Sulinowo",
      "Chociwel",
      "Chojna",
      "Darłowo",
      "Dobra",
      "Drawno",
      "Drawsko Pomorskie",
      "Dziwnów",
      "Goleniów",
      "Gryfice",
      "Gryfino",
      "Ińsko",
      "Kamień Pomorski",
      "Karlino",
      "Kołobrzeg",
      "Koszalin",
      "Łobez",
      "Maszewo",
      "Mielno",
      "Międzyzdroje",
      "Myślibórz",
      "Nowe Warpno",
      "Połczyn-Zdrój",
      "Polanów",
      "Pyrzyce",
      "Recz",
      "Resko",
      "Sianów",
      "Sławno",
      "Stargard",
      "Stepnica",
      "Suchań",
      "Szczecin",
      "Szczecinek",
      "Świdwin",
      "Świnoujście",
      "Trzcińsko-Zdrój",
      "Trzebiatów",
      "Tychowo",
      "Wałcz",
      "Węgorzyno",
      "Wolin",
      "Złocieniec",
    ],
  },
  {
    name: "Województwo Dolnośląskie",
    cities: [
      "Bardo",
      "Bielawa",
      "Bierutów",
      "Bogatynia",
      "Bolesławiec",
      "Bolków",
      "Brzeg Dolny",
      "Chocianów",
      "Chojnów",
      "Duszniki-Zdrój",
      "Dzierżoniów",
      "Głogów",
      "Głuszyca",
      "Góra",
      "Jawor",
      "Jedlina-Zdrój",
      "Jelcz-Laskowice",
      "Kamienna Góra",
      "Karpacz",
      "Kowary",
      "Kudowa-Zdrój",
      "Legnica",
      "Leśna",
      "Lubań",
      "Lubawka",
      "Lubin",
      "Lwówek Śląski",
      "Malczyce",
      "Milicz",
      "Nowa Ruda",
      "Oleśnica",
      "Oława",
      "Piechowice",
      "Pieńsk",
      "Polanica-Zdrój",
      "Polkowice",
      "Prusice",
      "Przemków",
      "Sobótka",
      "Stronie Śląskie",
      "Strzegom",
      "Syców",
      "Szklarska Poręba",
      "Ścinawa",
      "Środa Śląska",
      "Świdnica",
      "Świebodzice",
      "Trzebnica",
      "Twardogóra",
      "Wałbrzych",
      "Wąsosz",
      "Węgliniec",
      "Wleń",
      "Wołów",
      "Wrocław",
      "Ząbkowice Śląskie",
      "Zgorzelec",
      "Ziębice",
      "Złotoryja",
    ],
  },
  {
    name: "Województwo Kujawsko-Pomorskie",
    cities: [
      "Aleksandrów Kujawski",
      "Barcin",
      "Bydgoszcz",
      "Chełmno",
      "Chełmża",
      "Ciechocinek",
      "Dobrzyń nad Wisłą",
      "Golub-Dobrzyń",
      "Górzno",
      "Grudziądz",
      "Inowrocław",
      "Jabłonowo Pomorskie",
      "Janikowo",
      "Kamień Krajeński",
      "Koronowo",
      "Kowalewo Pomorskie",
      "Kruszwica",
      "Lipno",
      "Mogilno",
      "Mrocza",
      "Nakło nad Notecią",
      "Nieszawa",
      "Nowe",
      "Pakość",
      "Piotrków Kujawski",
      "Radziejów",
      "Rypin",
      "Solec Kujawski",
      "Strzelno",
      "Świecie",
      "Toruń",
      "Tuchola",
      "Wąbrzeźno",
      "Więcbork",
      "Włocławek",
      "Żnin",
    ],
  },
  {
    name: "Województwo Lubelskie",
    cities: [
      "Annopol",
      "Bełżyce",
      "Biała Podlaska",
      "Biłgoraj",
      "Chełm",
      "Dęblin",
      "Frampol",
      "Hrubieszów",
      "Janów Lubelski",
      "Józefów",
      "Kazimierz Dolny",
      "Kock",
      "Kraśnik",
      "Krasnobród",
      "Krasnystaw",
      "Łaszczów",
      "Lubartów",
      "Lublin",
      "Łuków",
      "Nałęczów",
      "Opole Lubelskie",
      "Ostrów Lubelski",
      "Parczew",
      "Piaski",
      "Poniatowa",
      "Puławy",
      "Radzyń Podlaski",
      "Rejowiec Fabryczny",
      "Ryki",
      "Świdnik",
      "Szczebrzeszyn",
      "Tarnogród",
      "Terespol",
      "Tomaszów Lubelski",
      "Tyszowce",
      "Włodawa",
      "Zamość",
      "Zwierzyniec",
    ],
  },
  {
    name: "Województwo Lubuskie",
    cities: [
      "Babimost",
      "Bytom Odrzański",
      "Czerwieńsk",
      "Dąbie",
      "Dobiegniew",
      "Gorzów Wielkopolski",
      "Gozdnica",
      "Iłowa",
      "Jasień",
      "Krosno Odrzańskie",
      "Kostrzyn nad Odrą",
      "Kożuchów",
      "Lubsko",
      "Łęknica",
      "Małomice",
      "Międzyrzecz",
      "Nowa Sól",
      "Ośno Lubuskie",
      "Rzepin",
      "Skwierzyna",
      "Słubice",
      "Strzelce Krajeńskie",
      "Sulechów",
      "Szlichtyngowa",
      "Świebodzin",
      "Torzym",
      "Trzciel",
      "Wschowa",
      "Zielona Góra",
      "Żagań",
      "Żary",
    ],
  },
  {
    name: "Województwo Łódzkie",
    cities: [
      "Aleksandrów Łódzki",
      "Bełchatów",
      "Biała Rawska",
      "Błaszki",
      "Brzeziny",
      "Drzewica",
      "Działoszyn",
      "Głowno",
      "Kamieńsk",
      "Koluszki",
      "Konstantynów Łódzki",
      "Krośniewice",
      "Kutno",
      "Łask",
      "Łęczyca",
      "Łowicz",
      "Łódź",
      "Opoczno",
      "Ozorków",
      "Pajęczno",
      "Piotrków Trybunalski",
      "Poddębice",
      "Przedbórz",
      "Radomsko",
      "Rawa Mazowiecka",
      "Sieradz",
      "Skierniewice",
      "Sulejów",
      "Szadek",
      "Tomaszów Mazowiecki",
      "Tuszyn",
      "Uniejów",
      "Warta",
      "Wieluń",
      "Zduńska Wola",
      "Zgierz",
      "Żychlin",
    ],
  },
  {
    name: "Województwo Małopolskie",
    cities: [
      "Alwernia",
      "Andrychów",
      "Bochnia",
      "Brzesko",
      "Bukowno",
      "Chełmek",
      "Chrzanów",
      "Ciężkowice",
      "Czchów",
      "Dąbrowa Tarnowska",
      "Dobczyce",
      "Gorlice",
      "Jordanów",
      "Kalwaria Zebrzydowska",
      "Kraków",
      "Krynica-Zdrój",
      "Limanowa",
      "Maków Podhalański",
      "Miechów",
      "Myślenice",
      "Nowy Sącz",
      "Nowy Targ",
      "Olkusz",
      "Oświęcim",
      "Piwniczna-Zdrój",
      "Proszowice",
      "Rabka-Zdrój",
      "Skała",
      "Skawina",
      "Słomniki",
      "Stary Sącz",
      "Sucha Beskidzka",
      "Sułkowice",
      "Szczawnica",
      "Świątniki Górne",
      "Tarnów",
      "Trzebinia",
      "Tuchów",
      "Wadowice",
      "Wieliczka",
      "Wojnicz",
      "Zakliczyn",
      "Zakopane",
      "Żabno",
    ],
  },
  {
    name: "Województwo Mazowieckie",
    cities: [
      "Białobrzegi",
      "Bieżuń",
      "Błonie",
      "Brok",
      "Brwinów",
      "Ciechanów",
      "Garwolin",
      "Gąbin",
      "Gostynin",
      "Góra Kalwaria",
      "Grodzisk Mazowiecki",
      "Grójec",
      "Halinów",
      "Iłża",
      "Józefów",
      "Karczew",
      "Kałuszyn",
      "Kobyłka",
      "Konstancin-Jeziorna",
      "Kosów Lacki",
      "Kozienice",
      "Legionowo",
      "Lipsko",
      "Łaskarzew",
      "Łochów",
      "Łomianki",
      "Łosice",
      "Maków Mazowiecki",
      "Milanówek",
      "Mińsk Mazowiecki",
      "Mława",
      "Mogielnica",
      "Mszczonów",
      "Nasielsk",
      "Nowe Miasto nad Pilicą",
      "Nowy Dwór Mazowiecki",
      "Ożarów Mazowiecki",
      "Ostrów Mazowiecka",
      "Otwock",
      "Piaseczno",
      "Piastów",
      "Pionki",
      "Płock",
      "Płońsk",
      "Podkowa Leśna",
      "Pruszków",
      "Przasnysz",
      "Pułtusk",
      "Radom",
      "Raciąż",
      "Sanniki",
      "Siedlce",
      "Sierpc",
      "Sochaczew",
      "Sokołów Podlaski",
      "Sulejówek",
      "Szydłowiec",
      "Tarczyn",
      "Warszawa",
      "Warka",
      "Węgrów",
      "Wołomin",
      "Wyszków",
      "Zakroczym",
      "Ząbki",
      "Zielonka",
      "Żelechów",
      "Żyrardów",
    ],
  },
  {
    name: "Województwo Opolskie",
    cities: [
      "Baborów",
      "Brzeg",
      "Dobrodzień",
      "Głogówek",
      "Głubczyce",
      "Gogolin",
      "Grodków",
      "Kędzierzyn-Koźle",
      "Kluczbork",
      "Kolonowskie",
      "Korfantów",
      "Lewin Brzeski",
      "Namysłów",
      "Niemodlin",
      "Nysa",
      "Olesno",
      "Opole",
      "Ozimek",
      "Paczków",
      "Praszka",
      "Prudnik",
      "Strzelce Opolskie",
      "Tułowice",
      "Ujazd",
      "Zawadzkie",
    ],
  },
  {
    name: "Województwo Podkarpackie",
    cities: [
      "Baranów Sandomierski",
      "Brzozów",
      "Dębica",
      "Dukla",
      "Dynów",
      "Głogów Małopolski",
      "Jarosław",
      "Jasło",
      "Kańczuga",
      "Kolbuszowa",
      "Krosno",
      "Leżajsk",
      "Lubaczów",
      "Łańcut",
      "Mielec",
      "Narol",
      "Nisko",
      "Nowa Dęba",
      "Pruchnik",
      "Przemyśl",
      "Przeworsk",
      "Radomyśl Wielki",
      "Ropczyce",
      "Rudnik nad Sanem",
      "Rzeszów",
      "Sanok",
      "Sędziszów Małopolski",
      "Stalowa Wola",
      "Strzyżów",
      "Tarnobrzeg",
      "Ulanów",
      "Ustrzyki Dolne",
      "Zagórz",
      "Zaklików",
    ],
  },
];

const SODAWAVE_MARKER_ICON = L.icon({
  iconUrl: "/favicon.svg",
  iconRetinaUrl: "/favicon.svg",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -18],
  className: "soda-marker-icon",
});

// ─── LOGO ─────────────────────────────────────────────────────────────────
function SodaLogo() {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        scroll("#hero");
      }}
      className="flex items-center gap-2 select-none"
      style={{ textDecoration: "none" }}
    >
      <img
        src="/Logo SodaWave bez tła.png"
        alt="SodaWave – logo"
        style={{
          height: "54px",
          width: "auto",
          display: "block",
        }}
      />
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
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        zIndex: 1000,
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div style={{ marginLeft: "-18px" }}>
          <SodaLogo />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="font-bold text-gray-600 hover:text-[#2AACBC] transition-colors"
              style={{ position: "relative", fontSize: "0.98rem" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="ml-2 text-white text-sm font-extrabold px-5 py-2 rounded-full transition-all flex items-center gap-2"
            style={{ background: "#2AACBC" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1A9BAB")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2AACBC")}
          >
            Kontakt
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
              className="text-base font-bold text-gray-700"
              style={{ color: "#374151" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="text-white font-extrabold px-4 py-3 rounded-full text-center"
            style={{ background: "#2AACBC" }}
          >
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = Math.floor(progress * target);
      setValue(next);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
}

function Hero() {
  const pointsCount = useCountUp(100);
  const partnersCount = useCountUp(40);
  const clientsCount = useCountUp(10000, 1600);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "visible",
        paddingTop: "72px",
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 55%, #D6F3F7 55%)",
        maxWidth: "100%",
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

      {/* Decorative static circles (background) */}
      {[
        { size: 220, x: "72%", y: "6%",  op: 0.07 },
        { size: 120, x: "84%", y: "62%", op: 0.09 },
        { size: 60,  x: "60%", y: "78%", op: 0.11 },
        { size: 90,  x: "9%",  y: "72%", op: 0.06 },
      ].map((b, i) => (
        <div
          key={`bg-${i}`}
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

      {/* Rising gas bubbles (CO₂ / carbonation) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden
      >
        {[
          { left: "8%",  size: 16, duration: 9,  delay: 0,   drift: 6 },
          { left: "18%", size: 24, duration: 7,  delay: -2,  drift: -4 },
          { left: "28%", size: 12, duration: 11, delay: -4,  drift: 8 },
          { left: "42%", size: 28, duration: 8,  delay: -1,  drift: -6 },
          { left: "55%", size: 20, duration: 10, delay: -3,  drift: 5 },
          { left: "65%", size: 14, duration: 12, delay: -5,  drift: -7 },
          { left: "75%", size: 22, duration: 9,  delay: -2.5, drift: 4 },
          { left: "85%", size: 18, duration: 8.5, delay: -1.5, drift: -5 },
          { left: "92%", size: 12, duration: 11, delay: -6,  drift: 3 },
          { left: "15%", size: 20, duration: 10.5, delay: -3.5, drift: -3 },
          { left: "35%", size: 14, duration: 9.5, delay: -4.5, drift: 6 },
          { left: "50%", size: 26, duration: 7.5, delay: -2,  drift: -4 },
          { left: "70%", size: 16, duration: 11.5, delay: -5.5, drift: 5 },
          { left: "22%", size: 18, duration: 8,  delay: -1,  drift: -6 },
          { left: "78%", size: 12, duration: 10, delay: -4,  drift: 4 },
        ].map((b, i) => (
          <div
            key={`bubble-${i}`}
            className="hero-bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--bubble-drift": `${b.drift}px`,
            }}
          />
        ))}
      </div>

      <div
        className="max-w-7xl mx-auto px-6 w-full hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          alignItems: "center",
          gap: "2rem",
          padding: "4rem 1.5rem",
          position: "relative",
          zIndex: 1,
          overflow: "visible",
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
            <Droplets size={13} /> Błyskawiczna wymiana cylindrów CO₂
          </span>

          <h1
            className="animate-slide-up hero-title-breath"
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
            <span>orzeźwienia</span>
          </h1>

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
            SodaWave to nowoczesna i ekologiczna usługa wymiany cylindrów CO₂ do saturatorów oraz sprzedaż syropów. Nasze autoryzowane punkty zapewniają szybki, wygodny i bezpieczny dostęp do wszystkiego, czego potrzebujesz do przygotowania napojów w domu. Działamy w oparciu o sprawdzony system, certyfikowany gaz spożywczy CO₂ oraz stałą dostępność produktów w punktach partnerskich. 
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
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2AACBC", lineHeight: 1 }}>
                {pointsCount}+
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                Autoryzowanych punktów
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2AACBC", lineHeight: 1 }}>
                {partnersCount}+
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                Partnerów handlowych
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2AACBC", lineHeight: 1 }}>
                {clientsCount.toLocaleString("pl-PL")}+
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                Zadowolonych klientów
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — team photo */}
        <div
          className="animate-fade-in delay-300 hero-image"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: 0,
            overflow: "visible",
            transform: "translateX(80px)",
          }}
        >
          <img
            src="/ZESPÓŁ BEZ TŁA.png"
            alt="Zadowolony zespół SodaWave z butlami CO2"
            style={{
              width: "100%",
              maxWidth: "1100px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "auto",
            }}
          />
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
      <div className="soda-map-shell">
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
            Punkty wymiany cylindrów CO₂ oraz sprzedaży syropów znajdziesz w wybranych lokalizacjach popularnych sieci handlowych i nie tylko. Wybierz miasto, aby sprawdzić najbliższy punkt.
          </p>
         
       
          
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
            <span>• Wszystkie punkty oferują dwa rodzaje cylindrów CO₂, pasujące do każdego saturatora, oraz szeroki wybór syropów smakowych.</span>
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

    // Upewnij się, że mapa prawidłowo obliczy wymiary,
    // szczególnie po początkowym renderze na małych ekranach
    map.whenReady(() => {
      map.invalidateSize();
      setTimeout(() => {
        map.invalidateSize();
      }, 400);
    });

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // Korekta wymiarów mapy przy zmianie rozmiaru okna (obrót telefonu, zmiana width)
  useEffect(() => {
    const handleResize = () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      const marker = L.marker(p.position, { icon: SODAWAVE_MARKER_ICON }).addTo(map);
      marker.bindPopup(
        `<div style="min-width:200px">
           <div style="font-size:12px;font-weight:800;color:#111827;margin-bottom:2px">
             ${p.name}
           </div>
           <div style="font-size:11px;color:#6b7280;margin-bottom:6px">
             ${p.address}
           </div>
           <div style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px;border-radius:999px;background:#D6F3F7;border:1px solid #2AACBC;font-size:10px;font-weight:700;color:#0f766e;margin-bottom:4px">
             Dostępne: Cylindry i Syropy
           </div>
           <div style="margin-top:4px;font-size:10px;color:#6b7280">
             Godziny: ${p.hours || "8–18"}
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
              Mapa autoryzowanych punktów
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
            placeholder="Wyszukaj po mieście"
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
          style={{ width: "100%", height: "100%", minHeight: "260px" }}
        />
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function AboutSection() {
  const pillars = [
    { icon: <Leaf size={26} />,     title: "Ekologia",     desc: "Wielokrotne zmniejszenie zużywania plastiku dzięki używaniu cylindrów z gazem CO₂ oraz syropów. Mniej plastiku to mniejszy ślad węglowy."            },
    { icon: <Zap size={26} />,      title: "Wygoda",       desc: "Prosto, lokalnie i bez zbędnych kroków Zawsze na miejscu."                 },
    { icon: <Award size={26} />,    title: "Polska firma", desc: "Działamy lokalnie, rozwijamy się w całym kraju. W 100% polski kapitał."              },
    { icon: <Star size={26} />,     title: "Jakość",       desc: "Pewna wymiana, produkty atestowane i bezpieczne. Pełna kontrola i certyfikowany gaz."                 },
  ];

  return (
    <Section id="about" title="O nas" subtitle="Kim jesteśmy">
      <div
        className="about-grid"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          alignItems: "center",
          marginBottom: "56px",
        }}
      >
        <div className="about-text">
          <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "16px", marginBottom: "16px" }}>
          SodaWave to wygodna i ekologiczna alternatywa dla kupowania wody w plastikowych butelkach. Ułatwiamy codzienne korzystanie z saturatorów, oferując szybką wymianę cylindrów CO₂ oraz możliwość zakupu popularnych syropów SodaStream w dogodnych punktach blisko Ciebie.
          Naszym celem jest maksymalna wygoda. Przychodzisz do punktu z pustym cylindrem i od razu wymieniasz go na pełny – bez czekania, bez zamawiania i bez komplikacji. Dbamy o to, aby usługa była zawsze dostępna, dzięki czemu możesz korzystać z niej dokładnie wtedy, kiedy tego potrzebujesz.
          </p>
          <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: "12px" }}>
          Działamy w wielu miastach i stale rozwijamy sieć punktów wymiany, aby dostęp do usługi był coraz łatwiejszy. Każdy cylinder napełniany jest certyfikowanym, bezpiecznym gazem spożywczym CO₂, co gwarantuje wysoką jakość oraz bezpieczeństwo użytkowania w domowych warunkach.
          </p>
          <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: "12px" }}>
          SodaWave to także świadomy wybór dla środowiska. Wymiana cylindrów i korzystanie z saturatorów pozwala ograniczyć ilość jednorazowych plastikowych butelek, zmniejszyć zużycie plastiku oraz wspiera ideę gospodarki obiegu zamkniętego. To prosty sposób na bardziej ekologiczne codzienne nawyki bez rezygnowania z komfortu i z realną oszczędnością.
          Dbamy o każdy detal naszej usługi, również ten wizualny. Nasze ekspozytory wykonane są w całości z kartonu pochodzącego z recyklingu i po zakończeniu użytkowania nadają się do ponownego przetworzenia. Dzięki temu także sposób prezentacji usługi pozostaje zgodny z ideą odpowiedzialności środowiskowej.
          </p>
          <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "15px" }}>
          Chcemy, aby przygotowanie ulubionych napojów w domu było proste, szybkie i odpowiedzialne. Dlatego łączymy wygodę, dostępność, realną oszczędność i ekologię w jednym rozwiązaniu.
          </p>
          <div
            className="about-logo-tagline"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "nowrap",
            }}
          >
            <img
              src="/logo_dlugopis.png"
              alt="Logo SodaWave"
              style={{ height: "42px", width: "auto", flexShrink: 0 }}
            />
            <span style={{ fontWeight: 400, color: "#4b5563", fontSize: "14px", whiteSpace: "nowrap" }}>
              - poczuj falę orzeźwienia razem z nami.
            </span>
          </div>
        </div>

        <div
          className="about-image"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/KOŁO BEZ TŁA ZMIANA 4.png"
            alt="SodaWave – grafika koła z falą"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <Section id="offer" title="Nasza oferta" subtitle="Produkty" light>
      <div
        className="offer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* Cylinder Quick Connect */}
        <div
          className="offer-card offer-card--pink"
          style={{
            background: "#fdf2f8",
            border: "2px solid #f9a8d4",
            borderRadius: "24px",
            boxShadow: "0 14px 40px rgba(219, 39, 119, 0.15)",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            overflow: "hidden",
            minHeight: "420px", // Stała wysokość dla proporcji butli
          }}
        >
          <div
            className="offer-card__content"
            style={{
              flex: "0 0 55%",
              padding: "32px 0 32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              zIndex: 2,
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
                overflow: "hidden",
              }}
            >
              <img
                src="/quick_connect.png"
                alt="Cylinder Quick Connect"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#be185d", marginBottom: "4px" }}>
                Cylinder Quick Connect
              </h3>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.7 }}>
                Szybki montaż, pasuje do modeli saturatorów z systemem Quick Connect.
              </p>
            </div>
            <div style={{ marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "11px" }}>
              {["60 L napoju", "Ekologia", "Oszczędność", "Mniej plastiku", "Pasuje do wielu modeli"].map((label) => (
                <span key={label} style={{ padding: "4px 10px", borderRadius: "999px", background: "#f9a8d4", color: "#4b5563", fontWeight: 700 }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
          
          {/* OBRAZEK - absolutnie przypięty do SUFITU */}
          <img
            className="offer-card__image"
            src="/rozowy.png"
            alt="Cylinder Quick Connect – różowy"
            style={{
              position: "absolute",
              right: "-15px",
              top: "-15px", // Gwarantuje uderzenie w sam sufit (niweluje puste piksele pliku)
              width: "55%",
              height: "115%", // Pociągnie zdjęcie od sufitu aż po samą podłogę
              objectFit: "contain",
              objectPosition: "right top", // Kotwica na samej górze
              zIndex: 1,
              pointerEvents: "none",
              transform: "translateX(-10px)", // Mocno powiększone
            }}
          />
        </div>

        {/* Cylinder Wkręcany */}
        <div
          className="offer-card offer-card--blue"
          style={{
            background: "#eff6ff",
            border: "2px solid #bfdbfe",
            borderRadius: "24px",
            boxShadow: "0 14px 40px rgba(37, 99, 235, 0.15)",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            overflow: "hidden",
            minHeight: "420px",
          }}
        >
          <div
            className="offer-card__content"
            style={{
              flex: "0 0 55%",
              padding: "32px 0 32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              zIndex: 2,
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
                overflow: "hidden",
              }}
            >
              <img
                src="/wkręcany.png"
                alt="Cylinder wkręcany"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1d4ed8", marginBottom: "4px" }}>
                Cylinder Wkręcany
              </h3>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.7 }}>
                Pasuje do modeli saturatorów z systemem wkręcanym.
              </p>
            </div>
            <div style={{ marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "11px" }}>
              {["60 L napoju", "Ekologia", "Oszczędność", "Mniej plastiku", "Pasuje do wielu modeli"].map((label) => (
                <span key={label} style={{ padding: "4px 10px", borderRadius: "999px", background: "#bfdbfe", color: "#1e3a8a", fontWeight: 700 }}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* OBRAZEK - absolutnie przypięty do SUFITU */}
          <img
            className="offer-card__image"
            src="/niebieski.png"
            alt="Cylinder wkręcany – niebieski"
            style={{
              position: "absolute",
              right: "-15px",
              top: "-15px",
              width: "55%",
              height: "115%",
              objectFit: "contain",
              objectPosition: "right top",
              zIndex: 1,
              pointerEvents: "none",
              transform: "translateX(-10px)", // Mocno powiększone
            }}
          />
        </div>

        {/* Syropy */}
        <div
          className="offer-card offer-card--white"
          style={{
            background: "#ffffff",
            border: "2px solid #D6F3F7",
            borderRadius: "24px",
            boxShadow: "0 12px 32px rgba(15, 118, 110, 0.12)",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            overflow: "hidden",
            minHeight: "420px",
          }}
        >
          <div
            className="offer-card__content"
            style={{
              flex: "0 0 55%",
              padding: "32px 0 32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              zIndex: 2,
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
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f766e" }}>
              Syropy SodaStream
            </h3>
            <p style={{ fontSize: "13px", color: "#4b5563", textAlign: "left", lineHeight: 1.7 }}>
              Syropy w wielu smakach: Pepsi, Mirinda, 7UP, Lemoniada, Mountain Dew, Pepsi Zero Cukru.
            </p>
            <div style={{ marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "flex-start", fontSize: "11px" }}>
              {["Pepsi", "Mirinda", "7UP", "Mountain Dew", "Lemoniada", "Pepsi Zero"].map((name) => (
                <span key={name} style={{ padding: "4px 10px", borderRadius: "999px", background: "#F0FBFD", border: "1px solid #D6F3F7", color: "#1A9BAB", fontWeight: 700 }}>
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* PEPSI - powiększona i zrównana z zaworami cylindrów */}
          <img
            className="offer-card__image"
            src="/pepsi.png"
            alt="Syropy SodaStream – zestaw Pepsi"
            style={{
              position: "absolute",
              right: "-5px",
              top: "15px", // Lekko niżej, by nakrętka Pepsi była na równi z zaworami cylindrów z lewej strony
              width: "55%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "right top", // Trzyma się góry!
              transform: "scale(1.1) translateY(201px)", // Mocno powiększone
              transformOrigin: "top right", // Skalujemy od góry, by nie zepsuć linii
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        </div>

        {/* Box z ekologią/oszczędnością */}
        <div
          style={{
            background: "linear-gradient(145deg, #3BBFCF, #1A7A8A)",
            borderRadius: "28px",
            padding: "32px 24px 26px",
            color: "#fff",
            boxShadow: "0 20px 45px rgba(15, 118, 110, 0.38)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Leaf size={26} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900 }}>
              Ekologicznie i oszczędnie
            </h3>
          </div>
          <p style={{ marginTop: "10px", fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.85)" }}>
            Wymiana cylindrów to mniej odpadów i realne oszczędności. Przygotowując napoje w domu, obniżasz koszt jednego litra w porównaniu z wodą gazowaną w plastikowych butelkach. Jeden cylinder wystarcza nawet na 60 litrów wody, a jeden syrop pozwala przygotować do 9 litrów napoju – bez generowania dodatkowych opakowań PET.
          </p>
          <ul style={{ marginTop: "14px", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "18px", height: "18px", borderRadius: "999px", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Zap size={12} /></span>
              Niższy koszt 1 litra napoju w porównaniu z butelkami sklepowymi
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "18px", height: "18px", borderRadius: "999px", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Droplets size={12} /></span>
              Jeden cylinder to nawet do 60 litrów wody gazowanej bez dodatkowych opłat
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "18px", height: "18px", borderRadius: "999px", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Building2 size={12} /></span>
              Wygoda i oszczędność miejsca w domu bez konieczności przechowywania zapasów butelek
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "18px", height: "18px", borderRadius: "999px", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Star size={12} /></span>
              Pełna kontrola nad stopniem nagazowania wody, dopasowana do własnych preferencji
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #E5E7EB" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#111827", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "999px", background: "#D6F3F7", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2AACBC", fontSize: "14px", fontWeight: 900 }}>?</span>
          FAQ
        </h3>
        <div style={{ background: "#F9FAFB", borderRadius: "18px", border: "1px solid #E5E7EB", padding: "8px 10px" }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={item.question} style={{ borderRadius: "14px", border: "1px solid #E5E7EB", background: "#ffffff", marginBottom: "8px", overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  style={{ width: "100%", padding: "10px 14px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontFamily: "inherit" }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", textAlign: "left" }}>{item.question}</span>
                  <span style={{ fontSize: "18px", color: "#6b7280", marginLeft: "10px" }}>{isOpen ? "−" : "+"}</span>
                </button>
                <div style={{ maxHeight: isOpen ? "600px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div style={{ padding: isOpen ? "0 14px 12px" : "0 14px 0", fontSize: "13px", color: "#4B5563", lineHeight: 1.7 }}>
                    {item.type === "long" ? (
                      <>
                        <p style={{ marginBottom: "8px" }}>Różnica między cylindrami dotyczy sposobu montażu w saturatorze. Wszystkie dostępne na rynku saturatory można podzielić na dwa typy, w zależności od rodzaju mocowania cylindra: wkręcane oraz wciskane (Quick Connect).</p>
                        <p style={{ marginBottom: "8px" }}><strong>Cylinder wkręcany</strong> – najczęściej oznaczony kolorem niebieskim. Montuje się go poprzez wkręcenie do saturatora.</p>
                        <p style={{ marginBottom: "8px" }}><strong>Cylinder Quick Connect</strong> – oznaczony kolorem różowym. Jest to system wciskany, umożliwiający szybki i prosty montaż bez wkręcania.</p>
                        <p style={{ marginBottom: "8px" }}>W punktach SodaWave cylindry są łatwe do rozróżnienia:</p>
                        <ul style={{ paddingLeft: "18px", marginBottom: "8px" }}>
                          <li>cylindry wkręcane (niebieskie) znajdują się w dolnej części ekspozytora i posiadają niebieską plombę,</li>
                          <li>cylindry Quick Connect (różowe) umieszczone są wyżej i posiadają różową plombę.</li>
                        </ul>
                        <p>Jeśli nie masz pewności, który cylinder pasuje do Twojego saturatora, obsługa punktu chętnie pomoże w wyborze właściwego wariantu.</p>
                      </>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverMsg, setServerMsg] = useState(null);

  const onSubmit = async (data) => {
    setServerMsg(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Accept: "application/json" 
        },
        body: JSON.stringify({
          access_key: "c7141449-9681-4d0f-a0b6-f91f12105466",
          subject: "Nowe zgłoszenie B2B - SodaWave",
          from_name: data.companyName || "Formularz B2B",
          // Przekazanie ładnie nazwanych pól do maila:
          "Nazwa firmy": data.companyName,
          "NIP": data.nip,
          "Osoba kontaktowa": data.fullName,
          "E-mail": data.email,
          "Telefon": data.phone,
          "Adres lokalu": data.address
        }),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        const message = payload?.message || "Nie udało się wysłać zgłoszenia.";
        setServerMsg({ type: "error", text: message });
        setError("root", { type: "server", message });
        return;
      }

      setServerMsg({
        type: "success",
        text: "Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.",
      });
      reset();
    } catch (_e) {
      const message = "Błąd sieci. Spróbuj ponownie.";
      setServerMsg({ type: "error", text: message });
      setError("root", { type: "network", message });
    }
  };

  const benefits = [
    "Brak inwestycji własnych",
    "Stały, przewidywalny dochód",
    "Obsługa operacyjna 24/7 – pełne wsparcie logistyczne i serwisowe po naszej stronie",
    "Regularna reklama punktu w mediach, zwiększająca jego rozpoznawalność i ruch klientów",
    "Przyciąganie nowych klientów dzięki popularnej i poszukiwanej usłudze",
    "Utożsamienie punktu z aktualnymi trendami ekologicznymi i ideą gospodarki obiegu zamkniętego",
    "Brak dodatkowej obsługi personelu – prosty i szybki proces wymiany",
    "Elastyczna współpraca – możliwość zakończenia w dowolnym momencie, bez kosztów i zobowiązań",
  ];

  const nipPattern = /^[0-9]{10}$/;

  return (
    <Section id="b2b" title="Współpraca B2B" subtitle="Dla sklepów">
      <div
        className="b2b-grid"
      >
        {/* Korzyści dla partnera (na mobile nad formularzem) */}
        <div
          className="b2b-benefits"
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

        {/* Formularz */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="b2b-form"
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

          {serverMsg?.type === "success" && (
            <p
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#16a34a",
              }}
            >
              {serverMsg.text}
            </p>
          )}

          {serverMsg?.type === "error" && (
            <p
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#b91c1c",
              }}
            >
              {serverMsg.text}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

// ─── SEO / REGIONS ─────────────────────────────────────────────────────────
function SeoSection() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [openRegion, setOpenRegion] = useState(SEO_REGIONS[0]?.name ?? null);

  return (
    <section
      className={`seo-section${isSectionOpen ? " seo-section--open" : ""}`}
      style={{
        background: " rgb(240, 251, 253)",
        padding: isSectionOpen ? "24px 0 48px" : "24px 0",
        marginTop: "0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <button
          type="button"
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          aria-expanded={isSectionOpen}
          aria-controls="seo-content-wrapper"
          id="seo-toggle"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "#111827",
              textAlign: "center",
            }}
          >
            Wymiana cylindrów CO₂ – znajdź nas w swoim mieście
          </span>
        </button>

        <div
          id="seo-content-wrapper"
          className={`seo-content-wrapper${isSectionOpen ? " seo-content-wrapper--open" : ""}`}
          role="region"
          aria-labelledby="seo-toggle"

        >
          <div className="seo-content-inner">
            <p
              style={{
                textAlign: "center",
                maxWidth: "720px",
                margin: "24px auto 28px",
                fontSize: "13px",
                color: "rgb(240, 251, 253)",
              }}
            >
              Poniżej znajdziesz listę miast, w których dostępne są punkty wymiany
              cylindrów SodaWave oraz sprzedaży syropów do saturatorów. Lista ma
              charakter informacyjny i jest na bieżąco rozwijana wraz z rozwojem
              sieci.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {SEO_REGIONS.map((region) => {
            const isOpen = openRegion === region.name;
            return (
              <div
                key={region.name}
                style={{
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  background: "#ffffff",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenRegion(isOpen ? null : region.name)
                  }
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#111827",
                      textAlign: "left",
                    }}
                  >
                    {region.name}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#6b7280",
                      marginLeft: "10px",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "800px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    borderTop: isOpen ? "1px solid #E5E7EB" : "none",
                  }}
                >
                  <div
                    className="seo-city-grid"
                    style={{
                      padding: isOpen ? "12px 16px 14px" : "0 16px",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "6px 16px",
                      fontSize: "12px",
                      color: "#4b5563",
                    }}
                  >
                    {region.cities.map((city) => (
                      <span key={city}>{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "28px",
            fontSize: "12px",
            color: "#666666",
            lineHeight: 1.7,
            maxWidth: "900px",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            Wymiana cylindrów CO₂ do saturatorów to usługa, która umożliwia
            szybki i wygodny dostęp do wody gazowanej bez konieczności
            kupowania plastikowych butelek. Coraz więcej użytkowników wybiera
            lokalne punkty wymiany cylindrów CO₂, ponieważ pozwala to
            oszczędzać czas, pieniądze i ograniczać ilość odpadów. Wymiana
            cylindra odbywa się bez zamawiania, bez oczekiwania i bez
            formalności.
          </p>
          <p style={{ marginBottom: "10px" }}>
            Dostępna wymiana cylindra CO₂ do saturatora realizowana jest w
            punktach stacjonarnych, gdzie wystarczy oddać pusty cylinder i
            odebrać pełny. Dzięki temu wymiana cylindrów CO₂ od ręki jest
            możliwa wtedy, kiedy jest potrzebna. W punktach obsługiwane są
            różne typy cylindrów, w tym cylindry wkręcane oraz cylindry Quick
            Connect. Popularna jest również wymiana cylindrów SodaStream,
            obejmująca cylindry kompatybilne z najczęściej spotykanymi modelami
            urządzeń.
          </p>
          <p>
            Jeden cylinder pozwala przygotować nawet do 60 litrów wody
            gazowanej, co oznacza niższy koszt jednego litra napoju w
            porównaniu z wodą kupowaną w butelkach sklepowych. Domowa woda
            gazowana bez plastiku to praktyczna alternatywa dla zgrzewek PET. W
            ofercie punktów dostępne są również syropy do saturatorów, w tym
            syropy SodaStream, które umożliwiają przygotowanie różnorodnych
            napojów gazowanych w domu. Rozbudowana sieć punktów wymiany w
            Polsce sprawia, że usługa jest łatwo dostępna lokalnie w wielu
            miastach. To rozwiązanie bezpieczne, ekologiczne i zgodne z ideą
            gospodarki obiegu zamkniętego.
          </p>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function ContactSection() {
  const contacts = [
    { icon: <Phone size={26} />, title: "Telefon", value: "+48 695 864 734",    href: "tel:+48695864734"             },
    { icon: <Mail size={26} />,  title: "E-mail",  value: "sodawave@sodawave.pl", href: "mailto:sodawave@sodawave.pl"   },
    { icon: <MapPin size={26} />,title: "Siedziba", value: "Polska",             href: "#map"                         },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverMsg, setServerMsg] = useState(null);

  const onSubmit = async (data) => {
    setServerMsg(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Accept: "application/json" 
        },
        body: JSON.stringify({
          access_key: "c7141449-9681-4d0f-a0b6-f91f12105466",
          subject: "Nowa wiadomość z formularza kontaktowego - SodaWave",
          from_name: data.fullName || "Formularz Kontaktowy",
          // Przekazanie ładnie nazwanych pól do maila:
          "Imię i nazwisko": data.fullName,
          "E-mail": data.email,
          "Telefon": data.phone,
          "Treść wiadomości": data.message
        }),
      });
      const payload = await res.json().catch(() => ({}));
      
      if (!res.ok || !payload.success) {
        setServerMsg({
          type: "error",
          text: payload?.message || "Nie udało się wysłać wiadomości.",
        });
        return;
      }
      
      setServerMsg({ type: "success", text: "Wiadomość została wysłana. Dziękujemy!" });
      reset();
    } catch (_e) {
      setServerMsg({ type: "error", text: "Błąd sieci. Spróbuj ponownie." });
    }
  };

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

      <div
        className="contact-layout"
        style={{
          display: "grid",
          gap: "32px",
          alignItems: "stretch",
        }}
      >
        {/* Formularz */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            background: "#fff",
            border: "2px solid #D6F3F7",
            borderRadius: "24px",
            padding: "40px",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1f2937", textAlign: "center", marginBottom: "24px" }}>
            Napisz do nas
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                name: "fullName",
                label: "Imię i nazwisko",
                type: "text",
                ph: "Jan Kowalski",
                validation: { required: "To pole jest wymagane" },
              },
              {
                name: "email",
                label: "Adres e-mail",
                type: "email",
                ph: "jan@firma.pl",
                validation: {
                  required: "To pole jest wymagane",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Podaj poprawny adres e-mail" },
                },
              },
              {
                name: "phone",
                label: "Telefon",
                type: "tel",
                ph: "+48 ___ ___ ___",
                validation: { required: "To pole jest wymagane" },
              },
            ].map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
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
                  id={f.name}
                  type={f.type}
                  placeholder={f.ph}
                  {...register(f.name, f.validation)}
                  style={{
                    width: "100%",
                    border: `2px solid ${errors[f.name] ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2AACBC")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors[f.name] ? "#ef4444" : "#e5e7eb")
                  }
                />
                {errors[f.name] && (
                  <p style={{ marginTop: "4px", fontSize: "11px", color: "#b91c1c" }}>
                    {errors[f.name].message}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
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
                id="message"
                rows={4}
                placeholder="Twoja wiadomość..."
                {...register("message", { required: "To pole jest wymagane" })}
                style={{
                  width: "100%",
                  border: `2px solid ${errors.message ? "#ef4444" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                  resize: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2AACBC")}
                onBlur={(e)  => (e.target.style.borderColor = errors.message ? "#ef4444" : "#e5e7eb")}
              />
              {errors.message && (
                <p style={{ marginTop: "4px", fontSize: "11px", color: "#b91c1c" }}>
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
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
                opacity: isSubmitting ? 0.85 : 1,
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
              {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>

            {serverMsg?.type === "success" && (
              <p style={{ marginTop: "6px", fontSize: "12px", color: "#16a34a", fontWeight: 700 }}>
                {serverMsg.text}
              </p>
            )}
            {serverMsg?.type === "error" && (
              <p style={{ marginTop: "6px", fontSize: "12px", color: "#b91c1c", fontWeight: 700 }}>
                {serverMsg.text}
              </p>
            )}
          </div>
        </form>

        {/* Zdjęcie obok formularza */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/pracownik.png"
            alt="Pracownik SodaWave pomagający klientom"
            style={{
              width: "100%",
              maxWidth: "720px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      id="footer"
      style={{ background: "linear-gradient(135deg, #1A7A8A, #0f5f6d)", padding: "56px 0" }}
    >
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
            <img src="/logo_dlugopis.png" alt="SodaWave" style={{ height: "48px", width: "auto", filter: "brightness(0) invert(1)" }} />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "16px", lineHeight: 1.7 }}>
              Nowoczesna i ekologiczna usługa wymiany cylindrów CO₂ oraz
              sprzedaży syropów do saturatorów. Dostępne w wielu miastach w
              Polsce – szybko, wygodnie i bez plastiku.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "18px",
              }}
            >
              <a
                href="https://www.instagram.com/sodawave.pl/"
                target="_blank"
                rel="noreferrer"
                data-nosnippet
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/sodawavepl"
                target="_blank"
                rel="noreferrer"
                data-nosnippet
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Facebook size={18} />
              </a>
            </div>
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
              <li style={{ marginBottom: "8px" }}>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
                  style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); scroll("#faq"); }}
                  style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 900, marginBottom: "16px" }}>Dane firmy</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>
              {[
                { label: "Firma",   val: "PRUMET | operator sieci SodaWave" },
                { label: "NIP",     val: "8252205177"       },
                { label: "Adres",   val: "Łazy, 21-400 Łuków, Polska" },
              ].map(({ label, val }) => (
                <li key={label} style={{ marginBottom: "8px" }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{label}: </span>{val}
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
              <li style={{ marginTop: "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "12px",
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                  }}
                >
                  Polityka prywatności
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
            © 2026 SodaWave | PRUMET wszelkie prawa zastrzeżone
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.25)",
              fontSize: "12px",
            }}
          >
            <Leaf size={12} color="#bbf7d0" />
            <span>Działamy zgodnie z ideą gospodarki obiegu zamkniętego</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Nunito', 'Poppins', 'Segoe UI', sans-serif",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Hero />
      <MapSection />
      <AboutSection />
      <OfferSection />
      <B2BSection />
      <ContactSection />
      <SeoSection />
      <Footer />
    </div>
  );
}
