import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Smartphone, Monitor, Tablet, CheckCircle2, 
  Trash2, MapPin, Clock 
} from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

export type Device = {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  isCurrent: boolean;
  location: string;
  lastActive: string;
};

type DeviceManagementScreenProps = {
  onNavigate: (screen: Screen) => void;
  devices: Device[];
  onRemoveDevice: (id: string) => void;
};

export function DeviceManagementScreen({ 
  onNavigate, 
  devices, 
  onRemoveDevice 
}: DeviceManagementScreenProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return Smartphone;
      case 'desktop':
        return Monitor;
      case 'tablet':
        return Tablet;
      default:
        return Smartphone;
    }
  };

  const handleRemoveDevice = (id: string, name: string) => {
    onRemoveDevice(id);
    toast.success(`${name} removido com sucesso!`);
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
          onClick={() => onNavigate('profile')}
          className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-gray-900 dark:text-white">Dispositivos</h1>
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
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white mb-1">Segurança</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tens {devices.length} {devices.length === 1 ? 'dispositivo' : 'dispositivos'} com acesso à tua conta. Remove os que não reconheces.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Devices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400 px-2">
          Dispositivos Ativos
        </h3>

        {devices.map((device, index) => {
          const DeviceIcon = getDeviceIcon(device.type);
          
          return (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    device.isCurrent
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700'
                  }`}>
                    <DeviceIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900 dark:text-white truncate">
                        {device.name}
                      </h3>
                      {device.isCurrent && (
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 shrink-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Atual
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {device.location}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Última atividade: {device.lastActive}
                      </p>
                    </div>
                  </div>

                  {!device.isCurrent && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900 dark:text-white">
                            Remover Dispositivo
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                            Tens a certeza que queres remover "{device.name}"? Este dispositivo terá que fazer login novamente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/50 dark:bg-slate-800/50">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRemoveDevice(device.id, device.name)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                          >
                            Remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add Device Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Novos dispositivos serão adicionados automaticamente quando fizeres login
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
