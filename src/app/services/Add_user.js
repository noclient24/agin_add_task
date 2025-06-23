import { HttpsResponse } from "../helpers/HttpsResponse";

export const Signup = async (formsData) => {
  try {
    const response = await HttpsResponse.post("/api/user", formsData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const Login = async (formsData) => {
  try {
    const response = await HttpsResponse.post("/api/Login", formsData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const Add_Task = async (taskWithUser) => {
  try {
    const response = await HttpsResponse.post("/api/addTask", taskWithUser);
    return response.data;
  } catch (error) {
    console.error("Add task error:", error);
    throw error;
  }
};

export const currentuser = async () => {
  try {
    const response = await HttpsResponse.get("/api/current");
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
};

export const getTasksByUser = async (taskId) => {
  try {
    const response = await HttpsResponse.get(`/api/addTask/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
};



export const logout = async () => {
  try {
    const response = await HttpsResponse.post("/api/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await HttpsResponse.delete(`/api/addTask/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Delete task error:", error);
    throw error;
  }
};