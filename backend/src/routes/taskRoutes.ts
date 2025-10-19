import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "@controllers/taskController";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
