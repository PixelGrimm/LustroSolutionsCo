<?php
// Test email functionality
echo "<h2>PHP Email Test</h2>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p>✅ mail() function is available</p>";
} else {
    echo "<p>❌ mail() function is NOT available</p>";
}

// Check PHP configuration
echo "<h3>PHP Configuration:</h3>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>sendmail_path: " . ini_get('sendmail_path') . "</p>";
echo "<p>SMTP: " . ini_get('SMTP') . "</p>";
echo "<p>smtp_port: " . ini_get('smtp_port') . "</p>";

// Test sending a simple email
$to = 'info@lustrosolutions.co.uk';
$subject = 'Test Email from Local Server';
$message = 'This is a test email from your local PHP server.';
$headers = 'From: noreply@lustrosolutions.co.uk';

echo "<h3>Testing Email Send:</h3>";
$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo "<p>✅ Test email sent successfully!</p>";
} else {
    echo "<p>❌ Test email failed to send.</p>";
    echo "<p>Error: " . error_get_last()['message'] ?? 'Unknown error' . "</p>";
}

echo "<h3>Environment:</h3>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown' . "</p>";
echo "<p>Environment: " . getenv('RAILWAY_ENVIRONMENT') ?: 'local' . "</p>";
?>
