const express = require('express');
const userRouter = express.Router();
const UserModel = require("../models/user");
const ConnectionRequestModel = require('../models/connectionRequest');
const {
    validateSignupFields
} = require('../utils/validator');
const {
    LIKE,
    USER_FIELDS
} = require('../variables');
const {
    Connection
} = require('mongoose');

// find user by email
userRouter.get('/user', async (req, res) => {
    try {
        const user = await UserModel.find({
            email: req.body.email
        });
        res.status(200).send({
            user
        });
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})


// fetch all users
userRouter.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// update a user find findByIdAndUpdate
userRouter.patch('/users/:userId', async (req, res) => {
    try {
        if (!validateSignupFields(req.body)) {
            throw new Error("Bad Request. Please check payload.");
        }

        const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, {
            returnDocument: 'after',
            lean: true,
            runValidators: true
        })

        if (!user) {
            throw new Error("User not found.")
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("User update failed " + err.message);
    }
})

// update a user by findOneAndUpdate
userRouter.put('/users', async (req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate({
            _id: req.body.userId
        }, req.body, {
            returnDocument: 'after',
            lean: true,
            runValidators: true
        })
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// Delete a user
userRouter.delete('/users', async (req, res) => {
    await UserModel.findByIdAndDelete(req.body.userId)
    res.send("User delected successfully.")
})

userRouter.get('/user/request/received', async (req, res) => {
    const loggedInUser = req.user;
    try {
        const requests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: LIKE
        }).populate('fromUserId', USER_FIELDS).populate('toUserId', USER_FIELDS);
        const data = requests.map(req => {
            const user = loggedInUser._id.toString() === req.fromUserId._id.toString() ? req.toUserId : req.fromUserId
            return {
                requestId: req._id,
                user
            }
        })

        res.json({
            data,
            status: 200
        });
    } catch (err) {
        res.status(400).send(`Invalid Request: ${err.message}`)
    }
})

userRouter.get('/feed', async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skipVal = (((parseInt(page) || 1) - 1) * parseInt(limit));
        const connections = await ConnectionRequestModel.find({
            $or: [{
                    fromUserId: loggedInUser._id
                },
                {
                    toUserId: loggedInUser._id
                }
            ]
        });
        const hiddenUsers = new Set([]);
        connections.map(conn => {
            hiddenUsers.add(conn.toUserId.toString());
            hiddenUsers.add(conn.fromUserId.toString());
        })

        const feedUsers = await UserModel.find({
            $and: [{
                    _id: {
                        $nin: Array.from(hiddenUsers)
                    }
                },
                {
                    _id: {
                        $ne: loggedInUser._id
                    }
                }
            ]
        }).skip(skipVal).limit(parseInt(limit) || 10).select('firstName gender age')

        res.json({
            status: 200,
            data: feedUsers
        })
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})
module.exports = userRouter;