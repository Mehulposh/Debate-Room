import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { SocketProvider } from './context/SocketProvider';
import PrivateRoute from './utility/protectedRoutes';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Debates from './components/Debates';
import DebateRoom from './pages/DebateRoom';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/debates" 
              element={
                <PrivateRoute>
                  <Debates />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/debate/:id" 
              element={
                <PrivateRoute>
                  <DebateRoom />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/debates" />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;