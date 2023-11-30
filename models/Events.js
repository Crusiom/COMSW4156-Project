const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    // Title of the event, a required field with an error message if missing.
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    // Author of the event, a required field.
    author: {
        type: String,
        required: true,
    },
    // Content of the event, a required field with an error message if missing.
    content: {
        type: String,
        required: [true, 'Please enter the content'],
    },
    // Category of the event, a required field with enum as its fillers
    category: {
        type: [String],
        required: true,
        enum: ['health', 'food', 'community', 'others'],
    },
    // the app that the event belongs to.
    app: {
        type: String,
        select: false,
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10'],
    },
    // Creation date of the event, with a default value of the current date and time.
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

// when an event is deleted, delete all reviews under it
EventSchema.pre('remove', async function (next) {
    console.log(`Reviews being removed from event ${this._id}`);
    await this.model('Reviews').deleteMany({ event: this._id });
    next();
});

module.exports = mongoose.model('Events', EventSchema);
