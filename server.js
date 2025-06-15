import express from "express";
import cors from "cors";
import { avatarUpload } from "./s3Upload.js";
const PORT = 5001;
const app = express();
// middleware for cors 
app.use(
    cors({
        origin: ["http://localhost:5173","http://3.110.47.130"],
    })
);
app.listen(PORT, () => {
    console.log(`server is started on port ${PORT}`);
});
let users = [
    { name: "Yogesh", email: "yogesh@gmail.com" },
    { name: "virat", email: "virat@gmail.com" },
    { name: "dhoni", email: "dhoni@gmail.com" },
    { name: "deepak", email: "deepak@gmail.com" },
    
    { name: "ronak", email: "ronak@gmail.com" },

];
app.get("/api/users", (req, res) => {
    res.status(200).json({
        status: true,
        users,
    });
});

app.post("/api/demo-upload", avatarUpload.single("file"), (req, res) => {
  const avatarUrl = req.file.location;
  res.status(200).json({
    status: true,
    message: "File uploaded successfully",
    file: req.file,
    avatarUrl,
  });
});
