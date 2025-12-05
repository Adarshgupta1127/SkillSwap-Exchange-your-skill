import React from 'react';
import { RefreshCw, MessageSquare, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <RefreshCw className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          SkillSwap
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${isActive('/')}`}
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden md:inline">Matches</span>
        </Link>
        <Link 
          to="/chats" 
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${isActive('/chats')}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">Messages</span>
        </Link>
        <Link 
          to="/profile" 
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${isActive('/profile')}`}
        >
          <UserIcon className="w-4 h-4" />
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;