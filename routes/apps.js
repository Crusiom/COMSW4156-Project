const express = require('express');
const { createApp, updateApp } = require('../controllers/app');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/:id').put(updateApp);
router.route('/').post(createApp);

module.exports = router;
