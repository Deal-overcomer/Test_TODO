import { Document } from "mongoose";

export interface TaskProps extends Document {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}
