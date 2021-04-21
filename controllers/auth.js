const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const generateJWT = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);
        res.json({
            msg: 'todo ok',
            googleUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Google token is not valid',
        });
    }
};

module.exports = { login, googleSignIn };
