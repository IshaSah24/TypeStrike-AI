import { catchAsync } from "../utils/TryCatchWrapper.js";
import { findById, saveTypingHistory, saveRaceHistory, getTypingHistory, getRaceHistory } from "../DAO/user.dao.js";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new Error("Not authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

export const saveTypingResult = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { wpm, accuracy, errors, correctChars, incorrectChars, totalChars, time, mode, wordCount, words, wordErrors } = req.body;

    if (!wpm || !accuracy || time === undefined) {
      return res.status(400).json({ message: "WPM, accuracy, and time are required" });
    }

    const result = await saveTypingHistory(userId, {
      wpm,
      accuracy,
      errors: errors || 0,
      correctChars: correctChars || 0,
      incorrectChars: incorrectChars || 0,
      totalChars: totalChars || 0,
      time,
      mode: mode || 'words',
      wordCount: wordCount || 0,
    });

    const user = await findById(userId);
    if (user) {
      const crypto = await import('crypto');
      user.games.push({
        id: crypto.randomUUID(),
        mode: 'solo',
        words: words || [],
        wpm,
        accuracy,
        errors: errors || 0,
        correctChars: correctChars || 0,
        incorrectChars: incorrectChars || 0,
        durationMs: time * 1000,
        position: null,
        opponents: [],
        wordErrors: wordErrors || {},
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Typing result saved successfully",
      result,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

export const getTypingResults = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const history = await getTypingHistory(userId);
    
    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

export const saveRaceResult = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { roomId, roomName, wpm, accuracy, errors, position, totalPlayers } = req.body;

    if (!roomId || !wpm || !accuracy) {
      return res.status(400).json({ message: "Room ID, WPM, and accuracy are required" });
    }

    const result = await saveRaceHistory(userId, {
      roomId,
      roomName: roomName || "Untitled Room",
      wpm,
      accuracy,
      errors: errors || 0,
      position: position || 0,
      totalPlayers: totalPlayers || 1,
      finishedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Race result saved successfully",
      result,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

export const getRaceResults = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const history = await getRaceHistory(userId);
    
    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

