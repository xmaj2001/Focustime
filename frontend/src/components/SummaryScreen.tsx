import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { Task, Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type SummaryScreenProps = {
  tasks: Task[];
  onNavigate: (screen: Screen) => void;
};

const CATEGORY_COLORS = {
  study: '#3b82f6',
  food: '#f97316',
  rest: '#a855f7',
  chores: '#10b981',
  work: '#06b6d4',
  fitness: '#ef4444',
  social: '#ec4899',
  other: '#6b7280',
};

const motivationalQuotes = [
  "Geriste o teu tempo como um profissional 💪",
  "Foco fantástico hoje! Continua assim! 🌟",
  "Estás a dominar a gestão de tempo! 🎯",
  "Excelente trabalho a manter o ritmo! 🚀",
  "A tua produtividade é inspiradora! ✨",
];

export function SummaryScreen({ tasks, onNavigate }: SummaryScreenProps) {
  const completedTasks = tasks.filter(t => t.completed);
  const totalPlanned = tasks.reduce((sum, task) => sum + task.duration, 0);
  const totalSpent = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
  const focusRate = totalPlanned > 0 ? Math.round((totalSpent / totalPlanned) * 100) : 0;

  // Calculate time by category
  const categoryData = Object.keys(CATEGORY_COLORS).map(category => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const timeSpent = categoryTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: timeSpent,
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
    };
  }).filter(item => item.value > 0);

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 space-y-6 pb-20"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-gray-900 dark:text-white">Resumo</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white">
              {Math.floor(totalSpent / 60)}h {totalSpent % 60}m
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Tempo Gasto</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white">{completedTasks.length}/{tasks.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Concluídas</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white">{focusRate}%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Taxa de Foco</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-4 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white">
              {Math.floor(totalPlanned / 60)}h
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Planeado</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Time Distribution Chart */}
      {categoryData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-gray-900 dark:text-white">Distribuição de Tempo</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                    formatter={(value: number) => `${value} min`}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
          <p className="text-lg text-gray-900 dark:text-white">{randomQuote}</p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
