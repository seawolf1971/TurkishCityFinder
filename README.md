
# Turkish City Finder

**Turkish City Finder**, Türkiye'nin şehirlerini tahmin etme üzerine eğlenceli ve öğretici bir web oyunudur. Bu proje, React ile geliştirilmiş bir frontend ve MySQL ile desteklenen bir backend altyapısına sahiptir. Kullanıcıların şehir bilgilerini ve ipuçlarını değerlendirerek doğru tahmini yapmalarını hedefler.

---

## 🎯 Projenin Amacı

Oyunun amacı, rastgele seçilmiş bir şehri verilen ipuçlarıyla tahmin etmektir. Kullanıcı, şehirlerle ilgili farklı özellikleri (örneğin plaka numarası, nüfus, harf sayısı gibi) dikkate alarak doğru tahmine ulaşmaya çalışır.

---

## 🛠️ Özellikler

- **Türkiye Haritası**:
  - Haritada tüm şehirler görüntülenir.
  - Şehirlerin üzerine fareyle geldiğinizde belirginleşir.
  - Doğru tahmin edilen şehir yeşil, yanlış tahmin edilen şehir kırmızı renk alır.

- **Şehir Tahmini**:
  - Kullanıcı haritadan şehir seçebilir veya giriş kutusundan şehir adı yazabilir.
  - `Tahmin Et` butonu veya Enter tuşu ile tahmin yapılır.
  - Doğru tahminde detaylı şehir bilgileri görüntülenir.

- **İpuçları**:
  - **Plaka numarası**: Yukarı/aşağı ok ve renk kodlarıyla kıyaslama.
  - **Bölge**: Doğru veya farklı bölgeye göre renk kodları.
  - **Nüfus**: Yukarı/aşağı ok ve renk kodlarıyla kıyaslama.
  - **Harf sayısı**: Yukarı/aşağı ok ve renk kodlarıyla kıyaslama.

- **Tahmin Hakları**:
  - Kullanıcı, toplam 4 tahmin hakkına sahiptir.
  - Tüm haklar bitince doğru şehir otomatik olarak gösterilir.

---

## 🚀 Teknolojiler

### Frontend
- **React**: Kullanıcı arayüzünü geliştirmek için.
- **TailwindCSS**: Modern ve sade bir tasarım için.

### Backend
- **Node.js**: Backend API geliştirmek için.
- **MySQL**: Şehir verilerini depolamak için.

---

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/seawolf1971/TurkishCityFinder.git
cd TurkishCityFinder
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Backend için MySQL Kurulumu
- MySQL'i yükleyin ve veritabanınızı oluşturun.
- Veritabanı yapılandırması için `.env` dosyasını doldurun:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=turkish_city_finder
  ```

### 4. Projeyi Çalıştırın
#### Backend:
```bash
npm run start:backend
```

#### Frontend:
```bash
npm start
```

---

## 🗺️ Oyun Akışı

1. Şehir seçimi yapılır (giriş kutusu veya harita üzerinden).
2. Kullanıcı tahminde bulunur.
3. Doğru tahmin edilirse:
   - Şehir yeşil renk alır.
   - Şehir hakkında bilgi gösterilir.
4. Yanlış tahmin edilirse:
   - Şehir kırmızı renk alır.
   - Kullanıcıya ipuçları sunulur.
5. Tüm haklar tükenirse doğru şehir açıklanır.

---

## 📂 Proje Yapısı

```plaintext
turkish-city-finder/
├── .gitignore        # Git izleme dışı bırakılan dosyalar
├── README.md         # Proje açıklamaları
├── package.json      # Proje bağımlılıkları
├── src/              # Frontend dosyaları
│   ├── components/   # React bileşenleri
│   ├── pages/        # Sayfa düzenleri
│   └── App.js        # Uygulama başlangıç dosyası
├── backend/          # Backend dosyaları
│   ├── routes/       # API rotaları
│   ├── models/       # Veritabanı modelleri
│   └── server.js     # Backend giriş dosyası
```

---

## ✨ Katkıda Bulunma

Katkıda bulunmak isterseniz lütfen bu adımları takip edin:

1. Depoyu forklayın.
2. Kendi dalınızı oluşturun (`git checkout -b ozellik-adi`).
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni bir özellik ekledim'`).
4. Değişikliklerinizi dalınıza gönderin (`git push origin ozellik-adi`).
5. Bir **Pull Request** açın.

---

## 📧 İletişim

Eğer bir sorunla karşılaşırsanız veya önerileriniz varsa, lütfen bana ulaşın:

- **GitHub**: [seawolf1971](https://github.com/seawolf1971)
- **E-posta**: egemendurgun01@gmail.com

