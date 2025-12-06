<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

session_start();

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

file_put_contents(__DIR__ . '/conn.log', date('Y-m-d H:i:s') . " - Request: $request_uri - Path: $path\n", FILE_APPEND);

if (empty($path) || $path === 'index.php') {
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
    
    file_put_contents(__DIR__ . '/conn.log', date('Y-m-d H:i:s') . " - API: $api_path - File: $api_file - Exists: " . (file_exists($api_file) ? 'YES' : 'NO') . "\n", FILE_APPEND);
    
    if (file_exists($api_file)) {
        require $api_file;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found', 'file' => $api_file]);
    }
    exit;
}

http_response_code(404);
echo '404 Not Found';
?>