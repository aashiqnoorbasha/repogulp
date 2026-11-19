import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function AddStepsSheet({ open, onOpenChange, date, currentSteps = 0, onSave }) {
  const [steps, setSteps] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSteps(currentSteps ? String(currentSteps) : '');
      setError('');
    }
  }, [open, currentSteps]);

  const handleSave = async () => {
    const value = Number(steps);
    if (!Number.isFinite(value) || value < 0 || value > 100000) {
      setError('Enter a step count between 0 and 100,000.');
      return;
    }
    setSaving(true);
    try {
      await onSave(Math.round(value));
      onOpenChange(false);
    } catch (err) {
      setError(err?.message || 'Could not save your steps.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal rounded-3xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-light">Add steps</DialogTitle>
          <DialogDescription className="text-xs text-snoozely-muted">
            {date ? format(parseISO(date), 'EEEE, d MMMM') : ''} · steps you log yourself
          </DialogDescription>
        </DialogHeader>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Steps</span>
          <input
            type="number"
            inputMode="numeric"
            value={steps}
            onChange={(event) => setSteps(event.target.value)}
            placeholder="0"
            className="field mt-2 w-full px-4 py-3 text-2xl font-light tabular-nums text-snoozely-text outline-none"
          />
        </label>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-liquid w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save steps'}
        </button>
      </DialogContent>
    </Dialog>
  );
}
