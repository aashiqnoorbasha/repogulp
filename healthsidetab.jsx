import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ChevronLeft, Utensils } from 'lucide-react';

const LINKS = [
  { path: '/health', label: 'Health', hint: 'Steps, movement & insights', Icon: Activity },
  { path: '/food', label: 'Food', hint: 'Meals & nutrition', Icon: Utensils },
];

export default function HealthSideTab() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const activePath = LINKS.find((link) => location.pathname.startsWith(link.path))?.path;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[52px] w-60 glass-modal rounded-2xl p-2.5"
            role="menu"
            aria-label="Nora Health"
          >
            <p className="px-2.5 pt-1 pb-2 text-[10px] uppercase tracking-[0.18em] text-snoozely-muted">
              Nora Health
            </p>
            <div className="space-y-1">
              {LINKS.map(({ path, label, hint, Icon }) => {
                const isActive = activePath === path;
                return (
                  <button
                    key={path}
                    role="menuitem"
                    onClick={() => go(path)}
                    className={`w-full flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors ${
                      isActive ? 'bg-indigo-500/10' : 'hover:bg-snoozely-muted/10'
                    }`}
                  >
                    <span
                      className={`grid place-items-center w-9 h-9 rounded-xl ${
                        isActive ? 'bg-indigo-500/15 text-indigo-400' : 'bg-snoozely-muted/10 text-snoozely-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-light text-snoozely-text">{label}</span>
                      <span className="block text-[11px] text-snoozely-muted truncate">{hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open Nora Health"
        className={`glass-secondary press relative flex items-center justify-center w-11 h-24 rounded-l-2xl border-r-0 transition-colors ${
          activePath ? 'text-indigo-400' : 'text-snoozely-muted'
        }`}
      >
        {open ? (
          <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
        ) : (
          <span className="flex flex-col items-center gap-1.5">
            <Activity className="w-4 h-4" strokeWidth={1.7} />
            <span className="text-[9px] tracking-[0.16em] uppercase [writing-mode:vertical-rl]">
              Health
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
