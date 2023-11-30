const User = require('../models/Users');
const asyncHandler = require('../middlewares/async');

// @desc      Get all user profiles (the data fields other than name/email/passwords)
// @routes    GET /api/v1/users
// @access    Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    try {
        return res.status(200).json(res.advancedResults);
    } catch (err) {
        return next(err);
    }
});

// @desc      Get single user profile (the data fields other than name/email/passwords)
// @routes    GET /api/v1/users/:id
// @access    Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        return next(err);
    }
});

// @desc      Create user's profile, which are the data fields other than name/email/passwords
// @routes    POST /api/v1/users
// @access    Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        return res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        return next(err);
    }
});

// @desc      Update user's profile (update a field other than name/email/passwords)
// @routes    PUT /api/v1/users/:id
// @access    Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        return next(err);
    }
});

// @desc      Delete user's profile
// @routes    DELETE /api/v1/users
// @access    Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        return next(err);
    }
});
