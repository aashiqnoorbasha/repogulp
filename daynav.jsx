import React from 'react';
import { format, isToday, isYesterday, parseISO, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { todayKey } from '@/lib/health';

export default function DayNav({ date, onChange }) {
  const today = todayKey();
  const parsed = parseISO(date);
  const label = isToday(parsed) ? 'Today' : isYesterday(parsed) ? 'Yesterday' : format(parsed, 'EEEE');

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onChange(format(subDays(parsed, 1), 'yyyy-MM-dd'))}
        aria-label="Previous day"
        className="icon-btn"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.6} />
      </button>

      <div className="text-center">
        <p className="text-sm font-light text-snoozely-text">{label}</p>
        <p className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">
          {format(parsed, 'd MMMM yyyy')}
        </p>
      </div>

      <button
        onClick={() => onChange(format(subDays(parsed, -1), 'yyyy-MM-dd'))}
        disabled={date >= today}
        aria-label="Next day"
        className="icon-btn disabled:opacity-40"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.6} />
      </button>
    </div>
  );
}
