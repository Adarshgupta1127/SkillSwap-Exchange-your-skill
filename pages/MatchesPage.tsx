import React, { useEffect, useState } from 'react';
import { User, MatchResult } from '../types';
import { MOCK_USERS, MY_PROFILE } from '../constants';
import { calculateMatches } from '../services/geminiService';
import ProfileCard from '../components/ProfileCard';
import { Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      // Simulate network delay for effect
      setLoading(true);
      try {
        const results = await calculateMatches(MY_PROFILE, MOCK_USERS);
        // Sort by score
        setMatches(results.sort((a, b) => b.score - a.score));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="text-amber-500 fill-amber-500" />
          AI Suggested Matches
        </h1>
        <p className="text-slate-600 mt-2">
          Based on your profile, we think you'd make a great skill exchange team with these people.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Analyzing skills and finding best fits...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const user = MOCK_USERS.find(u => u.id === match.userId);
            if (!user) return null;
            return (
              <ProfileCard 
                key={user.id} 
                user={user} 
                matchData={match} 
                onChat={handleChat} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchesPage;