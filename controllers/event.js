const Event = require('../models/Events');
const asyncHandler = require('../middlewares/async');

// @desc      Create a new event
// @routes    POST /api/v1/events
// @access    Private
exports.createEvent = asyncHandler(async (req, res, next) => {
    try {
        // Set the app of the event to the app of the currently authenticated user
        req.body.app = req.user.app;

        req.body.author = req.user._id;

        // Create a new event using the data from the request body
        const event = await Event.create(req.body);

        // Respond with a success status and the created event data
        return res.status(200).json({
            success: true,
            data: event,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Update an existing event
// @routes    PUT /api/v1/events/:id
// @access    Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
    try {
        // Find and update the event with the given ID using the data from the request body
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        // Respond with a success status and the updated event data
        return res.status(201).json({
            success: true,
            data: event,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Delete an existing event
// @routes    DELETE /api/v1/events/:id
// @access    Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    try {
        // Find and delete the event with the given ID
        await Event.findByIdAndDelete(req.params.id);

        // Respond with a success status and an empty data object
        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Get a list of events for the current user's app
// @routes    GET /api/v1/events
// @access    Private
exports.getEvents = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve the app of the currently authenticated user
        const app = req.user.app;

        // Find events associated with the user's app
        const events = await Event.find({ app: app });

        // Respond with a success status and the list of events
        return res.status(200).json({
            success: true,
            data: events,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});
