import React from 'react';

export default function GlassChartTooltip({ active, payload, label, labelFormatter, valueFormatter }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="glass-elevated rounded-xl px-3 py-2.5 min-w-[112px]">
      <p className="text-snoozely-muted text-[10px] uppercase tracking-wider font-medium mb-1.5">
        {labelFormatter ? labelFormatter(label) : label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, i) => {
          const color = entry.color || entry.payload?.fill || entry.fill;
          const value = valueFormatter
            ? valueFormatter(entry.value, entry.name)
            : entry.value;
          return (
            <div key={`${entry.name}-${i}`} className="flex items-center gap-2 text-xs">
              {color && (
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
              )}
              <span className="text-snoozely-muted">{entry.name}</span>
              <span className="ml-auto text-snoozely-text tabular-nums font-medium pl-2">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
