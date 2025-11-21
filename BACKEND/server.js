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

import typingRoutes from "./src/routes/typing.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/typing", typingRoutes);
app.get("/", (req, res) => res.send("Welcome to the API"));

// SOCKET.IO -------------------------------------------------

const rooms = new Map();
const roomCodes = new Map(); // Map to store roomId -> roomCode

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code.toUpperCase();
}

function makeRoomId() {
  const roomId = `room_${uuidv4()}`;
  let roomCode = generateRoomCode();

  while (Array.from(roomCodes.values()).includes(roomCode)) {
    roomCode = generateRoomCode();
  }

  roomCodes.set(roomId, roomCode.toUpperCase());
  return roomId;
}

function getRoomCode(roomId) {
  return roomCodes.get(roomId) || null;
}

function getRoomIdByCode(code) {
  const normalized = String(code || "")
    .trim()
    .toUpperCase();
  for (const [roomId, roomCode] of roomCodes.entries()) {
    if (roomCode === normalized) return roomId;
  }
  return null;
}

io.on("connection", (socket) => {
  console.log("Socket Connected");

  // TODO :
  // The  connection  should  start after creating  the  room
  // creating  the room ✅
  //    - initializing  the  words✅
  // Joining the players  insode the room✅
  // broadcasting  the words after starting  the game✅
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
      const incomingSettings = payload?.gameSettings || {};
      const gameSettings = {
        mode: incomingSettings.mode || "words",
        option:
          incomingSettings.option !== undefined ? incomingSettings.option : 10,
        wordCount:
          incomingSettings.wordCount ||
          (incomingSettings.mode === "words"
            ? incomingSettings.option || 10
            : 30),
        timeDuration: incomingSettings.timeDuration || 15,
      };

      rooms.set(roomId, {
        id: roomId,
        name: roomName,
        ownerId: socket.id,
        users: new Map(),
        words: [],
        state: "waiting",
        passageId: null,
        createdAt: Date.now(),
        gameSettings,
        wordsLocked: false,
        startTimestamp: null,
        results: [],
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

      const roomCode = getRoomCode(roomId);
      ack?.(null, {
        id: roomId,
        code: roomCode,
        name: roomName,
        ownerId: socket.id,
        users: Array.from(rooms.get(roomId).users.values()),
        words: rooms.get(roomId).words,
        gameSettings,
      });

      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(rooms.get(roomId).users.values()),
        ownerId: rooms.get(roomId).ownerId,
        state: rooms.get(roomId).state,
        gameSettings,
      });

      console.log(`Room created: ${roomId} by ${socket.id}`);
    } catch (err) {
      console.error("createRoom error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("sendWords", (payload, ack) => {
    try {
      const { roomId, words } = payload || {};
      if (!roomId) {
        return ack?.({ error: "Room ID required" });
      }
      if (!rooms.has(roomId)) {
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
      room.wordsLocked = false;

      ack?.(null, { success: true, wordsCount: cleanedWords.length });
      io.to(roomId).emit("wordsPrepared", {
        roomId,
        words: cleanedWords,
      });
      console.log(
        `Words updated for room ${roomId} by ${socket.id} (${cleanedWords.length} words)`
      );
    } catch (err) {
      console.error("sendWords error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("startRace", (payload, ack) => {
    try {
      const { roomId, countdownMs = 3000, wordCount = 50 } = payload || {};
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Room not found" });
      }
      const room = rooms.get(roomId);

      if (socket.id !== room.ownerId) {
        return ack?.({ error: "Only owner can start the race" });
      }

      if (room.users.size < 2) {
        return ack?.({ error: "Need at least 2 players to start the race" });
      }

      if (!Array.isArray(room.words) || room.words.length === 0) {
        return ack?.({
          error: "Room words are not set. Please configure the race first.",
        });
      }

      room.wordsLocked = true;

      const startTimestamp = Date.now() + Math.max(1000, Number(countdownMs));
      room.state = "countdown";
      room.startTimestamp = startTimestamp;
      room.results = [];
      room.raceStarted = false;

      for (const [sid, user] of room.users.entries()) {
        user.progress = 0;
        user.wordIndex = 0;
        user.charIndex = 0;
        user.wpm = 0;
        user.errors = 0;
        user.accuracy = 100;
        user.correctChars = 0;
        user.incorrectChars = 0;
        user.finishedAt = null;
        user.status = "ready";
        user.position = null;
      }

      io.to(roomId).emit("raceStart", {
        roomId,
        words: room.words,
        startTimestamp,
        countdownMs,
        gameSettings: room.gameSettings,
      });

      setTimeout(() => {
        if (!rooms.has(roomId)) return;
        const r = rooms.get(roomId);
        r.state = "running";
        r.raceStarted = true;
        io.to(roomId).emit("raceRunning", {
          roomId,
          startedAt: startTimestamp,
        });
      }, Math.max(0, startTimestamp - Date.now()));

      ack?.(null, {
        success: true,
        startTimestamp,
        countdownMs,
      });
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
      const roomCode = getRoomCode(roomId);
      ack?.(null, {
        id: room.id,
        code: roomCode,
        name: room.name,
        ownerId: room.ownerId,
        users: Array.from(room.users.values()),
        words: room.words,
        state: room.state,
        gameSettings: room.gameSettings,
      });

      socket
        .to(roomId)
        .emit("userJoined", { id: socket.id, user: JoiningUserData });
      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
        gameSettings: room.gameSettings,
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
        gameSettings: room.gameSettings,
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
        gameSettings: room.gameSettings,
      });

      ack?.(null, { success: true });

      console.log(`Host ${socket.id} removed ${targetUserId} from ${roomId}`);

      if (room.users.size === 0) {
        rooms.delete(roomId);
        roomCodes.delete(roomId);
        console.log(`Room ${roomId} deleted (empty after kick)`);
      }
    } catch (err) {
      console.error("removeUserFromRoom error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("updateProgress", (payload) => {
    try {
      const {
        roomId,
        wordIndex,
        charIndex,
        wpm,
        errors,
        accuracy,
        correctChars,
        incorrectChars,
      } = payload || {};
      if (!roomId || !rooms.has(roomId)) {
        console.warn("updateProgress: Room not found", roomId);
        return;
      }

      const room = rooms.get(roomId);
      const user = room.users.get(socket.id);
      if (!user) return;
      if (room.state !== "running") return;

      const totalWords = room.words.length;
      const currentWordProgress =
        charIndex / (room.words[wordIndex]?.length || 1);
      const progressPercent =
        totalWords > 0
          ? Math.min(
              100,
              Math.max(
                0,
                ((wordIndex + currentWordProgress) / totalWords) * 100
              )
            )
          : 0;

      user.progress = progressPercent;
      user.wordIndex = wordIndex || 0;
      user.charIndex = charIndex || 0;
      user.wpm = wpm || 0;
      user.errors = errors || 0;
      user.accuracy = accuracy || 100;
      user.correctChars = correctChars || 0;
      user.incorrectChars = incorrectChars || 0;

      io.to(roomId).emit("playerProgress", {
        userId: socket.id,
        name: user.name,
        progress: user.progress,
        wordIndex: user.wordIndex,
        charIndex: user.charIndex,
        wpm: user.wpm,
        errors: user.errors,
        accuracy: user.accuracy,
        correctChars: user.correctChars,
        incorrectChars: user.incorrectChars,
      });

      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
      });
    } catch (err) {
      console.error("updateProgress error:", err);
    }
  });

  socket.on("raceFinish", (payload, ack) => {
    try {
      const {
        roomId,
        wpm,
        accuracy,
        errors,
        correctChars,
        incorrectChars,
        totalChars,
        time,
      } = payload || {};
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Room not found" });
      }

      const room = rooms.get(roomId);
      const user = room.users.get(socket.id);
      if (!user) {
        return ack?.({ error: "User not in room" });
      }

      user.finishedAt = Date.now();
      user.wpm = wpm || 0;
      user.accuracy = accuracy || 0;
      user.errors = errors || 0;
      user.correctChars = correctChars || 0;
      user.incorrectChars = incorrectChars || 0;
      user.status = "finished";

      const finishedUsers = Array.from(room.users.values())
        .filter((u) => u.finishedAt)
        .sort((a, b) => {
          if (b.wpm !== a.wpm) return b.wpm - a.wpm;
          if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;

          return a.finishedAt - b.finishedAt;
        });

      const position = finishedUsers.findIndex((u) => u.id === socket.id) + 1;
      user.position = position;

      room.results.push({
        userId: socket.id,
        name: user.name,
        wpm: user.wpm,
        accuracy: user.accuracy,
        errors: user.errors,
        correctChars: user.correctChars,
        incorrectChars: user.incorrectChars,
        position: user.position,
        finishedAt: user.finishedAt,
      });

      // Broadcast finish to all users
      io.to(roomId).emit("playerFinished", {
        userId: socket.id,
        name: user.name,
        wpm: user.wpm,
        accuracy: user.accuracy,
        errors: user.errors,
        correctChars: user.correctChars,
        incorrectChars: user.incorrectChars,
        position: user.position,
        finishedAt: user.finishedAt,
      });

      const allFinished = Array.from(room.users.values()).every(
        (u) => u.finishedAt || u.id === socket.id
      );
      if (allFinished && room.users.size > 1) {
        const finalResults = Array.from(room.users.values())
          .map((u) => ({
            userId: u.id,
            name: u.name,
            wpm: u.wpm || 0,
            accuracy: u.accuracy || 0,
            errors: u.errors || 0,
            correctChars: u.correctChars || 0,
            incorrectChars: u.incorrectChars || 0,
            position: u.position || room.users.size,
            finishedAt: u.finishedAt || Date.now(),
          }))
          .sort((a, b) => {
            if (b.wpm !== a.wpm) return b.wpm - a.wpm;
            if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
            return a.finishedAt - b.finishedAt;
          })
          .map((r, idx) => ({ ...r, position: idx + 1 }));

        io.to(roomId).emit("raceComplete", {
          roomId,
          results: finalResults,
          gameSettings: room.gameSettings,
        });
        room.state = "completed";
      }

      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
        gameSettings: room.gameSettings,
      });

      ack?.(null, {
        success: true,
        position: user.position,
        totalPlayers: room.users.size,
      });

      console.log(
        `Player ${socket.id} finished in room ${roomId} at position ${position}`
      );
    } catch (err) {
      console.error("raceFinish error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("joinByCode", (payload, ack) => {
    try {
      const { code } = payload || {};
      const normalizedCode = String(code || "")
        .trim()
        .toUpperCase();
      console.log("code of  joiner ", normalizedCode);

      if (!normalizedCode) {
        return ack?.({ error: "Room code is required" });
      }

      const roomId = getRoomIdByCode(normalizedCode);
      if (!roomId || !rooms.has(roomId)) {
        return ack?.({ error: "Invalid room code" });
      }

      const room = rooms.get(roomId);
      const JoiningUserData = {
        id: socket.id,
        name: payload?.displayName || "Anonymous",
        avatar: payload?.avatar || null,
        isOwner: false,
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
        code: normalizedCode,
        name: room.name,
        ownerId: room.ownerId,
        users: Array.from(room.users.values()),
        words: room.words,
        state: room.state,
        gameSettings: room.gameSettings,
      });

      socket
        .to(roomId)
        .emit("userJoined", { id: socket.id, user: JoiningUserData });
      io.to(roomId).emit("roomUsers", {
        roomId,
        users: Array.from(room.users.values()),
        ownerId: room.ownerId,
        state: room.state,
        gameSettings: room.gameSettings,
      });

      console.log(`${socket.id} joined ${roomId} by code ${normalizedCode}`);
    } catch (err) {
      console.error("joinByCode error:", err);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);

    for (const [roomId, room] of rooms.entries()) {
      if (room.users.has(socket.id)) {
        room.users.delete(socket.id);

        if (room.ownerId === socket.id) {
          rooms.delete(roomId);
          roomCodes.delete(roomId);
          console.log(`Room ${roomId} deleted (owner left)`);
        } else {
          io.to(roomId).emit("userLeft", { id: socket.id });
          io.to(roomId).emit("roomUsers", {
            roomId,
            users: Array.from(room.users.values()),
            ownerId: room.ownerId,
            state: room.state,
            gameSettings: room.gameSettings,
          });
        }
      }
    }
  });
});

app.use(globalErrorHandler);

server.listen(PORT, () => {
  connectDb();
  console.log(`Server running at http://localhost:${PORT}`);
});
