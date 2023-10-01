import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import uploadRoutes from "./routes/uploads.js";
import homeRoute from "./routes/home.js";

dotenv.config();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "videos" directory
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Routes
app.use("/api", homeRoute);
app.use("/api/uploads", uploadRoutes);

// Error handler route
app.use(errorHandler);

// Listen to the requests
app.listen(port, () => {
  // connect to DB
  connectDB();
  console.log("Server listensing on port", port);
});
