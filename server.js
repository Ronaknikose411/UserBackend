


import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { avatarUpload } from "./s3Upload.js";


import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";


const numCPUs = availableParallelism();
console.log({ numCPUs });
const PORT = 4000;


if (cluster.isPrimary) {
  // Primary process: forks workers equal to the number of CPU cores
  console.log(`Primary process ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }


  // If a worker dies, fork a new one for resilience
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Worker process: runs the Express app
  const app = express();


  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started Express server on port ${PORT}`);
  });


  // CORS middleware
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://43.204.219.136"],
    })
  );


  let users = [
    { name: "yogesh-new change", email: "yogesh@gmail.com" },
    { name: "virat", email: "virat@gmail.com" },
    { name: "dhoni", email: "dhoni@gmail.com" },
    { name: "deepak", email: "deepak@gmail.com" },
    { name: "rahul", email: "rahul@gmail.com" },
  ];


  app.get("/api/users", (req, res) => {
    res.status(200).json({
      status: true,
      users,
      // Debug info: which worker and CPU served the request
      workerPid: process.pid, // Worker process ID
      cpu: process.env.NODE_UNIQUE_ID || 0, // NODE_UNIQUE_ID is set by cluster for each worker
    });
  });


  // Demo upload endpoint using multer S3
  app.post("/api/demo-upload", avatarUpload.single("file"), (req, res) => {
    const avatarUrl = req.file.location;
    res.status(200).json({
      status: true,
      message: "File uploaded successfully",
      file: req.file,
      avatarUrl,
    });
  });
}



