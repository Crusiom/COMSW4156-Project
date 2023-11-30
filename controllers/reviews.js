const Review = require('../models/Reviews');
const asyncHandler = require('../middlewares/async');

// @desc      Create review
// @route     POST /api/v1/reviews
// @access    Private
exports.createReview = asyncHandler(async (req, res, next) => {
    try {
        // Set the event of the event to the event of the currently authenticated user
        req.body.event = req.user.event;

        // Create a new event using the data from the request body
        const review = await Review.create(req.body);

        // Respond with a success status and the created review data
        return res.status(200).json({
            success: true,
            data: review,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    try {
        // Find and update the review with the given ID using the data from the request body
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        // Respond with a success status and the updated review data
        return res.status(201).json({
            success: true,
            data: review,
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    try {
        // Find and delete the review with the given ID
        await Review.findByIdAndDelete(req.params.id);

        // Respond with a success status and an empty data object
        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        // Pass any encountered errors to the error-handling middleware
        return next(err);
    }
});
