import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Newspaper, CheckCircle, MessageSquare, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login or signup pages
  if (!currentUser || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <motion.nav 
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Newspaper className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">NewsPortal</span>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink 
                  to="/news" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                >
                  <Newspaper className="h-4 w-4 mr-1" />
                  News
                </NavLink>
                <NavLink 
                  to="/validate" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Validate News
                </NavLink>
                <NavLink 
                  to="/feedback" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Feedback
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink 
            to="/news" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            <Newspaper className="h-4 w-4 mr-1" />
            News
          </NavLink>
          <NavLink 
            to="/validate" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Validate News
          </NavLink>
          <NavLink 
            to="/feedback" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Feedback
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;