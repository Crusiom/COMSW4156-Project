const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('./async');
const App = require('../models/Apps');

// Protect route based on app configuration settings

// This middleware function is designed to protect routes based on the configuration
// settings of an application associated with the authenticated user.

exports.checkAppConfig = (setting) => {
    return asyncHandler(async (req, res, next) => {
        const app = req.user.app;
        const currentApp = await App.findOneById(app);

        // If the app is not found, return an error response
        if (!currentApp) {
            return next(new ErrorResponse('Cannot find this app', 404));
        }

        // Check if the specified 'setting' is disabled in the app's configuration
        if (!currentApp[setting]) {
            // If the specified 'setting' is set to false, return an error response
            return next(new ErrorResponse('This function has been closed by the publisher'));
        }

        next();
    });
};
