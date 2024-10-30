// Import necessary modules and your Patient model
const Patient = require('../models/patientModel'); // Path to your model
const bcrypt = require('bcrypt'); // For hashing passwords

const register = async (req, res) => {
    const { first_name, last_name, email, phone, date_of_birth, gender, address, password } = req.body;

    try {
        // Check for existing patient by email
        const existingEmail = await Patient.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Check for existing patient by phone
        const existingPhone = await Patient.findByPhone(phone);
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number is already registered.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new patient object
        const newPatient = {
            first_name,
            last_name,
            email,
            phone,
            date_of_birth,
            gender,
            address,
            password_hash: hashedPassword // Store hashed password
        };

        // Save patient to database
        const savedPatient = await Patient.create(newPatient);
        res.status(201).json({ message: 'Patient registered successfully!', patient: savedPatient });
    } catch (error) {
        console.error("Error saving patient to database:", error);
        res.status(500).json({ message: 'Error saving patient to database!', error: error.message });
    }
};

// Log in a patient
const login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body
    try {
        const patient = await Patient.findByEmail(email);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        const isMatch = await bcrypt.compare(password, patient.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        req.session.patientData = {
            id: patient.patient_id, 
            email: patient.email,
            first_name: patient.first_name, // Store patient's data in session
            last_name: patient.last_name,
            phone: patient.phone,
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            address: patient.address
        };

        res.status(200).json({ 
            message: 'Patient logged in successfully!', 
            patientData: req.session.patientData 
        });
        
        console.log(req.session);

    } catch (error) {
        console.error("Error logging in patient:", error);
        res.status(500).json({ message: 'Error logging in patient!', error: error.message });
    }
};
// Log out a patient
const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out patient:", err);
            res.status(500).json({ message: 'Error logging out patient!', error: err.message });
        } else {
            res.status(200).json({ message: 'Patient logged out successfully!' });
        }
    });
};

// Get patient profile
const getProfile = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
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
        res.status(500).json({ message: 'Error retrieving patient profile!', error: error.message });
    }
};



// Update patient profile
const updateProfile = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        console.log("Session Data:", req.session);
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        // Update patient details
        patient.first_name = req.body.first_name;
        patient.last_name = req.body.last_name;
        patient.email = req.body.email;
        patient.phone = req.body.phone;
        patient.date_of_birth = req.body.date_of_birth;
        patient.gender = req.body.gender;
        patient.address = req.body.address;

        // Save updated patient to database
        const updatePatient = await Patient.updateProfile(patientId, patient);
        res.status(200).json({ message: 'Patient profile updated successfully!', patient: updatePatient });
    } catch (error) {    
        console.error("Error updating patient profile:", error);
        res.status(500).json({ message: 'Error updating patient profile!', error: error.message });
    }
};

// Delete patient account
const deleteAccount = async (req, res) => {
    const patientId = req.session.patientData?.id;
    if (!patientId) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        // Delete patient account
        await Patient.deleteById(patientId); // Use deleteById method from the model
        req.session.destroy((err) => {
            if (err) {
                console.error("Error deleting patient account:", err);
                res.status(500).json({ message: 'Error deleting patient account!', error: err.message });
            } else {
                res.status(200).json({ message: 'Patient account deleted successfully!' });
            }
        });
    } catch (error) {    
        console.error("Error deleting patient account:", error);
        res.status(500).json({ message: 'Error deleting patient account!', error: error.message });
    }
};

// Get patient dashboard
const getDashboard = async (req, res) => {
    console.log("Dashboard request for:", req.session.patientData?.email);
    try {
        const patientId = req.session.patientData?.id;
        if (!patientId) {
            return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
        }

        // Fetch patient's basic information
        const patientDetails = await Patient.findById(patientId);
        if (!patientDetails) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        // Create the response object, adding appointments and medications
        const dashboardData = {
            patientId: patientDetails.patient_id,
            name: `${patientDetails.first_name} ${patientDetails.last_name}`,
            email: patientDetails.email,
            phone: patientDetails.phone,
            date_of_birth: patientDetails.date_of_birth,
            gender: patientDetails.gender,
            address: patientDetails.address,
            appointments: await Appointment.findByPatientId(patientId), // Assuming you have a method for this
            medications: await Medication.findByPatientId(patientId),   // Assuming you have a method for this
            doctors: await Doctor.findByPatientId(patientId),           // Assuming you have a method for this
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Error retrieving dashboard data:", error);
        res.status(500).json({ message: 'Error retrieving dashboard data!', error: error.message });
    }
};

// Consolidate exports
module.exports = { 
    register, 
    login, 
    logout, 
    getProfile, 
    updateProfile, 
    deleteAccount,
    getDashboard // Add the new function here
};
