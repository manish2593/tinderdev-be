const express = require('express');
const requestRouter = express.Router();
const ConnectionRequestModel = require('../models/connectionRequest');
const UserModel = require('../models/user');
const {
    default: mongoose
} = require('mongoose');
const { LIKE, ACCEPT, REJECT } = require('../variables');
const user = require('../models/user');

requestRouter.post('/request/:status/:userId', async (req, res, next) => {
    const {
        status,
        userId
    } = req.params;

    try {
        const loggedinUser = req.user;

        if (loggedinUser._id.toString() === userId) {
            throw new Error("Invalid request.");
        }

        const fromUser = await UserModel.findById(userId);
        if (!fromUser) {
            throw new Error("Invalid request: user not found.")
        }

        const existingRequest = await ConnectionRequestModel.findOne({
            $or: [{
                toUserId: userId,
                fromUserId: loggedinUser._id
            }, {
                toUserId: loggedinUser._id,
                fromUserId: userId
            }]
        });

        if (existingRequest) {
            throw new Error("Request already exist.")
        }

        const newRequest = new ConnectionRequestModel({
            toUserId: userId,
            fromUserId: loggedinUser._id,
            status
        });

        const requestObj = await newRequest.save();

        res.json({
            status: 200,
            message: `Request has been logged successfully.`,
            requestObj
        });
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})

requestRouter.post('/request/review/:status/:requestId', async (req, res) => {
    try {
        const {
            status, requestId
        } = req.params;
        if(![ACCEPT, REJECT].includes(status)) {
            throw new Error("Invalid status.");
        }

        const loggedInUser = req.user;
        const requestObj = await ConnectionRequestModel.findOne({
            toUserId: loggedInUser._id,
            status: LIKE,
            _id: requestId
        })

        if (!requestObj) {
            throw new Error("Invalid request!!!!");
        }

        requestObj.status = status;
        const updatedObj = await requestObj.save();
        res.json({status: 200, message: "Request has been updated successfully.", data: updatedObj});        
    } catch(err) {
        res.status(400).send(`ERROR: ${err.message}`);
    }
})

module.exports = requestRouter;