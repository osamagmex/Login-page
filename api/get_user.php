<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
    echo json_encode(['username' => $_SESSION['username']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
}
?>