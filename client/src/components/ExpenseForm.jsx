import { useState, useEffect } from 'react';
import { categories } from '../constants.js';
import { FiX, FiDollarSign, FiCalendar, FiTag, FiFileText, FiSave } from 'react-icons/fi';

export default function ExpenseForm({ onSave, onClose, initial }) {
  const [form, setForm] = useState({ description: '', amount: '', category: 'Other', date: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        description: initial.description,
        amount: initial.amount,
        category: initial.category,
        date: initial.date ? initial.date.substring(0,10) : ''
      });
    }
  }, [initial]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, amount: parseFloat(form.amount) };
    await onSave(payload);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <FiDollarSign className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-white">
                {initial ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <p className="text-sm text-dark-400">Track your spending</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors duration-200 text-dark-400 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
              <div className="relative">
                <FiFileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                <input 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="What did you spend on?" 
                  className="input-modern w-full pl-12"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-dark-300 mb-2">Amount</label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                <input 
                  name="amount" 
                  type="number" 
                  step="0.01" 
                  value={form.amount} 
                  onChange={handleChange} 
                  placeholder="0.00" 
                  className="input-modern w-full pl-12"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
              <div className="relative">
                <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                <select 
                  name="category" 
                  value={form.category} 
                  onChange={handleChange}
                  className="input-modern w-full pl-12 appearance-none"
                >
                  {categories.map(c => (
                    <option key={c} value={c} className="bg-dark-800">{c}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-dark-300 mb-2">Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                <input 
                  name="date" 
                  type="date" 
                  value={form.date} 
                  onChange={handleChange}
                  className="input-modern w-full pl-12"
                />
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 glass-button px-4 py-3 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiSave className="text-sm" />
                  <span>{initial ? 'Update' : 'Save'} Expense</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
