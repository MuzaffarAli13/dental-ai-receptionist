export interface ClinicConfig {
  clinicName: string;
  logoText: string;
  themeColor: {
    primary: string; // hex color for buttons, hover
    secondary: string; // hex color for accents
    accent: string; // hex color for alerts/badges
  };
  adminEmail: string;
  clinicEmail: string;
  workingHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
    days: number[]; // [1, 2, 3, 4, 5] (1=Monday, 7=Sunday)
  };
  appointmentDuration: number; // in minutes
  timezone: string;
  phoneNumber: string;
}

export const clinicConfig: ClinicConfig = {
  clinicName: "Smile Dental Clinic",
  logoText: "Smile Dental",
  themeColor: {
    primary: "#0f766e", // Teal 700
    secondary: "#14b8a6", // Teal 500
    accent: "#f59e0b", // Amber 500
  },
  adminEmail: process.env.ADMIN_EMAIL || "admin@smiledental.com",
  clinicEmail: process.env.CLINIC_EMAIL || "appointments@smiledental.com",
  workingHours: {
    start: "09:00",
    end: "17:00",
    days: [1, 2, 3, 4, 5], // Monday to Friday
  },
  appointmentDuration: 30, // 30 minutes per appointment
  timezone: "America/New_York",
  phoneNumber: "+1 (555) 019",
};
