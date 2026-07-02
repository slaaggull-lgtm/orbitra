/**
 * navigation.js
 * Adım bazlı geri navigasyon ve üst bar durumu.
 */

const Navigation = (() => {
  const STEPS = { HOME: "home", COUNTRY: "country", PREFERENCES: "preferences", PLAN: "plan" };
  let step = STEPS.HOME;
  const listeners = new Set();

  function getStep() {
    return step;
  }

  function setStep(next) {
    step = next;
    syncUI();
    listeners.forEach((fn) => fn(step));
  }

  function syncUI() {
    const ui = document.getElementById("ui");
    const backBtn = document.getElementById("nav-back");
    const hero = document.getElementById("hero-zone");

    if (ui) ui.dataset.step = step;
    if (hero) hero.classList.toggle("collapsed", step !== STEPS.HOME);
    if (backBtn) backBtn.classList.toggle("visible", step !== STEPS.HOME);
    if (window.Globe?.refreshLayout) Globe.refreshLayout();
  }

  function back() {
    if (step === STEPS.PLAN) setStep(STEPS.PREFERENCES);
    else if (step === STEPS.PREFERENCES) setStep(STEPS.COUNTRY);
    else if (step === STEPS.COUNTRY) setStep(STEPS.HOME);
  }

  function onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function init() {
    document.getElementById("nav-back")?.addEventListener("click", () => {
      if (CountryPicker.isOpen()) {
        CountryPicker.close();
        return;
      }
      window.UI?.handleBack?.();
    });
    syncUI();
  }

  return { STEPS, getStep, setStep, back, onChange, init };
})();

window.Navigation = Navigation;
