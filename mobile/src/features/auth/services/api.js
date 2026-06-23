import { api } from "../../../utils/axios";

export const login = async (token) => {
  try {
    const response = await api.post("/auth/google", { token });
    return response.data;
  } catch (error) {
    console.log("Error in login api", error);
  }
};
