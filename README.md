# Aplikasi Demo Simple ERP

## 📋 Deskripsi Proyek

Proyek ini adalah aplikasi full-stack yang dirancang untuk keperluan tes interview. Aplikasi ini menunjukkan implementasi dari teknologi-teknologi populer dalam membangun aplikasi web modern.

## 🛠️ Stack Teknologi

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Backend** | Laravel | 8 |
| **Frontend** | AngularJS | 1.8 |
| **Database** | MySQL | 8 |

## 📋 Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal:

- **PHP** >= 7.3
- **Composer** (untuk dependency management Laravel)
- **Node.js & npm** (opsional, jika menggunakan build tools)
- **MySQL Server** 8.0+

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
cd c:\xampp\htdocs\projects\
git clone <repository-url>
cd gitafood
```

### 2. Setup Backend (Laravel)

```bash
# Install dependencies Laravel
composer install

# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database
# Edit file .env dan sesuaikan database credentials:
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=gitafood
# DB_USERNAME=root
# DB_PASSWORD=

# Jalankan migration
php artisan migrate

# Seeding data (opsional)
php artisan db:seed
```

### 3. Setup Frontend (AngularJS)

```bash
# Install npm dependencies (jika ada)
npm install

# atau langsung gunakan file AngularJS dari CDN di template blade
```

### 4. Konfigurasi Database

```sql
CREATE DATABASE gitafood CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Jalankan Aplikasi

```bash
# Start Laravel development server
php artisan serve

# Atau akses melalui XAMPP
# http://localhost/projects/gitafood/public
```

## 🔧 Konfigurasi

### File .env

Pastikan file `.env` sudah dikonfigurasi dengan benar:

```env
APP_NAME="Gitafood"
APP_ENV=local
APP_KEY=base64:xxxxx
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gitafood
DB_USERNAME=root
DB_PASSWORD=
```

## 💻 Cara Menggunakan

1. **Start Development Server**
   ```bash
   php artisan serve
   ```
   Akses aplikasi di `http://localhost:8000`

2. **AngularJS Integration**
   - Frontend script terletak di `resources/js/` atau `public/js/`
   - Controllers, services, dan directives mengikuti struktur AngularJS

3. **API Endpoints**
   - Endpoints didefinisikan di `routes/api.php` atau `routes/web.php`

## 🔐 Keamanan

- Jangan commit file `.env` ke repository
- Gunakan environment variables untuk sensitive data
- Selalu gunakan CSRF tokens di form Laravel
- Validate semua input dari user

## 📝 Database Migrations

```bash
# Jalankan semua migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Fresh migration (reset)
php artisan migrate:fresh
```

## 🧪 Testing

```bash
# Jalankan unit tests
php artisan test

# Atau menggunakan phpunit
phpunit
```

## 📚 Dokumentasi Referensi

- [Laravel 8 Documentation](https://laravel.com/docs/8.x)
- [AngularJS 1.8 Documentation](https://docs.angularjs.org/api)
- [MySQL 8 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request


## 👤 Author

fitra90@gmail.com

## ⚠️ Troubleshooting

### Masalah: Port 8000 sudah digunakan
```bash
php artisan serve --port=8001
```

### Masalah: Database connection error
- Pastikan MySQL service sudah berjalan
- Periksa credentials di file `.env`
- Pastikan database sudah dibuat

### Masalah: Permission denied pada storage
```bash
chmod -R 775 storage bootstrap/cache
```
