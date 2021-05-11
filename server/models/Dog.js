const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  breed: {
    type: String
  }

});

const Dog = mongoose.model('Dog', jobSchema);

module.exports = Dog;
