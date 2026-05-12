# Aplikasi Demo Simple ERP (GitaFood)

## 📋 Deskripsi Proyek

Proyek ini adalah aplikasi inventory management (GitaFood) full-stack sederhana.
Aplikasi ini memungkinkan admin untuk mengelola Data Master Barang dan Transaksi Barang Masuk/Keluar.

## 🛠️ Stack Teknologi

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Backend** | Laravel | 10 |
| **Frontend** | AngularJS | 1.8 |
| **Database** | MariaDB / MySQL | 8.0+ |

## 🚀 Instalasi & Setup

### 1. Setup Backend (Laravel)

```bash
cd backend

# Install dependencies Laravel
composer install

# Copy file environment & generate key
cp .env.example .env
php artisan key:generate

# Setup database
# Edit file .env dan sesuaikan database credentials, contoh:
# DB_DATABASE=gitafood
# DB_USERNAME=root
# DB_PASSWORD=

# Buat database di mysql:
# CREATE DATABASE gitafood;

# Jalankan migration & seeder untuk memasukkan data master awal
php artisan migrate --seed
```

### 2. Setup Frontend (AngularJS)

Frontend dibangun murni menggunakan HTML statis dan AngularJS tanpa build-step tambahan.

```bash
cd frontend
npm install
```

## 💻 Cara Menjalankan Aplikasi

Jalankan kedua server berikut di terminal terpisah:

1. **Backend Server**
   ```bash
   cd backend
   php artisan serve
   ```
   *Backend akan berjalan di `http://localhost:8000`*

2. **Frontend Server**
   ```bash
   cd frontend
   npx http-server -p 8080
   ```
   *Buka browser dan akses `http://localhost:8080`*

## 🔑 Login Default
- **Email:** admin@example.com
- **Password:** password
