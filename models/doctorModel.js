const db = require('../config/db');

const Doctor = {
    create: async (data) => {
        const { first_name, last_name, specialization, email, phone, schedule } = data;
        return db.query('INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, email, phone, schedule]);
    },
    findAll: async () => {
        return db.query('SELECT * FROM Doctors');
    },
    updateDoctor: async (id, data) => {
        const { first_name, last_name, specialization, email, phone, schedule } = data;
        return db.query('UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?',
            [first_name, last_name, specialization, email, phone, schedule, id]);
    },
    updateSchedule: async (id, schedule) => {
        return db.query('UPDATE Doctors SET schedule = ? WHERE id = ?', [schedule, id]);
    },
    deleteById: async (id) => {
        return db.query('DELETE FROM Doctors WHERE id = ?', [id]);
    },
};

module.exports = Doctor;
