# Custom Email Template - Quick Start Guide

## 🎯 What You Have

A beautiful, professional HTML email template for Netlify Forms that:
- ✅ Looks professional in all email clients
- ✅ Matches GKS Logistics brand colors
- ✅ Responsive on mobile and desktop
- ✅ Includes all form submission details
- ✅ Has a clear call-to-action button

## 📋 Quick Setup (5 minutes)

### Step 1: Copy the Template HTML

The template is located at:
```
email-templates/form-notification.html
```

### Step 2: Access Netlify Dashboard

1. Go to [Netlify App](https://app.netlify.com)
2. Select your GKS Logistics site
3. Go to **Site settings** → **Forms** (in left menu)

### Step 3: Configure Email Notifications

1. Click **Forms** in the left sidebar
2. Find the form you want to customize (e.g., "quote-request")
3. Under **Notification settings**, select **Email**
4. You'll see an option to customize the notification template

### Step 4: Add Custom Template

1. In the email customization section, copy all the HTML from `EMAIL_TEMPLATE_INLINE_CSS.html` ⭐
   - **NOT** `EMAIL_TEMPLATE_COPY_PASTE.html` (that one has `<style>` tags that don't work)
   - Use the **inline CSS** version for email clients
2. Paste it into Netlify's template editor
3. Click **Save**

**Why inline CSS?** Email clients strip `<style>` tags for security. Inline styles work perfectly. See `FIX_CSS_RENDERING.md` for details.

### Step 5: Test!

1. Fill out the form on your website
2. Check your email inbox (the one configured in Netlify)
3. You should receive an email with the beautiful new template!

## 🎨 What the Email Contains

```
┌─────────────────────────────────────┐
│  GKS LOGISTICS                      │  ← Brand Header
│  New Form Submission                │
│  [Form Name]                        │
└─────────────────────────────────────┘
│                                     │
│  SUBMISSION DETAILS                 │  ← Form Fields
│  ─────────────────                  │
│  Full Name: John Doe                │
│  Email: john@example.com            │
│  Message: [Form content]            │
│                                     │
│  ┌─────────────────────────────────┐│  ← Metadata
│  │ Form Name: contact              ││
│  │ Submitted: [Date & Time]        ││
│  │ IP Address: [User IP]           ││
│  └─────────────────────────────────┘│
│                                     │
│     ⚡ Review in Netlify dashboard  │  ← CTA
│                                     │
│  [View in Dashboard] [Visit Site]   │  ← Action Buttons
│                                     │
├─────────────────────────────────────┤
│  © 2024 GKS Logistics               │  ← Footer
│  Visit our website                  │
└─────────────────────────────────────┘
```

## 📧 Which Forms Use This?

All forms on your website can use this template:

| Form Name | Purpose | Location |
|-----------|---------|----------|
| `quote-request` | Quick quote requests | All pages |
| `groupage-booking` | Groupage service bookings | `/groupage.html` |
| `career-application` | Job applications | `/careers.html` |
| `newsletter-signup` | Newsletter subscriptions | Footer |
| `contact` | General inquiries | `/contact.html` |

## 🎯 Personalization

### Change Colors to Match Your Branding

1. Open `email-templates/form-notification.html`
2. Find the color values:
   - `#003087` = Primary blue
   - `#0052cc` = Accent blue
   - `#f8f9fa` = Light background
3. Replace with your colors
4. Update in Netlify dashboard

### Change Company Name

Search for "GKS LOGISTICS" in the template and replace with your company name.

### Change Dashboard Link

Find this line:
```html
<a href="https://app.netlify.com">View in Dashboard</a>
```

Change to your Netlify dashboard URL if needed.

## 🔧 Common Customizations

### Add Form-Specific Instructions

Add this after the form fields section:

```html
<div style="background: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
  <p style="margin: 0; color: #003087; font-weight: 600;">Next Steps:</p>
  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">
    We will review your submission and get back to you within 24 hours.
  </p>
</div>
```

### Add Priority Badge for Urgent Forms

Add this to the header for time-sensitive forms:

```html
<span style="background: #dc143c; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: 700;">
  URGENT
</span>
```

### Custom Footer Message

Replace the footer text with form-specific messages:

```html
<!-- For Quote Requests -->
<p>Your quote request is being processed. We'll send you a detailed estimate within 2 hours.</p>

<!-- For Job Applications -->
<p>Thank you for applying! We'll review your application and contact you if you're selected for an interview.</p>

<!-- For Bookings -->
<p>Your booking is confirmed. You'll receive a confirmation email with all details shortly.</p>
```

## 📱 Mobile View

The template automatically adapts for mobile devices:
- Smaller fonts on tiny screens
- Single-column layout instead of side-by-side
- Proper touch target sizes for buttons
- Readable on all phone sizes (320px - 1200px width)

## ✅ Testing the Template

### Test in Gmail
1. Send yourself a test email
2. View in Gmail on desktop
3. Forward to mobile and view in Gmail app

### Test in Outlook
Check that the blue gradient displays correctly (some Outlook versions don't support CSS gradients)

### Use Email Testing Tools
- [Email on Acid](https://www.emailonacid.com/) - Free preview in 100+ clients
- [Litmus](https://www.litmus.com/) - Comprehensive email testing
- [Stripo](https://stripo.email/) - Email template builder with preview

## 🐛 Troubleshooting

### Email Not Arriving?

1. **Check Spam Folder** - Add the sender email to safe senders
2. **Verify in Netlify** - Check Site Settings → Forms to confirm it's configured
3. **Test Form Submission** - Submit a test form from your website
4. **Check Netlify Logs** - Go to Netlify > Deployments > Deploy Log for errors

### Template Looking Weird?

1. **Clear Cache** - Clear your email client cache
2. **Try Different Client** - Some email clients render CSS differently
3. **Check Special Characters** - Ensure no special characters broke the HTML
4. **Test in Web Client** - Gmail web often renders better than desktop apps

### Fields Missing from Email?

1. **Check Form Name** - Ensure form has `data-netlify="true"` attribute
2. **Check Field Names** - Form fields must have `name` attributes
3. **Test Submission** - Try submitting the form again
4. **Verify HTML** - Ensure form HTML is valid

## 🔐 Security Notes

- The template displays IP addresses - this is normal for spam detection
- Honeypot fields (`data-netlify-honeypot`) protect against spam
- Never put sensitive data in forms (credit cards, passwords, etc.)
- Netlify stores form submissions securely

## 📚 Learn More

- Full documentation: See `NETLIFY_FORMS_SETUP.md`
- Netlify Forms docs: https://docs.netlify.com/forms/overview/
- Email design best practices: https://www.smashingmagazine.com/2017/01/guide-improving-email-workflows-with-css/

## 🎯 Next Steps

1. ✅ Copy the template HTML
2. ✅ Paste into Netlify dashboard
3. ✅ Save the configuration
4. ✅ Test by submitting a form
5. ✅ Customize colors/branding as needed

## 💡 Pro Tips

- **Pro Tip 1:** Save the template HTML in your email drafts for quick access
- **Pro Tip 2:** Test on your phone's email app - Gmail on iPhone renders differently
- **Pro Tip 3:** Use a separate admin email for notifications vs. user confirmations
- **Pro Tip 4:** Add a "Reply-To" email in Netlify settings for direct responses
- **Pro Tip 5:** Monitor the Netlify dashboard for spam submissions regularly

---

**Questions?** Check the full setup guide in `NETLIFY_FORMS_SETUP.md` or contact Netlify support.
