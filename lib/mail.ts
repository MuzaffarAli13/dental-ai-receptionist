import { Resend } from "resend";
import nodemailer from "nodemailer";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL || "admin@smiledental.com";
const clinicEmail = process.env.CLINIC_EMAIL || "appointments@smiledental.com";
const clinicName = process.env.CLINIC_NAME || "Smile Dental Clinic";

let resendClient: Resend | null = null;
if (resendApiKey) {
  resendClient = new Resend(resendApiKey);
}

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

let smtpTransport: any = null;
if (smtpHost && smtpUser && smtpPass) {
  smtpTransport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

export async function sendEmail({ to, subject, body, html }: EmailPayload): Promise<boolean> {
  // 1. Try Resend
  if (resendClient) {
    try {
      const fromEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";
      const response = await resendClient.emails.send({
        from: `${clinicName} <${fromEmail}>`,
        to: to,
        subject: subject,
        text: body,
        html: html || body.replace(/\n/g, "<br>"),
      });
      if (response.error) {
        console.error("Resend error sending email:", response.error);
      } else {
        console.log(`Email sent successfully via Resend to ${to}: ${subject}`);
        return true;
      }
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
    }
  }

  // 2. Try SMTP
  if (smtpTransport) {
    try {
      await smtpTransport.sendMail({
        from: `"${clinicName}" <${clinicEmail}>`,
        to: to,
        subject: subject,
        text: body,
        html: html || body.replace(/\n/g, "<br>"),
      });
      console.log(`Email sent successfully via SMTP to ${to}: ${subject}`);
      return true;
    } catch (error) {
      console.error("Failed to send email via SMTP:", error);
    }
  }

  // 3. Fallback mock log
  console.log(`[MOCK EMAIL SENT]
=========================================
FROM: ${clinicName} <${clinicEmail}>
TO: ${to}
SUBJECT: ${subject}
BODY:
${body}
=========================================`);
  return true;
}
