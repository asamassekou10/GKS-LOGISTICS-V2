# Netlify Deployment Checklist for Brevo Email Integration

Complete these steps to fully deploy the form submission and email system.

## Pre-Deployment Checklist

- [ ] Brevo API key obtained (from Brevo account dashboard)
- [ ] Recipient email configured: `gksforms@googlegroups.com`
- [ ] All form files created:
  - [ ] `netlify/functions/send-email-brevo.js`
  - [ ] `netlify.toml` (updated with environment variables)
  - [ ] `src/template.html` (contact form updated)

## Netlify UI Configuration Steps

### 1. Set Environment Variables

**Path**: Site Settings → Build & deploy → Environment

| Variable | Value | Scope |
|----------|-------|-------|
| `BREVO_API_KEY` | [Your Brevo API key from your account] | Production |

**How to add:**
1. Go to your Netlify site dashboard
2. Click "Site settings"
3. Go to "Build & deploy" → "Environment"
4. Click "Edit variables"
5. Add the variable above
6. Save changes

### 2. Verify Forms Configuration

**Path**: Forms → All forms

You should see these forms listed:
- [ ] `contact` (Contact Form)
- [ ] `quote-request` (Quote Request)
- [ ] `career-application` (Career Applications)
- [ ] `newsletter-signup` (Newsletter Signup)

### 3. Check Function Deployment

**Path**: Functions

- [ ] Verify `send-email-brevo` function is deployed
- [ ] Check for any deployment errors in the logs

### 4. Set Up Form Notifications (Optional)

**Path**: Forms → [Form Name] → Notifications

For each form, you can optionally configure:
- Email notifications to `gksforms@googlegroups.com`
- Slack notifications (if using Slack)

However, the serverless function will handle this automatically.

## Deployment Steps

### Step 1: Push Code to Git
```bash
git add .
git commit -m "feat: Add Brevo email integration for forms"
git push origin main
```

### Step 2: Trigger Deploy

1. Go to Netlify site dashboard
2. Click "Deploys"
3. Click "Trigger deploy" → "Deploy site"

OR let it auto-deploy if you have continuous deployment enabled.

### Step 3: Monitor Deployment

1. Watch the deployment progress in Netlify UI
2. Check "Deploys" section for build status
3. Check "Functions" section to ensure function deployed successfully

### Step 4: Test Forms

Once deployed:

1. Go to your website
2. Fill out the contact form
3. Submit the form
4. Check that:
   - Form submission is acknowledged
   - Email is sent to `gksforms@googlegroups.com`
   - Email contains all form data
   - Email is properly formatted

### Step 5: Check Logs

If email doesn't arrive:

1. Go to Netlify site → Functions → send-email-brevo
2. Click "View logs"
3. Look for error messages
4. Check Brevo account for bounce/delivery issues

## Form Submission Flow

```
User submits form
     ↓
Netlify receives form (POST to /?)
     ↓
Form stored in Netlify (visible in Forms UI)
     ↓
Webhook triggers serverless function
     ↓
Function receives form data
     ↓
Function calls Brevo API with formatted email
     ↓
Brevo sends email to gksforms@googlegroups.com
     ↓
Function returns success response
```

## Testing URLs

After deployment, test these forms:

- **Contact Form**: `https://yourdomain.com/#contact`
- **Quote Request**: `https://yourdomain.com/` (Quote modal in services)
- **Career Application**: `https://yourdomain.com/careers.html`
- **Newsletter**: `https://yourdomain.com/careers.html` (Newsletter section)

## Monitoring

### Netlify Dashboard
- **Forms** section shows all submissions
- **Functions** section shows serverless function logs
- **Analytics** can track conversion rates

### Brevo Dashboard
- Check "Transactional" emails for delivery stats
- View bounces and failed sends
- Monitor API usage

### Email Inbox
- Check `gksforms@googlegroups.com` for incoming emails
- Check spam folder
- Verify sender address: `noreply@gkslogistics.com`

## Troubleshooting

### Email not arriving?

1. **Check Netlify logs**:
   - Site → Functions → send-email-brevo → View logs
   - Look for API errors

2. **Check Brevo account**:
   - Is API key valid?
   - Is account active?
   - Check API usage quota

3. **Check email settings**:
   - Is `gksforms@googlegroups.com` correct?
   - Is sender address verified in Brevo?
   - Check Google Groups settings

4. **Check spam**:
   - Email might be in spam folder
   - Add sender to contacts: `noreply@gkslogistics.com`

### Form not submitting?

1. Check browser console for JavaScript errors
2. Verify form has `data-netlify="true"` attribute
3. Check that form has `name` attribute
4. Verify input fields have `name` attributes

### Function not deploying?

1. Check that `netlify/functions/send-email-brevo.js` exists
2. Check for syntax errors in function file
3. Check Netlify build logs for Node.js errors
4. Verify `netlify.toml` exists and is valid

## Success Indicators

✅ Deployment successful when:
- [ ] Netlify shows "All tests passed" in deploy status
- [ ] Function `send-email-brevo` is visible in Functions section
- [ ] Forms section shows at least one form submission
- [ ] Email arrives in `gksforms@googlegroups.com` inbox
- [ ] Email contains formatted HTML and all form data

## Quick Command Reference

```bash
# Local testing
npm install
netlify dev

# Deploy to production
git push origin main

# View function logs
netlify functions:invoke send-email-brevo

# List all functions
netlify functions:list
```

## Support Links

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Brevo API Documentation](https://developers.brevo.com/reference/sendtransacemail)
- [Brevo SMTP Settings](https://app-smtp.brevo.com/account/smtp)

## Notes

- All form submissions are stored in Netlify for 30 days
- Email templates are HTML5 compatible
- Supports multiple recipients by modifying the `to` field in the serverless function
- Can add additional forms by creating new sections in `getEmailTemplate()` function

---

**Last Updated**: 2024
**Status**: Ready for deployment
