const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job_id: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', jobSchema);

module.exports = Comment;
