# --- Tahap 1: Build Frontend (Node) ---
# Gunakan image Node untuk build asset CSS/JS
FROM node:18-alpine AS frontend_builder

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi frontend
RUN npm install

# Copy sisa file frontend
COPY . .

# Build asset untuk production
RUN npm run build

# -----------------------------------------------
# --- Tahap 2: Build Backend (PHP) ---
# -----------------------------------------------

# Gunakan image PHP 8.2 resmi dengan Apache
FROM php:8.2-apache AS backend

# Set working directory ke default Apache
WORKDIR /var/www/html

# --- Instalasi PHP Extensions yang Umum Dibutuhkan Laravel & MongoDB ---
# (Ini sudah benar, menginstal ekstensi SEBELUM composer install)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libzip-dev \
    libssl-dev \
    libsasl2-dev \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite (PENTING untuk routing Laravel)
RUN a2enmod rewrite

# Ganti DocumentRoot Apache ke /var/www/html/public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# --- Mulai Proses Build Laravel ---

# Copy semua file aplikasi.
# File .dockerignore (di file berikutnya) akan mencegah .env, node_modules, dll. tercopy
COPY . .

# Install dependensi Composer
# Kita bisa hapus --ignore-platform-reqs karena kita sudah install semua ekstensi di atas
RUN composer install --no-interaction --no-dev --prefer-dist --optimize-autoloader

# --- INI JAWABANNYA ---
# Jalankan perintah artisan untuk optimasi produksi
# Ini akan membuat cache config, route, dan view.
# PENTING: Ini aman dijalankan KARENA .env tidak ter-copy (lihat .dockerignore)
# Render akan memasukkan environment variables saat runtime.
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Dan ini perintah yang kamu tanyakan:
RUN php artisan storage:link
# ----------------------

# Copy asset yang sudah di-build dari tahap 1
COPY --from=frontend_builder /app/public/build ./public/build

# Set permission yang benar untuk Laravel
# Ini harus dijalankan SETELAH semua file di-copy dan dibuat (termasuk storage:link)
RUN chown -R www-data:www-data storage bootstrap/cache public/storage
RUN chmod -R 775 storage bootstrap/cache public/storage

# Base image (php:8.2-apache) sudah otomatis menjalankan "apache2-foreground"
# jadi kita tidak perlu CMD atau EXPOSE