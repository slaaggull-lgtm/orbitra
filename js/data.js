/**
 * data.js
 * Ülke, şehir, ilgi alanı ve şehir meta verileri.
 */

const COUNTRIES = {
  italy: {
    key: "italy",
    name: { tr: "İtalya", en: "Italy" },
    flag: "🇮🇹",
    emojis: ["🍕", "🏛️", "🍷", "🛶"],
    lat: 41.9,
    lon: 12.5,
    currency: "EUR",
    cities: ["Roma", "Milano", "Venedik", "Floransa"],
  },
  france: {
    key: "france",
    name: { tr: "Fransa", en: "France" },
    flag: "🇫🇷",
    emojis: ["🥐", "🗼", "🎨", "🍷"],
    lat: 46.6,
    lon: 2.2,
    currency: "EUR",
    cities: ["Paris", "Nice", "Lyon", "Marsilya"],
  },
  turkey: {
    key: "turkey",
    name: { tr: "Türkiye", en: "Turkey" },
    flag: "🇹🇷",
    emojis: ["🕌", "🍢", "🎈", "🌊"],
    lat: 39.0,
    lon: 35.0,
    currency: "TRY",
    cities: ["İstanbul", "Kapadokya", "İzmir", "Antalya"],
  },
  japan: {
    key: "japan",
    name: { tr: "Japonya", en: "Japan" },
    flag: "🇯🇵",
    emojis: ["🍣", "⛩️", "🌸", "🗻"],
    lat: 36.2,
    lon: 138.2,
    currency: "JPY",
    cities: ["Tokyo", "Kyoto", "Osaka", "Hiroşima"],
  },
  spain: {
    key: "spain",
    name: { tr: "İspanya", en: "Spain" },
    flag: "🇪🇸",
    emojis: ["🥘", "💃", "🏖️", "🎶"],
    lat: 40.4,
    lon: -3.7,
    currency: "EUR",
    cities: ["Madrid", "Barselona", "Sevilla", "Granada"],
  },
};

const INTERESTS = [
  { key: "history", icon: "🏛️" },
  { key: "food", icon: "🍽️" },
  { key: "cafe", icon: "☕" },
  { key: "nature", icon: "🌿" },
  { key: "art", icon: "🎨" },
  { key: "shopping", icon: "🛍️" },
  { key: "nightlife", icon: "🌃" },
  { key: "relax", icon: "🧘" },
  { key: "photo", icon: "📸" },
  { key: "family", icon: "👨‍👩‍👧" },
];

const PACE_OPTIONS = [
  { key: "relaxed", activitiesPerDay: 3 },
  { key: "normal", activitiesPerDay: 5 },
  { key: "intense", activitiesPerDay: 7 },
];

const CITY_WIKI_TITLES = {
  Roma: "Rome",
  Milano: "Milan",
  Venedik: "Venice",
  Floransa: "Florence",
  Paris: "Paris",
  Nice: "Nice",
  Lyon: "Lyon",
  Marsilya: "Marseille",
  İstanbul: "Istanbul",
  Kapadokya: "Cappadocia",
  İzmir: "Izmir",
  Antalya: "Antalya",
  Tokyo: "Tokyo",
  Kyoto: "Kyoto",
  Osaka: "Osaka",
  Hiroşima: "Hiroshima",
  Madrid: "Madrid",
  Barselona: "Barcelona",
  Sevilla: "Seville",
  Granada: "Granada",
};

const CITY_META = {
  Roma: {
    lat: 41.9028, lon: 12.4964, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İtalyanca", en: "Italian" },
    activities: [
      { key: "colosseum", title: { tr: "Kolezyum turu", en: "Colosseum tour" }, category: "history", cost: 18, duration: 120 },
      { key: "vatican", title: { tr: "Vatikan Müzeleri", en: "Vatican Museums" }, category: "art", cost: 22, duration: 150 },
      { key: "trastevere", title: { tr: "Trastevere'de akşam yemeği", en: "Dinner in Trastevere" }, category: "food", cost: 35, duration: 90 },
      { key: "trevi", title: { tr: "Trevi Çeşmesi & merkez yürüyüşü", en: "Trevi Fountain walk" }, category: "photo", cost: 0, duration: 60 },
      { key: "cafe-roma", title: { tr: "İtalyan kahvesi molası", en: "Italian coffee break" }, category: "cafe", cost: 5, duration: 45 },
      { key: "pantheon", title: { tr: "Pantheon ziyareti", en: "Pantheon visit" }, category: "history", cost: 0, duration: 60 },
    ],
  },
  Milano: {
    lat: 45.4642, lon: 9.19, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İtalyanca", en: "Italian" },
    activities: [
      { key: "duomo", title: { tr: "Duomo Katedrali", en: "Duomo Cathedral" }, category: "art", cost: 15, duration: 90 },
      { key: "galleria", title: { tr: "Galleria Vittorio Emanuele", en: "Galleria Vittorio Emanuele" }, category: "shopping", cost: 0, duration: 60 },
      { key: "aperitivo", title: { tr: "Aperitivo & aperatif", en: "Aperitivo hour" }, category: "food", cost: 20, duration: 75 },
      { key: "navigli", title: { tr: "Navigli kanalları gezisi", en: "Navigli canals stroll" }, category: "relax", cost: 0, duration: 90 },
    ],
  },
  Venedik: {
    lat: 45.4408, lon: 12.3155, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İtalyanca", en: "Italian" },
    activities: [
      { key: "gondola", title: { tr: "Gondola turu", en: "Gondola ride" }, category: "relax", cost: 80, duration: 30 },
      { key: "sanmarco", title: { tr: "San Marco Meydanı", en: "St. Mark's Square" }, category: "history", cost: 0, duration: 90 },
      { key: "rialto", title: { tr: "Rialto Köprüsü & pazar", en: "Rialto Bridge & market" }, category: "food", cost: 15, duration: 75 },
      { key: "murano", title: { tr: "Murano cam atölyesi", en: "Murano glass workshop" }, category: "art", cost: 12, duration: 120 },
    ],
  },
  Floransa: {
    lat: 43.7696, lon: 11.2558, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İtalyanca", en: "Italian" },
    activities: [
      { key: "uffizi", title: { tr: "Uffizi Galerisi", en: "Uffizi Gallery" }, category: "art", cost: 20, duration: 150 },
      { key: "duomo-fi", title: { tr: "Floransa Katedrali", en: "Florence Cathedral" }, category: "history", cost: 18, duration: 90 },
      { key: "ponte", title: { tr: "Ponte Vecchio yürüyüşü", en: "Ponte Vecchio walk" }, category: "photo", cost: 0, duration: 60 },
      { key: "tuscan", title: { tr: "Toskana lezzetleri", en: "Tuscan cuisine" }, category: "food", cost: 30, duration: 90 },
    ],
  },
  Paris: {
    lat: 48.8566, lon: 2.3522, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "Fransızca", en: "French" },
    activities: [
      { key: "eiffel", title: { tr: "Eyfel Kulesi", en: "Eiffel Tower" }, category: "photo", cost: 28, duration: 120 },
      { key: "louvre", title: { tr: "Louvre Müzesi", en: "Louvre Museum" }, category: "art", cost: 22, duration: 180 },
      { key: "montmartre", title: { tr: "Montmartre gezisi", en: "Montmartre stroll" }, category: "art", cost: 0, duration: 90 },
      { key: "bistro", title: { tr: "Fransız bistro akşam yemeği", en: "French bistro dinner" }, category: "food", cost: 40, duration: 90 },
      { key: "seine", title: { tr: "Seine kıyısında yürüyüş", en: "Seine riverside walk" }, category: "relax", cost: 0, duration: 75 },
    ],
  },
  Nice: {
    lat: 43.7102, lon: 7.262, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "Fransızca", en: "French" },
    activities: [
      { key: "promenade", title: { tr: "Promenade des Anglais", en: "Promenade des Anglais" }, category: "relax", cost: 0, duration: 90 },
      { key: "old-nice", title: { tr: "Eski Nice sokakları", en: "Old Nice streets" }, category: "food", cost: 25, duration: 90 },
      { key: "castle", title: { tr: "Colline du Château manzarası", en: "Castle Hill viewpoint" }, category: "nature", cost: 0, duration: 60 },
    ],
  },
  Lyon: {
    lat: 45.764, lon: 4.8357, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "Fransızca", en: "French" },
    activities: [
      { key: "vieux", title: { tr: "Vieux Lyon gezisi", en: "Old Lyon tour" }, category: "history", cost: 0, duration: 90 },
      { key: "bouchon", title: { tr: "Bouchon restoranı", en: "Bouchon restaurant" }, category: "food", cost: 35, duration: 90 },
      { key: "basilica", title: { tr: "Fourvière Bazilikası", en: "Fourvière Basilica" }, category: "art", cost: 0, duration: 75 },
    ],
  },
  Marsilya: {
    lat: 43.2965, lon: 5.3698, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "Fransızca", en: "French" },
    activities: [
      { key: "calanques", title: { tr: "Calanques doğa yürüyüşü", en: "Calanques hike" }, category: "nature", cost: 0, duration: 180 },
      { key: "vieux-port", title: { tr: "Vieux-Port & balık çorbası", en: "Old Port & bouillabaisse" }, category: "food", cost: 30, duration: 90 },
      { key: "notre-dame-m", title: { tr: "Notre-Dame de la Garde", en: "Notre-Dame de la Garde" }, category: "history", cost: 0, duration: 60 },
    ],
  },
  İstanbul: {
    lat: 41.0082, lon: 28.9784, currency: "TRY",
    currencyName: { tr: "Türk Lirası (₺)", en: "Turkish Lira (₺)" },
    language: { tr: "Türkçe", en: "Turkish" },
    activities: [
      { key: "ayasofya", title: { tr: "Ayasofya & Sultanahmet", en: "Hagia Sophia & Sultanahmet" }, category: "history", cost: 650, duration: 120 },
      { key: "bosphorus", title: { tr: "Boğaz turu", en: "Bosphorus cruise" }, category: "relax", cost: 400, duration: 90 },
      { key: "grand-bazaar", title: { tr: "Kapalıçarşı alışverişi", en: "Grand Bazaar shopping" }, category: "shopping", cost: 0, duration: 90 },
      { key: "kebab", title: { tr: "Geleneksel Türk mutfağı", en: "Traditional Turkish cuisine" }, category: "food", cost: 350, duration: 75 },
      { key: "karakoy", title: { tr: "Karaköy kahve molası", en: "Karaköy coffee break" }, category: "cafe", cost: 120, duration: 45 },
    ],
  },
  Kapadokya: {
    lat: 38.6431, lon: 34.8289, currency: "TRY",
    currencyName: { tr: "Türk Lirası (₺)", en: "Turkish Lira (₺)" },
    language: { tr: "Türkçe", en: "Turkish" },
    activities: [
      { key: "balloon", title: { tr: "Balon turu (gün doğumu)", en: "Hot air balloon (sunrise)" }, category: "nature", cost: 4500, duration: 90 },
      { key: "goreme", title: { tr: "Göreme Açık Hava Müzesi", en: "Göreme Open Air Museum" }, category: "history", cost: 650, duration: 120 },
      { key: "valley", title: { tr: "Aşk Vadisi yürüyüşü", en: "Love Valley hike" }, category: "nature", cost: 0, duration: 120 },
      { key: "pottery", title: { tr: "Avanos çömlek atölyesi", en: "Avanos pottery workshop" }, category: "art", cost: 200, duration: 60 },
    ],
  },
  İzmir: {
    lat: 38.4237, lon: 27.1428, currency: "TRY",
    currencyName: { tr: "Türk Lirası (₺)", en: "Turkish Lira (₺)" },
    language: { tr: "Türkçe", en: "Turkish" },
    activities: [
      { key: "alsancak", title: { tr: "Kordon boyu yürüyüşü", en: "Kordon promenade walk" }, category: "relax", cost: 0, duration: 90 },
      { key: "efes", title: { tr: "Efes Antik Kenti (günübirlik)", en: "Ephesus day trip" }, category: "history", cost: 700, duration: 240 },
      { key: "kemeralti", title: { tr: "Kemeraltı Çarşısı", en: "Kemeraltı Bazaar" }, category: "shopping", cost: 0, duration: 75 },
    ],
  },
  Antalya: {
    lat: 36.8969, lon: 30.7133, currency: "TRY",
    currencyName: { tr: "Türk Lirası (₺)", en: "Turkish Lira (₺)" },
    language: { tr: "Türkçe", en: "Turkish" },
    activities: [
      { key: "kaleici", title: { tr: "Kaleiçi tarihi merkez", en: "Kaleiçi old town" }, category: "history", cost: 0, duration: 90 },
      { key: "beach", title: { tr: "Sahil dinlenmesi", en: "Beach relaxation" }, category: "relax", cost: 0, duration: 120 },
      { key: "duden", title: { tr: "Düden Şelalesi", en: "Düden Waterfalls" }, category: "nature", cost: 50, duration: 90 },
      { key: "seafood", title: { tr: "Akdeniz deniz ürünleri", en: "Mediterranean seafood" }, category: "food", cost: 400, duration: 90 },
    ],
  },
  Tokyo: {
    lat: 35.6762, lon: 139.6503, currency: "JPY",
    currencyName: { tr: "Japon Yeni (¥)", en: "Japanese Yen (¥)" },
    language: { tr: "Japonca", en: "Japanese" },
    activities: [
      { key: "shibuya", title: { tr: "Shibuya geçidi & Harajuku", en: "Shibuya crossing & Harajuku" }, category: "shopping", cost: 0, duration: 120 },
      { key: "sensoji", title: { tr: "Senso-ji Tapınağı", en: "Senso-ji Temple" }, category: "history", cost: 0, duration: 90 },
      { key: "sushi", title: { tr: "Otantik sushi deneyimi", en: "Authentic sushi experience" }, category: "food", cost: 3500, duration: 75 },
      { key: "teamLab", title: { tr: "teamLab dijital sanat", en: "teamLab digital art" }, category: "art", cost: 3200, duration: 120 },
      { key: "roppongi", title: { tr: "Roppongi gece hayatı", en: "Roppongi nightlife" }, category: "nightlife", cost: 5000, duration: 150 },
    ],
  },
  Kyoto: {
    lat: 35.0116, lon: 135.7681, currency: "JPY",
    currencyName: { tr: "Japon Yeni (¥)", en: "Japanese Yen (¥)" },
    language: { tr: "Japonca", en: "Japanese" },
    activities: [
      { key: "fushimi", title: { tr: "Fushimi Inari torii yolu", en: "Fushimi Inari torii path" }, category: "photo", cost: 0, duration: 120 },
      { key: "bamboo", title: { tr: "Arashiyama bambu ormanı", en: "Arashiyama bamboo grove" }, category: "nature", cost: 0, duration: 90 },
      { key: "kaiseki", title: { tr: "Kaiseki akşam yemeği", en: "Kaiseki dinner" }, category: "food", cost: 8000, duration: 120 },
      { key: "geisha", title: { tr: "Gion bölgesi gezisi", en: "Gion district stroll" }, category: "history", cost: 0, duration: 75 },
    ],
  },
  Osaka: {
    lat: 34.6937, lon: 135.5023, currency: "JPY",
    currencyName: { tr: "Japon Yeni (¥)", en: "Japanese Yen (¥)" },
    language: { tr: "Japonca", en: "Japanese" },
    activities: [
      { key: "dotonbori", title: { tr: "Dotonbori sokak lezzetleri", en: "Dotonbori street food" }, category: "food", cost: 2000, duration: 90 },
      { key: "osaka-castle", title: { tr: "Osaka Kalesi", en: "Osaka Castle" }, category: "history", cost: 600, duration: 90 },
      { key: "aquarium", title: { tr: "Kaiyukan akvaryumu", en: "Kaiyukan Aquarium" }, category: "family", cost: 2700, duration: 120 },
    ],
  },
  Hiroşima: {
    lat: 34.3853, lon: 132.4553, currency: "JPY",
    currencyName: { tr: "Japon Yeni (¥)", en: "Japanese Yen (¥)" },
    language: { tr: "Japonca", en: "Japanese" },
    activities: [
      { key: "peace", title: { tr: "Barış Anıt Parkı", en: "Peace Memorial Park" }, category: "history", cost: 200, duration: 120 },
      { key: "miyajima", title: { tr: "Miyajima adası (Itsukushima)", en: "Miyajima Island" }, category: "nature", cost: 360, duration: 180 },
      { key: "okonomiyaki", title: { tr: "Hiroşima usulü okonomiyaki", en: "Hiroshima-style okonomiyaki" }, category: "food", cost: 1200, duration: 60 },
    ],
  },
  Madrid: {
    lat: 40.4168, lon: -3.7038, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İspanyolca", en: "Spanish" },
    activities: [
      { key: "prado", title: { tr: "Prado Müzesi", en: "Prado Museum" }, category: "art", cost: 15, duration: 150 },
      { key: "retiro", title: { tr: "Retiro Parkı", en: "Retiro Park" }, category: "nature", cost: 0, duration: 90 },
      { key: "tapas", title: { tr: "Tapas turu", en: "Tapas crawl" }, category: "food", cost: 30, duration: 120 },
      { key: "plaza-mayor", title: { tr: "Plaza Mayor & Sol", en: "Plaza Mayor & Sol" }, category: "history", cost: 0, duration: 75 },
    ],
  },
  Barselona: {
    lat: 41.3874, lon: 2.1686, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "Katalanca / İspanyolca", en: "Catalan / Spanish" },
    activities: [
      { key: "sagrada", title: { tr: "Sagrada Família", en: "Sagrada Família" }, category: "art", cost: 26, duration: 120 },
      { key: "park-guell", title: { tr: "Park Güell", en: "Park Güell" }, category: "photo", cost: 10, duration: 90 },
      { key: "la-rambla", title: { tr: "La Rambla & Boqueria", en: "La Rambla & Boqueria" }, category: "food", cost: 20, duration: 90 },
      { key: "gothic", title: { tr: "Gotik Mahalle gezisi", en: "Gothic Quarter walk" }, category: "history", cost: 0, duration: 75 },
    ],
  },
  Sevilla: {
    lat: 37.3891, lon: -5.9845, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İspanyolca", en: "Spanish" },
    activities: [
      { key: "alcazar", title: { tr: "Real Alcázar", en: "Real Alcázar" }, category: "history", cost: 14, duration: 120 },
      { key: "flamenco", title: { tr: "Flamenko gösterisi", en: "Flamenco show" }, category: "nightlife", cost: 25, duration: 90 },
      { key: "tapas-sev", title: { tr: "Sevilla tapas barları", en: "Seville tapas bars" }, category: "food", cost: 25, duration: 90 },
    ],
  },
  Granada: {
    lat: 37.1773, lon: -3.5986, currency: "EUR",
    currencyName: { tr: "Euro (€)", en: "Euro (€)" },
    language: { tr: "İspanyolca", en: "Spanish" },
    activities: [
      { key: "alhambra", title: { tr: "Alhambra Sarayı", en: "Alhambra Palace" }, category: "history", cost: 19, duration: 180 },
      { key: "albaicin", title: { tr: "Albaicín mahallesi", en: "Albaicín neighborhood" }, category: "photo", cost: 0, duration: 90 },
      { key: "tea", title: { tr: "Moroccan çay molası", en: "Moroccan tea break" }, category: "cafe", cost: 5, duration: 45 },
    ],
  },
};

function getCountryName(key, lang) {
  const c = COUNTRIES[key];
  if (!c) return key;
  return typeof c.name === "object" ? c.name[lang || "tr"] : c.name;
}

function getCountryDesc(key, lang) {
  return I18n?.t(`countryDesc.${key}`) || "";
}

window.COUNTRIES = COUNTRIES;
window.INTERESTS = INTERESTS;
window.PACE_OPTIONS = PACE_OPTIONS;
window.CITY_WIKI_TITLES = CITY_WIKI_TITLES;
window.CITY_META = CITY_META;
window.getCountryName = getCountryName;
window.getCountryDesc = getCountryDesc;
