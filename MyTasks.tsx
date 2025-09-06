import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { CheckCircle, Clock, Edit, Settings, Bell, Palette, AlertCircle, ListTodo } from 'lucide-react';
import { getAvatarInitials } from '../utils/teamNameGenerator';
import { Task } from '../types/my-tasks';

const generateMockTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  const categories = ['Project Phoenix', 'Marketing Campaign', 'Mobile App', 'Website Redesign'];
  for (let i = 0; i < count; i++) {
    const status = faker.helpers.arrayElement(['To-Do', 'In Progress', 'Completed'] as const);
    tasks.push({
      id: faker.string.uuid(),
      title: faker.hacker.phrase().replace(/^./, (char) => char.toUpperCase()),
      category: faker.helpers.arrayElement(categories),
      status,
      progress: status === 'Completed' ? 100 : (status === 'In Progress' ? faker.number.int({ min: 10, max: 90 }) : 0),
      dueDate: faker.date.future(),
    });
  }
  return tasks;
};

interface MyTasksProps {
  onOpenTaskModal: (task: Task) => void;
}

const MyTasks: React.FC<MyTasksProps> = ({ onOpenTaskModal }) => {
  const [tasks, setTasks] = useState<Task[]>(() => generateMockTasks(12));

  const handleCompleteTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Completed', progress: 100 } : task
      )
    );
  };

  const getStatusStyles = (status: Task['status']) => {
    switch (status) {
      case 'In Progress':
        return { text: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-900/30' };
      case 'Completed':
        return { text: 'Completed', color: 'text-green-400', bg: 'bg-green-900/30' };
      case 'To-Do':
        return { text: 'To-Do', color: 'text-slate-400', bg: 'bg-slate-700/50' };
    }
  };

  const summary = useMemo(() => {
    const now = new Date();
    return {
      total: tasks.length,
      overdue: tasks.filter(t => t.dueDate < now && t.status !== 'Completed').length,
      dueToday: tasks.filter(t => t.dueDate.toDateString() === now.toDateString() && t.status !== 'Completed').length,
    };
  }, [tasks]);

  return (
    <div className="flex gap-8 h-full">
      {/* Main Content */}
      <div className="flex-grow space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-slate-400">Your personal board for focus and productivity.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const statusStyles = getStatusStyles(task.status);
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-purple-300 bg-purple-900/40 px-2 py-1 rounded-full">
                    {task.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles.bg} ${statusStyles.color}`}>
                    {statusStyles.text}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-6 h-14">{task.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-sm">Progress</span>
                      <span className="text-white font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          task.status === 'Completed' ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Due: {task.dueDate.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {task.status !== 'Completed' && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCompleteTask(task.id)}
                      className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/40"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onOpenTaskModal(task)}
                    className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/40"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Compact Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-72 flex-shrink-0 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 h-full sticky top-6"
      >
        <div className="flex flex-col h-full">
          {/* Workspace Info */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
              {getAvatarInitials('Demo User')}
            </div>
            <div>
              <h3 className="font-semibold text-white">Demo User</h3>
              <p className="text-sm text-slate-400">The Awesome Team</p>
            </div>
          </div>

          {/* Task Summary */}
          <div className="mb-8">
            <h4 className="font-semibold text-slate-300 mb-4">Task Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-400"><ListTodo className="w-4 h-4" /> Total Tasks</div>
                <span className="font-bold text-white">{summary.total}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-orange-400"><AlertCircle className="w-4 h-4" /> Overdue</div>
                <span className="font-bold text-orange-400">{summary.overdue}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-blue-400"><Clock className="w-4 h-4" /> Due Today</div>
                <span className="font-bold text-blue-400">{summary.dueToday}</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-auto">
            <h4 className="font-semibold text-slate-300 mb-4">Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400"><Settings className="w-4 h-4" /> General</div>
                <button className="text-purple-400 hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400"><Bell className="w-4 h-4" /> Notifications</div>
                <button className="text-purple-400 hover:underline">Manage</button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400"><Palette className="w-4 h-4" /> Appearance</div>
                <button className="text-purple-400 hover:underline">Customize</button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default MyTasks;
