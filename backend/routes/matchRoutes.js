import express from "express";
import { getMatchesToday, getUpcomingMatches, getSingleMatch } from "../controllers/matchesController.js";


const router = express.Router();

router.get("/today", getMatchesToday);
router.get("/upcoming", getUpcomingMatches);
router.get("/:matchId", getSingleMatch);

export default router;
