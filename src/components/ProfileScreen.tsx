import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, User, Mail, Camera, LogOut, Shield, 
  Smartphone, Settings, ChevronRight, Bell, Moon, Sun 
} from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type ProfileScreenProps = {
  onNavigate: (screen: Screen) => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function ProfileScreen({ 
  onNavigate, 
  user, 
  onUpdateUser, 
  onLogout,
  isDarkMode,
  onToggleDarkMode 
}: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      icon: User,
      label: 'Editar Perfil',
      description: 'Atualiza as tuas informações',
      onClick: () => {}, // Could navigate to edit profile screen
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      label: 'Alterar Password',
      description: 'Mantém a tua conta segura',
      onClick: () => onNavigate('change-password'),
      color: 'text-purple-500',
    },
    {
      icon: Smartphone,
      label: 'Dispositivos',
      description: 'Gere os teus dispositivos',
      onClick: () => onNavigate('devices'),
      color: 'text-green-500',
    },
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
          className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-gray-900 dark:text-white">Perfil</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400 px-2">Definições</h3>
        
        {/* Dark Mode Toggle */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Modo Escuro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tema {isDarkMode ? 'escuro' : 'claro'}
                </p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
          </div>
        </GlassCard>

        {/* Notifications Toggle */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Notificações</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Alertas de tarefas
                </p>
              </div>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled} 
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400 px-2">Conta</h3>
        
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <GlassCard
              className="p-4 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
              onClick={item.onClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    item.color === 'text-blue-500' ? 'from-blue-500 to-blue-600' :
                    item.color === 'text-purple-500' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl bg-red-500/10 dark:bg-red-500/20 border-red-500/30 hover:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Terminar Sessão
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                Terminar Sessão
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Tens a certeza que queres terminar a sessão? Vais ter que fazer login novamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/50 dark:bg-slate-800/50">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </motion.div>
  );
}
