/**
 * ui.js
 * Tüm DOM etkileşimleri: ülke butonları, bilgi paneli, şehir seçimi.
 * Globe.js sadece 3D sahneyi yönetir; bu dosya arayüzü yönetir.
 */

const UI = (() => {
  let selectedKey = null;
  let selectedCities = new Set();
  let busy = false;

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

    Preferences.onSubmit((summary) => {
      const country = window.COUNTRIES[selectedKey];
      // Faz 2 — Adım 2'de (plan motoru) bu obje gerçek bir plan üretimine girecek.
      console.log("Plan özeti:", {
        country: country.name,
        cities: Array.from(selectedCities),
        ...summary,
      });
      alert(
        "Plan özeti hazır (konsola da yazıldı):\n\n" +
        "Ülke: " + country.name + "\n" +
        "Şehirler: " + Array.from(selectedCities).join(", ") + "\n" +
        "Gün sayısı: " + summary.days + "\n" +
        "Tempo: " + summary.pace + "\n" +
        "İlgi alanları: " + summary.interests.join(", ") +
        "\n\nSıradaki adım: bu veriyi gerçek bir gün-gün plana çeviren motor."
      );
    });
  }

  function showCountryPanel(key) {
    const country = window.COUNTRIES[key];

    document.getElementById("panel-eyebrow").textContent = "SEÇİLEN ÜLKE";
    document.getElementById("panel-title").textContent = country.name;
    document.getElementById("panel-desc").textContent =
      country.desc + " Aşağıdan bir veya birkaç şehir seç, Faz 2'de buradan gün gün gezi planına geçeceğiz.";

    const listEl = document.getElementById("city-list");
    listEl.innerHTML = "";

    country.cities.forEach((city) => {
      const row = document.createElement("div");
      row.className = "city-row";
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
      });
      listEl.appendChild(row);
    });

    document.getElementById("info-panel").classList.add("open");
  }

  function resetToGlobe() {
    document.getElementById("info-panel").classList.remove("open");
    document.getElementById("continue-btn").classList.remove("ready");
    document.querySelectorAll(".country-btn").forEach((b) => b.classList.remove("active"));
    selectedKey = null;
    selectedCities = new Set();

    Globe.resetToGlobe();

    setTimeout(() => {
      document.getElementById("title").classList.add("show");
      document.getElementById("country-list").classList.add("show");
    }, 300);
  }

  return { init };
})();

window.UI = UI;
