const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/errResponse');
const asyncHandler = require('./async');
const User = require('../models/Users');

//protect route
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (!req.headers.authorization && !req.cookies) {
        return next(new ErrorResponse(`Not authorized to access this route`, 401));
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    } else if (req.cookies) {
        token = req.cookies.token;
    }

    //Make sure token exist
    if (!token) {
        return next(new ErrorResponse(`Not authorized to access this route`, 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});

//Grant access to specified roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role of ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};
