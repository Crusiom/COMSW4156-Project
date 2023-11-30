const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100,
    },
    content: {
        type: String,
        required: [true, 'Please add some content for the review'],
    },
    // the event that this review belongs to
    event: {
        type: String,
        select: false,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Reviews', ReviewSchema);
