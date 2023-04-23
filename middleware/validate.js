const { body } = require('express-validator');

postValidation = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required!')
    .isLength({min: 5})
    .withMessage('Title is at least 5 character long'),
  body('content')
    .not()
    .isEmpty()
    .withMessage('Content is required!')
    .isLength({min: 10})
    .withMessage('Content is at least 10 character long'),
  body('type')
    .not()
    .isEmpty()
    .withMessage('type is required!')
    .isLength({min: 5})
    .withMessage('type is at least 5 character long'),
]

module.exports = postValidation;