const Review = require('../models/Reviews');
const asyncHandler = require('../middlewares/async');

// // get all reviews that fall under the selected event
// // @routes    GET /api/v1/reviews
// // @access    Public
// exports.getReview = asyncHandler(async (req, res, next) => {
//     try {
//         const event = req.user.event;

//         const reviews = await Review.find({ event });

//         // Respond with a success status and the list of reviews
//         return res.status(200).json({
//             success: true,
//             data: reviews,
//         });
//     } catch (err) {
//         // Pass any encountered errors to the error-handling middleware
//         return next(err);
//     }
// });

// @desc      Get reviews under a specific event
// @route     GET /api/v1/reviews/event/:eventId
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
    try {
        const eventId = req.params.eventId;

        const reviews = await Review.find({ event: eventId });

        return res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (err) {
        return next(err);
    }
});

// @desc      Create review
// @route     POST /api/v1/reviews
// @access    Private
exports.createReview = asyncHandler(async (req, res, next) => {
    try {
        // Check if eventId is provided in the request body
        if (!req.body.eventId) {
            return res.status(400).json({
                success: false,
                error: 'Please provide an eventId for the review',
            });
        }

        // Set the event of the review to the provided eventId
        req.body.event = req.body.eventId;

        // Create a new review using the data from the request body
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
