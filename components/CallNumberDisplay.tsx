import React from 'react';
import { CallNumber } from '../types';

interface Props {
  item: CallNumber;
  index: number;
  variant?: 'neutral' | 'correct' | 'incorrect';
  showLabel?: boolean;
}

export const CallNumberDisplay: React.FC<Props> = ({ item, index, variant = 'neutral', showLabel = false }) => {
  const parts = [
    item.class && { text: item.class, label: "분류" },
    item.author && { text: item.author, label: "저자" },
    item.vol && { text: item.vol, label: "권/복본" }
  ].filter((p): p is {text: string, label: string} => Boolean(p));

  const baseClasses = "flex items-center p-4 rounded-xl border-2 shadow-sm mb-3 transition-all duration-200 select-none";
  
  let colorClasses = "bg-white border-gray-200 hover:border-fuchsia-300";
  let badgeClasses = "bg-fuchsia-600";
  
  if (variant === 'correct') {
    colorClasses = "bg-emerald-50 border-emerald-400";
    badgeClasses = "bg-emerald-600";
  } else if (variant === 'incorrect') {
    colorClasses = "bg-rose-50 border-rose-400";
    badgeClasses = "bg-rose-600";
  }

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold flex-shrink-0 mr-4 text-white shadow-md ${badgeClasses}`}>
        {index + 1}
      </div>

      <div className="flex-grow flex flex-wrap gap-2 items-center">
        {parts.map((part, i) => (
          <div key={i} className="flex flex-col">
            {showLabel && <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{part.label}</span>}
            <span className="text-lg font-bold text-gray-800 bg-white/50 px-2 py-0.5 rounded-md border border-gray-100/50">
              {part.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
    </div>
  );
};