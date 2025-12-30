const express = require('express');
const userRouter = express.Router();
const UserModel = require("../models/user");
const { validateSignupFields } = require('../utils/validator');

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

        if(!user) {
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

module.exports = userRouter;