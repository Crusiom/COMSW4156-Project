const Event = require('../models/Events');
const asyncHandler = require('../middlewares/async');

exports.createEvent = asyncHandler(async (req, res, next) => {
    try {
        req.body.app = req.user.app;
        const event = await Event.create(req.body);
        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (err) {
        next(err);
    }
});

exports.updateEvent = asyncHandler(async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            success: true,
            data: event,
        });
    } catch (err) {
        next(err);
    }
});

exports.deleteEvent = asyncHandler(async (req, res, next) => {
    try {
        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
});

exports.getEvents = asyncHandler(async (req, res, next) => {
    try {
        const app = req.user.app;
        await Event.find({app: app});
        res.status(200)
    } catch (err) {
        next(err);
    }
});

