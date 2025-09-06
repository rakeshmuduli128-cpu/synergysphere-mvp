import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Clock, Users, Briefcase } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { generateUserNickname, getAvatarInitials } from '../utils/teamNameGenerator';

interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'on-track' | 'at-risk' | 'completed';
  progress: number;
  dueDate: string;
  team: TeamMember[];
  color: string;
}

interface ProjectsDashboardProps {
  onViewChange: (view: string) => void;
}

const generateMockProjects = (count: number): Project[] => {
  const projects: Project[] = [];
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-yellow-500',
    'from-red-500 to-rose-500',
  ];

  for (let i = 0; i < count; i++) {
    const teamSize = faker.number.int({ min: 3, max: 6 });
    const team: TeamMember[] = Array.from({ length: teamSize }, () => {
      const name = faker.person.fullName();
      return {
        id: faker.string.uuid(),
        name,
        nickname: generateUserNickname(),
        avatar: getAvatarInitials(name),
      };
    });

    projects.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName() + ' Initiative',
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['on-track', 'at-risk', 'completed']),
      progress: faker.number.int({ min: 10, max: 100 }),
      dueDate: faker.date.future().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      team,
      color: faker.helpers.arrayElement(colors),
    });
  }
  return projects;
};

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ onViewChange }) => {
  const [projects] = useState<Project[]>(() => generateMockProjects(8));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [projects, searchTerm]);

  const getStatusStyles = (status: Project['status']) => {
    switch (status) {
      case 'on-track':
        return { text: 'On Track', color: 'text-green-400', bg: 'bg-green-900/30' };
      case 'at-risk':
        return { text: 'At Risk', color: 'text-orange-400', bg: 'bg-orange-900/30' };
      case 'completed':
        return { text: 'Completed', color: 'text-blue-400', bg: 'bg-blue-900/30' };
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects Overview</h1>
          <p className="text-slate-400">Track and manage all your team's initiatives.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <motion.button
            onClick={() => onViewChange('create-project')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl"
          >
            <Plus className="w-5 h-5" />
            New Project
          </motion.button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project, index) => {
          const status = getStatusStyles(project.status);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.color}`}>
                    {status.text}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 text-sm">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Due: {project.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.team.length} Members</span>
                  </div>
                </div>

                <div className="flex items-center -space-x-2">
                  {project.team.map((member) => (
                    <motion.div
                      key={member.id}
                      className="relative group"
                      whileHover={{ zIndex: 10, scale: 1.1 }}
                    >
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center font-bold text-white text-xs border-2 border-slate-800`}>
                        {member.avatar}
                      </div>
                      <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {member.nickname}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsDashboard;
