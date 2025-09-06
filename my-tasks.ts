export interface Task {
  id: string;
  title: string;
  category: string;
  status: 'To-Do' | 'In Progress' | 'Completed';
  progress: number;
  dueDate: Date;
}
