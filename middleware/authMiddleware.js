// Middleware for admin routes
const adminAuth = (req, res, next) => {
    console.log("Session Data:", req.session); // Log the session data
    if (req.session && req.session.adminData?.id) {
        console.log(`Admin access granted for admin ID: ${req.session.adminData.id}`);
        return next(); // User is authenticated, proceed to the requested route
    }
    // If not authenticated
    console.log("Unauthorized admin access attempt");
    res.status(401).json({ message: 'Unauthorized: Please log in' });
};

// Middleware for patient routes
const patientAuth = (req, res, next) => {
    console.log("Session Data:", req.session); // Log the session data
    if (req.session && req.session.patientData?.id) {
        console.log(`Patient access granted for patient ID: ${req.session.patientData.id}`);
        return next(); // User is authenticated, proceed to the requested route
    }
    // If not authenticated
    console.log("Unauthorized patient access attempt");
    res.status(401).json({ message: 'Unauthorized: Please log in' });
};

module.exports = { adminAuth, patientAuth };
