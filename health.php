<?php
// Set proper headers
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Basic health checks
$health = [
    'status' => 'healthy',
    'timestamp' => date('Y-m-d H:i:s'),
    'service' => 'Lustro Solutions Co Website',
    'version' => '1.0.0',
    'environment' => getenv('RAILWAY_ENVIRONMENT') ?: 'production',
    'php_version' => PHP_VERSION,
    'server_time' => time(),
    'memory_usage' => memory_get_usage(true),
    'disk_free_space' => disk_free_space('/')
];

// Check if critical functions exist
if (function_exists('mail')) {
    $health['mail_function'] = 'available';
} else {
    $health['mail_function'] = 'unavailable';
}

// Check if we can write to temp directory
$temp_dir = sys_get_temp_dir();
if (is_writable($temp_dir)) {
    $health['temp_dir_writable'] = true;
} else {
    $health['temp_dir_writable'] = false;
}

echo json_encode($health, JSON_PRETTY_PRINT);
?>
