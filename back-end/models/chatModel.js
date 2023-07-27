const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }
}, {
    timestamps: true,
})


const Chat = mongoose.model("Chat", chatSchema);


module.exports = Chat;