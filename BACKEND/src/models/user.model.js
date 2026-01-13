import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,   
  },
  typingHistory: [
    {
      wpm: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
      errors: {
        type: Number,
        default: 0,
      },
      correctChars: {
        type: Number,
        default: 0,
      },
      incorrectChars: {
        type: Number,
        default: 0,
      },
      totalChars: {
        type: Number,
        default: 0,
      },
      time: {
        type: Number,
        required: true,
      },
      mode: {
        type: String,
        enum: ['words', 'time', 'quote', 'numbers'],
        default: 'words',
      },
      wordCount: {
        type: Number,
        default: 0,
      },
      date: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
  raceHistory: [
    {
      roomId: String,
      roomName: String,
      wpm: Number,
      accuracy: Number,
      errors: Number,
      position: Number,
      totalPlayers: Number,
      finishedAt: Date,
      date: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
  games: [
    {
      id: {
        type: String,
        default: function() {
          const { randomUUID } = require('crypto');
          return randomUUID();
        },
      },
      mode: {
        type: String,
        enum: ['solo', 'multiplayer', 'bot'],
        required: true,
      },
      roomId: String,
      words: [String],
      wpm: Number,
      accuracy: Number,
      errors: Number,
      correctChars: Number,
      incorrectChars: Number,
      durationMs: Number,
      date: {
        type: Date,
        default: Date.now,
      },
      position: Number,
      opponents: [
        {
          name: String,
          wpm: Number,
          accuracy: Number,
          isBot: Boolean,
        },
      ],
      wordErrors: {
        type: Map,
        of: Number,
        default: {},
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
