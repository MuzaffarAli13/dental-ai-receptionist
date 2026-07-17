import { google } from "googleapis";

const sheetId = process.env.GOOGLE_SHEET_ID;
const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT;

let googleAuth: any = null;

if (serviceAccountRaw && sheetId) {
  try {
    const creds = JSON.parse(serviceAccountRaw);
    googleAuth = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch (error) {
    console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT JSON credentials:", error);
  }
} else {
  console.warn("WARNING: GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT is not set. Google Sheets integration will run in mock mode.");
}

export interface BookingRow {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  timestamp: string;
}

// In-memory mock storage for development/testing when env vars are missing
let mockBookings: BookingRow[] = [
  {
    name: "John Smith",
    email: "john@gmail.com",
    phone: "+923001234567",
    date: "15 July",
    time: "3:00 PM",
    reason: "Tooth Pain",
    status: "Confirmed",
    timestamp: new Date().toISOString(),
  }
];

export async function getBookings(): Promise<BookingRow[]> {
  if (!googleAuth || !sheetId) {
    console.warn("Mocking getBookings() due to missing sheets credentials.");
    return mockBookings;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth: googleAuth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A2:H", // Assumes columns are: Name, Email, Phone, Date, Time, Reason, Status, Timestamp
    });

    const rows = response.data.values || [];
    return rows.map((row) => ({
      name: row[0] || "",
      email: row[1] || "",
      phone: row[2] || "",
      date: row[3] || "",
      time: row[4] || "",
      reason: row[5] || "",
      status: row[6] || "",
      timestamp: row[7] || "",
    }));
  } catch (error) {
    console.error("Error fetching bookings from Google Sheets:", error);
    return mockBookings;
  }
}

export async function addBooking(booking: BookingRow): Promise<boolean> {
  if (!googleAuth || !sheetId) {
    console.warn("Mocking addBooking() due to missing sheets credentials.");
    mockBookings.push(booking);
    return true;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth: googleAuth });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A2:H",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            booking.name,
            booking.email,
            booking.phone,
            booking.date,
            booking.time,
            booking.reason,
            booking.status,
            booking.timestamp,
          ],
        ],
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error writing booking to Google Sheets:", error);
    return false;
  }
}
