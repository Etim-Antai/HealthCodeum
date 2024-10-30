const db = require('../config/db');

const Appointment = {
    create: async (data) => {
        const { patient_id, doctor_id, appointment_date, appointment_time, status } = data;
        return db.query('INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
            [patient_id, doctor_id, appointment_date, appointment_time, status]);
    },
    getAllAppointments: async () => {
        return db.query('SELECT * FROM Appointments');
    },
    findByPatientId: async (patient_id) => {
        return db.query('SELECT * FROM Appointments WHERE patient_id = ?', [patient_id]);
    },
    reschedule: async (id, data) => {
        const { patient_id, doctor_id, appointment_date, appointment_time, status } = data;
        return db.query('UPDATE Appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, status = ? WHERE id = ?',
            [patient_id, doctor_id, appointment_date, appointment_time, status]);
    },
    updateStatus: async (id, status) => {
        return db.query('UPDATE Appointments SET status = ? WHERE id = ?', [status, id]);
    },
    deleteById: async (id) => {
        return db.query('DELETE FROM Appointments WHERE id = ?', [id]);
    },
};

module.exports = Appointment;
