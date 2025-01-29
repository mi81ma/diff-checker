import React from 'react';
import { DiffStats } from '../types';

interface StatusBarProps {
  stats: DiffStats;
}

const StatusBar: React.FC<StatusBarProps> = ({ stats }) => {
  return (
    <div className="bg-gray-700 text-white px-4 py-2 text-sm flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-green-500 mr-1">+{stats.additions}</span>
          <span className="text-gray-400">additions</span>
        </div>
        <div className="flex items-center">
          <span className="text-red-500 mr-1">-{stats.deletions}</span>
          <span className="text-gray-400">deletions</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">{stats.changes}</span>
          <span className="text-gray-400">changes</span>
        </div>
      </div>
      <div className="text-gray-400">
        Total: {stats.additions + stats.deletions + stats.changes} lines
      </div>
    </div>
  );
};

export default StatusBar;
