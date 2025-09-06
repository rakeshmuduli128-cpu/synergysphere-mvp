export interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

export interface Task {
  id: string;
  content: string;
  assignee: TeamMember;
  streak: number;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}
