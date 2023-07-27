const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
async function loginUser(req, res){
    const {email, password} = req.body;
    if(email) {
        try{
            const data = await User.findOne({email: email})
            if(data) {
                const passwordCompare = await bcrypt.compare(password, data.password);
                if(passwordCompare) {
                    const token = jwt.sign({id: data._id, email: data.email}, process.env.SECRET_JWT, {
                        expiresIn: '7d'
                    });

                    res.cookie('accessToken', token, {
                        signed: true,
                        httpOnly: true,
                        maxAge: 604800000,
                        sameSite: "none",
                        secure: true,
                    })
                    res.status(200).json({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        avatar: data.avatar,
                        message: "Login Was Successfully",
                        accessToken: token,
                    })
                } else {
                    res.json({
                        errors: {
                            login: {
                                msg: "You have not provided correct login info"
                            }
                        }
                    })
                }
            } else {
                res.json({
                    errors: {
                        login: {
                            msg: "You have not provided correct login info"
                        }
                    }
                })
            }
        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = loginUser;