import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, Crown, Medal, Gift, TrendingUp } from 'lucide-react';

const Gamification: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('achievements');

  const userStats = {
    level: 24,
    xp: 8450,
    xpToNext: 1550,
    streak: 12,
    totalPoints: 15680,
    rank: 3
  };

  const achievements = [
    {
      id: '1',
      title: 'Task Master',
      description: 'Complete 100 tasks',
      icon: Trophy,
      progress: 87,
      total: 100,
      unlocked: false,
      rarity: 'epic',
      reward: 500
    },
    {
      id: '2',
      title: 'Team Player',
      description: 'Collaborate on 50 projects',
      icon: Star,
      progress: 50,
      total: 50,
      unlocked: true,
      rarity: 'rare',
      reward: 300
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Complete 10 tasks in one day',
      icon: Zap,
      progress: 8,
      total: 10,
      unlocked: false,
      rarity: 'common',
      reward: 150
    },
    {
      id: '4',
      title: 'Perfect Streak',
      description: 'Maintain a 30-day activity streak',
      icon: Target,
      progress: 12,
      total: 30,
      unlocked: false,
      rarity: 'legendary',
      reward: 1000
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 18420, avatar: 'SC', badge: 'crown' },
    { rank: 2, name: 'Mike Johnson', points: 16890, avatar: 'MJ', badge: 'medal' },
    { rank: 3, name: 'You', points: 15680, avatar: 'YU', badge: 'medal' },
    { rank: 4, name: 'Alex Kumar', points: 14250, avatar: 'AK', badge: null },
    { rank: 5, name: 'Emma Wilson', points: 13100, avatar: 'EW', badge: null },
  ];

  const dailyChallenges = [
    { 
      id: '1', 
      title: 'Early Bird', 
      description: 'Complete your first task before 10 AM', 
      progress: 100, 
      reward: 50, 
      completed: true 
    },
    { 
      id: '2', 
      title: 'Communicator', 
      description: 'Send 5 helpful messages in team channels', 
      progress: 60, 
      reward: 75, 
      completed: false 
    },
    { 
      id: '3', 
      title: 'Reviewer', 
      description: 'Review 3 team member tasks', 
      progress: 33, 
      reward: 100, 
      completed: false 
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500/50';
      case 'epic': return 'border-purple-500/50';
      case 'rare': return 'border-blue-500/50';
      default: return 'border-green-500/50';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Gamification Hub</h1>
        <p className="text-slate-400">Level up your productivity with rewards and achievements</p>
      </motion.div>

      {/* User Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">Level {userStats.level}</div>
            <div className="text-slate-400 text-sm">Your Current Level</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300 mb-1">{userStats.xp.toLocaleString()}</div>
            <div className="text-slate-400 text-sm mb-2">Experience Points</div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">{userStats.xpToNext} XP to level {userStats.level + 1}</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-300 mb-1">{userStats.streak}</div>
            <div className="text-slate-400 text-sm">Day Streak</div>
            <div className="flex justify-center mt-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    i < userStats.streak % 7 ? 'bg-orange-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300 mb-1">#{userStats.rank}</div>
            <div className="text-slate-400 text-sm">Team Ranking</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs">+2 this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-slate-800/50 rounded-xl p-2">
        {[
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
          { id: 'challenges', label: 'Daily Challenges', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === tab.id
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border ${
                    achievement.unlocked ? getRarityBorder(achievement.rarity) : 'border-slate-700/50'
                  } ${achievement.unlocked ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center ${
                      achievement.unlocked ? '' : 'grayscale'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{achievement.title}</h4>
                        {achievement.unlocked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-xs">✓</span>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">Progress</span>
                        <span className="text-white font-medium">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full`}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1">
                          <Gift className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">{achievement.reward} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {selectedTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Team Leaderboard</h3>
            <div className="space-y-4">
              {leaderboard.map((member, index) => (
                <motion.div
                  key={member.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    member.name === 'You' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center font-bold ${
                      member.rank === 1 ? 'text-yellow-400' :
                      member.rank === 2 ? 'text-slate-300' :
                      member.rank === 3 ? 'text-orange-400' : 'text-slate-400'
                    }`}>
                      #{member.rank}
                    </div>
                    
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{member.avatar}</span>
                      </div>
                      {member.badge && (
                        <div className="absolute -top-1 -right-1">
                          {member.badge === 'crown' ? (
                            <Crown className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <Medal className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-slate-400 text-sm">{member.points.toLocaleString()} points</div>
                  </div>
                  
                  {member.rank <= 3 && (
                    <div className="flex items-center gap-1">
                      <Trophy className={`w-5 h-5 ${
                        member.rank === 1 ? 'text-yellow-400' :
                        member.rank === 2 ? 'text-slate-300' : 'text-orange-400'
                      }`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Daily Challenges</h3>
              <div className="space-y-4">
                {dailyChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      challenge.completed 
                        ? 'bg-green-900/20 border-green-500/30' 
                        : 'bg-slate-700/30 border-slate-600/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{challenge.title}</h4>
                        <p className="text-slate-400 text-sm">{challenge.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Gift className="w-4 h-4" />
                        <span className="font-medium">{challenge.reward}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-400 text-sm">Progress</span>
                          <span className="text-white font-medium">{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${challenge.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            className={`h-full rounded-full ${
                              challenge.completed 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}
                          />
                        </div>
                      </div>
                      
                      {challenge.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-sm">✓</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gamification;
