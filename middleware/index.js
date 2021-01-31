const passport = require('passport');
const Post = require('../models/Post');

const middleware = {
  paginate(model) {
    return async (req, res, next) => {
      const documentCount = await model.countDocuments().exec();
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      results.count = documentCount;
      if (endIndex < documentCount) {
        results.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit,
        };
      }
      try {
        if (req.query.category) {
          const { category } = req.query;
          results.count = await model
            .find({ category: { $eq: category } })
            .countDocuments()
            .exec();
          results.results = await model
            .find({ category: { $eq: category } })
            .limit(limit)
            .skip(startIndex)
            .exec();
        } else {
          results.results = await model
            .find()
            .limit(limit)
            .skip(startIndex)
            .exec();
        }
        res.paginate = results;
        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  },
  isAuth() {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res
          .status(401)
          .json({ msg: 'You are not authorized to view this resource' });
      }
    };
  },
  isAdmin() {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        next();
      } else {
        res.status(401).json({
          msg:
            'You are not authorized to view this resource because you are not an admin.',
        });
      }
    };
  },
  isLoggedIn() {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        req.flash('error', 'You are already logged in');
        res.redirect('back');
      } else {
        next();
      }
    };
  },
  checkDeletePermission() {
    return async (req, res, next) => {
      const editedPost = await Post.findOne({ slug: req.params.slug });
      if (
        req.isAuthenticated() &&
        (req.user.role === 'admin' || editedPost.author.id.equals(req.user._id))
      ) {
        next();
      } else {
        res.status(401).json({
          msg: `You are not authorized to delete this resource because you don't own it`,
        });
      }
    };
  },
  checkEditPermission() {
    return async (req, res, next) => {
      const editedPost = await Post.findOne({ slug: req.params.slug });
      if (
        req.isAuthenticated() &&
        (req.user.role === 'admin' ||
          req.user.role === 'editor' ||
          editedPost.author.id.equals(req.user._id))
      ) {
        next();
      } else {
        res.status(401).json({
          msg: `You are not authorized to edit this resource because you don't own it`,
        });
      }
    };
  },
  checkCreatePermission() {
    return (req, res, next) => {
      if (
        req.isAuthenticated() &&
        (req.user.role === 'admin' ||
          req.user.role === 'admin' ||
          req.user.role === 'writer')
      ) {
        next();
      } else {
        res.status(401).json({
          msg: `You are not authorized to post content`,
        });
      }
    };
  },
};

module.exports = middleware;
