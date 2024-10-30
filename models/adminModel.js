const db = require('../config/db');

const Admin = {
    // Add a new admin (admin creation)
    create: async (data) => {
        const { username, password_hash, role } = data;
        return db.query('INSERT INTO admin (username, password_hash, role) VALUES (?, ?, ?)',
            [username, password_hash, role]);
    },

    // Find admin by username (for login)
    findByUsername: async (username) => {
        return db.query('SELECT * FROM admin WHERE username = ?', [username]);
    },

    // Fetch all patients (admin can view all patients)
    getAllPatients: async (data) => {
        const { search, filterByGender } = data;
        let query = 'SELECT patient_id, first_name, last_name, email, phone, date_of_birth, gender, address FROM patients WHERE 1=1';
        let params = [];

        if (search && search.trim() !== '' && search !== 'any') {
            query += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ? OR date_of_birth LIKE ? OR address LIKE ?)';
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
        }

        if (filterByGender && filterByGender.trim() !== '' && filterByGender !== 'any') {
            query += ' AND gender = ?';
            params.push(filterByGender);
        }
        return db.query(query, params);
    },
};

module.exports = Admin;
