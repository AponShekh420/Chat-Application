const User = require("../../models/userModel");

const getUser = async (req, res)=> {
    const {search} = req.query;
    try {
        const users = await User.find({
            $or: [
                {name: {
                    $regex: search, $options: 'i'
                }, _id: {
                    $ne: req.user.id
                }},
                {email: {
                    $regex: search, $options: 'i'
                }, _id: {
                    $ne: req.user.id
                }}
            ]
        })
        res.json({
            users: users
        })
    } catch(err) {
        res.json({
            error: "hoice ar ki"
        })
    }
}


module.exports = getUser