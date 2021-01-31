const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'User with this email address already exists'],
  },
  hash: String,
  salt: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  posts: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      title: String,
      summary: String,
      category: String,
      slug: String,
      createdAt: Date,
      updatedAt: Date,
    },
  ],
  role: {
    type: String,
    enum: ['admin', 'editor', 'writer', 'user'],
    default: 'user',
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
