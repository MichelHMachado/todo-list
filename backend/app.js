import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import sequelize from "./database.js";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection failed:", error));

const privateKey = fs.readFileSync("./certs/private-key.pem", "utf8");
const certificate = fs.readFileSync("./certs/public-certificate.pem", "utf8");

const credentials = { key: privateKey, cert: certificate };

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
