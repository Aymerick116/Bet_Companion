import { getAllMatches } from "../services/getAllMatches.js"

export const getMatchesToday = async (req, res) => {
    try {
        const allMatches = await getAllMatches();

        const today = new Date().toLocaleDateString("en-GB"); // Format as "DD/MM/YYYY"
        const todayMatches = allMatches.filter(match => match.date === today);

        res.status(200).json({ success: true, data: todayMatches });
    } catch (error) {
        console.error("Error fetching today's matches:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch today's matches" });
    }
};

export const getUpcomingMatches = async (req, res) => {
    try {
        const allMatches = await getAllMatches();

        const today = new Date().toLocaleDateString("en-GB"); // Format as "DD/MM/YYYY"
        const upcomingMatches = allMatches.filter(match => new Date(match.date) > new Date(today));

        res.status(200).json({ success: true, data: upcomingMatches });
    } catch (error) {
        console.error("Error fetching upcoming matches:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch upcoming matches" });
    }
};

export const getSingleMatch = async (req, res) => {
    const { matchId } = req.params;

    try {
        const allMatches = await getAllMatches();

        const match = allMatches.find(match => match.id === parseInt(matchId, 10));

        if (!match) {
            return res.status(404).json({ success: false, message: `Match with ID ${matchId} not found` });
        }

        res.status(200).json({ success: true, data: match });
    } catch (error) {
        console.error(`Error fetching match with ID ${matchId}:`, error.message);
        res.status(500).json({ success: false, message: "Failed to fetch match details" });
    }
};
