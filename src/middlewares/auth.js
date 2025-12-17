const {ADMIN_TOKEN} = require('../variables');

const isAuthenticated = (req, res, next) => {
    const token = req.query.token;
    if(!!token) {
        next();
    } else {
        res.status(401).send("User is not authorised");
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

module.exports = {
    isAuthenticated,
    isAdmin
}