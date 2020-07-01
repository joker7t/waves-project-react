const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}