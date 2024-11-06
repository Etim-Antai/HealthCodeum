const db = require('../config/db');

const Doctor = {
    create: async (data) => {
        const { first_name, last_name, specialization, email, phone, schedule } = data;
        return db.query(
            'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, email, phone, schedule]
        );
    },
    
    findAll: async () => {
        return db.query('SELECT * FROM Doctors');
    },
    
    // Removed the dependency on PatientDoctors table
    findById: async (doctorId) => {
        return db.query('SELECT * FROM Doctors WHERE doctor_id = ?', [doctorId]);
    },
    
    updateDoctor: async (id, data) => {
        const { first_name, last_name, specialization, email, phone, schedule } = data;
        return db.query(
            'UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE doctor_id = ?',
            [first_name, last_name, specialization, email, phone, schedule, id]
        );
    },
    
    updateSchedule: async (id, schedule) => {
        return db.query('UPDATE Doctors SET schedule = ? WHERE doctor_id = ?', [schedule, id]);
    },
    
    deleteById: async (id) => {
        return db.query('DELETE FROM Doctors WHERE doctor_id = ?', [id]);
    },
};

module.exports = Doctor;
