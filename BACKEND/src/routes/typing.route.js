import express from "express";
import { 
  saveTypingResult, 
  getTypingResults, 
  saveRaceResult, 
  getRaceResults 
} from "../controller/typing.controller.js";

const router = express.Router();

router.post("/save", saveTypingResult);
router.get("/history", getTypingResults);
router.post("/race/save", saveRaceResult);
router.get("/race/history", getRaceResults);

export default router;

