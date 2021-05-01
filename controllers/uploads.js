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

    const fileName = await uploadFile(req.files);
    res.json({ name: fileName });
};

module.exports = { upload };
