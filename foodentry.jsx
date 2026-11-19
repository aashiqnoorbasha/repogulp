import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MEALS } from '@/lib/health';

const EMPTY = { name: '', meal: 'breakfast', calories: '', protein_g: '', carbs_g: '', fat_g: '', notes: '' };

export default function FoodEntrySheet({ open, onOpenChange, entry, defaultMeal = 'breakfast', dateLabel, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setError('');
    setForm(
      entry
        ? {
            name: entry.name || '',
            meal: entry.meal || defaultMeal,
            calories: entry.calories ?? '',
            protein_g: entry.protein_g ?? '',
            carbs_g: entry.carbs_g ?? '',
            fat_g: entry.fat_g ?? '',
            notes: entry.notes || '',
          }
        : { ...EMPTY, meal: defaultMeal }
    );
  }, [open, entry, defaultMeal]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Add a name so you can recognise this later.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        name: form.name.trim(),
        meal: form.meal,
        calories: form.calories === '' ? undefined : Number(form.calories),
        protein_g: form.protein_g === '' ? undefined : Number(form.protein_g),
        carbs_g: form.carbs_g === '' ? undefined : Number(form.carbs_g),
        fat_g: form.fat_g === '' ? undefined : Number(form.fat_g),
        notes: form.notes.trim() || undefined,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err?.message || 'Could not save this entry.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal rounded-3xl max-w-sm max-h-[88vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-light">{entry ? 'Edit food' : 'Log food'}</DialogTitle>
          <DialogDescription className="text-xs text-snoozely-muted">{dateLabel}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Meal</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {MEALS.map((meal) => (
                <button
                  key={meal.key}
                  onClick={() => update('meal', meal.key)}
                  className={`chip px-3 py-2 text-xs ${form.meal === meal.key ? 'chip-active' : ''}`}
                >
                  {meal.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">What did you eat</span>
            <input
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="Greek yogurt with berries"
              className="field mt-2 w-full px-3.5 py-2.5 text-sm text-snoozely-text outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { key: 'calories', label: 'Calories', suffix: 'kcal' },
              { key: 'protein_g', label: 'Protein', suffix: 'g' },
              { key: 'carbs_g', label: 'Carbs', suffix: 'g' },
              { key: 'fat_g', label: 'Fat', suffix: 'g' },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">
                  {field.label} ({field.suffix})
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={form[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                  placeholder="—"
                  className="field mt-2 w-full px-3 py-2 text-sm tabular-nums text-snoozely-text outline-none"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Note (optional)</span>
            <textarea
              value={form.notes}
              onChange={(event) => update('notes', event.target.value)}
              rows={2}
              maxLength={500}
              placeholder="How it felt, portion size, anything useful"
              className="field mt-2 w-full px-3 py-2 text-sm text-snoozely-text outline-none resize-none"
            />
          </label>

          <p className="text-[10px] text-snoozely-muted font-light leading-relaxed">
            Nora stores the values you enter. It does not estimate nutrition for you.
          </p>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-liquid w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : entry ? 'Save changes' : 'Add food'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
