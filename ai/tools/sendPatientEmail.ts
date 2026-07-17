import { sendEmail } from "../../lib/mail";
import { clinicConfig } from "../config";

export async function sendPatientConfirmation(args: {
  name: string;
  email: string;
  date: string;
  time: string;
}): Promise<boolean> {
  const { name, email, date, time } = args;

  const subject = "Appointment Confirmed";
  const body = `Hello ${name},

Your appointment has been successfully booked.

Clinic:
${clinicConfig.clinicName}

Date:
${date}

Time:
${time}

Thank you.`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: ${clinicConfig.themeColor.primary}; padding: 32px;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">Appointment Confirmed</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin-top: 0; margin-bottom: 8px;">Hello ${name},</p>
              <p style="font-size: 15px; line-height: 1.6; color: #64748b; margin-bottom: 32px; margin-top: 0;">Your dental appointment has been successfully scheduled. We look forward to seeing you at the clinic! Below are your booking details:</p>
              
              <!-- Card Details -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; border-radius: 8px; padding: 24px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; padding-bottom: 12px; border-bottom: 1px solid #cbd5e1;" colspan="2">
                    Booking Information
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 600; color: #475569; padding-top: 16px; padding-bottom: 6px; width: 100px;">
                    Clinic
                  </td>
                  <td style="font-size: 15px; font-weight: 500; color: #1e293b; padding-top: 16px; padding-bottom: 6px;">
                    ${clinicConfig.clinicName}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 600; color: #475569; padding-bottom: 6px;">
                    Date
                  </td>
                  <td style="font-size: 15px; font-weight: 500; color: #1e293b; padding-bottom: 6px;">
                    ${date}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 600; color: #475569; padding-bottom: 6px;">
                    Time
                  </td>
                  <td style="font-size: 15px; font-weight: 500; color: #1e293b; padding-bottom: 6px;">
                    ${time}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 600; color: #475569;">
                    Status
                  </td>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; background-color: #dcfce7; color: #15803d; font-weight: 600; font-size: 12px; border-radius: 9999px; text-transform: uppercase;">Confirmed</span>
                  </td>
                </tr>
              </table>

              <p style="font-size: 15px; line-height: 1.6; color: #64748b; margin-top: 0; margin-bottom: 32px;">If you need to change your appointment or have any questions, please contact us by clicking the button below or replying directly to this email.</p>
              
              <!-- Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${clinicConfig.clinicEmail}" style="display: inline-block; background-color: ${clinicConfig.themeColor.primary}; color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 12px 32px; border-radius: 6px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(15, 118, 110, 0.2);">Contact Clinic</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748b;">${clinicConfig.clinicName}</p>
              <p style="margin: 0 0 4px 0;">Phone: ${clinicConfig.phoneNumber} | Email: <a href="mailto:${clinicConfig.clinicEmail}" style="color: ${clinicConfig.themeColor.primary}; text-decoration: none; font-weight: 500;">${clinicConfig.clinicEmail}</a></p>
              <p style="margin: 12px 0 0 0;">© ${new Date().getFullYear()} ${clinicConfig.clinicName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return await sendEmail({ to: email, subject, body, html });
}
