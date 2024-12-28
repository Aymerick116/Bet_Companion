import fetch from "node-fetch";

const API_BASE_URL = "https://api.soccerdataapi.com";
const AUTH_TOKEN = "fed7682773eb539ede8dfe9b5cdd5ac94b2b4790"; // Replace with your actual token

// Fetch team data
export const fetchTeamData = async (teamId) => {
    try {
        const API_URL = `${API_BASE_URL}/team/?team_id=${teamId}&auth_token=${AUTH_TOKEN}`;
        console.log("Fetching URL:", API_URL);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip"
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to fetch data for team ${teamId}: ${response.statusText}. Details: ${errorDetails}`);
        }

        const data = await response.json();
        return data; // Return the full team data
    } catch (error) {
        console.error("Error in fetchTeamData:", error.message);
        throw error;
    }
};

// Fetch head-to-head data
export const fetchHeadToHeadData = async (team1Id, team2Id) => {
    try {
        const API_URL = `${API_BASE_URL}/head-to-head/?team_1_id=${team1Id}&team_2_id=${team2Id}&auth_token=${AUTH_TOKEN}`;
        console.log("Fetching URL:", API_URL);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip"
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to fetch head-to-head data for teams ${team1Id} and ${team2Id}: ${response.statusText}. Details: ${errorDetails}`);
        }

        const data = await response.json();
        return data; // Return the raw response data
    } catch (error) {
        console.error("Error in fetchHeadToHeadData:", error.message);
        throw error;
    }
};