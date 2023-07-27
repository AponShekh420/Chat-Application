const jwt  = require("jsonwebtoken");

const authChecker = async (req, res, next)=> {

    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if(cookie) {
        try {
            const token = cookie.accessToken;
            if(token) {
                const decoded = jwt.verify(token, process.env.SECRET_JWT);
                req.user = decoded;
                next();
            } else {
                res.json({
                    errors: {
                        common: {
                            msg: 'Authentication failure 6'
                        }
                    }
                })
            }
            
        } catch(err) {
            res.json({
                errors: {
                    common: {
                        msg: 'Authentication failure 5'
                    }
                }
            })
        }
    } else {
        res.json({
            errors: {
                common: {
                    msg: 'Authentication failure 4'
                }
            }
        })
    }

}


module.exports = authChecker;