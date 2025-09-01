# Railway Email Setup Guide

## Current Problem
Your email form is not sending real emails because Railway doesn't have SMTP configured.

## Solution: Configure SMTP on Railway

### Step 1: Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" → "2-Step Verification" → "App passwords"
3. Generate a new app password for "Mail"
4. Copy the 16-character password

### Step 2: Update Railway Variables
1. Go to your Railway project dashboard
2. Click "Variables" tab
3. Update these values:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USERNAME = your-actual-gmail@gmail.com
SMTP_PASSWORD = your-16-char-app-password
SMTP_ENCRYPTION = tls
```

### Step 3: Alternative Email Services

#### Option A: SendGrid (Recommended)
```
SMTP_HOST = smtp.sendgrid.net
SMTP_PORT = 587
SMTP_USERNAME = apikey
SMTP_PASSWORD = your-sendgrid-api-key
```

#### Option B: Mailgun
```
SMTP_HOST = smtp.mailgun.org
SMTP_PORT = 587
SMTP_USERNAME = your-mailgun-username
SMTP_PASSWORD = your-mailgun-password
```

### Step 4: Test Email
1. Deploy changes to Railway
2. Submit a quote form
3. Check if emails are received
4. Check Railway logs for success

## Current Status
- ✅ Form submits successfully
- ✅ User gets success message
- ❌ Real emails not sent
- ❌ Railway variables need real SMTP credentials

## Next Steps
1. Choose email service (Gmail, SendGrid, Mailgun)
2. Update Railway variables with real credentials
3. Deploy and test
