<?php
// Simple test file to check SMTP functions
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== SMTP Test Started ===\n";
echo "PHP Version: " . phpversion() . "\n";

// Test basic functions
if (function_exists('fsockopen')) {
    echo "✅ fsockopen function exists\n";
} else {
    echo "❌ fsockopen function missing\n";
}

if (function_exists('stream_socket_client')) {
    echo "✅ stream_socket_client function exists\n";
} else {
    echo "❌ stream_socket_client function missing\n";
}

if (function_exists('stream_context_create')) {
    echo "✅ stream_context_create function exists\n";
} else {
    echo "❌ stream_context_create function missing\n";
}

// Test environment variables
echo "\n=== Environment Variables ===\n";
echo "SMTP_HOST: " . (getenv('SMTP_HOST') ?: 'NOT SET') . "\n";
echo "SMTP_PORT: " . (getenv('SMTP_PORT') ?: 'NOT SET') . "\n";
echo "SMTP_USERNAME: " . (getenv('SMTP_USERNAME') ?: 'NOT SET') . "\n";
echo "SMTP_PASSWORD: " . (getenv('SMTP_PASSWORD') ? 'SET (length: ' . strlen(getenv('SMTP_PASSWORD')) . ')' : 'NOT SET') . "\n";
echo "SMTP_ENCRYPTION: " . (getenv('SMTP_ENCRYPTION') ?: 'NOT SET') . "\n";

echo "\n=== Test Complete ===\n";
?>
