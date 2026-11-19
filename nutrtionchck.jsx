import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MEALS, entriesForMeal, formatNumber, nutritionTotals } from '@/lib/health';

export default function NutritionSummary({ entries = [] }) {
  const [expanded, setExpanded] = useState(false);
  const totals = nutritionTotals(entries);

  return (
    <section className="glass-primary rounded-3xl p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-light text-snoozely-text">Nutrition</h2>
        <span className="text-[11px] text-snoozely-muted">{entries.length} item{entries.length === 1 ? '' : 's'}</span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-light tabular-nums text-snoozely-text">
          {formatNumber(totals.calories)}
        </span>
        <span className="text-xs text-snoozely-muted pb-1.5">kcal today</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Protein', value: totals.protein },
          { label: 'Carbs', value: totals.carbs },
          { label: 'Fat', value: totals.fat },
        ].map((macro) => (
          <div key={macro.label} className="rounded-xl bg-snoozely-muted/10 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-snoozely-muted">{macro.label}</p>
            <p className="mt-1 text-sm text-snoozely-text tabular-nums font-light">{Math.round(macro.value)} g</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="mt-3.5 flex items-center gap-1.5 text-[11px] text-snoozely-muted"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
        {expanded ? 'Hide meal totals' : 'Show meal totals'}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-2 border-t border-snoozely-border/60 pt-3">
          {MEALS.map((meal) => {
            const mealEntries = entriesForMeal(entries, meal.key);
            const mealTotals = nutritionTotals(mealEntries);
            return (
              <li key={meal.key} className="flex items-center justify-between text-xs">
                <span className="text-snoozely-muted font-light">{meal.label}</span>
                <span className="text-snoozely-text tabular-nums">
                  {mealEntries.length ? `${formatNumber(mealTotals.calories)} kcal` : '—'}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-3 text-[10px] text-snoozely-muted font-light leading-relaxed">
        These are the values you entered, not a target or an estimate.
      </p>
    </section>
  );
}
