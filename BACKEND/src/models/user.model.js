import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
// ------------------------------ OTHER FEATURES
  wrongWords: {
    type: [String],
    default: [],
  },

  points: {
    type: Number,
    default: 0,
  },

  level: {
    type: Number,
    default: 1,
  },

  typingHistory: [
    {
      wpm: Number,
      accuracy: Number,
      date: { type: Date, default: Date.now },
    },
  ],

  badges: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
