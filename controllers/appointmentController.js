const Appointment = require('../models/appointmentModel');

exports.bookAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
        await Appointment.create({
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status: 'scheduled'
        });
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment' });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const [appointments] = await Appointment.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const [appointment] = await Appointment.findByPatientId(req.session.patientData?.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment' });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
        await Appointment.reschedule(req.params.id, {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status: 'scheduled'
        });
        res.status(200).json({ message: 'Appointment rescheduled successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error rescheduling appointment' });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Appointment.updateStatus(req.params.id, status);
        res.status(200).json({ message: 'Appointment status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status' });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        await Appointment.updateStatus(req.params.id, 'canceled');
        res.status(200).json({ message: 'Appointment canceled' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling appointment' });
    }
};
