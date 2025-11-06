const nodemailer = require('nodemailer');

// Parse form submission data
function parseFormData(payload) {
  if (typeof payload === 'string') {
    return JSON.parse(payload);
  }
  return payload;
}

// Generate beautiful HTML email template
function generateEmailTemplate(data, formName) {
  const brandColor = '#003087';
  const accentColor = '#0052cc';
  const lightGray = '#f8f9fa';
  const darkGray = '#333';
  const borderColor = '#e0e0e0';

  // Format field name for display
  function formatFieldName(name) {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  // Filter out technical fields
  const fieldsToDisplay = Object.entries(data)
    .filter(([key]) => !['form-name', 'bot-field', '_gotcha', 'netlify', 'g-recaptcha-response'].includes(key))
    .map(([key, value]) => ({
      label: formatFieldName(key),
      value: value
    }));

  const submissionTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: ${darkGray};
            margin: 0;
            padding: 0;
            background: ${lightGray};
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, ${brandColor} 0%, ${accentColor} 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 8px 0 0 0;
            font-size: 14px;
            opacity: 0.95;
            font-weight: 500;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
          }
          .form-section {
            margin-bottom: 30px;
          }
          .form-section h2 {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${brandColor};
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid ${brandColor};
            letter-spacing: 0.5px;
          }
          .form-field {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid ${borderColor};
          }
          .form-field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .field-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${brandColor};
            margin-bottom: 6px;
            letter-spacing: 0.5px;
          }
          .field-value {
            font-size: 15px;
            color: ${darkGray};
            word-break: break-word;
            white-space: pre-wrap;
          }
          .field-value a {
            color: ${accentColor};
            text-decoration: none;
            border-bottom: 1px solid ${accentColor};
          }
          .field-value a:hover {
            text-decoration: underline;
          }
          .metadata {
            background: ${lightGray};
            padding: 20px;
            border-radius: 6px;
            margin-top: 30px;
          }
          .metadata-item {
            font-size: 13px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
          }
          .metadata-item:last-child {
            margin-bottom: 0;
          }
          .metadata-label {
            font-weight: 700;
            color: ${brandColor};
          }
          .metadata-value {
            color: ${darkGray};
          }
          .footer {
            background: ${lightGray};
            padding: 30px 20px;
            text-align: center;
            border-top: 1px solid ${borderColor};
          }
          .footer p {
            margin: 0;
            font-size: 12px;
            color: #666;
          }
          .footer a {
            color: ${accentColor};
            text-decoration: none;
          }
          .cta-box {
            background: ${brandColor};
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            margin: 30px 0;
          }
          .cta-box p {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
          }
          @media (max-width: 600px) {
            .container {
              border-radius: 0;
            }
            .header {
              padding: 30px 15px;
            }
            .header h1 {
              font-size: 24px;
            }
            .content {
              padding: 20px 15px;
            }
            .metadata-item {
              flex-direction: column;
            }
            .metadata-value {
              margin-top: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">GKS LOGISTICS</div>
            <h1>New Form Submission</h1>
            <p>${formName}</p>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Main Fields -->
            <div class="form-section">
              <h2>Submission Details</h2>
              ${fieldsToDisplay
                .map(field => `
                  <div class="form-field">
                    <div class="field-label">${field.label}</div>
                    <div class="field-value">${escapeHtml(String(field.value || 'N/A'))}</div>
                  </div>
                `)
                .join('')}
            </div>

            <!-- Metadata -->
            <div class="metadata">
              <div class="metadata-item">
                <span class="metadata-label">Form Name:</span>
                <span class="metadata-value">${escapeHtml(formName)}</span>
              </div>
              <div class="metadata-item">
                <span class="metadata-label">Submitted:</span>
                <span class="metadata-value">${submissionTime} UTC</span>
              </div>
              <div class="metadata-item">
                <span class="metadata-label">IP Address:</span>
                <span class="metadata-value">${data.ip_address || 'Not captured'}</span>
              </div>
            </div>

            <!-- CTA Box -->
            <div class="cta-box">
              <p>⚡ Review this submission in your Netlify dashboard</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>This is an automated notification from <strong>GKS Logistics</strong></p>
            <p>© 2024 GKS Logistics. All rights reserved.</p>
            <p><a href="https://gkslogistics.com">Visit our website</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// HTML escape utility
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Main handler
exports.handler = async (event) => {
  try {
    // Only accept POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Parse form data
    const body = parseFormData(event.body);
    const formName = body['form-name'] || 'Contact Form';

    // In production, you would send email using a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Or configure Netlify to call this and send email

    // For now, we'll return success and Netlify Forms handles the email
    // This function primarily provides the beautiful template above
    // which can be referenced in your Netlify dashboard settings

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form submission received',
        template: generateEmailTemplate(body, formName)
      })
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Form submission failed',
        details: error.message
      })
    };
  }
};
