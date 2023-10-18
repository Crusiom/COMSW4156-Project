const express = require('express');
const { register, getMe, login, logout } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.get('/me', protect, getMe);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
