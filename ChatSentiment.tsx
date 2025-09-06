import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, TrendingDown, Smile, Frown, AlertTriangle, Heart } from 'lucide-react';

const ChatSentiment: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState('general');

  const chatChannels = [
    { id: 'general', name: 'General', sentiment: 'positive', score: 8.2, messages: 42 },
    { id: 'development', name: 'Development', sentiment: 'neutral', score: 6.8, messages: 28 },
    { id: 'design', name: 'Design', sentiment: 'positive', score: 8.9, messages: 19 },
    { id: 'project-alpha', name: 'Project Alpha', sentiment: 'negative', score: 4.3, messages: 35 },
  ];

  const chatMessages = {
    'general': [
      { user: 'Sarah Chen', message: 'Great job on the presentation! 🎉', sentiment: 'positive', time: '10:30 AM' },
      { user: 'Mike Johnson', message: 'Thanks everyone for the feedback', sentiment: 'neutral', time: '10:32 AM' },
      { user: 'Alex Kumar', message: 'Looking forward to the next sprint!', sentiment: 'positive', time: '10:35 AM' },
    ],
    'project-alpha': [
      { user: 'David Park', message: 'We\'re falling behind on the deadline...', sentiment: 'negative', time: '2:15 PM' },
      { user: 'Emma Wilson', message: 'The client requirements keep changing', sentiment: 'negative', time: '2:18 PM' },
      { user: 'Lisa Rodriguez', message: 'Let\'s schedule a meeting to discuss', sentiment: 'neutral', time: '2:20 PM' },
    ]
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return Smile;
      case 'negative': return Frown;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Emotion & Sentiment Analysis</h1>
        <p className="text-slate-400">AI-powered communication health monitoring</p>
      </motion.div>

      {/* Sentiment Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Team Sentiment', value: '7.8/10', icon: Heart, trend: 'up', color: 'from-pink-500 to-rose-500' },
          { label: 'Positive Messages', value: '68%', icon: Smile, trend: 'up', color: 'from-green-500 to-emerald-500' },
          { label: 'Risk Alerts', value: '2', icon: AlertTriangle, trend: 'down', color: 'from-orange-500 to-red-500' },
          { label: 'Active Channels', value: '12', icon: MessageSquare, trend: 'neutral', color: 'from-blue-500 to-cyan-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : MessageSquare;
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendIcon className={`w-4 h-4 ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                }`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Channel List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Channel Sentiment</h3>
          <div className="space-y-4">
            {chatChannels.map((channel, index) => {
              const SentimentIcon = getSentimentIcon(channel.sentiment);
              
              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => setSelectedChat(channel.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedChat === channel.id
                      ? 'border-purple-500/50 bg-purple-900/20'
                      : 'border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <SentimentIcon className={`w-5 h-5 ${getSentimentColor(channel.sentiment)}`} />
                      <span className="font-medium text-white">{channel.name}</span>
                    </div>
                    <span className={`text-sm font-bold ${getSentimentColor(channel.sentiment)}`}>
                      {channel.score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    <span>{channel.messages} messages today</span>
                    <span className="capitalize">{channel.sentiment}</span>
                  </div>
                  
                  {/* Sentiment progress bar */}
                  <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(channel.score / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${
                        channel.sentiment === 'positive' ? 'from-green-500 to-emerald-500' :
                        channel.sentiment === 'negative' ? 'from-red-500 to-pink-500' :
                        'from-yellow-500 to-orange-500'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            {chatChannels.find(c => c.id === selectedChat)?.name} Channel
          </h3>
          
          {chatMessages[selectedChat as keyof typeof chatMessages] ? (
            <div className="space-y-4">
              {chatMessages[selectedChat as keyof typeof chatMessages].map((msg, index) => {
                const SentimentIcon = getSentimentIcon(msg.sentiment);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {msg.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-white">{msg.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SentimentIcon className={`w-4 h-4 ${getSentimentColor(msg.sentiment)}`} />
                        <span className="text-slate-400 text-sm">{msg.time}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 ml-11">{msg.message}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-400 mb-2">No Recent Messages</h4>
                <p className="text-slate-500 text-sm">This channel has been quiet today.</p>
              </div>
            </div>
          )}

          {/* AI Insights for negative sentiment */}
          {selectedChat === 'project-alpha' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-400">AI Alert: Communication Risk Detected</span>
              </div>
              <p className="text-slate-300 text-sm">
                Negative sentiment trend detected in this channel. Consider scheduling a team check-in 
                to address concerns and improve project communication.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChatSentiment;
