import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import runQuery from "./rag";
import router from "./router";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  transports: ["websocket"],
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use("/api", router);
io.on("connection", (socket) => {
  socket.on("chat", async (message) => {
    const response = await runQuery(message);
    io.emit("chat", response);
  });
});
io.listen(PORT as number);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
