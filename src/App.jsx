import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';

import Dashboard from './pages/Dashboard';

import Subjects from './pages/Subjects';
import Topics from './pages/Topics';
import QuestionPractice from './pages/QuestionPractice';
import SavedQuestions from './pages/SavedQuestions';
import Leaderboard from './pages/Leaderboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('thinkfirst_user_name');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="thinkfirst-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="/topics/:subject" element={<ProtectedRoute><Topics /></ProtectedRoute>} />
          <Route path="/practice/:topic" element={<ProtectedRoute><QuestionPractice /></ProtectedRoute>} />
          <Route path="/saved-questions" element={<ProtectedRoute><SavedQuestions /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
