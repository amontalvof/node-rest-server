const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const allowedCollections = ['users', 'roles', 'categories', 'products'];

const searchUser = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(term, 'i');

    const [users, total] = await Promise.all([
        User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }],
        }),
        User.countDocuments({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }],
        }),
    ]);

    res.json({ total, results: users });
};

const search = (req, res = response) => {
    const { collection, term } = req.params;
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allowed collections are: ${allowedCollections}`,
        });
    }

    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;
        case 'categories':
            break;
        case 'products':
            break;

        default:
            res.status(500).json({
                msg: 'I forgot to do this search',
            });
            break;
    }
};

module.exports = { search };
