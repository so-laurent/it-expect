const jwt = require('jsonwebtoken');
const cookie = require('cookie'); 

/**
 * Middleware to check if the user is authenticated
 * @param {String} allowedRole - allowed role
 * @returns {Function} middleware function
 */
const authMiddleware = (allowedRole = "any") => {
    return (req, res, next) => {
        // get the bearer token from the headers without the Bearer prefix
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        // if token is not present, return 401
        if (!token) {
            return res.status(401).json({ message: 'Missing Token' });
        }

        // verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token' });
            }
            // if allowedRole is not any, check if the user role is allowed
            if (allowedRole !== "any" && user.role !== allowedRole) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // if all checks pass, set the user in request object
            req.user = user;
            next();
        });
    };
}

module.exports = authMiddleware;