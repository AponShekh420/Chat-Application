const logoutUser = (req, res) => {
    res.clearCookie('accessToken');
    res.json({
        message: 'Logout Successfully'
    })
}

module.exports = logoutUser;