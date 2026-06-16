import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { setupSocket } from "./socket.js";
import { Db_Connection } from "./dbConfig/db.config.js";

const PORT = process.env.PORT || 5000;

// DB connection
Db_Connection();

// Create HTTP server
const server = http.createServer(app);

// Socket.IO
const socketAllowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5174",
  "http://localhost:5173",
  "http://frontend:5173"
].map((o) => (o ? o.replace(/^\"|\"$/g, "") : o));

const io = new Server(server, {
  cors: {
    origin: socketAllowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Setup socket logic
setupSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
