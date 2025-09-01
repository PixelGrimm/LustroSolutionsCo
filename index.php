<?php
// Simple index.php for Railway health checks
if (file_exists('index.html')) {
    // Serve the main HTML file
    readfile('index.html');
} else {
    // Fallback response
    header('Content-Type: text/html');
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Lustro Solutions Co</title>
    </head>
    <body>
        <h1>Lustro Solutions Co</h1>
        <p>Website is running successfully.</p>
        <p>Status: Healthy</p>
    </body>
    </html>';
}
?>
