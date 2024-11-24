"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetLink = async (email: string, token: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const confirmLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password`,
  });
};

export default sendPasswordResetLink;
