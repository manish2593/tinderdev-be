const express = require('express');
const profileRouter = express.Router();

profileRouter.get('/profile', async(req, res) => {
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
        console.log("err 1", err.message)
        res.status(400).send("Unauthorised Access//.");
    }
})

module.exports = profileRouter;
