import mongoose, { Schema } from "mongoose";


const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export {Task}