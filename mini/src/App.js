// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Lessons from './components/Lessions';
import Blogs from './components/Blogs';
import Quizzes from './components/Quizzes';
import Progress from './components/Progress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="lessons" element={<Lessons />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;