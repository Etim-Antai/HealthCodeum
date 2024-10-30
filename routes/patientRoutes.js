const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const { patientAuth } = require('../middleware/authMiddleware'); // Authentication middleware

// Logging middleware
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`);
    next();
});

// Public routes
router.post('/register', patientController.register);    // Register a new patient
router.post('/login', patientController.login);          // Log in a patient
router.get('/logout', patientController.logout);         // Log out a patient

// Protected routes that require authentication
router.put('/profile', patientAuth, patientController.updateProfile); // Update patient's profile
router.get('/profile', patientAuth, patientController.getProfile);    // Get patient's profile
router.get('/dashboard', patientAuth, patientController.getDashboard); // Get patient's dashboard data
router.delete('/delete', patientAuth, patientController.deleteAccount); // Delete patient's account

module.exports = router;
