const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');
const Comment = require('./Comment');
const WalkerJob = require('./WalkerJob');

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Live'
  },
  appliedUsers: [WalkerJob.schema],
  selectedUser: WalkerJob.schema,
  comments: [Comment.schema]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
