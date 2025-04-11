import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './app/config/db.js';
import userRoutes from "./app/routes/userRoutes.js";
import taskRoutes from "./app/routes/taskRoutes.js";
import { errorHandler } from "./app/middlewares/errorMiddleWare.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);



const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})