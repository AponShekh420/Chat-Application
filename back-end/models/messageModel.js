const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    }
}, {
    timestamps: true,
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;