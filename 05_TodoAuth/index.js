import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import userRoutes from "./app/routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));