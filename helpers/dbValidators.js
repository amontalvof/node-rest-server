const Role = require('../models/role');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`The ${role} is not registered in the database`);
    }
};

module.exports = { isValidRole };
