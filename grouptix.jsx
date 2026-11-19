import React from 'react';

export default function GroupedTicks({ value = 0, groups = 4, per = 3, label }) {
  const total = groups * per;
  const lit = Math.max(0, Math.min(total, Math.round((Number(value) || 0) * per)));

  return (
    <div
      className="flex items-end justify-between text-snoozely-text h-4"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: groups }).map((_, group) => (
        <span key={group} className="flex items-end gap-[5px]">
          {Array.from({ length: per }).map((_, index) => {
            const position = group * per + index;
            const on = position < lit;
            return (
              <span
                key={index}
                style={{
                  width: '1.5px',
                  height: index === 0 ? '12px' : '8px',
                  background: 'currentColor',
                  opacity: on ? 0.92 : 0.16,
                }}
              />
            );
          })}
        </span>
      ))}
    </div>
  );
}
