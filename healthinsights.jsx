import React from 'react';
import { Droplets, Footprints, Leaf, Moon, Utensils } from 'lucide-react';

const ICONS = {
  droplet: Droplets,
  footprints: Footprints,
  leaf: Leaf,
  moon: Moon,
  utensils: Utensils,
};

export default function HealthInsights({ insights = [] }) {
  return (
    <section>
      <h2 className="text-sm font-light text-snoozely-text mb-3">Health insights</h2>
      <ul className="space-y-2.5">
        {insights.map((insight) => {
          const Icon = ICONS[insight.icon] || Leaf;
          return (
            <li key={insight.id} className="glass-subtle rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex-none">
                  <Icon className="w-4 h-4" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm text-snoozely-text font-light">{insight.title}</h3>
                    <span className="text-[9px] uppercase tracking-[0.12em] text-snoozely-muted">
                      {insight.personal ? 'Based on your data' : 'General wellness'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-snoozely-muted font-light">
                    {insight.message}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
