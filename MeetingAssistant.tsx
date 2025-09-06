import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, FileText, CheckCircle, Plus, Brain } from 'lucide-react';

const MeetingAssistant: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Sprint Planning',
      time: '10:00 AM',
      duration: '60 min',
      attendees: 8,
      aiPrepared: true,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Design Review',
      time: '2:00 PM',
      duration: '45 min',
      attendees: 5,
      aiPrepared: true,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Client Presentation',
      time: 'Tomorrow 11:00 AM',
      duration: '90 min',
      attendees: 12,
      aiPrepared: false,
      status: 'pending'
    }
  ];

  const meetingInsights = {
    '1': {
      summary: 'Based on previous sprint velocity and current backlog, the team completed 85% of planned tasks. Key focus areas: authentication module completion and database optimization.',
      actionItems: [
        'Complete user authentication by Friday',
        'Review database performance metrics',
        'Prepare demo for client presentation',
        'Update documentation for new features'
      ],
      keyTopics: ['Sprint Velocity', 'Authentication Module', 'Database Performance', 'Client Demo']
    },
    '2': {
      summary: 'Design system review focusing on component consistency and accessibility improvements. Recent user feedback indicates 92% satisfaction with current UI.',
      actionItems: [
        'Update button components for accessibility',
        'Create design tokens documentation',
        'Conduct user testing for new flows',
        'Implement dark mode variants'
      ],
      keyTopics: ['Design System', 'Accessibility', 'User Testing', 'Dark Mode']
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Context-Aware Meeting Assistant</h1>
        <p className="text-slate-400">AI-powered meeting preparation and follow-up automation</p>
      </motion.div>

      {/* AI Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Meetings This Week', value: '12', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
          { label: 'AI Summaries Generated', value: '8', icon: Brain, color: 'from-purple-500 to-pink-500' },
          { label: 'Auto Action Items', value: '24', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { label: 'Time Saved', value: '3.2h', icon: Clock, color: 'from-orange-500 to-red-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Meetings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Upcoming Meetings</h3>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setSelectedMeeting(meeting.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMeeting === meeting.id
                    ? 'border-purple-500/50 bg-purple-900/20'
                    : 'border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{meeting.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {meeting.attendees}
                      </div>
                    </div>
                  </div>
                  {meeting.aiPrepared ? (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <Brain className="w-4 h-4" />
                      AI Ready
                    </div>
                  ) : (
                    <button className="flex items-center gap-1 text-purple-400 text-xs hover:text-purple-300">
                      <Plus className="w-4 h-4" />
                      Prepare
                    </button>
                  )}
                </div>
                
                {meeting.aiPrepared && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    Summary prepared • Action items ready
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meeting Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
        >
          {selectedMeeting && meetingInsights[selectedMeeting as keyof typeof meetingInsights] ? (
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">AI-Generated Insights</h3>
              
              <div className="space-y-6">
                {/* Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h4 className="font-medium text-white">Meeting Summary</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {meetingInsights[selectedMeeting as keyof typeof meetingInsights].summary}
                  </p>
                </div>

                {/* Action Items */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="font-medium text-white">Action Items</h4>
                  </div>
                  <div className="space-y-2">
                    {meetingInsights[selectedMeeting as keyof typeof meetingInsights].actionItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key Topics */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-blue-400" />
                    <h4 className="font-medium text-white">Key Topics</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meetingInsights[selectedMeeting as keyof typeof meetingInsights].keyTopics.map((topic, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-300 text-xs"
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-400 mb-2">Select a Meeting</h4>
                <p className="text-slate-500 text-sm">Choose a meeting to view AI-generated insights and preparation materials.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MeetingAssistant;
