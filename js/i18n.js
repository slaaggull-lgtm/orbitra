/**
 * i18n.js
 * Türkçe / English dil desteği — tüm arayüz metinleri buradan yönetilir.
 */

const I18n = (() => {
  const STORAGE_KEY = "kesif-lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "tr";
  const listeners = new Set();

  const STRINGS = {
    tr: {
      loading: "DÜNYA YÜKLENİYOR",
      backBtn: "Geri",
      openCountryPicker: "Ülke Seç",
      countryPickerTitle: "Ülke Seç",
      searchPlaceholder: "Ülke ara…",
      noResults: "Sonuç bulunamadı",
      cityHint: "Tek bir şehir seçmen yeterli — istersen birden fazla da seçebilirsin.",
      title: "Bir ülke seç",
      subtitle: "Keşfetmek istediğin yere dokun",
      countries: {
        italy: "İtalya",
        france: "Fransa",
        turkey: "Türkiye",
        japan: "Japonya",
        spain: "İspanya",
      },
      panelEyebrow: "SEÇİLEN ÜLKE",
      panelDescSuffix:
        " Aşağıdan bir veya birkaç şehir seç, fotoğraflarına göz at; ardından kişisel gezi planını oluştur.",
      continueBtn: "Devam et →",
      prefEyebrow: "PLANINI ÖZELLEŞTİR",
      prefTitle: "Kaç gün kalmayı, nasıl bir tempo izlemeyi düşünüyorsun?",
      daysLabel: "Kaç gün kalmayı planlıyorsun?",
      daysUnit: "gün",
      paceLabel: "Nasıl bir tempo istersin?",
      interestLabel: "Seni en çok ne mutlu eder?",
      buildPlanBtn: "Planımı oluştur →",
      planEyebrow: "GEZİ PLANI",
      planTitle: "Günlük programın hazır",
      downloadPdf: "PDF olarak indir",
      budgetTitle: "Tahmini bütçe",
      budgetTotal: "Toplam",
      budgetFood: "Yemek",
      budgetActivities: "Aktiviteler",
      budgetTransport: "Ulaşım",
      budgetMisc: "Diğer",
      cityInfoTitle: "Şehir bilgileri",
      weather: "Hava durumu",
      currency: "Para birimi",
      language: "Konuşulan dil",
      weatherLoading: "Hava durumu yükleniyor…",
      weatherUnavailable: "Hava durumu alınamadı",
      photosLoading: "fotoğraflar yükleniyor…",
      photosNotFound: "bu şehir için fotoğraf bulunamadı",
      dayLabel: "Gün",
      interests: {
        history: "Tarih",
        food: "Yemek",
        cafe: "Kafe",
        nature: "Doğa",
        art: "Sanat",
        shopping: "Alışveriş",
        nightlife: "Gece hayatı",
        relax: "Dinlenme",
        photo: "Fotoğraf",
        family: "Aile dostu",
      },
      pace: {
        relaxed: { label: "Rahat", desc: "Günde 2-3 aktivite, bol dinlenme" },
        normal: { label: "Normal", desc: "Günde 4-5 aktivite, dengeli tempo" },
        intense: { label: "Yoğun", desc: "Günde 6+ aktivite, dolu dolu bir gün" },
      },
      countryDesc: {
        italy: "Tarih, sanat ve mutfağın iç içe geçtiği bir yarımada.",
        france: "Şıklık, gastronomi ve köklü mimarinin buluşma noktası.",
        turkey: "İki kıtayı birleştiren tarih, lezzet ve doğa zenginliği.",
        japan: "Gelenekle geleceğin yan yana yürüdüğü ada ülkesi.",
        spain: "Tutkulu kültür, sahiller ve canlı şehir hayatı.",
      },
    },
    en: {
      loading: "LOADING WORLD",
      backBtn: "Back",
      openCountryPicker: "Choose Country",
      countryPickerTitle: "Choose Country",
      searchPlaceholder: "Search country…",
      noResults: "No results found",
      cityHint: "Selecting just one city is enough — you can pick more if you like.",
      title: "Choose a country",
      subtitle: "Tap where you want to explore",
      countries: {
        italy: "Italy",
        france: "France",
        turkey: "Turkey",
        japan: "Japan",
        spain: "Spain",
      },
      panelEyebrow: "SELECTED COUNTRY",
      panelDescSuffix:
        " Pick one or more cities below, browse photos, then build your personal travel plan.",
      continueBtn: "Continue →",
      prefEyebrow: "CUSTOMIZE YOUR PLAN",
      prefTitle: "How many days and what pace do you prefer?",
      daysLabel: "How many days are you planning?",
      daysUnit: "days",
      paceLabel: "What pace suits you?",
      interestLabel: "What makes you happiest?",
      buildPlanBtn: "Build my plan →",
      planEyebrow: "TRAVEL PLAN",
      planTitle: "Your daily itinerary is ready",
      downloadPdf: "Download as PDF",
      budgetTitle: "Estimated budget",
      budgetTotal: "Total",
      budgetFood: "Food",
      budgetActivities: "Activities",
      budgetTransport: "Transport",
      budgetMisc: "Other",
      cityInfoTitle: "City information",
      weather: "Weather",
      currency: "Currency",
      language: "Spoken language",
      weatherLoading: "Loading weather…",
      weatherUnavailable: "Weather unavailable",
      photosLoading: "loading photos…",
      photosNotFound: "no photos found for this city",
      dayLabel: "Day",
      interests: {
        history: "History",
        food: "Food",
        cafe: "Café",
        nature: "Nature",
        art: "Art",
        shopping: "Shopping",
        nightlife: "Nightlife",
        relax: "Relaxation",
        photo: "Photography",
        family: "Family friendly",
      },
      pace: {
        relaxed: { label: "Relaxed", desc: "2-3 activities per day, plenty of rest" },
        normal: { label: "Normal", desc: "4-5 activities per day, balanced pace" },
        intense: { label: "Intense", desc: "6+ activities per day, packed schedule" },
      },
      countryDesc: {
        italy: "A peninsula where history, art, and cuisine intertwine.",
        france: "Where elegance, gastronomy, and timeless architecture meet.",
        turkey: "Rich history, flavors, and nature bridging two continents.",
        japan: "An island nation where tradition walks beside the future.",
        spain: "Passionate culture, beaches, and vibrant city life.",
      },
    },
  };

  function t(key) {
    const parts = key.split(".");
    let val = STRINGS[lang];
    for (const p of parts) {
      val = val?.[p];
    }
    return val ?? key;
  }

  function getLang() {
    return lang;
  }

  function setLang(next) {
    if (next !== "tr" && next !== "en") return;
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyStaticTexts();
    listeners.forEach((fn) => fn(lang));
  }

  function applyStaticTexts() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (val) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key);
      if (val) el.placeholder = val;
    });

    document.querySelectorAll(".country-btn").forEach((btn) => {
      const key = btn.dataset.country;
      if (key) btn.textContent = t(`countries.${key}`);
    });

    const loading = document.getElementById("loading");
    if (loading) loading.textContent = t("loading");
  }

  function onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function init() {
    document.documentElement.lang = lang;
    applyStaticTexts();

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    updateLangButtons();
    onChange(() => updateLangButtons());
  }

  function updateLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  return { t, getLang, setLang, onChange, init, applyStaticTexts };
})();

window.I18n = I18n;
