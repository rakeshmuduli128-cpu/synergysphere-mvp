import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import TeamWorkload from './components/TeamWorkload';
import MeetingAssistant from './components/MeetingAssistant';
import ChatSentiment from './components/ChatSentiment';
import ProjectDependencies from './components/ProjectDependencies';
import VoiceCommands from './components/VoiceCommands';
import Gamification from './components/Gamification';
import AIAssistant from './components/AIAssistant';
import AccountCreation from './components/AccountCreation';
import Login from './components/Login';
import ProjectsDashboard from './components/ProjectsDashboard';
import ProjectBoard from './components/ProjectBoard';
import MyTasks from './components/MyTasks';
import ProjectCreationForm from './components/ProjectCreationForm';
import TaskCreationModal from './components/TaskCreationModal';
import TaskCardView from './components/TaskCardView';
import { Task as BoardTask } from './types/board';
import { Task as MyTaskType } from './types/my-tasks';

type View = 'dashboard' | 'projects' | 'board' | 'tasks' | 'mytasks' | 'workload' | 'meetings' | 'chat' | 'dependencies' | 'voice' | 'gamification' | 'create-project' | 'taskcards';
type AuthView = 'login' | 'signup';

interface User {
  name: string;
  teamName: string;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('signup');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<BoardTask | MyTaskType | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleAccountCreated = (userData: User) => {
    setUser(userData);
  };

  const handleOpenTaskModal = (task?: BoardTask | MyTaskType) => {
    setEditingTask(task || null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData: any) => {
    // In a real app, you'd update your central state management here
    console.log('Saving task:', taskData);
    handleCloseTaskModal();
  };


  if (!user) {
    return (
      <AnimatePresence mode="wait">
        {authView === 'signup' ? (
          <motion.div key="signup">
            <AccountCreation onAccountCreated={handleAccountCreated} onSwitchToLogin={() => setAuthView('login')} />
          </motion.div>
        ) : (
          <motion.div key="login">
            <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setAuthView('signup')} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'projects':
        return <ProjectsDashboard onViewChange={setCurrentView} />;
      case 'board':
        return <ProjectBoard onOpenTaskModal={handleOpenTaskModal} />;
      case 'tasks':
        return <TaskManager />;
      case 'mytasks':
        return <MyTasks onOpenTaskModal={handleOpenTaskModal} />;
      case 'taskcards':
        return <TaskCardView onOpenTaskModal={handleOpenTaskModal} />;
      case 'workload':
        return <TeamWorkload />;
      case 'meetings':
        return <MeetingAssistant />;
      case 'chat':
        return <ChatSentiment />;
      case 'dependencies':
        return <ProjectDependencies />;
      case 'voice':
        return <VoiceCommands />;
      case 'gamification':
        return <Gamification />;
      case 'create-project':
        return <ProjectCreationForm onProjectCreated={() => setCurrentView('projects')} onCancel={() => setCurrentView('projects')} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <AIAssistant />
      </div>
      <TaskCreationModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
}

export default App;
