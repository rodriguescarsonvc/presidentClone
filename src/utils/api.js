import axios from "axios";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // Initial delay in ms (2 seconds)

export const generateSpeech = async (text, attempt = 1) => {
  try {
    const response = await axios.post(
      "/api/chat",
      { message: text },
      { headers: { "Content-Type": "application/json" } }
    );

    const { reply, blobUrl } = response.data;

    if (!reply || !blobUrl) {
      throw new Error("Invalid response data: Missing reply or blobUrl");
    }

    return { reply, blobUrl };
  } catch (error) {
    if (signal?.aborted) {
      throw axios.Cancel("Request was canceled by the user.");
    }
    if (axios.isAxiosError(error)) {

      const status = error.response?.status;
      const errorMsg = error.response?.data?.error || error.message;

      if (status === 503 && attempt <= MAX_RETRIES) {
        const delay = RETRY_DELAY * Math.pow(2, attempt - 1); // Exponential backoff
        console.warn(`Service unavailable. Retrying in ${delay / 1000}s...`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return generateSpeech(text, attempt + 1); // Recursive retry
      }

      switch (status) {
        case 400:
          console.error("Bad Request: The server rejected the data.", errorMsg);
          break;
        case 404:
          console.error("Not Found: Endpoint may be incorrect or unavailable.", errorMsg);
          break;
        case 500:
          console.error("Server Error: Issue on the backend side.", errorMsg);
          break;
        default:
          console.error("Unexpected Error:", errorMsg);
      }
    } else {
      console.error("Network Error or Unknown Issue:", error.message);
    }

    return { error: "Failed to generate speech. Please try again later." };
  }
};
