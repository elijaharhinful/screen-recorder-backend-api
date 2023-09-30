import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import videoRoutes from './routes/videos.js';
import homeRoute from './routes/home.js';

dotenv.config();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", homeRoute)
app.use("/api/videos", videoRoutes);

// Error handler route
app.use(errorHandler);

// Listen to the requests
app.listen(port, () => {
  // connect to DB
  connectDB();
  console.log("Server listensing on port", port);
});
