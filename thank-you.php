<?php
// Set proper headers
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Lustro Solutions Co</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LXWS39M4C4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-LXWS39M4C4', {
        'page_title': 'Thank You - Quote Request Received',
        'page_location': window.location.href,
        'send_page_view': true
      });
      
      // Track conversion for Google Ads
      gtag('event', 'conversion', {
        'send_to': 'G-LXWS39M4C4',
        'event_category': 'quote_request',
        'event_label': 'form_submission_success',
        'value': 1
      });
    </script>
    
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%), 
                        url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop') center/cover;
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(0, 212, 170, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        }
        
        .container {
            text-align: center;
            max-width: 800px;
            width: 90%;
            position: relative;
            z-index: 10;
        }
        
        .hero-text {
            margin-bottom: 40px;
        }
        
        .hero-title {
            font-size: 2.8rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1rem;
            color: white;
        }
        
        .highlight {
            background: linear-gradient(135deg, #00d4aa, #8a2be2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .popup-container {
            max-width: 500px;
            margin: 0 auto;
        }
        
        .logo {
            color: #00d4aa;
            font-size: 2rem;
            margin-bottom: 30px;
        }
        
        .popup {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 40px;
            border-radius: 20px;
            margin: 20px 0;
            position: relative;
        }
        
        .popup h1 {
            font-size: 2.5rem;
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .popup p {
            font-size: 1.2rem;
            margin: 0 0 30px 0;
            line-height: 1.5;
        }
        
        .continue-btn {
            background: white;
            color: #10b981;
            border: none;
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.3s;
        }
        
        .continue-btn:hover {
            transform: translateY(-2px);
        }
        
        .back-link {
            color: #00d4aa;
            text-decoration: none;
            margin-top: 20px;
            display: inline-block;
        }
        
        .back-link:hover {
            color: white;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 20px;
                margin: 20px;
            }
            
            .popup h1 {
                font-size: 2rem;
            }
            
            .popup p {
                font-size: 1.1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero-text">
            <h1 class="hero-title">
                Turn your space into a<br>
                <span class="highlight">clean story.</span>
            </h1>
        </div>
        
        <div class="popup-container">
            <div class="popup">
                <h1>🎉 Quote Request Sent!</h1>
                <p>Thank you! Your quote request has been sent successfully. We will contact you soon.</p>
                <a href="https://lustrosolutions.co.uk" class="continue-btn">Continue</a>
            </div>
        </div>
        
        <a href="https://lustrosolutions.co.uk" class="back-link">← Back to Home</a>
    </div>

    <script>
        // Track page view
        gtag('event', 'page_view', {
            'page_title': 'Thank You - Quote Request Received',
            'page_location': window.location.href
        });
        
        // Track conversion
        gtag('event', 'purchase', {
            'transaction_id': 'quote_request_' + Date.now(),
            'value': 1,
            'currency': 'GBP'
        });
        
        // Auto-redirect after 10 seconds
        setTimeout(function() {
            window.location.href = 'https://lustrosolutions.co.uk';
        }, 10000);
        
        console.log('Thank you page loaded successfully');
    </script>
</body>
</html>