import { sendEmail } from "../../lib/mail";
import { clinicConfig } from "../config";

export async function sendAdminNotification(args: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
}): Promise<boolean> {
  const { name, email, phone, date, time, reason } = args;

  const subject = "New Appointment Booked";
  const body = `A new appointment has been booked.

Name:
${name}

Email:
${email}

Phone:
${phone}

Date:
${date}

Time:
${time}

Reason:
${reason}`;

  return await sendEmail({ to: clinicConfig.adminEmail, subject, body });
}
