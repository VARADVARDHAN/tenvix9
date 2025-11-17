
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-blue-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-200">{title}</h3>
      </div>
      <div className="text-gray-400 space-y-3">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
