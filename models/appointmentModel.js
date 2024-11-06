const db = require('../config/db');

const Appointment = {
    create: async (data) => {
        try {
            const { patient_id, doctor_id, appointment_date, appointment_time, status } = data;
            const result = await db.query(
                'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
                [patient_id, doctor_id, appointment_date, appointment_time, status]
            );
            return { success: true, message: 'Appointment created successfully', result };
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw new Error('Could not create appointment');
        }
    },
    getAllAppointments: async () => {
        try {
            const results = await db.query('SELECT * FROM Appointments');
            return results;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw new Error('Could not fetch appointments');
        }
    },
    findByPatientId: async (patient_id) => {
        try {
            const results = await db.query('SELECT * FROM Appointments WHERE patient_id = ?', [patient_id]);
            return results;
        } catch (error) {
            console.error('Error finding appointments by patient ID:', error);
            throw new Error('Could not find appointments for the patient');
        }
    },
    reschedule: async (id, data) => {
        try {
            const { patient_id, doctor_id, appointment_date, appointment_time, status } = data;
            const result = await db.query(
                'UPDATE Appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, status = ? WHERE appointment_id = ?',
                [patient_id, doctor_id, appointment_date, appointment_time, status, id]
            );
            return { success: true, message: 'Appointment rescheduled successfully', result };
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            throw new Error('Could not reschedule appointment');
        }
    },
    updateStatus: async (id, status) => {
        try {
            const result = await db.query('UPDATE Appointments SET status = ? WHERE appointment_id = ?', [status, id]);
            return { success: true, message: 'Appointment status updated', result };
        } catch (error) {
            console.error('Error updating appointment status:', error);
            throw new Error('Could not update appointment status');
        }
    },
    deleteById: async (id) => {
        try {
            const result = await db.query('DELETE FROM Appointments WHERE appointment_id = ?', [id]);
            return { success: true, message: 'Appointment deleted', result };
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw new Error('Could not delete appointment');
        }
    },
};

module.exports = Appointment;
