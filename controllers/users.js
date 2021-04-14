const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = (req, res = response) => {
    const { q, name = 'no name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        name,
        apikey,
        page,
        limit,
    });
};

const postUsers = async (req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // check if the email exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res
            .status(400)
            .json({ msg: 'This email is already registered' });
    }

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save to database
    await user.save();

    res.status(201).json({
        user,
    });
};

const putUsers = (req, res = response) => {
    const id = req.params.id;
    res.status(400).json({
        msg: 'put API - controller',
        id,
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'patch API - controller',
    });
};

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete API - controller',
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
};
