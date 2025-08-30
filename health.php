<?php
header('Content-Type: application/json');

$health = [
    'status' => 'healthy',
    'timestamp' => date('Y-m-d H:i:s'),
    'service' => 'Lustro Solutions Co Website',
    'version' => '1.0.0',
    'environment' => getenv('RAILWAY_ENVIRONMENT') ?: 'production'
];

echo json_encode($health, JSON_PRETTY_PRINT);
?>
