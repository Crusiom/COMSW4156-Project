const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    // Title of the app, a required field with an error message if missing.
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    // Owner of the app, an optional field with a default value of an empty string.
    owner: {
        type: String,
        required: false,
        default: '',
    },
    // Flag to indicate if comments are enabled, a required field with a default value of true.
    commentEnabled: {
        type: Boolean,
        required: true,
        default: true,
    },
    // Flag to indicate if events are enabled, a required field with a default value of true.
    eventEnabled: {
        type: Boolean,
        required: true,
        default: true,
    },
    // Flag to indicate if visibility is enabled, a required field with a default value of true.
    visibleEnabled: {
        type: Boolean,
        required: true,
        default: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

// // when an app is deleted, delete all events under it
// AppSchema.pre('remove', async function (next) {
//     console.log(`Events being removed from app ${this._id}`);
//     await this.model('Events').deleteMany({ app: this._id });
//     next();
// });

module.exports = mongoose.model('Apps', AppSchema);
