import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Plus, GraduationCap, Briefcase, Home, 
  Dumbbell, Users, MoreHorizontal, Trash2, Edit, Clock
} from 'lucide-react';
import { Screen, Task } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

export type TimeGroup = {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalHours: number;
  description: string;
  taskCount: number;
};

type TimeGroupsScreenProps = {
  onNavigate: (screen: Screen, groupId?: string) => void;
  timeGroups: TimeGroup[];
  tasks: Task[];
  onDeleteGroup: (id: string) => void;
  onSelectGroup: (id: string) => void;
};

export function TimeGroupsScreen({ 
  onNavigate, 
  timeGroups, 
  tasks,
  onDeleteGroup,
  onSelectGroup
}: TimeGroupsScreenProps) {
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'graduation-cap': GraduationCap,
      'briefcase': Briefcase,
      'home': Home,
      'dumbbell': Dumbbell,
      'users': Users,
    };
    return icons[iconName] || GraduationCap;
  };

  const getGroupTasks = (groupId: string) => {
    return tasks.filter(task => task.timeGroupId === groupId);
  };

  const calculateGroupProgress = (groupId: string) => {
    const groupTasks = getGroupTasks(groupId);
    if (groupTasks.length === 0) return 0;
    
    const totalPlanned = groupTasks.reduce((sum, task) => sum + task.duration, 0);
    const totalSpent = groupTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
    
    return totalPlanned > 0 ? (totalSpent / totalPlanned) * 100 : 0;
  };

  const handleDeleteGroup = (id: string, name: string) => {
    onDeleteGroup(id);
    toast.success(`${name} eliminado com sucesso!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-gray-900 dark:text-white">Grupos de Tempo</h1>
        </div>
        <Button
          size="icon"
          onClick={() => onNavigate('add-time-group')}
          className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white mb-1">Organiza o teu Tempo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cria grupos para diferentes contextos como Escola, Trabalho ou Casa e organiza as tuas tarefas.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Time Groups List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {timeGroups.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center opacity-50">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">Sem Grupos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Cria o teu primeiro grupo de tempo para organizar melhor as tarefas
            </p>
            <Button
              onClick={() => onNavigate('add-time-group')}
              className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Grupo
            </Button>
          </GlassCard>
        ) : (
          timeGroups.map((group, index) => {
            const IconComponent = getIconComponent(group.icon);
            const progress = calculateGroupProgress(group.id);
            const groupTasks = getGroupTasks(group.id);
            const completedTasks = groupTasks.filter(t => t.completed).length;
            
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <GlassCard 
                  className="p-5 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
                  onClick={() => {
                    onSelectGroup(group.id);
                    onNavigate('home');
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${group.color}, ${group.color}dd)` 
                      }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 dark:text-white truncate">
                            {group.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                            {group.description}
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Could navigate to edit screen
                                toast.info('Editar grupo - em breve');
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem 
                                  className="text-red-600 dark:text-red-400"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-900 dark:text-white">
                                    Eliminar Grupo
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                                    Tens a certeza que queres eliminar "{group.name}"? As tarefas associadas não serão eliminadas.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-white/50 dark:bg-slate-800/50">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteGroup(group.id, group.name)}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            ⏰ {group.totalHours}h
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            📋 {completedTasks}/{groupTasks.length} tarefas
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Progresso</span>
                            <span className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
}
