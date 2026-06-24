import { api } from "../../../utils/axios";

export const login = async (token) => {
  try {
    const response = await api.post("/auth/google", { token });
    return response.data;
  } catch (error) {
    console.log("Error in login api", error);
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/auth/get-me");
    return response.data;
  } catch (error) {
    console.log("Error in getMe api", error);
    throw error; // caller ke catch block tak pahunchao
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Error in logout api", error);
    throw error;
  }
};