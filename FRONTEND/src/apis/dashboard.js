import client from "./client";

export const getDashboard = async () => {
  try {
    const response = await client.get("/user/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    throw error;
  }
};

export const getGame = async (gameId) => {
  try {
    const response = await client.get(`/user/dashboard/game/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

