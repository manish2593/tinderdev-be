const express = require('express');
const notificationRouter = express.Router();

notificationRouter.put('/push/notifications', (req, res, next) => {
    res.status(200).send("All notifications data.");
})

module.exports = notificationRouter;