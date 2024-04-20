const crypto = require('crypto');

// Function to generate a random JWT secret key
function generateJwtSecret() {
    return crypto.randomBytes(64).toString('hex');
}

// Set the 'test' environment configuration object
module.exports = {
    db: 'mongodb+srv://harriet_atis:SpongeBob1@cluster1.xxjcct2.mongodb.net/Users',
    sessionSecret: 'testSessionSecret',
    jwtSecret: generateJwtSecret() // Generate JWT secret key for test environment
};