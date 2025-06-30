import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PieChart, DollarSign, TrendingUp, TrendingDown, Building, Users, Zap, Car } from 'lucide-react';

export const BudgetTracker: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const budgetOverview = {
    current: {
      total: 12500000,
      spent: 8750000,
      remaining: 3750000,
      percentage: 70
    },
    previous: {
      total: 11800000,
      spent: 10200000,
      remaining: 1600000,
      percentage: 86
    }
  };

  const departments = [
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: Building,
      budget: 4500000,
      spent: 3200000,
      percentage: 71,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      id: 'public-safety',
      name: 'Public Safety',
      icon: Users,
      budget: 3200000,
      spent: 2100000,
      percentage: 66,
      trend: 'down',
      color: 'bg-red-500'
    },
    {
      id: 'utilities',
      name: 'Utilities',
      icon: Zap,
      budget: 2800000,
      spent: 2000000,
      percentage: 71,
      trend: 'up',
      color: 'bg-yellow-500'
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: Car,
      budget: 2000000,
      spent: 1450000,
      percentage: 73,
      trend: 'up',
      color: 'bg-green-500'
    }
  ];

  const expenses = [
    { category: 'Personnel', amount: 3500000, percentage: 40, color: 'bg-blue-500' },
    { category: 'Infrastructure', amount: 2800000, percentage: 32, color: 'bg-green-500' },
    { category: 'Operations', amount: 1400000, percentage: 16, color: 'bg-yellow-500' },
    { category: 'Equipment', amount: 700000, percentage: 8, color: 'bg-purple-500' },
    { category: 'Other', amount: 350000, percentage: 4, color: 'bg-gray-500' }
  ];

  const currentBudget = budgetOverview[selectedPeriod as keyof typeof budgetOverview];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
          City Budget Tracker
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor and analyze municipal budget allocation and spending
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {['current', 'previous'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            {period} Year
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { 
            label: 'Total Budget', 
            value: formatCurrency(currentBudget.total), 
            icon: DollarSign, 
            color: 'bg-blue-500' 
          },
          { 
            label: 'Amount Spent', 
            value: formatCurrency(currentBudget.spent), 
            icon: TrendingDown, 
            color: 'bg-red-500' 
          },
          { 
            label: 'Remaining', 
            value: formatCurrency(currentBudget.remaining), 
            icon: TrendingUp, 
            color: 'bg-green-500' 
          },
          { 
            label: 'Utilization', 
            value: `${currentBudget.percentage}%`, 
            icon: PieChart, 
            color: 'bg-purple-500' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 ${stat.color} rounded-xl`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Budget Utilization
          </h3>
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="relative inline-flex items-center justify-center w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-blue-500"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${currentBudget.percentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentBudget.percentage}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Budget Utilized
              </p>
            </div>
            <ProgressBar
              value={currentBudget.percentage}
              color="bg-blue-500"
              size="lg"
              showLabel={true}
              label={`${formatCurrency(currentBudget.spent)} of ${formatCurrency(currentBudget.total)}`}
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Expense Breakdown
          </h3>
          <div className="space-y-4">
            {expenses.map((expense, index) => (
              <motion.div
                key={expense.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${expense.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {expense.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(expense.amount)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.percentage}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Department Budget Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedDepartment === dept.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDepartment(dept.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <dept.icon className="text-gray-600 dark:text-gray-400" size={24} />
                <div className="flex items-center space-x-1">
                  {dept.trend === 'up' ? (
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                </div>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {dept.name}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Budget</span>
                  <span className="font-medium">{formatCurrency(dept.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Spent</span>
                  <span className="font-medium">{formatCurrency(dept.spent)}</span>
                </div>
                <ProgressBar
                  value={dept.percentage}
                  color={dept.color}
                  size="sm"
                />
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {dept.percentage}% utilized
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};