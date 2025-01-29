"use client";

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder,
  title
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize Prism and highlight code
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [value]); // This will run on mount and when value changes

  const handleScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-gray-700 text-white px-4 py-2 text-sm font-medium">
        {title}
      </div>
      <div className="relative flex-grow bg-gray-900">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent caret-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck="false"
          data-gramm="false"
        />
        <pre
          ref={preRef}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm pointer-events-none overflow-auto"
          aria-hidden="true"
          tabIndex={0}
        >
          <code className="language-typescript">{value || ' '}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
