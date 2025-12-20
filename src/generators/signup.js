const bcrypt = require('bcrypt');

const signupPayload = async (req = {}) => {
    const {
        firstName,
        lastName,
        age,
        gender,
        phone,
        address,
        email,
        skills,
        password
    } = req?.body;

    const passwordHash = await bcrypt.hash(password, 10);
    return {
        firstName,
        lastName,
        age,
        gender,
        phone,
        address,
        email,
        skills,
        password: passwordHash
    }
}

module.exports = {
    signupPayload
}