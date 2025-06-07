import express from "express";
import cors from "cors";
const PORT = 5000;
const app = express();
// middleware for cors
app.use(
    cors({
        origin: ["http://localhost:5173"],
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
];
app.get("/api/users", (req, res) => {
    res.status(200).json({
        status: true,
        users,
    });
});
