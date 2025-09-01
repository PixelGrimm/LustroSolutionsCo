<?php
// Test PHPMailer installation
echo "Testing PHPMailer installation...\n";

try {
    require 'vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    echo "✅ PHPMailer classes loaded successfully\n";
    
    // Test creating PHPMailer instance
    $mail = new PHPMailer(true);
    echo "✅ PHPMailer instance created successfully\n";
    
    // Test SMTP configuration
    $mail->isSMTP();
    echo "✅ SMTP mode enabled successfully\n";
    
    echo "\n🎉 PHPMailer is ready to use!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "\nEnvironment variables:\n";
echo "SMTP_HOST: " . (getenv('SMTP_HOST') ?: 'Not set') . "\n";
echo "SMTP_PORT: " . (getenv('SMTP_PORT') ?: 'Not set') . "\n";
echo "SMTP_USERNAME: " . (getenv('SMTP_USERNAME') ?: 'Not set') . "\n";
echo "SMTP_PASSWORD: " . (getenv('SMTP_PASSWORD') ?: 'Not set') . "\n";
echo "SMTP_ENCRYPTION: " . (getenv('SMTP_ENCRYPTION') ?: 'Not set') . "\n";
?>
