<?php
function initDatabase() {
    try {
        $db = new PDO('sqlite:' . DB_PATH);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $db->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        return $db;
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        return null;
    }
}

function getDatabase() {
    static $db = null;
    
    if ($db === null) {
        $db = initDatabase();
    }
    
    return $db;
}
?>