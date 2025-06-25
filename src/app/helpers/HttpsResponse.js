import axios from "axios";

export const HttpsResponse = axios.create({
  baseURL: process.env.local || process.env.Host ,
});
