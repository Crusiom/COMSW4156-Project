const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100
  },
  content: {
    type: String,
    required: [true, 'Please add some content for the review']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: 'Events',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true
  }
});

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ event: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(eventId) {
  const obj = await this.aggregate([
    {
      $match: { event: eventId }
    },
    {
      $group: {
        _id: '$event',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Events').findByIdAndUpdate(eventId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', async function() {
  await this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', async function() {
  await this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);