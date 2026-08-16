const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { isUnauthorisedPath, isAuthenticated } = require('../middlewares/auth');
const { UNAUTHORISED_PATH } = require('../variables');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(isUnauthorisedPath(isAuthenticated, UNAUTHORISED_PATH));
module.exports = app;