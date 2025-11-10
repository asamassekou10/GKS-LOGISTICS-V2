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
    'groupage-booking': getGroupageBookingEmail(data),
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
          .header h1 { margin: 0; font-size: 24px; color: white; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; color: white; }
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
          .header h1 { margin: 0; font-size: 24px; color: white; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; color: white; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-weight: 700; font-size: 16px; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 15px; }
          .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
          .field-row.full { grid-template-columns: 1fr; }
          .field { }
          .label { font-weight: 600; color: #1e3a8a; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .value { margin-top: 5px; padding: 10px; background: #f0f7ff; border-left: 4px solid #1e3a8a; word-wrap: break-word; white-space: pre-wrap; }
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
                  <div class="label">Weight (kg)</div>
                  <div class="value">${escapeHtml(data.weight || 'Not specified')}</div>
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
            </div>

            <div class="section">
              <div class="section-title">💬 Message & Details</div>
              <div class="field">
                <div class="label">Request Details</div>
                <div class="value">${escapeHtml(data.message || 'No message provided').replace(/\n/g, '<br>')}</div>
              </div>
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
New Quote Request

CONTACT INFORMATION
Full Name: ${data.fullName || 'N/A'}
Company: ${data.companyName || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phoneNumber || 'N/A'}

SHIPMENT DETAILS
Freight Type: ${data.freightType || 'N/A'}
Weight: ${data.weight || 'Not specified'} kg
Origin: ${data.origin || 'N/A'}
Destination: ${data.destination || 'N/A'}

MESSAGE & DETAILS
${data.message || 'No message provided'}

Submitted: ${new Date().toLocaleString()}

---
GKS Logistics - International Freight Solutions
www.gkslogistics.com
  `
});

// Professional email template for career application
const getCareerApplicationEmail = (data) => ({
  subject: `Career Application: ${data.desiredPosition} from ${data.applicantName}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; color: white; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; color: white; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { margin-top: 5px; padding: 10px; background: #f0f7ff; border-left: 4px solid #1e3a8a; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }
          .badge { display: inline-block; background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Career Application</h1>
            <p>Received via GKS Logistics Careers Portal</p>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Applicant Information</div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.applicantName || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${escapeHtml(data.applicantEmail || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${escapeHtml(data.applicantPhone || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">City</div>
                <div class="value">${escapeHtml(data.applicantCity || 'N/A')}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Position Details</div>
              <div class="field">
                <div class="label">Desired Position</div>
                <div class="value">${escapeHtml(data.desiredPosition || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Department</div>
                <div class="value">${escapeHtml(data.department || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Experience</div>
                <div class="value">${escapeHtml(data.experience || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Availability</div>
                <div class="value">${escapeHtml(data.availability || 'N/A')}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Qualifications</div>
              <div class="field">
                <div class="label">Education</div>
                <div class="value">${escapeHtml(data.education || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Key Skills</div>
                <div class="value">${escapeHtml(data.skills || 'Not specified')}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Motivation</div>
              <div class="field">
                <div class="value">${escapeHtml(data.motivation || 'Not specified')}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Uploaded Documents</div>
              <div class="field">
                <div class="label">CV File</div>
                <div class="value"><span class="badge">📎 ${escapeHtml(data.cvFileName || 'Attached')}</span></div>
              </div>
              ${data.coverLetterFileName ? `
              <div class="field">
                <div class="label">Cover Letter</div>
                <div class="value"><span class="badge">📄 ${escapeHtml(data.coverLetterFileName)}</span></div>
              </div>
              ` : ''}
              <div class="field" style="margin-top: 10px; font-size: 12px; color: #666;">
                <strong>Note:</strong> Files were uploaded through the career application form. Applicant contact: ${escapeHtml(data.applicantEmail || 'N/A')}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent automatically when a career application was submitted through the GKS Logistics website.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `Career Application from ${data.applicantName}\n\nPosition: ${data.desiredPosition}\nEmail: ${data.applicantEmail}\nPhone: ${data.applicantPhone}`
});

// Professional email template for groupage booking
const getGroupageBookingEmail = (data) => ({
  subject: `New Groupage Booking: ${data.route || 'Consolidated Shipment'}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; color: white; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; color: white; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { margin-top: 5px; padding: 10px; background: #f0f7ff; border-left: 4px solid #1e3a8a; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }
          .badge { display: inline-block; background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 New Groupage Booking</h1>
            <p>Consolidated Shipment Request</p>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Shipper Information</div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.firstname || '')} ${escapeHtml(data.lastname || '')}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${escapeHtml(data.email || 'N/A')}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${escapeHtml(data.phone || 'N/A')}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Shipment Details</div>
              <div class="field">
                <div class="label">Route</div>
                <div class="value"><span class="badge">🌍 ${escapeHtml(data.route || 'Not specified')}</span></div>
              </div>
              <div class="field">
                <div class="label">Weight (kg)</div>
                <div class="value">${escapeHtml(data.weight || 'Not specified')} kg</div>
              </div>
              <div class="field">
                <div class="label">Volume (m³)</div>
                <div class="value">${escapeHtml(data.volume || 'Not specified')} m³</div>
              </div>
              <div class="field">
                <div class="label">Cargo Description</div>
                <div class="value">${escapeHtml(data.description || 'Not specified')}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent automatically when a groupage booking was submitted through the GKS Logistics website. Our team will review the request and contact the shipper shortly.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `New Groupage Booking\n\nRoute: ${data.route}\nWeight: ${data.weight}kg\nVolume: ${data.volume}m³\nContact: ${data.firstname} ${data.lastname} (${data.email})`
});

// Professional email template for newsletter signup
const getNewsletterSignupEmail = (data) => ({
  subject: `Newsletter Subscription Confirmation: ${data.email}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; color: white; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; color: white; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; }
          .badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Newsletter Signup Confirmation</h1>
            <p>Welcome to GKS Logistics Updates</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #333; margin: 20px 0;">Thank you for subscribing to the GKS Logistics newsletter!</p>
            <p style="font-size: 14px; color: #666;">Your email:</p>
            <div class="badge">${escapeHtml(data.email || 'N/A')}</div>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">You will now receive updates about:</p>
            <ul style="text-align: left; color: #666; font-size: 14px;">
              <li>📦 Latest logistics solutions and services</li>
              <li>🌍 Expansion news and new routes</li>
              <li>💼 Industry insights and best practices</li>
              <li>🎯 Special offers and promotions</li>
            </ul>
          </div>
          <div class="footer">
            <p>This email was sent automatically when your email was subscribed to our newsletter through the GKS Logistics website.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `Thank you for subscribing to the GKS Logistics newsletter! Email: ${data.email}`
});

// Confirmation email template sent to users after form submission
const getConfirmationEmail = (userEmail, userName, formType) => ({
  subject: `Thank you for contacting GKS Logistics - We'll respond within 24 hours`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Roboto', sans-serif; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 40px 30px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .logo { font-size: 14px; font-weight: 700; letter-spacing: 2px; margin-bottom: 20px; color: #10b981; }
          .header h1 { margin: 0; font-size: 28px; color: white; font-weight: 700; }
          .header p { margin: 10px 0 0 0; opacity: 0.95; color: rgba(255, 255, 255, 0.9); font-size: 16px; }
          .content { background: white; padding: 40px 30px; }
          .welcome-section { margin-bottom: 35px; }
          .welcome-section h2 { margin: 0 0 15px 0; font-size: 20px; color: #1e3a8a; font-weight: 600; }
          .welcome-section p { margin: 12px 0; line-height: 1.6; color: #555; font-size: 15px; }
          .highlight { color: #10b981; font-weight: 600; }
          .services-section { margin-bottom: 35px; background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #1e3a8a; }
          .services-section h3 { margin: 0 0 20px 0; font-size: 16px; color: #1e3a8a; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .service-card { background: white; padding: 15px; border-radius: 6px; text-align: center; border-top: 3px solid #10b981; }
          .service-card h4 { margin: 0 0 10px 0; font-size: 14px; color: #1e3a8a; font-weight: 600; }
          .service-card p { margin: 0 0 12px 0; font-size: 13px; color: #666; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; transition: all 0.3s ease; }
          .cta-button:hover { opacity: 0.9; transform: translateY(-2px); }
          .footer-section { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; }
          .footer-section p { margin: 10px 0; font-size: 14px; line-height: 1.6; }
          .footer-section a { color: #10b981; text-decoration: none; font-weight: 600; }
          .footer-section .contact-info { margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.2); }
          @media (max-width: 600px) {
            .services-grid { grid-template-columns: 1fr; }
            .header h1 { font-size: 24px; }
            .content { padding: 25px 15px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌍 GKS LOGISTICS</div>
            <h1>Thank You!</h1>
            <p>We've received your submission and can't wait to help you</p>
          </div>

          <div class="content">
            <div class="welcome-section">
              <h2>Hello ${escapeHtml(userName || 'Valued Customer')},</h2>
              <p>Thank you for choosing <span class="highlight">GKS Logistics</span> for your logistics and freight needs.</p>
              <p>We've successfully received your submission and our team is reviewing it right now. Rest assured, we will respond to your inquiry <span class="highlight">within 24 hours</span>.</p>
              <p>In the meantime, we'd like to introduce you to our comprehensive range of services that can support your shipping and logistics requirements.</p>
            </div>

            <div class="services-section">
              <h3>✈️ Our Services</h3>
              <div class="services-grid">
                <div class="service-card">
                  <h4>Air Freight</h4>
                  <p>Fast and reliable international air shipping for urgent shipments</p>
                  <a href="https://www.gkslogistics.com#quote-calculator" class="cta-button" style="font-size: 12px; padding: 8px 16px;">Get Quote</a>
                </div>
                <div class="service-card">
                  <h4>Sea Freight</h4>
                  <p>Cost-effective ocean shipping with full container and LCL options</p>
                  <a href="https://www.gkslogistics.com#quote-calculator" class="cta-button" style="font-size: 12px; padding: 8px 16px;">Get Quote</a>
                </div>
                <div class="service-card">
                  <h4>Land Transport</h4>
                  <p>Regional road freight and last-mile delivery solutions</p>
                  <a href="https://www.gkslogistics.com#quote-calculator" class="cta-button" style="font-size: 12px; padding: 8px 16px;">Get Quote</a>
                </div>
                <div class="service-card">
                  <h4>Warehousing</h4>
                  <p>Secure storage and inventory management services</p>
                  <a href="https://www.gkslogistics.com" class="cta-button" style="font-size: 12px; padding: 8px 16px;">Learn More</a>
                </div>
              </div>
            </div>

            <div class="welcome-section" style="text-align: center;">
              <p style="font-size: 16px; color: #1e3a8a; font-weight: 600;">Get an Instant Quote</p>
              <p style="margin-top: 5px;">Need a quick estimate? Visit our quote calculator to get pricing in seconds.</p>
              <a href="https://www.gkslogistics.com#quote-calculator" class="cta-button" style="display: inline-block; margin-top: 15px;">Access Quote Calculator</a>
            </div>
          </div>

          <div class="footer-section">
            <p style="font-size: 16px; font-weight: 600; margin-bottom: 5px;">We're here to help!</p>
            <p>Have questions? Our expert team is ready to assist you.</p>
            <div class="contact-info">
              <p>📞 <strong>Phone:</strong> +223 90 92 92 73</p>
              <p>📧 <strong>Email:</strong> <a href="mailto:sales@gkslogistics.com">sales@gkslogistics.com</a></p>
              <p>🌐 <strong>Website:</strong> <a href="https://www.gkslogistics.com">www.gkslogistics.com</a></p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">© 2025 GKS Logistics. All rights reserved. Your trusted partner in global logistics.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
Thank you for contacting GKS Logistics!

Hello ${userName || 'Valued Customer'},

We've received your submission and will respond within 24 hours.

OUR SERVICES:
- Air Freight: Fast international shipping
- Sea Freight: Cost-effective ocean shipping
- Land Transport: Regional road freight
- Warehousing: Storage and inventory management

Get an instant quote: https://www.gkslogistics.com#quote-calculator

Contact us:
Phone: +223 90 92 92 73
Email: sales@gkslogistics.com
Website: www.gkslogistics.com

Best regards,
GKS Logistics Team
  `
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

    // Build email parameters
    const emailParams = {
      to: [{ email: RECIPIENT_EMAIL, name: 'GKS Logistics Forms' }],
      subject: emailTemplate.subject,
      htmlContent: emailTemplate.html,
      textContent: emailTemplate.text,
      sender: {
        name: 'GKS Logistics',
        email: 'gksforms@googlegroups.com'
      }
    };

    // Handle file attachments for career applications
    if (form.name === 'career-application') {
      const attachments = [];

      // Add CV file if present
      if (formData.cvFileData && formData.cvFileName) {
        attachments.push({
          content: formData.cvFileData,
          name: formData.cvFileName
        });
        console.log(`Added CV attachment: ${formData.cvFileName}`);
      }

      // Add cover letter file if present
      if (formData.coverLetterFileData && formData.coverLetterFileName) {
        attachments.push({
          content: formData.coverLetterFileData,
          name: formData.coverLetterFileName
        });
        console.log(`Added cover letter attachment: ${formData.coverLetterFileName}`);
      }

      if (attachments.length > 0) {
        emailParams.attachment = attachments;
        console.log(`Total attachments: ${attachments.length}`);
      }
    }

    // Send email to company via Brevo
    await sendEmailViaBrevo(emailParams);

    console.log('Email sent successfully to', RECIPIENT_EMAIL);

    // Send confirmation email to user
    const userEmail = formData.email || formData.applicantEmail;
    const userName = formData.name || formData.fullName || formData.applicantName || formData.firstname;

    if (userEmail) {
      try {
        const confirmationTemplate = getConfirmationEmail(userEmail, userName, form.name);
        const confirmationParams = {
          to: [{ email: userEmail }],
          subject: confirmationTemplate.subject,
          htmlContent: confirmationTemplate.html,
          textContent: confirmationTemplate.text,
          sender: {
            name: 'GKS Logistics',
            email: 'gksforms@googlegroups.com'
          }
        };

        await sendEmailViaBrevo(confirmationParams);
        console.log('Confirmation email sent successfully to', userEmail);
      } catch (confirmationError) {
        console.error('Failed to send confirmation email:', confirmationError.message);
        // Don't fail the entire request if confirmation email fails
      }
    }

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
