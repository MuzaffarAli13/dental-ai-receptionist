# 🦷 Dental AI Booking Agent

An intelligent, configuration-driven, and voice-enabled Next.js MVP web application designed for dental clinics. It features a modern user interface, a floating AI chatbot powered by Google Gemini, real-time booking slots availability verification using Google Sheets, and automated transactional emails (patient confirmations and admin alerts) via Resend.

---

## 🚀 Core Features

- **Gemini-Powered Chatbot**: Virtual receptionist that helps patients register bookings, answer dental FAQs, and collect contact details.
- **Voice-Enabled Speech Interface**: Full text-to-speech (TTS) synthesis and speech-to-text (STT) recognition integrated directly in the browser.
- **Google Sheets Database**: Direct, real-time read/write access to check slot availability and save appointment logs.
- **Premium Email Confirmations**: Styled HTML emails sent automatically to patients upon successful bookings, along with administrative notifications.
- **Clean Responsive Styling**: Responsive, modern glassmorphism web layout styled using CSS.

---

## 🛠️ Step-by-Step Local Setup

Follow these steps to set up the project locally on your machine after cloning:

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <your-repository-url>
cd bookingagent

# Install package dependencies
npm install
```

### 2. Configure Environment Variables
Copy the template configuration file to `.env.local` to store your local credentials:
```bash
cp .env.example .env.local
```

Open `.env.local` in your editor and fill out the values:

| Variable | Description | Where to Get / How to Configure |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key | Go to [Google AI Studio](https://aistudio.google.com/), click **Get API Key**, and generate a key starting with `AIzaSy`. |
| `GEMINI_MODEL` | The LLM model engine | Defaults to `gemini-2.5-flash`. |
| `GOOGLE_SHEET_ID` | The unique ID of your Google Sheet | Open your Google Sheet. Copy the long ID string from the browser URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`. |
| `GOOGLE_SERVICE_ACCOUNT` | Service account credential JSON | **Must be single-line**. Create a service account in Google Cloud Console, enable the Google Sheets API, generate a JSON Key, collapse it to a single line, and wrap it in single quotes (`'{"type": ...}'`). |
| `RESEND_API_KEY` | Resend API Key | Sign up on [Resend](https://resend.com/), go to API Keys, and generate a key starting with `re_`. |
| `SENDER_EMAIL` | The sending email address | Use `onboarding@resend.dev` for test environments. For production, verify your custom domain on Resend and use `bookings@yourdomain.com`. |
| `ADMIN_EMAIL` | Reception/Admin notification receiver | Email address where administrative booking alerts are sent. (For Resend test mode, this must be the email address you signed up with). |
| `CLINIC_EMAIL` | Public clinic email | Shown inside patient confirmations for contact support. |
| `CLINIC_NAME` | Display name of the clinic | Configures the branding across emails and greetings (e.g., `"Smile Dental Clinic"`). |

---

## 📊 Google Sheets Setup Guide

The application uses Google Sheets as a database. Follow this structure to ensure database compatibility:

1. Create a Google Sheet.
2. Share the Sheet with the Google Service Account's email address (found under the `"client_email"` key in your downloaded JSON credential file) as an **Editor**.
3. Go to **Extensions ➔ Apps Script**, paste the initialization code below, select `myFunction`, and click **Run**:

```javascript
/**
 * Run this function in Google Apps Script to initialize the headers and validation rules.
 */
function myFunction() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("Sheet1");
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Sheet1");
  }
  
  // 1. Define and write the headers
  const headers = ["Name", "Email", "Phone", "Date", "Time", "Reason", "Status", "Timestamp"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // 2. Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setBackground("#1A73E8"); 
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  
  // 3. Setup dropdown validation for the "Status" column (Column G)
  const statusRange = sheet.getRange("G2:G2000");
  const validationRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Confirmed", "Pending", "Cancelled"], true)
    .setAllowInvalid(false)
    .setHelpText("Please choose a status: Confirmed, Pending, or Cancelled.")
    .build();
  statusRange.setDataValidation(validationRule);
  
  // 4. Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  Logger.log("Sheet initialized successfully.");
}
```

---

## 🏃 Running the Application

### Development Server
Run the local Next.js development environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
Validate and check for any compilation or type issues:
```bash
# Runs TypeScript compiler check
npx tsc --noEmit

# Compiles production build
npm run build
```

---

## 🌐 Production Deployment (Vercel)

1. Push your repository to **GitHub**.
2. Connect your GitHub account to [Vercel](https://vercel.com/) and import the project.
3. Add the exact environment variables from your `.env.local` in Vercel's **Environment Variables** project settings tab.
4. Click **Deploy**.
