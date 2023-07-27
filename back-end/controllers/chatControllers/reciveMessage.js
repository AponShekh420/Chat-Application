const Message = require("../../models/messageModel");

const reciveMessage = async (req, res) => {
    const {chatId} = req.query;
    try {
        const message = await Message.find({
            chat: chatId,
        }).populate('chat').populate('senderId').sort({createdAt: -1})
        res.json({
            message: message
        })
    } catch(err) {
        console.log(err.message)
    }
}


module.exports = reciveMessage;