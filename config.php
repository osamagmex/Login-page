<?php
define('DB_PATH', __DIR__ . '/cyber_defense.db');

define('PASSWORD_MIN_LENGTH', 8);

function generateSalt() {
    return bin2hex(random_bytes(16));
}

function hashPassword($password, $salt) {
    return hash('sha256', $password . $salt);
}

function validatePassword($password) {
    if (strlen($password) < PASSWORD_MIN_LENGTH) {
        return false;
    }
    
    $has_upper = preg_match('/[A-Z]/', $password);
    $has_lower = preg_match('/[a-z]/', $password);
    $has_digit = preg_match('/[0-9]/', $password);
    $has_special = preg_match('/[!@#$%^&*()_+\-=\[\]{};:\'"\\|,.<>\/?]/', $password);
    
    return $has_upper && $has_lower && $has_digit && $has_special;
}
?>