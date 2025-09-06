import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, ArrowRight, Loader, CheckCircle, Briefcase, TrendingUp } from 'lucide-react';
import { generateUserNickname } from '../utils/teamNameGenerator';

interface LoginProps {
  onLoginSuccess: (userData: { name: string; teamName: string }) => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setNickname(generateUserNickname());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Mock successful login
      onLoginSuccess({ name: 'Demo User', teamName: 'The Awesome Team' });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const productivityStats = [
    { label: 'Tasks This Week', value: '42', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Active Projects', value: '5', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Productivity', value: '92%', icon: TrendingUp, color: 'text-purple-400' },
  ];

  const recentProjects = [
    { name: 'Project Alpha', progress: 75 },
    { name: 'Project Beta', progress: 40 },
  ];

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
          <motion.div
            key="login-form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back,</h2>
            <p className="text-purple-300 text-xl font-medium mb-8">{nickname}!</p>
            <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="text-right">
                <a href="#" className="text-sm text-slate-400 hover:text-purple-300 transition-colors">Forgot Password?</a>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Log In'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-center text-slate-300 mb-4">Your Productivity Snapshot</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {productivityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 text-center"
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 flex items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="text-sm text-slate-300">{project.progress}%</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="font-medium text-purple-400 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
