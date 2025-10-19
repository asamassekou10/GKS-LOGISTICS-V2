# Quote Modal Integration Guide

## Files Created

1. **`quote-modal.html`** - The complete HTML structure for the quote request modal
2. **`css/quote-modal.css`** - All styling for the modal and form
3. **`js/quote-modal.js`** - JavaScript functionality for modal behavior and form handling
4. **Updated `js/news.js`** - Added translation keys for both English and French

## Integration Steps

### 1. Add the Modal HTML to Your Pages

Add the following line to the `<body>` section of all pages that contain "Faire un devis" buttons:

```html
<!-- Include the quote modal -->
<script>
  fetch('quote-modal.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    });
</script>
```

**OR** copy the entire content of `quote-modal.html` and paste it directly before the closing `</body>` tag on each page.

### 2. Include the CSS

Add this line to the `<head>` section of all pages:

```html
<link rel="stylesheet" href="css/quote-modal.css">
```

### 3. Include the JavaScript

Add this line before the closing `</body>` tag on all pages:

```html
<script src="js/quote-modal.js"></script>
```

### 4. Netlify Forms Configuration

The form is already configured for Netlify Forms with:
- `name="quote-request"` attribute
- `data-netlify="true"` attribute
- Proper form field names for Netlify processing

### 5. Automatic Button Detection

The JavaScript automatically detects and connects to buttons with:
- Text containing "devis" or "quote"
- `data-translate` attributes containing "quote"
- Classes: `.btn-secondary`, `.hero-cta-btn`, `.spontaneous-application-button`

## Features

### ✅ Complete Form Structure
- Contact Information (Name, Company, Email, Phone)
- Shipment Details (Freight Type, Origin, Destination, etc.)
- Additional Services (Checkboxes for optional services)
- Additional Message (Textarea for specific needs)

### ✅ Netlify Forms Ready
- Proper form attributes for Netlify processing
- Form submission handling with loading states
- Success/error feedback to users

### ✅ Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface

### ✅ Bilingual Support
- Full English/French translations
- Automatic language switching
- All form elements translated

### ✅ Modern UI/UX
- Clean, professional design
- Smooth animations
- GKS Logistics branding (red color scheme)
- Accessible design with proper labels and ARIA attributes

### ✅ User Experience
- Modal overlay with backdrop
- Close on Escape key
- Close when clicking outside
- Form validation
- Loading states during submission

## Form Fields

### Required Fields
- Full Name
- Company Name
- Email
- Phone Number
- Freight Type
- Origin
- Destination
- Dimensions & Weight
- Quantity/Packages

### Optional Fields
- Cargo Nature
- Preferred Shipping Date
- Additional Services (checkboxes)
- Additional Message

## Styling

The modal uses GKS Logistics brand colors:
- Primary Red: `#dc2626`
- Secondary Red: `#ef4444`
- Dark Blue: `#333`
- Light Gray: `#f8f9fa`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design for all screen sizes

## Testing

1. Test modal opening/closing
2. Test form validation
3. Test form submission
4. Test responsive design
5. Test language switching
6. Test keyboard navigation (Tab, Escape)

## Customization

To customize the modal:
1. Edit `css/quote-modal.css` for styling changes
2. Edit `js/quote-modal.js` for behavior changes
3. Edit translation keys in `js/news.js` for text changes
4. Edit `quote-modal.html` for form structure changes
