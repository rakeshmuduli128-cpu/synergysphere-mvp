import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { faker } from '@faker-js/faker';
import { generateUserNickname, getAvatarInitials } from '../utils/teamNameGenerator';
import { Plus, MessageCircle, Pencil, Zap } from 'lucide-react';
import { TeamMember, Task, Column, BoardData } from '../types/board';

const generateInitialData = (): BoardData => {
  const teamMembers: TeamMember[] = Array.from({ length: 10 }, () => {
    const name = faker.person.fullName();
    return {
      id: faker.string.uuid(),
      name,
      nickname: generateUserNickname(),
      avatar: getAvatarInitials(name),
    };
  });

  const tasks: { [key: string]: Task } = {};
  for (let i = 0; i < 15; i++) {
    const id = `task-${i}`;
    tasks[id] = {
      id,
      content: faker.hacker.phrase().replace(/^./, (char) => char.toUpperCase()),
      assignee: faker.helpers.arrayElement(teamMembers),
      streak: faker.number.int({ min: 0, max: 25 }),
    };
  }

  const columns: { [key: string]: Column } = {
    'column-1': { id: 'column-1', title: 'To-Do', taskIds: ['task-0', 'task-1', 'task-2', 'task-3'] },
    'column-2': { id: 'column-2', title: 'In Progress', taskIds: ['task-4', 'task-5', 'task-6'] },
    'column-3': { id: 'column-3', title: 'Review', taskIds: ['task-7', 'task-8'] },
    'column-4': { id: 'column-4', title: 'Completed', taskIds: ['task-9', 'task-10', 'task-11', 'task-12', 'task-13', 'task-14'] },
  };

  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  return { tasks, columns, columnOrder };
};

interface ProjectBoardProps {
  onOpenTaskModal: (task?: Task) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ onOpenTaskModal }) => {
  const [boardData, setBoardData] = useState<BoardData>(generateInitialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = boardData.columns[source.droppableId];
    const finishColumn = boardData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setBoardData({
        ...boardData,
        columns: { ...boardData.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Project Phoenix Board</h1>
          <p className="text-slate-400">Drag and drop tasks to organize your workflow.</p>
        </div>
        <motion.button
          onClick={() => onOpenTaskModal()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </motion.button>
      </motion.div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700/50 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-purple-900/20' : ''
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4 px-2 flex justify-between items-center">
                      {column.title}
                      <span className="text-sm font-normal text-slate-400 bg-slate-700/50 rounded-full px-2 py-1">
                        {tasks.length}
                      </span>
                    </h3>
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ y: -4, boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}
                              className={`group bg-slate-700/50 rounded-xl p-4 border border-slate-600/50 ${
                                snapshot.isDragging ? 'shadow-2xl scale-105 border-purple-500' : ''
                              }`}
                            >
                              <p className="text-white font-medium mb-3">{task.content}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                                    {task.assignee.avatar}
                                  </div>
                                  <span className="text-xs text-slate-400">{task.assignee.nickname}</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <motion.button onClick={() => onOpenTaskModal(task)} whileTap={{ scale: 0.9 }} className="text-slate-400 hover:text-white">
                                    <Pencil className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button whileTap={{ scale: 0.9 }} className="text-slate-400 hover:text-white">
                                    <MessageCircle className="w-4 h-4" />
                                  </motion.button>
                                  <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-1 text-orange-400 cursor-pointer">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-xs font-bold">{task.streak}</span>
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </motion.div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectBoard;
