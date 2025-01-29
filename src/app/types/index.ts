export interface DiffResult {
  text: string;
  type: 'add' | 'delete' | 'equal';
  lineNumber: number;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  changes: number;
}
