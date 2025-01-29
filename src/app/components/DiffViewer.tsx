"use client";

import React from 'react';
import { DiffResult } from '../types';

interface DiffViewerProps {
  diffs: DiffResult[];
}

const DiffViewer: React.FC<DiffViewerProps> = ({ diffs }) => {
  const getLineColor = (type: DiffResult['type']): string => {
    switch (type) {
      case 'add':
        return 'bg-green-900/30';
      case 'delete':
        return 'bg-red-900/30';
      case 'equal':
        return '';
      default:
        return '';
    }
  };

  const getLinePrefix = (type: DiffResult['type']): string => {
    switch (type) {
      case 'add':
        return '+';
      case 'delete':
        return '-';
      case 'equal':
        return ' ';
      default:
        return ' ';
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-gray-900 text-white font-mono text-sm">
      <table className="w-full border-collapse">
        <tbody>
          {diffs.map((diff, index) => (
            <tr key={index} className={`${getLineColor(diff.type)} hover:bg-gray-800/50`}>
              <td className="py-0.5 px-2 text-gray-500 select-none w-[50px] text-right border-r border-gray-700 font-mono">
                {diff.lineNumber}
              </td>
              <td className="py-0.5 px-2 select-none w-[30px] text-center border-r border-gray-700">
                <span className={`
                  ${diff.type === 'add' ? 'text-green-500' : ''}
                  ${diff.type === 'delete' ? 'text-red-500' : ''}
                  ${diff.type === 'equal' ? 'text-gray-500' : ''}
                `}>
                  {getLinePrefix(diff.type)}
                </span>
              </td>
              <td className="py-0.5 px-4 whitespace-pre overflow-x-auto">
                {diff.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiffViewer;
