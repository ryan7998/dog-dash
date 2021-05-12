const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Job = require('./Job');
const Dog = require('./Dog');
const Rating = require('./Rating');
const Comment = require('./Comment');
const Order = require('./Order');
const WalkerJob = require('./WalkerJob');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  address: {
    type: String,
    required: true,
    minlength: 6
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  submittedJobs : [WalkerJob.schema],
  applyedJobs : [WalkerJob.schema],
  selectedJobs : [WalkerJob.schema],
  dogs: [Dog.schema],
  doneRatings: [Rating.schema],
  receivedRatings: [Rating.schema],
  comments: [Comment.schema],
  orders: [Order.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
