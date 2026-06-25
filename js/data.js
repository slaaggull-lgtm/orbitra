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

const CITY_PHOTOS = {
  // FRANSA
  "Paris": [
    "images/Paris1.jpg",
    "images/Paris2.jpg",
    "images/Paris3.jpg"
  ],
  "Nice": [
    "images/Nice1.jpg",
    "images/Nice2.jpg",
    "images/Nice3.jpg"
  ],
  "Lyon": [
    "images/Lyon1.jpg",
    "images/Lyon2.jpg",
    "images/Lyon3.jpg"
  ],
  "Marsilya": [
    "images/Marsilya1.jpg",
    "images/Marsilya2.jpg",
    "images/Marsilya3.jpg"
  ],

  // İTALYA
  "Roma": [
    "images/roma1.jpg",
    "images/roma2.jpg",
    "images/roma3.jpg"
  ],
  "Milano": [
    "images/milano1.jpg",
    "images/milano2.jpg",
    "images/milano3.jpg"
  ],
  "Venedik": [
    "images/venedik1.jpg",
    "images/venedik2.jpg",
    "images/venedik3.jpg"
  ],
  "Floransa": [
    "images/floransa1.jpg",
    "images/floransa2.jpg",
    "images/floransa3.jpg"
  ],

  // TÜRKİYE
  "İstanbul": [
    "images/istanbul1.jpg",
    "images/istanbul2.jpg",
    "images/istanbul3.jpg"
  ],
  "Kapadokya": [
    "images/kapadokya1.jpg",
    "images/kapadokya2.jpg",
    "images/kapadokya3.jpg"
  ],
  "İzmir": [
    "images/izmir1.jpg",
    "images/izmir2.jpg",
    "images/izmir3.jpg"
  ],
  "Antalya": [
    "images/antalya1.jpg",
    "images/antalya2.jpg",
    "images/antalya3.jpg"
  ],

  // JAPONYA
  "Tokyo": [
    "images/tokyo1.jpg",
    "images/tokyo2.jpg",
    "images/tokyo3.jpg"
  ],
  "Kyoto": [
    "images/kyoto1.jpg",
    "images/kyoto2.jpg",
    "images/kyoto3.jpg"
  ],
  "Osaka": [
    "images/osaka1.jpg",
    "images/osaka2.jpg",
    "images/osaka3.jpg"
  ],
  "Hiroşima": [
    "images/hirosima1.jpg",
    "images/hirosima2.jpg",
    "images/hirosima3.jpg"
  ],

  // İSPANYA
  "Madrid": [
    "images/madrid1.jpg",
    "images/madrid2.jpg",
    "images/madrid3.jpg"
  ],
  "Barselona": [
    "images/barselona1.jpg",
    "images/barselona2.jpg",
    "images/barselona3.jpg"
  ],
  "Sevilla": [
    "images/sevilla1.jpg",
    "images/sevilla2.jpg",
    "images/sevilla3.jpg"
  ],
  "Granada": [
    "images/granada1.jpg",
    "images/granada2.jpg",
    "images/granada3.jpg"
  ]
};

window.COUNTRIES = COUNTRIES;
window.INTERESTS = INTERESTS;
window.PACE_OPTIONS = PACE_OPTIONS;
window.CITY_PHOTOS = CITY_PHOTOS;
