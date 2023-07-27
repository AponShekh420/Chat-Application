const {check, validationResult} = require('express-validator')
const createHttpError = require('http-errors');
const User = require('../../models/userModel');
const path = require('path')
const { unlink } = require('fs');

let password = '';
const addUserValidators = [
    check('name')
        .isLength({min: 3})
        .withMessage('Name is required')
        .isAlpha('en-US', {ignore: ' -'})
        .withMessage('Name must not contain anything other then alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value)=> {
            try {
                const user = await User.findOne({email: value});
                if(user) {
                    throw createHttpError('Email already is use');
                }
            } catch(err) {
                throw createHttpError(err.message);
            }
        }),
        
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
];



function userValidators(req, res, next){
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    const fileName = req.files[0].filename;
    if(Object.keys(mappedError).length === 0) {
        next();
    } else {
        if(req.files.length > 0) {
            unlink(path.join(__dirname, `/../../public/uploads/avatars/${fileName}`), (err)=> {
                console.log(err)
            })
        }
        res.json({
            errors: mappedError,
        })
    }
}



module.exports = {
    addUserValidators,
    userValidators,
};