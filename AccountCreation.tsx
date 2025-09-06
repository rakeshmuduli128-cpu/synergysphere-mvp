import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Users, Sparkles, ArrowRight, Loader } from 'lucide-react';
import { generateTeamNameSuggestions, getAvatarInitials } from '../utils/teamNameGenerator';

interface AccountCreationProps {
  onAccountCreated: (userData: { name: string; teamName: string }) => void;
  onSwitchToLogin: () => void;
}

const AccountCreation: React.FC<AccountCreationProps> = ({ onAccountCreated, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [teamName, setTeamName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSuggestions(generateTeamNameSuggestions(4));
  }, []);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.email && formData.password) {
      setStep(2);
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName) {
      setIsLoading(true);
      setTimeout(() => {
        onAccountCreated({ name: formData.name, teamName });
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Join SynergySphere</h2>
            <p className="text-slate-400 mb-8">Start collaborating smarter, not harder.</p>
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Team</h2>
            <p className="text-slate-400 mb-8">Give your new team a fun identity.</p>
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Your Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-4">Or pick a fun suggestion:</p>
                <div className="grid grid-cols-2 gap-4">
                  {suggestions.map((name) => (
                    <motion.button
                      key={name}
                      type="button"
                      onClick={() => setTeamName(name)}
                      whileHover={{ y: -3 }}
                      className={`p-4 rounded-xl border transition-colors text-left ${
                        teamName === name
                          ? 'bg-purple-900/30 border-purple-500/50'
                          : 'bg-slate-800/50 border-slate-700 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center font-bold text-white">
                          {getAvatarInitials(name)}
                        </div>
                        <span className="font-medium text-white">{name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                Create Team & Enter <Sparkles className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SynergySphere
          </h1>
        </motion.div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-96 text-center"
              >
                <Loader className="w-12 h-12 text-purple-400 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {formData.name}!</h2>
                <p className="text-slate-400">Setting up your "{teamName}" workspace...</p>
              </motion.div>
            ) : (
              renderStep()
            )}
          </AnimatePresence>
        </div>
        <p className="text-center text-slate-500 text-sm mt-8">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-purple-400 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default AccountCreation;
