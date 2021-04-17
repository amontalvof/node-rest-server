const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`The ${role} is not registered in the database`);
    }
};

const emailExist = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`The email ${email} is already registered`);
    }
};

const existUserById = async (id = '') => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(
            `There is no user with id: ${id} registered in the database`
        );
    }
};

module.exports = { isValidRole, emailExist, existUserById };
