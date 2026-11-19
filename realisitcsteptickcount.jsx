import React from 'react';

const TICK_COUNT = 49;
const MARKER_EVERY = 12;

export default function TickStrip({ value = 0, goal = 0 }) {
  const ratio = goal > 0 ? Math.min(1, value / goal) : 0;
  const lit = Math.round(ratio * TICK_COUNT);

  return (
    <div
      className="flex items-end justify-between h-[18px] text-snoozely-text"
      role="img"
      aria-label={goal > 0 ? `${Math.round(ratio * 100)} percent of your goal` : 'No goal set'}
    >
      {Array.from({ length: TICK_COUNT }).map((_, index) => {
        const on = index < lit;
        return (
          <span key={index} className="flex flex-col items-center justify-end" style={{ width: '1.5px' }}>
            {index % MARKER_EVERY === 0 && (
              <span
                className="rounded-full mb-[6.5px]"
                style={{
                  width: '2.24px',
                  height: '2.24px',
                  background: 'currentColor',
                  opacity: on ? 0.92 : 0.18,
                }}
              />
            )}
            <span
              style={{
                width: '1.5px',
                height: '8.95px',
                background: 'currentColor',
                opacity: on ? 0.92 : 0.16,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
