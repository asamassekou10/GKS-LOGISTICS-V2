# GKS Logistics Forms & Brevo Email Integration Setup Guide

This guide explains how to set up form submissions to send professional emails via Brevo to `gksforms@googlegroups.com`.

## Overview

The system supports multiple forms:
1. **Contact Form** - Homepage contact section
2. **Quote Request Form** - Quote inquiry from customers
3. **Career Application Form** - Job applications
4. **Newsletter Signup** - Email newsletter subscriptions

## Architecture

```
User submits form
        ↓
Netlify captures form submission
        ↓
Webhook triggers serverless function
        ↓
Brevo API sends professional email
        ↓
Email delivered to gksforms@googlegroups.com
```

## Setup Instructions

### Step 1: Add Brevo API Key to Netlify

1. Go to your Netlify site settings
2. Navigate to **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add new variable:
   - **Key**: `BREVO_API_KEY`
   - **Value**: Paste your Brevo API key (starting with `xkeysib-...`)
5. Save and redeploy your site

### Step 2: Deploy the Serverless Function

The file `netlify/functions/send-email-brevo.js` is already created. It will:
- Listen for form submissions
- Format professional HTML emails
- Send via Brevo API
- Handle different form types (contact, quote, career, newsletter)

Make sure this file is included when you deploy to Netlify.

### Step 3: Configure Netlify Forms

All forms are already configured with `data-netlify="true"` and form names:
- Contact form: `name="contact"`
- Quote request: `name="quote-request"`
- Career application: `name="career-application"`
- Newsletter: `name="newsletter-signup"`

These names are used to route form data to the correct email template.

### Step 4: Set Up Webhook (Optional - for manual testing)

If you want to manually trigger the webhook:

1. In Netlify, go to **Site settings** → **Build & deploy** → **Post processing**
2. Find your form notifications section
3. Add a webhook URL for form submissions (Netlify will provide this automatically)

## Email Templates

The system includes professional HTML email templates for each form type:

### Contact Form Template
- Displays sender name, email, service type, and message
- Professional blue GKS Logistics branding
- Clean, readable layout

### Quote Request Template
- Shows all shipment details
- Organized sections for contact info, shipment details, and additional services
- Includes freight type, origin, destination, dates, and specifications

### Career Application Template
- Professional template for job applications
- Shows applicant details and qualifications

### Newsletter Signup Template
- Simple confirmation template
- Shows subscriber email

## Environment Variables

```env
BREVO_API_KEY=[Your-Brevo-API-Key-Here]
```

This is added to `netlify.toml` and should be set in Netlify's UI with your actual Brevo API key.

## Testing Locally

To test the serverless function locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Netlify CLI:
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify dev
   ```

3. Submit a form to your local development server
4. The function will be triggered and attempt to send an email via Brevo

## Form Field Mappings

### Contact Form
- `name` - Sender's name
- `email` - Sender's email address
- `service` - Type of service (individual, small-business, enterprise, other)
- `message` - Message content

### Quote Request Form
- `fullName` - Full name
- `companyName` - Company name
- `email` - Professional email
- `phoneNumber` - Contact phone
- `freightType` - Type of freight (air, sea, road, etc.)
- `cargoNature` - Nature of cargo
- `origin` - Shipment origin
- `destination` - Shipment destination
- `preferredDate` - Preferred shipping date
- `dimensionsWeight` - Package dimensions and weight
- `quantityPackages` - Number of packages
- `additionalServices[]` - Additional services (array)

## Brevo API Reference

The serverless function uses Brevo's SMTP API endpoint:
- **Base URL**: `https://api.brevo.com/v3`
- **Endpoint**: `/smtp/email`
- **Method**: POST
- **Authentication**: API key in header

### Required Headers
```
api-key: [YOUR_BREVO_API_KEY]
Content-Type: application/json
```

### Request Body Format
```json
{
  "to": [
    {
      "email": "gksforms@googlegroups.com",
      "name": "GKS Logistics Forms"
    }
  ],
  "subject": "Email Subject",
  "htmlContent": "<html>...</html>",
  "textContent": "Plain text version",
  "sender": {
    "name": "GKS Logistics",
    "email": "noreply@gkslogistics.com"
  }
}
```

## Troubleshooting

### Forms not submitting?
1. Check that forms have `data-netlify="true"` attribute
2. Ensure form `name` attribute is set correctly
3. Check browser console for JavaScript errors

### Emails not being sent?
1. Verify Brevo API key is correctly set in Netlify environment
2. Check Netlify function logs: **Netlify UI** → **Functions** → **View logs**
3. Ensure Brevo account is active and API key is valid
4. Check email spam folder

### Email template issues?
1. Check the HTML in `send-email-brevo.js` for syntax errors
2. Test with a simple text email first
3. Review Brevo API response in function logs

## Security Notes

- **API Key**: Store in Netlify environment variables, never commit to code
- **Form Honeypot**: Netlify's spam protection is enabled (`data-netlify-honeypot="bot-field"`)
- **HTTPS**: All form submissions are encrypted in transit
- **CORS**: Netlify handles CORS automatically for form submissions

## Future Enhancements

Consider implementing:
1. Customer confirmation emails via Brevo
2. Form submission tracking/analytics
3. Conditional email routing based on form type
4. Auto-reply templates
5. CRM integration (HubSpot, Salesforce, etc.)

## Contact

For questions or issues with Brevo integration:
- Brevo Support: https://www.brevo.com/support
- Netlify Support: https://support.netlify.com
- GKS Logistics: contact@gkslogistics.com
