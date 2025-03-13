const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Usersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false } // Make username optional
});
const User = mongoose.model('User', UserSchema);

// Middleware to Authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register Route
app.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password) { // Only email and password are required
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword, username: username || '' }); // Default to empty string if no username
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, username: user.username || '' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    topic: { type: String, enum: ['Arrays', 'Sorting', 'Stacks', 'Queues'], required: true },
    content: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    createdAt: { type: Date, default: Date.now }
  });
  const Lesson = mongoose.model('Lesson', LessonSchema);
  
  // Add this route to fetch lessons (protected with JWT)
  app.get('/lessons', authenticateToken, async (req, res) => {
    try {
      const lessons = await Lesson.find();
      res.json(lessons);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching lessons' });
    }
  });
// Test Protected Route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}!` });
});

app.listen(port, () => console.log(`Server running on port ${port}`));