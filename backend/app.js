import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import sequelize from "./database.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import fs from "fs";
import { initModels } from "./models/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

initModels();

sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection failed:", error));

http.createServer(app).listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
