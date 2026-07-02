/**
 * countryPicker.js
 * Tüm ülkeleri arama ve seçim modalı.
 */

const CountryPicker = (() => {
  let open = false;

  function isOpen() {
    return open;
  }

  function renderList(filter) {
    const list = document.getElementById("country-picker-list");
    if (!list) return;

    const lang = I18n.getLang();
    const q = (filter || "").trim().toLowerCase();

    const items = Object.values(window.COUNTRIES)
      .filter((c) => {
        if (!q) return true;
        const tr = c.name.tr.toLowerCase();
        const en = c.name.en.toLowerCase();
        return tr.includes(q) || en.includes(q) || c.key.includes(q);
      })
      .sort((a, b) => getCountryName(a.key, lang).localeCompare(getCountryName(b.key, lang), lang));

    list.innerHTML = items
      .map(
        (c) =>
          `<button type="button" class="picker-item" data-country="${c.key}">
            <span class="picker-flag">${c.flag}</span>
            <span class="picker-name">${getCountryName(c.key, lang)}</span>
          </button>`
      )
      .join("");

    list.querySelectorAll(".picker-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        close();
        window.UI?.selectCountry?.(btn.dataset.country);
      });
    });
  }

  function openModal() {
    const modal = document.getElementById("country-picker");
    const input = document.getElementById("country-search");
    open = true;
    modal?.classList.add("open");
    renderList("");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 300);
    }
  }

  function close() {
    open = false;
    document.getElementById("country-picker")?.classList.remove("open");
  }

  function init() {
    document.getElementById("open-country-picker")?.addEventListener("click", openModal);
    document.getElementById("country-picker-close")?.addEventListener("click", close);
    document.getElementById("country-picker")?.addEventListener("click", (e) => {
      if (e.target.id === "country-picker") close();
    });

    document.getElementById("country-search")?.addEventListener("input", (e) => {
      renderList(e.target.value);
    });

    I18n.onChange(() => {
      if (open) renderList(document.getElementById("country-search")?.value || "");
    });
  }

  return { init, open: openModal, close, isOpen };
})();

window.CountryPicker = CountryPicker;
