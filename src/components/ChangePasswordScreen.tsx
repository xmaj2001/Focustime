import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

type ChangePasswordScreenProps = {
  onNavigate: (screen: Screen) => void;
};

export function ChangePasswordScreen({ onNavigate }: ChangePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
    return checks;
  };

  const passwordChecks = validatePassword(newPassword);
  const isPasswordValid = Object.values(passwordChecks).every(check => check);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Preenche todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('As passwords não coincidem');
      return;
    }

    if (!isPasswordValid) {
      toast.error('A password não cumpre os requisitos');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Password alterada com sucesso! 🔐');
      setIsLoading(false);
      onNavigate('profile');
    }, 1000);
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
        <h1 className="text-gray-900 dark:text-white">Alterar Password</h1>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white mb-1">Segurança da Conta</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Usa uma password forte com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.
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
        <GlassCard className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">
                Password Atual
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">
                Nova Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {newPassword && (
                <div className="space-y-2 mt-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Requisitos:</p>
                  <div className="space-y-1">
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.length ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      Pelo menos 8 caracteres
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      Letra maiúscula
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      Letra minúscula
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.number ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      Número
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                Confirmar Nova Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  As passwords não coincidem
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !isPasswordValid || newPassword !== confirmPassword}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
            >
              {isLoading ? (
                'A alterar...'
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Alterar Password
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
