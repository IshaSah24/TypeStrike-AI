import express from "express";
import { getDashboard, getGame } from "../controller/dashboard.controller.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/game/:id", getGame);

export default router;

