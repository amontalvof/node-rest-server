const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const Role = require('../models/role');
const {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post(
    '/',
    [check('name', 'The name is required').not().isEmpty()],
    [
        check('password', 'the password must be more than 6 letters').isLength({
            min: 6,
        }),
    ],
    [check('email', 'The email is not valid').isEmail()],
    // [check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE'])],
    check('role').custom(async (role = '') => {
        const existsRole = await Role.findOne({ role });
        if (!existsRole) {
            throw new Error(`The ${role} is not registered in the database`);
        }
    }),
    validateFields,
    postUsers
);

router.put('/:id', putUsers);
router.patch('/', patchUsers);
router.delete('/', deleteUsers);

module.exports = router;
