const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

const uploadFile = (req, res = response) => {
    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.sampleFile
    ) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    const { sampleFile } = req.files;
    const splittedName = sampleFile.name.split('.');
    const extension = splittedName[splittedName.length - 1];

    // validate extensions
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(extension)) {
        res.status(400).json({
            msg: `The ${extension} extension is not allowed, only the following extensions are accepted ${validExtensions}`,
        });
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', tempName);

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath });
    });
};

module.exports = { uploadFile };
