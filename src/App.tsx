import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import News from './pages/News';
import ValidateNews from './pages/ValidateNews';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/news" 
              element={
                <PrivateRoute>
                  <News />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/validate" 
              element={
                <PrivateRoute>
                  <ValidateNews />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <PrivateRoute>
                  <Feedback />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/news" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;