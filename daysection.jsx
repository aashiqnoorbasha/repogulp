import React, { useState } from 'react';
import { Cookie, Moon, Plus, Sun, Sunrise, Trash2 } from 'lucide-react';
import { formatNumber, nutritionTotals } from '@/lib/health';

const ICONS = { breakfast: Sunrise, lunch: Sun, dinner: Moon, snack: Cookie };

export default function MealSection({ meal, entries = [], onAdd, onEdit, onDelete }) {
  const [pendingDelete, setPendingDelete] = useState(null);
  const totals = nutritionTotals(entries);
  const Icon = ICONS[meal.key] || Cookie;

  return (
    <section className="glass-subtle rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-snoozely-muted/10 text-snoozely-text flex-none">
          <Icon className="w-4 h-4" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-light text-snoozely-text">{meal.label}</p>
          <p className="text-[11px] text-snoozely-muted">
            {entries.length ? `${formatNumber(totals.calories)} kcal` : 'Nothing logged'}
          </p>
        </div>
        <button
          onClick={() => onAdd(meal.key)}
          aria-label={`Add food to ${meal.label}`}
          className="icon-btn w-8 h-8 min-w-0 min-h-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {entries.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-xl bg-snoozely-card/40 px-3 py-2.5">
              <div className="flex items-start gap-2">
                <button onClick={() => onEdit(entry)} className="min-w-0 flex-1 text-left">
                  <span className="block text-sm text-snoozely-text font-light truncate">{entry.name}</span>
                  <span className="block text-[11px] text-snoozely-muted mt-0.5">
                    {entry.calories ? `${formatNumber(entry.calories)} kcal` : 'No calories entered'}
                    {entry.protein_g ? ` · P ${Math.round(entry.protein_g)}g` : ''}
                    {entry.carbs_g ? ` · C ${Math.round(entry.carbs_g)}g` : ''}
                    {entry.fat_g ? ` · F ${Math.round(entry.fat_g)}g` : ''}
                  </span>
                </button>

                {pendingDelete === entry.id ? (
                  <div className="flex items-center gap-1 flex-none">
                    <button
                      onClick={() => {
                        onDelete(entry.id);
                        setPendingDelete(null);
                      }}
                      className="text-[11px] text-red-400 font-medium px-1.5 py-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setPendingDelete(null)}
                      className="text-[11px] text-snoozely-muted px-1.5 py-1"
                    >
                      Keep
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPendingDelete(entry.id)}
                    aria-label={`Delete ${entry.name}`}
                    className="icon-btn w-8 h-8 min-w-0 min-h-0 flex-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.6} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
