//const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = require('mongoose');
//const { Schema } = mongoose;
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
    required: false,
    default: 'https://dogdash.s3.us-east-2.amazonaws.com/defaultPic.png'
  },
  type: {
    type: String,
    required: true
  },
  submittedJobs :  [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Job'
    }
  ],
  appliedJobs :  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  selectedJobs :  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  dogs: [Dog.schema],
  doneRatings: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Rating'
    }
  ],
  receivedRatings: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Rating'
    }
  ],
  comments: [Comment.schema],
  orders: [Order.schema]
},
{
  toJSON: {
    virtuals: true,
  },
}
);

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

userSchema.virtual('ratingAvg').get(function() {
   let ratingsum = 0;
   this.receivedRatings.map(function(num) { return ratingsum += num.ratingNb});
   let ratingAvg = ratingsum/this.receivedRatings.length;
  if (ratingAvg) {
    return (ratingsum / (this.receivedRatings.length));
  } else {
    return 0; 
  }
});

const User = model('User', userSchema);

module.exports = User;
