/**
 * Serverless function to send emails via Brevo when Netlify forms are submitted
 * Triggered by Netlify form submissions webhook
 */

const axios = require('axios');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';
const RECIPIENT_EMAIL = 'gksforms@googlegroups.com';

// Email templates for different form types
const getEmailTemplate = (formName, data) => {
  const templates = {
    contact: getContactFormEmail(data),
    'quote-request': getQuoteRequestEmail(data),
    'career-application': getCareerApplicationEmail(data),
    'newsletter-signup': getNewsletterSignupEmail(data)
  };

  return templates[formName] || templates.contact;
};

// Professional email template for contact form
const getContactFormEmail = (data) => ({
  subject: `New Contact Form Submission from ${data.name || 'Guest'}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #1e3a8a; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
          .value { margin-top: 5px; padding: 10px; background: #f0f7ff; border-left: 4px solid #1e3a8a; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .badge { display: inline-block; background: #1e3a8a; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>From GKS Logistics Website</p>
          </div>
          <div class="content">
            <span class="badge">Contact Request</span>

            <div class="field">
              <div class="label">📝 Sender Name</div>
              <div class="value">${escapeHtml(data.name || 'N/A')}</div>
            </div>

            <div class="field">
              <div class="label">✉️ Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email || 'N/A')}</a></div>
            </div>

            <div class="field">
              <div class="label">🎯 Service Type</div>
              <div class="value">${formatServiceType(data.service || 'N/A')}</div>
            </div>

            <div class="field">
              <div class="label">💬 Message</div>
              <div class="value">${escapeHtml(data.message || 'N/A').replace(/\n/g, '<br>')}</div>
            </div>

            <div class="field">
              <div class="label">📅 Submitted Date</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>GKS Logistics - International Freight Solutions<br>
            <a href="https://www.gkslogistics.com">www.gkslogistics.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
New Contact Form Submission

Sender Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Service: ${data.service || 'N/A'}
Message: ${data.message || 'N/A'}
Date: ${new Date().toLocaleString()}

---
GKS Logistics - International Freight Solutions
www.gkslogistics.com
  `
});

// Professional email template for quote request
const getQuoteRequestEmail = (data) => ({
  subject: `Quote Request from ${data.fullName || 'Guest'} - ${data.freightType || 'Freight'}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-weight: 700; font-size: 16px; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 15px; }
          .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
          .field-row.full { grid-template-columns: 1fr; }
          .field { }
          .label { font-weight: 600; color: #1e3a8a; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .value { margin-top: 5px; padding: 10px; background: #f0f7ff; border-left: 4px solid #1e3a8a; }
          .badge { display: inline-block; background: #1e3a8a; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-bottom: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 New Quote Request</h1>
            <p>From GKS Logistics Website</p>
          </div>
          <div class="content">
            <span class="badge">Quote Request</span>

            <div class="section">
              <div class="section-title">👤 Contact Information</div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Full Name</div>
                  <div class="value">${escapeHtml(data.fullName || 'N/A')}</div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${escapeHtml(data.companyName || 'N/A')}</div>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email || 'N/A')}</a></div>
                </div>
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value">${escapeHtml(data.phoneNumber || 'N/A')}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📍 Shipment Details</div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Freight Type</div>
                  <div class="value">${escapeHtml(data.freightType || 'N/A')}</div>
                </div>
                <div class="field">
                  <div class="label">Cargo Nature</div>
                  <div class="value">${escapeHtml(data.cargoNature || 'N/A')}</div>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Origin</div>
                  <div class="value">${escapeHtml(data.origin || 'N/A')}</div>
                </div>
                <div class="field">
                  <div class="label">Destination</div>
                  <div class="value">${escapeHtml(data.destination || 'N/A')}</div>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Preferred Date</div>
                  <div class="value">${data.preferredDate || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">Dimensions & Weight</div>
                  <div class="value">${escapeHtml(data.dimensionsWeight || 'N/A')}</div>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <div class="label">Quantity / Packages</div>
                  <div class="value">${escapeHtml(data.quantityPackages || 'N/A')}</div>
                </div>
              </div>
            </div>

            ${data.additionalServices && data.additionalServices.length > 0 ? `
            <div class="section">
              <div class="section-title">🎁 Additional Services</div>
              <div class="value">${Array.isArray(data.additionalServices) ? data.additionalServices.join(', ') : escapeHtml(data.additionalServices)}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="label">📅 Submitted Date</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>GKS Logistics - International Freight Solutions<br>
            <a href="https://www.gkslogistics.com">www.gkslogistics.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
New Quote Request

CONTACT INFORMATION
Full Name: ${data.fullName || 'N/A'}
Company: ${data.companyName || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phoneNumber || 'N/A'}

SHIPMENT DETAILS
Freight Type: ${data.freightType || 'N/A'}
Cargo Nature: ${data.cargoNature || 'N/A'}
Origin: ${data.origin || 'N/A'}
Destination: ${data.destination || 'N/A'}
Preferred Date: ${data.preferredDate || 'Not specified'}
Dimensions & Weight: ${data.dimensionsWeight || 'N/A'}
Quantity / Packages: ${data.quantityPackages || 'N/A'}

${data.additionalServices ? `ADDITIONAL SERVICES\n${Array.isArray(data.additionalServices) ? data.additionalServices.join('\n') : data.additionalServices}\n` : ''}

Submitted: ${new Date().toLocaleString()}

---
GKS Logistics - International Freight Solutions
www.gkslogistics.com
  `
});

// Placeholder for career application email
const getCareerApplicationEmail = (data) => ({
  subject: `Career Application from ${data.fullName || 'Guest'}`,
  html: `<p>Career application received from ${escapeHtml(data.fullName || 'N/A')}</p>`
});

// Placeholder for newsletter signup email
const getNewsletterSignupEmail = (data) => ({
  subject: `Newsletter Signup: ${data.email || 'Unknown'}`,
  html: `<p>New newsletter signup from ${escapeHtml(data.email || 'N/A')}</p>`
});

// Helper function to format service type
const formatServiceType = (service) => {
  const types = {
    'individual': '👤 Individual',
    'small-business': '🏢 Small Business',
    'enterprise': '🏛️ Enterprise',
    'other': '❓ Other'
  };
  return types[service] || service;
};

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.toString().replace(/[&<>"']/g, (m) => map[m]);
};

// Main handler
exports.handler = async (event) => {
  console.log('Received event:', event);

  try {
    // Parse the form data
    const payload = JSON.parse(event.body);
    console.log('Parsed payload:', payload);

    const { data: formData, form } = payload;

    if (!formData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No form data provided' })
      };
    }

    // Get the appropriate email template
    const emailTemplate = getEmailTemplate(form.name, formData);

    // Send email to company via Brevo
    await sendEmailViaBrevo({
      to: [{ email: RECIPIENT_EMAIL, name: 'GKS Logistics Forms' }],
      subject: emailTemplate.subject,
      htmlContent: emailTemplate.html,
      textContent: emailTemplate.text,
      sender: {
        name: 'GKS Logistics',
        email: 'noreply@gkslogistics.com'
      }
    });

    console.log('Email sent successfully to', RECIPIENT_EMAIL);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};

// Send email via Brevo API
const sendEmailViaBrevo = async (emailParams) => {
  if (!BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY environment variable is not set');
  }

  try {
    const response = await axios.post(`${BREVO_API_URL}/smtp/email`, emailParams, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Brevo API response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Brevo API error:', error.response?.data || error.message);
    throw new Error(`Brevo API error: ${error.response?.data?.message || error.message}`);
  }
};
