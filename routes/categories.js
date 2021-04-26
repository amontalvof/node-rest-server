const { Router } = require('express');
const { check } = require('express-validator');
const { existCategoryById } = require('../helpers/dbValidators');
const {
    createCategory,
    getCategories,
    getCategory,
} = require('../controllers/categories');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

/**
 ** /api/categories
 */

// get all categories
router.get('/', getCategories);

// get a category by id
router.get(
    '/:id',
    [
        check('id', 'It is not a valid id').isMongoId(),
        check('id').custom(existCategoryById),
        validateFields,
    ],
    getCategory
);

// create a category, anyone with a valid token
router.post(
    '/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        validateFields,
    ],
    createCategory
);

// update a category, anyone with a valid token
router.put('/:id', (req, res) => {
    res.json('put');
});

// delete a category, only a user with role admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;
