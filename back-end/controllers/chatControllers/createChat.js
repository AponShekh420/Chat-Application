const Chat = require('../../models/chatModel')


const createChat = async (req, res) => {
    const {_id} = req.body;

    try {
        const chatVerify = await Chat.find({
            $and: [
                {users: {$elemMatch: {$eq: req.user.id}}},
                {users: {$elemMatch: {$eq: _id}}}
            ]
        })

        if(chatVerify.length > 0) {
            console.log(chatVerify)
            res.json({
                errors: {
                    common: {
                        msg: "Chat Is Already Exists"
                    }
                }
            })
        } else {
            const NewChat = new Chat({
                chatName: 'one by one',
                users: [req.user.id, _id],
            })
            const result = await NewChat.save();
            res.status(200).json({
                chat: result,
                message: "Chat Was Created Successfully"
            })
        }
    } catch(err) {
        console.log(err)
    }
}

module.exports = createChat;