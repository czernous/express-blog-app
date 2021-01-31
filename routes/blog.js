const express = require('express');

const router = express.Router({ mergeParams: true });

const Category = require('../models/Category');
const Post = require('../models/Post');
const User = require('../models/User');
const {
  createPostForm,
  removeTags,
  formatPostBody,
  generateElement,
} = require('../utils');
const {
  paginate,
  checkCreatePermission,
  checkDeletePermission,
  checkEditPermission,
} = require('../middleware');

const PORT = process.env.PORT || 5000;

router.get('/', paginate(Post), async (req, res) => {
  const pageBody = generateElement(`index`);
  const filterCategory = req.query.category;
  const { page } = req.query;
  const { limit } = req.query;
  const { count } = res.paginate;
  const posts = res.paginate.results;
  let searchError;
  count === 0 ? (searchError = true) : (searchError = false);

  const categories = await Category.find();
  res.render('template', {
    pageBody,
    posts,
    categories,
    filterCategory,
    current: page,
    limit,
    pages: Math.ceil(count / limit),
    searchError,
  });
});
// NEW ROUTE
router.get('/new', checkCreatePermission(), async (req, res) => {
  const pageBody = generateElement(`new`);
  const blogPostForm = createPostForm();
  blogPostForm.setNew();
  const categories = await Category.find({});
  res.render('template', { pageBody, categories, blogPostForm });
});
// CREATE ROUTE
router.post('/', checkCreatePermission(), async (req, res) => {
  await formatPostBody(req, removeTags);
  try {
    const user = await User.findById(req.user._id);
    // await Post.syncIndexes(); // Rebuild all indexes (use if you drop a collection)
    const post = await Post.create(req.body.post);
    post.author.id = user.id;
    post.author.firstName = req.user.firstName;
    post.author.lastName = req.user.lastName;
    await post.save();
    user.posts.push(post);
    await user.save();
    user.populate('posts');
    req.flash('success', `Successfully created a blog post`);
    res.status(201).redirect('/');
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// CREATE A CATEGORY
router.post('/categories', checkCreatePermission(), async (req, res) => {
  // get originUrl (route the request was sent from)
  const hostUrl = process.env.PORT || `http://localhost:${PORT}`;
  const hostRe = new RegExp(hostUrl, 'g');
  const originUrl = req.headers.referer.replace(hostRe, '');
  const currentCat = req.body.category.name.toString();
  const newCat = req.body.category;
  // CHECK IF CATEGORY EXISTS AND CREATE ONE;
  try {
    //   a bit hacky way of ensuring category uniqueness. Consider refactoring.
    /* Also it would a good idea to validate the category
     *  making sure there are no special characters.
     *  Can be done client side (form validation) or via custom validation on the Schema
     */
    const foundCat = await Category.findOne({
      name: new RegExp('^' + currentCat + '$', 'i'),
    });
    if (!foundCat && req.body.category.name !== '') {
      Category.create(newCat);
      req.flash('success', 'Category added.');
    } else if (newCat.name === '') {
      req.flash('error', 'Category name cannot be empty');
      // res.status(411)  --length required
    } else {
      req.flash('error', 'Category already exists');
    }
    // redirect back to originURL
    res.status(201).redirect(originUrl);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// SHOW SINGLE POST
router.get('/:slug', async (req, res) => {
  const pageBody = generateElement(`show`);
  try {
    const displayedPost = await Post.findOne({ slug: req.params.slug });
    res.render('template', { pageBody, post: displayedPost });
  } catch (err) {
    //create a 404 page for missing posts
    res.status(404).redirect('/');
  }
});
// EDIT ROUTE
router.get('/:slug/edit', checkEditPermission(), async (req, res) => {
  const pageBody = generateElement(`edit`);
  const blogPostForm = createPostForm();
  blogPostForm.setEdit(req.params.slug);

  try {
    const categories = await Category.find({});
    const editedPost = await Post.findOne({ slug: req.params.slug });
    res.render('template', {
      pageBody,
      post: editedPost,
      categories,
      blogPostForm,
    });
  } catch (err) {
    //create a 404 page for missing posts
    res.status(404).redirect('/');
  }
});
// UPDATE ROUTE
router.put('/:slug', checkEditPermission(), async (req, res) => {
  await formatPostBody(req, removeTags);
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    const user = await User.findOne({ _id: post.author.id });
    await post.updateOne(req.body.post);
    await user.updateOne({
      posts: {
        _id: post.id,
        title: post.title,
        summary: post.summary,
        category: post.category,
        slug: post.slug,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
    res.status(201).redirect(`/blog/${req.params.slug}`);
  } catch (err) {
    res.status(400).redirect('/');
  }
});
// DESTROY ROUTE
router.delete('/:id', checkDeletePermission(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(post.author.id);
    await user.updateOne({ $pull: { posts: { _id: post.id } } });
    await post.remove();
    res.status(201).redirect('/');
  } catch (err) {
    res.status(400).redirect('/');
  }
});
module.exports = router;
