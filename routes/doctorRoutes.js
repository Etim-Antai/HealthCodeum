const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
const { adminAuth } = require('../middleware/authMiddleware'); // Authentication middleware

// Admin can add new doctors, including their schedules.
router.post('/add', adminAuth, doctorController.addDoctor);
// Display a list of doctors with their specialization and availability.
router.get('/', adminAuth, doctorController.getDoctors);
// Allow admin to update the doctor's profile information.
router.put('/:id', adminAuth, doctorController.updateDoctor);
// Allow admin to update the doctor's schedules.
router.put('/:id/schedule', adminAuth, doctorController.updateSchedule);
// Implement a feature to deactivate or delete doctor profiles.
router.delete('/:id', adminAuth, doctorController.deleteDoctor);

module.exports = router;
