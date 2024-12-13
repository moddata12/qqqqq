const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.mail = catchAsyncError(async (req, res, next) => {
  const { email, serviceRequest, message } = req.body;

  // Configure the email transport using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Use 465 for SSL, or 587 for STARTTLS
    secure: false, // true for port 465, false for port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    cc: email,
    subject: `Service Request: ${serviceRequest} from ${email}`,
    text: message,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending failed:", error); // Log the detailed error
    return next(
      new ErrorHandler("Failed to send email. Please try again later.", 500)
    );
  }
});
