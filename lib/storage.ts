import fs from "fs";
import path from "path";

const SIGNUPS_FILE = path.join(process.cwd(), "data", "signups.txt");

// Ensure data directory exists
export function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Append signup to text file
export function saveSignup(data: {
  firstName: string;
  email: string;
  zipCode: string;
  timestamp: string;
}) {
  ensureDataDirectory();
  
  const line = `${data.timestamp} | ${data.firstName} | ${data.email} | ${data.zipCode}\n`;
  
  try {
    fs.appendFileSync(SIGNUPS_FILE, line, "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving signup:", error);
    return false;
  }
}

// Read all signups
export function readSignups(): string[] {
  ensureDataDirectory();
  
  if (!fs.existsSync(SIGNUPS_FILE)) {
    return [];
  }
  
  try {
    const content = fs.readFileSync(SIGNUPS_FILE, "utf-8");
    return content.split("\n").filter((line) => line.trim() !== "");
  } catch (error) {
    console.error("Error reading signups:", error);
    return [];
  }
}

// Get total signup count
export function getSignupCount(): number {
  return readSignups().length;
}

// Check if email already exists
export function emailExists(email: string): boolean {
  const signups = readSignups();
  return signups.some((line) => line.includes(`| ${email} |`));
}

