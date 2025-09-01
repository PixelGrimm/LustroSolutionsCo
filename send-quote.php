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

/**
 * Robust SMTPS (port 465) sender for PHP 8.1+
 * - Works with implicit TLS (no STARTTLS needed on port 465)
 * - Verifies server certificate (SNI + CA)
 * - Logs full transcript for debugging
 */
function sendEmailViaSMTP($host, $port, $username, $password, $encryption, $to, $subject, $message, $fromEmail, $fromName) {
    try {
        // For port 465, we need implicit TLS (ssl:// transport)
        if ($port == 465) {
            return sendEmailViaSMTPS($host, $port, $username, $password, $to, $subject, $message, $fromEmail, $fromName);
        } else {
            // Fallback for other ports
            return sendEmailViaSMTPTLS($host, $port, $username, $password, $encryption, $to, $subject, $message, $fromEmail, $fromName);
        }
    } catch (Exception $e) {
        error_log("SMTP error: " . $e->getMessage());
        return false;
    }
}

function sendEmailViaSMTPS($host, $port, $username, $password, $to, $subject, $message, $fromEmail, $fromName) {
    // Find CA certificate file
    $cafiles = [
        '/etc/ssl/certs/ca-certificates.crt', // Debian/Ubuntu
        '/etc/ssl/cert.pem'                   // Alpine/macOS images
    ];
    $cafile = null;
    foreach ($cafiles as $c) { 
        if (is_readable($c)) { 
            $cafile = $c; 
            break; 
        } 
    }

    // Create SSL context for implicit TLS
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer'       => true,
            'verify_peer_name'  => true,
            'peer_name'         => $host, // SNI
            'allow_self_signed' => false,
            'disable_compression' => true,
            'crypto_method' => STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT,
            'cafile' => $cafile
        ]
    ]);

    // Connect with implicit TLS (ssl:// transport)
    $fp = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        error_log("SMTPS connection failed: {$errstr} ({$errno})");
        return false;
    }
    stream_set_timeout($fp, 20);

    $log = [];
    $read = function($expect = null) use ($fp, &$log) {
        $lines = [];
        $code  = null;
        while (($line = fgets($fp, 4096)) !== false) {
            $lines[] = rtrim($line, "\r\n");
            if (preg_match('/^(\d{3})([ -])/', $line, $m)) {
                $code = (int)$m[1];
                if ($m[2] === ' ') break; // end of multi-line reply
            } else break;
        }
        $log[] = ['in' => $lines];
        error_log("SMTP Response: " . implode(" | ", $lines));
        if ($expect !== null && $code !== $expect) {
            error_log("Unexpected SMTP response {$code}: " . implode("\n", $lines));
            return false;
        }
        return $code;
    };
    
    $send = function($cmd) use ($fp, &$log) {
        fwrite($fp, $cmd . "\r\n");
        $log[] = ['out' => $cmd];
        error_log("SMTP Command: " . $cmd);
    };

    try {
        // 1) Read server banner
        $code = $read(220);
        if ($code === false) throw new Exception("Failed to read server banner");

        // 2) EHLO
        $send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
        $code = $read(250);
        if ($code === false) throw new Exception("EHLO failed");

        // 3) AUTH LOGIN (implicit TLS, so it's safe to auth now)
        $send("AUTH LOGIN");
        $code = $read(334);
        if ($code === false) throw new Exception("AUTH LOGIN failed");
        
        $send(base64_encode($username));
        $code = $read(334);
        if ($code === false) throw new Exception("Username auth failed");
        
        $send(base64_encode($password));
        $code = $read();
        if ($code !== 235) throw new Exception("Password auth failed (code: {$code})");

        // 4) MAIL FROM
        $send("MAIL FROM:<{$username}>");
        $code = $read(250);
        if ($code === false) throw new Exception("MAIL FROM failed");

        // 5) RCPT TO
        $send("RCPT TO:<{$to}>");
        $code = $read();
        if ($code !== 250 && $code !== 251) throw new Exception("RCPT TO failed (code: {$code})");

        // 6) DATA
        $send("DATA");
        $code = $read(354);
        if ($code === false) throw new Exception("DATA command failed");

        // Headers + body (with dot-stuffing)
        $headers = [
            "From: {$fromName} <{$username}>",
            "To: <{$to}>",
            "Subject: {$subject}",
            "Reply-To: {$fromEmail}",
            "MIME-Version: 1.0",
            "Content-Type: text/plain; charset=UTF-8",
            "Content-Transfer-Encoding: 8bit",
            "X-Mailer: PHP/" . phpversion()
        ];
        $safeBody = preg_replace('/^\./m', '..', $message);
        $emailContent = implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n.";

        fwrite($fp, $emailContent . "\r\n");
        $log[] = ['out' => '[message body]'];
        $code = $read(250);
        if ($code === false) throw new Exception("Message sending failed");

        // 7) QUIT
        $send("QUIT");
        $read(221);
        fclose($fp);

        error_log("SMTPS email sent successfully via {$host}:{$port}");
        return true;

    } catch (Exception $e) {
        error_log("SMTPS error: " . $e->getMessage());
        if (isset($fp)) {
            fclose($fp);
        }
        return false;
    }
}

function sendEmailViaSMTPTLS($host, $port, $username, $password, $encryption, $to, $subject, $message, $fromEmail, $fromName) {
    // Fallback for non-465 ports (STARTTLS)
    try {
        $socket = fsockopen($host, $port, $errno, $errstr, 30);
        if (!$socket) {
            error_log("SMTP connection failed: $errstr ($errno)");
            return false;
        }
        
        // Basic SMTP implementation for other ports
        // ... (existing code for non-465 ports)
        error_log("Non-465 port SMTP not fully implemented");
        fclose($socket);
        return false;
        
    } catch (Exception $e) {
        error_log("SMTPTLS error: " . $e->getMessage());
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
