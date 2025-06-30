import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bot, Send, User, Mic, Paperclip, MoreVertical } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const conversations = [
    {
      id: 1,
      type: 'user',
      message: 'What is the current traffic situation on Main Street?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'assistant',
      message: 'Based on real-time data, Main Street is experiencing moderate traffic with an average speed of 25 mph. There\'s a minor incident at the intersection with 5th Avenue causing a 5-minute delay. I recommend using Park Avenue as an alternative route.',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      type: 'user',
      message: 'How many parking spots are available downtown?',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      type: 'assistant',
      message: 'Currently, there are 147 available parking spots downtown across 4 parking facilities:\n\n• Central Mall: 45 spots\n• City Hall: 23 spots\n• Business District: 67 spots\n• Hospital Complex: 12 spots\n\nThe Business District has the most availability right now.',
      timestamp: '10:36 AM'
    }
  ];

  const quickActions = [
    'Check traffic status',
    'Parking availability',
    'Emergency services',
    'Public transport',
    'City events',
    'Report an issue'
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          City AI Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get instant answers about city services, traffic, and more
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">City Assistant</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    conv.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      conv.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {conv.type === 'user' ? (
                        <User className="text-white" size={16} />
                      ) : (
                        <Bot className="text-white" size={16} />
                      )}
                    </div>
                    <div className={`rounded-2xl p-3 ${
                      conv.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{conv.message}</p>
                      <p className={`text-xs mt-1 ${
                        conv.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {conv.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip size={16} />
                </Button>
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about the city..."
                    className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="absolute right-2 top-2"
                    disabled={!message.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Mic size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMessage(action)}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI Capabilities
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time city data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Traffic & parking info</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Emergency services</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Public transport</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>City services</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Issue reporting</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Usage Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Queries Today</span>
                <span className="font-medium text-gray-900 dark:text-white">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response</span>
                <span className="font-medium text-gray-900 dark:text-white">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
                <span className="font-medium text-gray-900 dark:text-white">96%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};