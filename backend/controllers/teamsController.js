import { fetchTeamData, fetchHeadToHeadData } from "../services/teamServices.js";

export const getTeam = async (req, res) => {
    const { teamId } = req.params;

    try {
        const teamData = await fetchTeamData(teamId);

        // Log the raw data for debugging
        console.log("Raw Team Data:", teamData);

        // Format the response based on the raw data structure
        const formattedTeamData = {
            id: teamData.id || null,
            name: teamData.name || "Unknown",
            country: teamData.country?.name || "Unknown",
            stadium: {
                id: teamData.stadium?.id || null,
                name: teamData.stadium?.name || "Unknown",
                city: teamData.stadium?.city || "Unknown"
            },
            isNation: teamData.is_nation || false
        };

        res.status(200).json({ success: true, data: formattedTeamData });
    } catch (error) {
        console.error("Error fetching team data:", error.message);
        res.status(500).json({
            success: false,
            message: `Failed to fetch data for team ${teamId}`,
            error: error.message,
        });
    }
};

export const getHeadToHead = async (req, res) => {
    const { team1Id, team2Id } = req.params;

    try {
        // Fetch raw data from the service
        const headToHeadData = await fetchHeadToHeadData(team1Id, team2Id);

        // Log the raw data to verify structure
        

        // Format the response based on the corrected structure
        const formattedData = {
            team1: {
                id: headToHeadData.team1.id || null,
                name: headToHeadData.team1.name || "Unknown",
                wins: headToHeadData.stats.overall.overall_team1_wins || 0,
                scored: headToHeadData.stats.overall.overall_team1_scored
                
            },
            team2: {
                id: headToHeadData.team2.id || null,
                name: headToHeadData.team2.name || "Unknown",
                wins: headToHeadData.stats.overall.overall_team2_wins  || 0,
                scored: headToHeadData.stats.overall.overall_team2_scored
                
            },
            totalMatches: headToHeadData.stats.overall.overall_games_played || 0,
            draws: headToHeadData.stats.overall.overall_draws || 0,
        };
        // Respond with the formatted data
        res.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        console.error("Error fetching head-to-head data:", error.message);
        res.status(500).json({
            success: false,
            message: `Failed to fetch head-to-head data for teams ${team1Id} and ${team2Id}`,
            error: error.message,
        });
    }
};