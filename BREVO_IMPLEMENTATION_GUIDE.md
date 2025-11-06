# Brevo Implementation Guide - Step by Step

This is your complete guide to set up beautiful form notification emails using Brevo + Zapier. No credit card required.

**Total time:** ~45 minutes
**Total cost:** $0 (completely free)

---

## 📋 Overview of What We're Setting Up

```
Your Website Form
       ↓
Netlify Webhook
       ↓
Zapier (Automation)
       ↓
Brevo (Email Service)
       ↓
Beautiful Email to You
```

---

## STEP 1: Sign Up for Brevo (5 minutes)

### 1.1 Go to Brevo Website
1. Open https://www.brevo.com in your browser
2. Click the **"Sign up free"** button (top right)

### 1.2 Create Your Brevo Account
You'll see a sign-up form with these fields:

```
First name:     [Your First Name]
Last name:      [Your Last Name]
Email:          [your-email@gmail.com]
Password:       [Create strong password]
Company:        [GKS Logistics]
Country:        [Mali]
```

Fill in your information and click **"Create my account"**

### 1.3 Verify Your Email
1. Brevo will send you a verification email
2. Check your inbox (or spam folder)
3. Click the **verification link** in the email
4. ✅ Your Brevo account is now active!

### 1.4 Verify Your Sender Email (Important!)
Brevo needs to know which email to send FROM:

1. After verifying, you'll see your Brevo dashboard
2. Look for a banner asking to verify your sender email
3. Click **"Verify"** or go to **Senders** section
4. Confirm the email (you'll get a verification email)
5. Click the link in that email
6. ✅ Sender email verified!

**Status Check:** You should now have:
- ✅ Brevo account created
- ✅ Email verified
- ✅ Sender email verified

---

## STEP 2: Get Your Brevo API Key (5 minutes)

The API key is what Zapier will use to send emails through Brevo.

### 2.1 Go to Integrations
1. Log into your Brevo account
2. Click your **profile icon** (top right corner)
3. Click **Integrations**

### 2.2 Create API Key
1. Look for **"API"** or **"SMTP & API"** section
2. Click **"Create a new API key"** button
3. Name it: `Netlify Forms`
4. Select permissions: **Full Access** (or check "Email sending")
5. Click **"Generate"** or **"Create"**

### 2.3 Copy and Save Your API Key
1. You'll see your new API key displayed (long string of characters)
2. Click **Copy** button
3. **Save it somewhere safe** (text file, password manager, etc.)
4. ⚠️ Don't share this key publicly!

**Example API key format:**
```
xsmtpsib-1234567890abcdefghijklmnopqr
```

**Status Check:** You should have:
- ✅ Brevo API key generated
- ✅ API key saved safely

---

## STEP 3: Set Up Netlify Webhook (5 minutes)

The webhook tells Zapier when a form is submitted.

### 3.1 Go to Netlify Dashboard
1. Open https://app.netlify.com
2. Select your **GKS Logistics** site

### 3.2 Access Forms Settings
1. Click **Site settings** in the left menu
2. Scroll down to **Forms** section
3. Click **Forms**

### 3.3 Create Outgoing Webhook
1. Look for **"Form notifications"** section
2. Click **"Add notification"**
3. Select **"Outgoing webhook"**

### 3.4 Get Your Webhook URL
1. You'll see a webhook URL like:
   ```
   https://hooks.zapier.com/hooks/catch/XXXXXXXXX/YYYYYYYYY/
   ```
2. Click **Copy** to copy the URL
3. **Save it** (you'll use it in Zapier next)

**Don't deploy yet!** We'll create the Zapier integration first.

**Status Check:** You should have:
- ✅ Webhook URL copied and saved

---

## STEP 4: Sign Up for Zapier (5 minutes)

Zapier is the "glue" that connects Netlify to Brevo.

### 4.1 Go to Zapier
1. Open https://zapier.com
2. Click **Sign up** (top right)

### 4.2 Create Zapier Account
Choose your sign-up method:
- Email + password (easiest)
- Google account
- Microsoft account

Fill in the form and verify your email.

### 4.3 Access Zapier Dashboard
1. After sign-up, you'll see the Zapier dashboard
2. Click **"Create Zap"** button
3. You're now ready to connect Netlify to Brevo!

**Status Check:** You should have:
- ✅ Zapier account created and verified

---

## STEP 5: Create the Zapier Zap (25 minutes)

This is where we connect everything together.

### 5.1 Set Up the Trigger (Netlify Forms)

**On Zapier dashboard:**
1. Click **"Create Zap"** button
2. You'll see "TRIGGER" section

**Find the Trigger App:**
1. Search for **"Webhook by Zapier"**
2. Click on it
3. Select **"Catch Raw Body"** option

**Configure the Trigger:**
1. Webhook URL: Paste your Netlify webhook URL (from Step 3.4)
2. Click **"Continue"**

**Test the Trigger:**
1. Zapier will tell you to submit a test form
2. Go to your website: https://gkslogistics.com
3. Submit one of your forms (fill in all fields with test data)
4. Go back to Zapier
5. Click **"Test trigger"**
6. Zapier should show: ✅ "We found a request"
7. Click **"Continue"**

**Note:** If test fails:
- Make sure you submitted the form AFTER creating the webhook
- Try submitting again
- Check that the webhook URL is correct

### 5.2 Set Up the Action (Brevo Email)

**On Zapier:**
1. You'll now see "ACTION" section
2. Search for **"Brevo"** (or "Sendinblue" - old name)
3. Click on **Brevo**
4. Select **"Send Email"** action

**Connect Your Brevo Account:**
1. Click **"Sign in to Brevo"**
2. Enter your Brevo email and password
3. Click **"Allow"** to give Zapier permission
4. You'll be back in Zapier
5. Your Brevo account is now connected!

### 5.3 Configure the Email Settings

You'll see several fields to fill in:

**To Email (Required):**
- Click in the field
- Select **"Email"** from the dropdown (from your form)
- Or enter your email manually: `your-email@gmail.com`

**From Email (Required):**
- Enter: `noreply@gkslogistics.com`
- Or the verified email from Brevo setup

**Subject (Required):**
- Enter: `New {{form_name}} Submission`
- This will automatically insert the form name

**HTML Content (Required):**
This is where we'll put the beautiful email template!

1. Click in the HTML Content field
2. We'll add HTML here in the next section

### 5.4 Add Beautiful Email Template

In the HTML Content field, paste this template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 20px 0;">

  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">

    <!-- HEADER -->
    <div style="background: linear-gradient(135deg, #003087 0%, #0052cc 100%); color: white; padding: 40px 20px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; letter-spacing: 1px; margin-bottom: 15px;">GKS LOGISTICS</div>
      <h1 style="font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">New Form Submission</h1>
      <p style="font-size: 14px; opacity: 0.95; margin-top: 8px; margin-bottom: 0; font-weight: 500;">{{form_name}}</p>
    </div>

    <!-- BODY -->
    <div style="padding: 40px 30px;">

      <!-- Form Details -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #003087; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #003087; letter-spacing: 0.5px;">Submission Details</h2>

        <!-- Form data will be inserted here automatically -->
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #003087; margin-bottom: 6px;">Full Name</div>
          <div style="font-size: 15px; color: #333;">{{fullName}}</div>
        </div>

        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #003087; margin-bottom: 6px;">Email</div>
          <div style="font-size: 15px; color: #333;">{{email}}</div>
        </div>

        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #003087; margin-bottom: 6px;">Message</div>
          <div style="font-size: 15px; color: #333;">{{message}}</div>
        </div>

      </div>

      <!-- Metadata -->
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0; border-left: 4px solid #003087;">
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px;">
          <span style="font-weight: 700; color: #003087;">Form Name:</span>
          <span style="color: #666;">{{form_name}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px;">
          <span style="font-weight: 700; color: #003087;">Submitted:</span>
          <span style="color: #666;">{{_date}}</span>
        </div>
      </div>

      <!-- CTA -->
      <div style="background-color: #003087; color: white; padding: 20px; border-radius: 6px; text-align: center; margin: 30px 0;">
        <p style="margin: 0; font-size: 14px; font-weight: 600;">✉️ New form submission received</p>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 12px; color: #666; margin: 8px 0;">© 2024 GKS Logistics. All rights reserved.</p>
      <p style="font-size: 12px; color: #666; margin: 8px 0;">
        <a href="https://gkslogistics.com" style="color: #0052cc; text-decoration: none;">Visit our website</a>
      </p>
    </div>

  </div>

</body>
</html>
```

### 5.5 Map Form Fields

After pasting the template, you need to map your form fields:

1. In the template above, I used:
   - `{{fullName}}` - maps to form's "fullName" field
   - `{{email}}` - maps to form's "email" field
   - `{{message}}` - maps to form's "message" field

2. Find these placeholders in the Zapier interface
3. Replace them with actual form field names from your form:
   - Click on the placeholder
   - Select the matching field from the dropdown

**Your form fields might be different!** Replace with your actual field names:
- If your form uses `name`, replace `fullName` with `name`
- If your form uses `inquiry`, replace `message` with `inquiry`
- etc.

### 5.6 Test the Zap

1. Click **"Test action"** button
2. Zapier will send a test email
3. Check your email inbox (and spam folder)
4. You should see a beautifully formatted email! 🎉

If test fails:
- Check that Brevo email is verified
- Check that form field names are correct
- Make sure there are no HTML syntax errors

### 5.7 Activate the Zap

1. When test is successful, click **"Publish Zap"** or **"Turn on Zap"**
2. Your Zap is now **ACTIVE**!
3. It will automatically send beautiful emails from now on

**Status Check:** You should have:
- ✅ Trigger connected (Netlify)
- ✅ Action connected (Brevo)
- ✅ Email template configured
- ✅ Test passed
- ✅ Zap activated

---

## STEP 6: Test Everything End-to-End (5 minutes)

Now let's make sure everything works!

### 6.1 Submit a Test Form
1. Go to your website: https://gkslogistics.com
2. Find a form (Quote Request, Contact, etc.)
3. Fill in with test data:
   ```
   Full Name: John Test
   Email: your-email@gmail.com
   Message: Testing beautiful emails!
   ```
4. Submit the form

### 6.2 Wait and Check Email
1. Wait 30-60 seconds
2. Check your inbox
3. Look for an email from `noreply@gkslogistics.com` (or whatever you set)
4. The email should have:
   - ✅ Beautiful blue gradient header
   - ✅ "GKS LOGISTICS" branding
   - ✅ "New Form Submission"
   - ✅ Your form data displayed nicely
   - ✅ Professional styling

### 6.3 Celebrate! 🎉
If you see the beautiful email, you're done!

**Troubleshooting:**
- ❌ No email received?
  - Check spam folder
  - Wait 5 more minutes (Zapier can be slow)
  - Check Zapier task history for errors

- ❌ Email arrived but looks plain?
  - Check that HTML was pasted correctly
  - Verify sender email is verified in Brevo
  - Test again

- ❌ Form fields show `{{field_name}}`?
  - The field mapping wasn't done correctly
  - Go back to Zapier and map fields again

---

## STEP 7: Configure for All Your Forms (10 minutes)

Your Zap currently works for any form! But you might want to customize:

### 7.1 Update for Each Form

You can create different Zaps for different forms:

1. Go back to your Zap
2. Edit the trigger to specify which form
3. Change the email template/subject based on form type

Or use one Zap for all (current setup works for all).

### 7.2 Test Different Forms
1. Try submitting different forms:
   - Quote Request
   - Contact Form
   - Groupage Booking
   - Career Application
2. Each should trigger an email
3. Verify they all work

---

## 📊 How to Monitor Your Emails

### Check Brevo Dashboard
1. Log into Brevo
2. Go to **Campaigns** or **Transactional**
3. See all emails sent
4. Check delivery rates
5. Monitor bounce/complaint rates

### Check Zapier Dashboard
1. Log into Zapier
2. Click on your Zap
3. See all task history
4. View errors if any occurred
5. Monitor task usage (free tier: 100 tasks/month)

---

## 🎯 You're All Set!

**Congratulations!** You now have:
- ✅ Beautiful form notification emails
- ✅ Professional branding
- ✅ Completely free (no credit card)
- ✅ Automatic delivery
- ✅ Easy to monitor

### What You've Set Up:
1. Brevo - Sends the emails
2. Zapier - Connects forms to Brevo
3. Netlify - Captures form submissions
4. Beautiful HTML template - Professional appearance

### What Happens Now:
- Every form submission automatically triggers an email
- Email is beautifully formatted with your branding
- You receive it in your inbox within 30-60 seconds
- No additional work needed!

---

## 💡 Tips & Tricks

### Add More Custom Fields
Edit your Zap's HTML template:
1. Add new field sections for each form field
2. Use `{{fieldName}}` to reference fields
3. Save and test

### Change Email Colors
Edit the template's color codes:
- `#003087` = Primary blue (change to your color)
- `#0052cc` = Accent blue
- `#f8f9fa` = Light background

### Set Up Multiple Zaps
Create separate Zaps for:
- Different form types
- Different recipient emails
- Different email templates

### Monitor Free Tier Limits
- Brevo: 300 emails/day (way more than enough)
- Zapier: 100 tasks/month free tier
- If you submit 100+ forms/month, upgrade Zapier (~$25/month)

---

## 🆘 Troubleshooting Reference

| Problem | Solution |
|---------|----------|
| No email received | Wait 60 sec, check spam, verify trigger works |
| Email is plain text | Verify sender email, check HTML syntax |
| Fields show {{name}} | Map fields in Zapier action |
| Zap keeps failing | Check Brevo API key, check field names |
| Can't verify email | Use a real email address, check spam |
| Webhook URL invalid | Copy URL again, make sure it's complete |

---

## 📞 Support Resources

- **Brevo Help:** https://www.brevo.com/support/
- **Zapier Help:** https://zapier.com/help/
- **Netlify Forms Docs:** https://docs.netlify.com/forms/overview/

---

## ✅ Final Checklist

Before considering this complete:

- [ ] Brevo account created and verified
- [ ] Brevo API key generated and saved
- [ ] Netlify webhook created
- [ ] Zapier account created
- [ ] Zapier Zap created and tested
- [ ] Email template configured
- [ ] Form fields mapped
- [ ] Test form submitted
- [ ] Beautiful email received in inbox
- [ ] Zap activated
- [ ] Multiple forms tested
- [ ] Brevo dashboard checked
- [ ] Zapier history reviewed

---

**You've successfully implemented Brevo + Zapier for beautiful form emails!** 🎉

Next time someone submits a form, you'll get a gorgeous branded email. No more plain text notifications!
