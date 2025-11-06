# Netlify Forms Custom Email Template - Implementation Examples

This document shows example HTML code for each form on your website with the custom email template configuration.

## Standard Form Template

All forms should follow this structure:

```html
<form name="form-name-here"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      action="/thank-you">

  <!-- Spam protection (hidden from users) -->
  <input type="hidden" name="bot-field">

  <!-- Your form fields -->
  <input type="text" name="fieldName" placeholder="Label" required>
  <input type="email" name="email" placeholder="Email" required>
  <textarea name="message" placeholder="Message" required></textarea>

  <!-- Submit button -->
  <button type="submit">Send</button>
</form>
```

## Example 1: Quote Request Form

Located on: All pages (in modal)

```html
<form name="quote-request"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST">

  <input type="hidden" name="bot-field">

  <!-- Contact Section -->
  <fieldset>
    <legend>Contact Information</legend>
    <input type="text" name="fullName" placeholder="Full Name" required>
    <input type="text" name="companyName" placeholder="Company Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="tel" name="phone" placeholder="Phone" required>
  </fieldset>

  <!-- Shipment Details -->
  <fieldset>
    <legend>Shipment Details</legend>
    <select name="freightType" required>
      <option value="">Select freight type</option>
      <option value="air">Air Freight</option>
      <option value="sea">Sea Freight</option>
      <option value="land">Land Freight</option>
    </select>
    <input type="text" name="origin" placeholder="Origin" required>
    <input type="text" name="destination" placeholder="Destination" required>
    <input type="text" name="weight" placeholder="Weight (kg)" required>
  </fieldset>

  <button type="submit">Get Quote</button>
</form>
```

**Email Notification:**
The custom template will display:
- Full Name, Company Name, Email, Phone
- Freight Type, Origin, Destination, Weight
- Form metadata (date, time, IP)
- Links to review in Netlify dashboard

---

## Example 2: Groupage Booking Form

Located on: `/groupage.html`

```html
<form name="groupage-booking"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      action="/groupage-thank-you">

  <input type="hidden" name="bot-field">

  <!-- Personal Info -->
  <fieldset>
    <legend>Personal Information</legend>
    <input type="text" name="firstName" placeholder="First Name" required>
    <input type="text" name="lastName" placeholder="Last Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="tel" name="phone" placeholder="Phone" required>
  </fieldset>

  <!-- Route Details -->
  <fieldset>
    <legend>Booking Details</legend>
    <select name="route" required>
      <option value="">Select route</option>
      <option value="dubai-bamako">Dubai → Bamako</option>
      <option value="paris-bamako">Paris → Bamako</option>
    </select>
    <input type="number" name="weight" placeholder="Weight (kg)">
    <input type="number" name="volume" placeholder="Volume (m³)" step="0.1">
    <textarea name="description" placeholder="Cargo Description"></textarea>
  </fieldset>

  <button type="submit">Book Now</button>
</form>
```

**Email will show:** Personal details, selected route, cargo details, booking date

---

## Example 3: Career Application Form

Located on: `/careers.html`

```html
<form name="career-application"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      action="/careers-thank-you">

  <input type="hidden" name="bot-field">

  <!-- Applicant Info -->
  <fieldset>
    <legend>Application Information</legend>
    <input type="text" name="fullName" placeholder="Full Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="tel" name="phone" placeholder="Phone" required>
    <input type="text" name="location" placeholder="Current Location" required>
  </fieldset>

  <!-- Position Details -->
  <fieldset>
    <legend>Position</legend>
    <select name="position" required>
      <option value="">Select position</option>
      <option value="logistics-manager">Logistics Manager</option>
      <option value="operations-specialist">Operations Specialist</option>
      <option value="customs-officer">Customs Officer</option>
    </select>
    <input type="text" name="experience" placeholder="Years of Experience" required>
    <textarea name="coverLetter" placeholder="Cover Letter" rows="5" required></textarea>
  </fieldset>

  <label>
    <input type="checkbox" name="agreeTerms" required>
    I agree to the terms and conditions
  </label>

  <button type="submit">Submit Application</button>
</form>
```

**Email will show:** Applicant details, position applied for, experience, cover letter preview

---

## Example 4: Newsletter Signup Form

Located on: Footer (all pages)

```html
<form name="newsletter-signup"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      action="/newsletter-thank-you">

  <input type="hidden" name="bot-field">

  <input type="email" name="email" placeholder="Enter your email" required>

  <fieldset>
    <legend>Newsletter Preferences</legend>
    <label>
      <input type="checkbox" name="interests" value="logistics"> Logistics Updates
    </label>
    <label>
      <input type="checkbox" name="interests" value="news"> News & Updates
    </label>
    <label>
      <input type="checkbox" name="interests" value="offers"> Special Offers
    </label>
  </fieldset>

  <button type="submit">Subscribe</button>
</form>
```

**Email will show:** Email address, selected interests, subscription timestamp

---

## Example 5: Contact Form

Located on: `/contact.html`

```html
<form name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      action="/contact-thank-you">

  <input type="hidden" name="bot-field">

  <!-- Sender Info -->
  <fieldset>
    <legend>Your Information</legend>
    <input type="text" name="name" placeholder="Full Name" required>
    <input type="email" name="email" placeholder="Email Address" required>
    <input type="tel" name="phone" placeholder="Phone Number">
  </fieldset>

  <!-- Message -->
  <fieldset>
    <legend>Message</legend>
    <select name="subject" required>
      <option value="">Select subject</option>
      <option value="general-inquiry">General Inquiry</option>
      <option value="support">Support Request</option>
      <option value="partnership">Partnership Opportunity</option>
      <option value="complaint">Complaint</option>
    </select>
    <textarea name="message" placeholder="Your message here..." rows="6" required></textarea>
  </fieldset>

  <button type="submit">Send Message</button>
</form>
```

**Email will show:** Sender contact info, subject, message content, submission time

---

## Email Template Variables Reference

When you configure the template in Netlify, these variables are automatically populated:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{form_name}}` | Name of the form | "quote-request" |
| `{{form_data_table}}` | All form field data | List of all submitted fields |
| `{{submission_date}}` | Date and time | "Monday, November 5, 2024 2:30:45 PM UTC" |
| `{{ip_address}}` | Submitter's IP address | "192.168.1.1" |

---

## Form Field Best Practices

### 1. Always Include These Attributes

```html
<!-- Required for Netlify recognition -->
<form name="unique-form-name" data-netlify="true" method="POST">

<!-- Required for spam protection -->
<input type="hidden" name="bot-field">

<!-- Optional but recommended for success page -->
<form action="/thank-you">
```

### 2. Use Meaningful Field Names

```html
<!-- GOOD: Clear, descriptive names -->
<input name="firstName">
<input name="phoneNumber">
<input name="companyName">

<!-- AVOID: Vague names -->
<input name="field1">
<input name="input2">
<input name="data">
```

### 3. Add Data Attributes for Translation

```html
<!-- For forms using language switcher -->
<label data-translate="form-label-name">Full Name</label>
<input type="text" name="fullName"
       data-translate="form-placeholder-name"
       placeholder="">
```

### 4. Include Proper Labels

```html
<!-- GOOD: Clear labels help with email formatting -->
<fieldset>
  <legend>Contact Information</legend>
  <label for="fullName">Full Name *</label>
  <input type="text" id="fullName" name="fullName" required>
</fieldset>

<!-- AVOID: No labels -->
<input type="text" name="fullName">
```

### 5. Use Appropriate Input Types

```html
<!-- These types improve email display -->
<input type="email" name="email">
<input type="tel" name="phone">
<input type="date" name="date">
<input type="number" name="weight">
<select name="category"></select>
<textarea name="message"></textarea>
```

---

## Testing Your Forms

### 1. Test Before Going Live

```html
<!-- Add a test form to check email notifications -->
<form name="test-form" data-netlify="true">
  <input type="text" name="testField" placeholder="Test">
  <button type="submit">Test Email</button>
</form>
```

### 2. Check Email Clients

After submitting a test form, verify it looks good in:
- Gmail (web & mobile app)
- Outlook (web & desktop)
- Apple Mail
- Thunderbird
- Yahoo Mail

### 3. Verify in Netlify

After submission:
1. Go to Netlify Dashboard
2. Site Settings → Forms
3. Click your form name
4. Check "Notifications" tab to see the received email

---

## Customizing for Your Forms

### Example: Add Form Type Detection

```html
<form name="quote-request" data-netlify="true">
  <!-- Hidden field to categorize in email -->
  <input type="hidden" name="formType" value="quote">

  <!-- Rest of form -->
</form>
```

The email will then show:
```
Form Type: quote
```

### Example: Add Priority Level

```html
<form name="urgent-request" data-netlify="true">
  <select name="priority" required>
    <option value="normal">Normal</option>
    <option value="high">High Priority</option>
    <option value="urgent">Urgent</option>
  </select>
</form>
```

The email template can then be styled differently based on priority.

---

## Common Issues & Solutions

### Issue: Fields Not Showing in Email

**Solution:** Ensure the form has:
- `data-netlify="true"` attribute
- `method="POST"` attribute
- Field `name` attributes (not `id`)

### Issue: Email Not Received

**Solution:**
1. Check Netlify form settings - is it configured?
2. Check email address - is it correct?
3. Check spam folder
4. Try resubmitting the form

### Issue: Special Characters Breaking Email

**Solution:**
- Avoid symbols in field names: `!@#$%^&*()`
- Use hyphens or underscores: `field-name` or `field_name`
- Sanitize user input

### Issue: Long Text Cuts Off

**Solution:**
- Use `white-space: pre-wrap;` for text display
- The template already includes this
- Very long fields may need scrolling in email clients

---

## Next Steps

1. ✅ Choose which forms to implement
2. ✅ Copy the form HTML structure
3. ✅ Add the custom email template to Netlify
4. ✅ Test with a form submission
5. ✅ Deploy to production

For full documentation, see `NETLIFY_FORMS_SETUP.md`
