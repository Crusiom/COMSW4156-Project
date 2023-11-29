const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('./async');
const Event = require('../models/Events');

// Protect route based on app configuration settings

// This middleware function is designed to protect routes based on the configuration
// settings of an event associated with the authenticated user.

exports.checkEventConfig = (setting) => {
    return asyncHandler(async (req, res, next) => {
        const event = req.user.event;
        const currentEvent = await Event.findOneById(event);

        // If the event is not found, return an error response
        if (!currentEvent) {
            return next(new ErrorResponse('Cannot find this event to have a review for!', 404));
        }

        // Check if the specified 'setting' is disabled in the event's configuration
        if (!currentEvent[setting]) {
            // If the specified 'setting' is set to false, return an error response
            return next(new ErrorResponse('This function has been closed by the publisher'));
        }

        next();
    });
};
