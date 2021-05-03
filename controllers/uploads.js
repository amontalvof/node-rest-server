const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');
const { User, Product } = require('../models');

const uploadImage = async (req, res = response) => {
    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.sampleFile
    ) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }
    try {
        // const fileName = await uploadFile(req.files, ['txt', 'md'], 'textos');
        const fileName = await uploadFile(req.files, undefined, 'images');
        res.json({ name: fileName });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no user with the id ${id} in the database`,
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `There is no product with the id ${id} in the database`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'I forgot to validate this' });
    }

    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;
    await model.save();
    res.json(model);
};

module.exports = { uploadImage, updateImage };
