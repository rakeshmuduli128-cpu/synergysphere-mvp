import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { X, Paperclip, MessageSquare, Send, User, Calendar, Briefcase, CheckCircle, Loader } from 'lucide-react';
import { generateUserNickname, getAvatarInitials } from '../utils/teamNameGenerator';
import { Task as BoardTask } from '../types/board';
import { Task as MyTaskType } from '../types/my-tasks';

interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  user: TeamMember;
  text: string;
  timestamp: string;
}

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: any) => void;
  taskToEdit: BoardTask | MyTaskType | null;
}

const generateMockTeam = (count: number): TeamMember[] => {
  return Array.from({ length: count }, () => {
    const name = faker.person.fullName();
    return {
      id: faker.string.uuid(),
      name,
      nickname: generateUserNickname(),
      avatar: getAvatarInitials(name),
    };
  });
};

const generateMockProjects = (count: number): Project[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName() + ' Initiative',
  }));
};

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignee, setAssignee] = useState<TeamMember | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const [assigneeSearch, setAssigneeSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [teamMembers] = useState<TeamMember[]>(() => generateMockTeam(10));
  const [projects] = useState<Project[]>(() => generateMockProjects(5));

  useEffect(() => {
    if (taskToEdit) {
      // This is a simplified mapping. A real app would need a more robust way to handle different task types.
      setTitle('content' in taskToEdit ? taskToEdit.content : taskToEdit.title);
      if ('assignee' in taskToEdit) setAssignee(taskToEdit.assignee);
      if ('dueDate' in taskToEdit && taskToEdit.dueDate) {
        setDueDate(new Date(taskToEdit.dueDate).toISOString().split('T')[0]);
      }
      // Mock comments for demo
      setComments([
        { id: '1', user: teamMembers[2], text: 'Can we get this done by EOD?', timestamp: '2 hours ago' },
        { id: '2', user: teamMembers[4], text: 'Working on it now!', timestamp: '1 hour ago' },
      ]);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setProjectId('');
      setAssignee(null);
      setDueDate('');
      setPriority('Medium');
      setAttachments([]);
      setImagePreviews([]);
      setComments([]);
      setNewComment('');
      setAssigneeSearch('');
    }
  }, [taskToEdit, isOpen]);

  const suggestedAssignees = useMemo(() => {
    if (!assigneeSearch) return [];
    return teamMembers.filter(member =>
      member.name.toLowerCase().includes(assigneeSearch.toLowerCase()) ||
      member.nickname.toLowerCase().includes(assigneeSearch.toLowerCase())
    ).slice(0, 5);
  }, [assigneeSearch, teamMembers]);

  const handleSelectAssignee = (member: TeamMember) => {
    setAssignee(member);
    setAssigneeSearch('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...files]);

      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: faker.string.uuid(),
      user: teamMembers[0], // Mocking as current user
      text: newComment,
      timestamp: 'Just now',
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    setTimeout(() => {
      const taskData = { id: taskToEdit?.id || faker.string.uuid(), title, description, projectId, assignee, dueDate, priority, attachments, comments };
      onSave(taskData);
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        onClose();
        setIsSaved(false);
      }, 1000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{taskToEdit ? 'Edit Task' : 'Create Task'}</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-transparent text-2xl font-semibold text-white placeholder-slate-500 focus:outline-none"
                />
                <textarea
                  placeholder="Add a more detailed description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl p-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Paperclip className="w-5 h-5" /> Attachments</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {imagePreviews.map((src, index) => (
                      <motion.img
                        key={index}
                        src={src}
                        alt="preview"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-600/80 rounded-xl p-4 text-slate-400 hover:border-purple-500 hover:text-purple-400 transition-colors">
                    Add Files
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Comments</h3>
                  <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                          {comment.user.avatar}
                        </div>
                        <div className="flex-1 bg-slate-700/30 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-white">{comment.user.nickname}</span>
                            <span className="text-xs text-slate-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-slate-300">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                      className="flex-1 bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button type="button" onClick={handleAddComment} className="p-2 bg-purple-500 rounded-full text-white hover:bg-purple-600"><Send className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="relative">
                  <label className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><User className="w-4 h-4" /> Assignee</label>
                  {assignee ? (
                    <div className="flex items-center gap-3 bg-slate-700/30 p-2 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-xs">{assignee.avatar}</div>
                      <span className="text-white">{assignee.name}</span>
                      <button onClick={() => setAssignee(null)} className="ml-auto text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Search for a team member..."
                      value={assigneeSearch}
                      onChange={(e) => setAssigneeSearch(e.target.value)}
                      className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  )}
                  <AnimatePresence>
                    {suggestedAssignees.length > 0 && !assignee && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded-lg mt-1 shadow-lg"
                      >
                        {suggestedAssignees.map(member => (
                          <button key={member.id} type="button" onClick={() => handleSelectAssignee(member)} className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-purple-500/10">
                            <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-xs">{member.avatar}</div>
                            <span className="text-slate-300">{member.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><Briefcase className="w-4 h-4" /> Project</label>
                  <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full appearance-none bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option value="" disabled>Select a project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><Calendar className="w-4 h-4" /> Due Date</label>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>
            </form>
            <div className="p-6 border-t border-slate-700/50 flex justify-end gap-4">
              <button onClick={onClose} className="px-6 py-2 bg-slate-700/50 text-white font-semibold rounded-xl hover:bg-slate-700/80">Cancel</button>
              <button onClick={handleSave} disabled={isSaving || isSaved} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl flex items-center justify-center w-32 h-10">
                <AnimatePresence mode="wait">
                  {isSaving ? (
                    <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Loader className="w-5 h-5 animate-spin" /></motion.div>
                  ) : isSaved ? (
                    <motion.div key="saved" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><CheckCircle className="w-5 h-5" /></motion.div>
                  ) : (
                    <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Save</motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskCreationModal;
