const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const { validateLogin, validateSignupFields } = require('../utils/validator');
const { signupPayload } = require('../generators/signup');
const { isStrongPassword } = require('validator');

authRouter.post('/login', async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) {
        throw new Error("Invalid Request");
    }

    try {
        const user = await UserModel.findOne({email: req.body?.email});
        console.log("user", user);
        if(!user){
            throw new Error("Invalid credentials.");
        }

        const isValidUser = await validateLogin(req.body, user);
        if (isValidUser) {
            const token = await user.getJWTToken();
            res.cookie("token", token);
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch(err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})

authRouter.post('/signup', async (req, res) => {
    try {
        if (!validateSignupFields(req.body)) {
            throw new Error("Invalid Singup Data.");
        }

        if(!isStrongPassword(req.body.password)) {
            return res.status(400).send({error: "Invalid password."});
        }

        const payload = await signupPayload(req);
        const user = new UserModel(payload);
        const newUserData = await user.save();

        res.status(200).send({
            message: "User got created successfully.",
            data: newUserData
        });
    } catch (err) {
        res.status(400).send("Request failed with err: " + err.message);
    }
})

authRouter.patch('/logout', (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    res.send("User logged out successfully.")
})

authRouter.patch('/createpassword', async (req, res) => {
    try {
        const user = req.user;
        const isPasswordvalid = await user?.isPasswordValid(req.body.password);
        if(!!isPasswordvalid) {
            user.password = await bcrypt.hash(req.body.newPassword, 10);
            const updatedUser = await user.save();
            res.json({status: 200, message: "Password got updated successfully.", user: updatedUser})
        } else {
            res.status(400).send("Invalid password.")
        }
    } catch(err) {
        res.status(400).send(err?.message)
    }
})

module.exports = authRouter;
