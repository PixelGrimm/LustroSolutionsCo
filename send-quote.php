<?php
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
$subject = 'New Quote Request - ' . $service;

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

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

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

    mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders));

    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your quote request has been submitted. We\'ll get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your request. Please try again or contact us directly.'
    ]);
}
?>
