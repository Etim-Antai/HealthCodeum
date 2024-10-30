const express = require ('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const patientRoutes = require('./routes/patientRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: '*', // Change to your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'development', // true in production
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'strict'
    },
}));

// API routes
app.use('/patients', patientRoutes);

// EJS Settings (if you're using EJS for views)
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).json({ message: `Server is running on http://${req.hostname}:${process.env.PORT}` });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'An unexpected error occurred!' });
});

// Start the server
const PORT = process.env.PORT || 2300;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
