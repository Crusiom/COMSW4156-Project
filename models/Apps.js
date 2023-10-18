const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    owner: {
        type: String,
        required: true
    },
    commentEnabled: {
        type: Boolean,
        required: true,
        defualt: true,
    },
    eventEnabled: {
        type: Boolean,
        required: true,
        defualt: true,
    },
    visibleEnabled: {
        type: Boolean,
        required: true,
        defualt: true,
    }
});


module.exports = mongoose.model('Apps', AppSchema);
