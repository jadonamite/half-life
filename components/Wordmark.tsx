import React from 'react';

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-serif text-2xl tracking-tight text-ink flex items-center gap-2 ${className || ''}`}>
      Halflife
    </span>
  );
}
