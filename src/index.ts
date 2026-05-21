import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { connectRedis } from "./redis.js";
import resumeRoutes from "./routes/resumeRoute.js";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/resume-analyzer";

const app = express();

//const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true,
}
));
app.use(express.json({limit: "10mb"
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

mongoose.connect(MONGODB_URI).then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.error("Error connecting to MongoDB", err);
  process.exit(1);
});

(
  async()=>{
    console.log("Redis connection established");
    await connectRedis();

    console.log("Start these workers.. . .....");

    //createTextExtractionWorker();
  }
)();

app.get("/", (_, res) => {
  res.send("Resume Analyzer API Running");
});
app.use("/api/resume", resumeRoutes)
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});