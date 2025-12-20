const { SIGNUP_FIELDS } = require("../variables")

const validateSignupFields = (data = {}) => {
    return Object.keys(data).every((key) => SIGNUP_FIELDS.includes(key));
}

const validateSkills = (skills = []) => {
    return skills.length <= 10;
}

module.exports = {
    validateSignupFields,
    validateSkills
}