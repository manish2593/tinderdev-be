const bcrypt = require('bcrypt');
const { SIGNUP_FIELDS } = require("../variables");

const validateSignupFields = (data = {}) => {
    return Object.keys(data).every((key) => SIGNUP_FIELDS.includes(key));
}

const validateSkills = (skills = []) => {
    return skills.length <= 10;
}

const validateLogin = async (payload = {}, user = {}) => {
    try {
        const isValidPassword = await bcrypt.compare(payload?.password, user.password);
        const isValidUser = !!user && !!isValidPassword;
        return isValidUser;
    } catch(err) {
        throw new Error("Request failed :" + err.message);
    }
}

module.exports = {
    validateSignupFields,
    validateSkills,
    validateLogin
}