// index.js (or server.js) — corrected version
import dotenv from "dotenv";
import express from "express";
import connectDb from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./src/middleware/globalError.middleware.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("Welcome to the API"));

// SOCKET.IO -------------------------------------------------

const rooms = new Map();

function makeRoomId() {
  return `room_${uuidv4()}`;
}

io.on("connection", (socket) => {
  console.log("Socket Connected");

  // TODO :
  // The  connection  should  start after creating  the  room
  // creating  the room ✅
  //    - initializing  the  words✅
  // Joining the players  insode the room
  // broadcasting  the words after starting  the game
  //    - In  room  there  should be  atleast  2  people  (minimum)
  // user can  choose  the state  like ready/idle✅
  // host  can  remove the user from  the room ✅

  socket.on("createRoom", (payload, ack) => {
    try {
      const roomName = (payload?.name || "").trim();
      if (!roomName) {
        return ack?.({ error: "Room  name is required " });
      }
      const roomId = makeRoomId();

      rooms.set(roomId, {
        id: roomId,
        name: roomName,
        ownerId: socket.id,
        users: new Map(),
        words: [],
        state: "waiting",
        passageId: null,
        createdAt: Date.now(),
      });

      const creatorUser = {
        id: socket.id,
        name: payload?.displayName || "Anonymous",
        avatar: payload?.avatar || null,
        isOwner: true,
        progress: 0,
        wpm: 0,
        errors: 0,
        finishedAt: null,
        status: "ready",
      };

      rooms.get(roomId).users.set(socket.id, creatorUser);
      socket.join(roomId);

      ack?.(null, {
        id: roomId,
        name: roomName,
        ownerId: socket.id,
        users: Array.from(rooms.get(roomId).users.values()),
        words: rooms.get(roomId).words,
      });

      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(rooms.get(roomId).users.values()),
        ownerId: rooms.get(roomId).ownerId,
        state: rooms.get(roomId).state,
      });

      console.log(`Room created: ${roomId} by ${socket.id}`);
    } catch (err) {
      console.error("createRoom error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("sendWords", (payload, ack) => {
    try {
      // TODO  :
      // check if  the room  exist  while reciving the words and  assigning to any  room ✅
      // client passing the array verify  the type✅
      //  then add inside the room✅
      const { roomId, words } = payload || {};
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Room not found" });
      }

      if (!Array.isArray(words)) {
        return ack?.({ error: "Invalid words format" });
      }

      const room = rooms.get(roomId);
      //  side check
      if (socket.id !== room.ownerId) {
        return ack?.({ error: "Only owner can set  the  room  words" });
      }

      const cleanedWords = words
        .map((w) => String(w).trim())
        .filter(Boolean)
        .slice(0, 200);

      room.words = cleanedWords;

      ack?.(null, { success: true, wordsCount: cleanedWords.length });
      console.log(
        `Words updated for room ${roomId} by ${socket.id} (${cleanedWords.length} words)`
      );
    } catch (e) {
      console.error("sendWords error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("startRace", (payload, ack) => {
    try {
      const { roomId, countdownMs = 3000 } = payload || {};
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Room not found" });
      }
      const room = rooms.get(roomId);

      if (socket.id !== room.ownerId) {
        return ack?.({ error: "Only owner can start the race" });
      }
      if (!Array.isArray(room.words) || room.words.length === 0) {
        return ack?.({ error: "No words set for this room" });
      }

      room.wordsLocked = true;

      const startTimestamp = Date.now() + Math.max(1000, Number(countdownMs));
      room.state = "countdown";
      room.startTimestamp = startTimestamp;
      room.results = [];

      for (const [sid, user] of room.users.entries()) {
        user.progress = 0;
        user.wpm = 0;
        user.errors = 0;
        user.finishedAt = null;
        user.status = "ready";
      }

      io.to(roomId).emit("raceStart", {
        roomId,
        words: room.words,
        startTimestamp,
        countdownMs,
      });

      setTimeout(() => {
        if (!rooms.has(roomId)) return;
        const r = rooms.get(roomId);
        io.to(roomId).emit("raceRunning", {
          roomId,
          startedAt: startTimestamp,
        });
      }, Math.max(0, startTimestamp - Date.now()));
    } catch (err) {
      console.error("startRace error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("userJoins", (payload, ack) => {
    // TODO :
    // verify  room  id where  user  wants to  join✅
    // set  user's  data  and add  inside  the room's  user list✅
    // broadcast  the  user list  to  all  the  users  inside  the room✅

    try {
      const roomId = payload?.roomId;
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Enter  valid room  id " });
      }

      const room = rooms.get(roomId);

      const JoiningUserData = {
        id: socket.id,
        name: payload?.displayName || "Anonymous",
        avatar: payload?.avatar || null,
        isOwner: socket.id === room.ownerId,
        progress: 0,
        wpm: 0,
        errors: 0,
        finishedAt: null,
        status: "ready",
      };

      room.users.set(socket.id, JoiningUserData);
      socket.join(roomId);
      ack?.(null, {
        id: room.id,
        name: room.name,
        ownerId: room.ownerId,
        users: Array.from(room.users.values()),
        words: room.words,
        state: room.state,
      });

      socket.to(roomId).emit("userJoined", { id: socket.id, user: userObj });
      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
      });

      console.log(`${socket.id} joined ${roomId}`);
    } catch (err) {
      console.error("joinRoom error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("toggleReady", (payload, ack) => {
    try {
      const { roomId, ready } = payload || {};
      if (!roomId || !rooms.has(roomId))
        return ack?.({ error: "Room not found" });

      const room = rooms.get(roomId);
      const user = room.users.get(socket.id);
      if (!user) return ack?.({ error: "You are not in this room" });

      user.status = ready ? "ready" : "idle";

      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
      });

      ack?.(null, { success: true, status: user.status });
      console.log(`${socket.id} set ready=${!!ready} in ${roomId}`);
    } catch (err) {
      console.error("toggleReady error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("removeUserFromRoom", (payload, ack) => {
    try {
      const { roomId, targetUserId } = payload || {};
      if (!roomId || !rooms.has(roomId))
        return ack?.({ error: "Room not found" });

      const room = rooms.get(roomId);

      if (socket.id !== room.ownerId) {
        return ack?.({ error: "Only the host can remove users" });
      }

      if (!room.users.has(targetUserId)) {
        return ack?.({ error: "User not in this room" });
      }

      room.users.delete(targetUserId);
      const userSocket = io.sockets.sockets.get(targetUserId);
      if (userSocket) {
        userSocket.leave(roomId);
        userSocket.emit("kicked", { roomId, reason: "Removed by host" });
      }

      io.to(roomId).emit("userRemoved", { id: targetUserId });
      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
      });

      ack?.(null, { success: true });

      console.log(`Host ${socket.id} removed ${targetUserId} from ${roomId}`);

      if (room.users.size === 0) {
        rooms.delete(roomId);
        console.log(`Room ${roomId} deleted (empty after kick)`);
      }
    } catch (err) {
      console.error("removeUserFromRoom error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    delete players[socket.id];
    io.emit("playersUpdate", players);
  });
});

app.use(globalErrorHandler);

server.listen(PORT, () => {
  connectDb();
  console.log(`Server running at http://localhost:${PORT}`);
});
