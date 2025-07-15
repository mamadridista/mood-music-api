const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.user = decoded.userId;  // add userId to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'token is not valid'});
    }
};

module.exports = authMiddleware;