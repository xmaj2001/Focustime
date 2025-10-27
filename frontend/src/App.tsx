import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { OTPScreen } from './components/OTPScreen';
import { ProfileScreen, User } from './components/ProfileScreen';
import { ChangePasswordScreen } from './components/ChangePasswordScreen';
import { DeviceManagementScreen, Device } from './components/DeviceManagementScreen';
import { TimeGroupsScreen, TimeGroup } from './components/TimeGroupsScreen';
import { AddTimeGroupScreen } from './components/AddTimeGroupScreen';
import { HomeScreen } from './components/HomeScreen';
import { AddTaskScreen } from './components/AddTaskScreen';
import { ActiveTaskScreen } from './components/ActiveTaskScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { AvailableTimeScreen } from './components/AvailableTimeScreen';
import { Toaster } from './components/ui/sonner';

export type Task = {
  id: string;
  name: string;
  duration: number; // in minutes
  category: 'study' | 'food' | 'rest' | 'chores' | 'work' | 'fitness' | 'social' | 'other';
  startTime?: string;
  completed: boolean;
  timeSpent?: number; // in minutes
  createdAt: Date;
  timeGroupId?: string; // Optional: associate task with a time group
};

export type Screen = 
  | 'welcome' 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'otp' 
  | 'home' 
  | 'add' 
  | 'active' 
  | 'summary' 
  | 'available-time' 
  | 'profile' 
  | 'change-password' 
  | 'devices'
  | 'time-groups'
  | 'add-time-group';

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Max',
    email: 'max@focustime.com',
    avatar: '',
  });

  // Devices state
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      isCurrent: true,
      location: 'Lisboa, Portugal',
      lastActive: 'Agora',
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      isCurrent: false,
      location: 'Lisboa, Portugal',
      lastActive: 'Há 2 horas',
    },
  ]);

  // Time Groups state
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([
    {
      id: '1',
      name: 'Escola',
      icon: 'graduation-cap',
      color: '#3B82F6',
      totalHours: 8,
      description: 'Tarefas relacionadas com a escola',
      taskCount: 0,
    },
    {
      id: '2',
      name: 'Trabalho',
      icon: 'briefcase',
      color: '#8B5CF6',
      totalHours: 10,
      description: 'Tarefas do trabalho',
      taskCount: 0,
    },
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Matabichar',
      duration: 20,
      category: 'food',
      startTime: '08:00',
      completed: true,
      timeSpent: 20,
      createdAt: new Date(),
      timeGroupId: '1',
    },
    {
      id: '2',
      name: 'Estudar Matemática',
      duration: 120,
      category: 'study',
      startTime: '09:00',
      completed: false,
      timeSpent: 0,
      createdAt: new Date(),
      timeGroupId: '1',
    },
    {
      id: '3',
      name: 'Descanso',
      duration: 30,
      category: 'rest',
      startTime: '11:30',
      completed: false,
      timeSpent: 0,
      createdAt: new Date(),
    },
  ]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  // App settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [availableStartTime, setAvailableStartTime] = useState('08:00');
  const [availableEndTime, setAvailableEndTime] = useState('18:00');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Authentication functions
  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: email.split('@')[0],
      email: email,
      avatar: '',
    });
    setCurrentScreen('home');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration
    setUser({
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: '',
    });
  };

  const handleVerifyOTP = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    setUser({
      id: '',
      name: '',
      email: '',
    });
  };

  // Task functions
  const addTask = (task: Omit<Task, 'id' | 'completed' | 'timeSpent' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      timeSpent: 0,
      createdAt: new Date(),
      timeGroupId: selectedGroupId || undefined,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completeTask = (id: string, timeSpent: number) => {
    updateTask(id, { completed: true, timeSpent });
    setActiveTask(null);
  };

  // Time Group functions
  const addTimeGroup = (group: Omit<TimeGroup, 'id' | 'taskCount'>) => {
    const newGroup: TimeGroup = {
      ...group,
      id: Date.now().toString(),
      taskCount: 0,
    };
    setTimeGroups([...timeGroups, newGroup]);
  };

  const deleteTimeGroup = (id: string) => {
    setTimeGroups(timeGroups.filter(group => group.id !== id));
    // Remove timeGroupId from tasks
    setTasks(tasks.map(task => 
      task.timeGroupId === id ? { ...task, timeGroupId: undefined } : task
    ));
  };

  // Device functions
  const removeDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  // Available time functions
  const updateAvailableTime = (start: string, end: string) => {
    setAvailableStartTime(start);
    setAvailableEndTime(end);
  };

  // Navigation with group context
  const handleNavigate = (screen: Screen, groupId?: string) => {
    if (groupId !== undefined) {
      setSelectedGroupId(groupId);
    }
    setCurrentScreen(screen);
  };

  // Filter tasks by selected group
  const displayTasks = selectedGroupId 
    ? tasks.filter(task => task.timeGroupId === selectedGroupId)
    : tasks;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950 transition-colors duration-500" />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* App container */}
      <div className="relative z-10 flex justify-center items-start min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Authentication Screens */}
          {currentScreen === 'login' && (
            <LoginScreen onNavigate={handleNavigate} onLogin={handleLogin} />
          )}
          {currentScreen === 'register' && (
            <RegisterScreen onNavigate={handleNavigate} onRegister={handleRegister} />
          )}
          {currentScreen === 'forgot-password' && (
            <ForgotPasswordScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'otp' && (
            <OTPScreen onNavigate={handleNavigate} onVerify={handleVerifyOTP} />
          )}

          {/* Profile & Settings Screens */}
          {currentScreen === 'profile' && (
            <ProfileScreen
              onNavigate={handleNavigate}
              user={user}
              onUpdateUser={setUser}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
          )}
          {currentScreen === 'change-password' && (
            <ChangePasswordScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'devices' && (
            <DeviceManagementScreen
              onNavigate={handleNavigate}
              devices={devices}
              onRemoveDevice={removeDevice}
            />
          )}

          {/* Time Groups Screens */}
          {currentScreen === 'time-groups' && (
            <TimeGroupsScreen
              onNavigate={handleNavigate}
              timeGroups={timeGroups}
              tasks={tasks}
              onDeleteGroup={deleteTimeGroup}
              onSelectGroup={setSelectedGroupId}
            />
          )}
          {currentScreen === 'add-time-group' && (
            <AddTimeGroupScreen
              onNavigate={handleNavigate}
              onAddGroup={addTimeGroup}
            />
          )}

          {/* Main App Screens */}
          {currentScreen === 'welcome' && (
            <WelcomeScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'home' && (
            <HomeScreen
              tasks={displayTasks}
              onNavigate={handleNavigate}
              onStartTask={setActiveTask}
              onDeleteTask={deleteTask}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
          )}
          {currentScreen === 'add' && (
            <AddTaskScreen
              onAddTask={addTask}
              onNavigate={handleNavigate}
            />
          )}
          {currentScreen === 'active' && activeTask && (
            <ActiveTaskScreen
              task={activeTask}
              onComplete={completeTask}
              onSkip={() => setActiveTask(null)}
              onNavigate={handleNavigate}
            />
          )}
          {currentScreen === 'summary' && (
            <SummaryScreen
              tasks={displayTasks}
              onNavigate={handleNavigate}
            />
          )}
          {currentScreen === 'available-time' && (
            <AvailableTimeScreen
              onNavigate={handleNavigate}
              startTime={availableStartTime}
              endTime={availableEndTime}
              onUpdateTime={updateAvailableTime}
            />
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
