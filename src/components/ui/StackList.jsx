"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

// Lista tipo timeline para mostrar beneficios o mensajes de Cine Nexus
export default function StackList({ items, initialVisible = 1, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialVisible);

  return (
    <div
      className={`bg-transparent text-slate-900 dark:text-slate-100 mx-auto overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-3 relative">
        <AnimatePresence initial={false}>
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {item.title}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  {item.subtitle}
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap">
                {item.date}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length > initialVisible && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 mx-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
        >
          <span>{expanded ? "Ver menos" : "Ver todo"}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>
      )}
    </div>
  );
}


