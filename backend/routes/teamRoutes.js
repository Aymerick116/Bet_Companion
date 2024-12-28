import express from "express";
import { getTeam ,getHeadToHead} from "../controllers/teamsController.js";

const router = express.Router();

// Route for fetching a single team's details
router.get("/:teamId", getTeam);

// Route for fetching head-to-head statistics
router.get("/head-to-head/:team1Id/:team2Id", getHeadToHead);

export default router;
