// mailController.js (ES Module)

import sendEmail from '../utility/sendEmail.js';

export async function sendContactEmail(req, res) {
  const { name, email, message } = req.body;

  // Check if the required fields are missing for admin email
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message.' });
  }

  try {
    // Send email to admin (even if partial)
    const adminEmailResult = await sendEmail({
      name,
      email,
      message,
      toEmail: process.env.TO_EMAIL, // You can override with a specific admin email
      subject: `New Contact Form Submission from ${name}`,
      message: `${message}`,
    });

    // Send a thank-you email to the user
    const userThankYouEmail = await sendEmail({
      name: 'Md Faruk Khan SEO',
      email: process.env.FROM_EMAIL,
      toEmail: email,
      subject: 'Thank You for Your Submission!',
      message: `Dear ${name},\n\nThank you for reaching out to me. I have received your meeting request and will get back to you shortly. I appreciate your interest, and I look forward to connecting with you soon.\n\nBest regards,\nMd Faruk Khan`,
    });

    // Respond back with success
    return res.status(200).json({
      message: 'Form submitted successfully, emails sent.',
      data: { adminEmailResult, userThankYouEmail },
    });
  } catch (error) {
    console.error('Email Controller Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}

