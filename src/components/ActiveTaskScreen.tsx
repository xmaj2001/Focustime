import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, SkipForward, Check, X } from 'lucide-react';
import { Task, Screen } from '../App';
import { CategoryIcon } from './CategoryIcon';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

type ActiveTaskScreenProps = {
  task: Task;
  onComplete: (id: string, timeSpent: number) => void;
  onSkip: () => void;
  onNavigate: (screen: Screen) => void;
};

const categoryColors = {
  study: { from: 'from-blue-500', via: 'via-indigo-500', to: 'to-purple-500' },
  food: { from: 'from-orange-500', via: 'via-red-500', to: 'to-pink-500' },
  rest: { from: 'from-purple-500', via: 'via-pink-500', to: 'to-rose-500' },
  chores: { from: 'from-green-500', via: 'via-emerald-500', to: 'to-teal-500' },
  work: { from: 'from-blue-600', via: 'via-cyan-500', to: 'to-teal-500' },
  fitness: { from: 'from-red-500', via: 'via-orange-500', to: 'to-yellow-500' },
  social: { from: 'from-pink-500', via: 'via-purple-500', to: 'to-indigo-500' },
  other: { from: 'from-gray-500', via: 'via-slate-500', to: 'to-zinc-500' },
};

export function ActiveTaskScreen({ task, onComplete, onSkip, onNavigate }: ActiveTaskScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(task.duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSeconds = task.duration * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setShowConfetti(true);
          toast.success('Tarefa concluída! Bom trabalho! 🎉');
          setTimeout(() => {
            const timeSpent = task.duration;
            onComplete(task.id, timeSpent);
            onNavigate('home');
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft, task, onComplete, onNavigate]);

  const handleComplete = () => {
    const timeSpent = Math.ceil((totalSeconds - secondsLeft) / 60);
    setShowConfetti(true);
    toast.success('Tarefa concluída! 🎉');
    setTimeout(() => {
      onComplete(task.id, timeSpent);
      onNavigate('home');
    }, 1500);
  };

  const handleSkip = () => {
    onSkip();
    onNavigate('home');
    toast.info('Tarefa ignorada');
  };

  const colors = categoryColors[task.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      {/* Animated background */}
      <div className={`fixed inset-0 bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} opacity-40 dark:opacity-30`} />
      <div className="fixed inset-0 backdrop-blur-3xl" />

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Close Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Task Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 flex items-center justify-center">
              <CategoryIcon category={task.category} size={40} isActive={true} />
            </div>
          </div>
          <h1 className="text-white">{task.name}</h1>
          <p className="text-white/70">{task.duration} minutos</p>
        </motion.div>

        {/* Timer Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Background Circle */}
            <svg className="w-72 h-72 transform -rotate-90">
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="white"
                strokeWidth="12"
                fill="none"
                opacity="0.1"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="144"
                cy="144"
                r="130"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={816.8}
                strokeDashoffset={816.8 - (816.8 * progress) / 100}
                initial={{ strokeDashoffset: 816.8 }}
                animate={{ strokeDashoffset: 816.8 - (816.8 * progress) / 100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="drop-shadow-2xl"
              />
            </svg>

            {/* Timer Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  key={`${minutes}:${seconds}`}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl text-white tracking-tight"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </motion.div>
                <p className="text-white/60 mt-2">restantes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={handleSkip}
            size="lg"
            variant="ghost"
            className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 text-white h-14 w-14"
          >
            <SkipForward className="w-6 h-6" />
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsPaused(!isPaused)}
              size="lg"
              className="rounded-full bg-white text-gray-900 hover:bg-white/90 h-16 w-16 shadow-2xl"
            >
              {isPaused ? <Play className="w-7 h-7 ml-1" /> : <Pause className="w-7 h-7" />}
            </Button>
          </motion.div>

          <Button
            onClick={handleComplete}
            size="lg"
            variant="ghost"
            className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 text-white h-14 w-14"
          >
            <Check className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
