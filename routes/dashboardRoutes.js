// routes/dashboardRoutes.js
const express = require('express'); // Correct require for express
const { isAuthenticated } = require('../middleware/authMiddleware'); // Destructure to import isAuthenticated
const router = express.Router();

// Dashboard route (GET request)
router.get('/', isAuthenticated, (req, res) => {
    // You can fetch user-specific data here, e.g., profile, appointments, etc.
    res.status(200).json({ message: 'Welcome to your dashboard!' });
});

// Export the router
module.exports = router;
