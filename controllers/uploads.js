const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const upload = async (req, res = response) => {
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

module.exports = { upload };
