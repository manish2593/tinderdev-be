const express = require('express');
const cookieParser = require('cookie-parser');
const { isUnauthorisedPath, isAuthenticated } = require('../middlewares/auth');
const { UNAUTHORISED_PATH, JWT_SECRET } = require('../variables');
var session = require('express-session')

const app = express();
app.set('trust proxy', 0);
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(express.json());
app.use(cookieParser());
app.use(isUnauthorisedPath(isAuthenticated, UNAUTHORISED_PATH));
module.exports = app;