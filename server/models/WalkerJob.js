const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  walker_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job_id: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  apply: {
    type: Boolean,
    required: true,
    default: 0
  },
  select: {
    type: Boolean,
    required: true,
    default: 0
  }
});

const WalkerJob = mongoose.model('WalkerJob', jobSchema);

module.exports = WalkerJob;
