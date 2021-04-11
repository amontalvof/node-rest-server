const { response } = require('express');

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

const postUsers = (req, res = response) => {
    const { name, age } = req.body;
    res.status(201).json({
        msg: 'post API - controller',
        name,
        age,
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
