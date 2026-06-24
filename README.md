# Keşif — 3D Dünya Üzerinden Kişiselleştirilmiş Gezi Planlayıcı

Kullanıcının 3D dönen bir dünya üzerinden bir ülke seçip o ülkeye görsel bir
"keşif" animasyonuyla yaklaştığı, ardından şehir/gün/tempo/ilgi alanı
bilgilerine göre kişiselleştirilmiş gün-gün gezi planı aldığı bir keşif
platformu.

Bu depo, projeyi **4 faz halinde 2 ay içinde** tamamlamak için kuruldu.
Şu an **Faz 1** tamamlandı: 3D dünya, ülke seçimi, kamera keşif animasyonu,
şehir seçim paneli.

## Canlı önizleme (kurulum gerektirmez)

Bu proje saf HTML/CSS/JS'dir, hiçbir derleme adımı (build), npm kurulumu
veya terminal gerektirmez.

**Yöntem 1 — Doğrudan açma:** `index.html` dosyasını indir, tarayıcıda aç.

**Yöntem 2 — GitHub Pages (önerilen, tamamen tarayıcı üzerinden):**
1. Bu depoyu GitHub'a yükle (web arayüzünden "Add file → Upload files" ile,
   terminal/git gerekmez).
2. Depo sayfasında **Settings → Pages** sekmesine gir.
3. "Branch" altında `main` / `(root)` seç, **Save**'e bas.
4. Birkaç dakika içinde `https://kullaniciadi.github.io/depo-adi/` adresinde
   proje canlıya çıkar.

Her değişiklik için tek yapman gereken dosyayı GitHub web arayüzünden
düzenlemek veya yeniden yüklemek — terminale hiç ihtiyacın yok.

## Proje yapısı

```
kesif-projesi/
├── index.html          # Ana sayfa, tüm script/style referansları
├── css/
│   └── style.css       # Arayüz stilleri
├── js/
│   ├── data.js         # Ülke/şehir veri katmanı (Faz 2'de genişletilecek)
│   ├── globe.js        # Three.js 3D dünya sahnesi ve kamera animasyonu
│   ├── ui.js            # DOM etkileşimleri (butonlar, panel, seçimler)
│   └── main.js          # Giriş noktası, açılış sırası
└── docs/
    └── ROADMAP.md       # 2 aylık detaylı yol haritası
```

## Kullanılan teknoloji

- **Three.js r128** (CDN üzerinden, kurulum gerekmez)
- Vanilla JavaScript (framework yok — proje büyüdükçe Faz 3'te ihtiyaç
  olursa değerlendirilecek)
- Dünya dokusu: NASA Blue Marble tabanlı, `three-globe` npm paketinin
  CDN üzerinden servis edilen görseli (CDN erişilemezse otomatik olarak
  basit bir yedek dokuya düşer, uygulama hiçbir zaman kırılmaz)

## Faz 1'de yapılanlar

- [x] 3D dönen dünya, gerçekçi doku, yıldız alanı
- [x] 5 ülke için lat/lon koordinatlı ışıklı marker
- [x] Ülke seçiminde kamera + dünya rotasyonu ile "keşif" zoom animasyonu
- [x] Varış sonrası açılan bilgi paneli + çoklu şehir seçimi
- [x] Geri dönüş (✕) ile dünyaya dönme animasyonu
- [x] Mobil uyumlu temel responsive düzen

## Sırada ne var

Detaylı plan için `docs/ROADMAP.md` dosyasına bak. Kısaca:

- **Faz 2:** Şehir seçimi sonrası gün sayısı / tempo / ilgi alanı formu +
  kural tabanlı gün-gün plan oluşturma motoru
- **Faz 3:** Gün akışı arayüzü (kahvaltı → gezi → öğle → akşam), beğen/beğenme
  geri bildirimi, kullanıcı zevk profili
- **Faz 4:** Geçmiş geziler, dünya haritasında işaretlenmiş gezi geçmişi,
  son cilalama ve performans/responsive iyileştirmeleri

## Lisans

Bu proje şu an kişisel/portföy amaçlı geliştirilmektedir.
