import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import debateRoutes from "./routes/debate.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/debates", debateRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Debate Mapper API is running" });
});

export default app;
