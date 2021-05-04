const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateFile } = require('../middlewares');
const { uploadImage, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/dbValidators');

const router = Router();

router.post('/', validateFile, uploadImage);

router.put(
    '/:collection/:id',
    [
        validateFile,
        check('id', 'It is not a valid id').isMongoId(),
        check('collection').custom((collection) =>
            allowedCollections(collection, ['users', 'products'])
        ),
        validateFields,
    ],
    updateImage
);

module.exports = router;
