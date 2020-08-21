const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createrName: {
    type: String,
    required: true,
  },
  createrID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true, 
    default: Date.now 
  }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;