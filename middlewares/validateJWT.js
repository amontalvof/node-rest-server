const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token',
        });
    }
};

module.exports = { validateJWT };
