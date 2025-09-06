import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const TeamWorkload: React.FC = () => {
  const teamMembers = [
    { 
      name: 'Sarah Chen', 
      role: 'Frontend Developer', 
      workload: 85, 
      activeTasks: 5, 
      completedToday: 3,
      avatar: 'SC'
    },
    { 
      name: 'Mike Johnson', 
      role: 'Backend Developer', 
      workload: 92, 
      activeTasks: 6, 
      completedToday: 2,
      avatar: 'MJ'
    },
    { 
      name: 'Alex Kumar', 
      role: 'DevOps Engineer', 
      workload: 78, 
      activeTasks: 4, 
      completedToday: 4,
      avatar: 'AK'
    },
    { 
      name: 'Emma Wilson', 
      role: 'UI/UX Designer', 
      workload: 65, 
      activeTasks: 3, 
      completedToday: 5,
      avatar: 'EW'
    },
    { 
      name: 'David Park', 
      role: 'QA Engineer', 
      workload: 88, 
      activeTasks: 7, 
      completedToday: 1,
      avatar: 'DP'
    },
    { 
      name: 'Lisa Rodriguez', 
      role: 'Product Manager', 
      workload: 72, 
      activeTasks: 4, 
      completedToday: 3,
      avatar: 'LR'
    },
  ];

  const getWorkloadColor = (workload: number) => {
    if (workload > 90) return 'from-red-500 to-pink-500';
    if (workload > 80) return 'from-orange-500 to-yellow-500';
    if (workload > 70) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-emerald-500';
  };

  const getWorkloadStatus = (workload: number) => {
    if (workload > 90) return { text: 'Overloaded', icon: AlertCircle, color: 'text-red-400' };
    if (workload > 80) return { text: 'High Load', icon: TrendingUp, color: 'text-orange-400' };
    if (workload > 70) return { text: 'Optimal', icon: CheckCircle, color: 'text-blue-400' };
    return { text: 'Light Load', icon: CheckCircle, color: 'text-green-400' };
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Smart Resource Utilization</h1>
        <p className="text-slate-400">Real-time team workload distribution and optimization</p>
      </motion.div>

      {/* Team Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Team Overview</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">6</div>
            <div className="text-slate-400 text-sm">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">79%</div>
            <div className="text-slate-400 text-sm">Avg Workload</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">29</div>
            <div className="text-slate-400 text-sm">Active Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">18</div>
            <div className="text-slate-400 text-sm">Completed Today</div>
          </div>
        </div>
      </motion.div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => {
          const status = getWorkloadStatus(member.workload);
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-colors"
            >
              {/* Member Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{member.avatar}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{member.name}</h4>
                  <p className="text-slate-400 text-sm">{member.role}</p>
                </div>
                <div className={`flex items-center gap-1 ${status.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">{status.text}</span>
                </div>
              </div>

              {/* Workload Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Workload</span>
                  <span className="text-white font-semibold">{member.workload}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${member.workload}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${getWorkloadColor(member.workload)}`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{member.activeTasks}</div>
                  <div className="text-slate-400 text-xs">Active Tasks</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-400">{member.completedToday}</div>
                  <div className="text-slate-400 text-xs">Completed Today</div>
                </div>
              </div>

              {/* AI Recommendation */}
              {member.workload > 90 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    Consider redistributing 2-3 tasks to maintain optimal performance.
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
      >
        <h3 className="text-xl font-semibold text-white mb-4">AI Workload Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
            <p className="text-slate-300 text-sm">
              <strong>Mike Johnson</strong> is approaching burnout risk. Consider reassigning 2 lower-priority tasks.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-slate-300 text-sm">
              <strong>Emma Wilson</strong> has capacity for 2-3 additional tasks this week.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-slate-300 text-sm">
              Team efficiency could improve by 15% with optimal task redistribution.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamWorkload;
