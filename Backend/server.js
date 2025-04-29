require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");

const app = express();

// Connect to Database
connectDB().catch((err) => {
  console.error("Database connection failed:", err.message);
  process.exit(1); // Exit the app if the database connection fails
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});
