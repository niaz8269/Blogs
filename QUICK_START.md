# Quick Start Guide - Running the Blog Management System

## Prerequisites Check

Before starting, ensure you have:
- ✅ PHP 8.1+ installed
- ✅ Composer installed
- ✅ MySQL/MariaDB installed and running
- ✅ Node.js 18+ and npm installed

## Step 1: Set Up Backend (Laravel API)

### 1.1 Navigate to Backend Directory
```bash
cd backend
```

### 1.2 Install PHP Dependencies
```bash
composer install
```

### 1.3 Configure Environment
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 1.4 Set Up Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
```
Then in MySQL:
```sql
CREATE DATABASE blog_db;
EXIT;
```

**Option B: Using phpMyAdmin or MySQL Workbench**
Create a new database named `blog_db`

### 1.5 Update .env File

Edit `backend/.env` and update these lines:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password_here

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=localhost
```

### 1.6 Run Migrations and Seeders
```bash
php artisan migrate
php artisan db:seed
```

This will:
- Create all database tables
- Create default roles (admin, author, user)
- Create 3 test users (see credentials below)

### 1.7 Create Storage Link
```bash
php artisan storage:link
```

### 1.8 Start Laravel Server
```bash
php artisan serve
```

✅ Backend is now running at: **http://localhost:8000**

Keep this terminal window open!

---

## Step 2: Set Up Frontend (React)

### 2.1 Open a NEW Terminal Window

Navigate to project root, then:
```bash
cd frontend
```

### 2.2 Install Node Dependencies
```bash
npm install
```

### 2.3 Configure Environment
```bash
# Copy environment file
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### 2.4 Start React Development Server
```bash
npm run dev
```

✅ Frontend is now running at: **http://localhost:5173**

---

## Step 3: Access the Application

1. Open your browser and go to: **http://localhost:5173**

2. You should see the home page with:
   - Sticky sidebar on the left
   - Featured posts section
   - Blog feed

---

## Step 4: Test Login

### Default Test Accounts

After running seeders, you can login with:

**Admin Account:**
- Email: `admin@blog.com`
- Password: `password`

**Author Account:**
- Email: `author@blog.com`
- Password: `password`

**Regular User Account:**
- Email: `user@blog.com`
- Password: `password`

### Login Steps:
1. Click "Login" in the sidebar
2. Enter credentials
3. You'll be redirected to the home page
4. Check the sidebar - you'll see dashboard links based on your role

---

## Step 5: Test Features

### As Author:
1. Go to "Author Dashboard"
2. Click "Create New Blog"
3. Fill in blog details
4. Save as draft
5. Submit for approval

### As Admin:
1. Go to "Admin Dashboard"
2. See pending blogs
3. Approve or reject blogs
4. Manage featured posts

### As Regular User:
1. Browse blogs
2. Like and bookmark posts
3. Add comments
4. Search blogs

---

## Troubleshooting

### ❌ "Composer not found"
**Solution:** Install Composer from https://getcomposer.org/

### ❌ "Database connection error"
**Solutions:**
- Check MySQL is running: `mysql -u root -p`
- Verify database credentials in `.env`
- Ensure database `blog_db` exists

### ❌ "Migration error"
**Solution:** Run fresh migration:
```bash
php artisan migrate:fresh --seed
```

### ❌ "Port 8000 already in use"
**Solution:** Use different port:
```bash
php artisan serve --port=8001
```
Then update `frontend/.env`:
```env
VITE_API_URL=http://localhost:8001/api/v1
```

### ❌ "CORS errors in browser"
**Solutions:**
- Check `SANCTUM_STATEFUL_DOMAINS` in backend `.env` includes `localhost:5173`
- Verify both servers are running
- Clear browser cache and cookies

### ❌ "npm install fails"
**Solutions:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm install --legacy-peer-deps`

### ❌ "Cannot read properties of null" (React errors)
**Solution:** Ensure backend API is running and accessible at the URL in `frontend/.env`

---

## Stopping the Servers

### To Stop Backend:
- Press `Ctrl + C` in the backend terminal

### To Stop Frontend:
- Press `Ctrl + C` in the frontend terminal

---

## Production Build

### Build Frontend for Production:
```bash
cd frontend
npm run build
```

This creates optimized files in `frontend/dist/` folder.

### Deploy Backend:
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false` in `.env`
3. Run:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Quick Reference

### Backend Commands
```bash
# Run migrations
php artisan migrate

# Reset database
php artisan migrate:fresh --seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Start server
php artisan serve

# Start on specific port
php artisan serve --port=8001
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Need Help?

Check these files for more details:
- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Project overview
- `backend/README.md` - Backend API documentation
- `frontend/README.md` - Frontend documentation

---

## Summary

1. ✅ Run `composer install` in `backend/`
2. ✅ Configure `backend/.env` (database credentials)
3. ✅ Run `php artisan migrate --seed` in `backend/`
4. ✅ Run `php artisan serve` in `backend/`
5. ✅ Run `npm install` in `frontend/`
6. ✅ Configure `frontend/.env` (API URL)
7. ✅ Run `npm run dev` in `frontend/`
8. ✅ Open http://localhost:5173 in browser
9. ✅ Login with admin@blog.com / password

**That's it! Your blog management system is running! 🚀**
