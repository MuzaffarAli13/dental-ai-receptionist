import { addBooking, BookingRow } from "../../lib/sheets";

export async function saveBookingToSheet(booking: BookingRow): Promise<boolean> {
  try {
    return await addBooking(booking);
  } catch (error) {
    console.error("Error saving booking to sheet:", error);
    return false;
  }
}
