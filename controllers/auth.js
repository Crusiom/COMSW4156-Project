const User = require('../models/Users');
const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('../middlewares/async');

// @desc      Register a user that comes with a certain role and a certain end-application
// @routes    POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password, app, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorResponse('User with this email already exists', 400));
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
        return next(err);
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
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        return next(err);
    }
});

// @desc      Retrieves the details of the currently authenticated user
// @routes    GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        return next(err);
    }
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

    return res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
};
