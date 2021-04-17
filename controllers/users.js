const { response } = require('express');
const bcryptjs = require('bcryptjs');
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
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save to database
    await user.save();

    res.status(201).json({
        user,
    });
};

const putUsers = async (req, res = response) => {
    const id = req.params.id;
    const { password, google, email, ...rest } = req.body;

    // TODO: validar contra base de datos

    if (password) {
        // encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: 'put API - controller',
        user,
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
