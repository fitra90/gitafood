# Aplikasi Demo Simple ERP

## 📋 Deskripsi Proyek

Proyek ini adalah aplikasi full-stack yang dirancang untuk keperluan tes interview.

## 🛠️ Stack Teknologi

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Backend** | Laravel | 10 |
| **Frontend** | AngularJS | 1.8 |
| **Database** | MariaDB | 10.4.32 |

## 📋 Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal:

- **PHP** >= 7.3
- **Composer** (untuk dependency management Laravel)
- **Node.js & npm** (opsional, jika menggunakan build tools)
- **MariaDB** 8.0+

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
cd <project-folder>
git clone https://github.com/fitra90/gitafood
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

# Seeding data 
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

1. **Start Backend Development Server**
   ```bash
   cd backend
   php artisan serve
   ```
   Akses backend di `http://localhost:8000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npx http-server -p 8080
   ```
   Akses frontend di `http://localhost:8080`

3. **AngularJS Integration**
   - Frontend script terletak di `frontend`
   - Gunakan `npx http-server` untuk menjalankan development server

4. **API Endpoints**
   - Endpoints didefinisikan di `routes/api.php`
   - Pastikan backend berjalan di `http://localhost:8000`

## 📝 Database Migrations

```bash
# Jalankan semua migrations
php artisan migrate

```

## 👤 Author

fitra90@gmail.com
