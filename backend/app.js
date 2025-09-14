import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import dispensaryRoutes from "./routes/dispensaryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/dispensaries", dispensaryRoutes);

app.get("/", (req, res) => res.send("HMS API running"));

export default app;
