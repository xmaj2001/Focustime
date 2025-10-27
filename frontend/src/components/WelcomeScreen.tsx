import { motion } from 'motion/react';
import { Clock, Bell, TrendingUp, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';

type WelcomeScreenProps = {
  onNavigate: (screen: Screen) => void;
};

const features = [
  {
    icon: Calendar,
    title: '1. Planeamento Diário',
    description: 'Define o teu tempo disponível e adiciona atividades com duração e categoria',
    color: 'from-blue-500 to-indigo-500',
    details: [
      'Cria tarefas com nome, duração e horário',
      'Organiza por categorias (Estudo, Refeição, Descanso, etc.)',
      'Visualiza o teu dia em formato de timeline'
    ]
  },
  {
    icon: Bell,
    title: '2. Modo Execução',
    description: 'Recebe notificações quando for hora de começar ou terminar uma tarefa',
    color: 'from-purple-500 to-pink-500',
    details: [
      'Timer automático para cada tarefa',
      'Pausa ou termina quando quiseres',
      'Alarme ao finalizar o tempo'
    ]
  },
  {
    icon: TrendingUp,
    title: '3. Feedback & Aprendizado',
    description: 'Analisa o teu dia e percebe onde o tempo está a ir',
    color: 'from-pink-500 to-orange-500',
    details: [
      'Tempo planeado vs tempo real',
      'Distribuição por categorias',
      'Padrões e sugestões de melhoria'
    ]
  }
];

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-8 space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50"
          >
            <Clock className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-gray-900 dark:text-white flex items-center justify-center gap-2">
            FocusTime
            <Sparkles className="w-6 h-6 text-purple-500" />
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Um app simples pra gerir o teu tempo diário com base nas tuas rotinas e tarefas estimadas
          </p>
        </div>
      </motion.div>

      {/* Como Funciona */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-900 dark:text-white px-2"
        >
          🧠 Como Funciona
        </motion.h3>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
            >
              <GlassCard className="p-6 space-y-4 hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="pl-16 space-y-2">
                  {feature.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.15 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <GlassCard className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
          <p className="text-gray-700 dark:text-gray-300">
            💡 Isso ajuda a perceber padrões (tipo "sempre atraso no almoço 😅") e ajustar o dia seguinte pra manter o ritmo e saber onde o tempo tá indo!
          </p>
        </GlassCard>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
      >
        <Button
          onClick={() => onNavigate('home')}
          size="lg"
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-purple-500/30 border-0"
        >
          Começar a Usar
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
