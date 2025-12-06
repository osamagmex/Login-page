# Cyber Defense HQ

A secure authentication system with a military-themed interface for user registration, login, and dashboard access.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Security Implementation](#security-implementation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [License](#license)

## Overview

Cyber Defense HQ is a PHP-based web application that provides secure user authentication with password strength validation, session management, and a protected dashboard displaying cybersecurity-related content.

## Features

- User registration with password validation
- Secure login system
- Session-based authentication
- Password strength indicator
- Protected dashboard area
- SQLite database backend
- SHA-256 password hashing with salt
- Responsive design with animated UI elements

## Technology Stack

- **Backend**: PHP 7.4+
- **Database**: SQLite 3
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Server**: Apache with mod_rewrite

## Project Structure

```
/
├── api/
│   ├── login.php          # Login endpoint
│   ├── signup.php         # Registration endpoint
│   ├── get_user.php       # User data retrieval
│   └── logout.php         # Logout endpoint
├── assets/
│   ├── css/
│   │   ├── root.css       # Global styles
│   │   ├── style.css      # Login page styles
│   │   └── dashboard.css  # Dashboard styles
│   └── js/
│       ├── login.js       # Login/signup logic
│       └── dashboard.js   # Dashboard functionality
├── template/
│   ├── login.html         # Login page template
│   └── dashboard.html     # Dashboard template
├── config.php             # Configuration settings
├── database.php           # Database initialization
├── index.php              # Main router
├── .htaccess              # Apache configuration
├── .gitignore             # Git ignore rules
└── cyber_defense.db       # SQLite database
```

## Installation

1. Clone the repository to your web server directory:
```bash
git clone https://github.com/osamagmex/Login-page.git
cd Login-page
```

2. Ensure Apache mod_rewrite is enabled:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

3. Set proper permissions:
```bash
chmod 755 .
chmod 666 cyber_defense.db
chmod 644 .htaccess
```

4. Configure your virtual host or ensure the `.htaccess` file is being read.

## Configuration

### config.php

```php
define('DB_PATH', __DIR__ . '/cyber_defense.db');
define('PASSWORD_MIN_LENGTH', 8);
```

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

## Security Implementation

### Password Hashing

- SHA-256 algorithm
- 32-byte random salt per user
- Salt stored alongside hash

### Session Management

- PHP native sessions
- Session validation on protected routes
- Secure logout with session destruction

### Database Security

- PDO with prepared statements
- No direct SQL string concatenation
- Error mode set to exceptions

### File Protection

`.htaccess` rules prevent direct access to:
- `.db` files
- `.sqlite` files
- `.log` files

## API Endpoints

### POST /api/signup

Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `201`: User created successfully
- `400`: Validation error
- `409`: Username already exists
- `500`: Database error

### POST /api/login

Authenticate existing user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `200`: Login successful
- `400`: Missing credentials
- `401`: Invalid credentials
- `500`: Database error

### GET /api/get_user

Retrieve current user information (requires authentication).

**Responses:**
- `200`: Returns username
- `401`: Not authenticated
- `405`: Invalid method

### POST /api/logout

Terminate user session.

**Responses:**
- `200`: Logout successful
- `405`: Invalid method

## Database Schema

### users table

| Column        | Type      | Constraints                    |
|---------------|-----------|--------------------------------|
| id            | INTEGER   | PRIMARY KEY AUTOINCREMENT      |
| username      | TEXT      | UNIQUE NOT NULL                |
| password_hash | TEXT      | NOT NULL                       |
| salt          | TEXT      | NOT NULL                       |
| created_at    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP      |

## Usage

### Registration

1. Navigate to the application root
2. Click "Create Secure Account"
3. Enter username and password meeting requirements
4. Confirm password
5. Submit registration

### Login

1. Enter registered username
2. Enter password
3. Click "Authenticate"
4. Redirected to dashboard on success

### Dashboard

- Displays user information
- Shows cybersecurity blog posts
- Provides classified intelligence links
- Logout functionality

## License

This project is provided as-is for educational and development purposes.
