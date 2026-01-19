# Backend Setup - Fix MySQL Driver Issue

## Problem
Error: `could not find driver (Connection: mysql, ...)`

This means PHP's PDO MySQL extension is not enabled.

## Solution

### Step 1: Enable MySQL Extension

1. Open your `php.ini` file located at:
   ```
   D:\laptop softwares\php-8.5.2-nts-Win32-vs17-x64\php.ini
   ```

2. Find the line with `;extension=pdo_mysql` (it's commented with `;`)

3. Remove the semicolon to uncomment it:
   ```ini
   extension=pdo_mysql
   ```

4. Also check for this line and uncomment if needed:
   ```ini
   extension=mysqli
   ```

5. Save the file

### Step 2: Verify Extension is Loaded

Run this command:
```powershell
php -m | Select-String "pdo_mysql"
```

You should see `pdo_mysql` in the output.

### Step 3: Test Database Connection

```powershell
cd backend
php artisan migrate --pretend
```

If it works, you'll see migration output without errors.

### Step 4: Create Database (if not exists)

Make sure the database `blog_db` exists:

**Option A: MySQL Command Line**
```powershell
mysql -u root -p
```
Then:
```sql
CREATE DATABASE IF NOT EXISTS blog_db;
EXIT;
```

**Option B: phpMyAdmin or MySQL Workbench**
- Create a new database named `blog_db`

### Step 5: Run Migrations

```powershell
php artisan migrate
php artisan db:seed
```

### Alternative: If Extension File is Missing

If you can't find the extension files, you may need to:

1. Download the correct PHP version with MySQL extensions
2. Or install XAMPP/WAMP/Laragon which comes with all extensions pre-configured
3. Or manually download `php_pdo_mysql.dll` and place it in your PHP extension directory

### Quick Test

Test if MySQL connection works:
```php
<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'root', 'your_password');
    echo "MySQL connection successful!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

Save this as `test_mysql.php` and run:
```powershell
php test_mysql.php
```
