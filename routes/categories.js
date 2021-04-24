const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

/**
 ** /api/categories
 */

// get all categories
router.get('/', (req, res) => {
    res.json('get');
});

// get a category by id
router.get('/:id', (req, res) => {
    res.json('get id');
});

// create a category, anyone with a valid token
router.post('/', (req, res) => {
    res.json('post');
});

// update a category, anyone with a valid token
router.put('/:id', (req, res) => {
    res.json('put');
});

// delete a category, only a user with role admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;
