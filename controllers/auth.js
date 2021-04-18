const { response } = require('express');

const login = (req, res = response) => {
    res.json({
        msg: 'post login',
    });
};

module.exports = { login };
