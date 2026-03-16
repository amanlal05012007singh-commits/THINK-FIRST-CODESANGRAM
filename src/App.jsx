import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './pages/Login';
import Landing from './pages/Landing';

import Dashboard from './pages/Dashboard';

import Subjects from './pages/Subjects';
import Topics from './pages/Topics';
import QuestionPractice from './pages/QuestionPractice';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="thinkfirst-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/topics/:subject" element={<Topics />} />
          <Route path="/practice/:topic" element={<QuestionPractice />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
