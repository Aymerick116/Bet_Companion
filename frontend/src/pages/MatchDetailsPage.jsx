import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MatchDetailsPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`${'http://localhost:3001'}/matches/${matchId}`);
        setMatch(response.data.data);  // Access the match data under 'data'
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Failed to fetch match details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-lg font-medium text-gray-400">Loading match details...</p>
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

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{match.league}</h1>
        <p className="text-sm text-gray-400">Match Date: {match.date}</p>
      </header>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Flexbox to center and distribute team names */}
        <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center space-x-6">
          <span>{match.home_team}</span>
          <span className="text-lg font-bold text-gray-300">vs</span>
          <span>{match.away_team}</span>
        </h2>
        <p className="text-center text-gray-400 mb-4">{match.time}</p>
        <div className="space-y-4">
          <p>Country: {match.country}</p>
          <p>Excitement Rating: {match.excitement_rating || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
