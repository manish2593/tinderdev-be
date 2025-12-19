const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true },
    lastName: {type: String, required: true},
    age: {type: Number, max: 100, required: true},
    gender: {type: String, required: true},
    phone: {length: 10, type: Number, unique: true, required: true },
    address: String,
    email: {type: String, required: true},
    skills: [String],
    password: {type: String, required: true}
})

const UserModel = new mongoose.model('Users', userSchema);
module.exports = UserModel;