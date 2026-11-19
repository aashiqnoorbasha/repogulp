import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function HealthHeader({ dateLabel, headline, notifications = [] }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.18em] text-snoozely-muted">{dateLabel}</p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-snoozely-text">{headline}</h1>
      </div>

      <div className="relative flex-none" ref={wrapperRef}>
        <button
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Health notifications"
          className="icon-btn w-10 h-10 min-w-0 min-h-0"
        >
          <Bell className="w-4 h-4" strokeWidth={1.6} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-full mt-2 w-64 glass-modal rounded-2xl p-4 z-30"
              role="dialog"
              aria-label="Health notifications"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-snoozely-muted mb-3">
                Notifications
              </p>
              {notifications.length === 0 ? (
                <p className="text-xs text-snoozely-muted font-light">Nothing needs your attention.</p>
              ) : (
                <ul className="space-y-3">
                  {notifications.map((item) => (
                    <li key={item.id} className="flex gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-none" />
                      <span className="min-w-0">
                        <span className="block text-[13px] text-snoozely-text font-light leading-snug">
                          {item.text}
                        </span>
                        <span className="block text-[11px] text-snoozely-muted mt-0.5">{item.meta}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
