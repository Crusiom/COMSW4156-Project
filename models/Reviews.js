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
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    // the event that this review belongs to
    event: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (eventId) {
    const obj = await this.aggregate([
        {
            $match: { event: eventId },
        },
        {
            $group: {
                _id: '$event',
                averageRating: { $avg: '$rating' },
            },
        },
    ]);

    try {
        await this.model('Events').findByIdAndUpdate(eventId, {
            averageRating: obj[0].averageRating,
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
ReviewSchema.post('save', async function () {
    await this.constructor.getAverageRating(this.event);
});

// Call getAverageRating before remove
ReviewSchema.pre('remove', async function () {
    await this.constructor.getAverageRating(this.event);
});

module.exports = mongoose.model('Review', ReviewSchema);
