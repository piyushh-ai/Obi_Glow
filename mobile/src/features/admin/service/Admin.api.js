import { api } from "../../../utils/axios";

export const createService = async (data) => {
  try {
    const res = await api.post("/service/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in createService api:", error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const res = await api.get("/service", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in getAllServices api:", error);
    throw error;
  }
};

export const editService = async (id, data) => {
  try {
    const res = await api.put(`/service/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in editService api:", error);
    throw error;
  }
};

export const getSingleService = async (id) => {
  try {
    const res = await api.get(`/service/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in getSingleService api:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const res = await api.delete(`/service/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in deleteService api:", error);
    throw error;
  }
};

export const toggleService = async (id) => {
  try {
    const res = await api.put(`/service/toggle/${id}`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in toggleService api:", error);
    throw error;
  }
};
