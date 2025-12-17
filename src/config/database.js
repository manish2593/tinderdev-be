const mongoose = require('mongoose');
const { DATABASE_URI, DATABASE_NAME } = require('../variables');

const connectDB = async () => {
    mongoose.connect(`${DATABASE_URI}${DATABASE_NAME}`);
}

module.exports = connectDB;