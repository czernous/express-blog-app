const crypto = require('crypto');

const utils = {
  // REMOVE HTML TAGS FROM POST BODY
  removeTags(str) {
    if (str === null || str === '') {
      return false;
    } else {
      str = str.toString();
    }
    return str.replace(/(<([^>]+)>)|(<[^>]*>)|(<[^>]*)|(&nbsp;)/gi, '');
  },
  // CAPITALIZE STRING
  formatString(str) {
    str.toLowerCase().replace(/\b\w{3,}/g, (l) => {
      return l.charAt(0).toUpperCase() + l.slice(1);
    });
  },
  // GENERATE PAGE TEMPLATE
  generateElement(element) {
    return `pages/${element}`;
  },
  // HANDLE BLOGPOST FORM RENDERING
  createPostForm() {
    return {
      type: '',
      name: '',
      action: '',
      method: '',
      renderAddCategory: true,
      setEdit(slug) {
        (this.type = 'edit'),
          (this.name = 'Edit'),
          (this.action = `/blog/${slug}?_method=PUT`),
          (this.method = 'POST'),
          (this.renderAddCategory = false);
      },
      setNew() {
        (this.type = 'new'),
          (this.action = '/blog'),
          (this.name = 'Create New Blogpost'),
          (this.method = 'POST'),
          (this.renderAddCategory = true);
      },
    };
  },
  // SANITIZE POST BODY & FORMAT THE SUMMARY
  formatPostBody(req, removeTags) {
    req.body.post.body = req.sanitize(req.body.post.body);
    !req.body.post.summary
      ? (req.body.post.summary = `${removeTags(req.body.post.body).substring(
          0,
          247
        )}...`)
      : null;
  },
  validatePassword(password, hash, salt) {
    const hashVerify = crypto
      .pbkdf2Sync(password, salt, 1000000, 128, 'sha512')
      .toString('hex');
    return hash === hashVerify;
  },
  // Create Hash and Salt from the plain text password
  genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto
      .pbkdf2Sync(password, salt, 1000000, 128, 'sha512')
      .toString('hex');

    return {
      salt,
      hash: genHash,
    };
  },
};

module.exports = utils;
