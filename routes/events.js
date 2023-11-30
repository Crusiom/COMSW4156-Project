const express = require('express');
const { createEvent, updateEvent, getEvents, deleteEvent } = require('../controllers/event');

const router = express.Router();

const { protect } = require('../middlewares/auth');
const { checkAppConfig } = require('../middlewares/appChecker');

router.use(protect);

router.route('/:id').put(updateEvent).delete(deleteEvent);
router.route('/', checkAppConfig('Event')).get(getEvents).post(createEvent);

module.exports = router;
