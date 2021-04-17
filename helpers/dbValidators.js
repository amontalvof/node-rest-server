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

module.exports = { isValidRole, emailExist };
