import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLogOut, FiUser, FiTrendingUp } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  
  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
            <FiTrendingUp className="text-white text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="gradient-text font-display font-bold text-xl">ExpenseFlow</span>
            <span className="text-xs text-dark-400 font-medium">Smart Tracking</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          {!token ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-dark-300 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn-primary text-sm px-4 py-2"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 glass-panel rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user?.username}</span>
                  <span className="text-xs text-dark-400">Member</span>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
              >
                <FiLogOut className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
