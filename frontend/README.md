# Blog Management System - React Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- **Sticky Sidebar**: Fixed left sidebar with navigation, search, and categories
- **Featured Posts**: Stories-style horizontal scrollable featured posts
- **Hero Section**: Large featured blog post banner
- **Infinite Scroll**: Automatic loading of blog posts as you scroll
- **Authentication**: Login/Register with Laravel Sanctum
- **Role-based Dashboards**: Different dashboards for users, authors, and admins
- **Blog Management**: Create, edit, delete blogs (authors/admins)
- **Engagement**: Like, bookmark, and comment on blogs
- **Search & Filter**: Search blogs and filter by category/tag

## Project Structure

```
src/
  components/     # Reusable components
  pages/         # Page components
  layouts/       # Layout components
  context/       # React Context providers
  hooks/         # Custom React hooks
  services/      # API service layer
  routes.jsx     # React Router configuration
```
