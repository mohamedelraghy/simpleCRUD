const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/posts');

const router = express.Router();

router.get('/', postController.getAll);

router.post('/create-post', [
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
], postController.createPost);

router.put('/:id', [
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
], postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
