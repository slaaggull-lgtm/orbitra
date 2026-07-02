/**
 * cityInfo.js
 * Şehir hakkında kısa bilgiler: hava durumu (Open-Meteo), para birimi, dil.
 */

const CityInfo = (() => {
  const cache = new Map();

  function getMeta(cityName) {
    return window.CITY_META?.[cityName] || {};
  }

  async function fetchWeather(lat, lon) {
    const cacheKey = `${lat},${lon}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("weather fetch failed");
      const data = await res.json();
      const current = data.current;
      const result = {
        temp: Math.round(current.temperature_2m),
        wind: Math.round(current.wind_speed_10m),
        code: current.weather_code,
        description: weatherDescription(current.weather_code),
      };
      cache.set(cacheKey, result);
      return result;
    } catch (e) {
      console.warn("Weather unavailable:", e);
      return null;
    }
  }

  function weatherDescription(code) {
    const lang = I18n.getLang();
    const map = {
      0: { tr: "Açık", en: "Clear" },
      1: { tr: "Çoğunlukla açık", en: "Mostly clear" },
      2: { tr: "Parçalı bulutlu", en: "Partly cloudy" },
      3: { tr: "Bulutlu", en: "Cloudy" },
      45: { tr: "Sisli", en: "Foggy" },
      48: { tr: "Sisli", en: "Foggy" },
      51: { tr: "Hafif çisenti", en: "Light drizzle" },
      53: { tr: "Çisenti", en: "Drizzle" },
      61: { tr: "Yağmurlu", en: "Rainy" },
      63: { tr: "Yağmurlu", en: "Rainy" },
      65: { tr: "Şiddetli yağmur", en: "Heavy rain" },
      71: { tr: "Karlı", en: "Snowy" },
      80: { tr: "Sağanak", en: "Showers" },
      95: { tr: "Fırtınalı", en: "Stormy" },
    };
    const entry = map[code] || { tr: "Değişken", en: "Variable" };
    return entry[lang];
  }

  function weatherIcon(code) {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80) return "🌦️";
    return "🌤️";
  }

  async function loadForCity(cityName) {
    const meta = getMeta(cityName);
    const lang = I18n.getLang();

    let weather = null;
    if (meta.lat != null && meta.lon != null) {
      weather = await fetchWeather(meta.lat, meta.lon);
    }

    return {
      city: cityName,
      weather,
      currency: meta.currency || "—",
      currencyName: meta.currencyName?.[lang] || meta.currency || "—",
      language: meta.language?.[lang] || "—",
      weatherIcon: weather ? weatherIcon(weather.code) : "🌡️",
    };
  }

  function renderCard(info) {
    const weatherBlock = info.weather
      ? `<span class="info-value">${info.weatherIcon} ${info.weather.temp}°C · ${info.weather.description}</span>`
      : `<span class="info-value muted">${I18n.t("weatherUnavailable")}</span>`;

    return `
      <div class="city-info-card">
        <h4>${info.city}</h4>
        <div class="info-row">
          <span class="info-label">${I18n.t("weather")}</span>
          ${weatherBlock}
        </div>
        <div class="info-row">
          <span class="info-label">${I18n.t("currency")}</span>
          <span class="info-value">${info.currencyName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${I18n.t("language")}</span>
          <span class="info-value">${info.language}</span>
        </div>
      </div>`;
  }

  async function renderAll(container, cities) {
    container.innerHTML = `<div class="info-loading">${I18n.t("weatherLoading")}</div>`;
    const cards = await Promise.all(cities.map((c) => loadForCity(c)));
    container.innerHTML = cards.map(renderCard).join("");
  }

  return { loadForCity, renderAll };
})();

window.CityInfo = CityInfo;
