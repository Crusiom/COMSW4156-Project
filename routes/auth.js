const express = require('express');
const {
    register,
    getMe,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.get('/me', protect, getMe);
router.post('/login', login);
router.get('/logout', logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
