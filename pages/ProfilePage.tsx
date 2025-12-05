import React from 'react';
import { MY_PROFILE } from '../constants';
import ProfileCard from '../components/ProfileCard';

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">My Profile</h1>
      <ProfileCard user={MY_PROFILE} showActions={false} />
      
      <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="font-semibold text-indigo-900 mb-2">Why keep your profile updated?</h3>
        <p className="text-sm text-indigo-800">
          Our AI matching algorithm uses your skills offered, skills wanted, and bio to find the perfect learning partners for you. The more detail you provide, the better your matches!
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;