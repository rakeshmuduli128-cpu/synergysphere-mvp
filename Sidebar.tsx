import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  CheckSquare, 
  UserCheck,
  Users, 
  Calendar, 
  MessageSquare, 
  GitBranch, 
  Mic, 
  Trophy,
  Sparkles,
  LayoutGrid
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'board', label: 'Project Board', icon: KanbanSquare },
  { id: 'tasks', label: 'Smart Tasks', icon: CheckSquare },
  { id: 'mytasks', label: 'My Tasks', icon: UserCheck },
  { id: 'taskcards', label: 'Task Cards', icon: LayoutGrid },
  { id: 'workload', label: 'Team Workload', icon: Users },
  { id: 'meetings', label: 'Meeting Assistant', icon: Calendar },
  { id: 'chat', label: 'Chat Analysis', icon: MessageSquare },
  { id: 'dependencies', label: 'Dependencies', icon: GitBranch },
  { id: 'voice', label: 'Voice Commands', icon: Mic },
  { id: 'gamification', label: 'Achievements', icon: Trophy },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 h-screen sticky top-0"
    >
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-3 mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SynergySphere
            </h1>
            <p className="text-xs text-slate-400">AI-Enhanced Collaboration</p>
          </div>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 bg-purple-400 rounded-full ml-auto"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
