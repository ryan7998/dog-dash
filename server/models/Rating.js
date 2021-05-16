const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  rater_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rated_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratingNb: {
    type: Number,
    required: true,
    default : 0
  },
  text: {
    type: String,
    required: false
  }
});

const Rating = mongoose.model('Rating', jobSchema);

module.exports = Rating;
