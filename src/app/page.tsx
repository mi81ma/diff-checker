"use client";

import { useState, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import DiffViewer from './components/DiffViewer';
import StatusBar from './components/StatusBar';
import { calculateDiff, calculateStats, debounce } from './utils/diffUtils';
import { DiffResult } from './types';

export default function Home() {
  const [leftCode, setLeftCode] = useState('');
  const [rightCode, setRightCode] = useState('');
  const [diffs, setDiffs] = useState<DiffResult[]>([]);

  const updateDiffs = useCallback(
    debounce<(left: string, right: string) => void>((left, right) => {
      const newDiffs = calculateDiff(left, right);
      setDiffs(newDiffs);
    }, 500),
    []
  );

  const handleLeftChange = (value: string) => {
    setLeftCode(value);
    updateDiffs(value, rightCode);
  };

  const handleRightChange = (value: string) => {
    setRightCode(value);
    updateDiffs(leftCode, value);
  };

  const stats = calculateStats(diffs);

  return (
    <main className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Diff Checker</h1>
      </header>

      <div className="flex-grow flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1 flex flex-col min-h-[300px]">
          <CodeEditor
            value={leftCode}
            onChange={handleLeftChange}
            placeholder="Enter original code here..."
            title="Original Code"
          />
        </div>
        <div className="flex-1 flex flex-col min-h-[300px]">
          <CodeEditor
            value={rightCode}
            onChange={handleRightChange}
            placeholder="Enter modified code here..."
            title="Modified Code"
          />
        </div>
      </div>

      <div className="p-4">
        <StatusBar stats={stats} />
        <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden">
          <DiffViewer diffs={diffs} />
        </div>
      </div>
    </main>
  );
}
