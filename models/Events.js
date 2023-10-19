const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: [true, 'Please enter the content'],
    },
    category: {
        type: String,
        required: true,
        default: 'general',
    },
    app: {
        type: String,
        select: false,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Events', EventSchema);
