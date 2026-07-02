/**
 * ui.js
 * DOM etkileşimleri: ülke/şehir seçimi, plan paneli, i18n entegrasyonu.
 */

const UI = (() => {
  let selectedKey = null;
  let selectedCities = new Set();
  let busy = false;
  let currentPlan = null;

  function init() {
    document.querySelectorAll(".country-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (busy) return;
        busy = true;
        selectedKey = btn.dataset.country;
        selectedCities = new Set();

        document.getElementById("title").classList.remove("show");
        document.getElementById("country-list").classList.remove("show");
        document.querySelectorAll(".country-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });

        Globe.focusOnCountry(selectedKey);
      });
    });

    Globe.onArrive(() => {
      showCountryPanel(selectedKey);
      busy = false;
    });

    document.getElementById("close-panel").addEventListener("click", resetToGlobe);

    document.getElementById("continue-btn").addEventListener("click", () => {
      Preferences.reset();
      Preferences.open();
    });

    document.getElementById("back-to-prefs").addEventListener("click", () => {
      document.getElementById("plan-panel").classList.remove("open");
      document.getElementById("preferences-panel").classList.add("open");
    });

    document.getElementById("download-pdf-btn").addEventListener("click", () => {
      if (currentPlan) PdfExport.download(currentPlan);
    });

    Preferences.onSubmit((summary) => {
      const plan = PlanEngine.generate({
        countryKey: selectedKey,
        cities: Array.from(selectedCities),
        days: summary.days,
        pace: summary.pace,
        interests: summary.interests,
      });
      currentPlan = plan;
      showPlanPanel(plan);
    });

    I18n.onChange(() => {
      if (selectedKey) refreshCountryPanel(selectedKey);
      if (currentPlan) {
        currentPlan.country = getCountryName(selectedKey, I18n.getLang());
        renderPlan(currentPlan);
        if (document.getElementById("plan-panel").classList.contains("open")) {
          CityInfo.renderAll(document.getElementById("city-info-cards"), currentPlan.cities);
        }
      }
      Preferences.renderOptions();
    });
  }

  function refreshCountryPanel(key) {
    if (!document.getElementById("info-panel").classList.contains("open")) return;
    showCountryPanel(key, true);
  }

  function showCountryPanel(key, preserveSelection) {
    const country = window.COUNTRIES[key];
    const lang = I18n.getLang();
    const name = getCountryName(key, lang);

    document.getElementById("panel-eyebrow").textContent = I18n.t("panelEyebrow");
    document.getElementById("panel-title").innerHTML = `${country.flag} ${name}`;
    document.getElementById("panel-emojis").innerHTML =
      country.emojis.map((e) => `<span class="emoji-pill">${e}</span>`).join("");
    document.getElementById("panel-desc").textContent =
      getCountryDesc(key, lang) + I18n.t("panelDescSuffix");

    if (!preserveSelection) {
      selectedCities = new Set();
      document.getElementById("city-photos").classList.remove("show");
      document.getElementById("city-photos").innerHTML = "";
    }

    const listEl = document.getElementById("city-list");
    listEl.innerHTML = "";

    country.cities.forEach((city) => {
      const row = document.createElement("div");
      row.className = "city-row" + (selectedCities.has(city) ? " selected" : "");
      row.innerHTML = `<span>${city}</span><span class="check"></span>`;
      row.addEventListener("click", () => {
        if (selectedCities.has(city)) {
          selectedCities.delete(city);
          row.classList.remove("selected");
        } else {
          selectedCities.add(city);
          row.classList.add("selected");
        }
        document.getElementById("continue-btn").classList.toggle("ready", selectedCities.size > 0);
        showCityPhotos(city);
      });
      listEl.appendChild(row);
    });

    document.getElementById("continue-btn").classList.toggle("ready", selectedCities.size > 0);
    document.getElementById("info-panel").classList.add("open");
  }

  async function showCityPhotos(city) {
    const wrap = document.getElementById("city-photos");
    wrap.innerHTML = `<div class="city-photos-label">${city}</div>
      <div class="city-photos-track"><div class="photo-loading">${I18n.t("photosLoading")}</div></div>`;
    wrap.classList.add("show");

    const photos = await Photos.fetchCityPhotos(city);

    if (!photos || photos.length === 0) {
      wrap.querySelector(".city-photos-track").innerHTML =
        `<div class="photo-loading">${I18n.t("photosNotFound")}</div>`;
      return;
    }

    wrap.querySelector(".city-photos-track").innerHTML = photos
      .map((url) => `<img src="${url}" alt="${city}" loading="lazy" />`)
      .join("");
  }

  function showPlanPanel(plan) {
    document.getElementById("preferences-panel").classList.remove("open");
    renderPlan(plan);
    CityInfo.renderAll(document.getElementById("city-info-cards"), plan.cities);
    document.getElementById("plan-panel").classList.add("open");
  }

  function resolveActivityTitle(city, actKey, fallback) {
    const meta = window.CITY_META?.[city];
    const act = meta?.activities?.find((a) => a.key === actKey);
    const lang = I18n.getLang();
    if (act?.title) return act.title[lang] || act.title.tr;
    return fallback;
  }

  function renderPlan(plan) {
    const lang = I18n.getLang();
    const itineraryEl = document.getElementById("itinerary");
    itineraryEl.innerHTML = plan.itinerary
      .map(
        (day) => `
      <div class="day-block">
        <div class="day-block-header">
          <h4>${I18n.t("dayLabel")} ${day.day}</h4>
          <span>${day.city}</span>
        </div>
        <div class="schedule-list">
          ${day.schedule
            .map(
              (slot) => {
                const title = resolveActivityTitle(day.city, slot.actKey, slot.title);
                return `
            <div class="schedule-item">
              <span class="schedule-time">${slot.time}</span>
              <span class="schedule-title">${title}</span>
              <span class="schedule-cost">${slot.cost > 0 ? slot.cost + " " + plan.budget.currency : "—"}</span>
            </div>`;
              }
            )
            .join("")}
        </div>
      </div>`
      )
      .join("");

    const b = plan.budget;
    document.getElementById("budget-rows").innerHTML = `
      <div class="budget-row"><span>${I18n.t("budgetFood")}</span><span>${b.food} ${b.currency}</span></div>
      <div class="budget-row"><span>${I18n.t("budgetActivities")}</span><span>${b.activities} ${b.currency}</span></div>
      <div class="budget-row"><span>${I18n.t("budgetTransport")}</span><span>${b.transport} ${b.currency}</span></div>
      <div class="budget-row"><span>${I18n.t("budgetMisc")}</span><span>${b.misc} ${b.currency}</span></div>`;

    document.getElementById("budget-total").innerHTML =
      `<span>${I18n.t("budgetTotal")}</span><span>${b.total} ${b.currency}</span>`;
  }

  function resetToGlobe() {
    document.getElementById("info-panel").classList.remove("open");
    document.getElementById("preferences-panel").classList.remove("open");
    document.getElementById("plan-panel").classList.remove("open");
    document.getElementById("continue-btn").classList.remove("ready");
    document.querySelectorAll(".country-btn").forEach((b) => b.classList.remove("active"));
    selectedKey = null;
    selectedCities = new Set();
    currentPlan = null;

    Globe.resetToGlobe();

    setTimeout(() => {
      document.getElementById("title").classList.add("show");
      document.getElementById("country-list").classList.add("show");
    }, 300);
  }

  return { init };
})();

window.UI = UI;
