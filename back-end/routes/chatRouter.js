const express = require('express');
const authChecker = require('../middlewares/common/authChecker');
const createChat = require('../controllers/chatControllers/createChat');
const getChat = require('../controllers/chatControllers/getChat');
const sendMessage = require('../controllers/chatControllers/sendMessage');
const reciveMessage = require('../controllers/chatControllers/reciveMessage');

const router = express.Router();


router.post('/', authChecker, createChat);
router.get('/', authChecker, getChat);
router.post('/message', authChecker, sendMessage);
router.get('/message', authChecker, reciveMessage);

module.exports = router;