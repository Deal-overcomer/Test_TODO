import mongoose, { Schema } from "mongoose";
import { TaskProps } from "types/mainTypes";
import { v4 as uuid4 } from "uuid";

const TaskSchema = new Schema<TaskProps>({
  id: { type: String, unique: true, default: uuid4 },
  title: {
    type: String,
    required: [true, "Add your title-lightle"],
    trim: true,
    maxlength: [100, "Title have to be less than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Add your description-mission"],
    trim: true,
    maxlength: [500, "Description have to be less than 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const TaskModel = mongoose.model<TaskProps>("Task", TaskSchema);

export default TaskModel;
