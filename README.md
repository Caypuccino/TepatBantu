TepatBantu

TepatBantu adalah platform digital yang bertujuan meningkatkan transparansi dan akuntabilitas penyaluran bantuan sosial di Indonesia. Website ini menyediakan akses bagi masyarakat untuk memeriksa status penerimaan bantuan sosial, mengajukan permohonan bantuan, menyampaikan sanggahan terhadap dugaan ketidaktepatan sasaran penerima, serta memantau alokasi dan realisasi anggaran bantuan sosial.

Melalui integrasi informasi dan layanan publik dalam satu platform, TepatBantu diharapkan dapat mendorong partisipasi masyarakat dalam mengawasi penyaluran bantuan sosial agar lebih transparan, tepat sasaran, dan dapat dipertanggungjawabkan.

## Fitur Utama

1. Cek Status Bantuan
    * Memeriksa status penerimaan bantuan sosial menggunakan NIK.
    * Menampilkan jenis bantuan, periode penerimaan, dan status kelayakan berdasarkan data yang tersedia.
2. Pengajuan Bantuan Sosial
    * Memfasilitasi masyarakat untuk mengajukan permohonan bantuan sosial.
    * Menyediakan formulir pengajuan dan pengunggahan dokumen pendukung.
    * Memungkinkan pemantauan status pengajuan.
3. Sanggahan dan Pengaduan
    * Menyediakan sarana pelaporan dugaan ketidaktepatan penerima bantuan.
    * Memfasilitasi masyarakat dalam menyampaikan bukti atau informasi pendukung.
    * Menyediakan informasi status tindak lanjut laporan.
4. Transparansi Data Bantuan Sosial
    * Menampilkan statistik jumlah penerima bantuan.
    * Menyajikan informasi alokasi dan realisasi anggaran.
    * Menampilkan distribusi bantuan berdasarkan wilayah dan jenis bantuan.
    * Menyediakan artikel dan press release terkait penyaluran bantuan sosial.

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Frontend | React.js |
| Backend | Laravel | 
| Database | PostgreSQL |
| Containerization | Docker | 
| Container Management | Docker Compose |
| Styling | Tailwind CSS | 
| API Communication | Axios |
| Authentication | Laravel Sanctum |
| Data Visualization | Chart.js | 
| Version Control | Git & GitHub |

🚀 Cara Menjalankan Project

Prerequisites
* Node.js (versi LTS)
* npm
* Git

1. Clone Repository

git clone https://github.com/USERNAME/TepatBantu.git

2. Masuk ke Direktori Project

cd TepatBantu

3. Masuk ke Direktori Frontend

cd frontend

4. Install Dependencies

npm install

5. Jalankan Development Server

npm run dev

6. Buka Website

http://localhost:5173

📂 Project Structure

```
TepatBantu/
│
├── Backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── config/
│   └── composer.json
│
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── docker/
│   └── postgres/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```
## Current Progress

**Development Stage: UI Mockup / Prototype**
Pengembangan TepatBantu saat ini masih berada pada tahap perancangan dan implementasi antarmuka pengguna.

Progress yang telah dilakukan:
- Perancangan konsep dan identifikasi permasalahan.
- Penentuan fitur utama website.
- Perancangan struktur halaman dan alur pengguna.
- Pembuatan mockup antarmuka website.

Pengembangan selanjutnya:
- Implementasi frontend menggunakan React.js.
- Pengembangan backend dan REST API menggunakan Laravel.
- Konfigurasi PostgreSQL menggunakan Docker.
- Integrasi frontend, backend, dan database.
- Implementasi fitur pengecekan status bantuan, pengajuan, dan pengaduan.
- Pengembangan dashboard transparansi data dan visualisasi statistik.

## Privacy & Security

TepatBantu mengutamakan perlindungan data pribadi masyarakat. Informasi sensitif seperti NIK harus diproses melalui mekanisme autentikasi dan otorisasi yang sesuai, serta hanya dapat diakses oleh pihak yang berwenang. Prototipe demonstrasi menggunakan data dummy dan tidak ditujukan untuk memproses NIK asli.

## Project Goal

Mewujudkan ekosistem informasi bantuan sosial yang transparan, mudah diakses, dan partisipatif melalui pemanfaatan teknologi digital.
