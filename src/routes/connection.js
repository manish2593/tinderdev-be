const express = require('express');
const {
    resource
} = require('../config/server');
const {
    ACCEPT,
    USER_FIELDS
} = require('../variables');
const ConnectionRequestModel = require('../models/connectionRequest');
const connectionRouter = express.Router();

connectionRouter.get('/connection/matches', async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequestModel.find({
            $or: [{
                    fromUserId: loggedInUser._id,
                    status: ACCEPT
                },
                {
                    toUserId: loggedInUser._id,
                    status: ACCEPT
                },
            ]
        }).populate('toUserId', USER_FIELDS).populate('fromUserId', USER_FIELDS);
        const data = connections.map((conn) => {
            return conn.toUserId._id.toString() === loggedInUser._id.toString() ? conn.fromUserId : conn.toUserId;
        })

        res.json({
            status: 200,
            data
        });
    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }

})

module.exports = connectionRouter;