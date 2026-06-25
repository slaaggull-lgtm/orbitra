/**
 * data.js
 * Faz 1 veri katmanı: desteklenen ülkeler, koordinatları ve şehirleri.
 * Faz 2'de her şehre "ilgi alanı etiketleri" ve gerçek mekan verisi eklenecek,
 * bu dosya o zaman bir JSON/CMS kaynağına taşınabilir.
 */

const COUNTRIES = {
  italy: {
    key: "italy",
    name: "İtalya",
    flag: "🇮🇹",
    emojis: ["🍕", "🏛️", "🍷", "🛶"],
    lat: 41.9,
    lon: 12.5,
    desc: "Tarih, sanat ve mutfağın iç içe geçtiği bir yarımada.",
    cities: ["Roma", "Milano", "Venedik", "Floransa"],
  },
  france: {
    key: "france",
    name: "Fransa",
    flag: "🇫🇷",
    emojis: ["🥐", "🗼", "🎨", "🍷"],
    lat: 46.6,
    lon: 2.2,
    desc: "Şıklık, gastronomi ve köklü mimarinin buluşma noktası.",
    cities: ["Paris", "Nice", "Lyon", "Marsilya"],
  },
  turkey: {
    key: "turkey",
    name: "Türkiye",
    flag: "🇹🇷",
    emojis: ["🕌", "🍢", "🎈", "🌊"],
    lat: 39.0,
    lon: 35.0,
    desc: "İki kıtayı birleştiren tarih, lezzet ve doğa zenginliği.",
    cities: ["İstanbul", "Kapadokya", "İzmir", "Antalya"],
  },
  japan: {
    key: "japan",
    name: "Japonya",
    flag: "🇯🇵",
    emojis: ["🍣", "⛩️", "🌸", "🗻"],
    lat: 36.2,
    lon: 138.2,
    desc: "Gelenekle geleceğin yan yana yürüdüğü ada ülkesi.",
    cities: ["Tokyo", "Kyoto", "Osaka", "Hiroşima"],
  },
  spain: {
    key: "spain",
    name: "İspanya",
    flag: "🇪🇸",
    emojis: ["🥘", "💃", "🏖️", "🎶"],
    lat: 40.4,
    lon: -3.7,
    desc: "Tutkulu kültür, sahiller ve canlı şehir hayatı.",
    cities: ["Madrid", "Barselona", "Sevilla", "Granada"],
  },
};

// İlgi alanı seçenekleri — Faz 2 formu burayı kullanır
const INTERESTS = [
  { key: "history", label: "Tarih", icon: "🏛️" },
  { key: "food", label: "Yemek", icon: "🍽️" },
  { key: "cafe", label: "Kafe", icon: "☕" },
  { key: "nature", label: "Doğa", icon: "🌿" },
  { key: "art", label: "Sanat", icon: "🎨" },
  { key: "shopping", label: "Alışveriş", icon: "🛍️" },
  { key: "nightlife", label: "Gece hayatı", icon: "🌃" },
  { key: "relax", label: "Dinlenme", icon: "🧘" },
  { key: "photo", label: "Fotoğraf", icon: "📸" },
  { key: "family", label: "Aile dostu", icon: "👨‍👩‍👧" },
];

// Tempo seçenekleri — günlük aktivite yoğunluğunu belirler (Faz 2'de plan motoru kullanacak)
const PACE_OPTIONS = [
  { key: "relaxed", label: "Rahat", desc: "Günde 2-3 aktivite, bol dinlenme", activitiesPerDay: 3 },
  { key: "normal", label: "Normal", desc: "Günde 4-5 aktivite, dengeli tempo", activitiesPerDay: 5 },
  { key: "intense", label: "Yoğun", desc: "Günde 6+ aktivite, dolu dolu bir gün", activitiesPerDay: 7 },
];

// Şehir fotoğrafları — şimdilik seed'li placeholder görseller (picsum.photos).
// Gerçek şehir fotoğrafları elimize geçtiğinde (kendi çekimler ya da
// lisanslı bir kaynak) burası gerçek URL'lerle değiştirilecek.
const CITY_PHOTOS = {};
Object.values(COUNTRIES).forEach((c) => {
  c.cities.forEach((city) => {
    CITY_PHOTOS[city] = [1, 2, 3].map(
      (n) => `https://picsum.photos/seed/${encodeURIComponent(city)}-${n}/480/320`
    );
  });
});

window.COUNTRIES = COUNTRIES;
window.INTERESTS = INTERESTS;
window.PACE_OPTIONS = PACE_OPTIONS;
window.CITY_PHOTOS = CITY_PHOTOS;
