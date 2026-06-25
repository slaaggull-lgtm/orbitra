# 🗓️ Yarın yapılacaklar

> Bugünkü oturumda (Faz 2 — Adım 1) gün sayısı / tempo / ilgi alanı formu
> eklendi: `js/preferences.js`, `index.html` içindeki `#preferences-panel`,
> `js/ui.js` içindeki "Devam et" butonunun yönlendirmesi.
> Şu an "Planımı oluştur" butonuna basınca sadece bir özet `alert` ile
> gösteriliyor — yarınki iş bunu **gerçek bir plana** çevirmek.

## 🎯 Yarının hedefi: Plan oluşturma motoru (Faz 2 — Adım 2)

Tercih formundan gelen `{ days, pace, interests }` objesini alıp, seçilen
şehirler için gün-gün bir plan üreten bir motor yazılacak.

### Adım 1 — Şehir mekan veri seti (`js/places.js`, yeni dosya)

Her şehir için en az 8-10 mekan eklenecek. Önerilen veri şekli:

```js
const PLACES = {
  "Roma": [
    { name: "Pantheon", type: "history", timeOfDay: "morning" },
    { name: "Roscioli", type: "food", timeOfDay: "lunch" },
    { name: "Caffè Sant'Eustachio", type: "cafe", timeOfDay: "afternoon" },
    // ...
  ],
};
```

- `type` → `INTERESTS` içindeki anahtarlarla eşleşmeli (history, food, cafe, nature)
- `timeOfDay` → morning / lunch / afternoon / dinner / evening

Başlangıç için sadece **bugün seçtiğimiz 5 ülkenin ilk şehri** (Roma, Paris,
İstanbul, Tokyo, Madrid) için veri girilmesi yeterli — diğer şehirler
sıradaki günlerde eklenecek.

### Adım 2 — Plan oluşturma fonksiyonu (`js/planEngine.js`, yeni dosya)

```
generatePlan({ cities, days, pace, interests }) → Plan
```

Mantık:
1. `pace` → günlük aktivite sayısını belirler (`PACE_OPTIONS.activitiesPerDay`)
2. Seçilen şehirlerin mekanları birleştirilir, `interests` ile eşleşenler
   öne alınır (basit ağırlıklandırma — ileri seviye algoritma şimdilik gerekmiyor)
3. Mekanlar `timeOfDay` sırasına göre (morning → lunch → afternoon → dinner → evening)
   günlere bölünür
4. Çıkış formatı:

```js
{
  days: [
    {
      dayNumber: 1,
      city: "Roma",
      items: [
        { time: "09:00", title: "Pantheon", type: "history" },
        { time: "13:00", title: "Roscioli", type: "food" },
        ...
      ]
    },
  ]
}
```

### Adım 3 — Geçici görüntüleme

Henüz Faz 3'teki şık gün-akışı arayüzü yok; yarın için yeterli olan:
`alert` yerine, oluşan plan objesini basit bir `<pre>` blok içinde
ekrana yazdırmak (ham ama okunabilir). Asıl güzel arayüz Faz 3'te gelecek.

### Adım 4 — Bağlama

`js/ui.js` içindeki `Preferences.onSubmit(...)` callback'i şu an `alert`
basıyor — bunu `PlanEngine.generatePlan(...)` çağırıp sonucu ekrana
yazdıracak şekilde güncelle.

## ✅ Yarın sonu kontrol listesi

- [ ] `js/places.js` oluşturuldu, en az 5 şehir için mekan verisi girildi
- [ ] `js/planEngine.js` oluşturuldu, `generatePlan()` fonksiyonu çalışıyor
- [ ] `index.html`'e yeni script referansları eklendi
- [ ] "Planımı oluştur" butonu artık gerçek bir gün-gün plan üretiyor
- [ ] Üretilen plan ekranda (ham da olsa) görünüyor
- [ ] Değişiklikler GitHub'a yüklendi, Pages üzerinde test edildi

## 💡 Sıkışırsan

- Mekan verisi girmek can sıkıcı geliyorsa: önce **sadece 1 şehir**
  (örnek: Roma) için 10 mekan gir, motoru onunla test et, sonra diğerlerine geç
- Algoritma karmaşık gelirse: ilk versiyonda ağırlıklandırmayı atla,
  sadece `timeOfDay`'e göre sırala — ilgi alanı eşleştirmesini bir gün
  sonra ekle
