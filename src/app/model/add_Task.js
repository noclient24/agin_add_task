import mongoose, { Schema } from "mongoose";

const Add_Task_Model = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: new Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Add_Task_Models =
  mongoose.models.Add_Task_Model ||
  mongoose.model("Add_Task_Models", Add_Task_Model);

export { Add_Task_Models };
