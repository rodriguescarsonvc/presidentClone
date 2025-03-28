import axios from "axios";

export const generateSpeech = async (text) => {
  try {
    const response = await axios.post(
      "/api/chat",
      { message: text },
      { headers: { "Content-Type": "application/json" } }
    );

    const { reply, blobUrl } = response.data;

    // Ensure the API returned valid data
    if (!reply || !blobUrl) {
      throw new Error("Invalid response data: Missing reply or blobUrl");
    }

    return { reply, blobUrl };
  } catch (error) {
    // Handle common Axios errors for better clarity
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMsg = error.response?.data?.error || error.message;

      switch (status) {
        case 400:
          console.error("Bad Request: The server rejected the data.", errorMsg);
          break;
        case 404:
          console.error(
            "Not Found: Endpoint may be incorrect or unavailable.",
            errorMsg
          );
          break;
        case 500:
          console.error("Server Error: Issue on the backend side.", errorMsg);
          break;
        default:
          console.error("Unexpected Error:", errorMsg);
      }
    } else {
      // Non-Axios errors (e.g., network issues)
      console.error("Network Error or Unknown Issue:", error.message);
    }

    // Optional: Return a fallback or custom error object
    return { error: "Failed to generate speech. Please try again later." };
  }
};
