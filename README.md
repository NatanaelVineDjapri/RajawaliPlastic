# 🦅 Rajawali Plastic

**RajawaliPlastic** is a growing SME focused on distributing high-quality plastic products across various industries. To modernize operations and improve efficiency, the company has adopted a digital platform called DigiHubt, which streamlines inventory management, sales tracking, and overall distribution processes.
> 🧩 Designed to be scalable, modular, and easily extendable for future development.

---
![Laravel](https://img.shields.io/badge/laravel-E34F26?style=for-the-badge&logo=laravel&logoColor=white)
![Next.js](https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 👨‍💻 Team Members

| No | Name                     | NIM       |
|----|--------------------------|-----------|
| 1  | Claudio Taffarel Santoso | 535240035 | 
| 2  | Natanael Vine Djapri | 535240042 | 
| 3  | Ryan Prasetya Arjuna A.  | 535240043 | 
| 4  | Devin Giovano            | 535240057 | 
| 5  | Edbert Halim             | 535240059 | 

### 🔧 Step 1 — Clone the Repository
```bash
# Clone the full project (Frontend + Backend)
git clone https://github.com/NatanaelVineDjapri/RajawaliPlastic.git

# Enter the main project directory
cd RajawaliPlastic

```

### 🧱 Step 2 — Setup Backend (Laravel)
```bash
# Navigate to the backend folder
cd BackEnd

# Install Laravel dependencies
composer install

# Copy the environment file
cp .env.example .env

# Generate the application key
php artisan key:generate

```

### 🛠️ Edit file .env
```bash
DB_DATABASE=Rajawali_Plastic
DB_USERNAME=root
DB_PASSWORD=

# Run database migrations and seeders
php artisan migrate --seed

# Start the Laravel development server
php artisan serve

```
