import { SchemaType } from "@google/generative-ai";
import { checkAvailability } from "./checkAvailability";
import { saveBookingToSheet } from "./googleSheets";
import { sendPatientConfirmation } from "./sendPatientEmail";
import { sendAdminNotification } from "./sendAdminEmail";

export const bookAppointmentDeclaration = {
  name: "bookAppointment",
  description: "Book an appointment for a patient by collecting all details and logging them. Only call this after confirming with the user that they want to book this slot.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
        description: "The full name of the patient."
      },
      email: {
        type: SchemaType.STRING,
        description: "The email address of the patient."
      },
      phone: {
        type: SchemaType.STRING,
        description: "The phone number of the patient."
      },
      date: {
        type: SchemaType.STRING,
        description: "The preferred date of the appointment (e.g. '15 July')."
      },
      time: {
        type: SchemaType.STRING,
        description: "The preferred time of the appointment (e.g. '3:00 PM')."
      },
      reason: {
        type: SchemaType.STRING,
        description: "Optional reason for the dental visit."
      }
    },
    required: ["name", "email", "phone", "date", "time"]
  }
};

export async function bookAppointment(args: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const { name, email, phone, date, time, reason = "Not specified" } = args;

    // 1. Double check availability
    const availability = await checkAvailability({ date, time });
    if (!availability.available) {
      return {
        success: false,
        message: `Booking failed. The slot on ${date} at ${time} is no longer available. Please select another slot.`
      };
    }

    const timestamp = new Date().toISOString();
    const newBooking = {
      name,
      email,
      phone,
      date,
      time,
      reason,
      status: "Confirmed",
      timestamp
    };

    // 2. Save into Google Sheets
    const sheetsSuccess = await saveBookingToSheet(newBooking);
    if (!sheetsSuccess) {
      return {
        success: false,
        message: "Failed to record booking in the clinic database. Please try again."
      };
    }

    // 3. Send Patient Confirmation Email & Admin Notification Email
    // Execute asynchronously to speed up API response
    Promise.all([
      sendPatientConfirmation({ name, email, date, time }),
      sendAdminNotification({ name, email, phone, date, time, reason })
    ]).catch(err => {
      console.error("Error sending notification emails in bookAppointment:", err);
    });

    return {
      success: true,
      message: `Appointment successfully booked for ${name} on ${date} at ${time}. Confirmation emails have been sent.`
    };
  } catch (error) {
    console.error("Error in bookAppointment tool:", error);
    return {
      success: false,
      message: "An unexpected error occurred while booking the appointment."
    };
  }
}
