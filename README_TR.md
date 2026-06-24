<div align="center">

# 🌍 Orbitra

### 3D bir dünya üzerinden keşfet, kişiselleştirilmiş gezi planını al

[![Status](https://img.shields.io/badge/durum-aktif%20geliştiriliyor-orange?style=for-the-badge)](#-yol-haritası)
[![Phase](https://img.shields.io/badge/faz-2%20%2F%204-blue?style=for-the-badge)](#-yol-haritası)
[![Three.js](https://img.shields.io/badge/three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org)



*Bir harita değil. Bir keşif anı.*

</div>

---

## ✨ Bu proje ne yapıyor?

Klasik gezi planlayıcılar bir form doldurup liste döndürür. **Keşif** bunu
bir *deneyime* çeviriyor:

```
🌍 dönen dünya  →  🎯 ülke seç  →  🚀 kamera zoom (keşif animasyonu)
        ↓
🏙️ şehir seç  →  📅 gün / 🚶 tempo / ❤️ ilgi alanı
        ↓
📋 gün-gün, zaman akışlı, kişisel gezi planı
        ↓
👍 / 👎 geri bildirim  →  🧠 beğeni profili  →  🗺️ gezi geçmişi haritası
```

Amaç sadece "nereye gidilir" sorusuna cevap vermek değil — kullanıcıya
ekrandan bir şehre **gerçekten yaklaşıyormuş** hissini yaşatmak.

## 🎬 Şu an çalışan özellikler

| Özellik | Durum |
|---|---|
| 3D dönen dünya (gerçek doku, yıldız alanı) | ✅ |
| Ülke seçimi + kamera "keşif" zoom animasyonu | ✅ |
| Şehir seçim paneli (çoklu seçim) | ✅ |
| Gün sayısı / tempo / ilgi alanı formu | ✅ |
| Gün-gün plan oluşturma motoru | 🚧 Faz 2 — şu an üzerinde çalışılıyor |
| Beğen/beğenme +  profil | ⏳ Faz 3 |
| Gezi geçmişi + harita işaretleme | ⏳ Faz 4 |




## 🗂️ Proje haritası

```
kesif-projesi/
│
├── 🏠 index.html              uygulamanın tek giriş sayfası
│
├── 🎨 css/
│   └── style.css              tüm görsel stiller
│
├── ⚙️ js/
│   ├── data.js                 ülke / şehir / ilgi alanı / tempo verisi
│   ├── globe.js                 3D dünya sahnesi + kamera keşif animasyonu
│   ├── preferences.js           gün / tempo / ilgi alanı tercih formu
│   ├── ui.js                     panel ve buton etkileşimleri
│   └── main.js                   uygulamanın açılış sırası
│
└── 📚 docs/
    ├── ROADMAP.md               8 haftalık tam yol haritası
    └── YARIN.md                  bir sonraki oturumda yapılacaklar
```

## 🧰 Teknoloji seçimleri ve neden

| Seçim | Neden |
|---|---|
| **Three.js** (CDN, r128) | Kurulum gerektirmeden tarayıcıda güçlü 3D sahne |
| **Vanilla JS, framework yok** | Proje küçükken karmaşıklık eklememek; Faz 3'te ihtiyaç doğarsa değerlendirilecek |
| **NASA Blue Marble dokusu** (CDN) | Gerçekçi kıta hatları; CDN erişilemezse otomatik yedek dokuya düşer, uygulama hiç kırılmaz |


## 🗺️ Yol haritası

```
Hafta 1-2   ████████████████████  Faz 1  ✅  3D dünya & ülke seçimi
Hafta 3-4   ██████████░░░░░░░░░░  Faz 2  🚧  tercihler & plan motoru
Hafta 5-6   ░░░░░░░░░░░░░░░░░░░░  Faz 3  ⏳  gün akışı arayüzü & beğeni profili
Hafta 7-8   ░░░░░░░░░░░░░░░░░░░░  Faz 4  ⏳  gezi geçmişi & cilalama
```


## 🎯 Tasarım felsefesi

"Keşif Doğrusal Değildir, Kaotik ve Akışkandır"
Orbitra, kullanıcıya hangi saatte ne yapacağını söyleyen katı bir ajanda değildir. Aksine coğrafyayı, mekanları ve kullanıcının o anki modunu birbirine bağlayan akıllı ve esnek bir "Çekim Alanı" motorudur.

## 📄 Lisans

Bu proje MIT Lisansı kapsamında lisanslanmıştır.






---

<div align="center">
<sub>🌍 dünya dönüyor, plan şekilleniyor.</sub>
</div>
