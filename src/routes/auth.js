const express = require('express');
const authRouter = express.Router();
const UserModel = require('../models/user');
const { validateLogin, validateSignupFields } = require('../utils/validator');
const { signupPayload } = require('../generators/signup');

authRouter.post('/login', async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) {
        throw new Error("Invalid Request");
    }

    try {
        const user = await UserModel.findOne({email: req.body?.email});
        const isValidUser = await validateLogin(req.body, user);
        if (isValidUser) {
            const token = await user.getJWTToken();
            res.cookie("token", token);
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch(err) {
        throw new Error("Request failed :" + err.message);
    }
})

authRouter.post('/signup', async (req, res) => {
    try {
        if (!validateSignupFields(req.body)) {
            throw new Error("Invalid Singup Data.");
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

module.exports = authRouter;
