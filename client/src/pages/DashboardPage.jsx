import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import DashboardSummary from '../components/DashboardSummary.jsx';
import Chatbot from '../components/Chatbot.jsx';
import { toast } from 'react-toastify';
import { FiPlus, FiTrendingUp, FiDollarSign, FiCalendar, FiPieChart } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/api/expenses`, { headers });
      setExpenses(data);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchExpenses(); }, []); // eslint-disable-line

  const handleCreate = async (payload) => {
    try {
      if (editing) {
        const { data } = await axios.put(`${API}/api/expenses/${editing._id}`, payload, { headers });
        setExpenses(exps => exps.map(e => e._id === data._id ? data : e));
        toast.success('Expense updated successfully!');
      } else {
        const { data } = await axios.post(`${API}/api/expenses`, payload, { headers });
        setExpenses(exps => [data, ...exps]);
        toast.success('Expense added successfully!');
      }
      setShowForm(false); setEditing(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (expense) => {
    if (!confirm('Delete this expense?')) return;
    try {
      await axios.delete(`${API}/api/expenses/${expense._id}`, { headers });
      setExpenses(exps => exps.filter(e => e._id !== expense._id));
      toast.info('Expense deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEdit = (exp) => { setEditing(exp); setShowForm(true); };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const thisMonthExpenses = expenses.filter(exp => 
    new Date(exp.date).getMonth() === new Date().getMonth()
  ).reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header Section */}
        <div className="animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold gradient-text mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-dark-400 text-lg">Here's your financial overview</p>
            </div>
            <button 
              onClick={() => { setEditing(null); setShowForm(true); }} 
              className="btn-primary flex items-center gap-3 px-6 py-3 text-lg group"
            >
              <FiPlus className="group-hover:rotate-90 transition-transform duration-200" /> 
              Add Expense
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-modern flex items-center gap-4 animate-slide-up">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <FiDollarSign className="text-white text-xl" />
              </div>
              <div>
                <p className="text-dark-400 text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-white">₹{totalExpenses.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="card-modern flex items-center gap-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <FiCalendar className="text-white text-xl" />
              </div>
              <div>
                <p className="text-dark-400 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-white">₹{thisMonthExpenses.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="card-modern flex items-center gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <div>
                <p className="text-dark-400 text-sm font-medium">Total Entries</p>
                <p className="text-2xl font-bold text-white">{expenses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Expenses List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FiTrendingUp className="text-primary-400 text-xl" />
              <h2 className="font-display text-2xl font-semibold text-white">Recent Expenses</h2>
            </div>
            
            <div className="card-modern min-h-[400px] animate-slide-up">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="loading-shimmer h-16 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <ExpenseList expenses={expenses} onEdit={openEdit} onDelete={handleDelete} />
              )}
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FiPieChart className="text-secondary-400 text-xl" />
              <h2 className="font-display text-2xl font-semibold text-white">Analytics</h2>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <DashboardSummary expenses={expenses} />
            </div>
          </div>
        </div>

  <Chatbot expenses={expenses} />
        {showForm && (
          <ExpenseForm 
            initial={editing} 
            onSave={handleCreate} 
            onClose={() => { setShowForm(false); setEditing(null); }} 
          />
        )}
      </div>
    </div>
  );
}
