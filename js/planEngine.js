/**
 * planEngine.js
 * İlgi alanlarına göre kişiselleştirilmiş, saatlere bölünmüş gezi planı.
 */

const PlanEngine = (() => {
  const PACE_SLOTS = {
    relaxed: ["09:30", "12:00", "15:30"],
    normal: ["09:00", "11:00", "13:30", "16:00", "19:00"],
    intense: ["08:30", "10:00", "11:30", "13:00", "15:00", "17:00", "19:30"],
  };

  const BUDGET_RATES = {
    relaxed: { food: 35, transport: 12, misc: 8 },
    normal: { food: 45, transport: 15, misc: 10 },
    intense: { food: 55, transport: 20, misc: 14 },
  };

  const TEMPLATES = {
    history: {
      tr: "{city} tarihi merkez turu",
      en: "{city} historic center tour",
      cost: 15,
      duration: 120,
    },
    food: {
      tr: "{city} yerel lezzetleri keşfi",
      en: "{city} local food discovery",
      cost: 28,
      duration: 90,
    },
    cafe: {
      tr: "{city} en iyi kafelerinde mola",
      en: "Coffee break at {city}'s best cafés",
      cost: 8,
      duration: 45,
    },
    nature: {
      tr: "{city} doğa yürüyüşü",
      en: "{city} nature walk",
      cost: 0,
      duration: 120,
    },
    art: {
      tr: "{city} sanat müzesi / galeri",
      en: "{city} art museum / gallery",
      cost: 18,
      duration: 120,
    },
    shopping: {
      tr: "{city} alışveriş caddesi",
      en: "{city} shopping district",
      cost: 0,
      duration: 90,
    },
    nightlife: {
      tr: "{city} gece hayatı rotası",
      en: "{city} nightlife route",
      cost: 40,
      duration: 150,
    },
    relax: {
      tr: "{city} sakin bir öğleden sonra",
      en: "Quiet afternoon in {city}",
      cost: 0,
      duration: 90,
    },
    photo: {
      tr: "{city} fotoğraf noktaları",
      en: "{city} photo spots",
      cost: 0,
      duration: 75,
    },
    family: {
      tr: "{city} aile dostu aktivite",
      en: "{city} family-friendly activity",
      cost: 20,
      duration: 120,
    },
  };

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildGenericActivities(cityName, interests) {
    const lang = I18n.getLang();
    const categories = interests.length > 0 ? interests : Object.keys(TEMPLATES);
    return categories.map((cat) => {
      const t = TEMPLATES[cat] || TEMPLATES.relax;
      return {
        key: `${cityName}-${cat}`,
        title: {
          tr: t.tr.replace("{city}", cityName),
          en: t.en.replace("{city}", cityName),
        },
        category: cat,
        cost: t.cost,
        duration: t.duration,
      };
    });
  }

  function getCityMeta(cityName, countryKey) {
    if (window.CITY_META?.[cityName]) return window.CITY_META[cityName];
    const country = window.COUNTRIES[countryKey];
    return {
      currency: country?.currency || "EUR",
      language: { tr: "Yerel dil", en: "Local language" },
      activities: buildGenericActivities(cityName, []),
    };
  }

  function scoreActivity(act, interests) {
    if (!interests || interests.length === 0) return 1;
    return interests.includes(act.category) ? 10 : 0;
  }

  function pickActivities(cityName, countryKey, interests, count, usedKeys) {
    const meta = getCityMeta(cityName, countryKey);
    let pool = [...(meta.activities || [])];

    if (interests.length > 0) {
      const matchingCount = pool.filter((a) => interests.includes(a.category)).length;
      if (matchingCount < count) {
        buildGenericActivities(cityName, interests).forEach((a) => {
          if (!pool.some((p) => p.key === a.key)) pool.push(a);
        });
      }
    }

    pool = pool.filter((a) => !usedKeys.has(`${cityName}:${a.key}`));

    pool.sort((a, b) => scoreActivity(b, interests) - scoreActivity(a, interests));
    const matching = pool.filter((a) => scoreActivity(a, interests) > 0);
    const fallback = pool.filter((a) => scoreActivity(a, interests) === 0);

    const picked = [];
    for (const act of shuffle(matching)) {
      if (picked.length >= count) break;
      picked.push(act);
      usedKeys.add(`${cityName}:${act.key}`);
    }
    if (picked.length < count) {
      for (const act of shuffle(fallback)) {
        if (picked.length >= count) break;
        picked.push(act);
        usedKeys.add(`${cityName}:${act.key}`);
      }
    }

    return picked.slice(0, count);
  }

  /** Günleri şehirlere arka arkaya, mantıklı bloklar halinde dağıtır. */
  function distributeCities(cities, days) {
    if (cities.length === 0) return [];
    if (cities.length === 1) return Array(days).fill(cities[0]);

    const n = cities.length;
    const base = Math.floor(days / n);
    let extra = days % n;
    const result = [];

    cities.forEach((city) => {
      let block = base + (extra > 0 ? 1 : 0);
      if (extra > 0) extra--;
      for (let i = 0; i < block; i++) result.push(city);
    });

    return result;
  }

  function generate({ countryKey, cities, days, pace, interests }) {
    const lang = I18n.getLang();
    const slots = PACE_SLOTS[pace] || PACE_SLOTS.normal;
    const cityBlocks = distributeCities(cities, days);
    const usedKeys = new Set();
    const itinerary = [];

    let budgetFood = 0;
    let budgetActivities = 0;
    let budgetTransport = 0;
    let budgetMisc = 0;

    const rates = BUDGET_RATES[pace] || BUDGET_RATES.normal;
    const country = window.COUNTRIES[countryKey];

    cityBlocks.forEach((city, dayIndex) => {
      const activities = pickActivities(city, countryKey, interests, slots.length, usedKeys);

      const schedule = slots.map((time, i) => {
        const act = activities[i] || activities[0];
        const title = act.title[lang] || act.title.tr;
        budgetActivities += act.cost || 0;
        return {
          time,
          actKey: act.key,
          title,
          category: act.category,
          cost: act.cost || 0,
          duration: act.duration || 60,
        };
      });

      budgetFood += rates.food;
      budgetTransport += rates.transport;
      budgetMisc += rates.misc;

      itinerary.push({ day: dayIndex + 1, city, schedule });
    });

    const budget = {
      food: budgetFood,
      activities: budgetActivities,
      transport: budgetTransport,
      misc: budgetMisc,
      total: budgetFood + budgetActivities + budgetTransport + budgetMisc,
      currency: getCityMeta(cities[0], countryKey).currency || country?.currency || "EUR",
    };

    return {
      country: getCountryName(countryKey, lang),
      countryKey,
      cities,
      days,
      pace,
      interests,
      itinerary,
      budget,
    };
  }

  return { generate, distributeCities };
})();

window.PlanEngine = PlanEngine;
