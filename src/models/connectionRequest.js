const mongoose = require('mongoose');
const { CONNECTION_SEND_STATUS } = require('../variables');
const connectionRequestSchema = new mongoose.Schema({
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Users'
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Users'
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: CONNECTION_SEND_STATUS,
            message: `{VALUE} is not a valid status.`
        }
    }
})

connectionRequestSchema.pre(['save', 'findOneAndUpdate'], function(next) {
    console.log(this.toUserId, this.fromUserId);
    if(this.toUserId === this.fromUserId) {
        return next(new Error("Invalid request!"));
    }
})

module.exports = mongoose.model('Connections', connectionRequestSchema);