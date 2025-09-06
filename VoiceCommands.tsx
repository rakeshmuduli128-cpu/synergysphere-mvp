import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, MessageSquare } from 'lucide-react';

const VoiceCommands: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);

  const [recentCommands] = useState([
    { command: 'Create task "Review design mockups"', action: 'Task created', time: '2 min ago' },
    { command: 'Schedule meeting with Sarah tomorrow at 2 PM', action: 'Meeting scheduled', time: '5 min ago' },
    { command: 'Show me team workload dashboard', action: 'View switched', time: '8 min ago' },
    { command: 'Send message to development channel', action: 'Message sent', time: '12 min ago' },
  ]);

  const voiceFeatures = [
    { 
      title: 'Task Management', 
      description: 'Create, update, and manage tasks using voice commands',
      examples: ['"Create high priority task"', '"Mark task as completed"', '"Assign task to Sarah"']
    },
    { 
      title: 'Meeting Control', 
      description: 'Schedule meetings and manage calendar events',
      examples: ['"Schedule meeting tomorrow"', '"Join current meeting"', '"End meeting"']
    },
    { 
      title: 'Team Communication', 
      description: 'Send messages and communicate with team members',
      examples: ['"Send message to team"', '"Read latest messages"', '"Call Mike Johnson"']
    },
    { 
      title: 'Navigation', 
      description: 'Navigate through different sections of the platform',
      examples: ['"Show dashboard"', '"Open task manager"', '"Go to analytics"']
    },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Create a new task for database optimization');
      setTimeout(() => {
        setIsListening(false);
        setTranscript('✓ Task created successfully');
        setTimeout(() => setTranscript(''), 3000);
      }, 2000);
    }, 1000);
  };

  const handleToggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Voice Command & Dictation</h1>
        <p className="text-slate-400">Hands-free productivity with AI-powered voice recognition</p>
      </motion.div>

      {/* Voice Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30"
      >
        <div className="text-center">
          <motion.div
            className="relative mx-auto mb-6"
            style={{ width: 200, height: 200 }}
          >
            {/* Animated circles */}
            <AnimatePresence>
              {isListening && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-purple-400 rounded-full"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ 
                        scale: [1, 1.5, 2],
                        opacity: [0.8, 0.4, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
              onClick={handleStartListening}
              disabled={isListening}
              className={`w-full h-full rounded-full border-4 transition-all ${
                isListening 
                  ? 'bg-red-500 border-red-400 shadow-red-500/50' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-purple-500/50 hover:scale-105'
              } shadow-2xl flex items-center justify-center`}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? (
                <MicOff className="w-16 h-16 text-white" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 rounded-xl p-4 mb-6"
              >
                <p className="text-white text-lg">{transcript}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                isEnabled 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              Voice {isEnabled ? 'Enabled' : 'Disabled'}
            </motion.button>

            <motion.button
              onClick={handleToggleSpeaking}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                isSpeaking 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSpeaking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              Text-to-Speech {isSpeaking ? 'On' : 'Off'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Voice Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Voice Commands</h3>
          <div className="space-y-6">
            {voiceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/30"
              >
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{feature.description}</p>
                <div className="space-y-1">
                  {feature.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <MessageSquare className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-300 text-xs font-mono">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Commands */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Recent Voice Commands</h3>
          <div className="space-y-4">
            {recentCommands.map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">"{cmd.command}"</p>
                    <p className="text-green-400 text-xs">✓ {cmd.action}</p>
                  </div>
                  <span className="text-slate-400 text-xs">{cmd.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Voice Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl"
          >
            <h4 className="font-medium text-blue-400 mb-3">Voice Usage Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">47</div>
                <div className="text-slate-400 text-xs">Commands Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-slate-400 text-xs">Accuracy Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceCommands;
