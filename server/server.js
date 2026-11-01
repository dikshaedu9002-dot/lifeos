
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import dns from "node:dns";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config({ path: "./server/.env" });
console.log(
  "Loaded MongoDB host:",
  process.env.MONGODB_URI?.split("@")[1]?.split("/")[0]
);

// Temporary DNS workaround for MongoDB Atlas
dns.setServers(["8.8.8.8"]);

console.log("DNS servers:", dns.getServers());

const app = express();

// Create an HTTP server for Express and Socket.IO
const httpServer = createServer(app);

// Allow local development and deployed Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://lifeos-blond-pi.vercel.app",
];

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make Socket.IO available to API routes
app.set("io", io);

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// Parse JSON request bodies
app.use(express.json({ limit: "10kb" }));

// Rate limiter to prevent excessive API requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.json({
    message: "LifeOS REST API is running",
  });
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

// Handle unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Connect MongoDB and start HTTP + WebSocket server
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "lifeos",
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    httpServer.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
      console.log("Socket.IO server ready");
    });
  })
  .catch((error) => {
  console.error("MongoDB connection failed:", error.message);
  console.error("Error name:", error.name);
  console.error("Error code:", error.code);
  console.error("Full error details:", error);
});