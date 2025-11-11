// index.js (or server.js) — corrected version
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './src/config/mongo.config.js';
import authRoutes from './src/routes/auth.route.js';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from './src/middleware/globalError.middleware.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http'  ;

dotenv.config();

const PORT = process.env.PORT || 5000; // fallback port for local dev
const app = express();

// create the raw http server and pass it to socket.io
const server = http.createServer(app);

// pass CORS options to Socket.IO itself (so websockets/polling allowed)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  },
  // path: '/socket.io' // default path; only change if you configured a custom client path
});

// Express middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// attach routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => res.send('Welcome to the API'));






// SOCKET.IO -------------------------------------------------

// Keep current authoritative words on server
// in top-level where you set up socket.io
let currentWords = [];
const players = {}; // { socketId: { name, wordIndex, charIndex, wpm, lastSeen } }

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  // Optionally set a display name (client can emit 'setName')
  socket.on('setName', ({ name }) => {
    players[socket.id] = players[socket.id] || {};
    players[socket.id].name = name || `P-${socket.id.slice(0,4)}`;
    players[socket.id].lastSeen = Date.now();
    io.emit('playersUpdate', players);
  });

  // Send current words to this socket on connect
  if (currentWords.length) {
    socket.emit('wordsBroadcast', { words: currentWords, source: 'server' });
  }

  // When any client sends words -> server becomes authoritative and resets players progress
  socket.on('sendWords', (payload) => {
    if (!payload || !Array.isArray(payload.words)) {
      socket.emit('error', { msg: 'Invalid sendWords payload' });
      return;
    }
    const words = payload.words.map(String).slice(0, 200);
    currentWords = words;

    // reset players progress
    Object.keys(players).forEach((id) => {
      players[id] = { ...players[id], wordIndex: 0, charIndex: 0, wpm: 0, lastSeen: Date.now() };
    });

    io.emit('wordsBroadcast', { words: currentWords, source: 'server' });
    io.emit('playersUpdate', players); // inform everyone progress reset
    socket.emit('sendWordsAck', { ok: true, receivedCount: words.length });
  });

  // Update progress events from clients (throttled on client side is recommended)
  // payload: { wordIndex: number, charIndex: number, wpm: number, name?: string }
  socket.on('updateProgress', (payload) => {
    if (!payload) return;
    players[socket.id] = {
      ...(players[socket.id] || {}),
      name: payload.name || players[socket.id]?.name || `P-${socket.id.slice(0,4)}`,
      wordIndex: typeof payload.wordIndex === 'number' ? payload.wordIndex : players[socket.id]?.wordIndex || 0,
      charIndex: typeof payload.charIndex === 'number' ? payload.charIndex : players[socket.id]?.charIndex || 0,
      wpm: typeof payload.wpm === 'number' ? payload.wpm : players[socket.id]?.wpm || 0,
      lastSeen: Date.now(),
    };

    // broadcast players state to everyone (could throttle server-side for heavy load)
    io.emit('playersUpdate', players);
  });

  // cleanup on disconnect
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
    delete players[socket.id];
    io.emit('playersUpdate', players);
  });
});



// -----------------------------------------------------------


// Global error handler last
app.use(globalErrorHandler);

// IMPORTANT: start the HTTP server that has socket.io attached
server.listen(PORT, () => {
  connectDb();
  console.log(`Server running at http://localhost:${PORT}`);
});
