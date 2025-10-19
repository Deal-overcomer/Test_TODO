import express, { Application } from "express";
import cors from "cors";
import taskRoutes from "@routes/taskRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tasks", taskRoutes);

// Check api
app.get("/api/check", (_req, res) => {
  res.status(200).send("API is alive");
});

export default app;
