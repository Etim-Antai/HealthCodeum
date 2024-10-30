const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();
const { patientAuth, adminAuth } = require('../middleware/authMiddleware'); // Authentication middleware

// Create: Admin can add new doctors, including their schedules.
router.post('/book', patientAuth, appointmentController.bookAppointment);
// Read: Display a list of upcoming appointments for patients and doctors.
router.get('/', patientAuth || adminAuth, appointmentController.getAppointments);
// Read: Find appointment by patientId.
router.get('/:id', patientAuth, appointmentController.getAppointmentById);
// Update: Allow patients to reschedule appointments.
router.put('/:id', patientAuth, appointmentController.rescheduleAppointment);
// Update: Allow patients to update appointment status.
router.put('/:id/status', patientAuth, appointmentController.updateAppointmentStatus);
// Delete: Allow patients to cancel appointments, updating the status to "canceled."
router.delete('/:id/cancel', patientAuth, appointmentController.cancelAppointment);

module.exports = router;
