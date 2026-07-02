/**
 * planEngine.js
 * Gün-gün, saatlere bölünmüş gezi planı ve tahmini bütçe üretir.
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

  function pickActivities(cityMeta, interests, count, usedKeys) {
    const pool = [];
    (cityMeta.activities || []).forEach((act) => {
      const score = interests.includes(act.category) ? 3 : 1;
      for (let i = 0; i < score; i++) pool.push(act);
    });

    const picked = [];
    const shuffled = pool.sort(() => Math.random() - 0.5);

    for (const act of shuffled) {
      if (picked.length >= count) break;
      const key = act.key || act.title.tr;
      if (usedKeys.has(key)) continue;
      usedKeys.add(key);
      picked.push(act);
    }

    while (picked.length < count) {
      const fallback = (cityMeta.activities || [])[picked.length % (cityMeta.activities?.length || 1)];
      if (!fallback) break;
      picked.push(fallback);
    }

    return picked.slice(0, count);
  }

  function getCityMeta(cityName) {
    return window.CITY_META?.[cityName] || {
      currency: "EUR",
      language: { tr: "Yerel dil", en: "Local language" },
      activities: [
        {
          key: "walk",
          title: { tr: "Şehir merkezinde yürüyüş", en: "City center walk" },
          category: "relax",
          cost: 0,
          duration: 90,
        },
        {
          key: "local-food",
          title: { tr: "Yerel lezzetler", en: "Local cuisine" },
          category: "food",
          cost: 25,
          duration: 60,
        },
      ],
    };
  }

  function distributeCities(cities, days) {
    if (cities.length === 0) return [];
    const result = [];
    for (let d = 0; d < days; d++) {
      result.push(cities[d % cities.length]);
    }
    return result;
  }

  function generate({ countryKey, cities, days, pace, interests }) {
    const lang = I18n.getLang();
    const slots = PACE_SLOTS[pace] || PACE_SLOTS.normal;
    const cityRotation = distributeCities(cities, days);
    const usedKeys = new Set();
    const itinerary = [];

    let budgetFood = 0;
    let budgetActivities = 0;
    let budgetTransport = 0;
    let budgetMisc = 0;

    const rates = BUDGET_RATES[pace] || BUDGET_RATES.normal;

    cityRotation.forEach((city, dayIndex) => {
      const meta = getCityMeta(city);
      const activities = pickActivities(meta, interests, slots.length, usedKeys);

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

      itinerary.push({
        day: dayIndex + 1,
        city,
        schedule,
      });
    });

    const budget = {
      food: budgetFood,
      activities: budgetActivities,
      transport: budgetTransport,
      misc: budgetMisc,
      total: budgetFood + budgetActivities + budgetTransport + budgetMisc,
      currency: getCityMeta(cities[0]).currency || country?.currency || "EUR",
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

  return { generate };
})();

window.PlanEngine = PlanEngine;
