const App = require('../models/Apps');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../helpers/errResponse');

exports.createApp = asyncHandler(async (req, res, next) => {
    try {
        req.body.owner = req.user._id;
        const app = await App.create(req.body);
        res.status(200).json({
            success: true,
            data: app,
        });
    } catch (err) {
        return next(err);
    }
});

exports.updateApp = asyncHandler(async (req, res, next) => {
    try {
        if (app.owner !== req.user._id) {
            return next(ErrorResponse("You cannot access this app", 401))
        }
        const app = await App.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            success: true,
            data: app,
        });
    } catch (err) {
        return next(err);
    }
});