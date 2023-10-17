const crypto = require('crypto');
const User = require('../models/Users');
const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('../middlewares/async');
const sendEmail = require('../helpers/sendEmail');

// @desc      Register a user that comes with a certain role and a certain end-application
// @routes    POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password, app, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorResponse('User with this email already exists', 401));
        }

        //create a user
        const user = await User.create({
            name,
            email,
            password, // hashing will have be already taken care of by the middleware
            app,
            role,
        });
        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
});

// @desc      Login a user
// @routes    POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse(`Please enter email and password`, 400));
    }

    //check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    //check if the password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc      Log user out and clear cookies
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
});

// @desc      Retrieves the details of the currently authenticated user
// @routes    GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
});

// @desc      Update user details (Do not update password use this method)
// @routes    PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            runValidators: true,
            new: true,
        });

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
});

// @desc      Update password when a logged-in user wants to change their current password
// @routes    PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse(`Password is incorrect`, 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc      Forgot password, an email will a token with a password reset link will be sent
// @routes    GET /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse(`There is no user with that email`, 401));
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    user.save({ validateBeforeSave: false });

    //create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
        });
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

// Get Token from model, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken();

    //create cookie
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
};

// @desc      Reset password when a user has forgotten it
// @routes    PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    //get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorResponse(`Invalid token`, 400));
    }

    //Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});
