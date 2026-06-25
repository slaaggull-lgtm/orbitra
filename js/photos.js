/**
 * photos.js
 * Şehirler için GERÇEK fotoğrafları Wikipedia'nın herkese açık görsel
 * API'sinden anlık olarak çeker (Wikimedia Commons, serbest/CC lisanslı
 * görseller — hotlink kullanımı Wikipedia tarafından desteklenir).
 *
 * Avantajı: Elle URL toplamaya gerek yok, her zaman güncel ve gerçek
 * şehir görselleri gösterir. CDN/ağ erişimi yoksa zarif bir şekilde
 * boş/yedek duruma düşer.
 */

const Photos = (() => {
  const cache = new Map();

  async function fetchCityPhotos(cityNameTr) {
    if (cache.has(cityNameTr)) return cache.get(cityNameTr);

    const wikiTitle = window.CITY_WIKI_TITLES[cityNameTr] || cityNameTr;
    let urls = [];

    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(wikiTitle)}`
      );
      if (res.ok) {
        const data = await res.json();
        urls = (data.items || [])
          .filter((item) => item.type === "image" && item.original && item.original.source)
          // ikon/harita/arma gibi küçük teknik görselleri ele: gerçek fotoğraflar genelde geniştir
          .filter((item) => !/\.(svg)$/i.test(item.original.source))
          .slice(0, 4)
          .map((item) => item.original.source);
      }
    } catch (e) {
      console.warn("Wikipedia fotoğrafları çekilemedi:", wikiTitle, e);
    }

    // Yedek: tek görsel için Wikipedia özet API'si (daha güvenilir, tek foto)
    if (urls.length === 0) {
      try {
        const res2 = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
        );
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.originalimage && data2.originalimage.source) {
            urls = [data2.originalimage.source];
          }
        }
      } catch (e) {
        console.warn("Wikipedia özet fotoğrafı da çekilemedi:", wikiTitle, e);
      }
    }

    cache.set(cityNameTr, urls);
    return urls;
  }

  return { fetchCityPhotos };
})();

window.Photos = Photos;
