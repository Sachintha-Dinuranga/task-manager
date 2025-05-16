import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./auth/passport.js"; // initialize passport strategy

import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // ✅ Must be true in production (Vercel uses HTTPS)
      sameSite: "None", // ✅ Required for cross-origin cookies
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.use("/auth", (await import("./routes/authRoutes.js")).default);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// // Root Route
// app.get("/", (req, res) => {
//   res.send("Task Management API is running");
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
