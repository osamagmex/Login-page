<?php
session_start();

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = trim($path, '/');

if (preg_match('/\.(?:css|js|png|jpg|jpeg|gif|svg|ico)$/', $path)) {
    return false;
}

if (empty($path)) {
    readfile(__DIR__ . '/template/login.html');
    exit;
}

if ($path === 'dashboard') {
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        header('Location: /');
        exit;
    }
    readfile(__DIR__ . '/template/dashboard.html');
    exit;
}

if (strpos($path, 'api/') === 0) {
    header('Content-Type: application/json');
    $api_path = substr($path, 4);
    $api_file = __DIR__ . '/api/' . $api_path . '.php';
    
    if (file_exists($api_file)) {
        require $api_file;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    exit;
}

http_response_code(404);
echo '404 Not Found';
?>