import { motion } from 'motion/react';
import { Plus, Moon, Sun, TrendingUp, Trash2, Clock, User, Layers } from 'lucide-react';
import { Task, Screen } from '../App';
import { GlassCard } from './GlassCard';
import { ProgressCircle } from './ProgressCircle';
import { TaskCard } from './TaskCard';
import { Button } from './ui/button';

type HomeScreenProps = {
  tasks: Task[];
  onNavigate: (screen: Screen) => void;
  onStartTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function HomeScreen({ 
  tasks, 
  onNavigate, 
  onStartTask, 
  onDeleteTask,
  isDarkMode,
  onToggleDarkMode 
}: HomeScreenProps) {
  const totalPlanned = tasks.reduce((sum, task) => sum + task.duration, 0);
  const totalSpent = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalPlanned > 0 ? (totalSpent / totalPlanned) * 100 : 0;

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-900 dark:text-white"
        >
          {greeting}, Max 👋
        </motion.h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('time-groups')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
          >
            <Layers className="w-5 h-5 text-green-600 dark:text-green-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('available-time')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
          >
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('summary')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
          >
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
          >
            <User className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Progresso de Hoje</p>
              <h2 className="text-gray-900 dark:text-white">
                {Math.round(totalSpent / 60)}h {totalSpent % 60}m
                <span className="text-gray-400 dark:text-gray-500"> / {Math.round(totalPlanned / 60)}h {totalPlanned % 60}m</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {completedTasks} de {tasks.length} tarefas concluídas
              </p>
            </div>
            <ProgressCircle percentage={progressPercentage} size={100} />
          </div>
        </GlassCard>
      </motion.div>

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-gray-900 dark:text-white">Tarefas de Hoje</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{tasks.length} tarefas</span>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <TaskCard
                task={task}
                onStart={() => {
                  onStartTask(task);
                  onNavigate('active');
                }}
                onDelete={() => onDeleteTask(task.id)}
              />
            </motion.div>
          ))}

          {tasks.length === 0 && (
            <GlassCard className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Ainda não há tarefas. Adiciona a tua primeira tarefa para começar! 🎯
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Button
          onClick={() => onNavigate('add')}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-purple-500/50"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
