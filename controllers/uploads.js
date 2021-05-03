const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

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

const updateImage = (req, res = response) => {
    const { id, collection } = req.params;
    res.json({ id, collection });
};

module.exports = { uploadImage, updateImage };
