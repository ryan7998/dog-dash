const mongoose = require('mongoose');

const { Schema } = mongoose;
// const User = require('./User');
const Comment = require('./Comment');
const WalkerJob = require('./Comment');

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:{
    type: String,
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
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    default: 'Live',
    required: true
  },
  appliedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  selectedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ,
  comments: [Comment.schema]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
