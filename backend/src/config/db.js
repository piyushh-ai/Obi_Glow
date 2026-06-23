import mongoose from "mongoose";
import { config } from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

export const connectDb = async () => {
  mongoose
    .connect(config.mongoUri)
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log("db connection error: ", error);
    });
};
