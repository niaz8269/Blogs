# Blog Management System - Laravel API Backend

## Setup Instructions

1. Install dependencies:
```bash
composer install
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations and seeders:
```bash
php artisan migrate
php artisan db:seed
```

6. Create storage link:
```bash
php artisan storage:link
```

7. Start the server:
```bash
php artisan serve
```

## Default Users

- Admin: admin@blog.com / password
- Author: author@blog.com / password
- User: user@blog.com / password

## API Endpoints

All API endpoints are prefixed with `/api/v1`

### Authentication
- POST `/api/v1/register` - Register new user
- POST `/api/v1/login` - Login
- POST `/api/v1/logout` - Logout (requires auth)
- GET `/api/v1/user` - Get current user (requires auth)

### Blogs
- GET `/api/v1/blogs` - List blogs (public)
- GET `/api/v1/blogs/{slug}` - Get blog by slug (public)
- POST `/api/v1/blogs` - Create blog (requires auth, author/admin)
- PUT `/api/v1/blogs/{id}` - Update blog (requires auth, owner/admin)
- DELETE `/api/v1/blogs/{id}` - Delete blog (requires auth, owner/admin)
- POST `/api/v1/blogs/{id}/submit` - Submit for approval
- POST `/api/v1/blogs/{id}/approve` - Approve blog (admin only)
- POST `/api/v1/blogs/{id}/reject` - Reject blog (admin only)

### Engagement
- POST `/api/v1/blogs/{id}/like` - Like blog
- DELETE `/api/v1/blogs/{id}/like` - Unlike blog
- POST `/api/v1/blogs/{id}/bookmark` - Bookmark blog
- DELETE `/api/v1/blogs/{id}/bookmark` - Unbookmark blog
- POST `/api/v1/blogs/{id}/comments` - Add comment
- DELETE `/api/v1/comments/{id}` - Delete comment

### Featured Posts
- GET `/api/v1/featured-posts` - Get featured posts (public)
- GET `/api/v1/featured-posts/admin` - Get all featured posts (admin)
- POST `/api/v1/featured-posts` - Add featured post (admin)
- DELETE `/api/v1/featured-posts/{id}` - Remove featured post (admin)

### Categories & Tags
- GET `/api/v1/categories` - List categories
- GET `/api/v1/categories/{id}` - Get category with blogs
- POST `/api/v1/categories` - Create category (admin)
- GET `/api/v1/tags` - List tags
- POST `/api/v1/tags` - Create tag (admin)

### Search
- GET `/api/v1/search?q=query` - Search blogs

### Dashboards
- GET `/api/v1/dashboard/author` - Author dashboard stats
- GET `/api/v1/dashboard/admin` - Admin dashboard stats
