import client from "./client";

export const saveTypingResult = async (result) => {
  try {
    const response = await client.post("/typing/save", result);
    return response.data;
  } catch (error) {
    console.error("Error saving typing result:", error);
    throw error;
  }
};

export const getTypingHistory = async () => {
  try {
    const response = await client.get("/typing/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching typing history:", error);
    throw error;
  }
};

export const saveRaceResult = async (result) => {
  try {
    const response = await client.post("/typing/race/save", result);
    return response.data;
  } catch (error) {
    console.error("Error saving race result:", error);
    throw error;
  }
};

export const getRaceHistory = async () => {
  try {
    const response = await client.get("/typing/race/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching race history:", error);
    throw error;
  }
};

