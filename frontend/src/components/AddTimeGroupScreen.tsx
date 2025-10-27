import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, GraduationCap, Briefcase, Home, Dumbbell, 
  Users, Coffee, Heart, Sparkles, Check
} from 'lucide-react';
import { Screen } from '../App';
import { TimeGroup } from './TimeGroupsScreen';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

type AddTimeGroupScreenProps = {
  onNavigate: (screen: Screen) => void;
  onAddGroup: (group: Omit<TimeGroup, 'id' | 'taskCount'>) => void;
};

const iconOptions = [
  { name: 'graduation-cap', icon: GraduationCap, label: 'Escola' },
  { name: 'briefcase', icon: Briefcase, label: 'Trabalho' },
  { name: 'home', icon: Home, label: 'Casa' },
  { name: 'dumbbell', icon: Dumbbell, label: 'Fitness' },
  { name: 'users', icon: Users, label: 'Social' },
  { name: 'coffee', icon: Coffee, label: 'Pausa' },
  { name: 'heart', icon: Heart, label: 'Saúde' },
  { name: 'sparkles', icon: Sparkles, label: 'Hobby' },
];

const colorOptions = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

export function AddTimeGroupScreen({ onNavigate, onAddGroup }: AddTimeGroupScreenProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalHours, setTotalHours] = useState('8');
  const [selectedIcon, setSelectedIcon] = useState('graduation-cap');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Introduz um nome para o grupo');
      return;
    }

    if (!totalHours || Number(totalHours) <= 0) {
      toast.error('Introduz um tempo válido');
      return;
    }

    const newGroup: Omit<TimeGroup, 'id' | 'taskCount'> = {
      name: name.trim(),
      description: description.trim(),
      totalHours: Number(totalHours),
      icon: selectedIcon,
      color: selectedColor,
    };

    onAddGroup(newGroup);
    toast.success(`${name} criado com sucesso! 🎉`);
    onNavigate('time-groups');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('time-groups')}
          className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-gray-900 dark:text-white">Novo Grupo</h1>
      </div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Pré-visualização</p>
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}dd)` 
              }}
            >
              {(() => {
                const IconComponent = iconOptions.find(i => i.name === selectedIcon)?.icon || GraduationCap;
                return <IconComponent className="w-8 h-8 text-white" />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white">
                {name || 'Nome do Grupo'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description || 'Descrição do grupo'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ⏰ {totalHours || '0'}h disponíveis
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <GlassCard className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Nome do Grupo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Escola, Trabalho, Casa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                Descrição (opcional)
              </Label>
              <Textarea
                id="description"
                placeholder="Ex: Tarefas relacionadas com a escola"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500 min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="text-gray-700 dark:text-gray-300">
                Horas Totais Disponíveis
              </Label>
              <Input
                id="hours"
                type="number"
                min="0"
                step="0.5"
                placeholder="8"
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Quanto tempo tens disponível neste contexto por dia?
              </p>
            </div>
          </GlassCard>

          {/* Icon Selection */}
          <GlassCard className="p-6 space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">Ícone</Label>
            <div className="grid grid-cols-4 gap-3">
              {iconOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedIcon(option.name)}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    selectedIcon === option.name
                      ? 'border-purple-500 dark:border-purple-400 bg-purple-500/10 dark:bg-purple-500/20'
                      : 'border-white/30 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <option.icon className={`w-6 h-6 mx-auto ${
                    selectedIcon === option.name
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                  {selectedIcon === option.name && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Color Selection */}
          <GlassCard className="p-6 space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">Cor</Label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    selectedColor === color
                      ? 'border-purple-500 dark:border-purple-400 bg-purple-500/10 dark:bg-purple-500/20'
                      : 'border-white/30 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30'
                  }`}
                >
                  <div 
                    className="w-full h-8 rounded-xl"
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
          >
            <Check className="w-5 h-5 mr-2" />
            Criar Grupo
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}
