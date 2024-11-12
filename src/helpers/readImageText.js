import {
  RekognitionClient,
  DetectTextCommand,
} from "@aws-sdk/client-rekognition";

const rekognitionClient = new RekognitionClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Detects text from an image file selected from an input element (e.g., e.target.files[0]).
 * @param {File} imageFile - The image file obtained from an input element (e.g., e.target.files[0]).
 * @returns {Promise<Array>} - Returns an array of detected text data.
 */
export async function detectTextFromImageFile(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Step 1: Read the file as an ArrayBuffer
    reader.onloadend = async () => {
      try {
        // Step 2: Convert ArrayBuffer to Uint8Array
        const arrayBuffer = reader.result;
        const imageBytes = new Uint8Array(arrayBuffer);

        // Step 3: Set up parameters for AWS Rekognition
        const params = {
          Image: {
            Bytes: imageBytes,
          },
        };

        // Step 4: Create and send the DetectText command to AWS Rekognition
        const command = new DetectTextCommand(params);
        const response = await rekognitionClient.send(command);

        // Step 5: Resolve with text detections
        if (response.TextDetections) {
          resolve(response.TextDetections);
        } else {
          console.log("No text detected in the image.");
          resolve([]);
        }
      } catch (error) {
        console.error("Error detecting text:", error);
        reject(error);
      }
    };

    // Start reading the file
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(imageFile);
  });
}
