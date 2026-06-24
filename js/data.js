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
    lat: 41.9,
    lon: 12.5,
    desc: "Tarih, sanat ve mutfağın iç içe geçtiği bir yarımada.",
    cities: ["Roma", "Milano", "Venedik", "Floransa"],
  },
  france: {
    key: "france",
    name: "Fransa",
    lat: 46.6,
    lon: 2.2,
    desc: "Şıklık, gastronomi ve köklü mimarinin buluşma noktası.",
    cities: ["Paris", "Nice", "Lyon", "Marsilya"],
  },
  turkey: {
    key: "turkey",
    name: "Türkiye",
    lat: 39.0,
    lon: 35.0,
    desc: "İki kıtayı birleştiren tarih, lezzet ve doğa zenginliği.",
    cities: ["İstanbul", "Kapadokya", "İzmir", "Antalya"],
  },
  japan: {
    key: "japan",
    name: "Japonya",
    lat: 36.2,
    lon: 138.2,
    desc: "Gelenekle geleceğin yan yana yürüdüğü ada ülkesi.",
    cities: ["Tokyo", "Kyoto", "Osaka", "Hiroşima"],
  },
  spain: {
    key: "spain",
    name: "İspanya",
    lat: 40.4,
    lon: -3.7,
    desc: "Tutkulu kültür, sahiller ve canlı şehir hayatı.",
    cities: ["Madrid", "Barselona", "Sevilla", "Granada"],
  },
};

// Tarayıcıda global olarak diğer script dosyalarının kullanabilmesi için
window.COUNTRIES = COUNTRIES;
