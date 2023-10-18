const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('./async');
const App = require('../models/Apps');

//protect route
exports.checkAppConfig = (setting) => {
    asyncHandler(async (req, res, next) => {
        const app = req.user.app;
        const currentApp = await App.findOneById(app);
        if (!currentApp) {
            return next(new ErrorResponse("Cannot find this app", 404));
        }
        if (!currentApp[setting]) {
            return next(new ErrorResponse("This function has been closed by the publisher"));
        }
        next();
    })
}