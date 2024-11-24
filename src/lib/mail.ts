"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dapoajibade66@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPasswordResetLink = async (email: string, token: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const confirmLink = `${domain}/new-password?token=${token}`;

  const mailOptions = {
    from: '"do-manager Support" <dapoajibade66@gmail.com>',
    to: email,
    subject: "Reset your password",
    text: "Click the link to reset your password: <link>",
    html: `<p>Click the link to reset your password: <a href="${confirmLink}">Reset Password</a></p>`,
  };

  return await transporter.sendMail(mailOptions).catch((err) => {
    const error = err as Error;
    console.log("Error sending reset link: ", error.message);
    throw { errMsg: "Error sending reset link" };
  });
};

export default sendPasswordResetLink;
