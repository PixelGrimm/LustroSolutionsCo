<?php
// Debug file to check what's currently running
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Current Code Status</h2>";

// Check PHP version
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";

// Check if PHPMailer is available
if (file_exists('vendor/autoload.php')) {
    echo "<p><strong>PHPMailer:</strong> ✅ INSTALLED</p>";
    require 'vendor/autoload.php';
    echo "<p><strong>PHPMailer Version:</strong> " . PHPMailer\PHPMailer\PHPMailer::VERSION . "</p>";
} else {
    echo "<p><strong>PHPMailer:</strong> ❌ NOT INSTALLED</p>";
}

// Check environment variables
echo "<h3>Environment Variables:</h3>";
echo "<p><strong>SMTP_HOST:</strong> " . (getenv('SMTP_HOST') ?: 'NOT SET') . "</p>";
echo "<p><strong>SMTP_PORT:</strong> " . (getenv('SMTP_PORT') ?: 'NOT SET') . "</p>";
echo "<p><strong>SMTP_USERNAME:</strong> " . (getenv('SMTP_USERNAME') ?: 'NOT SET') . "</p>";
echo "<p><strong>SMTP_PASSWORD:</strong> " . (getenv('SMTP_PASSWORD') ? 'SET (length: ' . strlen(getenv('SMTP_PASSWORD')) . ')' : 'NOT SET') . "</p>";
echo "<p><strong>SMTP_ENCRYPTION:</strong> " . (getenv('SMTP_ENCRYPTION') ?: 'NOT SET') . "</p>";

// Check file modification time
echo "<h3>File Status:</h3>";
echo "<p><strong>send-quote.php modified:</strong> " . date('Y-m-d H:i:s', filemtime('send-quote.php')) . "</p>";
echo "<p><strong>composer.json exists:</strong> " . (file_exists('composer.json') ? 'YES' : 'NO') . "</p>";

echo "<h3>Current send-quote.php content (first 5 lines):</h3>";
$lines = file('send-quote.php');
for ($i = 0; $i < min(5, count($lines)); $i++) {
    echo "<p>" . htmlspecialchars($lines[$i]) . "</p>";
}
?>
