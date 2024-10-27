const nodemailer = require("nodemailer");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app-specific password
  },
});

export const sendTwoFactorEmail = async (email, token) => {
  const mailOptions = {
    from: "your@gmail.com", // sender address
    to: email, // list of receivers
    subject: "2FA Code", // Subject line// plaintext body
    html: `<p>Your 2FA code: ${token}</p>`, // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("2FA email sent:", info.messageId);
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line// plaintext body
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`, // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("Reset password email sent:", info.messageId);
  });
};

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: email, // list of receivers
    subject: "Verify your email", // Subject line// plaintext body
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`, // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("Verification Email sent:", info.messageId);
  });
};
