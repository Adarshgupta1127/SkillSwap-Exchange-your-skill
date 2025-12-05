import React from 'react';

interface SkillBadgeProps {
  skill: string;
  type: 'offered' | 'wanted';
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, type }) => {
  const styles = type === 'offered' 
    ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
    : "bg-indigo-100 text-indigo-800 border-indigo-200";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      {skill}
    </span>
  );
};

export default SkillBadge;