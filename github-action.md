# Implementasi GitHub Actions untuk Menjaga Supabase Tetap Aktif

Proyek Supabase pada tier gratis akan otomatis di-pause jika tidak ada aktivitas dalam waktu tertentu (biasanya 1 minggu). Dokumen ini menjelaskan cara menggunakan GitHub Actions untuk melakukan request otomatis secara rutin agar Supabase tetap aktif.

## Mekanisme Kerja
Kita akan membuat sebuah **GitHub Action Workflow** yang berjalan berdasarkan jadwal (**Cron Job**). Workflow ini akan mengirimkan request sederhana ke REST API Supabase (PostgREST) untuk mengambil minimal 1 data dari tabel publik.

## Langkah-langkah Implementasi

### 1. Menyiapkan GitHub Secrets
Untuk keamanan, jangan menuliskan URL dan Key Supabase langsung di kode. Masukkan ke dalam **GitHub Repository Secrets**:
- `SUPABASE_URL`: Ambil dari `NEXT_PUBLIC_SUPABASE_URL` di file `.env.local`.
- `SUPABASE_ANON_KEY`: Ambil dari `NEXT_PUBLIC_SUPABASE_ANON_KEY` di file `.env.local`.

**Cara menambahkan di GitHub:**
1. Buka repositori Anda di GitHub.
2. Pergi ke **Settings** > **Secrets and variables** > **Actions**.
3. Klik **New repository secret**.
4. Tambahkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`.

### 2. Membuat File Workflow
Buat file baru di direktori proyek: `.github/workflows/supabase-keep-alive.yml`.

### 3. Konfigurasi Workflow
Gunakan konfigurasi berikut dalam file tersebut:

```yaml
name: Supabase Keep Alive

on:
  schedule:
    # Berjalan setiap hari pada jam 00:00 UTC
    - cron: '0 0 * * *'
  workflow_dispatch: # Memungkinkan menjalankan manual dari tab Actions

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase API
        run: |
          curl -X GET "${{ secrets.SUPABASE_URL }}/rest/v1/products?select=*&limit=1" \
          -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
          -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

> [!NOTE]
> Pada contoh di atas, kita melakukan query ke tabel `products`. Pastikan tabel tersebut ada atau ganti dengan tabel lain yang tersedia secara publik.

## Verifikasi
1. Setelah file di-push ke GitHub, buka tab **Actions**.
2. Pilih **Supabase Keep Alive**.
3. Klik **Run workflow** untuk mencoba secara manual.
4. Pastikan statusnya berhasil (centang hijau).

## Keuntungan
- Menghindari downtime karena database ter-pause.
- Otomatis dan tidak memerlukan intervensi manual setiap minggu.
- Menggunakan resource gratis dari GitHub Actions.
