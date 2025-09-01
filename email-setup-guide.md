# Email Setup Guide for Railway

## Current Status
Your quote form is working but emails are not being sent on the live Railway deployment.

## Why This Happens
Railway doesn't have SMTP configured by default, so PHP's `mail()` function doesn't work.

## Solutions

### Option 1: Configure SMTP on Railway (Recommended)
1. Go to your Railway project dashboard
2. Navigate to Variables section
3. Add these environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```
4. Update `send-quote.php` to use PHPMailer or similar

### Option 2: Use Email Service (Easier)
1. Sign up for SendGrid, Mailgun, or similar
2. Get API key
3. Update `send-quote.php` to use their API

### Option 3: Use Railway's Built-in Email (Simplest)
1. Railway has email services you can add
2. Connect your domain email
3. Update code to use Railway's email API

## Current Workaround
The form currently simulates email success on Railway so users get confirmation messages, but actual emails aren't sent.

## Next Steps
Choose one of the above options to enable real email functionality.
