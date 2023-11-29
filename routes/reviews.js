const express = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/reviews');
const { protect } = require('../middlewares/auth');
const { checkEventConfig } = require('../middlewares/eventChecker');

const router = express.Router();

router.use(protect);

router.route('/:id').put(updateReview).delete(deleteReview);
router.route('/', checkEventConfig('Event')).post(createReview);

module.exports = router;
