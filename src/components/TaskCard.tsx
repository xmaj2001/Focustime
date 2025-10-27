import { motion } from 'motion/react';
import { Clock, Play, Trash2, CheckCircle2 } from 'lucide-react';
import { Task } from '../App';
import { CategoryIcon } from './CategoryIcon';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';

type TaskCardProps = {
  task: Task;
  onStart: () => void;
  onDelete: () => void;
};

const categoryGradients = {
  study: 'from-blue-500 to-indigo-500',
  food: 'from-orange-500 to-red-500',
  rest: 'from-purple-500 to-pink-500',
  chores: 'from-green-500 to-emerald-500',
  work: 'from-blue-600 to-cyan-500',
  fitness: 'from-red-500 to-orange-500',
  social: 'from-pink-500 to-purple-500',
  other: 'from-gray-500 to-slate-500',
};

export function TaskCard({ task, onStart, onDelete }: TaskCardProps) {
  const hours = Math.floor(task.duration / 60);
  const minutes = task.duration % 60;
  const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}min`;

  return (
    <GlassCard className={`p-4 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryGradients[task.category]} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <CategoryIcon category={task.category} size={28} isActive={true} />
        </div>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={`text-gray-900 dark:text-white truncate ${task.completed ? 'line-through' : ''}`}>
                {task.name}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeString}</span>
                </div>
                {task.startTime && (
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {task.startTime}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!task.completed ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    onClick={onStart}
                    className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 border-0"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <div className="h-9 w-9 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              )}
              
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                className="h-9 w-9 rounded-full hover:bg-red-500/10 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
