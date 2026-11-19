import React from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { formatNumber } from '@/lib/health';

function labelFor(date) {
  const parsed = parseISO(date);
  if (isToday(parsed)) return 'Today';
  if (isYesterday(parsed)) return 'Yesterday';
  return format(parsed, 'EEE, d MMM');
}

export default function ActivityHistory({ logs = [], goal = 0 }) {
  const rows = [...logs]
    .filter((log) => Number(log.steps) > 0)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 5);

  return (
    <section>
      <h2 className="text-sm font-light text-snoozely-text mb-3">Activity history</h2>
      {rows.length === 0 ? (
        <div className="glass-subtle rounded-2xl p-4">
          <p className="text-xs text-snoozely-muted font-light">
            Nothing logged yet. Each day you add appears here with how it compares to your goal.
          </p>
        </div>
      ) : (
        <ul className="glass-subtle rounded-2xl p-2 divide-y divide-snoozely-border/50">
          {rows.map((log) => {
            const percent = goal > 0 ? Math.min(100, Math.round((log.steps / goal) * 100)) : 0;
            return (
              <li key={log.id} className="px-2 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs text-snoozely-muted font-light">{labelFor(log.date)}</span>
                  <span className="text-sm text-snoozely-text tabular-nums">
                    {formatNumber(log.steps)}
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-snoozely-muted/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500/70"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
