const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const generateJWT = require('../helpers/generateJWT');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Email not exists',
            });
        }

        // check if user is active
        if (!user.status) {
            return res.status(400).json({
                msg: 'User not active',
            });
        }

        // check if the password is correct
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password is incorrect',
            });
        }

        // generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong',
        });
    }
};

const googleSignIn = (req, res = response) => {
    const { id_token } = req.body;
    res.json({
        msg: 'todo ok',
        id_token,
    });
};

module.exports = { login, googleSignIn };
