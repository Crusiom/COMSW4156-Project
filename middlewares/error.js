const ErrorResponse = require('../helpers/errResponse');

const errorHandler = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        //log to console for dev
        console.log(err);

        //Mongoose bad objectID
        if (err.name === 'CastError') {
            const message = `Resource not found`;
            error = new ErrorResponse(message, 404);
        }

        // Mongoose Duplicate id
        if (err.code === 11000) {
            const message = 'Duplicate content found. Please try something new';
            error = new ErrorResponse(message, 403);
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((val) => val.message);
            error = new ErrorResponse(message, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = errorHandler;
