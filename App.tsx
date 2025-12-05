import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<MatchesPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/chat/:userId" element={<ChatPage />} />
            <Route path="/chats" element={<div className="p-8 text-center text-slate-500">Inbox functionality is simplified for this demo. Please start a chat from the Matches page.</div>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;