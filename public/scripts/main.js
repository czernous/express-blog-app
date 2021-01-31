// SemanticUI elements
$('.ui.dropdown').dropdown();
$(document).ready(() => {
  $('.sticky').sticky();
  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');
});
// BlogPost form validation
$('#addPost').form({
  fields: {
    postTitle: {
      identifier: 'postTitle',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter a post title',
        },
      ],
    },
    postImage: {
      identifier: 'postImage',
      rules: [
        {
          type: 'url',
          prompt: 'Please enter a valid image url',
        },
      ],
    },
    postCategory: {
      identifier: 'postCategory',
      rules: [
        {
          type: 'notExactly[select a category]',
          prompt: 'Please select a category',
        },
        {
          type: 'empty',
          prompt: 'Please select a category',
        },
      ],
    },
    body: {
      identifier: 'tiny-mce',
      rules: [
        {
          type: 'empty',
          prompt: 'Your post cannot be empty',
        },
        {
          type: 'minLength[100]',
          prompt: 'Your post should be at least {ruleValue} characters',
        },
      ],
    },
  },
});
// User register form validation
$('#registerUser').form({
  fields: {
    firstName: {
      identifier: 'firstName',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter a your name',
        },
      ],
    },
    lastName: {
      identifier: 'firstName',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter a your last name',
        },
      ],
    },
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'email',
          prompt: 'Please enter a valid e-mail',
        },
      ],
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter a password',
        },
        {
          type: 'minLength[8]',
          prompt: 'Your password must be at least {ruleValue} characters',
        },
      ],
    },
  },
});
// User login form validation
$('#loginUser').form({
  fields: {
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'email',
          prompt: 'Please enter a valid e-mail',
        },
      ],
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter a password',
        },
      ],
    },
  },
});
// Close error messages
$('.msg.close.icon').click((e) => {
  $(e.currentTarget)
    .parent()
    .animate(
      {
        opacity: 0,
      },
      500
    )
    .slideUp(600);
});
// add loader to register/login submitBtns
$('.submitFormBtn').click((e) => {
  setTimeout(() => {
    !$(e.currentTarget).parent().parent().hasClass('error')
      ? $(e.currentTarget).addClass('loading')
      : $(e.currentTarget).removeClass('loading');

    !$(e.currentTarget).parent().hasClass('error')
      ? $(e.currentTarget).addClass('loading')
      : $(e.currentTarget).removeClass('loading');
    $(e.currentTarget).hasClass('login') &&
    !$('#loginUser .field').hasClass('error')
      ? $(e.currentTarget).addClass('loading')
      : $(e.currentTarget).removeClass('loading');
  }, 100);
});
// Lazy load post images
const config = {
  rootMargin: '0px 0px -30% 0px',
  threshold: 0,
};
const observer = new IntersectionObserver(function (entries, self) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      function preloadImage(element) {
        element.src = $(element).data('src');
        $(element).parent().hasClass('placeholder')
          ? $(element).parent().removeClass('placeholder')
          : null;

        $(element).on('error', function () {
          this.src = '/img/imagePlaceholder.jpg';
        });
      }
      preloadImage(entry.target);
      self.unobserve(entry.target);
    }
  });
}, config);

const imgs = document.querySelectorAll('[data-src]');
imgs.forEach((img) => {
  observer.observe(img);
});
