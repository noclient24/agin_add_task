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
    const response = await HttpsResponse.post("/api/Login", formsData)
    return response.data
  } catch (error) {
    console.log("Login Fail error is ", error)
  }

}

export const Add_Task = async (taskWithUser) => {
  try {
    const response = await HttpsResponse.post("/api/addTask", taskWithUser)
    return response.data
  } catch (error) {
    console.log("Login Fail error is ", error)
  }
}


export const currentuser = async () => {

  try {
    const response = await HttpsResponse.get("/api/current")
    return response.data
  } catch (error) {
    console.log("Login Fail error is ", error)
  }

}