import fetch from "node-fetch";

export async function getAllMatches() {
    const API_URL = "https://api.soccerdataapi.com/match-previews-upcoming/?auth_token=fed7682773eb539ede8dfe9b5cdd5ac94b2b4790";

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Standardize the data format
        return data.results.flatMap(league => 
            league.match_previews.map(match => ({
                id: match.id,
                date: match.date,
                time: match.time,
                league: league.league_name,
                country: league.country.name,
                home_team: match.teams.home.name,
                away_team: match.teams.away.name,
                excitement_rating: match.excitement_rating,
            }))
        );
    } catch (error) {
        console.error("Error fetching all matches:", error.message);
        throw error;
    }
}
