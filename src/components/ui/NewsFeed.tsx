import React from 'react';

const newsItems = [
  {
    title: 'Smart Traffic Lights Deployed',
    date: '2024-06-10',
    description: 'New AI-powered traffic lights are now operational in downtown.'
  },
  {
    title: 'Budget Tracker Launched',
    date: '2024-06-08',
    description: 'Citizens can now track city budget allocations in real-time.'
  },
  {
    title: 'Green Initiative: 1,000 Trees Planted',
    date: '2024-06-05',
    description: 'The city completed its first phase of urban reforestation.'
  }
];

export const NewsFeed: React.FC = () => (
  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 shadow-md">
    <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Latest News & Updates</h2>
    <ul className="space-y-4">
      {newsItems.map((item, idx) => (
        <li key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">{item.date}</div>
          <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</div>
        </li>
      ))}
    </ul>
  </div>
); 