import { diff_match_patch as DiffMatchPatch, Diff } from 'diff-match-patch';
import { DiffResult, DiffStats } from '../types';

export const calculateDiff = (text1: string, text2: string): DiffResult[] => {
  const dmp = new DiffMatchPatch();
  const diff = dmp.diff_main(text1, text2);
  dmp.diff_cleanupSemantic(diff);

  const results: DiffResult[] = [];
  let lineNumber = 1;

  diff.forEach(([type, text]: Diff) => {
    const lines = text.split('\n');
    lines.forEach((line: string, index: number) => {
      // Skip empty lines at the end
      if (index === lines.length - 1 && line === '') return;

      results.push({
        text: line,
        type: type === -1 ? 'delete' : type === 1 ? 'add' : 'equal',
        lineNumber: lineNumber++
      });
    });
  });

  return results;
};

export const calculateStats = (diffs: DiffResult[]): DiffStats => {
  return diffs.reduce(
    (stats, diff) => {
      if (diff.type === 'add') stats.additions++;
      else if (diff.type === 'delete') stats.deletions++;
      else if (diff.type === 'equal') stats.changes++;
      return stats;
    },
    { additions: 0, deletions: 0, changes: 0 }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export const debounce = <F extends AnyFunction>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
