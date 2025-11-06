# Brevo + Zapier Troubleshooting Guide

Having issues? This guide will help you fix common problems.

---

## 🆘 Quick Diagnosis

**When did the problem happen?**

- ❌ **During Brevo signup** → Go to: [Brevo Signup Issues](#brevo-signup-issues)
- ❌ **During API key creation** → Go to: [API Key Issues](#api-key-issues)
- ❌ **During Zapier setup** → Go to: [Zapier Setup Issues](#zapier-setup-issues)
- ❌ **Email not arriving** → Go to: [Email Not Received](#email-not-received)
- ❌ **Email looks broken** → Go to: [Email Formatting Issues](#email-formatting-issues)

---

## Brevo Signup Issues

### Problem: "Account already exists with this email"

**Solution:**
1. Go to https://www.brevo.com
2. Click "Sign in" (instead of sign up)
3. Click "Forgot password?"
4. Enter your email
5. Reset your password
6. Log in with new password

---

### Problem: "Verification email not arriving"

**Solution:**
1. Wait 5-10 minutes (email can be slow)
2. Check spam folder
3. Check all tabs in Gmail (Promotions, Social, etc.)
4. Try requesting new verification email:
   - Log into Brevo
   - Go to **Account Settings**
   - Click **Send verification email again**

---

### Problem: "I can't verify my sender email"

**Solution:**
1. Make sure you're using a REAL email address (not fake)
2. Check spam folder for verification email
3. Check that email address is allowed by your email provider
4. Try with a different email:
   - Go to **Senders** in Brevo
   - Click **Add new sender**
   - Use different email address
5. Wait for verification link and click it

---

## API Key Issues

### Problem: "I can't find the API section"

**Solution:**
1. Log into Brevo: https://login.brevo.com
2. Look for menu options in order:
   - Click **Profile icon** (top right) → Look for **"Integrations"** or **"Settings"**
   - OR look at **left sidebar** → Find **"Integrations"** → **"API"**
   - OR search for **"API"** in search box at top
3. If still can't find:
   - Try clearing browser cache
   - Try different browser (Chrome, Firefox, etc.)

---

### Problem: "My API key disappeared/won't generate"

**Solution:**
1. Log out of Brevo completely
2. Close browser completely
3. Open new browser window
4. Log back in to Brevo
5. Go to API section
6. Click "Create new API key" again
7. Copy immediately and save

---

### Problem: "Zapier says 'Invalid API key'"

**Solution:**
1. Copy your API key again from Brevo (carefully, no extra spaces)
2. Go to Zapier
3. Click on your Zap
4. Click "Edit"
5. In Brevo action, click "Change account"
6. Log out and log back in
7. Paste API key again
8. Test again

---

## Netlify Webhook Issues

### Problem: "Webhook URL not working"

**Solution:**
1. Make sure you copied the FULL URL (it's long)
2. No spaces before or after
3. If it starts with `https://` → Good
4. Paste it exactly into Zapier (don't retype)
5. If still fails:
   - Create new webhook in Netlify
   - Copy the new URL
   - Update Zapier

---

### Problem: "Zapier says 'We couldn't find a request'"

**Solution:**
1. Your webhook was created BEFORE you submitted the form
2. You need to submit a form AFTER creating the webhook
3. Go to your website: https://gkslogistics.com
4. Submit a form with test data
5. Go back to Zapier
6. Click "Test trigger" again
7. Should now find the request

---

## Zapier Setup Issues

### Problem: "Can't sign up for Zapier"

**Solution:**
1. Try different sign-up method (Google instead of email)
2. Check spam folder for verification email
3. Make sure password is strong enough (8+ characters)
4. Try different browser
5. Clear browser cache and try again

---

### Problem: "Can't connect Brevo to Zapier"

**Solution:**
1. Make sure you're logged OUT of Brevo first
2. In Zapier, click "Sign in to Brevo"
3. Enter your Brevo email and password (not API key!)
4. Click "Allow" or "Connect"
5. If it fails:
   - Reset Brevo password first
   - Then try connecting again

---

### Problem: "Trigger test keeps failing"

**Solution:**
1. Make sure webhook is working:
   - Copy webhook URL
   - Paste into browser address bar
   - You should see error message (that's normal)
2. Submit another form:
   - Go to website
   - Fill in and submit form completely
   - Wait 5 seconds
3. Try test trigger again
4. If still fails:
   - Create new webhook
   - Copy new URL
   - Update Zapier

---

## Email Not Received

### Problem: "Submitted form but no email arrived"

**Diagnosis steps:**

**Step 1: Check Zapier**
1. Log into Zapier
2. Click on your Zap
3. Click "View Activity" or "Task History"
4. Did the Zap run? (Look for recent task)

- ✅ **If yes, continue to Step 2**
- ❌ **If no, see [Form Not Triggering Zap](#form-not-triggering-zap)**

**Step 2: Check for Zap Errors**
1. Look at the task in Zapier
2. Is there a red X or error message?

- ✅ **No error, continue to Step 3**
- ❌ **There's an error, see [Zap Execution Errors](#zap-execution-errors)**

**Step 3: Check Email Spam**
1. Check inbox of the email you configured
2. Search for "GKS Logistics" or "New Form"
3. Check SPAM folder
4. Check ALL tabs (Promotions, Social, Updates, etc.)

- ✅ **Found email in spam, mark as not spam**
- ❌ **Email nowhere, see [Email Not Sending](#email-not-sending)**

---

### Form Not Triggering Zap

**Problem: Form was submitted but Zap didn't run**

**Solution:**
1. Check that webhook URL is correct:
   - Go to Netlify Forms settings
   - Copy webhook URL again
   - Compare with what's in Zapier
   - They should be identical
2. Resubmit the form:
   - Go to website
   - Submit form again
   - Wait 30 seconds
   - Check Zapier task history again
3. If still not working:
   - Create new webhook in Netlify
   - Get new URL
   - Update Zapier with new URL
   - Test trigger again with new form submission

---

### Zap Execution Errors

**Common error messages and fixes:**

**"Invalid Email Address"**
- Go to Zapier
- Edit the Zap
- Check "To Email" field - is it valid?
- Use format: name@example.com
- Click "Continue" and "Test action"

**"No response from Brevo"**
- Brevo might be temporarily down
- Wait 5 minutes
- Try again
- Check https://status.brevo.com for outages

**"API Key Invalid"**
- Your Brevo API key is wrong
- Go to Brevo, generate new API key
- Update Zapier with new key
- Test again

**"Missing Required Fields"**
- Check that all required fields are filled:
  - To Email ✅
  - From Email ✅
  - Subject ✅
  - HTML Content ✅
- Fill any missing fields
- Test again

---

### Email Not Sending

**Problem: No errors but still no email**

**Solution:**
1. **Check sender email is verified in Brevo:**
   - Log into Brevo
   - Go to **Senders**
   - Make sure your email has ✅ (verified)
   - If not, verify it first

2. **Check form field mapping:**
   - Go to Zapier
   - Edit your Zap
   - Look at the HTML content
   - Make sure all `{{fields}}` are mapped
   - Click on fields to verify they show data

3. **Test manually:**
   - In Zapier, click "Test action"
   - Should send a test email immediately
   - Check inbox

4. **Try different email:**
   - Maybe your inbox is blocking emails
   - Test sending to different email address
   - See if it arrives there

---

## Email Formatting Issues

### Problem: "Email is just plain text, no formatting"

**Solution:**
1. Verify sender email in Brevo:
   - Go to **Senders**
   - Make sure it's verified (✅)
2. Check that HTML is pasting correctly:
   - Go to Zapier
   - Edit Zap
   - In "HTML Content" field
   - Look for `<div style=` tags (should be there)
   - If you see raw CSS code, HTML didn't paste right
3. Delete and repaste HTML:
   - Clear "HTML Content" field
   - Copy fresh HTML template
   - Paste again
   - Test action
4. Try different email client:
   - Maybe Gmail is blocking styles
   - Forward email to different email
   - See if it shows styles there

---

### Problem: "Form fields show {{field_name}} instead of actual data"

**Solution:**
1. You didn't map the fields correctly
2. Go to Zapier
3. Edit your Zap
4. Go to "HTML Content" section
5. Look for `{{fieldName}}` text
6. These should show ACTUAL field values, not the placeholder
7. To fix:
   - Click on each `{{fieldName}}` in the email preview
   - A dropdown should appear
   - Select the actual form field
   - Save and test

---

### Problem: "Email has some fields but not others"

**Solution:**
1. Your form has fields not included in template
2. Add them manually:
   - Go to Zapier
   - Edit Zap
   - In HTML Content, add new section:
   ```html
   <div style="margin-bottom: 20px;">
     <div style="font-weight: 700; color: #003087;">Field Name:</div>
     <div>{{fieldName}}</div>
   </div>
   ```
   - Replace "Field Name" with your field name
   - Replace `{{fieldName}}` with actual field name from dropdown
   - Test

---

### Problem: "Email colors are wrong or not showing"

**Solution:**
1. Your email client might not support styles
2. Try viewing in different email app:
   - Gmail (web)
   - Gmail (mobile app)
   - Outlook
   - Apple Mail
3. If colors still don't show:
   - This is usually email client limitation
   - The template is correct
   - Try Gmail - it supports colors best

---

## Quick Fix Checklist

When things aren't working, try these in order:

1. [ ] Refresh browser page
2. [ ] Clear browser cache (Ctrl+Shift+Delete)
3. [ ] Try different browser (Chrome, Firefox, etc.)
4. [ ] Log out completely and log back in
5. [ ] Wait 5 minutes and try again
6. [ ] Submit form again and check task history
7. [ ] Check spam folder for email
8. [ ] Verify all required fields are filled
9. [ ] Test with simpler form first (contact form)
10. [ ] Check status pages:
    - Brevo: https://status.brevo.com
    - Zapier: https://status.zapier.com
    - Netlify: https://www.netlify.com/status/

---

## Still Having Issues?

If none of these solutions work:

### Get Help

**From Brevo:**
- Support: https://www.brevo.com/support/
- Live chat available
- Email support included

**From Zapier:**
- Help center: https://zapier.com/help/
- Community forum: https://community.zapier.com

**From Netlify:**
- Docs: https://docs.netlify.com/forms/overview/
- Support: https://www.netlify.com/support/

---

## Document Your Issue

When asking for help, provide:

1. **What you were doing:**
   ```
   Example: "I was trying to test the Zapier action"
   ```

2. **What went wrong:**
   ```
   Example: "Zapier shows error: 'Invalid Email Address'"
   ```

3. **What you've tried:**
   ```
   Example: "I've verified the sender email, updated API key, tested again"
   ```

4. **Screenshots:**
   - Error message screenshots
   - Zap configuration screenshot
   - Form submission screenshot

With this info, support can help faster.

---

## Common Causes Summary

| Issue | Usually Caused By |
|-------|------------------|
| No email | Zap not running or sender not verified |
| Plain text email | HTML not pasting correctly |
| Fields show {{name}} | Fields not mapped in Zapier |
| Zap keeps failing | Wrong API key or field name |
| Email in spam | Email provider blocking it (mark as not spam) |
| Slow emails | Normal - Zapier can take 30-60 seconds |
| Can't sign up | Wrong email format or browser issue |
| Webhook not working | URL not copied correctly |

---

**Remember:** Most issues are simple fixes! Usually just:
1. Clear cache + refresh
2. Check spam folder
3. Wait a few minutes
4. Try again

Good luck! 🍀
