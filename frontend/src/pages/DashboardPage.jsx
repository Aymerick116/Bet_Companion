import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const DashboardPage = () => {
  const [matches, setMatches] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/matches/today');
        const matchData = response.data?.data || []; // Fallback to empty array
        setMatches(matchData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch matches.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-lg font-medium text-gray-400">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-lg font-medium text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-lg font-medium text-gray-400">No matches happening today.</p>
      </div>
    );
  }

  // Group matches by league
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.league]) {
      acc[match.league] = [];
    }
    acc[match.league].push(match);
    return acc;
  }, {});

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Today's Matches</h1>
        <p className="text-sm text-gray-400">Saturday, 28 December 2024</p>
      </header>

      <div className="space-y-10">
        {Object.keys(groupedMatches).map((league) => (
          <div key={league} className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold uppercase">{league}</h2>
              <p className="text-sm text-gray-400">Matchday {groupedMatches[league][0].matchday || 'N/A'}</p>
            </div>
            <ul>
              {groupedMatches[league].map((match) => (
                <li
                key={match.id}
                className="flex justify-between items-center p-4 border-b border-gray-700 last:border-b-0"
              >
                <Link to={`/matches/${match.id}`} className="flex justify-between items-center w-full">
                  <div className="flex flex-col">
                    <span className="font-medium">{match.home_team}</span>
                    <span className="text-gray-400 text-sm">vs</span>
                    <span className="font-medium">{match.away_team}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{match.time}</span>
                  </div>
                </Link>
              </li>
                // <li
                //   key={match.id}
                //   className="flex justify-between items-center p-4 border-b border-gray-700 last:border-b-0"
                // >
                //   <div className="flex flex-col">
                //     <span className="font-medium">{match.home_team}</span>
                //     <span className="text-gray-400 text-sm">vs</span>
                //     <span className="font-medium">{match.away_team}</span>
                //   </div>
                //   <div className="text-right">
                //     <span className="text-sm text-gray-400">{match.time}</span>
                //   </div>
                // </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
