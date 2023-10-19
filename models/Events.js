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
    // Category of the event, a required field with a default value of 'general'.
    category: {
        type: String,
        required: true,
        default: 'general',
    },
    // Application associated with the event, but it's not selected by default in queries.
    app: {
        type: String,
        select: false,
    },
    // Creation date of the event, with a default value of the current date and time.
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Events', EventSchema);
