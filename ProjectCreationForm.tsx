import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { X, UploadCloud, Tag, User, ChevronDown, Plus, Sparkles, Briefcase, Users, Star } from 'lucide-react';
import { generateUserNickname, getAvatarInitials } from '../utils/teamNameGenerator';
import clsx from 'clsx';

interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

interface ProjectCreationFormProps {
  onProjectCreated: () => void;
  onCancel: () => void;
  projectToEdit?: any; // For future use
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

const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({ onProjectCreated, onCancel, projectToEdit }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [manager, setManager] = useState<string>('');
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [teamMembers] = useState<TeamMember[]>(() => generateMockTeam(8));
  const allSuggestedTags = useMemo(() => ['UI/UX', 'Backend', 'API', 'Mobile', 'Marketing', 'Frontend', 'DevOps', 'Testing', 'Documentation'], []);

  const filteredSuggestedTags = useMemo(() => {
    if (!tagInput) return [];
    return allSuggestedTags.filter(
      (t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(t)
    );
  }, [tagInput, tags, allSuggestedTags]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const addTag = (tag: string) => {
    const formattedTag = tag.trim();
    if (formattedTag && !tags.includes(formattedTag)) {
      setTags([...tags, formattedTag]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ projectName, description, priority, manager, tags, imageFile });
    // Simulate API call
    onProjectCreated();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {projectToEdit ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-slate-400">Fill in the details to get your new project up and running.</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Fields (Left/Main column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          
          <textarea
            placeholder="Project Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
          />

          <div>
            <label className="text-sm font-medium text-slate-400 mb-2 block">Project Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-48 bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
            >
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <AnimatePresence>
                {imagePreview ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    src={imagePreview}
                    alt="Project preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-slate-500">
                    <UploadCloud className="w-10 h-10 mx-auto mb-2" />
                    <p>Click to upload or drag & drop</p>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sidebar Fields (Right column) */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><Users className="w-4 h-4" /> Team Members</label>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3 h-48 overflow-y-auto">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.nickname}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="manager" className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><User className="w-4 h-4" /> Project Manager</label>
            <div className="relative">
              <select
                id="manager"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                required
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="" disabled>Select a manager</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><Star className="w-4 h-4" /> Priority</label>
            <div className="relative">
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="text-sm font-medium text-slate-400 mb-2 block flex items-center gap-2"><Tag className="w-4 h-4" /> Tags</label>
            <div className="relative">
              <div className="flex flex-wrap gap-2 bg-slate-800 border border-slate-700 rounded-xl p-2 mb-2 min-h-[40px]">
                {tags.map(tag => (
                  <motion.div
                    key={tag}
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1 bg-purple-500/20 text-purple-300 text-sm px-2 py-1 rounded"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? 'Add tags...' : ''}
                  className="flex-grow bg-transparent focus:outline-none text-white placeholder-slate-500"
                />
              </div>
              <AnimatePresence>
                {filteredSuggestedTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded-lg mt-1 shadow-lg"
                  >
                    {filteredSuggestedTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-purple-500/10"
                      >
                        {tag}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="lg:col-span-3 flex justify-end gap-4 mt-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-slate-700/50 text-white font-semibold rounded-xl"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {projectToEdit ? 'Save Changes' : 'Create Project'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectCreationForm;
