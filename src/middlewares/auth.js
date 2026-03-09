const {ADMIN_TOKEN, JWT_SECRET} = require('../variables');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req?.cookies?.token;
        if(!token) {
            throw new Error("Unauthorised Access");
        }
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findOne({_id: decodedToken._id});
        if(!!decodedToken && !!user) {
            req.user = user;
            next();
        } else {
            throw new Error("Unauthorised Access");
        }
    } catch(err) {
        res.status(401).send("Unauthorised access!!");
    }
}

const isAdmin = (req, res, next) => {
    const adminToken = req.query.adminToken;
    if(adminToken === ADMIN_TOKEN) {
        next();
    } else {
        res.status(403).send("You dont have permission to access this page.");
    }
}

const isUnauthorisedPath = (middleWare, paths) => {
    return (req, res, next) => {
        if(paths.indexOf(req.path) > -1) {
            next();
        } else {
            middleWare(req, res, next);
        }
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isUnauthorisedPath
}