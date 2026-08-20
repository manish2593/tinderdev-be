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
        password,
        photoUrl
    } = req?.body;

    const passwordHash = await bcrypt.hash(password, 10);
    return {
        firstName,
        lastName,
        age,
        gender,
        phone,
        address,
        photoUrl,
        email,
        skills,
        password: passwordHash
    }
}

module.exports = {
    signupPayload
}