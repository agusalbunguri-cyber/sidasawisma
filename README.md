# 🏡 SiDasawisma — Aplikasi Kependudukan Dasawisma

Aplikasi PWA (Progressive Web App) untuk kader Dasawisma RT/RW.
Bisa diinstal di HP Android seperti aplikasi biasa.

---

## 📁 Struktur File

```
dasawisma/
├── public/
│   ├── index.html          ← Halaman utama + PWA meta tags
│   ├── manifest.json       ← Konfigurasi PWA (nama, warna, ikon)
│   ├── service-worker.js   ← Untuk mode offline
│   └── icons/              ← Ikon app (buat dulu, lihat langkah 3)
├── src/
│   ├── index.js            ← Entry point React
│   └── App.js              ← Aplikasi utama SiDasawisma
├── package.json
├── vercel.json             ← Konfigurasi deploy Vercel
└── generate-icons.js       ← Script pembuat ikon
```

---

## 🚀 Cara Deploy ke Vercel (Gratis)

### Langkah 1 — Install Node.js
Download di https://nodejs.org → pilih versi LTS → install.

### Langkah 2 — Install dependensi
Buka folder `dasawisma` di Terminal / Command Prompt:
```bash
npm install
```

### Langkah 3 — Buat ikon app
```bash
npm install canvas
node generate-icons.js
```
> Jika error, buat folder `public/icons/` secara manual dan
> isi dengan file PNG ukuran 192x192 dan 512x512 bernama
> `icon-192x192.png` dan `icon-512x512.png`.
> Bisa buat icon gratis di: https://www.canva.com

### Langkah 4 — Test di komputer
```bash
npm start
```
Buka browser ke http://localhost:3000 ✅

### Langkah 5 — Deploy ke Vercel
```bash
npm install -g vercel
vercel
```
Ikuti instruksi:
- Login/daftar akun Vercel (gratis)
- Pilih: Set up and deploy? → Y
- Project name: sidasawisma
- Directory: ./
- Override settings? → N

Selesai! Dapat URL seperti: **https://sidasawisma.vercel.app**

---

## 📱 Cara Install di HP Android

1. Buka URL aplikasi di **Chrome** Android
2. Tap ikon **⋮ (tiga titik)** di pojok kanan atas
3. Pilih **"Tambahkan ke layar utama"** atau **"Instal aplikasi"**
4. Tap **"Instal"**
5. Aplikasi muncul di layar utama seperti app biasa ✅

---

## 💡 Tips

- **Bagikan ke semua kader** via WhatsApp: kirimkan linknya, mereka tinggal install dari Chrome.
- **Data tersimpan** selama app tidak dihapus dari HP.
- **Mode offline** tersedia setelah pertama kali dibuka.

---

## 🛠 Pengembangan Lanjutan

Untuk fitur database permanen (data tidak hilang saat install ulang):
- Gunakan **Firebase Firestore** (gratis) untuk penyimpanan cloud
- Atau **localStorage** untuk penyimpanan lokal permanen

---

Dibuat dengan ❤️ untuk kader Dasawisma Indonesia
