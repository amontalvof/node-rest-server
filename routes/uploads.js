const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { uploadImage, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/dbValidators');

const router = Router();

router.post('/', uploadImage);

router.put(
    '/:collection/:id',
    [
        check('id', 'It is not a valid id').isMongoId(),
        check('collection').custom((collection) =>
            allowedCollections(collection, ['users', 'products'])
        ),
        validateFields,
    ],
    updateImage
);

module.exports = router;
