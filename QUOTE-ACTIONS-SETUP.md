# Quote Actions Setup Guide

## Overview
The quote calculator now has three fully functional action buttons:

1. **"Confirmer et Réserver" (Confirm and Book)** - Pre-fills contact form and scrolls to it
2. **"Imprimer" (Print)** - Creates a professional printable quote document
3. **"Envoyer par Email" (Email Quote)** - Opens email client with pre-filled quote details

## Implementation Details

### 1. Confirm and Book Button
- **Functionality**: 
  - Closes the calculator modal
  - Scrolls to the contact form section
  - Pre-fills the message field with quote details
  - Focuses on the name field for user input
  - Shows a success message

- **How it works**:
  - When clicked, it stores the quote summary in the contact form's message field
  - User fills in their name, email, and service type
  - Form submission uses Netlify Forms (configured in `js/script.js`)

### 2. Print Button
- **Functionality**:
  - Opens a new window with a formatted quote document
  - Includes company branding and all quote details
  - Automatically triggers print dialog
  - Professional formatting with GKS Logistics branding

- **Features**:
  - Clean, printable layout
  - All quote details included
  - Company contact information
  - Disclaimer about quote validity

### 3. Email Quote Button
- **Functionality**:
  - Opens the user's default email client
  - Pre-fills recipient: `sales@gkslogistics.com`
  - Pre-fills subject with quote details
  - Pre-fills body with formatted quote information

- **Fallback Options**:
  - Primary: Uses `mailto:` protocol (works everywhere)
  - Optional: Can be enhanced with EmailJS for better experience (see optional setup below)

## Netlify Forms Configuration

### Contact Form Setup
The contact form is configured to work with Netlify Forms:

1. **HTML Form** (`src/index.html`):
   ```html
   <form class="contact-form" id="contactForm" name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
   ```

2. **JavaScript Handler** (`js/script.js`):
   - Submits to Netlify using fetch API
   - Includes proper form encoding
   - Shows loading and success/error states

### Netlify Dashboard Setup
1. Go to your Netlify dashboard
2. Navigate to **Forms** section
3. You should see the "contact" form listed
4. Configure email notifications:
   - Go to **Notifications** in form settings
   - Add email address to receive submissions
   - Or use Zapier/other integrations

### Form Fields
The contact form submits the following fields:
- `name` - Customer name
- `email` - Customer email
- `service` - Service type (individual/small-business/enterprise/other)
- `message` - Message content (pre-filled with quote details when using "Confirm and Book")

## Testing

### Test Print Functionality
1. Calculate a quote
2. Click "Imprimer" button
3. Verify print preview shows all quote details
4. Check formatting looks professional

### Test Email Functionality
1. Calculate a quote
2. Click "Envoyer par Email" button
3. Verify email client opens with pre-filled details
4. Check subject and body content

### Test Confirm and Book
1. Calculate a quote
2. Click "Confirmer et Réserver" button
3. Verify modal closes and scrolls to contact form
4. Verify message field is pre-filled with quote details
5. Fill in name and email
6. Submit form
7. Check Netlify Forms dashboard for submission

## Optional: EmailJS Integration (Better Email Experience)

If you want to use EmailJS instead of `mailto:` for a smoother email experience:

1. **Sign up for EmailJS** (free tier available):
   - Go to https://www.emailjs.com/
   - Create an account
   - Verify your email

2. **Create an Email Service**:
   - Add an email service (Gmail, Outlook, etc.)
   - Get your Service ID

3. **Create an Email Template**:
   - Create a template for quote emails
   - Use variables: `{{message}}`, `{{subject}}`, `{{quote_total}}`, etc.
   - Get your Template ID

4. **Add to Website**:
   ```html
   <!-- Add before closing </body> tag -->
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
     (function(){
       emailjs.init("YOUR_PUBLIC_KEY");
       window.emailjsServiceId = "YOUR_SERVICE_ID";
       window.emailjsTemplateId = "YOUR_TEMPLATE_ID";
     })();
   </script>
   ```

5. **Update in code**: The `emailQuote()` function already supports EmailJS and will use it if configured, falling back to `mailto:` if not.

## Troubleshooting

### Print Button Not Working
- Check browser popup blocker settings
- Verify `window.currentQuote` exists (calculate quote first)
- Check browser console for errors

### Email Button Not Working
- Verify email client is configured on user's device
- Check `mailto:` protocol is allowed in browser
- For EmailJS, verify configuration values are correct

### Confirm and Book Not Working
- Verify contact form exists on the page (`#contact` section)
- Check that contact form has proper Netlify attributes
- Verify `formatRouteName` function is available globally
- Check browser console for errors

### Netlify Form Not Submitting
- Verify `data-netlify="true"` is on form
- Check form has `name="contact"` attribute
- Ensure `form-name` hidden field is included
- Check Netlify build logs for form detection
- Verify form fields have `name` attributes

## Files Modified

1. `js/quote-calculator.js`:
   - Added `window.currentQuote` storage
   - Implemented `confirmQuote()` function
   - Implemented `printQuote()` function
   - Implemented `emailQuote()` function
   - Made `formatRouteName()` globally accessible

2. `js/script.js`:
   - Updated contact form to use Netlify Forms
   - Added proper error handling
   - Added loading states

3. `src/index.html`:
   - Added Netlify form attributes to contact form
   - Added hidden form-name field
   - Added honeypot field for spam protection

## Support

For issues or questions:
- Check browser console for errors
- Verify Netlify Forms are enabled in your Netlify plan
- Ensure all form fields have proper `name` attributes
- Check Netlify Forms documentation: https://docs.netlify.com/forms/setup/

