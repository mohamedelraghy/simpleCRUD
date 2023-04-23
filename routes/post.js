const express = require('express');

const postController = require('../controllers/posts');
const postValidation = require('../middleware/validate');

const router = express.Router();

router.get('/', postController.getAll);

router.get('/:id', postController.getPost);

router.post('/create-post', postValidation, postController.createPost);

router.put('/:id', postValidation, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
