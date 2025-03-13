import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/lessons', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLessons(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>DSA Lessons</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson._id}>{lesson.title} - {lesson.topic}</li>
        ))}
      </ul>
    </div>
  );
}

export default Lessons;