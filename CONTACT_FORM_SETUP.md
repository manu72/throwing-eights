# Contact Form Setup Instructions

The contact form has been implemented with EmailJS integration. To make it fully functional, you need to set up EmailJS:

## EmailJS Setup

1. **Create an EmailJS account** at https://www.emailjs.com/
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Create an email template** with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_name}}` - Recipient name (Throwing Eights Team)

4. **Update the JavaScript file** (`assets/js/contact-form.js`):
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID

## Features Implemented

✅ **Form Validation**: Client-side validation for all fields
✅ **Error Handling**: Clear error messages for invalid inputs
✅ **Success Feedback**: Confirmation message when email is sent
✅ **Loading States**: Visual feedback during form submission
✅ **Required Fields**: Name, email, and message are required
✅ **Email Format**: Email field validates proper email format
✅ **Responsive Design**: Form works on all device sizes

## Testing

1. Open `index.html` in a browser
2. Scroll to the contact form at the bottom
3. Try submitting with empty fields (should show validation errors)
4. Fill out the form properly and submit (will show error about EmailJS keys until configured)

## Alternative Setup (No EmailJS Required)

If you prefer not to use EmailJS, you can modify the form to:
- Show a "thank you" message without actually sending emails
- Store form submissions in localStorage for testing
- Use a different email service like Formspree or Netlify Forms

The form is now fully functional and ready for production once EmailJS is configured!