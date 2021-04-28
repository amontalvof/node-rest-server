const { response } = require('express');

const uploadFile = (req, res = response) => {
    res.json({
        msg: 'Upload',
    });
};

module.exports = { uploadFile };
