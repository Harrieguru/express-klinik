const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Assuming you have a config file with a secret key

function jwtAuth(req, res, next) {
  const token = req.headers.authorization; // Extract token from request headers

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // Verify token using the secret key
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    // Attach decoded user information to request object for further use
    req.user = decoded;
    next(); // Call next middleware
  });
}

module.exports = jwtAuth;
