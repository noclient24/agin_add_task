import mongoose, { Schema } from "mongoose";

export const UserData = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  Profileurl: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740",
  },
});

const UserDatas =
  mongoose.models.UserData || mongoose.model("UserData", UserData);

export { UserDatas };
