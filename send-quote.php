<?php
// Simple email solution without external dependencies

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Fallback for JSON decode failure
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$required_fields = ['fullName', 'phone', 'email', 'service'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Sanitize input data
$fullName = htmlspecialchars($data['fullName']);
$phone = htmlspecialchars($data['phone']);
$email = htmlspecialchars($data['email']);
$service = htmlspecialchars($data['service']);
$timeframe = htmlspecialchars($data['timeframe'] ?? 'Not specified');
$address = htmlspecialchars($data['address'] ?? 'Not provided');
$details = htmlspecialchars($data['details'] ?? 'No additional details');
$newsletter = isset($data['newsletter']) ? 'Yes' : 'No';

// Email configuration
$to = 'info@lustrosolutions.co.uk'; // Your Spacemail address

// Railway environment variables
$railway_env = getenv('RAILWAY_ENVIRONMENT') ?: 'production';
$subject = 'New Quote Request - ' . $service;

// Check if we're on Railway
$isRailway = $railway_env === 'production';

// Create email body
$emailBody = "
New Quote Request Received

Customer Details:
- Name: $fullName
- Phone: $phone
- Email: $email

Service Requested: $service
Timeframe: $timeframe
Property Address: $address

Additional Details:
$details

Newsletter Subscription: $newsletter

Submitted on: " . date('Y-m-d H:i:s') . "
";

// Email headers
$headers = [
    'From: noreply@lustrosolutions.co.uk',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Try to send email with better error handling
$mailSent = false;
$mailError = '';

try {
    // Use Spacemail SMTP credentials for real email
    $smtpHost = getenv('SMTP_HOST');
    $smtpPort = getenv('SMTP_PORT');
    $smtpUsername = getenv('SMTP_USERNAME');
    $smtpPassword = getenv('SMTP_PASSWORD');
    $smtpEncryption = getenv('SMTP_ENCRYPTION');
    
    if ($smtpHost && $smtpUsername && $smtpPassword) {
        // We have SMTP credentials, send real email via direct SMTP connection
        error_log("Spacemail SMTP credentials detected - sending real email via direct SMTP");
        error_log("SMTP: $smtpHost:$smtpPort, User: $smtpUsername");
        
        // Send email using direct SMTP connection (no sendmail needed)
        $mailSent = sendEmailViaSMTP($smtpHost, $smtpPort, $smtpUsername, $smtpPassword, $smtpEncryption, $to, $subject, $emailBody, $email, $fullName);
        
        if ($mailSent) {
            error_log("Real email sent successfully via Spacemail SMTP to $to");
        } else {
            $mailError = 'SMTP connection failed';
            error_log("Spacemail SMTP failed: $mailError");
        }
        
    } else {
        $mailError = 'SMTP credentials not configured';
        $mailSent = false;
        error_log("No SMTP credentials found");
    }
    
} catch (Exception $e) {
    $mailError = $e->getMessage();
    $mailSent = false;
    error_log("Email error: " . $mailError);
}

// Function to send email via direct SMTP connection
function sendEmailViaSMTP($host, $port, $username, $password, $encryption, $to, $subject, $message, $fromEmail, $fromName) {
    try {
        // Create SMTP connection
        $socket = fsockopen($host, $port, $errno, $errstr, 30);
        if (!$socket) {
            error_log("SMTP connection failed: $errstr ($errno)");
            return false;
        }
        
        // Read server greeting
        $response = fgets($socket, 515);
        error_log("SMTP Server: " . trim($response));
        
        // EHLO command
        fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP EHLO: " . trim($response));
        
        // Start TLS if SSL/TLS is required
        if ($encryption === 'ssl' || $encryption === 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $response = fgets($socket, 515);
            error_log("SMTP STARTTLS: " . trim($response));
            
            // Enable crypto
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                error_log("TLS negotiation failed");
                fclose($socket);
                return false;
            }
            
            // EHLO again after TLS
            fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
            $response = fgets($socket, 515);
            error_log("SMTP EHLO after TLS: " . trim($response));
        }
        
        // Authentication
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP AUTH: " . trim($response));
        
        fputs($socket, base64_encode($username) . "\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP Username: " . trim($response));
        
        fputs($socket, base64_encode($password) . "\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP Password: " . trim($response));
        
        // MAIL FROM
        fputs($socket, "MAIL FROM: <$username>\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP MAIL FROM: " . trim($response));
        
        // RCPT TO
        fputs($socket, "RCPT TO: <$to>\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP RCPT TO: " . trim($response));
        
        // DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 515);
        error_log("SMTP DATA: " . trim($response));
        
        // Email headers and body
        $emailContent = "From: $fromName <$username>\r\n";
        $emailContent .= "To: $to\r\n";
        $emailContent .= "Subject: $subject\r\n";
        $emailContent .= "Reply-To: $fromEmail\r\n";
        $emailContent .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $emailContent .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $emailContent .= "\r\n";
        $emailContent .= $message . "\r\n";
        $emailContent .= ".\r\n";
        
        fputs($socket, $emailContent);
        $response = fgets($socket, 515);
        error_log("SMTP Content: " . trim($response));
        
        // QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        error_log("SMTP email sent successfully");
        return true;
        
    } catch (Exception $e) {
        error_log("SMTP error: " . $e->getMessage());
        if (isset($socket)) {
            fclose($socket);
        }
        return false;
    }
}

// Log email attempt for debugging
error_log("Email attempt to $to - Success: " . ($mailSent ? 'Yes' : 'No') . " - Error: " . $mailError);

// Consider email sent if successful or on Railway
if ($mailSent) {
    // Send confirmation email to customer
    $customerSubject = 'Quote Request Received - Lustro Solutions Co';
    $customerBody = "
Dear $fullName,

Thank you for your quote request for $service.

We have received your request and will get back to you within 24 hours with a detailed quote.

Your Request Details:
- Service: $service
- Timeframe: $timeframe
- Address: $address

If you have any urgent questions, please don't hesitate to contact us.

Best regards,
Lustro Solutions Co Team
";

    $customerHeaders = [
        'From: info@lustrosolutions.co.uk',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];

    $customerMailSent = mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders));
    
    // Log customer email attempt
    error_log("Customer confirmation email to $email - Success: " . ($customerMailSent ? 'Yes' : 'No'));

    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your quote request has been submitted. We\'ll get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    $error_msg = error_get_last()['message'] ?? 'Unknown error';
    error_log("Email sending failed: $error_msg");
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your request. Please try again or contact us directly.'
    ]);
}
?>
