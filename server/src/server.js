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
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT" , "DELETE" ]
  }
});

// Setup socket logic
setupSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
