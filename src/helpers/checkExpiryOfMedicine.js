import { parse, isEqual, getYear, getMonth } from "date-fns";

// Define possible date formats to match against text detections
const dateFormats = [
  "yyyy-MM-dd", // e.g., 2025-07-31
  "yyyy/MM/dd", // e.g., 2025/07/31
  "yyyy.MM.dd", // e.g., 2025.07.31
  "MM/yyyy", // e.g., 07/2025
  "yyyy MM dd", // e.g., 2025 07 31
  "MM yyyy", // e.g., 07 2025
  "yyyy", // just a year e.g., 2025
];

/**
 * Extracts dates from text detections and validates them against a user-provided date.
 * @param {Array} textDetections - Array of detected text objects from AWS Rekognition.
 * @param {string} userDate - User-provided date in "yyyy-MM-dd" format.
 * @returns {boolean} - Returns true if a matching date is found; otherwise, false.
 */
export function extractAndValidateDate(textDetections, userDate) {
  // Parse the user date as a base comparison date in "yyyy-MM-dd" format
  const parsedUserDate = parse(userDate, "yyyy-MM-dd", new Date());

  // Check if parsing user date was successful
  if (isNaN(parsedUserDate)) {
    console.error(
      "Invalid user date format. Please provide a date in yyyy-MM-dd format."
    );
    return false;
  }

  // Extract year and month from the user date for partial match validation
  const userYear = getYear(parsedUserDate);
  const userMonth = getMonth(parsedUserDate); // Note: getMonth returns 0-indexed month (0 = January)

  // Iterate through each detected text item to find a matching date
  for (const detection of textDetections) {
    const detectedText = detection.DetectedText;

    // Try parsing detected text in each possible date format
    for (const format of dateFormats) {
      const parsedDate = parse(detectedText, format, new Date());

      // Check if parsedDate is valid
      if (parsedDate && !isNaN(parsedDate)) {
        // First, attempt an exact date match (year, month, and day)
        if (isEqual(parsedDate, parsedUserDate)) {
          console.log(
            `Exact Match Found: ${detectedText} with format ${format}`
          );
          return true;
        }

        // If an exact match fails, check if the detected date only includes the month and year
        const detectedYear = getYear(parsedDate);
        const detectedMonth = getMonth(parsedDate); // getMonth is 0-indexed

        if (detectedYear === userYear && detectedMonth === userMonth) {
          console.log(
            `Partial Match Found (Month/Year): ${detectedText} with format ${format}`
          );
          return true; // Consider it a match if year and month align
        }
      }
    }
  }

  console.log("No matching date found in text detections.");
  return false; // Return false if no match was found
}
