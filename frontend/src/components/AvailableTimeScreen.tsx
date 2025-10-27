import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Plus, Minus, Sun, Moon, CalendarDays } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

type AvailableTimeScreenProps = {
  onNavigate: (screen: Screen) => void;
  startTime: string;
  endTime: string;
  onUpdateTime: (start: string, end: string) => void;
};

export function AvailableTimeScreen({ 
  onNavigate, 
  startTime, 
  endTime,
  onUpdateTime 
}: AvailableTimeScreenProps) {
  const [localStartTime, setLocalStartTime] = useState(startTime);
  const [localEndTime, setLocalEndTime] = useState(endTime);

  // Calcular tempo total disponível
  const calculateTotalMinutes = (start: string, end: string): number => {
    if (!start || !end) return 0;
    
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    const startInMinutes = startHour * 60 + startMin;
    const endInMinutes = endHour * 60 + endMin;
    
    let diff = endInMinutes - startInMinutes;
    if (diff < 0) diff += 24 * 60; // Para casos que passam meia-noite
    
    return diff;
  };

  const totalMinutes = calculateTotalMinutes(localStartTime, localEndTime);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  // Adicionar tempo ao fim do dia
  const addTime = (minutes: number) => {
    if (!localEndTime) {
      toast.error('Define primeiro o horário de fim');
      return;
    }

    const [hour, min] = localEndTime.split(':').map(Number);
    let newMinutes = hour * 60 + min + minutes;
    
    // Garantir que não passa de 24h
    if (newMinutes >= 24 * 60) {
      newMinutes = newMinutes % (24 * 60);
    }
    
    const newHour = Math.floor(newMinutes / 60);
    const newMin = newMinutes % 60;
    
    const newEndTime = `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
    setLocalEndTime(newEndTime);
    toast.success(`Adicionado ${minutes} minutos! ⏰`);
  };

  // Remover tempo do fim do dia
  const removeTime = (minutes: number) => {
    if (!localEndTime) {
      toast.error('Define primeiro o horário de fim');
      return;
    }

    const [hour, min] = localEndTime.split(':').map(Number);
    let newMinutes = hour * 60 + min - minutes;
    
    if (newMinutes < 0) {
      newMinutes = 24 * 60 + newMinutes;
    }
    
    const newHour = Math.floor(newMinutes / 60);
    const newMin = newMinutes % 60;
    
    const newEndTime = `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
    setLocalEndTime(newEndTime);
    toast.success(`Removido ${minutes} minutos! ⏰`);
  };

  const handleSave = () => {
    if (!localStartTime || !localEndTime) {
      toast.error('Define o horário de início e fim');
      return;
    }

    if (calculateTotalMinutes(localStartTime, localEndTime) <= 0) {
      toast.error('O horário de fim deve ser após o início');
      return;
    }

    onUpdateTime(localStartTime, localEndTime);
    toast.success('Tempo disponível atualizado! 🎉');
    onNavigate('home');
  };

  const presetTimes = [
    { label: 'Manhã', start: '08:00', end: '12:00', icon: Sun },
    { label: 'Tarde', start: '14:00', end: '18:00', icon: Sun },
    { label: 'Noite', start: '19:00', end: '23:00', icon: Moon },
    { label: 'Dia Completo', start: '08:00', end: '22:00', icon: CalendarDays },
  ];

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
          onClick={() => onNavigate('home')}
          className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-gray-900 dark:text-white">Tempo Disponível</h1>
      </div>

      {/* Total Available Time Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-8 text-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-gray-900 dark:text-white mb-2">
            {totalHours}h {totalMins}m
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tempo Total Disponível Hoje
          </p>
        </GlassCard>
      </motion.div>

      {/* Time Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-6 space-y-6">
          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-500" />
              Início do Dia
            </Label>
            <Input
              id="startTime"
              type="time"
              value={localStartTime}
              onChange={(e) => setLocalStartTime(e.target.value)}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500 text-lg"
            />
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              Fim do Dia
            </Label>
            <Input
              id="endTime"
              type="time"
              value={localEndTime}
              onChange={(e) => setLocalEndTime(e.target.value)}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500 text-lg"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Preset Times */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <Label className="text-gray-700 dark:text-gray-300 px-2">Horários Predefinidos</Label>
        <div className="grid grid-cols-2 gap-3">
          {presetTimes.map((preset, index) => (
            <motion.div
              key={preset.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  setLocalStartTime(preset.start);
                  setLocalEndTime(preset.end);
                  toast.success(`${preset.label} selecionado!`);
                }}
                className="w-full h-auto py-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border-white/30 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 flex flex-col gap-2"
              >
                <preset.icon className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{preset.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {preset.start} - {preset.end}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Add/Remove Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <Label className="text-gray-700 dark:text-gray-300 px-2">Ajuste Rápido</Label>
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Adicionar Tempo</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => addTime(30)}
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-1" />
                30m
              </Button>
              <Button
                size="sm"
                onClick={() => addTime(60)}
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-1" />
                1h
              </Button>
              <Button
                size="sm"
                onClick={() => addTime(120)}
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-1" />
                2h
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Remover Tempo</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => removeTime(30)}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0"
              >
                <Minus className="w-4 h-4 mr-1" />
                30m
              </Button>
              <Button
                size="sm"
                onClick={() => removeTime(60)}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0"
              >
                <Minus className="w-4 h-4 mr-1" />
                1h
              </Button>
              <Button
                size="sm"
                onClick={() => removeTime(120)}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0"
              >
                <Minus className="w-4 h-4 mr-1" />
                2h
              </Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleSave}
          size="lg"
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
        >
          <Clock className="w-5 h-5 mr-2" />
          Guardar Horário
        </Button>
      </motion.div>
    </motion.div>
  );
}
