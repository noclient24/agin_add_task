import axios from "axios";

export const HttpsResponse = axios.create({
  baseURL: "http://localhost:3000/",
});
