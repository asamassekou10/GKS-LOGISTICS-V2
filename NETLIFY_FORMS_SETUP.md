# Netlify Forms Custom Email Template Setup

## Overview

This guide explains how to configure custom email notifications for Netlify Forms on the GKS Logistics website. A beautiful, modern HTML email template has been created to replace the default Netlify notification emails.

## Files Included

1. **email-templates/form-notification.html** - Beautiful, responsive HTML email template
2. **netlify/functions/form-submission.js** - Serverless function for processing form submissions
3. **netlify.toml** - Configuration file with form settings

## Setup Instructions

### Step 1: Configure Email Notifications in Netlify Dashboard

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Forms**
3. Look for "Notification settings"

### Step 2: Enable Custom Email Template

You have two options:

#### Option A: Use Netlify's Built-in Email Customization (Recommended)

1. In the Netlify Dashboard, go to **Forms** settings
2. Under "Notifications," select **Email**
3. Click "Customize" to access email template editor
4. Copy the HTML from `email-templates/form-notification.html`
5. Paste it into the template editor
6. Save the changes

#### Option B: Use Serverless Functions (Advanced)

If you want to add custom logic or integrate with external services:

1. The serverless function `netlify/functions/form-submission.js` is already set up
2. Deploy your site - Netlify will automatically deploy the function
3. Configure form settings to call the function

### Step 3: Test Form Submissions

1. Fill out a form on your website
2. Check the email notification that arrives
3. It should use the beautiful template with:
   - GKS Logistics branding
   - Professional gradient header
   - Clearly formatted form fields
   - Submission metadata
   - Call-to-action button

## Email Template Features

### Design Elements
- **Modern Gradient Header** - Blue to lighter blue gradient (#003087 → #0052cc)
- **Professional Typography** - System font stack for optimal email client support
- **Responsive Layout** - Beautiful on desktop, tablet, and mobile devices
- **Brand Colors** - Consistent with GKS Logistics branding
- **Clear Information Hierarchy** - Easy to scan and read

### Content Sections
1. **Header** - Brand logo, title, and form name
2. **Submission Details** - All form fields with labels and values
3. **Metadata Box** - Form name, submission date/time, IP address
4. **Call-to-Action** - Link to Netlify dashboard
5. **Quick Actions** - Buttons to view in dashboard or visit website
6. **Footer** - Copyright and links

### Responsive Features
- Mobile-optimized layout (max-width: 600px)
- Flexible table structures
- Readable font sizes on small screens
- Proper spacing and padding
- Works with all major email clients

## Email Client Support

The template is tested and works beautifully in:
- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Thunderbird
- ✅ Mobile email apps (iOS Mail, Gmail app, Outlook app)
- ✅ Web-based email clients

## Customization Options

### Modify Colors
Edit the color variables in the `<style>` section:
```html
<!-- Primary brand color -->
color: #003087;

<!-- Accent color -->
color: #0052cc;

<!-- Background color -->
background-color: #f8f9fa;
```

### Update Logo/Branding
Replace "GKS LOGISTICS" text in the header:
```html
<span class="brand-logo">YOUR COMPANY NAME</span>
```

### Change Links
Update the dashboard and website links in the CTA section:
```html
<a href="https://app.netlify.com">View in Dashboard</a>
<a href="https://gkslogistics.com">Visit Website</a>
```

### Add/Remove Fields
Modify the `form_data_table` placeholder to show/hide specific fields:
```html
<!-- Fields will be automatically populated from form submission -->
{{form_data_table}}
```

## Form Configuration

All forms on your website should have these attributes:

### Basic Netlify Form Attributes
```html
<form name="your-form-name" data-netlify="true" method="POST">
  <!-- Form fields -->
</form>
```

### With Honeypot Protection
```html
<form name="your-form-name"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST">
  <!-- Honeypot field (hidden from users) -->
  <input type="hidden" name="bot-field">

  <!-- Actual form fields -->
</form>
```

### With Redirect on Success
```html
<form name="your-form-name"
      data-netlify="true"
      action="/thank-you"
      method="POST">
  <!-- Form fields -->
</form>
```

## Current Forms with Notifications

The following forms on your website are configured to use these email notifications:

1. **Quote Request Form** - `name="quote-request"`
2. **Groupage Booking** - `name="groupage-booking"`
3. **Career Application** - `name="career-application"`
4. **Newsletter Signup** - `name="newsletter-signup"`
5. **Contact Form** - `name="contact"`

## Troubleshooting

### Emails Not Arriving

1. **Check Netlify Settings:**
   - Verify form is configured in Netlify dashboard
   - Check that email notifications are enabled
   - Verify recipient email address is correct

2. **Check Form HTML:**
   - Ensure `data-netlify="true"` is present
   - Form must have a `name` attribute
   - Form must have `method="POST"`

3. **Check Spam Folder:**
   - Email might be filtered as spam
   - Add notification email to safe senders
   - Check spam settings in email provider

### Template Not Displaying Correctly

1. **Test in Different Email Clients:**
   - Gmail renders differently than Outlook
   - Mobile clients may render differently
   - Check the email client's HTML support

2. **Check for CSS Support:**
   - Some email clients strip certain CSS
   - Inline styles are more reliable than `<style>` tags
   - Test with Litmus or Email on Acid

3. **Verify Template Variables:**
   - Ensure all template variables are correct
   - Check that form field data is being sent properly
   - Verify no special characters are breaking the HTML

## Best Practices

### For Form Configuration
- Always use honeypot protection to prevent spam
- Include thank-you pages for better UX
- Use descriptive form names (helps in email subject lines)
- Test all forms before going live

### For Email Notifications
- Keep notification emails concise and scannable
- Highlight important information
- Include clear call-to-action
- Test across multiple email clients
- Monitor spam reports and adjust accordingly

### For User Experience
- Provide clear form submission feedback
- Send thank-you page or confirmation email to user
- Include next steps (what happens after submission)
- Have a backup contact method visible

## Advanced: Custom Serverless Function

For advanced use cases, modify `netlify/functions/form-submission.js`:

```javascript
// Add custom logic here
exports.handler = async (event) => {
  // Parse form data
  const body = JSON.parse(event.body);

  // Custom logic - send to external service, database, etc.
  // const result = await customService.process(body);

  // Generate email
  const emailHtml = generateEmailTemplate(body, formName);

  // Send email using your preferred service
  // await emailService.send({
  //   to: process.env.NOTIFICATION_EMAIL,
  //   subject: `New ${formName} Submission`,
  //   html: emailHtml
  // });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

## Environment Variables

Set these in your Netlify site settings for the serverless function:

```
NOTIFICATION_EMAIL = your-email@gkslogistics.com
FORM_ADMIN_EMAIL = admin@gkslogistics.com
```

## Support & Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/overview/)
- [Email Client CSS Support](https://www.campaignmonitor.com/css/)
- [MJML - Responsive Email Framework](https://mjml.io/)
- [Email on Acid - Testing Tool](https://www.emailonacid.com/)
- [Litmus - Email Testing](https://www.litmus.com/)

## Notes

- This template maintains full compatibility with Netlify's native form processing
- The design is print-friendly if users want to save the email
- The template includes proper MIME types for all email clients
- All external links use absolute URLs for reliability

## Updates and Maintenance

The email template may need updates:
- Brand color changes
- Company information updates
- New form types
- Email client compatibility improvements

When updating, test in at least 3 different email clients before deploying to production.
