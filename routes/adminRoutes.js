// const express = require('express');
// const adminController = require('../controllers/adminController');
// const router = express.Router();
// const { adminAuth } = require('../middleware/authMiddleware'); // Authentication middleware

// router.post('/register', adminController.register);
// router.post('/login', adminController.login);
// router.get('/logout', adminController.logout);

// // Protected routes (require authentication)

// // Display a list of patients (admin only), with search and filter options.
// router.get('/patients/:search?/:filterByGender?', adminAuth, adminController.getPatients);

// module.exports = router;






const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const { adminAuth } = require('../middleware/authMiddleware'); // Authentication middleware

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

// Protected routes (require authentication)

// Display a list of patients (admin only), with search and filter options.
router.get('/patients/:search?/:filterByGender?', adminAuth, adminController.getPatients);

module.exports = router;
