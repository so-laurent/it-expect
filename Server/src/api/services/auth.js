const jwt = require('jsonwebtoken');
const { role } = require('../../config');

const auth = {
    /**
     * Generate a token
     * @param {Object} user - user object
     * @returns {String} token
    */
    generateToken:
        (user) => {       
            const token = jwt.sign({ 
                id: user.id, 
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return token;
        },
}

module.exports = auth;