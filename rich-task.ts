import { LucideIcon } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: TeamMember;
  text: string;
  timestamp: string;
}

export interface ProjectInfo {
  name: string;
  avatarIcon: LucideIcon;
  color: string;
}

export interface RichTask {
  id: string;
  title: string;
  project: ProjectInfo;
  assignees: TeamMember[];
  deadline: Date;
  status: 'On Track' | 'At Risk' | 'Needs Review' | 'Completed';
  progressHistory: { day: number; value: number }[];
  comments: Comment[];
}
