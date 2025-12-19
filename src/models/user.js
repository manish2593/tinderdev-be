const mongoose = require('mongoose');
const {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    GENDER_ENUM
} = require('../variables');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
            validator: (value) => {
                return String(value)?.length === 10;
            },
            message: ERROR_MESSAGES.phone
        }
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                return EMAIL_REGEX.test(value)
            },
            message: ERROR_MESSAGES.email
        }
    },
    skills: [String],
    password: {
        type: String,
        required: true,
        trim: true,
        minLenght: 6,
        maxLength: 15
    }
}, {
    timestamps: true
})

const UserModel = new mongoose.model('Users', userSchema);
module.exports = UserModel;