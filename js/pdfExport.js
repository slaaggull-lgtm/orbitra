/**
 * pdfExport.js
 * Oluşturulan gezi planını PDF olarak indirir (jsPDF CDN).
 */

const PdfExport = (() => {
  function ensureJsPDF() {
    return window.jspdf?.jsPDF;
  }

  function resolveTitle(city, slot) {
    const meta = window.CITY_META?.[city];
    const act = meta?.activities?.find((a) => a.key === slot.actKey);
    const lang = I18n.getLang();
    if (act?.title) return act.title[lang] || act.title.tr;
    return slot.title;
  }

  function download(plan) {
    const jsPDF = ensureJsPDF();
    if (!jsPDF) {
      console.error("jsPDF not loaded");
      return;
    }

    const lang = I18n.getLang();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const margin = 18;
    let y = margin;

    doc.setFontSize(18);
    doc.text(lang === "tr" ? "Keşif — Gezi Planı" : "Keşif — Travel Plan", margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(`${plan.country} · ${plan.days} ${I18n.t("daysUnit")}`, margin, y);
    y += 6;
    doc.text(`${lang === "tr" ? "Şehirler" : "Cities"}: ${plan.cities.join(", ")}`, margin, y);
    y += 12;

    doc.setTextColor(0, 0, 0);

    plan.itinerary.forEach((day) => {
      if (y > 260) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(13);
      doc.setTextColor(200, 120, 40);
      doc.text(`${I18n.t("dayLabel")} ${day.day} — ${day.city}`, margin, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);

      day.schedule.forEach((slot) => {
        if (y > 275) {
          doc.addPage();
          y = margin;
        }
        const line = `${slot.time}  ${resolveTitle(day.city, slot)}  (${slot.cost}${plan.budget.currency})`;
        doc.text(line, margin + 2, y);
        y += 6;
      });
      y += 6;
    });

    if (y > 250) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(12);
    doc.setTextColor(200, 120, 40);
    doc.text(I18n.t("budgetTitle"), margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const b = plan.budget;
    const lines = [
      [I18n.t("budgetFood"), b.food],
      [I18n.t("budgetActivities"), b.activities],
      [I18n.t("budgetTransport"), b.transport],
      [I18n.t("budgetMisc"), b.misc],
      [I18n.t("budgetTotal"), b.total],
    ];
    lines.forEach(([label, val]) => {
      doc.text(`${label}: ${val} ${b.currency}`, margin + 2, y);
      y += 6;
    });

    const filename =
      lang === "tr"
        ? `kesif-plani-${plan.countryKey}.pdf`
        : `kesif-plan-${plan.countryKey}.pdf`;
    doc.save(filename);
  }

  return { download };
})();

window.PdfExport = PdfExport;
