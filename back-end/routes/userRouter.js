const express = require('express');
const avatarUpload = require('../middlewares/users/avatarUpload');
const authChecker = require('../middlewares/common/authChecker');
const {addUserValidators, userValidators} = require('../middlewares/users/useValidator');
const addUser = require('../controllers/userControllers/addUser');
const loginUser = require('../controllers/userControllers/loginUser');
const logoutUser = require('../controllers/userControllers/logoutUser');
const getUser = require('../controllers/userControllers/getUser');
const router = express.Router();

router.post('/signup', avatarUpload, addUserValidators, userValidators, addUser);
router.post('/login', loginUser);
router.post('/logout', authChecker, logoutUser)
router.get('/', authChecker, getUser);




module.exports = router; 