const db = require('../config/db');

const Patient = {
    // Create a new patient
    create: async (data) => {
        const { first_name, last_name, email, password_hash, phone, date_of_birth, gender, address } = data;
        try {
            console.log("Creating new patient with email:", email); // Log email before inserting
            const [result] = await db.query(
                'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]
            );

            // Log the result structure to understand what the database returns
            console.log("Result from insert query:", result); // Log full result object

            // Check for a valid insertId
            if (!result || typeof result.insertId === 'undefined') {
                throw new Error('Insert operation failed. No ID returned.');
            }

            console.log("Patient created successfully with ID:", result.insertId);

            // Fetch the full patient record after creation to return it
            const createdPatient = await Patient.findById(result.insertId);
            return createdPatient; // Return the complete patient object
        } catch (error) {
            console.error("Error creating patient:", error); // Log error details
            throw new Error('Could not create patient'); // Throw a more descriptive error
        }
    },

    // Find a patient by email
    findByEmail: async (email) => {
        try {
            console.log("Searching for patient with email:", email); // Log email before searching
            const [rows] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
            if (rows.length === 0) {
                return null; // Return null if no patient is found
            }
            console.log("Patient found by email:", rows); // Log query result
            return rows[0]; // Return the first matching patient
        } catch (error) {
            console.error("Error finding patient by email:", error); // Log error details
            throw new Error('Could not find patient by email'); // Throw a more descriptive error
        }
    },

    // Find a patient by phone
    findByPhone: async (phone) => {
        try {
            console.log("Searching for patient with phone:", phone); // Log phone before searching
            const [rows] = await db.query('SELECT * FROM patients WHERE phone = ?', [phone]);
            if (rows.length === 0) {
                return null; // Return null if no patient is found
            }
            console.log("Patient found by phone:", rows); // Log query result
            return rows[0]; // Return the first matching patient
        } catch (error) {
            console.error("Error finding patient by phone:", error); // Log error details
            throw new Error('Could not find patient by phone'); // Throw a more descriptive error
        }
    },


    // Find a patient by ID
    findById: async (id) => {
        try {
            console.log("Searching for patient with ID:", id); // Log ID before searching
            const [rows] = await db.query('SELECT * FROM patients WHERE patient_id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Patient not found'); // Handle case where no patient is found
            }
            console.log("Patient found by ID:", rows); // Log query result
            return rows[0]; // Return the first matching patient
        } catch (error) {
            console.error("Error finding patient by ID:", error); // Log error details
            throw new Error('Could not find patient by ID'); // Throw a more descriptive error
        }
    },

    // Update patient profile
    updateProfile: async (id, data) => {
        const { first_name, last_name, phone, date_of_birth, gender, address } = data;
        try {
            console.log("Updating patient profile with ID:", id); // Log ID before updating
            const result = await db.query(
                'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE patient_id = ?',
                [first_name, last_name, phone, date_of_birth, gender, address, id]
            );
            if (result.affectedRows === 0) {
                throw new Error('Patient not found'); // Handle case where no rows are affected
            }
            console.log("Profile updated successfully for ID:", id); // Log successful update
            return result; // Return result for further processing if needed
        } catch (error) {
            console.error("Error updating patient profile:", error); // Log error details
            throw new Error('Could not update patient profile ', error);  // Throw a more descriptive error
        }
    },

    // Delete a patient by ID
    deleteById: async (id) => {
        try {
            console.log("Deleting patient with ID:", id); // Log ID before deleting
            const result = await db.query('DELETE FROM patients WHERE patient_id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Patient not found'); // Handle case where no rows are affected
            }
            console.log("Patient deleted successfully with ID:", id); // Log successful delete
            return result; // Return result for further processing if needed
        } catch (error) {
            console.error("Error deleting patient by ID:", error); // Log error details
            throw new Error('Could not delete patient'); // Throw a more descriptive error
        }
    },
};

module.exports = Patient;
