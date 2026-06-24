# Yol Haritası — 2 Ay / 4 Faz

Başlangıç: bugün. Hedef teslim: 8 hafta sonra. Her faz ~2 hafta.
Acele etmeye gerek yok; sıralama önemli çünkü her faz bir öncekinin üzerine inşa ediliyor.

## Faz 1 — 3D Dünya & Ülke Seçimi (Hafta 1-2) ✅ Tamamlandı

- 3D dönen dünya sahnesi (Three.js)
- 5 ülke için marker + seçim
- Kamera/dünya zoom-in "keşif" animasyonu
- Ülke varış paneli + çoklu şehir seçimi
- Proje GitHub'a taşındı, modüler dosya yapısı kuruldu

## Faz 2 — Gezi Tercihleri & Plan Motoru (Hafta 3-4)

**Hedef:** Şehir seçiminden sonra kullanıcıdan gün sayısı, tempo ve ilgi
alanlarını alıp gün-gün bir plan üretebilen bir motor.

- [ ] "Devam et" sonrası açılan form: gün sayısı (slider), tempo
  (rahat/normal/yoğun), ilgi alanları (çoklu seçim: tarih, yemek, kafe, doğa)
- [ ] Her şehir için statik mekan veri seti (en az 8-10 mekan/şehir:
  kahvaltı mekanı, gezilecek yer, restoran, kafe, dinlenme noktası —
  her biri ilgi alanı etiketiyle)
- [ ] Kural tabanlı plan oluşturma algoritması:
  - Tempo → günde kaç aktivite (rahat: 3, normal: 4-5, yoğun: 6+)
  - İlgi alanı ağırlıklandırması ile mekan seçimi
  - Coğrafi yakınlık / mantıklı sıralama (aynı bölgedeki yerleri aynı gün)
  - Zaman dilimi ataması: kahvaltı → sabah gezisi → öğle yemeği →
    öğleden sonra → akşam yemeği → akşam aktivitesi
- [ ] Üretilen planın JSON yapısı netleştirilir (Faz 3'ün üzerine
  inşa edeceği veri sözleşmesi)

**Çıktı:** Kullanıcı formu doldurup "Planımı oluştur" dediğinde günlere
bölünmüş bir plan objesi üretiliyor (henüz görsel olarak ham gösterilebilir).

## Faz 3 — Gün Akışı Arayüzü & Zevk Profili (Hafta 5-6)

**Hedef:** Üretilen planı akıcı, görsel bir gün-gün arayüzde sunmak ve
kullanıcı geri bildirimini toplamak.

- [ ] Gün sekmeleri/kaydırmalı görünüm, her gün için zaman çizelgesi
- [ ] Her aktivite kartı: başlık, kısa açıklama, zaman aralığı, ikon
- [ ] Beğen/beğenme (👍/👎) işaretleme — her aktivite için
- [ ] Basit zevk profili: beğenilen ilgi alanı etiketlerinin ağırlığını
  artıran bir skor sistemi (localStorage ile, henüz backend yok)
- [ ] Profil, bir sonraki plan oluşturmada mekan seçimini etkiler

## Faz 4 — Gezi Geçmişi, Harita İşaretleme & Cilalama (Hafta 7-8)

**Hedef:** Ürünü bitmiş ve sunulabilir hale getirmek.

- [ ] Oluşturulan planların kaydedilmesi (localStorage veya basit backend)
- [ ] "Geçmiş Gezilerim" ekranı — kayıtlı planları tekrar görüntüleme
- [ ] Dünya haritasında gidilen ülke/şehirlerin işaretlenmesi (görsel
  gezi geçmişi — Faz 1'deki marker sistemi yeniden kullanılır)
- [ ] Tüm akışın responsive / mobil testi
- [ ] Performans taraması (özellikle 3D sahne — düşük güçlü cihazlarda
  frame rate kontrolü)
- [ ] Görsel cilalama: geçiş animasyonları, boş durum ekranları, hata
  durumları (örn. internet yokken doku yüklenemezse kullanıcıya bilgi)

## Notlar

- Backend/veritabanı gerekip gerekmediği Faz 3 sonunda değerlendirilecek.
  Eğer kullanıcı hesapları / cihazlar arası senkronizasyon istenirse
  (örn. Firebase gibi terminal gerektirmeyen, web panelinden yönetilen bir
  servis) o noktada eklenir.
- Tüm fazlar GitHub üzerinden, tarayıcı tabanlı düzenleme ile ilerletilebilir;
  hiçbir fazda terminal/komut satırı gerekmiyor.
