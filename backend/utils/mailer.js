import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Hospital System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments,
  });
};
