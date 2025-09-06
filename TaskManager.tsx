import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Clock, AlertTriangle, Star, RotateCcw } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  status: 'todo' | 'inprogress' | 'completed';
  aiScore: number;
}

const TaskManager: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Set up secure login system with OAuth integration',
      priority: 'urgent',
      dueDate: '2025-01-15',
      assignee: 'Sarah Chen',
      status: 'inprogress',
      aiScore: 95
    },
    {
      id: '2',
      title: 'Design landing page',
      description: 'Create responsive landing page with modern UI components',
      priority: 'high',
      dueDate: '2025-01-18',
      assignee: 'Mike Johnson',
      status: 'todo',
      aiScore: 87
    },
    {
      id: '3',
      title: 'Database optimization',
      description: 'Improve query performance and add proper indexing',
      priority: 'medium',
      dueDate: '2025-01-22',
      assignee: 'Alex Kumar',
      status: 'todo',
      aiScore: 73
    },
    {
      id: '4',
      title: 'Write unit tests',
      description: 'Increase test coverage for critical components',
      priority: 'low',
      dueDate: '2025-01-25',
      assignee: 'Emma Wilson',
      status: 'completed',
      aiScore: 65
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'from-red-500 to-pink-500';
      case 'high': return 'from-orange-500 to-yellow-500';
      case 'medium': return 'from-blue-500 to-cyan-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'inprogress': return RotateCcw;
      default: return Circle;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Predictive Task Prioritization</h1>
        <p className="text-slate-400">AI-powered task management with smart prioritization</p>
      </motion.div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">2</div>
            <div className="text-slate-400 text-sm">Urgent Tasks Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-300">1</div>
            <div className="text-slate-400 text-sm">Potential Bottleneck</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">85%</div>
            <div className="text-slate-400 text-sm">Team Efficiency</div>
          </div>
        </div>
      </motion.div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => {
          const StatusIcon = getStatusIcon(task.status);
          const isFlipped = flippedCard === task.id;
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => setFlippedCard(isFlipped ? null : task.id)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isFlipped ? 'back' : 'front'}
                  initial={{ rotateY: isFlipped ? -180 : 0 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: isFlipped ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {!isFlipped ? (
                    // Front of card
                    <div className="w-full h-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(task.priority)}`}></div>
                        <div className="flex items-center gap-2">
                          {task.aiScore > 90 && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            </motion.div>
                          )}
                          <div className="text-xs text-slate-400">AI Score: {task.aiScore}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{task.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <StatusIcon className={`w-5 h-5 ${
                          task.status === 'completed' ? 'text-green-400' : 
                          task.status === 'inprogress' ? 'text-blue-400' : 'text-slate-400'
                        }`} />
                        <div className="text-xs text-slate-400">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {task.dueDate}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Back of card
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                      <h3 className="text-lg font-semibold text-white mb-4">Task Details</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-slate-400">Assignee:</span>
                          <span className="text-white ml-2">{task.assignee}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Priority:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}>
                            {task.priority.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Status:</span>
                          <span className="text-white ml-2 capitalize">{task.status.replace('inprogress', 'In Progress')}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">AI Recommendation:</span>
                          <p className="text-white mt-1 text-xs">
                            {task.aiScore > 90 ? 'Requires immediate attention due to approaching deadline and dependencies.' :
                             task.aiScore > 75 ? 'High impact task that should be prioritized this sprint.' :
                             'Moderate priority - can be scheduled for next iteration.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;
