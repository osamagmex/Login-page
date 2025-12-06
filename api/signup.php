<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password required']);
    exit;
}

if (!validatePassword($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Password does not meet security requirements']);
    exit;
}

try {
    $db = getDatabase();
    $stmt = $db->prepare('SELECT username FROM users WHERE username = ?');
    $stmt->execute([$username]);
    
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'This name is already taken']);
        exit;
    }
    
    $salt = generateSalt();
    $password_hash = hashPassword($password, $salt);
    
    $stmt = $db->prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)');
    $stmt->execute([$username, $password_hash, $salt]);
    
    http_response_code(201);
    echo json_encode(['message' => 'User created successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>