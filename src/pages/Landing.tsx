import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Building, Car, Zap, TreePine } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Smart{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  City
                </span>
                <br />
                Dashboard
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Monitor, manage, and optimize your city's infrastructure with our comprehensive 
                real-time dashboard. Built for the future of urban management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/dashboard">
                <Button size="lg" className="flex items-center space-x-2">
                  <span>Enter Dashboard</span>
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
            >
              {[
                { icon: Building, title: 'Infrastructure', desc: 'Monitor city buildings and facilities' },
                { icon: Car, title: 'Transportation', desc: 'Track traffic and public transport' },
                { icon: Zap, title: 'Energy', desc: 'Optimize power consumption' },
                { icon: TreePine, title: 'Environment', desc: 'Track green initiatives' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 dark:border-gray-700/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <feature.icon size={32} className="text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cityscape illustration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-200 to-transparent dark:from-gray-800 opacity-30"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-2 pb-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-gray-400 dark:bg-gray-600"
                style={{
                  width: Math.random() * 20 + 10,
                  height: Math.random() * 60 + 20,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};