import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, Clock, Zap, Target } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    teamName: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = [
    { 
      label: 'Team Productivity', 
      value: '94%', 
      change: '+12%', 
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      label: 'Active Members', 
      value: '24', 
      change: '+3', 
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Tasks Completed', 
      value: '142', 
      change: '+18', 
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      label: 'Avg Response Time', 
      value: '2.3h', 
      change: '-0.5h', 
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const quickActions = [
    { title: 'AI Task Prioritization', description: 'Let AI analyze and prioritize your tasks', icon: Zap },
    { title: 'Smart Meeting Prep', description: 'Generate meeting summaries and action items', icon: Target },
    { title: 'Team Sentiment Check', description: 'Monitor team mood and communication health', icon: Users },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Welcome, {user.name}! ✨
        </h1>
        <p className="text-slate-400">Here's the dashboard for your team: "{user.teamName}"</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
      >
        <h3 className="text-xl font-semibold mb-6 text-white">AI-Powered Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.title}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-4 text-left border border-slate-600/50 hover:border-purple-500/50 transition-colors"
              >
                <Icon className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">{action.title}</h4>
                <p className="text-slate-400 text-sm">{action.description}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
      >
        <h3 className="text-xl font-semibold mb-6 text-white">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'Sarah Chen', action: 'completed high-priority task', time: '2 min ago', color: 'green' },
            { user: 'AI Assistant', action: 'identified potential bottleneck in Project Alpha', time: '5 min ago', color: 'purple' },
            { user: 'Mike Johnson', action: 'updated project dependencies', time: '12 min ago', color: 'blue' },
            { user: 'Team Meeting', action: 'generated follow-up tasks automatically', time: '1 hour ago', color: 'orange' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full bg-${activity.color}-400`}></div>
              <div className="flex-1">
                <span className="font-medium text-white">{activity.user}</span> {activity.action}
              </div>
              <span className="text-slate-400 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
