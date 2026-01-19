# Blog Management System

A full-stack blog management system built with Laravel (API backend) and React (SPA frontend).

## Project Structure

```
blogs/
├── backend/          # Laravel API backend
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
└── frontend/         # React Vite frontend
    ├── src/
    ├── public/
    └── ...
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies (requires Composer):
```bash
composer install
```

3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations and seeders:
```bash
php artisan migrate
php artisan db:seed
```

7. Create storage link:
```bash
php artisan storage:link
```

8. Start the server:
```bash
php artisan serve
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

4. Update `.env` with API URL:
```
VITE_API_URL=http://localhost:8000/api/v1
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Default Users

After running seeders, you can login with:

- **Admin**: admin@blog.com / password
- **Author**: author@blog.com / password
- **User**: user@blog.com / password

## Features

### Visitor
- View home page
- Browse blog feed
- Read blog posts
- Search blogs
- Browse categories & tags
- Register / Login

### Registered User
- Login / Logout
- Manage profile
- Comment on blogs
- Like & bookmark posts
- View saved blogs

### Author
- Create, edit, delete own blog posts
- Upload featured images
- Save drafts
- Submit posts for admin approval
- View post statistics

### Admin
- Full system control
- Manage users & roles
- Approve/reject blog posts
- Manage categories & tags
- Moderate comments
- Manage featured posts
- Configure SEO & analytics

## API Documentation

All API endpoints are prefixed with `/api/v1`

See `backend/README.md` for detailed API documentation.

## Technologies

- **Backend**: Laravel 10, Laravel Sanctum, MySQL
- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Authentication**: Laravel Sanctum (SPA authentication)
- **State Management**: React Context API

## License

MIT
