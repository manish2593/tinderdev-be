const userRouter = require('./user');
const profileRouter = require('./profile');
const authRouter = require('./auth');
const notificationRouter = require('./notification');
const requestRouter = require('./request')
const connectionRouter = require('./connection');

module.exports = {
    authRouter, profileRouter, userRouter, notificationRouter, requestRouter, connectionRouter
}