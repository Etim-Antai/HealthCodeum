const Doctor = require('../models/doctorModel');

exports.addDoctor = async (req, res) => {
    try {
        const { first_name, last_name, specialization, email, phone, schedule } = req.body;
        const [doctors] = await Doctor.create({ first_name, last_name, specialization, email, phone, schedule });
        const doctor = doctors[0];
        res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctor' });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const [doctors] = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
};

// Admin - update doctor
exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        await Doctor.updateDoctor(id, req.body);
        res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor' });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { schedule } = req.body;
        await Doctor.updateSchedule(req.params.id, schedule);
        res.status(200).json('Doctor schedule updated successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule' });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.deleteById(req.params.id);
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor' });
    }
};
