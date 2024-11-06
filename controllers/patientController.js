// Import necessary modules and models
const Patient = require('../models/patientModel');       // Adjust path if needed
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel'); // Ensure Doctor model is correctly imported
const bcrypt = require('bcrypt');                        

// Register a new patient
const register = async (req, res) => {
    const { first_name, last_name, email, phone, date_of_birth, gender, address, password } = req.body;

    try {
        // Check for existing patient by email
        if (await Patient.findByEmail(email)) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Check for existing patient by phone
        if (await Patient.findByPhone(phone)) {
            return res.status(400).json({ message: 'Phone number is already registered.' });
        }

        // Hash password and create new patient
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = { first_name, last_name, email, phone, date_of_birth, gender, address, password_hash: hashedPassword };
        const savedPatient = await Patient.create(newPatient);
        
        res.status(201).json({ message: 'Patient registered successfully!', patient: savedPatient });
    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ message: 'Error registering patient.', error: error.message });
    }
};

// Log in a patient
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const patient = await Patient.findByEmail(email);
        if (!patient || !(await bcrypt.compare(password, patient.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        req.session.patientData = {
            id: patient.patient_id,
            email: patient.email,
            first_name: patient.first_name,
            last_name: patient.last_name,
            phone: patient.phone,
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            address: patient.address
        };

        res.status(200).json({ success: true, message: 'Logged in successfully.', patientData: req.session.patientData });
    } catch (error) {
        console.error("Error logging in patient:", error);
        res.status(500).json({ message: 'Error logging in patient.', error: error.message });
    }
};

// Log out a patient
const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out patient:", err);
            res.status(500).json({ message: 'Error logging out patient.', error: err.message });
        } else {
            res.status(200).json({ message: 'Logged out successfully.' });
        }
    });
};

// Get patient profile
const getProfile = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        const profileData = {
            patient_id: patient.patient_id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            email: patient.email,
            phone: patient.phone,
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            address: patient.address
        };

        res.status(200).json(profileData);
    } catch (error) {
        console.error("Error retrieving patient profile:", error);
        res.status(500).json({ message: 'Error retrieving profile.', error: error.message });
    }
};

// Update patient profile
const updateProfile = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const updatedData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address
        };

        const updatePatient = await Patient.updateProfile(patientId, updatedData);
        res.status(200).json({ message: 'Profile updated successfully.', patient: updatePatient });
    } catch (error) {
        console.error("Error updating patient profile:", error);
        res.status(500).json({ message: 'Error updating profile.', error: error.message });
    }
};

// Delete patient account
const deleteAccount = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        await Patient.deleteById(patientId);
        req.session.destroy((err) => {
            if (err) {
                console.error("Error deleting account:", err);
                res.status(500).json({ message: 'Error deleting account.', error: err.message });
            } else {
                res.status(200).json({ message: 'Account deleted successfully.' });
            }
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: 'Error deleting account.', error: error.message });
    }
};

// Get patient dashboard
const getDashboard = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const patientDetails = await Patient.findById(patientId);
        if (!patientDetails) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        const dashboardData = {
            patientId: patientDetails.patient_id,
            name: `${patientDetails.first_name} ${patientDetails.last_name}`,
            email: patientDetails.email,
            phone: patientDetails.phone,
            date_of_birth: patientDetails.date_of_birth,
            gender: patientDetails.gender,
            address: patientDetails.address,
            appointments: await Appointment.findByPatientId(patientId),
            // Here we simply fetch all doctors as there's no longer a relationship
            doctors: await Doctor.findAll() // Changed to findAll to retrieve all doctors
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Error retrieving dashboard data:", error);
        res.status(500).json({ message: 'Error retrieving dashboard.', error: error.message });
    }
};

// Export all controller functions
module.exports = { 
    register, 
    login, 
    logout, 
    getProfile, 
    updateProfile, 
    deleteAccount,
    getDashboard
};
