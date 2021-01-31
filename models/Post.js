const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is missing'],
  },
  image: String,
  body: {
    type: String,
    required: [true, 'Post cannot be empty'],
    minlength: [100, 'Your post must be at leat 100 characters long'],
  },
  summary: {
    type: String,
    required: false,
  },
  category: String,
  slug: {
    type: String,
    slug: 'title',
    slug_padding_size: 4,
    unique: true,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    firstName: String,
    lastName: String,
  },
});
postSchema.set('timestamps', true);
module.exports = mongoose.model('Post', postSchema);
