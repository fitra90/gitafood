# GitaFood Frontend - AngularJS 1.8

Aplikasi frontend AngularJS 1.8 dengan Bootstrap 5 untuk GitaFood Inventory System.

## Project Structure

```
frontend/
├── index.html                  # Main entry point (Navbar & App Container)
├── js/
│   ├── app.js                  # Routing, Route Guards, HTTP Interceptor, Constant
│   └── controllers/
│       ├── mainController.js         # Menangani Dashboard & Master Barang
│       ├── formBarangController.js   # Menangani Form Tambah/Edit Barang
│       ├── transaksiController.js    # Menangani Data Riwayat Transaksi
│       └── formTransaksiController.js# Menangani Form Input Transaksi Baru
├── css/
│   └── style.css               # Custom styles
└── views/
    ├── home.html               # Halaman Login
    ├── dashboard.html          # Dashboard (Tabel Master Barang)
    ├── form.html               # Form Master Barang
    ├── transaksi.html          # Tabel Riwayat Transaksi
    └── formTransaksi.html      # Form Tambah Transaksi
```

## Setup & Menjalankan Aplikasi

Aplikasi ini menggunakan HTML statis murni sehingga tidak perlu di-_build_ (seperti Webpack/Vite).

1. Buka terminal dan masuk ke folder `frontend`.
2. Jalankan lokal server ringan (contoh menggunakan `http-server` via npx):
   ```bash
   npx http-server -p 8080
   ```
3. Buka browser dan akses `http://localhost:8080`

## Konfigurasi API Endpoint

API URL diatur menggunakan *Constant* di dalam `js/app.js`:

```javascript
gitafoodApp.constant('API_URL', 'http://localhost:8000/api');
```
Pastikan `localhost:8000` sesuai dengan port Laravel backend yang Anda jalankan.

## Kredensial Login Default

Pastikan backend sudah menjalankan `php artisan db:seed`.
```
Email: admin@example.com
Password: password
```

## Fitur Utama

- **Authentication**: Login, Logout (dengan Route Guards untuk mencegah akses tanpa Token).
- **Master Data Barang**: CRUD Data Barang lengkap dengan paginasi.
- **Transaksi Inventaris**: Pencatatan Barang Masuk & Keluar dengan validasi otomatis terhadap Stok Master.
- **Token Management**: JWT Token tersimpan aman di `localStorage` dan diinjeksi via `AuthInterceptor`.
