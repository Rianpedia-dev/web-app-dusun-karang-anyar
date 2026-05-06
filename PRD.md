# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

## WebApp Marketplace Karang Anyar

---

## 1. 🎯 Latar Belakang

Karang Anyar memiliki potensi besar di sektor **peternakan** dan **pertanian**, namun keterbatasan akses pasar membuat produk lokal sulit dikenal luas.

WebApp ini bertujuan untuk:

* Menjadi **etalase digital** produk * Menghubungkan **penjual (warga)** dengan **pembeli luar**
* Meningkatkan **pendapatan masyarakat**

---

## 2. 🎯 Tujuan Produk

### Tujuan Utama:

* Menampilkan produk hasil secara online
* Mempermudah pembeli menghubungi penjual
* Digitalisasi ekonomi desa

### Success Metrics:

* Jumlah produk yang diposting
* Jumlah kontak antara pembeli & penjual
* Traffic pengunjung web
* Jumlah penjual aktif

---

## 3. 👥 Target Pengguna

### 1. Penjual (Warga)

* Petani
* Peternak
* UMKM lokal

### 2. Pembeli

* Masyarakat umum
* Pedagang / reseller
* Konsumen kota

### 3. Admin

* Pengelola web (bisa perangkat desa)

---

## 4. 🧩 Fitur Utama

### 4.1. Landing Page

* Informasi * Highlight produk unggulan
* CTA: "Lihat Produk"

---

### 4.2. Katalog Produk

* List semua produk
* Filter:

  * Kategori (Pertanian / Peternakan)
  * Harga
* Search produk

---

### 4.3. Detail Produk

* Foto produk
* Nama produk
* Deskripsi
* Harga
* Lokasi penjual
* Kontak (WhatsApp / No HP)
* Tombol: "Hubungi Penjual"

---

### 4.4. Posting Produk (Penjual)

* Form input:

  * Nama produk
  * Deskripsi
  * Harga
  * Kategori
  * Upload gambar
  * Nomor kontak
* CRUD (Create, Read, Update, Delete)

---

### 4.5. Dashboard Penjual

* List produk milik sendiri
* Edit / hapus produk
* Statistik sederhana:

  * Jumlah dilihat
  * Jumlah klik kontak

---

### 4.6. Admin Panel

* Approve / reject produk
* Moderasi konten
* Manage user
* Analytics dasar

---

### 4.7. Sistem Kontak

* Klik tombol → redirect ke WhatsApp
* Format pesan otomatis:

  ```
  Halo, saya tertarik dengan produk [nama produk]
  ```

---

## 5. 🧱 Arsitektur Teknologi

### Frontend

* Framework: **Next.js (App Router)**
* Styling: Tailwind CSS + shadcn/ui
* State: React Query / Zustand

### Backend

* Supabase:

  * Auth (login/register)
  * Database (PostgreSQL)
  * Storage (gambar)

### ORM

* Drizzle ORM

---

## 6. 🗄️ Desain Database (Simplified)

### Table: users

* id
* name
* phone
* role (admin / seller)

---

### Table: products

* id
* user_id
* name
* description
* price
* category
* image_url
* contact
* created_at
* is_approved

---

### Table: product_views

* id
* product_id
* viewed_at

---

### Table: contact_clicks

* id
* product_id
* clicked_at

---

## 7. 🔐 Authentication & Authorization

### Auth:

* Email / Phone login (Supabase Auth)

### Role:

* Admin
* Seller

### Permission:

| Role   | Akses               |
| ------ | ------------------- |
| Seller | CRUD produk sendiri |
| Admin  | Semua data          |

---

## 8. 🎨 UI/UX Guidelines

* Mobile-first (karena target desa)
* Simple & mudah digunakan
* Warna natural (hijau, coklat)
* Fokus pada gambar produk

---

## 9. 🔄 User Flow

### Penjual:

1. Register
2. Login
3. Tambah produk
4. Produk di-approve admin
5. Produk tampil di katalog

---

### Pembeli:

1. Buka web
2. Browse produk
3. Klik produk
4. Klik "Hubungi"
5. Chat via WhatsApp

---

## 10. 📦 MVP Scope (Versi Awal)

Fitur yang HARUS ada:

* Katalog produk
* Detail produk
* Posting produk
* Kontak WhatsApp
* Admin approval

---

## 11. 🚀 Future Features (Next Phase)

* Rating & review produk
* Sistem pembayaran (midtrans)
* Chat langsung di aplikasi
* Geo-location penjual
* Multi / ekspansi

---

## 12. ⚠️ Risiko & Tantangan

* Literasi digital warga rendah
* Koneksi internet terbatas
* Konsistensi update produk
* Moderasi konten

---

## 13. 📊 Analytics

Gunakan:

* Supabase logs
* Google Analytics

Track:

* Page views
* Klik kontak
* Produk populer

---

## 14. 🧪 Testing Strategy

* Unit test (logic)
* Manual testing UI
* UAT dengan warga ---

## 15. 🗓️ Timeline (Estimasi)

| Minggu | Task                |
| ------ | ------------------- |
| 1      | Setup project + DB  |
| 2      | Auth + CRUD produk  |
| 3      | UI katalog + detail |
| 4      | Admin panel         |
| 5      | Testing + deploy    |

---

## 16. 📌 Deployment

* Frontend: Vercel
* Backend: Supabase
* Domain: custom (misal: karanganyar-market.id)

---

## 17. 💡 Nilai Tambah Produk

* Mendukung ekonomi lokal
* Digitalisasi desa
* Potensi scale ke desa lain

---
l bilang mau lanjut ke bagian mana 👍
