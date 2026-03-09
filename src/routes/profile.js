const express = require('express');
const profileRouter = express.Router();
const UserModel = require('../models/user');

profileRouter.get('/profile/view', async(req, res) => {
    try {
        const user = req.user;
        if(!!user) {
            res.status(200).send({
                user
            });
        } else {
            res.status(401).send("User not found");
        }
    } catch(err) {
        console.log(err.message)
        res.status(400).send("Unauthorised Access//.");
    }
})

profileRouter.patch('/profile/edit', async(req, res) => {
    try {
        const user = req.user;
        const updatedUser = await UserModel.findOneAndUpdate({_id: user._id}, req.body, {
            returnDocument: 'after',
            runValidators: true
        }).catch(err => {
            console.log(err);
        })
        
        if(!!updatedUser) {
            res.status(200).send({
                updatedUser,
                message: "User updated successfully."
            });
        } else {
            res.status(401).send("User not found");
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
})

module.exports = profileRouter;
