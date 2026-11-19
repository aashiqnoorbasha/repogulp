import React from 'react';

const TICK_COUNT = 40;
const MARKER_EVERY = 5;

export default function StepGauge({ value = 0, goal = 0, size = 132 }) {
  const ratio = goal > 0 ? Math.min(1, value / goal) : 0;
  const lit = Math.round(ratio * TICK_COUNT);

  const tick = (index) => {
    const angle = (index / TICK_COUNT) * 2 * Math.PI;
    const sin = Math.sin(angle);
    const cos = -Math.cos(angle);
    return {
      x1: 72 + 36.6 * sin,
      y1: 72 + 36.6 * cos,
      x2: 72 + 62.7 * sin,
      y2: 72 + 62.7 * cos,
    };
  };

  return (
    <div
      className="relative flex-none text-snoozely-text"
      style={{ width: size, height: size }}
      role="img"
      aria-label={goal > 0 ? `${Math.round(ratio * 100)} percent of your step goal` : 'No step goal set'}
    >
      <svg viewBox="0 0 144 144" className="w-full h-full">
        {Array.from({ length: TICK_COUNT }).map((_, index) => {
          const line = tick(index);
          return (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="butt"
              opacity={index < lit ? 0.92 : 0.16}
            />
          );
        })}
        {Array.from({ length: TICK_COUNT / MARKER_EVERY }).map((_, marker) => {
          const index = marker * MARKER_EVERY;
          const angle = (index / TICK_COUNT) * 2 * Math.PI;
          return (
            <circle
              key={`dot-${index}`}
              cx={72 + 71.1 * Math.sin(angle)}
              cy={72 - 71.1 * Math.cos(angle)}
              r="1.6"
              fill="currentColor"
              opacity={index < lit ? 0.92 : 0.2}
            />
          );
        })}
      </svg>
      <span className="absolute inset-0 grid place-items-center text-lg font-medium tabular-nums">
        {Math.round(ratio * 100)}%
      </span>
    </div>
  );
}
