const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const User = require('../models/Users');
const router = express.Router({ mergeParams: true });
const advancedResults = require('../middlewares/advancedResults');
// const { protect, authorize } = require('../middlewares/auth');

// router.use(protect);
// router.use(authorize('publisher'));
router.route('/').get(advancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
