import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiDollarSign, FiCalendar, FiTag } from 'react-icons/fi';

const categoryColors = {
  Food: 'from-orange-500 to-red-500',
  Transport: 'from-blue-500 to-cyan-500',
  Shopping: 'from-purple-500 to-pink-500',
  Bills: 'from-yellow-500 to-orange-500',
  Entertainment: 'from-green-500 to-teal-500',
  Other: 'from-gray-500 to-slate-500'
};

const categoryIcons = {
  Food: '🍕',
  Transport: '🚗',
  Shopping: '🛍️',
  Bills: '📄',
  Entertainment: '🎬',
  Other: '📦'
};

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mb-4">
          <FiDollarSign className="text-4xl text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No expenses yet</h3>
        <p className="text-dark-400 mb-6">Start tracking by adding your first expense</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((exp, index) => (
        <div 
          key={exp._id} 
          className="group flex items-center justify-between glass-panel p-4 hover:bg-white/10 transition-all duration-300 animate-slide-up border-l-4 border-l-primary-500/50 hover:border-l-primary-500"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[exp.category]} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
              {categoryIcons[exp.category]}
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-white group-hover:text-primary-300 transition-colors duration-200">
                {exp.description}
              </h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-dark-400">
                <div className="flex items-center gap-1">
                  <FiCalendar className="text-xs" />
                  <span>{format(new Date(exp.date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiTag className="text-xs" />
                  <span>{exp.category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-400">
                ₹{exp.amount.toFixed(2)}
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                onClick={() => onEdit(exp)} 
                className="w-9 h-9 flex items-center justify-center bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary-400 hover:text-secondary-300 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <FiEdit2 className="text-sm" />
              </button>
              <button 
                onClick={() => onDelete(exp)} 
                className="w-9 h-9 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <FiTrash2 className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
