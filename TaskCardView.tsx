import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import RichTaskCard from './RichTaskCard';
import { RichTask, TeamMember, Comment, ProjectInfo } from '../types/rich-task';
import { getAvatarInitials, generateUserNickname } from '../utils/teamNameGenerator';
import { Briefcase, Code, Palette, Rocket } from 'lucide-react';

const generateMockRichTasks = (count: number): RichTask[] => {
  const projects: ProjectInfo[] = [
    { name: 'Project Phoenix', avatarIcon: Rocket, color: 'from-red-500 to-orange-500' },
    { name: 'UI Overhaul', avatarIcon: Palette, color: 'from-purple-500 to-pink-500' },
    { name: 'API Integration', avatarIcon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'Marketing Launch', avatarIcon: Briefcase, color: 'from-green-500 to-emerald-500' },
  ];

  const team: TeamMember[] = Array.from({ length: 10 }, () => {
    const name = faker.person.fullName();
    return { id: faker.string.uuid(), name, avatar: getAvatarInitials(name), nickname: generateUserNickname() };
  });

  return Array.from({ length: count }, () => {
    const assignees = faker.helpers.arrayElements(team, { min: 1, max: 4 });
    const commentsCount = faker.number.int({ min: 0, max: 5 });
    const comments: Comment[] = Array.from({ length: commentsCount }, () => ({
      id: faker.string.uuid(),
      user: faker.helpers.arrayElement(team),
      text: faker.lorem.sentence(),
      timestamp: `${faker.number.int({ min: 1, max: 10 })}h ago`,
    }));

    const progressHistory = Array.from({ length: 10 }, (_, i) => ({
      day: i + 1,
      value: faker.number.int({ min: i * 5, max: (i + 1) * 10 }),
    }));
    // Ensure the last value is not over 100
    progressHistory[9].value = Math.min(progressHistory[9].value, 100);

    return {
      id: faker.string.uuid(),
      title: faker.hacker.phrase().replace(/^./, (char) => char.toUpperCase()),
      project: faker.helpers.arrayElement(projects),
      assignees,
      deadline: faker.date.future(),
      status: faker.helpers.arrayElement(['On Track', 'At Risk', 'Needs Review', 'Completed']),
      progressHistory,
      comments,
    };
  });
};

interface TaskCardViewProps {
  onOpenTaskModal: (task: any) => void;
}

const TaskCardView: React.FC<TaskCardViewProps> = ({ onOpenTaskModal }) => {
  const [tasks] = useState<RichTask[]>(() => generateMockRichTasks(12));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Task Cards</h1>
        <p className="text-slate-400">A detailed, visual overview of your team's tasks.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <RichTaskCard task={task} onOpenTaskModal={onOpenTaskModal} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskCardView;
