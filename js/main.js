/**
 * main.js
 * Uygulama giriş noktası.
 */

window.addEventListener("load", () => {
  I18n.init();
  Globe.init(document.getElementById("canvas-holder"));
  Preferences.init();
  UI.init();

  setTimeout(() => {
    const loading = document.getElementById("loading");
    loading.style.opacity = "0";
    setTimeout(() => (loading.style.display = "none"), 800);

    document.getElementById("title").classList.add("show");
    document.getElementById("country-list").classList.add("show");
  }, 600);
});
