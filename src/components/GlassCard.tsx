import { motion } from 'motion/react';
import { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        backdrop-blur-xl bg-white/70 dark:bg-slate-900/50
        border border-white/30 dark:border-slate-700/50
        rounded-3xl shadow-xl shadow-black/5
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
