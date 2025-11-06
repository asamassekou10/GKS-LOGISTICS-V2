# Brevo Implementation - Quick Checklist

Use this checklist to track your progress. Check off each item as you complete it.

---

## 📋 STEP 1: Brevo Account Setup

**Time: ~10 minutes**

- [ ] Go to https://www.brevo.com
- [ ] Click "Sign up free"
- [ ] Fill in registration form:
  - [ ] First name
  - [ ] Last name
  - [ ] Email address
  - [ ] Password
  - [ ] Company: GKS Logistics
  - [ ] Country: Mali
- [ ] Click "Create my account"
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Verify sender email (click link in verification email)
- [ ] ✅ Brevo account ready!

---

## 🔑 STEP 2: Get Brevo API Key

**Time: ~5 minutes**

- [ ] Log into Brevo dashboard (https://login.brevo.com)
- [ ] Click profile icon (top right)
- [ ] Click "Integrations"
- [ ] Find "SMTP & API" or "API" section
- [ ] Click "Create a new API key"
- [ ] Name it: `Netlify Forms`
- [ ] Select: Full Access
- [ ] Click "Generate" or "Create"
- [ ] Copy the API key
- [ ] **SAVE IT SAFELY** (text file, password manager, etc.)
- [ ] ✅ API key obtained!

**Your API Key:**
```
(Paste here for reference)
_____________________________________
```

---

## 🪝 STEP 3: Netlify Webhook

**Time: ~5 minutes**

- [ ] Go to https://app.netlify.com
- [ ] Select "GKS Logistics" site
- [ ] Click "Site settings"
- [ ] Scroll to "Forms"
- [ ] Click "Forms"
- [ ] Find "Form notifications"
- [ ] Click "Add notification"
- [ ] Select "Outgoing webhook"
- [ ] Copy the webhook URL
- [ ] **SAVE IT SAFELY**
- [ ] ✅ Webhook URL obtained!

**Your Webhook URL:**
```
(Paste here for reference)
_____________________________________
```

---

## 👤 STEP 4: Zapier Account

**Time: ~5 minutes**

- [ ] Go to https://zapier.com
- [ ] Click "Sign up"
- [ ] Choose sign-up method:
  - [ ] Email + password
  - [ ] Google account
  - [ ] Microsoft account
- [ ] Complete registration
- [ ] Verify email
- [ ] Log into Zapier dashboard
- [ ] ✅ Zapier account ready!

---

## ⚙️ STEP 5: Create Zapier Zap - Trigger

**Time: ~10 minutes**

### Trigger Setup

- [ ] Click "Create Zap" button
- [ ] Search for "Webhook by Zapier"
- [ ] Click on it
- [ ] Select "Catch Raw Body"
- [ ] Paste your Netlify webhook URL
- [ ] Click "Continue"

### Test Trigger

- [ ] Go to your website (https://gkslogistics.com)
- [ ] Submit a test form with sample data
- [ ] Go back to Zapier
- [ ] Click "Test trigger"
- [ ] Wait for: ✅ "We found a request"
- [ ] Click "Continue"
- [ ] ✅ Trigger configured!

---

## 📧 STEP 6: Create Zapier Zap - Action

**Time: ~15 minutes**

### Set Up Brevo Action

- [ ] Search for "Brevo" (or "Sendinblue")
- [ ] Click on Brevo
- [ ] Select "Send Email"
- [ ] Click "Sign in to Brevo"
- [ ] Enter Brevo email and password
- [ ] Click "Allow"
- [ ] ✅ Brevo connected to Zapier

### Configure Email Settings

**To Email:**
- [ ] Click in "To Email" field
- [ ] Select "Email" from dropdown (your form's email field)

**From Email:**
- [ ] Enter: `noreply@gkslogistics.com`

**Subject:**
- [ ] Enter: `New {{form_name}} Submission`

**HTML Content:**
- [ ] Copy the beautiful email template
- [ ] Paste into "HTML Content" field

### Map Form Fields

Replace these with YOUR form field names:
- [ ] Replace `{{fullName}}` with actual field name
- [ ] Replace `{{email}}` with actual field name
- [ ] Replace `{{message}}` with actual field name

**Your form field names:**
```
Field 1: _________________
Field 2: _________________
Field 3: _________________
```

### Test Action

- [ ] Click "Test action"
- [ ] Wait for: ✅ "Email sent successfully"
- [ ] Check your inbox for beautiful email
- [ ] Verify email looks good
- [ ] ✅ Action configured!

---

## 🚀 STEP 7: Activate Zap

**Time: ~2 minutes**

- [ ] Click "Publish Zap" or "Turn on Zap"
- [ ] Confirm activation
- [ ] ✅ Zap is now LIVE!

---

## 🧪 STEP 8: End-to-End Test

**Time: ~5 minutes**

- [ ] Go to https://gkslogistics.com
- [ ] Submit a real test form with:
  - [ ] Name: John Test
  - [ ] Email: your-email@gmail.com
  - [ ] Message: Testing beautiful emails!
- [ ] Wait 30-60 seconds
- [ ] Check email inbox
- [ ] Verify you received beautiful email
- [ ] Check that email has:
  - [ ] Blue gradient header
  - [ ] "GKS LOGISTICS" branding
  - [ ] Form data displayed
  - [ ] Professional styling

---

## ✅ ADDITIONAL FORMS (Optional)

Test with your other forms:

- [ ] Quote Request form - ✅ Email received
- [ ] Contact form - ✅ Email received
- [ ] Groupage Booking form - ✅ Email received
- [ ] Career Application form - ✅ Email received
- [ ] Newsletter form - ✅ Email received

---

## 📊 Monitoring Setup

**Brevo Dashboard:**
- [ ] Log into Brevo
- [ ] Go to Campaigns or Transactional
- [ ] Verify emails are showing
- [ ] Check delivery rates

**Zapier Dashboard:**
- [ ] Log into Zapier
- [ ] Click on your Zap
- [ ] Check task history
- [ ] Verify no errors

---

## 📞 Important Credentials (Save Safely!)

Keep these in a safe place (password manager, secure document):

```
BREVO ACCOUNT
Email: _________________________________
Password: _______________________________
API Key: ________________________________

NETLIFY WEBHOOK URL
_________________________________________

ZAPIER ACCOUNT
Email: __________________________________
Password: ______________________________
Zap Name: ______________________________
Zap ID: _________________________________
```

---

## 🎯 Final Status

- [ ] Brevo account created ✅
- [ ] API key obtained ✅
- [ ] Netlify webhook created ✅
- [ ] Zapier account created ✅
- [ ] Zapier Zap created ✅
- [ ] Email template configured ✅
- [ ] Form fields mapped ✅
- [ ] Test email received ✅
- [ ] Zap activated ✅
- [ ] Multiple forms tested ✅
- [ ] Monitoring dashboards checked ✅

**🎉 YOU'RE DONE!** All beautiful emails are now automatic!

---

## ⚡ Quick Reference - Common Issues

| Issue | Quick Fix |
|-------|-----------|
| No email after 60 sec | Check spam folder, wait 5 more min |
| Email is plain/broken | Verify sender in Brevo, check HTML |
| Fields show {{name}} | Re-map fields in Zapier |
| Zap shows red X | Check API key, check field names |
| Can't sign into Brevo | Try password reset, check email |
| Zapier not connecting | Log out and log back in to Zapier |

---

## 🆘 Need Help?

- **For Brevo issues:** https://www.brevo.com/support/
- **For Zapier issues:** https://zapier.com/help/
- **For Netlify issues:** https://docs.netlify.com/forms/overview/

---

## 📝 Notes Section

Use this space to write down anything specific to your setup:

```
_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________
```

---

**Total time investment: ~45 minutes**
**Total cost: $0 (completely free)**
**Result: Beautiful automated form emails forever!** 🎉
