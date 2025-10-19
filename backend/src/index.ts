import dotenv from "dotenv";
import app from "app";
import { connectDB } from "@db/connect";

dotenv.config();

const PORT = Number(process.env?.PORT || 5001);

connectDB(process.env?.MONGODB_URI || "");

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
