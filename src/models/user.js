const mongoose = require('mongoose');
const {
    ERROR_MESSAGES,
    GENDER_ENUM,
    PHONE_COUNTRY_CODE
} = require('../variables');
const {
    validateSkills
} = require('../utils/validator');
const {
    isMobilePhone,
    isStrongPassword,
    isByteLength,
    isEmail
} = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: (val) => isByteLength(val, {
                min: 3,
                max: 25
            }),
            message: ERROR_MESSAGES.firstName
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (val) => isByteLength(val, {
                min: 3,
                max: 25
            }),
            message: ERROR_MESSAGES.lastName
        }
    },
    age: {
        type: Number,
        max: 100,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: GENDER_ENUM
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        validate: {
            validator: (value) => isMobilePhone(String(value), PHONE_COUNTRY_CODE),
            message: ERROR_MESSAGES.phone
        }
    },
    address: {
        type: String,
        validate: {
            validator: (val) => isByteLength(val, {
                min: 0,
                max: 100
            }),
            message: ERROR_MESSAGES.address
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        validate: {
            validator: (value) => isEmail(value),
            message: ERROR_MESSAGES.email
        }
    },
    skills: {
        type: [String],
        set: (value) => {
            let filteredValues = [];
            value.map(val => {
                if (!filteredValues.includes(val)) {
                    filteredValues.push(val)
                }
            })
            return filteredValues;
        },
        validate: {
            validator: (val) => validateSkills(val),
            message: ERROR_MESSAGES.skills
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (val) => isStrongPassword(val),
            message: ERROR_MESSAGES.password
        },
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema);
// module.exports = UserModel;