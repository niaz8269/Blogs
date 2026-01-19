# Blog Management System - Setup Guide

## Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL 5.7 or higher
- Node.js 18+ and npm
- Laravel 10 (will be installed via Composer)

## Step-by-Step Setup

### 1. Backend Setup (Laravel API)

```bash
cd backend
```

#### Install Dependencies
```bash
composer install
```

#### Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

#### Database Configuration
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=root
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=localhost
```

#### Create Database
```sql
CREATE DATABASE blog_db;
```

#### Run Migrations
```bash
php artisan migrate
php artisan db:seed
```

#### Create Storage Link
```bash
php artisan storage:link
```

#### Start Backend Server
```bash
php artisan serve
```

Backend will run on `http://localhost:8000`

### 2. Frontend Setup (React)

Open a new terminal:

```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

#### Start Frontend Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Default Login Credentials

After running seeders:

- **Admin**: admin@blog.com / password
- **Author**: author@blog.com / password  
- **User**: user@blog.com / password

## Testing the Setup

1. Open `http://localhost:5173` in your browser
2. You should see the home page with sticky sidebar
3. Try logging in with admin credentials
4. Navigate to Admin Dashboard to see pending blogs
5. Create a blog as an author
6. Approve it as admin

## Troubleshooting

### CORS Issues
- Ensure `SANCTUM_STATEFUL_DOMAINS` in backend `.env` includes your frontend URL
- Check `config/cors.php` for allowed origins

### Authentication Issues
- Clear browser cookies
- Check that Sanctum middleware is properly configured
- Verify CSRF cookie endpoint is accessible

### Database Issues
- Ensure MySQL is running
- Check database credentials in `.env`
- Run `php artisan migrate:fresh --seed` to reset database

### File Upload Issues
- Ensure `storage/app/public` directory exists
- Run `php artisan storage:link`
- Check file permissions on storage directory

## Production Deployment

### Backend
1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Run `php artisan config:cache` and `php artisan route:cache`
3. Set up proper web server (Nginx/Apache)
4. Configure SSL certificates

### Frontend
1. Build for production: `npm run build`
2. Serve `dist/` folder via web server
3. Update `VITE_API_URL` to production API URL
4. Configure CORS on backend for production domain

## Additional Notes

- The system uses Laravel Sanctum for SPA authentication
- File uploads are stored in `storage/app/public/blogs`
- Featured posts are managed by admins via Admin Dashboard
- Blog approval workflow: Draft → Pending → Published/Rejected
