const User = require("../../models/userModel");
const Chat = require("../../models/chatModel");

const getChat = async (req, res) => {
    try {
        let chats = await Chat.find({
            users: {$elemMatch: {$eq: req.user.id}}
        }).populate('users', '-password').populate('groupAdmin').populate('latestMessage').sort({updatedAt: -1});

        chats = await User.populate(chats, {
            path: 'latestMessage/senderId',
            select: 'name avatar email -password'
        });

        res.json({
            chats: chats,
        });
    } catch(err) {
        console.log(err.message)
    }
}
module.exports = getChat;