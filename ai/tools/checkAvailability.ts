import { SchemaType } from "@google/generative-ai";
import { getBookings } from "../../lib/sheets";

export const checkAvailabilityDeclaration = {
  name: "checkAvailability",
  description: "Check if a specific date and time slot is available for an appointment.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      date: {
        type: SchemaType.STRING,
        description: "The preferred date for the appointment (e.g. '15 July')."
      },
      time: {
        type: SchemaType.STRING,
        description: "The preferred time for the appointment (e.g. '3:00 PM')."
      }
    },
    required: ["date", "time"]
  }
};

export async function checkAvailability(args: { date: string; time: string }): Promise<{ available: boolean; message: string }> {
  try {
    const { date, time } = args;
    const bookings = await getBookings();
    
    const normDate = date.toLowerCase().trim();
    const normTime = time.toLowerCase().trim();

    const isBooked = bookings.some(
      (b) => b.date.toLowerCase().trim() === normDate && 
             b.time.toLowerCase().trim() === normTime &&
             b.status.toLowerCase() !== "cancelled"
    );

    if (isBooked) {
      return {
        available: false,
        message: `The slot on ${date} at ${time} is already booked. Please suggest other times.`
      };
    }

    return {
      available: true,
      message: `The slot on ${date} at ${time} is available.`
    };
  } catch (error) {
    console.error("Error in checkAvailability tool:", error);
    return {
      available: false,
      message: "An error occurred while checking availability."
    };
  }
}
