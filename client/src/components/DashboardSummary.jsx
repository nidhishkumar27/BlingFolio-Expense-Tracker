import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { categories } from '../constants.js';
import { FiTrendingUp, FiDollarSign, FiPieChart } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = [
  'rgba(16, 185, 129, 0.8)',   // Primary green
  'rgba(59, 130, 246, 0.8)',   // Secondary blue  
  'rgba(139, 92, 246, 0.8)',   // Purple
  'rgba(245, 158, 11, 0.8)',   // Orange
  'rgba(239, 68, 68, 0.8)',    // Red
  'rgba(107, 114, 128, 0.8)'   // Gray
];

export default function DashboardSummary({ expenses }) {
  const totals = categories.reduce((acc, c) => { acc[c] = 0; return acc; }, {});
  expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + e.amount; });
  
  const activeCategories = Object.keys(totals).filter(k => totals[k] > 0);
  const chartData = {
    labels: activeCategories,
    datasets: [{
      data: activeCategories.map(k => totals[k]),
      backgroundColor: categoryColors.slice(0, activeCategories.length),
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(156, 163, 175)',
          font: { size: 12 },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  const total = expenses.reduce((a, b) => a + b.amount, 0);
  const avgExpense = expenses.length ? (total / expenses.length) : 0;
  const highestCategory = activeCategories.reduce((a, b) => totals[a] > totals[b] ? a : b, activeCategories[0]);

  return (
    <div className="card-modern">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
          <FiPieChart className="text-white text-lg" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Spending Overview</h3>
          <p className="text-sm text-dark-400">Your expense breakdown</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between glass-panel p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-primary-400" />
            <span className="text-sm text-dark-300">Total Spent</span>
          </div>
          <span className="font-semibold text-lg text-primary-400">₹{total.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between glass-panel p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-secondary-400" />
            <span className="text-sm text-dark-300">Average</span>
          </div>
          <span className="font-semibold text-lg text-secondary-400">₹{avgExpense.toFixed(2)}</span>
        </div>

        {highestCategory && (
          <div className="flex items-center justify-between glass-panel p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <span className="text-sm text-dark-300">Top Category</span>
            </div>
            <span className="font-semibold text-sm text-white">{highestCategory}</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="relative">
        {activeCategories.length ? (
          <div className="h-64">
            <Pie data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-dark-700 to-dark-800 rounded-full flex items-center justify-center mb-4">
              <FiPieChart className="text-2xl text-dark-400" />
            </div>
            <p className="text-dark-400 text-sm">No expenses to display</p>
            <p className="text-dark-500 text-xs mt-1">Add some expenses to see your breakdown</p>
          </div>
        )}
      </div>
    </div>
  );
}
