import React from 'react';
import { User, MatchResult } from '../types';
import SkillBadge from './SkillBadge';
import { MessageCircle, Star } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  matchData?: MatchResult;
  onChat?: (userId: string) => void;
  showActions?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, matchData, onChat, showActions = true }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
      <div className="px-6 pb-6 -mt-12 relative">
        <div className="flex justify-between items-end">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover bg-slate-200"
            />
            {matchData && (
              <div className="flex flex-col items-end mb-2">
                 <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {matchData.score}% Match
                 </div>
              </div>
            )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
          <p className="text-slate-500 text-sm mt-1">{user.bio}</p>
          
          {matchData && (
             <p className="mt-3 text-sm text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-100">
               "{matchData.reason}"
             </p>
          )}

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Offers</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map(skill => (
                  <SkillBadge key={skill} skill={skill} type="offered" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Wants</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map(skill => (
                  <SkillBadge key={skill} skill={skill} type="wanted" />
                ))}
              </div>
            </div>
          </div>

          {showActions && onChat && (
            <button 
              onClick={() => onChat(user.id)}
              className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;