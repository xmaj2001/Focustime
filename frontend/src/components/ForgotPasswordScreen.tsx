import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

type ForgotPasswordScreenProps = {
  onNavigate: (screen: Screen) => void;
};

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Introduz o teu email');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      toast.success('Email enviado! Verifica a tua caixa de entrada 📧');
      setIsLoading(false);
      
      // After 2 seconds, navigate to OTP screen
      setTimeout(() => {
        onNavigate('otp');
      }, 2000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('login')}
            className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-slate-700/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-white">Recuperar Password</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {emailSent 
                ? 'Email enviado com sucesso!'
                : 'Introduz o teu email para receber um código de recuperação'
              }
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="teu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
                >
                  {isLoading ? (
                    'A enviar...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Código
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Enviámos um código de verificação para <strong className="text-gray-900 dark:text-white">{email}</strong>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vais ser redirecionado para introduzir o código...
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lembras-te da password?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Voltar ao login
              </button>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
