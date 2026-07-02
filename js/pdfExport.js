/**
 * pdfExport.js
 * Gezi planını Türkçe karakter destekli PDF olarak indirir.
 */

const PdfExport = (() => {
  let fontReady = null;

  const FONT_URL =
    "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf";

  async function ensureFont(doc) {
    if (fontReady) {
      doc.setFont("NotoSans", "normal");
      return;
    }
    const res = await fetch(FONT_URL);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const base64 = btoa(binary);
    doc.addFileToVFS("NotoSans-Regular.ttf", base64);
    doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
    doc.setFont("NotoSans", "normal");
    fontReady = true;
  }

  function resolveTitle(city, slot) {
    const meta = window.CITY_META?.[city];
    const act = meta?.activities?.find((a) => a.key === slot.actKey);
    const lang = I18n.getLang();
    if (act?.title) return act.title[lang] || act.title.tr;
    return slot.title;
  }

  function wrapText(doc, text, maxWidth) {
    return doc.splitTextToSize(text, maxWidth);
  }

  async function download(plan) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
      console.error("jsPDF not loaded");
      return;
    }

    const lang = I18n.getLang();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    await ensureFont(doc);

    const margin = 16;
    const pageW = doc.internal.pageSize.getWidth();
    const contentW = pageW - margin * 2;
    let y = margin;

    doc.setFontSize(20);
    doc.setTextColor(30, 30, 30);
    doc.text(lang === "tr" ? "Keşif — Gezi Planı" : "Keşif — Travel Plan", margin, y);
    y += 9;

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`${plan.country} · ${plan.days} ${I18n.t("daysUnit")}`, margin, y);
    y += 6;
    const citiesLine = `${lang === "tr" ? "Şehirler" : "Cities"}: ${plan.cities.join(", ")}`;
    wrapText(doc, citiesLine, contentW).forEach((line) => {
      doc.text(line, margin, y);
      y += 5;
    });
    y += 6;

    plan.itinerary.forEach((day) => {
      if (y > 265) {
        doc.addPage();
        y = margin;
        doc.setFont("NotoSans", "normal");
      }

      doc.setFontSize(13);
      doc.setTextColor(200, 120, 40);
      doc.text(`${I18n.t("dayLabel")} ${day.day} — ${day.city}`, margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);

      day.schedule.forEach((slot) => {
        const title = resolveTitle(day.city, slot);
        const costStr = slot.cost > 0 ? ` (${slot.cost} ${plan.budget.currency})` : "";
        const lines = wrapText(doc, `${slot.time}  ${title}${costStr}`, contentW - 4);
        lines.forEach((line) => {
          if (y > 280) {
            doc.addPage();
            y = margin;
            doc.setFont("NotoSans", "normal");
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
          }
          doc.text(line, margin + 2, y);
          y += 5;
        });
        y += 2;
      });
      y += 4;
    });

    if (y > 250) {
      doc.addPage();
      y = margin;
      doc.setFont("NotoSans", "normal");
    }

    doc.setFontSize(14);
    doc.setTextColor(200, 120, 40);
    doc.text(I18n.t("budgetTitle"), margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const b = plan.budget;
    [
      [I18n.t("budgetFood"), b.food],
      [I18n.t("budgetActivities"), b.activities],
      [I18n.t("budgetTransport"), b.transport],
      [I18n.t("budgetMisc"), b.misc],
      [I18n.t("budgetTotal"), b.total],
    ].forEach(([label, val]) => {
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
