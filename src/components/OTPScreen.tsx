import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, RotateCw } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

type OTPScreenProps = {
  onNavigate: (screen: Screen) => void;
  onVerify: () => void;
};

export function OTPScreen({ onNavigate, onVerify }: OTPScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').slice(0, 6);
    
    while (newOtp.length < 6) {
      newOtp.push('');
    }
    
    setOtp(newOtp);
    
    // Focus last filled input
    const lastFilledIndex = newOtp.findIndex((val) => !val);
    if (lastFilledIndex !== -1) {
      inputRefs.current[lastFilledIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast.error('Introduz o código completo');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Verify OTP (mock - accept any 6 digit code)
      onVerify();
      toast.success('Código verificado com sucesso! ✅');
      setIsLoading(false);
      onNavigate('home');
    }, 1000);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    toast.success('Novo código enviado! 📧');
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
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-white">Verificação</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Introduz o código de 6 dígitos que enviámos para o teu email
            </p>
          </div>
        </motion.div>

        {/* OTP Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6 space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/30 dark:border-slate-700/50 focus:border-purple-400 dark:focus:border-purple-500"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Reenviar código
                </button>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reenviar código em <span className="text-purple-600 dark:text-purple-400">{timer}s</span>
                </p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              size="lg"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 border-0"
            >
              {isLoading ? (
                'A verificar...'
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Verificar Código
                </>
              )}
            </Button>
          </GlassCard>
        </motion.div>

        {/* Help text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não recebeste o código? Verifica a pasta de spam ou{' '}
              <button
                onClick={() => onNavigate('forgot-password')}
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                tenta outro email
              </button>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
