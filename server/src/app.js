import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import debateRoutes from "./routes/debate.routes.js";

const app = express();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5174",
  "http://localhost:5173",
  "http://frontend:5173"
].map((o) => (o ? o.replace(/^\"|\"$/g, "") : o));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);

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
