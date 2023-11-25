const App = require('../models/Apps');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../helpers/errResponse');

// @desc      Create a new application
// @routes    POST /api/v1/apps
// @access    Private
exports.createApp = asyncHandler(async (req, res, next) => {
    try {
        // Set the owner of the app to the ID of the currently authenticated user
        req.body.owner = req.user._id;

        // Create a new app using the data from the request body
        const app = await App.create(req.body);

        // Respond with a success status and the created app data
        res.status(200).json({
            success: true,
            data: app,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Update an existing application
// @routes    PUT /api/v1/apps/:id
// @access    Private
exports.updateApp = asyncHandler(async (req, res, next) => {
    try {
        // Check if the owner of the app matches the currently authenticated user
        if (app.owner !== req.user._id) {
            return next(ErrorResponse('You cannot access this app', 401));
        }

        // Find and update the app with the given ID using the data from the request body
        const app = await App.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        // Respond with a success status and the updated app data
        res.status(201).json({
            success: true,
            data: app,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});
