import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({
    baseURL: "http://10.0.2.2:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ── Request Interceptor ───────────────────────────────────────────────────────
// Har request se pehle AsyncStorage se token uthao aur header me lagao
api.interceptors.request.use(
    async (config) => {
        const token = await storage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
