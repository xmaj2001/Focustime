import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { Task, Screen } from '../App';
import { GlassCard } from './GlassCard';
import { CategoryIcon } from './CategoryIcon';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

type AddTaskScreenProps = {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'timeSpent' | 'createdAt'>) => void;
  onNavigate: (screen: Screen) => void;
};

const categories: Array<Task['category']> = [
  'study', 'food', 'rest', 'chores', 'work', 'fitness', 'social', 'other'
];

export function AddTaskScreen({ onAddTask, onNavigate }: AddTaskScreenProps) {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState('30');
  const [category, setCategory] = useState<Task['category']>('study');
  const [startTime, setStartTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast.error('Por favor, insere o nome da tarefa');
      return;
    }

    if (!duration || parseInt(duration) <= 0) {
      toast.error('Por favor, insere uma duração válida');
      return;
    }

    onAddTask({
      name: taskName,
      duration: parseInt(duration),
      category,
      startTime: startTime || undefined,
    });

    toast.success('Tarefa adicionada com sucesso! 🎉');
    onNavigate('home');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-6 min-h-screen"
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
        <h1 className="text-gray-900 dark:text-white">Adicionar Nova Tarefa</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6 space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName" className="text-gray-700 dark:text-gray-300">
              Nome da Tarefa
            </Label>
            <Input
              id="taskName"
              type="text"
              placeholder="ex: Treino matinal"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">
              Duração (minutos)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-gray-700 dark:text-gray-300">
              Horário de Início (opcional)
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
            />
          </div>
        </GlassCard>

        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-gray-700 dark:text-gray-300 px-2">Categoria</Label>
          <GlassCard className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all
                    ${category === cat 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-white/40 dark:bg-slate-800/40 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }
                  `}
                >
                  <CategoryIcon category={cat} isActive={category === cat} />
                  <span className="text-xs capitalize">{cat === 'study' ? 'estudo' : cat === 'food' ? 'refeição' : cat === 'rest' ? 'descanso' : cat === 'chores' ? 'tarefas' : cat === 'work' ? 'trabalho' : cat === 'fitness' ? 'exercício' : cat === 'social' ? 'social' : 'outro'}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
          >
            <Check className="w-5 h-5 mr-2" />
            Adicionar Tarefa
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
