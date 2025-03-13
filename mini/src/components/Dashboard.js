// client/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // We’ll create this next

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    } else {
      // Fetch user details (e.g., username) from backend
      axios.get('http://localhost:5000/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser({ id: res.data.userId, username: 'SuperCoder' })) // Placeholder username for now
        .catch(err => {
          console.log(err);
          navigate('/');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Learn DSA for Kids</h1>
        </div>
        <div className="navbar-links">
          <Link to="/dashboard/lessons" className="nav-btn">Lessons</Link>
          <Link to="/dashboard/blogs" className="nav-btn">Blogs</Link>
          <Link to="/dashboard/quizzes" className="nav-btn">Quizzes</Link>
          <Link to="/dashboard/progress" className="nav-btn">Progress</Link>
        </div>
        <div className="navbar-account">
          {user && (
            <div className="account-details">
              <span>{user.username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Outlet /> {/* This will render nested routes (e.g., Lessons, Blogs) */}
      </main>
    </div>
  );
}

export default Dashboard;