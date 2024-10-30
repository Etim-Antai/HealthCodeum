// const Admin = require('../models/adminModel');
// const bcrypt = require('bcrypt');

// // Controller for admin routes
// const adminController = {
//     // Admin - register
//     register: async (req, res) => {
//         try {
//             const { username, password, role } = req.body;
//             const [admin] = await Admin.findByUsername(username);
//             if (admin[0]) return res.status(400).json({ message: " Admin with this username already exists!" });

//             const password_hash = await bcrypt.hash(password, 10);
//             await Admin.create({ username, password_hash, role });
//             res.status(201).json({ message: "Admin registered successfully!" });
//         } catch (error) {
//             res.status(500).json({ message: 'Error registering admin!', error });
//         }
//     },

//     // Admin - Login
//     login: async (req, res) => {
//         try {
//             const { username, password } = req.body;
//             const [admin] = await Admin.findByUsername(username);

//             if (!admin[0]) {
//                 return res.status(400).json({ message: 'Admin not found! Please register' });
//             }

//             // Check the password using bcrypt
//             const isMatch = await bcrypt.compare(password, admin.password_hash);
//             if (!isMatch) {
//                 return res.status(401).json({ message: 'Invalid credentials!' });
//             }

//             // Upon successful login, start a session for the Admin.
//             req.session.adminData = {
//                 id: admin.admin_id,
//                 username: admin.username,
//                 role: admin.role
//             }
//             res.status(200).json({ message: 'Login successful!' });
//         } catch (error) {
//             res.status(500).json({ message: 'Error logging in!'+ error });
//         }
//     },

//     logout: (req, res) => {
//         try {
//             req.session.destroy((err) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Failed to log out!' });
//                 }
//                 res.clearCookie('connect.sid'); // Clears the session cookie
//                 return res.status(200).json({ message: 'Logged out successfully!' });
//             });
//         } catch (error) {
//             return res.status(500).json({ message: 'Server error', error });
//         }
//     },

//     // Admin - list all patients (with search and filter options)
//     getPatients: async (req, res) => {
//         try {
//             const { search, filterByGender } = req.params;
//             const [patients] = await Admin.getAllPatients({ search, filterByGender });
//             res.status(200).json(patients);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching patients', error });
//         }
//     },
// };

// module.exports = adminController;


const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

// Controller for admin routes
const adminController = {
    // Admin - register
    register: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const [admin] = await Admin.findByUsername(username);
            if (admin[0]) return res.status(400).json({ message: "Admin with this username already exists!" });

            const password_hash = await bcrypt.hash(password, 10);
            await Admin.create({ username, password_hash, role });
            res.status(201).json({ message: "Admin registered successfully!" });
        } catch (error) {
            res.status(500).json({ message: 'Error registering admin!', error });
        }
    },

    // Admin - Login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const [admin] = await Admin.findByUsername(username);

            if (!admin || !admin.length) {
                return res.status(400).json({ message: 'Admin not found! Please register' });
            }

            // Check the password using bcrypt
            const isMatch = await bcrypt.compare(password, admin[0].password_hash); // Fixed line

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials!' });
            }

            // Upon successful login, start a session for the Admin.
            req.session.adminData = {
                id: admin[0].admin_id,
                username: admin[0].username,
                role: admin[0].role
            };
            res.status(200).json({ message: 'Login successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in!' + error });
        }
    },

    logout: (req, res) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to log out!' });
                }
                res.clearCookie('connect.sid'); // Clears the session cookie
                return res.status(200).json({ message: 'Logged out successfully!' });
            });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    },

    // Admin - list all patients (with search and filter options)
    getPatients: async (req, res) => {
        try {
            const { search, filterByGender } = req.params;
            const [patients] = await Admin.getAllPatients({ search, filterByGender });
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching patients', error });
        }
    },
};

module.exports = adminController;
