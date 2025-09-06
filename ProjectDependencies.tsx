import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const ProjectDependencies: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('project-alpha');

  const projects = [
    { 
      id: 'project-alpha', 
      name: 'Project Alpha', 
      status: 'in-progress', 
      dependencies: 3, 
      blockers: 1,
      completion: 75 
    },
    { 
      id: 'project-beta', 
      name: 'Project Beta', 
      status: 'planning', 
      dependencies: 5, 
      blockers: 0,
      completion: 25 
    },
    { 
      id: 'project-gamma', 
      name: 'Project Gamma', 
      status: 'completed', 
      dependencies: 2, 
      blockers: 0,
      completion: 100 
    },
  ];

  const dependencies = {
    'project-alpha': [
      {
        id: '1',
        task: 'User Authentication System',
        dependsOn: 'Database Setup',
        status: 'blocked',
        assignee: 'Sarah Chen',
        impact: 'high',
        estimatedDelay: '2 days'
      },
      {
        id: '2',
        task: 'Payment Integration',
        dependsOn: 'User Authentication System',
        status: 'waiting',
        assignee: 'Mike Johnson',
        impact: 'medium',
        estimatedDelay: null
      },
      {
        id: '3',
        task: 'Email Notifications',
        dependsOn: 'User Management',
        status: 'ready',
        assignee: 'Alex Kumar',
        impact: 'low',
        estimatedDelay: null
      },
    ],
    'project-beta': [
      {
        id: '4',
        task: 'Mobile App Design',
        dependsOn: 'Brand Guidelines',
        status: 'waiting',
        assignee: 'Emma Wilson',
        impact: 'high',
        estimatedDelay: null
      },
      {
        id: '5',
        task: 'API Development',
        dependsOn: 'Database Schema',
        status: 'ready',
        assignee: 'David Park',
        impact: 'high',
        estimatedDelay: null
      },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'waiting': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'ready': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-700/30 border-slate-600/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked': return AlertTriangle;
      case 'waiting': return Clock;
      case 'ready': return CheckCircle;
      default: return Clock;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Cross-Project Dependencies</h1>
        <p className="text-slate-400">Visualize and manage project interdependencies to reduce risks</p>
      </motion.div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedProject(project.id)}
            className={`bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border cursor-pointer transition-all ${
              selectedProject === project.id
                ? 'border-purple-500/50 bg-purple-900/20'
                : 'border-slate-700/50 hover:border-purple-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{project.name}</h3>
              <div className={`w-3 h-3 rounded-full ${
                project.status === 'completed' ? 'bg-green-400' :
                project.status === 'in-progress' ? 'bg-blue-400' : 'bg-yellow-400'
              }`}></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Progress</span>
                <span className="text-white font-medium">{project.completion}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.completion}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{project.dependencies}</div>
                  <div className="text-slate-400 text-xs">Dependencies</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{project.blockers}</div>
                  <div className="text-slate-400 text-xs">Blockers</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dependency Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">
            {projects.find(p => p.id === selectedProject)?.name} Dependencies
          </h3>
        </div>

        <div className="space-y-4">
          {dependencies[selectedProject as keyof typeof dependencies]?.map((dep, index) => {
            const StatusIcon = getStatusIcon(dep.status);
            
            return (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-white">{dep.task}</h4>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(dep.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {dep.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <span>Depends on:</span>
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-purple-300">{dep.dependsOn}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Assignee:</span>
                        <span className="text-white ml-2">{dep.assignee}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Impact:</span>
                        <span className={`ml-2 font-medium ${getImpactColor(dep.impact)}`}>
                          {dep.impact}
                        </span>
                      </div>
                      {dep.estimatedDelay && (
                        <div>
                          <span className="text-slate-400">Delay:</span>
                          <span className="text-red-400 ml-2">{dep.estimatedDelay}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-purple-400">AI Recommendations</span>
          </div>
          <div className="space-y-2 text-slate-300 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
              <p>Critical path identified: Database Setup → User Authentication → Payment Integration</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <p>Consider parallel development of Email Notifications to reduce overall timeline</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <p>Estimated project completion can be accelerated by 3 days with resource reallocation</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDependencies;
