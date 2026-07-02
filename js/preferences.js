/**
 * preferences.js
 * Gün sayısı, tempo ve ilgi alanı tercih formu.
 */

const Preferences = (() => {
  let selectedPace = "normal";
  let selectedInterests = new Set();
  let onSubmitCallback = null;

  function init() {
    renderOptions();

    const daysInput = document.getElementById("days-input");
    const daysOutput = document.getElementById("days-output");
    daysInput.addEventListener("input", () => {
      daysOutput.textContent = daysInput.value;
    });

    document.getElementById("back-to-cities").addEventListener("click", () => {
      document.getElementById("preferences-panel").classList.remove("open");
      document.getElementById("info-panel").classList.add("open");
    });

    document.getElementById("build-plan-btn").addEventListener("click", () => {
      const summary = {
        days: parseInt(document.getElementById("days-input").value, 10),
        pace: selectedPace,
        interests: Array.from(selectedInterests),
      };
      if (onSubmitCallback) onSubmitCallback(summary);
    });
  }

  function renderPaceOptions() {
    const wrap = document.getElementById("pace-options");
    wrap.innerHTML = "";
    window.PACE_OPTIONS.forEach((p) => {
      const el = document.createElement("div");
      el.className = "pace-card" + (p.key === selectedPace ? " selected" : "");
      el.innerHTML =
        `<strong>${I18n.t(`pace.${p.key}.label`)}</strong>` +
        `<span>${I18n.t(`pace.${p.key}.desc`)}</span>`;
      el.addEventListener("click", () => {
        selectedPace = p.key;
        document.querySelectorAll(".pace-card").forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
      });
      wrap.appendChild(el);
    });
  }

  function renderInterestOptions() {
    const wrap = document.getElementById("interest-options");
    wrap.innerHTML = "";
    window.INTERESTS.forEach((i) => {
      const el = document.createElement("div");
      el.className = "interest-chip" + (selectedInterests.has(i.key) ? " selected" : "");
      el.innerHTML = `<span>${i.icon}</span> ${I18n.t(`interests.${i.key}`)}`;
      el.addEventListener("click", () => {
        if (selectedInterests.has(i.key)) {
          selectedInterests.delete(i.key);
          el.classList.remove("selected");
        } else {
          selectedInterests.add(i.key);
          el.classList.add("selected");
        }
      });
      wrap.appendChild(el);
    });
  }

  function renderOptions() {
    renderPaceOptions();
    renderInterestOptions();
  }

  function open() {
    document.getElementById("info-panel").classList.remove("open");
    document.getElementById("preferences-panel").classList.add("open");
  }

  function onSubmit(cb) {
    onSubmitCallback = cb;
  }

  function reset() {
    selectedPace = "normal";
    selectedInterests = new Set();
    document.getElementById("days-input").value = 3;
    document.getElementById("days-output").textContent = "3";
    renderOptions();
  }

  return { init, open, onSubmit, reset, renderOptions };
})();

window.Preferences = Preferences;
