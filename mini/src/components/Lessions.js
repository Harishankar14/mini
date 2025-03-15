// client/src/components/Lessons.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaList, FaSort, FaLayerGroup, FaAlignLeft } from 'react-icons/fa'; // Import icons
import './Lessons.css';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:5000/lessons', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
        setLoading(false);
      });
  }, [navigate]);

  const handleLessonClick = (lessonId) => {
    navigate(`/dashboard/lessons/${lessonId}`);
  };

  // Function to get an icon based on the topic
  const getTopicIcon = (topic) => {
    switch (topic) {
      case 'Arrays':
        return <FaList className="lesson-icon" />;
      case 'Graphs and Trees':
        return <FaSort className="lesson-icon" />;
      case 'Stacks':
        return <FaLayerGroup className="lesson-icon" />;
      case 'Queues':
        return <FaAlignLeft className="lesson-icon" />;
      default:
        return null;
    }
  };

  // Function to get difficulty badge class
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-badge easy';
      case 'Medium':
        return 'difficulty-badge medium';
      case 'Hard':
        return 'difficulty-badge hard';
      default:
        return 'difficulty-badge';
    }
  };

  if (loading) return <div className="loading"><b>Loading...</b></div>;

  return (
    <div className="lessons-container">
      <h2>DSA Lessons</h2>
      {lessons.length === 0 ? (
        <p className="no-lessons">No lessons available.</p>
      ) : (
        <ul className="lesson-list">
          {lessons.map(lesson => (
            <li
              key={lesson._id}
              className="lesson-item"
              onClick={() => handleLessonClick(lesson._id)}
            >
              <div className="lesson-icon-wrapper">
                {getTopicIcon(lesson.topic)}
              </div>
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.topic}</p>
              </div>
              <span className={getDifficultyClass(lesson.difficulty)}>
                {lesson.difficulty}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lessons;
