import { catchAsync } from "../utils/TryCatchWrapper.js";
import { findById } from "../DAO/user.dao.js";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new Error("Not authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

export const getDashboard = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const games = user.games || [];
    const totalGames = games.length;
    
    if (totalGames === 0) {
      return res.status(200).json({
        totalGames: 0,
        avgWpm: 0,
        avgAccuracy: 0,
        bestWpm: 0,
        lastMatches: [],
      });
    }

    const avgWpm = Math.round(
      games.reduce((sum, g) => sum + (g.wpm || 0), 0) / totalGames
    );
    const avgAccuracy = Math.round(
      games.reduce((sum, g) => sum + (g.accuracy || 0), 0) / totalGames
    );
    const bestWpm = Math.max(...games.map((g) => g.wpm || 0));

    const lastMatches = games
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20)
      .map((g) => ({
        id: g.id,
        mode: g.mode,
        wpm: g.wpm,
        accuracy: g.accuracy,
        position: g.position,
        date: g.date,
      }));

    res.status(200).json({
      totalGames,
      avgWpm,
      avgAccuracy,
      bestWpm,
      lastMatches,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

export const getGame = catchAsync(async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;
    const user = await findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const game = user.games.find((g) => g.id === id);
    
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    let wordErrors = {};
    if (game.wordErrors) {
      if (game.wordErrors instanceof Map) {
        for (const [word, count] of game.wordErrors.entries()) {
          wordErrors[word] = count;
        }
      } else if (typeof game.wordErrors === 'object') {
        wordErrors = game.wordErrors;
      }
    }
    const sortedErrors = Object.entries(wordErrors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);

    res.status(200).json({
      ...game.toObject(),
      recommendedWords: sortedErrors,
    });
  } catch (error) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({ message: "Authentication required" });
    }
    throw error;
  }
});

