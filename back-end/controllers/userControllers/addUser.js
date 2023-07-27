const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

async function addUser(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser;
    if(req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
            avatar: req.files[0].filename
        })
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        })
    }
    try {
        const result = await newUser.save();
        res.json({
            message: "User was added successfully"
        })
    } catch(err) {
        res.json({
            errors: {
                common: {
                    msg: "Unknown error occured"
                }
            }
        })
    }
}

module.exports = addUser;