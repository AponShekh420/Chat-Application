const Message = require('../../models/messageModel');
const Chat = require('../../models/chatModel');
const User = require('../../models/userModel');
const sendMessage = async (req, res)=> {
    const {content, chat} = req.body;
    try {
        const message = new Message({
            senderId: req.user.id,
            content: content,
            chat: chat,
        })
        let result = await message.save();
        result = await result.populate('senderId', 'name email avatar');
        result = await result.populate('chat');
        result = await User.populate(result, {
            path: 'chat.users',
            select: 'name avatar email'
        })
        if(result) {
            const findChat = await Chat.findByIdAndUpdate(chat, {
                latestMessage: result._id
            });
            res.json({
                message: result,
            });
        }
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = sendMessage;