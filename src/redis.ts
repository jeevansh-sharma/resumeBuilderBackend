import { createClient } from "redis";
import dotenv from "dotenv";
import { Queue, QueueEvents } from "bullmq";

dotenv.config();    
const redisConfig = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    ...process.env.REDIS_PASSWORD ? { password: process.env.REDIS_PASSWORD } : {},
    
}
let redisClient;
export const connectRedis = async () => {
   try{
      redisClient = createClient(redisConfig);
      redisClient.on("error", (err) => {
        console.error("Redis Client Error", err);
      });
      redisClient.on("connect", () => {
        console.log("Connected to Redis");
      });
      await redisClient.connect();
   }
   catch (error) {
        console.error("Error connecting to Redis", error);
        process.exit(1);
   }
  
}
export const resumeAnalysisQueue = new Queue("resume-analysis", {
    connection: redisConfig,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: true,
    },
});
resumeAnalysisQueue.on('error', (err) => {
    console.error("BullMQ Queue Error", err);
});

export const queueEvents = new QueueEvents("resume-analysis", {
    connection: redisConfig,
});
queueEvents.on('completed', (event) => {
    console.log("Job completed", event.jobId);
});

export default redisClient;