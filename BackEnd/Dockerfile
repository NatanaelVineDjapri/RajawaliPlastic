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
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libzip-dev \
    libssl-dev \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Install Composer (karena image ini tidak punya composer)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite (PENTING untuk routing Laravel)
RUN a2enmod rewrite

# Ganti DocumentRoot Apache ke /var/www/html/public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# -----------------------------------------------------------------
# VVV INI BAGIAN YANG DIPERBAIKI VVV
# -----------------------------------------------------------------

# Copy semua kode aplikasi DULU (termasuk artisan, composer.json, dll)
# (Kita ada di /var/www/html)
COPY . .

# BARU jalankan composer install (sekarang file artisan sudah ada)
RUN composer install --no-interaction --no-dev --prefer-dist --optimize-autoloader --ignore-platform-reqs

RUN php artisan config:clear && \
    php artisan cache:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache


RUN php artisan storage:link
# ----------------------
# -----------------------------------------------------------------
# ^^^ INI BAGIAN YANG DIPERBAIKI ^^^
# -----------------------------------------------------------------

# Copy asset yang sudah di-build dari tahap 1
# Pastikan path ini benar
COPY --from=frontend_builder /app/public/build ./public/build

# Set permission yang benar untuk Laravel
# User apache di image ini adalah www-data
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache