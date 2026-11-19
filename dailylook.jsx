import React from 'react';
import { Plus } from 'lucide-react';
import StepGauge from '@/components/health/instruments/StepGauge';
import TickStrip from '@/components/health/instruments/TickStrip';
import GroupedTicks from '@/components/health/instruments/GroupedTicks';
import { formatNumber } from '@/lib/health';

export default function DailyOverview({
  todaySteps = 0,
  stepGoal = 0,
  average = 0,
  loggedDays = 0,
  mealsLogged = 0,
  foodCalories = 0,
  onAddSteps,
  onEditGoal,
}) {
  const percent = stepGoal > 0 ? Math.round((todaySteps / stepGoal) * 100) : 0;

  return (
    <section className="space-y-3">
      <article className="glass-primary rounded-3xl p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Steps today</p>
              <button
                onClick={onEditGoal}
                className="text-[10px] text-indigo-400 font-medium"
                aria-label="Edit daily step goal"
              >
                Edit goal
              </button>
            </div>
            <p className="mt-2 text-3xl font-light tabular-nums text-snoozely-text">
              {formatNumber(todaySteps)}
            </p>
            <p className="mt-1.5 text-xs text-snoozely-muted font-light">
              {stepGoal > 0
                ? `${percent}% of ${formatNumber(stepGoal)} goal`
                : 'Set a daily goal to track progress'}
            </p>
          </div>
          <StepGauge value={todaySteps} goal={stepGoal} />
        </div>
        <button
          onClick={onAddSteps}
          className="btn-glass mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
          {todaySteps > 0 ? 'Update today\'s steps' : 'Add today\'s steps'}
        </button>
      </article>

      <div className="grid grid-cols-2 gap-3">
        <article className="glass-secondary rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Movement</p>
          <p className="mt-2 text-xl font-light tabular-nums text-snoozely-text">
            {average > 0 ? formatNumber(average) : '—'}
          </p>
          <p className="text-[10px] text-snoozely-muted font-light">avg steps / day</p>
          <div className="mt-4">
            <TickStrip value={average} goal={stepGoal} />
          </div>
          <p className="mt-2.5 text-[10px] text-snoozely-muted font-light">
            {loggedDays > 0 ? `${loggedDays} day${loggedDays === 1 ? '' : 's'} logged this week` : 'No movement logged yet'}
          </p>
        </article>

        <article className="glass-secondary rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-snoozely-muted">Food</p>
          <p className="mt-2 text-xl font-light tabular-nums text-snoozely-text">
            {formatNumber(foodCalories)}
          </p>
          <p className="text-[10px] text-snoozely-muted font-light">kcal logged today</p>
          <div className="mt-4">
            <GroupedTicks
              value={mealsLogged}
              label={`${mealsLogged} of 4 meals logged`}
            />
          </div>
          <p className="mt-2.5 text-[10px] text-snoozely-muted font-light">
            {mealsLogged} of 4 meals logged
          </p>
        </article>
      </div>
    </section>
  );
}
