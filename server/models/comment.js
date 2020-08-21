const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
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
  topicID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date, 
    required: true,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;