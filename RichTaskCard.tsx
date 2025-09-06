import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { RichTask, Comment as CommentType } from '../types/rich-task';
import { Clock, MessageSquare, Edit, CheckCircle, AlertTriangle, Search, Send } from 'lucide-react';
import clsx from 'clsx';

interface RichTaskCardProps {
  task: RichTask;
  onOpenTaskModal: (task: any) => void;
}

const getStatusInfo = (status: RichTask['status']) => {
  switch (status) {
    case 'On Track':
      return { icon: CheckCircle, color: 'text-green-400' };
    case 'At Risk':
      return { icon: AlertTriangle, color: 'text-orange-400' };
    case 'Needs Review':
      return { icon: Search, color: 'text-blue-400' };
    case 'Completed':
      return { icon: CheckCircle, color: 'text-purple-400' };
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/80 p-2 border border-slate-700 rounded-md text-xs">
        <p className="label text-white">{`Day ${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const RichTaskCard: React.FC<RichTaskCardProps> = ({ task, onOpenTaskModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const StatusIcon = getStatusInfo(task.status).icon;
  const statusColor = getStatusInfo(task.status).color;
  const ProjectIcon = task.project.avatarIcon;

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
      className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-5 border border-slate-700/50 cursor-pointer overflow-hidden"
    >
      <motion.div layout="position" className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r", task.project.color)}>
              <ProjectIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">{task.project.name}</p>
              <p className="text-xs text-slate-400">Project</p>
            </div>
          </div>
          <StatusIcon className={clsx("w-6 h-6", statusColor)} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 flex-grow">{task.title}</h3>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{task.deadline.toLocaleDateString()}</span>
          </div>
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map(a => (
              <div key={a.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xs font-bold border-2 border-slate-800">
                {a.avatar}
              </div>
            ))}
          </div>
        </div>

        {/* Sparkline */}
        <div className="h-16 -mx-5 -mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={task.progressHistory} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(168, 85, 247, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Line type="monotone" dataKey="value" stroke="url(#progressGradient)" strokeWidth={2} dot={false} />
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-700/50"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-white">Comments</h4>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); onOpenTaskModal(task); }} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><Edit className="w-4 h-4 text-slate-400" /></button>
                <button className="p-2 rounded-full hover:bg-slate-700 transition-colors"><MessageSquare className="w-4 h-4 text-slate-400" /></button>
              </div>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-2 text-sm">
                  <div className="w-7 h-7 mt-1 bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">{comment.user.avatar}</div>
                  <div className="bg-slate-700/50 p-2 rounded-lg flex-grow">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-300">{comment.user.nickname}</p>
                      <p className="text-xs text-slate-500">{comment.timestamp}</p>
                    </div>
                    <p className="text-slate-300">{comment.text}</p>
                  </div>
                </div>
              ))}
              {task.comments.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No comments yet.</p>}
            </div>
            <div className="mt-3 flex gap-2">
              <input type="text" placeholder="Add a comment..." className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500" />
              <button className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RichTaskCard;
