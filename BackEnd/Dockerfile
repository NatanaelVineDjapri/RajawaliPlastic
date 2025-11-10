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

# --- Tahap 2: Build Backend (PHP) ---
# Gunakan image PHP 8.2 dengan Apache
FROM heroku/php-apache2:latest AS backend

WORKDIR /app

# Copy file composer
COPY composer.json composer.lock ./
# Install dependensi PHP (abaikan platform reqs untuk Heroku buildpack)
RUN composer install --no-interaction --no-plugins --no-scripts --no-dev --prefer-dist --optimize-autoloader --ignore-platform-reqs

# Copy semua kode aplikasi
COPY . .

# Copy asset yang sudah di-build dari tahap 1
COPY --from=frontend_builder /app/public/build ./public/build

# Set permission yang benar untuk Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# --- Perintah Start ---
# Perintah ini akan otomatis dijalankan oleh Render
# (Ini sudah ada di dalam image heroku/php-apache2)
# CMD ["heroku-php-apache2", "public/"]